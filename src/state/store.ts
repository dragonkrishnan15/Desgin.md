import { create } from 'zustand';
import { Theme, Geometry, Stage, StyleDef } from '@/types';
import { 
  getAllRegisteredStyles, 
  saveCustomStylesToStorage, 
  loadCustomStylesFromStorage,
  isValidStyleDef 
} from '@/data/styleRegistry';
import { STYLES as BUILTIN_STYLES } from '@/data/styles';
import { PALETTES } from '@/data/palettes';
import { FONT_PAIRS } from '@/data/fonts';
import { GEOMETRY_PRESETS } from '@/data/geometry';
import { contrast } from '@/theme/contrast';
import { syncThemeToUrl, parseThemeFromUrl, parseBlueprintFromUrl } from './urlSync';
import { getBlueprintById } from '@/data/blueprints';

const STORAGE_BUCKET_KEY = 'stylelab_saved_bucket_v1';

function loadBucketFromStorage(): Theme[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_BUCKET_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Failed to load bucket from localStorage:', err);
    return [];
  }
}

function saveBucketToStorage(bucket: Theme[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_BUCKET_KEY, JSON.stringify(bucket));
  } catch (err) {
    console.warn('Failed to save bucket to localStorage:', err);
  }
}

const DEFAULT_THEME: Theme = {
  styleId: 'bento-grid',
  paletteId: 'bento-midnight',
  fontId: 'plus-jakarta',
  geometry: {
    radius: 24,
    gap: 20,
    borderWidth: 1,
    shadow: 'soft',
    blur: 8,
  },
  motion: 'expressive',
  locks: {
    style: false,
    palette: false,
    font: false,
    geometry: false,
  },
};

const INITIAL_THEME: Theme = parseThemeFromUrl(DEFAULT_THEME);
const INITIAL_STYLES = getAllRegisteredStyles();

export interface StyleLabState {
  theme: Theme;
  hoverPreviewTheme: Theme | null;
  stage: Stage;
  activeIndex: number;
  compareList: Theme[];
  bucket: Theme[];
  viewport: 'desktop' | 'tablet' | 'mobile';
  styles: StyleDef[];
  blueprintId: string | null;

  // Blueprint action
  setBlueprint: (blueprintId: string | null) => void;

  // Style Registry actions (for easy extensibility)
  addCustomStyle: (newStyle: StyleDef) => void;
  deleteCustomStyle: (styleId: string) => void;
  importCustomStyles: (jsonStr: string) => { success: boolean; count: number; error?: string };
  resetCustomStyles: () => void;

  // Theme Actions
  setStyle: (styleId: string) => void;
  setPalette: (paletteId: string) => void;
  setFont: (fontId: string) => void;
  setGeometry: (geometry: Partial<Geometry>) => void;
  setMotion: (motion: Theme['motion']) => void;
  setViewport: (vp: 'desktop' | 'tablet' | 'mobile') => void;
  toggleLock: (slot: keyof Theme['locks']) => void;
  setHoverPreviewTheme: (theme: Theme | null) => void;
  shuffle: () => void;
  setStage: (stage: Stage) => void;
  setActiveIndex: (index: number) => void;
  applyThemeDirectly: (newTheme: Theme) => void;

  // Bucket & Compare
  addToBucket: (themeToSave?: Theme) => void;
  removeFromBucket: (index: number) => void;
  addToCompare: (themeToCompare?: Theme) => void;
  removeFromCompare: (index: number) => void;
  clearCompare: () => void;
}

