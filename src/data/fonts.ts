import { FontPair } from '@/types';

export const FONT_PAIRS: FontPair[] = [
  {
    id: 'inter-modern',
    name: 'Inter Pure',
    heading: "'Inter Variable', -apple-system, BlinkMacSystemFont, sans-serif",
    body: "'Inter Variable', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', monospace",
    headingWeight: 700,
    bodyWeight: 400,
    tracking: '-0.03em',
    loader: () => import('@fontsource-variable/inter'),
  },
  {
    id: 'plus-jakarta',
    name: 'Plus Jakarta',
    heading: "'Plus Jakarta Sans Variable', -apple-system, sans-serif",
    body: "'Plus Jakarta Sans Variable', -apple-system, sans-serif",
    headingWeight: 700,
    bodyWeight: 400,
    tracking: '-0.025em',
    loader: () => import('@fontsource-variable/plus-jakarta-sans'),
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk',
    heading: "'Space Grotesk', -apple-system, sans-serif",
    body: "'Inter Variable', -apple-system, sans-serif",
    mono: "'Fira Code', monospace",
    headingWeight: 700,
    bodyWeight: 400,
    tracking: '-0.035em',
    loader: async () => {
      await import('@fontsource/space-grotesk');
      await import('@fontsource-variable/inter');
    },
  },
  {
    id: 'dm-sans',
    name: 'DM Sans Geometric',
    heading: "'DM Sans', sans-serif",
    body: "'DM Sans', sans-serif",
    headingWeight: 700,
    bodyWeight: 400,
    tracking: '-0.02em',
    loader: () => import('@fontsource/dm-sans'),
  },
  {
    id: 'playfair-editorial',
    name: 'Playfair Editorial',
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter Variable', -apple-system, sans-serif",
    headingWeight: 600,
    bodyWeight: 400,
    tracking: '-0.015em',
    loader: async () => {
      await import('@fontsource/playfair-display');
      await import('@fontsource-variable/inter');
    },
  },
  {
    id: 'syne-expressive',
    name: 'Syne Brutal',
    heading: "'Syne Variable', -apple-system, sans-serif",
    body: "'Inter Variable', sans-serif",
    headingWeight: 800,
    bodyWeight: 400,
    tracking: '-0.04em',
    loader: async () => {
      await import('@fontsource-variable/syne');
      await import('@fontsource-variable/inter');
    },
  },
  {
    id: 'fraunces-warm',
    name: 'Fraunces Warmth',
    heading: "'Fraunces', Georgia, serif",
    body: "'DM Sans', sans-serif",
    headingWeight: 600,
    bodyWeight: 400,
    tracking: '-0.02em',
    loader: async () => {
      await import('@fontsource/fraunces');
      await import('@fontsource/dm-sans');
    },
  },
  {
    id: 'cinzel-luxury',
    name: 'Cinzel Classical',
    heading: "'Cinzel', 'Times New Roman', serif",
    body: "'Inter Variable', sans-serif",
    headingWeight: 700,
    bodyWeight: 400,
    tracking: '0.08em',
    loader: async () => {
      await import('@fontsource/cinzel');
      await import('@fontsource-variable/inter');
    },
  },
  {
    id: 'outfit-contemporary',
    name: 'Outfit Tech',
    heading: "'Outfit', sans-serif",
    body: "'Outfit', sans-serif",
    headingWeight: 600,
    bodyWeight: 400,
    tracking: '-0.02em',
    loader: () => import('@fontsource/outfit'),
  },
  {
    id: 'bricolage-punchy',
    name: 'Bricolage Neo',
    heading: "'Bricolage Grotesque', sans-serif",
    body: "'Inter Variable', sans-serif",
    headingWeight: 800,
    bodyWeight: 400,
    tracking: '-0.035em',
    loader: async () => {
      await import('@fontsource/bricolage-grotesque');
      await import('@fontsource-variable/inter');
    },
  },
  {
    id: 'jetbrains-terminal',
    name: 'JetBrains Code',
    heading: "'JetBrains Mono', monospace",
    body: "'JetBrains Mono', monospace",
    mono: "'JetBrains Mono', monospace",
    headingWeight: 700,
    bodyWeight: 400,
    tracking: '-0.01em',
    loader: () => import('@fontsource/jetbrains-mono'),
  },
  {
    id: 'source-serif-literary',
    name: 'Source Serif',
    heading: "'Source Serif 4', Georgia, serif",
    body: "'Source Serif 4', Georgia, serif",
    headingWeight: 600,
    bodyWeight: 400,
    tracking: '-0.01em',
    loader: () => import('@fontsource/source-serif-4'),
  },
  {
    id: 'ibm-plex-retro',
    name: 'IBM Plex System',
    heading: "'IBM Plex Mono', monospace",
    body: "'Inter Variable', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    headingWeight: 600,
    bodyWeight: 400,
    tracking: '-0.02em',
    loader: async () => {
      await import('@fontsource/ibm-plex-mono');
      await import('@fontsource-variable/inter');
    },
  },
  {
    id: 'pixel-arcade',
    name: '8-Bit Arcade',
    heading: "'Press Start 2P', monospace",
    body: "'VT323', monospace",
    mono: "'VT323', monospace",
    headingWeight: 400,
    bodyWeight: 400,
    tracking: '0.02em',
    loader: async () => {
      await import('@fontsource/press-start-2p');
      await import('@fontsource/vt323');
    },
  },
];

// In-memory cache for loaded font families
const loadedFontIds = new Set<string>();

export async function loadFontPair(fontId: string): Promise<void> {
  if (loadedFontIds.has(fontId)) return;
  const pair = FONT_PAIRS.find(f => f.id === fontId);
  if (pair) {
    try {
      await pair.loader();
      loadedFontIds.add(fontId);
    } catch (err) {
      console.warn(`Failed to dynamically load font pair "${fontId}":`, err);
    }
  }
}

export function isFontLoaded(fontId: string): boolean {
  return loadedFontIds.has(fontId);
}

