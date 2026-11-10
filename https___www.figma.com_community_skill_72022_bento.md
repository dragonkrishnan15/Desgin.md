The operational logic, trigger patterns, and evaluation rubrics have been extracted from all 4 Figma Agent skills. Below is the breakdown of what each skill does, followed by clean, standardized .md prompt specifications ready to drop into an AI agent toolchain (Claude Code, Antigravity, Cursor, or Gemini Gems).

### **What Each Skill Does & Why It Exists**

> 1. **better-interface (Jakub Krehel)**  
   * **Role:** General-purpose interface auditor & polish orchestrator.  
   * **Purpose:** Catches visual noise, misaligned elements, weak contrast, and layout fragility. It pins concrete finding cards beside selected frames rather than giving vague critique.  
> 2. **accessibility-review (WCAG 2.1 AA Audit)**  
   * **Role:** Compliance & usability inspector.  
   * **Purpose:** Evaluates non-text content (alt tags), focus visibility, keyboard navigation traps, tap targets ($\geq 44\times 44px$), and text/UI contrast ratios ($\geq 4.5:1$ / $3:1$).  
> 3. **find-animation-opportunities (Emil Kowalski)**  
   * **Role:** Interaction & motion filter.  
   * **Purpose:** Acts as a **filter, not a wishlist**. It rejects unnecessary animations (e.g. repeated 100+ times/day) and only approves motion that provides feedback, spatial continuity, or clarity within strict millisecond budgets.  
> 4. **bento-board-ui (Modular Grid Layout Engine)**  
   * **Role:** Layout & spatial composer.  
   * **Purpose:** Breaks rigid "3-cards-in-a-row" SaaS templates by composing content into Apple/Linear-style modular bento grids using 2D CSS Grid tracks, asymmetric cells ($1\times 1$, $1\times 2$, $2\times 1$, $2\times 2$), and self-contained compartments.

### **1\. better-interface.md**

Markdown  
\---  
name: better-interface  
description: Review an interface screen or component across UI polish, accessibility, layout, typography, and writing. Pin findings as cards ranked by severity. Use when asked to audit, critique, or polish a UI before shipping.  
\---

\# Better Interface

Senior-level interface polish and audit. Evaluates evidence and deterministic numbers over subjective taste.

\#\# 1\. Evaluation Dimensions

\#\#\# Layout & Edges  
\- Align elements strictly to shared edges and grid lines; eliminate stray 1px/2px misalignments.  
\- Group related items with intentional proximity; separate unrelated elements with structural whitespace.  
\- Breakpoints must come from content constraints, not device presets. Hold structure until it breaks.

\#\#\# Typography & Hierarchy  
\- Limit type scale to 5–7 distinct steps with a scale ratio ≥ 1.2.  
\- Line-height: Tight for display/headings (1.1–1.2), comfortable for body copy (1.4–1.6).  
\- Body copy measure must stay within 45–75 characters per line.  
\- Never use more than 2 distinct typefaces; pair for contrast, not subtle near-identical likeness.

\#\#\# Controls & Affordances  
\- Controls must look distinct from content (background surface, border, or reserved interactive zones).  
\- Interactive tap/click targets: minimum 44×44px (touch) or 40×40px (desktop density).  
\- Scale on press: Subtle tactile feedback (0.96 scale) on active state; never drop below 0.95.

\#\#\# Spacing & System Tokens  
\- Enforce strict 4px/8px modular rhythm. Flag arbitrary gaps (e.g., 13px, 27px).  
\- Internal padding must always be smaller than or equal to external bounding gaps.

\#\# 2\. Reporting Format

Rank findings by reach and leverage (shared design token fixes outrank isolated leaf fixes):

\- 🔴 **\*\*Blocking:\*\*** Inaccessible contrast, overlapping hit targets, broken keyboard flow, unreadable text.  
\- 🟠 **\*\*Important:\*\*** Inconsistent spacing tokens, weak visual hierarchy, awkward line wraps, unclear interactive states.  
\- 🟡 **\*\*Polish:\*\*** Fine letter-spacing tweaks, micro-alignment adjustments, subtle tactile feedback additions.

State the root cause, exact location/element, and the concrete value needed to fix it. Conclude with 2–3 strengths.

