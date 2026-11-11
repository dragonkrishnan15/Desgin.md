import { Theme } from '@/types';
import { getAllRegisteredStyles } from '@/data/styleRegistry';
import { PALETTES } from '@/data/palettes';
import { FONT_PAIRS } from '@/data/fonts';
import { BLUEPRINTS } from '@/data/blueprints';

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function serializeThemeToQuery(theme: Theme, blueprintId?: string | null): string {
  const params = new URLSearchParams();
  params.set('s', theme.styleId);
  params.set('p', theme.paletteId);
  params.set('f', theme.fontId);
  params.set('r', theme.geometry.radius.toString());
  params.set('m', theme.motion);
  if (blueprintId) {
    params.set('b', blueprintId);
  }
  return params.toString();
}

export function syncThemeToUrl(theme: Theme, blueprintId?: string | null): void {
  if (typeof window === 'undefined') return;

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    const queryString = serializeThemeToQuery(theme, blueprintId);
    const newUrl = `${window.location.pathname}?${queryString}`;
    window.history.replaceState({}, '', newUrl);
  }, 300);
}

export function parseBlueprintFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const b = params.get('b');
    return b && BLUEPRINTS.some(bp => bp.id === b) ? b : 'workspace-dashboard';
  } catch {
    return 'workspace-dashboard';
  }
}

export function parseThemeFromUrl(fallbackTheme: Theme): Theme {
  if (typeof window === 'undefined') return fallbackTheme;

  try {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('s');
    const p = params.get('p');
    const f = params.get('f');
    const r = params.get('r');
    const m = params.get('m');

    const allStyles = getAllRegisteredStyles();
    const validStyle = s && allStyles.some(item => item.id === s) ? s : fallbackTheme.styleId;
    const validPalette = p && PALETTES.some(item => item.id === p) ? p : fallbackTheme.paletteId;
    const validFont = f && FONT_PAIRS.some(item => item.id === f) ? f : fallbackTheme.fontId;
    
    let validRadius = fallbackTheme.geometry.radius;
    if (r !== null) {
      const parsedRadius = parseInt(r, 10);
      if (!isNaN(parsedRadius) && parsedRadius >= 0) {
        validRadius = parsedRadius;
      }
    }

    const validMotion = (m === 'none' || m === 'subtle' || m === 'expressive') 
      ? m 
      : fallbackTheme.motion;

    return {
      ...fallbackTheme,
      styleId: validStyle,
      paletteId: validPalette,
      fontId: validFont,
      motion: validMotion,
      geometry: {
        ...fallbackTheme.geometry,
        radius: validRadius,
      },
    };
  } catch (err) {
    console.warn('Failed to parse theme from URL:', err);
    return fallbackTheme;
  }
}

