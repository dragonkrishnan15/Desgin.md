import { Theme } from '@/types';
import { getResolvedTheme, getThemeVariables } from './applyTheme';
import { serializeThemeToQuery } from '@/state/urlSync';

export function exportCssVariables(theme: Theme): string {
  const vars = getThemeVariables(theme);
  const lines = Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`);
  return `:root {\n${lines.join('\n')}\n}`;
}

export function exportTailwindConfig(theme: Theme): string {
  const { palette, font } = getResolvedTheme(theme);
  const geo = theme.geometry;

  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: '${palette.bg}',
        surface: '${palette.surface}',
        surface2: '${palette.surface2}',
        text: '${palette.text}',
        muted: '${palette.muted}',
        accent: '${palette.accent}',
        accent2: '${palette.accent2}',
        border: '${palette.border}',
        success: '${palette.success}',
        danger: '${palette.danger}',
      },
      borderRadius: {
        theme: '${geo.radius}px',
      },
      fontFamily: {
        heading: [${font.heading}],
        body: [${font.body}],
      },
      letterSpacing: {
        heading: '${font.tracking}',
      },
    },
  },
};`;
}

export function exportJsonTheme(theme: Theme): string {
  const { palette, font, style } = getResolvedTheme(theme);
  return JSON.stringify(
    {
      style: {
        id: style.id,
        name: style.name,
        category: style.category,
        rules: style.rules,
      },
      palette,
      font: {
        id: font.id,
        name: font.name,
        heading: font.heading,
        body: font.body,
        headingWeight: font.headingWeight,
        bodyWeight: font.bodyWeight,
        tracking: font.tracking,
      },
      geometry: theme.geometry,
      motion: theme.motion,
    },
    null,
    2
  );
}

export function exportShareUrl(theme: Theme): string {
  const query = serializeThemeToQuery(theme);
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${window.location.pathname}?${query}`;
  }
  return `https://stylelab.pages.dev/?${query}`;
}

