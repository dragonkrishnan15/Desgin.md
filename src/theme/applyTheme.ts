import { Theme, Palette, FontPair, StyleDef } from '@/types';
import { PALETTES } from '@/data/palettes';
import { FONT_PAIRS } from '@/data/fonts';
import { getAllRegisteredStyles } from '@/data/styleRegistry';
import React from 'react';

export function getResolvedTheme(theme: Theme): {
  palette: Palette;
  font: FontPair;
  style: StyleDef;
} {
  const styles = getAllRegisteredStyles();
  const palette = PALETTES.find(p => p.id === theme.paletteId) || PALETTES[0];
  const font = FONT_PAIRS.find(f => f.id === theme.fontId) || FONT_PAIRS[0];
  const style = styles.find(s => s.id === theme.styleId) || styles[0];
  return { palette, font, style };
}

export function computeShadow(shadowType: Theme['geometry']['shadow'], accentColor: string, borderColor: string): string {
  switch (shadowType) {
    case 'none':
      return 'none';
    case 'soft':
      return '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)';
    case 'hard':
      return `5px 5px 0px ${borderColor}`;
    case 'glow':
      return `0 0 25px ${accentColor}44, 0 0 50px ${accentColor}22`;
    default:
      return '0 8px 20px -4px rgba(0,0,0,0.2)';
  }
}

export function getThemeVariables(theme: Theme): React.CSSProperties & Record<string, string | number> {
  const { palette, font } = getResolvedTheme(theme);
  const geo = theme.geometry;
  const shadowValue = computeShadow(geo.shadow, palette.accent, palette.border);

  return {
    '--bg': palette.bg,
    '--surface': palette.surface,
    '--surface2': palette.surface2,
    '--text': palette.text,
    '--muted': palette.muted,
    '--accent': palette.accent,
    '--accent2': palette.accent2,
    '--success': palette.success,
    '--danger': palette.danger,
    '--border': palette.border,

    '--font-heading': font.heading,
    '--font-body': font.body,
    '--font-mono': font.mono || "'JetBrains Mono', monospace",
    '--heading-weight': font.headingWeight.toString(),
    '--body-weight': font.bodyWeight.toString(),
    '--tracking': font.tracking,

    '--radius': `${geo.radius}px`,
    '--gap': `${geo.gap}px`,
    '--border-w': `${geo.borderWidth}px`,
    '--shadow': shadowValue,
    '--blur': `${geo.blur}px`,
  } as React.CSSProperties & Record<string, string | number>;
}

