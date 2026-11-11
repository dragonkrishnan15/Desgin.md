# How to Add More Designs to StyleLab

StyleLab is built with an **open, plug-and-play architecture**. You can add new design styles anytime using **any of the 3 methods below**:

---

## Method 1: In the Web App (Zero-Code Visual Builder)

You can create, test, and save new designs directly from the UI without touching any code:

1. Click the **"+ New Design"** button in the header toolbar (on the Pick carousel screen) or next to the Style rail in Mix mode.
2. Fill in:
   - **Design Name & Tagline** (e.g. *"Vaporwave Sunset"*, *"Pastel wireframes and retro chrome"*).
   - **Category**: Select an existing category or create a new custom category.
   - **Structural Personality Archetype**: Choose from 12 archetypes (*Bento Grid*, *Glassmorphism*, *Neo-Brutalism*, *Minimalism*, *Neumorphism*, *Claymorphism*, *Cyberpunk*, *Editorial*, *Retro Terminal*, *Aurora*, etc.).
   - **Default Color Palette & Font Pair**.
   - **Geometry & Surface**: Adjust corner radius (0-36px), gap, border width, blur, and shadow.
   - **Signature Rules & Best-For tags**.
   - *(Optional)* Custom CSS overrides.
3. Observe the **Live Real-Time Specimen Preview** directly in the modal.
4. Click **"Create & Save Design"**.
5. Your design is instantly added to the carousel, search, filter chips, Mix rails, Compare, and Prototype stages. It is automatically saved in `localStorage` and persists across browser refreshes!
6. Custom designs feature a `CUSTOM` badge and can be deleted anytime with the trash icon on the card.

---

## Method 2: In Code via `src/data/customStyles.ts` (Quickest Code Method)

Open [`src/data/customStyles.ts`](file:///D:/Library1/website/src/data/customStyles.ts) and append your style using the `defineStyle()` helper:

```ts
import { defineStyle } from './styleRegistry';

export const CODE_CUSTOM_STYLES: StyleDef[] = [
  defineStyle({
    name: 'Solarpunk Utopia',
    id: 'solarpunk-utopia',               // optional: auto-generated from name if omitted
    category: 'Futuristic',               // appears in filter chips automatically
    tagline: 'High-tech ecology and warm brass aesthetics.',
    paletteId: 'wabi-sabi-tea',           // any palette ID from data/palettes.ts
    fontId: 'plus-jakarta',               // any font ID from data/fonts.ts
    variant: 'glassmorphism',             // archetype variant
    geometry: {
      radius: 20,
      gap: 16,
      borderWidth: 1,
      shadow: 'glow',
      blur: 10,
    },
    rules: [
      'Warm botanical accents with natural contrast',
      'Curved glass geometry with radiant backdrops',
      'Optimistic eco-futurist hierarchy'
    ],
    bestFor: ['Climate tech', 'Eco brands', 'Clean energy', 'Portfolios'],
    // customCss: `[data-style="solarpunk-utopia"] .card { border-color: #84cc16; }` // optional!
  }),
];
```

That's it! `styleRegistry.ts` automatically merges this style into the app on build.

---

## Method 3: JSON Import & Export (Bulk Sharing)

You can share designs between devices or colleagues via JSON:

1. Click **"+ New Design"** → Switch to the **"JSON Import / Export"** tab.
2. Paste a single `StyleDef` object or an array of `StyleDef[]` objects.
3. Click **"Import Design(s)"**.
4. You can also click **"Export All Designs"** to download the entire library as a `.json` backup file.

### Sample JSON Format:
```json
{
  "name": "Tokyo Neon 2099",
  "category": "Futuristic",
  "tagline": "Drenched in rain and magenta neon.",
  "defaults": {
    "paletteId": "cyberpunk-neon",
    "fontId": "space-mono-tech",
    "geometry": {
      "radius": 4,
      "gap": 18,
      "borderWidth": 2,
      "shadow": "glow",
      "blur": 4
    }
  },
  "rules": [
    "High-contrast dark backdrops with dual neon glow",
    "Sharp chamfered geometry with glowing borders",
    "Dense monospace and condensed display headers"
  ],
  "bestFor": ["Gaming sites", "Web3 apps", "Tech conferences"],
  "variant": "cyberpunk"
}
```

---

## How to Add New Palettes & Fonts

### Adding a Color Palette
Add an entry in [`src/data/palettes.ts`](file:///D:/Library1/website/src/data/palettes.ts):
```ts
{
  id: 'my-custom-palette',
  name: 'My Palette Name',
  bg: '#0a0a0f',
  surface: '#14141f',
  surface2: '#1f1f2e',
  text: '#ffffff',
  muted: '#9494a8',
  accent: '#6366f1',
  accent2: '#a855f7',
  success: '#10b981',
  danger: '#ef4444',
  border: '#2a2a3d',
}
```

### Adding a Font Pair
Add an entry in [`src/data/fonts.ts`](file:///D:/Library1/website/src/data/fonts.ts) with its fontsource dynamic loader.

