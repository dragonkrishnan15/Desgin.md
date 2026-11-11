import { StyleDef } from '@/types';
import { STYLES as BUILTIN_STYLES } from './styles';
import { CODE_CUSTOM_STYLES } from './customStyles';
import { getBlueprintsAsStyles } from './blueprints';

export const CUSTOM_STYLES_STORAGE_KEY = 'stylelab_custom_designs_v1';

/**
 * Standard structural personality archetypes available for styles.
 * These map to rules in variants.css or token-driven defaults.
 */
export const ARCHETYPE_VARIANTS = [
  { id: 'bento-grid', label: 'Bento Grid', desc: 'Rounded modular tiles with micro-borders' },
  { id: 'neo-brutalism', label: 'Neo-Brutalism', desc: 'Thick black borders, hard offset shadows, bold type' },
  { id: 'glassmorphism', label: 'Glassmorphism', desc: 'Frosted glass with backdrop blur and translucency' },
  { id: 'minimalism', label: 'Minimalism', desc: 'High whitespace, quiet borders, calm typography' },
  { id: 'swiss-design', label: 'Swiss / Bauhaus', desc: 'Strict grid alignment, asymmetric scale, functional' },
  { id: 'neumorphism', label: 'Neumorphism', desc: 'Soft dual shadows extruded from surface' },
  { id: 'claymorphism', label: 'Claymorphism', desc: 'Inflated 3D rounded depth with double inset glow' },
  { id: 'cyberpunk', label: 'Cyberpunk', desc: 'Neon edge glow, angular aesthetics, futuristic grit' },
  { id: 'editorial-design', label: 'Editorial Magazine', desc: 'Refined serif elegance, delicate rules' },
  { id: 'retro-terminal', label: 'Retro Terminal', desc: 'Monospace, CRT scanline glow, vintage computer' },
  { id: 'aurora', label: 'Aurora Gradient', desc: 'Dreamy chromatic blur meshes and ambient lighting' },
  { id: 'standard', label: 'Token-Driven', desc: 'Clean baseline driven purely by tokens' },
] as const;

/**
 * Helper to easily define a new style in code with smart defaults.
 * Use this when adding new designs in code so you don't need to specify everything.
 */
export function defineStyle(options: {
  name: string;
  id?: string;
  category?: string;
  tagline: string;
  paletteId?: string;
  fontId?: string;
  geometry?: Partial<StyleDef['defaults']['geometry']>;
  rules?: string[];
  bestFor?: string[];
  variant?: string;
  customCss?: string;
}): StyleDef {
  const generatedId = options.id || options.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return {
    id: generatedId,
    name: options.name,
    category: options.category || 'Custom & Experimental',
    tagline: options.tagline,
    defaults: {
      paletteId: options.paletteId || 'bento-midnight',
      fontId: options.fontId || 'inter-modern',
      geometry: {
        radius: options.geometry?.radius ?? 16,
        gap: options.geometry?.gap ?? 16,
        borderWidth: options.geometry?.borderWidth ?? 1,
        shadow: options.geometry?.shadow ?? 'soft',
        blur: options.geometry?.blur ?? 0,
      },
    },
    rules: options.rules || [
      'Clean modern hierarchy and responsive layout',
      'Balanced typographic scale with purposeful contrast',
      'Consistent geometry and border treatment',
    ],
    bestFor: options.bestFor || ['Modern web apps', 'Landing pages', 'Portfolios'],
    variant: options.variant || 'bento-grid',
    customCss: options.customCss,
  };
}

/**
 * Load custom user-created styles from localStorage
 */
export function loadCustomStylesFromStorage(): StyleDef[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_STYLES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(s => ({ ...s, isCustom: true })) : [];
  } catch (err) {
    console.warn('Failed to load custom styles from localStorage:', err);
    return [];
  }
}

/**
 * Save custom user-created styles to localStorage
 */
export function saveCustomStylesToStorage(customStyles: StyleDef[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CUSTOM_STYLES_STORAGE_KEY, JSON.stringify(customStyles));
  } catch (err) {
    console.warn('Failed to save custom styles to localStorage:', err);
  }
}

/**
 * Get all available styles: built-ins + custom styles from storage
 */
export function getAllRegisteredStyles(): StyleDef[] {
  const storageCustom = loadCustomStylesFromStorage();
  
  // Combine builtins + code custom styles + blueprints
  const baseStyles = [...BUILTIN_STYLES, ...CODE_CUSTOM_STYLES, ...getBlueprintsAsStyles()];
  
  // Storage custom overrides or appends
  const storageIds = new Set(storageCustom.map(c => c.id));
  const filteredBase = baseStyles.filter(b => !storageIds.has(b.id));
  
  return [...filteredBase, ...storageCustom];
}

/**
 * Dynamically derive all category names from current styles list
 */
export function getCategoriesFromStyles(styles: StyleDef[]): string[] {
  const categories = new Set<string>();
  styles.forEach(s => {
    if (s.category) categories.add(s.category);
  });
  return ['All', ...Array.from(categories)];
}

/**
 * Validate a style definition object (useful for imports)
 */
export function isValidStyleDef(obj: any): obj is StyleDef {
  if (!obj || typeof obj !== 'object') return false;
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.tagline === 'string' &&
    typeof obj.category === 'string' &&
    obj.defaults &&
    typeof obj.defaults.paletteId === 'string' &&
    typeof obj.defaults.fontId === 'string' &&
    obj.defaults.geometry &&
    typeof obj.defaults.geometry.radius === 'number'
  );
}
