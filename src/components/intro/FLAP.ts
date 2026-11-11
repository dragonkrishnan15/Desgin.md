// Master flap physics & animation parameters for the Chrome Emblem Loader

export interface FlapConfig {
  cycle: number;
  down: number;
  upEnd: number;
  top: number;
  bottom: number;
  amp: [number, number, number];
  featherLag: number;
  featherExtra: number;
  featherFan: number;
  elbowBend: number;
  lift: number;
  lift3: number;
  crestSpring: { k: number; c: number };
  tailSpring: { k: number; c: number };
  jitter: { amp: number; dur: number; lr: number };
  speedMultiplier: number;
}

export const DEFAULT_FLAP: FlapConfig = {
  cycle: 0.95,
  down: 0.30,
  upEnd: 0.92,
  top: 8,
  bottom: -26,
  amp: [0.70, 0.85, 1.40],
  featherLag: 0.045,
  featherExtra: 10,
  featherFan: 6,
  elbowBend: 8,
  lift: 10,
  lift3: 30,
  crestSpring: { k: 120, c: 10 },
  tailSpring: { k: 90, c: 8 },
  jitter: { amp: 0.08, dur: 0.06, lr: 0.012 },
  speedMultiplier: 1.0,
};

export const FLAP = { ...DEFAULT_FLAP };

// Feather lag ranks from top primary (longest, lags most) to bottom covert (shortest)
export const FEATHER_LAG_RANKS = [1.0, 0.85, 0.70, 0.55, 0.40, 0.25, 0.15];

// SVG viewBox 0 0 1000 550 pivot points (left wing & center elements)
export const PIVOTS = {
  shoulder: { x: 440, y: 290 },
  elbow: { x: 345, y: 260 }, // Avian forearm/wrist articulation joint
  feathers: [
    { x: 405, y: 220 }, // Feather 0 (top, longest primary)
    { x: 375, y: 240 }, // Feather 1
    { x: 355, y: 265 }, // Feather 2
    { x: 345, y: 295 }, // Feather 3
    { x: 350, y: 328 }, // Feather 4
    { x: 365, y: 358 }, // Feather 5
    { x: 390, y: 388 }, // Feather 6 (bottom inner covert)
  ],
  crest: { x: 500, y: 235 },
  tail: { x: 505, y: 470 },
  shadow: { x: 500, y: 490 },
};

