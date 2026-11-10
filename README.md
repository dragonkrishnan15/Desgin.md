# UI Design Engine (MCP & Agent Skill)

> **Low-memory, high-conviction UI/UX design intelligence engine with 28 design styles, AI prompt blueprints, and 4 senior Figma audit rubrics.**

Designed specifically to solve the **context bloat** problem when using AI coding assistants. Instead of dumping megabytes of design guides or dozens of conflicting styles into active prompt memory, this engine uses **Progressive Disclosure**: an index (< 20 KB) identifies the exact aesthetic match, loading **only** that specific style and evaluation rubric on demand.

---

## ⚡ Key Features

- **28 Aesthetic Design Styles**: From *Minimalism* and *Bento Grid* to *Neumorphism*, *Cyberpunk*, *Bauhaus*, and *Wabi-Sabi*. Each style includes:
  - Exact hex color palettes.
  - Recommended typefaces and pairing rules.
  - Signature moves (structural layout rules).
  - Production-ready copy-paste AI prompt templates (with `[BRACKETS]`).
- **4 Senior Audit Rubrics (Extracted from Figma Agent Skills)**:
  - `better-interface`: Jakub Krehel's 4-dimension polish audit & 3-tier severity ladder.
  - `accessibility-review`: WCAG 2.1 AA compliance audit (contrast $\ge 4.5:1$, touch targets $\ge 44\text{px}$, keyboard flow).
  - `find-animation-opportunities`: Emil Kowalski's 4-question motion gate ($<300\text{ms}$ speed budgets).
  - `bento-board-ui`: Apple & Linear-style asymmetric modular grid composer ($1\times1$, $2\times1$, $1\times2$, $2\times2$).
- **Dual Deployment**:
  1. **MCP Server**: Stdio transport for Claude Desktop, Cursor, Antigravity, and Gemini CLI.
  2. **Agent Skill**: Drop-in `.gemini/skills/` or `.claude/skills/` standard skill with zero setup.
- **Ultra-Low Memory Footprint**:
  - Catalog index: **21 KB** (~200 tokens).
  - Per-style payload: **~1.5 KB** (~80 tokens).
  - Memory consumption on laptop: Near zero.

---

## 📂 Repository Architecture

```text
ui-design-engine/
├── data/
│   ├── catalog.json                 # Tiny master index of all 28 styles (<25 KB)
│   ├── styles/                      # 28 modular style records (~1.5 KB each)
│   │   ├── 01-minimalism.json
│   │   ├── 02-swiss-design.json
│   │   ├── 03-bento-grid.json
│   │   └── ... (up to 28-wabi-sabi.json)
│   └── audit-rubrics/               # 4 senior auditor rulesets
│       ├── better-interface.json
│       ├── accessibility-review.json
│       ├── find-animation-opportunities.json
│       └── bento-board-ui.json
├── skills/
│   └── ui-design-engine/            # Antigravity / Claude Code Skill
│       ├── SKILL.md                 # Progressive disclosure trigger (<1 KB)
│       └── references/
│           └── catalog.md           # Quick-reference markdown catalog
├── server/
│   ├── index.mjs                    # Node.js MCP Server (@modelcontextprotocol/sdk)
│   ├── server.py                    # Standalone Python FastMCP Server
│   └── package.json
└── README.md
```

---

## 🚀 Option 1: Setup as MCP Server

