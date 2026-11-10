---
name: ui-design-engine
description: Advanced UI/UX design intelligence engine. Provides 28 distinct design aesthetic styles (Minimalism, Bento Grid, Neumorphism, Cyberpunk, Neo-Brutalism, Luxury, etc.) with deterministic palettes, typography, signature moves, copy-paste AI prompt templates, and 4 senior audit rubrics (Jakub Krehel polish, WCAG 2.1 AA a11y, Emil Kowalski motion filter, Apple/Linear Bento layout). Trigger when asked to design, style, audit, critique, or polish interfaces, web pages, components, dashboards, or mobile apps.
---

# UI Design Engine (Progressive Disclosure)

A high-conviction, low-memory design intelligence engine. Instead of dumping dozens of design philosophies into memory, it loads only the single matching style and relevant evaluation rubric on demand.

## 1. Operating Rules

1. **Progressive Disclosure First**:
   - Never load all styles into working memory.
   - Read `data/catalog.json` (or `references/catalog.md`) to find the best matching style ID.
   - Load **only** the selected style from `data/styles/<id>-<slug>.json`.
2. **Deterministic Evidence Over Subjective Taste**:
   - Every recommended style must provide the exact hex palette, typefaces, spacing tokens, and signature rules from its definition file.
3. **Always Run the 4 Quality Gates**:
   - **Visual Polish**: Strict 4px/8px rhythm, aligned edges, minimum 44×44px hit targets (`data/audit-rubrics/better-interface.json`).
   - **Accessibility (WCAG 2.1 AA)**: Text contrast $\ge 4.5:1$ (normal) or $\ge 3:1$ (large/UI elements) (`data/audit-rubrics/accessibility-review.json`).
   - **Motion Discipline**: Only animate interactions passing the 4-question gate (Frequency, Purpose, Speed $<300\text{ms}$, Function) (`data/audit-rubrics/find-animation-opportunities.json`).
   - **Spatial Composition**: If organizing cards or dashboards, apply asymmetric Bento Board hierarchy (`data/audit-rubrics/bento-board-ui.json`).

---

## 2. Aesthetic Families Quick Index

| Family | Style IDs & Names | Best For |
| :--- | :--- | :--- |
| **Clean & Structured** | `01` Minimalism, `02` Swiss Design, `03` Bento Grid, `04` Editorial, `05` Luxury Typography, `06` Bauhaus | SaaS, documentation, publishing, high-end portfolios, conferences |
| **Soft & Tactile** | `07` Neumorphism, `08` Glassmorphism, `09` Claymorphism, `10` Skeuomorphism, `11` Ethereal, `12` Aurora Gradient | Consumer apps, music players, modern SaaS, widgets, wellness |
| **Bold & Expressive** | `13` Neo-Brutalism, `14` Maximalism, `15` Memphis, `16` Scrapbook, `17` Conceptual Sketch | Dev tools, Gen Z brands, agencies, hackathons, indie makers |
| **Retro & Digital** | `18` Pixel Art, `19` Y2K Aesthetic, `20` Vaporwave, `21` Synthwave, `22` Cybercore, `23` Cyberpunk | Gaming, crypto/web3, terminal tools, retro tech, esports |
| **Artful & Heritage** | `24` Surrealism, `25` Art Deco, `26` Victorian, `27` Bohemian, `28` Wabi-Sabi | Boutique products, ceramics, luxury hospitality, storytellers |

---

## 3. Workflow Execution

### Step 1: Select Style
- Match the user's domain, brand feel, and audience to one of the 28 styles.
- Read `data/styles/<id>-<slug>.json`.

### Step 2: Extract & Customize Blueprint
- Use the `prompt_template` inside the style file as the foundation.
- Replace bracketed tokens `[PRODUCT]`, `[EVENT]`, etc. with the user's specific context.
- Enforce the official `palette` and `typefaces`.

### Step 3: Audit & Deliver
- Review generated layout or code against `data/audit-rubrics/better-interface.json` and `data/audit-rubrics/accessibility-review.json`.
- Output:
  1. **Style Identification**: Name, family, and reason for fit.
  2. **Color Palette & Typography**: Exact hex swatches and font pairings.
  3. **Component/Page Implementation**: Clean HTML/JSX/Tailwind or CSS code.
  4. **Audit Summary**: Severity findings (🔴 Blocking, 🟠 Important, 🟡 Polish).
