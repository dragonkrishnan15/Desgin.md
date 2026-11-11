export type Palette = {
  id: string;
  name: string;
  bg: string;
  surface: string;
  surface2: string;
  text: string;
  muted: string;
  accent: string;
  accent2: string;
  success: string;
  danger: string;
  border: string;
};

export type FontPair = {
  id: string;
  name: string;
  heading: string;   // CSS font-family stack
  body: string;
  mono?: string;
  headingWeight: number;
  bodyWeight: number;
  tracking: string;  // letter-spacing for headings, e.g. "-0.03em"
  loader: () => Promise<unknown>; // dynamic import of the fontsource css
};

export type Geometry = {
  radius: number;       // px: 0, 8, 16, 24, 999
  gap: number;          // px: 8..24
  borderWidth: number;  // 0, 1, 2, 3
  shadow: "none" | "soft" | "hard" | "glow";
  blur: number;         // glass blur px, 0 = off
};

export type StyleDef = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  defaults: {
    paletteId: string;
    fontId: string;
    geometry: Geometry;
  };
  rules: string[];      // 3-5 short signature rules (shown only in Details)
  bestFor: string[];
  variant: string;      // value for data-style, drives structural CSS
  isCustom?: boolean;   // true if user-created or imported
  customCss?: string;   // optional custom CSS rules
};

export type Theme = {
  styleId: string;
  paletteId: string;
  fontId: string;
  geometry: Geometry;
  motion: "none" | "subtle" | "expressive";
  locks: {
    style: boolean;
    palette: boolean;
    font: boolean;
    geometry: boolean;
  };
};

export type BlueprintGroup = 
  | 'Product UI' 
  | 'Presentation & Story' 
  | 'Marketing' 
  | 'Industry Homepages';

export type Blueprint = {
  id: string;
  name: string;
  group: BlueprintGroup;
  tagline: string;
  deliverable: string;
  interactive: boolean;
  defaults: {
    palette: Partial<Palette>;
    fontId: string;
    geometry: Geometry;
    motion: 'none' | 'subtle' | 'expressive';
  };
  defaultDirection: string;
  unique: {
    required: string;
    contentPrep?: string;
    layout?: string;
    extras?: string;
    acceptance: string[];
  };
  blocks: ('A' | 'B' | 'C' | 'D' | 'E')[];
  placeholders: ('PROJECT' | 'AUDIENCE' | 'APPROVED_CONTENT' | 'BRAND_RULES')[];
  renderer: string;
};

export type BlueprintInputs = {
  PROJECT?: string;
  AUDIENCE?: string;
  APPROVED_CONTENT?: string;
  BRAND_RULES?: string;
};

export type Stage = "pick" | "mix" | "compare" | "prototype";
export type ViewportMode = "desktop" | "tablet" | "mobile";