### A. Claude Desktop Configuration
Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ui-design-engine": {
      "command": "node",
      "args": ["<PATH_TO_REPO>/server/index.mjs"]
    }
  }
}
```

*Or using Python:*
```json
{
  "mcpServers": {
    "ui-design-engine": {
      "command": "python",
      "args": ["<PATH_TO_REPO>/server/server.py"]
    }
  }
}
```

### B. Antigravity IDE / CLI Configuration
Add to your `~/.gemini/antigravity/mcp.json` or `.agy/mcp.json`:

```json
{
  "mcpServers": {
    "ui-design-engine": {
      "command": "node",
      "args": ["D:/Design/server/index.mjs"]
    }
  }
}
```

### MCP Tools Available
| Tool | Description |
| :--- | :--- |
| `list_styles(family?)` | Lists styles with taglines and best-for use cases (~200 tokens). |
| `get_style(style_id)` | Fetches palette, typefaces, rules, and prompt template for one style. |
| `search_styles(query)` | Matches styles by keywords (e.g. "crypto dashboard", "luxury watch"). |
| `get_audit_rubric(rubric_id)` | Returns audit rules for `better-interface`, `accessibility-review`, `find-animation-opportunities`, or `bento-board-ui`. |
| `compose_bento(title, cards)` | Composes cards into an asymmetric Apple/Linear CSS Grid with Tailwind classes. |

---

## 🎨 Option 2: Setup as an Agent Skill

To install into your local Antigravity or Claude agent:
Copy the skill folder to your local skills directory:

**Windows PowerShell:**
```powershell
Copy-Item -Recurse -Force "D:\Design\skills\ui-design-engine" "$HOME\.gemini\config\skills\ui-design-engine"
```

Once installed, your agent will automatically activate the skill whenever you ask to:
- *"Design a landing page for a Web3 analytics tool"*
- *"Review this component for accessibility and visual polish"*
- *"Give me a bento grid layout for my feature list"*

---

## 📖 Style Catalog Overview

| # | Style Name | Aesthetic Family | Palette Sample | Best For |
| :---: | :--- | :--- | :--- | :--- |
| `01` | **Minimalism** | Clean & Structured | `#FAFAF8`, `#111111`, `#C9A27E` | Portfolios, studios, premium hardware |
| `02` | **Swiss Design** | Clean & Structured | `#FFFFFF`, `#111111`, `#E30613` | Architecture, data-heavy apps, conferences |
| `03` | **Bento Grid** | Clean & Structured | `#0B0B0F`, `#17171D`, `#7C5CFF` | SaaS feature pages, dashboards |
| `04` | **Editorial Design** | Clean & Structured | `#F4EFE6`, `#1A1A1A`, `#B23A2B` | Long-form journalism, blogs, journals |
| `05` | **Luxury Typography** | Clean & Structured | `#0F0E0E`, `#F8F6F0`, `#C5A880` | High jewelry, fragrances, private equity |
| `06` | **Bauhaus** | Clean & Structured | `#F2EBDD`, `#D7263D`, `#1E4CA1` | Art institutions, creative studios, posters |
| `07` | **Neumorphism** | Soft & Tactile | `#E0E5EC`, `#A3B1C6`, `#6C63FF` | Smart-home dials, music widgets |
| `08` | **Glassmorphism** | Soft & Tactile | `#0A0D1A`, `#1E293B`, `#6366F1` | Crypto dApps, fintech dashboards |
| `09` | **Claymorphism** | Soft & Tactile | `#F7F4EB`, `#FF6B6B`, `#4ECDC4` | Gamified apps, kids & youth banking |
| `10` | **Skeuomorphism** | Soft & Tactile | `#1C1B1A`, `#3A352F`, `#D4AF37` | Audio mixing decks, vintage notebooks |
| `11` | **Ethereal** | Soft & Tactile | `#FAF7F5`, `#E8DFF5`, `#FCF4DD` | Wellness, skincare, meditation apps |
| `12` | **Aurora Gradient** | Soft & Tactile | `#08091A`, `#6366F1`, `#EC4899` | AI startups, developer infrastructure |
| `13` | **Neo-Brutalism** | Bold & Expressive | `#FFFDF9`, `#000000`, `#FFE600` | Dev tools, indie hackers, Gen Z apps |
| `14` | **Maximalism** | Bold & Expressive | `#FF0055`, `#00FF66`, `#6600FF` | Music festivals, streetwear lookbooks |
| `15` | **Memphis** | Bold & Expressive | `#FFF6EE`, `#FF3366`, `#00C2CB` | Party brands, creative apparel |
| `16` | **Scrapbook** | Bold & Expressive | `#F5EBE1`, `#2A2723`, `#D9534F` | Personal journals, storytelling zines |
| `17` | **Conceptual Sketch** | Bold & Expressive | `#FAF8F5`, `#2B2B2A`, `#3B82F6` | Early wireframes, pitch decks, notes |
| `18` | **Pixel Art** | Retro & Digital | `#181425`, `#262B44`, `#E8B796` | 8-bit games, retro arcades, dApps |
| `19` | **Y2K Aesthetic** | Retro & Digital | `#D4DEEE`, `#FF66B2`, `#66CCFF` | 2000s revival brands, streetwear |
| `20` | **Vaporwave** | Retro & Digital | `#2E1A47`, `#FF71CE`, `#01CDFE` | Nostalgic music platforms, art vaults |
| `21` | **Synthwave** | Retro & Digital | `#130924`, `#FF2A6D`, `#05D9E8` | Outrun racing, retro hardware |
| `22` | **Cybercore** | Retro & Digital | `#050508`, `#00FF41`, `#003B00` | Hacker terminals, security tooling |
| `23` | **Cyberpunk** | Retro & Digital | `#000B0E`, `#FCEE09`, `#00F0FF` | High-tech gaming, futuristic gear |
| `24` | **Surrealism** | Artful & Heritage | `#1A1921`, `#D4AF37`, `#3E5C76` | Experimental film, boutique cinema |
| `25` | **Art Deco** | Artful & Heritage | `#0D0D0D`, `#D4AF37`, `#F2E3C6` | Speakeasies, heritage hotels, luxury estates |
| `26` | **Victorian** | Artful & Heritage | `#241E1A`, `#8C2D19`, `#C5A059` | Distilleries, antiquarians, apothecary |
| `27` | **Bohemian** | Artful & Heritage | `#EFE8DE`, `#C97A53`, `#5E6F52` | Natural wine, plant shops, travel logs |
| `28` | **Wabi-Sabi** | Artful & Heritage | `#EEE9E0`, `#8B7E6A`, `#A65E3A` | Ceramics, tea ceremony, mindfulness |

---

## 🛠️ How to Add More Styles in the Future

The architecture makes adding new styles trivial:
1. Create `data/styles/<id>-<slug>.json` with the required schema (`id`, `name`, `family`, `tagline`, `palette`, `typefaces`, `best_for`, `prompt_template`).
2. Add a corresponding 5-line summary entry into `data/catalog.json`.
3. Both the MCP Server and the Agent Skill will immediately index and discover the new style without modifying any server code!

---

## 📄 License
MIT License.
