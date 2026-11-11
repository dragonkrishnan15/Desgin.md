import { StyleDef } from '@/types';
import { defineStyle } from './styleRegistry';

/**
 * ============================================================================
 * DEVELOPER CUSTOM STYLES EXTENSION FILE
 * ============================================================================
 * 
 * To add a new design style in code, simply add an entry to the array below!
 * You can use the `defineStyle()` helper so you only need to provide the basics.
 * 
 * Example:
 * 
 * defineStyle({
 *   name: 'Solarpunk Brass',
 *   category: 'Futuristic & Nature',
 *   tagline: 'Lush greenery, brass fixtures, and solar circuits.',
 *   paletteId: 'wabi-sabi-tea',
 *   fontId: 'plus-jakarta',
 *   variant: 'glassmorphism', // or 'bento-grid', 'neo-brutalism', 'minimalism', etc.
 *   geometry: { radius: 24, gap: 20, borderWidth: 1, shadow: 'glow', blur: 12 },
 *   rules: [
 *     'Warm brass borders with botanical greens',
 *     'Translucent glass panels with ambient glow',
 *     'Optimistic organic typography'
 *   ],
 *   bestFor: ['Clean energy', 'Climate tech', 'Architecture', 'Eco-luxury'],
 * }),
 * 
 */

export const CODE_CUSTOM_STYLES: StyleDef[] = [
  // Example custom style ready to be used or customized:
  defineStyle({
    name: 'Solarpunk Utopia',
    id: 'solarpunk-utopia',
    category: 'Futuristic',
    tagline: 'High-tech ecology and warm brass aesthetics.',
    paletteId: 'wabi-sabi-tea',
    fontId: 'plus-jakarta',
    variant: 'glassmorphism',
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
    bestFor: ['Climate tech', 'Eco brands', 'Clean energy', 'Modern portfolios'],
  }),
];

