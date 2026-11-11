/**
 * Lightweight 2D Perlin / Simplex style gradient noise.
 * Generates smooth natural curl forces without heavy external libraries.
 */

const PERM = new Uint8Array(512);
const P = new Uint8Array(256);

// Seeded pseudorandom permutation table
for (let i = 0; i < 256; i++) {
  P[i] = i;
}
for (let i = 255; i > 0; i--) {
  const r = Math.floor(Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 256);
  const temp = P[i];
  P[i] = P[r];
  P[r] = temp;
}
for (let i = 0; i < 512; i++) {
  PERM[i] = P[i & 255];
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t: number, a: number, b: number): number {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number): number {
  const h = hash & 7;
  const u = h < 4 ? x : y;
  const v = h < 4 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

/**
 * Returns 2D Perlin noise value in range [-1, 1]
 */
export function noise2D(x: number, y: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;

  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);

  const u = fade(xf);
  const v = fade(yf);

  const aa = PERM[PERM[X] + Y];
  const ab = PERM[PERM[X] + Y + 1];
  const ba = PERM[PERM[X + 1] + Y];
  const bb = PERM[PERM[X + 1] + Y + 1];

  const x1 = lerp(u, grad(aa, xf, yf), grad(ba, xf - 1, yf));
  const x2 = lerp(u, grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1));

  return lerp(v, x1, x2);
}

