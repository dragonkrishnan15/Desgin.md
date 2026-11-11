// Tiny damped spring and easing solvers for natural physical follow-through

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

export function easeInQuad(t: number): number {
  return t * t;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export class Spring {
  k: number; // stiffness
  c: number; // damping
  m: number; // mass
  x: number = 0; // position
  v: number = 0; // velocity
  target: number = 0;

  constructor(stiffness: number, damping: number, mass: number = 1, initial: number = 0) {
    this.k = stiffness;
    this.c = damping;
    this.m = mass;
    this.x = initial;
    this.target = initial;
  }

  setParams(stiffness: number, damping: number) {
    this.k = stiffness;
    this.c = damping;
  }

  update(dt: number, target?: number): number {
    if (target !== undefined) {
      this.target = target;
    }
    // Substep for numerical stability at variable framerates
    const subSteps = 3;
    const subDt = Math.min(dt, 0.05) / subSteps;
    for (let i = 0; i < subSteps; i++) {
      const force = -this.k * (this.x - this.target) - this.c * this.v;
      const a = force / this.m;
      this.v += a * subDt;
      this.x += this.v * subDt;
    }
    return this.x;
  }

  reset(val: number = 0) {
    this.x = val;
    this.v = 0;
    this.target = val;
  }
}