### **2\. accessibility-review.md**

Markdown  
\---  
name: accessibility-review  
description: Run a WCAG 2.1 AA accessibility audit on a design, component, or screen. Trigger with "check a11y", "audit accessibility", or when validating contrast, touch targets, keyboard navigation, and screen reader affordances.  
\---

\# Accessibility Review (WCAG 2.1 AA)

Audits UI designs against WCAG 2.1 Level AA compliance. Flags hard failures and blocks before handoff.

\#\# 1\. Compliance Checklist

\#\#\# Perceivable  
\- **\*\*Text Contrast (1.4.3):\*\*** Normal text (\<24px or \<19px bold) ≥ 4.5:1. Large text ≥ 3:1.  
\- **\*\*Non-Text Contrast (1.4.11):\*\*** UI components, active state borders, and graphical icons ≥ 3:1 against background.  
\- **\*\*Color Independence (1.4.1):\*\*** Never use color alone to convey status or errors; pair with icons, text badges, or shapes.  
\- **\*\*Images & Icons (1.1.1):\*\*** Informational graphics require semantic \`alt\` descriptions; decorative icons require \`aria-hidden="true"\` or empty alt.

\#\#\# Operable  
\- **\*\*Interactive Targets (2.5.5):\*\*** Minimum 44×44 CSS px (iOS) or 48×48 dp (Android) hit areas.  
\- **\*\*Keyboard Navigation (2.1.1 / 2.4.3):\*\*** All controls reachable and activatable via Tab/Space/Enter in logical sequence.  
\- **\*\*Focus Rings (2.4.7):\*\*** High-contrast, unmistakable focus indicators. Never strip default outlines without a custom replacement.  
\- **\*\*Modal Traps:\*\*** Modal dialogs must trap keyboard focus and release focus back to trigger upon closing.

\#\#\# Understandable & Robust  
\- **\*\*Input Labels (3.3.2):\*\*** Explicit, persistent visible labels for all inputs (placeholders do not count as labels).  
\- **\*\*Error Identification (3.3.1):\*\*** Describe errors clearly in text and associate with input via \`aria-describedby\`.  
\- **\*\*Headings & Landmarks (1.3.1):\*\*** Strict sequential heading order (\`h1\` → \`h2\` → \`h3\`) with no skipping.

\#\# 2\. Severity Ladder  
\- 🔴 **\*\*Critical Fix:\*\*** Completely blocks users with disabilities (failing text contrast, untabbable controls, missing form labels).  
\- 🟠 **\*\*Major Fix:\*\*** Causes disorientation or high friction (missing focus indicator, sub-44px targets, skipped heading levels).  
\- 🟡 **\*\*Minor Fix:\*\*** Nice-to-have compliance enhancement (missing landmark tags, redundant link descriptions).

### **3\. find-animation-opportunities.md**

Markdown  
\---  
name: find-animation-opportunities  
description: Search a UI screen or codebase for places that lack motion but genuinely benefit from it, and reject everything that shouldn't animate. Proposes exact curves and durations. Read-only; does not write arbitrary code.  
\---

\# Find Animation Opportunities

A disciplined motion audit and filter based on Emil Kowalski’s animation philosophy. Proposes high-conviction micro-interactions with exact durations and easings.

\#\# Hard Rules  
\- **\*\*Filter First:\*\*** Reject most candidates. A short list of high-impact animations beats an over-animated, sluggish interface.  
\- **\*\*No Decoration on Dense Functional UI:\*\*** Data tables, charts, and information displays must stay static and legible.

\#\# The 4-Question Gate (Every candidate must pass in order)

1\. **\*\*Frequency:\*\*** How often does the user trigger this action?  
   \- *\*100+ times/day\** (keyboard shortcuts, command palettes, primary nav) → **\*\*Reject.\*\*** Instant execution only.  
   \- *\*Tens of times/day\** (toggle switches, list row clicks) → Suggest only near-imperceptible motion (\<150ms).  
   \- *\*Occasional\** (modals, dialogs, sheets, toast notices) → Eligible (standard animation).  
   \- *\*Rare / First-Time\** (onboarding steps, milestone celebration) → Eligible for delight budget.  
2\. **\*\*Purpose:\*\*** Must match one of these explicitly:  
   \- *\*Feedback\** (confirming user intent: button press scale).  
   \- *\*Spatial Consistency\** (showing origin/destination: sheet expands from trigger, toast slides from bottom).  
   \- *\*State Indication\** (making change legible: chevron rotation on expand).  
   \- *\*Preventing Jarring Change\** (bridging visual pop-in or layout jumps).  
3\. **\*\*Speed & Duration Budgets:\*\***  
   \- Press feedback: 100–160ms  
   \- Tooltips / small popovers: 125–200ms  
   \- Dropdowns / selects: 150–250ms  
   \- Modals / drawers: 200–350ms  
   \- UI motion must stay under 300ms total. Anything requiring slow, showy timing is rejected.  
4\. **\*\*Function:\*\*** Does motion clarify or distract? If it adds cognitive drag, reject.

\#\# Output Format  
For every accepted opportunity:  
\- **\*\*Element:\*\*** Target component.  
\- **\*\*Purpose:\*\*** (Feedback \| Spatial \| State \| Bridge).  
\- **\*\*Recipe:\*\*** Exact CSS/Framer-motion values (duration, CSS bezier curve, property changed).  
\- **\*\*Reduced Motion Alternative:\*\*** Instant switch or gentle fade replacement.

Must include a **\*\*Rejected Candidates\*\*** section explaining what was deliberately left static and why.

### **4\. bento-board-ui.md**

Markdown  
\---  
name: bento-board-ui  
description: Generate and refine modern Bento Grid layouts for dashboards, portfolios, feature showcases, and landing pages. Composes content into responsive, asymmetric, modular cards with clean spatial balance.  
\---

\# Bento Board UI

Composes complex interfaces into Apple- and Linear-style modular Bento Boards. Emphasizes visual rhythm, asymmetric card proportions, and self-contained content units.

\#\# Core Rules

1\. **\*\*Grid Foundation:\*\***  
   \- Use 2D CSS Grid tracks (\`repeat(3, 1fr)\` or \`repeat(4, 1fr)\`).  
   \- Use uniform gutters across the entire board (typically \`16px\` or \`24px\`).  
2\. **\*\*Asymmetry & Hierarchy:\*\***  
   \- Avoid equal "3-in-a-row" identical cards. Mix cell dimensions:  
     \- \`1x1\` Compact metric / indicator / icon badge  
     \- \`2x1\` Wide feature card with short horizontal graph or copy  
     \- \`1x2\` Tall vertical preview or contextual feed  
     \- \`2x2\` Hero showcase card (primary focal point)  
3\. **\*\*Self-Contained Compartments:\*\***  
   \- Every cell must function as an independent, readable compartment with internal hierarchy (Title → Metric/Graphic → Caption).  
   \- Internal padding must be uniform across all cards (\`p-5\` or \`p-6\`).  
   \- Use generous rounded borders (\`rounded-2xl\` or \`rounded-3xl\` / 16–24px radius).  
4\. **\*\*Subtle Surface Contrast:\*\***  
   \- Dark mode: True black or dark slate background (\`\#0A0A0C\`) with elevated card surfaces (\`\#141418\` or \`\#1A1A22\`) and subtle borders (\`border-white/10\`).  
   \- Light mode: Soft off-white canvas (\`\#F5F5F7\`) with pure white card surfaces (\`\#FFFFFF\`) and hairline borders (\`border-black/5\`).

\#\# Output Deliverables  
1\. **\*\*Layout Blueprint:\*\*** Text-based grid schematic showing cell row/column spans.  
2\. **\*\*Component Implementation:\*\*** Semantic HTML/JSX using Tailwind CSS grid classes (\`col-span-2\`, \`row-span-2\`, \`grid-cols-1 md:grid-cols-4\`).  
3\. **\*\*Responsive Breakpoints:\*\*** 1-column stack on mobile (\`\<640px\`), 2-column reflow on tablet, full multi-span bento grid on desktop (\`≥1024px\`).

For a comprehensive video breakdown showing these types of agent skills running live on the canvas, check out this guide on [10 Figma Agent Skills](https://www.youtube.com/shorts/xg3EGl0wK_s). This video directly demonstrates how agent skills like better-interface and find-animation-opportunities operate inside design workflows.