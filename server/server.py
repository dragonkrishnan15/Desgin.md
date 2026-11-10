#!/usr/bin/env python3
"""
UI Design Engine FastMCP Server.
Provides on-demand access to 28 UI design styles, AI prompt blueprints,
and 4 senior Figma audit rubrics with zero context bloat.
"""

import json
from pathlib import Path
from typing import Optional, List, Dict, Any

try:
    from mcp.server.fastmcp import FastMCP
except ImportError:
    # Minimal fallback runner if mcp is not yet pip-installed
    FastMCP = None

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

def load_json(rel_path: str) -> Optional[Any]:
    target = DATA_DIR / rel_path
    if not target.exists():
        return None
    with open(target, "r", encoding="utf-8") as f:
        return json.load(f)

CATALOG = load_json("catalog.json") or []

if FastMCP:
    mcp = FastMCP("ui-design-engine")

    @mcp.tool()
    def list_styles(family: Optional[str] = None) -> List[Dict[str, Any]]:
        """List all 28 UI design styles with compact summaries (ID, name, family, tagline, best_for). Very low context usage (~200 tokens)."""
        styles = CATALOG
        if family:
            fam_lower = family.lower()
            styles = [s for s in CATALOG if fam_lower in s.get("family", "").lower()]
        return [
            {
                "id": s["id"],
                "slug": s["slug"],
                "name": s["name"],
                "family": s["family"],
                "tagline": s["tagline"],
                "best_for": s["best_for"],
                "palette": s.get("palette", []),
            }
            for s in styles
        ]

    @mcp.tool()
    def get_style(style_id: str) -> Dict[str, Any]:
        """Fetch complete color palette, typography, signature moves, and AI prompt template for a specific design style (e.g. '01', 'bento-grid', 'cyberpunk')."""
        raw_id = str(style_id).strip().lower()
        matched = None
        for s in CATALOG:
            if (
                s["id"].lower() == raw_id
                or s["id"] == raw_id.zfill(2)
                or s["slug"].lower() == raw_id
            ):
                matched = s
                break

        if not matched:
            return {"error": f"Style '{style_id}' not found. Use list_styles to see all 28 styles."}

        full_data = load_json(matched["file"])
        return full_data or {"error": "File not found"}

    @mcp.tool()
    def search_styles(query: str, limit: int = 3) -> List[Dict[str, Any]]:
        """Search for design styles by keyword, domain, or product description (e.g., 'crypto', 'luxury watch', 'audio plugin', 'hacker terminal')."""
        q = query.lower()
        scored = []
        for s in CATALOG:
            score = 0
            if q in s.get("name", "").lower():
                score += 10
            if q in s.get("slug", ""):
                score += 8
            if q in s.get("tagline", "").lower():
                score += 5
            if q in s.get("best_for", "").lower():
                score += 6
            if q in s.get("family", "").lower():
                score += 3
            if score > 0:
                scored.append((score, s))

        scored.sort(key=lambda x: x[0], reverse=True)
        return [
            {
                "id": item["id"],
                "name": item["name"],
                "family": item["family"],
                "tagline": item["tagline"],
                "best_for": item["best_for"],
                "palette": item.get("palette", []),
                "typefaces": item.get("typefaces", []),
            }
            for _, item in scored[:limit]
        ]

    @mcp.tool()
    def get_audit_rubric(rubric_id: str) -> Dict[str, Any]:
        """Retrieve senior-level Figma agent audit rubrics: 'better-interface', 'accessibility-review', 'find-animation-opportunities', or 'bento-board-ui'."""
        data = load_json(f"audit-rubrics/{rubric_id}.json")
        if not data:
            return {
                "error": f"Rubric '{rubric_id}' not found. Available: better-interface, accessibility-review, find-animation-opportunities, bento-board-ui"
            }
        return data

    @mcp.tool()
    def compose_bento(title: str, cards: List[Dict[str, str]]) -> Dict[str, Any]:
        """Generate an Apple/Linear-style modular Bento Board grid layout blueprint and Tailwind CSS classes for a list of features or cards."""
        span_map = {
            "hero": "col-span-1 md:col-span-2 row-span-2",
            "wide_metric": "col-span-1 md:col-span-2 row-span-1",
            "tall_preview": "col-span-1 row-span-2",
            "compact_badge": "col-span-1 row-span-1",
        }

        blueprint = []
        for idx, c in enumerate(cards):
            card_type = c.get("type", "compact_badge")
            blueprint.append(
                {
                    "index": idx + 1,
                    "title": c.get("title", ""),
                    "type": card_type,
                    "tailwind_classes": f"bg-[#141418] border border-white/10 rounded-2xl p-6 {span_map.get(card_type, 'col-span-1')}",
                    "description": c.get("description", ""),
                }
            )

        return {
            "title": title,
            "grid_container_class": "grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto p-4 auto-rows-[160px]",
            "total_cells": len(cards),
            "layout_blueprint": blueprint,
        }

if __name__ == "__main__":
    if FastMCP:
        mcp.run()
    else:
        print("MCP SDK not installed. Install via: pip install 'mcp[cli]'")
        print(f"Catalog loaded: {len(CATALOG)} styles ready.")
