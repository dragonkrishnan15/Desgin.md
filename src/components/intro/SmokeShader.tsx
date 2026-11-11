import React, { useRef, useEffect } from 'react';

interface SmokeShaderProps {
  condense: number; // 0 = drift from edges, 1 = gathered at center
  alpha: number;    // Master fade 0 to 1
  layer?: 'back' | 'front';
  stopped?: boolean;
}

const VERT_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG_SHADER = `
precision mediump float;
uniform vec2  uRes;
uniform float uTime;
uniform float uCondense;
uniform float uAlpha;
uniform float uLayer;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); 
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ 
    v += a * noise(p); 
    p = p * 2.02 + vec2(1.7, 9.2); 
    a *= 0.5; 
  }
  return v;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * (uLayer > 0.5 ? 0.06 : 0.04);
  
  vec2 q = vec2(fbm(uv * 2.2 + t), fbm(uv * 2.2 + vec2(5.2, 1.3) - t * 0.8));
  vec2 r = vec2(fbm(uv * 2.2 + 3.0 * q + vec2(1.7, 9.2) + t * 1.2),
                fbm(uv * 2.2 + 3.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(uv * 2.4 + 3.0 * r);
  float d = length(uv);

  // uCondense: 0 = drifting in from edges, 1 = gathered at center
  float mask = mix(smoothstep(0.20, 0.95, d), 1.0 - smoothstep(0.02, 0.58, d), uCondense);
  float edgeCut = uLayer > 0.5 ? 0.48 : 0.42;
  float a = smoothstep(edgeCut, 0.84, f) * mask * uAlpha * (uLayer > 0.5 ? 0.65 : 1.0);

  // Graphite / deep silver smoke hue (strictly monochrome)
  vec3 smokeColor = vec3(0.05, 0.055, 0.07);
  gl_FragColor = vec4(smokeColor * a, a); // premultiplied alpha
}
`;

export const SmokeShader: React.FC<SmokeShaderProps> = ({
  condense,
  alpha,
  layer = 'back',
  stopped = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || stopped || alpha <= 0.001) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl', {
        premultipliedAlpha: true,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
    } catch {
      gl = null;
    }

    // WebGL setup
    if (gl) {
      const compile = (type: number, src: string) => {
        const s = gl!.createShader(type)!;
        gl!.shaderSource(s, src);
        gl!.compileShader(s);
        return s;
      };

      const vs = compile(gl.VERTEX_SHADER, VERT_SHADER);
      const fs = compile(gl.FRAGMENT_SHADER, FRAG_SHADER);
      const prog = gl.createProgram()!;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.useProgram(prog);

      // Fullscreen quad buffer
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const posLoc = gl.getAttribLocation(prog, 'position');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const uResLoc = gl.getUniformLocation(prog, 'uRes');
      const uTimeLoc = gl.getUniformLocation(prog, 'uTime');
      const uCondenseLoc = gl.getUniformLocation(prog, 'uCondense');
      const uAlphaLoc = gl.getUniformLocation(prog, 'uAlpha');
      const uLayerLoc = gl.getUniformLocation(prog, 'uLayer');

      // Cap DPR for butter-smooth 60fps across mobile, tablet, and 4K screens
      const isMobile = window.innerWidth < 768;
      const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.25);

      const resize = () => {
        if (!canvas) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        gl!.viewport(0, 0, canvas.width, canvas.height);
      };

      resize();
      window.addEventListener('resize', resize);

      let startTime = performance.now();

      const render = (now: number) => {
        const time = (now - startTime) / 1000;
        gl!.uniform2f(uResLoc, canvas.width, canvas.height);
        gl!.uniform1f(uTimeLoc, time);
        gl!.uniform1f(uCondenseLoc, condense);
        gl!.uniform1f(uAlphaLoc, alpha);
        gl!.uniform1f(uLayerLoc, layer === 'front' ? 1.0 : 0.0);

        gl!.clearColor(0, 0, 0, 0);
        gl!.clear(gl.COLOR_BUFFER_BIT);
        gl!.drawArrays(gl.TRIANGLES, 0, 6);

        if (!stopped && alpha > 0.001) {
          animRef.current = requestAnimationFrame(render);
        }
      };

      animRef.current = requestAnimationFrame(render);

      return () => {
        window.removeEventListener('resize', resize);
        if (animRef.current) cancelAnimationFrame(animRef.current);
        if (gl) {
          gl.deleteBuffer(buf);
          gl.deleteProgram(prog);
          gl.deleteShader(vs);
          gl.deleteShader(fs);
        }
      };
    } else {
      // 2D Soft Particle Canvas Fallback (soft radial gradient sprites, alpha 0.04-0.08)
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let w = window.innerWidth;
      let h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      const particles = Array.from({ length: 180 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: 30 + Math.random() * 50,
      }));

      const loop2d = () => {
        ctx.clearRect(0, 0, w, h);
        const cx = w / 2;
        const cy = h / 2;

        particles.forEach((p) => {
          if (condense > 0) {
            p.x += (cx - p.x) * (condense * 0.03);
            p.y += (cy - p.y) * (condense * 0.03);
          }
          p.x += p.vx;
          p.y += p.vy;

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          grad.addColorStop(0, `rgba(15, 18, 26, ${0.08 * alpha})`);
          grad.addColorStop(0.6, `rgba(15, 18, 26, ${0.03 * alpha})`);
          grad.addColorStop(1, 'rgba(15, 18, 26, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });

        if (!stopped && alpha > 0.001) {
          animRef.current = requestAnimationFrame(loop2d);
        }
      };

      animRef.current = requestAnimationFrame(loop2d);
      return () => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
      };
    }
  }, [condense, alpha, layer, stopped]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${
        layer === 'front' ? 'z-20' : 'z-0'
      }`}
    />
  );
};