export const useStore = create<StyleLabState>((set, get) => ({
  theme: INITIAL_THEME,
  hoverPreviewTheme: null,
  stage: 'pick',
  activeIndex: Math.max(0, INITIAL_STYLES.findIndex(s => s.id === INITIAL_THEME.styleId)),
  compareList: [INITIAL_THEME],
  bucket: loadBucketFromStorage(),
  viewport: 'desktop',
  styles: INITIAL_STYLES,
  blueprintId: parseBlueprintFromUrl(),

  setBlueprint: (blueprintId: string | null) => {
    if (!blueprintId) {
      set({ blueprintId: null });
      syncThemeToUrl(get().theme, null);
      return;
    }

    const bp = getBlueprintById(blueprintId);
    if (!bp) {
      set({ blueprintId });
      syncThemeToUrl(get().theme, blueprintId);
      return;
    }

    // Defaults, not locks: apply suggested tokens to unlocked slots only
    const locks = get().theme.locks;
    const currentTheme = get().theme;

    const nextTheme: Theme = {
      ...currentTheme,
      fontId: locks.font ? currentTheme.fontId : bp.defaults.fontId,
      geometry: locks.geometry ? currentTheme.geometry : { ...bp.defaults.geometry },
      motion: bp.defaults.motion || currentTheme.motion,
    };

    set({ 
      blueprintId,
      theme: nextTheme 
    });
    syncThemeToUrl(nextTheme, blueprintId);
  },

  // Add a custom style and persist it
  addCustomStyle: (newStyle: StyleDef) => {
    const styleWithFlag: StyleDef = { ...newStyle, isCustom: true };
    const currentCustom = loadCustomStylesFromStorage();
    const updatedCustom = [
      ...currentCustom.filter(s => s.id !== styleWithFlag.id),
      styleWithFlag,
    ];
    saveCustomStylesToStorage(updatedCustom);

    const mergedStyles = getAllRegisteredStyles();
    set({ styles: mergedStyles });

    // Automatically select the new style
    get().setStyle(styleWithFlag.id);
  },

  // Delete a custom style
  deleteCustomStyle: (styleId: string) => {
    const currentCustom = loadCustomStylesFromStorage();
    const updatedCustom = currentCustom.filter(s => s.id !== styleId);
    saveCustomStylesToStorage(updatedCustom);

    const mergedStyles = getAllRegisteredStyles();
    const currentTheme = get().theme;
    
    // If deleted style was active, switch to first style
    if (currentTheme.styleId === styleId) {
      const fallbackStyle = mergedStyles[0] || BUILTIN_STYLES[0];
      set({ styles: mergedStyles });
      get().setStyle(fallbackStyle.id);
    } else {
      set({ styles: mergedStyles });
    }
  },

  // Import one or multiple styles from JSON
  importCustomStyles: (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      const itemsToImport = Array.isArray(parsed) ? parsed : [parsed];
      const validStyles: StyleDef[] = [];

      for (const item of itemsToImport) {
        if (isValidStyleDef(item)) {
          validStyles.push({ ...item, isCustom: true });
        }
      }

      if (validStyles.length === 0) {
        return { success: false, count: 0, error: 'No valid StyleDef found in JSON.' };
      }

      const currentCustom = loadCustomStylesFromStorage();
      const validIds = new Set(validStyles.map(v => v.id));
      const updatedCustom = [
        ...currentCustom.filter(c => !validIds.has(c.id)),
        ...validStyles,
      ];
      saveCustomStylesToStorage(updatedCustom);

      const mergedStyles = getAllRegisteredStyles();
      set({ styles: mergedStyles });
      get().setStyle(validStyles[0].id);

      return { success: true, count: validStyles.length };
    } catch (err: any) {
      return { success: false, count: 0, error: err.message || 'JSON parse failed' };
    }
  },

  // Reset custom styles back to original built-in defaults
  resetCustomStyles: () => {
    saveCustomStylesToStorage([]);
    const defaultStyles = BUILTIN_STYLES;
    set({ styles: defaultStyles });
    get().setStyle(defaultStyles[0].id);
  },

  setStyle: (styleId: string) => {
    const styles = get().styles;
    const style = styles.find(s => s.id === styleId) || styles[0];
    if (!style) return;

    set(state => {
      const locks = state.theme.locks;
      const nextTheme: Theme = {
        ...state.theme,
        styleId: style.id,
        paletteId: locks.palette ? state.theme.paletteId : style.defaults.paletteId,
        fontId: locks.font ? state.theme.fontId : style.defaults.fontId,
        geometry: locks.geometry ? state.theme.geometry : { ...style.defaults.geometry },
      };

      syncThemeToUrl(nextTheme, state.blueprintId);
      const styleIdx = styles.findIndex(s => s.id === style.id);

      return {
        theme: nextTheme,
        activeIndex: styleIdx !== -1 ? styleIdx : state.activeIndex,
      };
    });
  },

  setPalette: (paletteId: string) => {
    set(state => {
      const nextTheme: Theme = {
        ...state.theme,
        paletteId,
      };
      syncThemeToUrl(nextTheme, state.blueprintId);
      return { theme: nextTheme };
    });
  },

  setFont: (fontId: string) => {
    set(state => {
      const nextTheme: Theme = {
        ...state.theme,
        fontId,
      };
      syncThemeToUrl(nextTheme, state.blueprintId);
      return { theme: nextTheme };
    });
  },

  setGeometry: (geometryUpdate: Partial<Geometry>) => {
    set(state => {
      const nextTheme: Theme = {
        ...state.theme,
        geometry: {
          ...state.theme.geometry,
          ...geometryUpdate,
        },
      };
      syncThemeToUrl(nextTheme, state.blueprintId);
      return { theme: nextTheme };
    });
  },

  setMotion: (motion: Theme['motion']) => {
    set(state => {
      const nextTheme: Theme = {
        ...state.theme,
        motion,
      };
      syncThemeToUrl(nextTheme, state.blueprintId);
      return { theme: nextTheme };
    });
  },

  setViewport: (viewport: 'desktop' | 'tablet' | 'mobile') => set({ viewport }),

  toggleLock: (slot: keyof Theme['locks']) => {
    set(state => ({
      theme: {
        ...state.theme,
        locks: {
          ...state.theme.locks,
          [slot]: !state.theme.locks[slot],
        },
      },
    }));
  },

  setHoverPreviewTheme: (hoverTheme: Theme | null) => set({ hoverPreviewTheme: hoverTheme }),

  shuffle: () => {
    set(state => {
      const locks = state.theme.locks;
      const currentStyles = state.styles;
      let nextStyleId = state.theme.styleId;
      let nextPaletteId = state.theme.paletteId;
      let nextFontId = state.theme.fontId;
      let nextGeometry = { ...state.theme.geometry };

      // 1. Shuffle Style if unlocked
      if (!locks.style && currentStyles.length > 0) {
        const randStyle = currentStyles[Math.floor(Math.random() * currentStyles.length)];
        nextStyleId = randStyle.id;
      }

      // 2. Shuffle Palette if unlocked (Strict WCAG AA check)
      if (!locks.palette) {
        const validPalettes = PALETTES.filter(p => contrast(p.bg, p.text) >= 4.5);
        const randPalette = validPalettes[Math.floor(Math.random() * validPalettes.length)];
        nextPaletteId = randPalette.id;
      }

      // 3. Shuffle Font if unlocked
      if (!locks.font) {
        const randFont = FONT_PAIRS[Math.floor(Math.random() * FONT_PAIRS.length)];
        nextFontId = randFont.id;
      }

      // 4. Shuffle Geometry if unlocked
      if (!locks.geometry) {
        const randPreset = GEOMETRY_PRESETS[Math.floor(Math.random() * GEOMETRY_PRESETS.length)];
        nextGeometry = { ...randPreset.geometry };
      }

      const nextTheme: Theme = {
        ...state.theme,
        styleId: nextStyleId,
        paletteId: nextPaletteId,
        fontId: nextFontId,
        geometry: nextGeometry,
      };

      syncThemeToUrl(nextTheme, state.blueprintId);
      const styleIdx = currentStyles.findIndex(s => s.id === nextStyleId);

      return {
        theme: nextTheme,
        activeIndex: styleIdx !== -1 ? styleIdx : state.activeIndex,
      };
    });
  },

  setStage: (stage: Stage) => set({ stage }),
  setActiveIndex: (activeIndex: number) => set({ activeIndex }),

  applyThemeDirectly: (newTheme: Theme) => {
    syncThemeToUrl(newTheme, get().blueprintId);
    const styles = get().styles;
    const styleIdx = styles.findIndex(s => s.id === newTheme.styleId);
    set({
      theme: newTheme,
      activeIndex: styleIdx !== -1 ? styleIdx : 0,
      stage: 'mix',
    });
  },

  addToBucket: (themeToSave?: Theme) => {
    const currentTheme = themeToSave || get().theme;
    const bucket = get().bucket;
    // Don't duplicate if exact combo already in bucket
    const exists = bucket.some(
      b =>
        b.styleId === currentTheme.styleId &&
        b.paletteId === currentTheme.paletteId &&
        b.fontId === currentTheme.fontId &&
        b.geometry.radius === currentTheme.geometry.radius
    );
    if (!exists) {
      const updated = [currentTheme, ...bucket];
      saveBucketToStorage(updated);
      set({ bucket: updated });
    }
  },

  removeFromBucket: (index: number) => {
    const updated = get().bucket.filter((_, i) => i !== index);
    saveBucketToStorage(updated);
    set({ bucket: updated });
  },

  addToCompare: (themeToCompare?: Theme) => {
    const currentTheme = themeToCompare || get().theme;
    const compareList = get().compareList;
    if (compareList.length >= 3) return; // max 3
    const exists = compareList.some(
      c =>
        c.styleId === currentTheme.styleId &&
        c.paletteId === currentTheme.paletteId &&
        c.fontId === currentTheme.fontId
    );
    if (!exists) {
      set({ compareList: [...compareList, currentTheme] });
    }
  },

  removeFromCompare: (index: number) => {
    const updated = get().compareList.filter((_, i) => i !== index);
    set({ compareList: updated });
  },

  clearCompare: () => {
    set({ compareList: [] });
  },
}));
