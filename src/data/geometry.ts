import { Geometry } from '@/types';

export type GeometryPreset = {
  id: string;
  name: string;
  description: string;
  geometry: Geometry;
};

export const GEOMETRY_PRESETS: GeometryPreset[] = [
  {
    id: 'sharp-0',
    name: 'Sharp',
    description: '0px corners, high precision, architectural lines',
    geometry: {
      radius: 0,
      gap: 16,
      borderWidth: 1,
      shadow: 'none',
      blur: 0,
    },
  },
  {
    id: 'soft-8',
    name: 'Soft',
    description: '8px subtle radius, balanced and versatile',
    geometry: {
      radius: 8,
      gap: 16,
      borderWidth: 1,
      shadow: 'soft',
      blur: 0,
    },
  },
  {
    id: 'rounded-16',
    name: 'Rounded',
    description: '16px playful & friendly modern SaaS curves',
    geometry: {
      radius: 16,
      gap: 16,
      borderWidth: 1,
      shadow: 'soft',
      blur: 0,
    },
  },
  {
    id: 'bento-24',
    name: 'Bento',
    description: '24px generous Bento container curvature',
    geometry: {
      radius: 24,
      gap: 20,
      borderWidth: 1,
      shadow: 'soft',
      blur: 8,
    },
  },
  {
    id: 'pill-999',
    name: 'Pill',
    description: 'Maximal organic curvature & rounded capsules',
    geometry: {
      radius: 999,
      gap: 16,
      borderWidth: 1,
      shadow: 'soft',
      blur: 0,
    },
  },
];

