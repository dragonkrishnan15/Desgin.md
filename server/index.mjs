#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../data");

// Helper: load JSON file safely
function loadJson(relPath) {
  const fullPath = path.join(DATA_DIR, relPath);
  if (!fs.existsSync(fullPath)) return null;
  return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
}

const catalog = loadJson("catalog.json") || [];

const server = new Server(
  {
    name: "ui-design-engine",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tool schemas
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_styles",
        description:
          "List all 28 UI design styles with compact summaries (ID, name, family, tagline, best_for). Extremely low context consumption (~200 tokens).",
        inputSchema: {
          type: "object",
          properties: {
            family: {
              type: "string",
              description:
                "Optional filter by family: 'Clean & Structured', 'Soft & Tactile', 'Bold & Expressive', 'Retro & Digital', or 'Artful & Heritage'",
            },
          },
        },
      },
      {
        name: "get_style",
        description:
          "Fetch complete details, color palette (hex), typography, signature moves, and AI prompt template for a specific design style.",
        inputSchema: {
          type: "object",
          properties: {
            style_id: {
              type: "string",
              description:
                "Style number or slug (e.g. '01', '03', 'bento-grid', 'cyberpunk', 'bauhaus', 'wabi-sabi')",
            },
          },
          required: ["style_id"],
        },
      },
      {
        name: "search_styles",
        description:
          "Search for the best design styles matching a keyword, domain, or product description (e.g., 'crypto', 'luxury watch', 'audio plugin', 'developer terminal').",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search keyword or product description",
            },
            limit: {
              type: "number",
              description: "Max results to return (default: 3)",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_audit_rubric",
        description:
          "Retrieve senior-level Figma agent audit rubrics: 'better-interface' (Jakub Krehel polish), 'accessibility-review' (WCAG 2.1 AA), 'find-animation-opportunities' (Emil Kowalski motion gate), or 'bento-board-ui' (grid composition).",
        inputSchema: {
          type: "object",
          properties: {
            rubric_id: {
              type: "string",
              enum: [
                "better-interface",
                "accessibility-review",
                "find-animation-opportunities",
                "bento-board-ui",
              ],
              description: "ID of the audit rubric to load",
            },
          },
          required: ["rubric_id"],
        },
      },
      {
        name: "compose_bento",
        description:
          "Generate an Apple/Linear-style modular Bento Board grid layout blueprint and Tailwind CSS classes for a list of features or cards.",
        inputSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Section or dashboard title",
            },
            cards: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  type: {
                    type: "string",
                    enum: ["hero", "wide_metric", "tall_preview", "compact_badge"],
                    description:
                      "Cell type: hero (2x2), wide_metric (2x1), tall_preview (1x2), compact_badge (1x1)",
                  },
                  description: { type: "string" },
                },
                required: ["title", "type"],
              },
              description: "List of items/features to compose into the bento grid",
            },
          },
          required: ["cards"],
        },
      },
    ],
  };
});

// Execute tools
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "list_styles") {
    let results = catalog;
    if (args?.family) {
      const fam = args.family.toLowerCase();
      results = catalog.filter((s) => s.family.toLowerCase().includes(fam));
    }
    const compact = results.map((s) => ({
      id: s.id,
      slug: s.slug,
      name: s.name,
      family: s.family,
      tagline: s.tagline,
      best_for: s.best_for,
      palette: s.palette,
    }));
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(compact, null, 2),
        },
      ],
    };
  }

  if (name === "get_style") {
    const rawId = String(args.style_id).trim().toLowerCase();
    const entry = catalog.find(
      (s) =>
        s.id.toLowerCase() === rawId ||
        s.id === rawId.padStart(2, "0") ||
        s.slug.toLowerCase() === rawId
    );

    if (!entry) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Style '${args.style_id}' not found. Use list_styles to see all 28 available styles.`,
          },
        ],
      };
    }

    const fullData = loadJson(entry.file);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(fullData, null, 2),
        },
      ],
    };
  }

  if (name === "search_styles") {
    const q = String(args.query).toLowerCase();
    const limit = args.limit || 3;

    const scored = catalog.map((s) => {
      let score = 0;
      if (s.name.toLowerCase().includes(q)) score += 10;
      if (s.slug.includes(q)) score += 8;
      if (s.tagline.toLowerCase().includes(q)) score += 5;
      if (s.best_for.toLowerCase().includes(q)) score += 6;
      if (s.family.toLowerCase().includes(q)) score += 3;
      return { ...s, score };
    });

    const matches = scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((s) => ({
        id: s.id,
        name: s.name,
        family: s.family,
        tagline: s.tagline,
        best_for: s.best_for,
        palette: s.palette,
        typefaces: s.typefaces,
      }));

    return {
      content: [
        {
          type: "text",
          text:
            matches.length > 0
              ? JSON.stringify(matches, null, 2)
              : `No exact matches for '${args.query}'. Call list_styles to browse all 28 styles.`,
        },
      ],
    };
  }

  if (name === "get_audit_rubric") {
    const rubricPath = `audit-rubrics/${args.rubric_id}.json`;
    const rubric = loadJson(rubricPath);
    if (!rubric) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Rubric '${args.rubric_id}' not found. Available: better-interface, accessibility-review, find-animation-opportunities, bento-board-ui`,
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(rubric, null, 2),
        },
      ],
    };
  }

  if (name === "compose_bento") {
    const { title = "Features Overview", cards = [] } = args;
    const spanMap = {
      hero: "col-span-1 md:col-span-2 row-span-2",
      wide_metric: "col-span-1 md:col-span-2 row-span-1",
      tall_preview: "col-span-1 row-span-2",
      compact_badge: "col-span-1 row-span-1",
    };

    const blueprint = cards.map((c, idx) => ({
      index: idx + 1,
      title: c.title,
      type: c.type,
      tailwind_classes: `bg-[#141418] border border-white/10 rounded-2xl p-6 ${
        spanMap[c.type] || "col-span-1"
      }`,
      description: c.description || "",
    }));

    const result = {
      title,
      grid_container_class:
        "grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto p-4 auto-rows-[160px]",
      total_cells: cards.length,
      layout_blueprint: blueprint,
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  throw new Error(`Tool not found: ${name}`);
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

run().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
