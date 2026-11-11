import { useEffect, useRef } from 'react';
import { EmblemRefs } from './Emblem';
import { FLAP, FlapConfig, FEATHER_LAG_RANKS, PIVOTS } from './FLAP';
import { easeInOutCubic, easeInOutSine, lerp, Spring } from './springs';

export type IntroPhase =
  | 'smoke'
  | 'materialize'
  | 'unfurl'
  | 'flap1'
  | 'flap2'
  | 'flap3'
  | 'charge'
  | 'hold'
  | 'idle'
  | 'burst'
  | 'reveal';

interface UseFlapEngineOptions {
  phase: IntroPhase;
  materializeProgress: number; // 0 to 1 during materialize
  isReady: boolean;
  reducedMotion: boolean;
  stageContainerRef?: React.RefObject<HTMLDivElement>;
  onPhaseChange?: (phase: IntroPhase) => void;
  config?: FlapConfig;
}

export function useFlapEngine(refs: EmblemRefs, options: UseFlapEngineOptions) {
  const animIdRef = useRef<number | null>(null);
  const phaseRef = useRef<IntroPhase>(options.phase);
  const isReadyRef = useRef<boolean>(options.isReady);
  const configRef = useRef<FlapConfig>(options.config || FLAP);
  const optionsRef = useRef(options);

  optionsRef.current = options;
  phaseRef.current = options.phase;
  isReadyRef.current = options.isReady;
  configRef.current = options.config || FLAP;

  useEffect(() => {
    if (options.reducedMotion) {
      return;
    }

    const crestSpring = new Spring(
      configRef.current.crestSpring.k,
      configRef.current.crestSpring.c,
      1,
      0
    );
    const tailSpring = new Spring(
      configRef.current.tailSpring.k,
      configRef.current.tailSpring.c,
      1,
      0
    );

    let lastTime = performance.now();
    let flapTime = 0;
    let unfurlProgress = 0;
    let idleTimer = 0;
    let nextIdleFlapTime = 2.0;

    const calcC = (p: number, downLimit: number, upEndLimit: number): number => {
      if (p < downLimit) {
        return easeInOutCubic(p / downLimit);
      } else if (p < upEndLimit) {
        return 1 - easeInOutSine((p - downLimit) / (upEndLimit - downLimit));
      } else {
        return 0;
      }
    };

    const wrap = (val: number): number => {
      const res = val % 1;
      return res < 0 ? res + 1 : res;
    };

    const loop = (currentTime: number) => {
      const rawDt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const speedMult = configRef.current.speedMultiplier || 1.0;
      const dt = rawDt * speedMult;
      const currentPhase = phaseRef.current;
      const cfg = configRef.current;

      // Slow organic idle float
      const idleFloatY = Math.sin(currentTime * 0.0009) * 3;
      const idleFloatRot = Math.sin(currentTime * 0.0006) * 0.4;

      let wingAngleBase = cfg.top;
      let wingAngleL = cfg.top;
      let wingAngleR = cfg.top;
      let forewingAngleL = 0;
      let forewingAngleR = 0;
      let bodyLift = 0;
      let bodyRoll = 0;
      let specularSweep = 0;
      let rimGlowOpacity = 0.4;
      let rimColor = '#ffffff';
      let crestTargetAngle = 0;
      let tailTargetAngle = 0;
      let foreshorteningScaleY = 1;
      let foreshorteningSkew = 0;
      let featherTorsionY = 1.0;
      let featherShadowOpacity = 0.85;

      // Camera coordinates & zoom
      let cameraScale = 1.0;
      let cameraShakeX = 0;
      let cameraShakeY = 0;
      let cameraOriginX = '50%';
      let cameraOriginY = '50%';

      if (currentPhase === 'smoke') {
        if (refs.emblemGroupRef.current) {
          refs.emblemGroupRef.current.style.opacity = '0';
        }
      } else if (currentPhase === 'materialize') {
        // Bottom-up metal formation inside smoke (Section 4)
        if (refs.emblemGroupRef.current) {
          refs.emblemGroupRef.current.style.opacity = '1';
          refs.emblemGroupRef.current.style.transform = `translate(0px, ${idleFloatY}px) rotate(${idleFloatRot}deg)`;
        }
        // Wings stay folded in start pose (+55deg)
        wingAngleL = 55;
        wingAngleR = 55;
        crestTargetAngle = 6;
        tailTargetAngle = -8;
      } else if (currentPhase === 'unfurl') {
        // Unfurl (2.4 - 3.2s): wings fan open from +55deg to top (+8deg)
        unfurlProgress = Math.min(unfurlProgress + dt * 1.25, 1);
        const easeUnfurl = easeInOutCubic(unfurlProgress);
        wingAngleBase = lerp(55, cfg.top, easeUnfurl);
        wingAngleL = wingAngleBase;
        wingAngleR = wingAngleBase;

        crestTargetAngle = (1 - easeUnfurl) * 8;
        tailTargetAngle = -(1 - easeUnfurl) * 12;

        if (unfurlProgress >= 1) {
          optionsRef.current.onPhaseChange?.('flap1');
          flapTime = 0;
        }
      } else if (
        currentPhase === 'flap1' ||
        currentPhase === 'flap2' ||
        currentPhase === 'flap3'
      ) {
        if (refs.emblemGroupRef.current) {
          refs.emblemGroupRef.current.style.opacity = '1';
        }

        const flapIdx =
          currentPhase === 'flap1' ? 0 : currentPhase === 'flap2' ? 1 : 2;

        // Section 6.1: Camera push-in (1.00 -> 1.06)
        cameraScale = 1.0 + (flapIdx * 0.025);

        // Section 6.2: Hero close-up on left wing tips during Flap 2 downstroke
        if (flapIdx === 1) {
          const flapDur2 = cfg.cycle * (1 - cfg.jitter.dur);
          const p2 = flapTime / flapDur2;
          if (p2 < 0.65) {
            const zoomT = Math.sin((p2 / 0.65) * Math.PI);
            cameraScale = lerp(1.025, 1.48, zoomT);
            cameraOriginX = '32%';
            cameraOriginY = '38%';

            // Depth of field blur on background elements during macro zoom
            if (refs.wingRRef.current) refs.wingRRef.current.style.filter = `blur(${zoomT * 3}px) opacity(${lerp(1, 0.68, zoomT)})`;
            if (refs.bodyRef.current) refs.bodyRef.current.style.filter = `blur(${zoomT * 1.5}px) opacity(${lerp(1, 0.85, zoomT)})`;
          } else {
            if (refs.wingRRef.current) refs.wingRRef.current.style.filter = 'none';
            if (refs.bodyRef.current) refs.bodyRef.current.style.filter = 'none';
          }
        } else {
          if (refs.wingRRef.current) refs.wingRRef.current.style.filter = 'none';
          if (refs.bodyRef.current) refs.bodyRef.current.style.filter = 'none';
        }

        const flapDur = cfg.cycle * (1 + (flapIdx === 1 ? -cfg.jitter.dur : cfg.jitter.dur));
        flapTime += dt;
        const p = flapTime / flapDur;

        // Amplitudes: Flap 1 (0.70), Flap 2 (0.85), Flap 3 (1.40)
        let amp = cfg.amp[flapIdx];
        if (flapIdx === 0 && p < 0.1) {
          bodyLift = 4 * Math.sin(p * 10 * Math.PI);
        }

        // Asymmetric flap calculation
        const pL = wrap(p);
        const pR = wrap(p + cfg.jitter.lr);
        const cL = calcC(pL, cfg.down, cfg.upEnd);
        const cR = calcC(pR, cfg.down, cfg.upEnd);

        wingAngleL = lerp(cfg.top, cfg.bottom * amp, cL);
        wingAngleR = lerp(cfg.top, cfg.bottom * (amp * (1 - cfg.jitter.amp * 0.4)), cR);

        // Biomechanical Dual-Joint Forewing Arching & Venetian Blind Torsion
        if (p > cfg.down && p < cfg.upEnd) {
          const upT = (p - cfg.down) / (cfg.upEnd - cfg.down);
          const archCurve = Math.sin(upT * Math.PI);
          // Forewing flexes inward during upstroke recovery
          forewingAngleL = (cfg.elbowBend || 8) * archCurve;
          forewingAngleR = (cfg.elbowBend || 8) * archCurve;
          // Venetian blind torsion (feathers thin edge-on to vent air)
          featherTorsionY = 1.0 - 0.14 * archCurve;
          featherShadowOpacity = 0.85 - 0.45 * archCurve;
        } else {
          forewingAngleL = 0;
          forewingAngleR = 0;
          featherTorsionY = 1.0;
          featherShadowOpacity = 0.85;
        }

        // Flap 3 Aerodynamic Power Camera Shake
        if (flapIdx === 2 && Math.abs(p - 0.28) < 0.05) {
          const shakeIntensity = 1.0 - Math.abs(p - 0.28) / 0.05;
          cameraShakeY = (Math.random() - 0.5) * 5.0 * shakeIntensity;
          cameraShakeX = (Math.random() - 0.5) * 2.5 * shakeIntensity;
        }

        // 3D Foreshortening on downstroke
        if (p < cfg.down) {
          const midT = Math.sin((p / cfg.down) * Math.PI);
          foreshorteningScaleY = 1 - 0.08 * midT;
          foreshorteningSkew = 3 * midT;
        }

        // Body lift (Flap 3 surges with lift3 = 30px)
        const liftMax = flapIdx === 2 ? cfg.lift3 : cfg.lift;
        const liftP = wrap(p - 0.05);
        bodyLift = -liftMax * calcC(liftP, cfg.down, cfg.upEnd);
        bodyRoll = 0.6 * Math.sin(p * Math.PI * 2);

        crestTargetAngle = -bodyLift * 0.28;
        tailTargetAngle = bodyLift * 0.48;

        // Specular sweep streak across feathers on downstroke
        if (p < cfg.down) {
          specularSweep = Math.sin((p / cfg.down) * Math.PI) * 28;
          rimGlowOpacity = lerp(0.4, 0.9, p / cfg.down);
          rimColor = '#BFE3FF'; // Ice-blue specular sheen
        } else {
          rimGlowOpacity = lerp(0.9, 0.35, (p - cfg.down) / (cfg.upEnd - cfg.down));
          rimColor = '#ffffff';
        }

        // Glints flash at peak downstroke (p ~ 0.28)
        const isNearDownstrokePeak = Math.abs(p - 0.28) < 0.07;
        const glintScale = isNearDownstrokePeak ? (flapIdx === 2 ? 1.5 : 1.15) : 0.45;
        const glintOpacity = isNearDownstrokePeak ? 1.0 : 0.25;

        for (let g = 0; g < 4; g++) {
          const elL = refs.glintsLRef.current[g];
          const elR = refs.glintsRRef.current[g];
          if (elL) {
            elL.style.transform = `scale(${glintScale})`;
            elL.style.opacity = `${glintOpacity}`;
          }
          if (elR) {
            elR.style.transform = `scale(${glintScale})`;
            elR.style.opacity = `${glintOpacity}`;
          }
        }

        if (p >= 1.0) {
          flapTime = 0;
          if (flapIdx === 0) {
            optionsRef.current.onPhaseChange?.('flap2');
          } else if (flapIdx === 1) {
            optionsRef.current.onPhaseChange?.('flap3');
          } else {
            // Flap 3 complete -> transition to Charge
            optionsRef.current.onPhaseChange?.('charge');
          }
        }
      } else if (currentPhase === 'charge') {
        // Section 5.1: Charge (0.25s) - Inhale (scale 0.98), rim light brightens
        cameraScale = 1.12;
        wingAngleL = cfg.top + 3;
        wingAngleR = cfg.top + 3;
        bodyLift = -cfg.lift3 * 0.7;
        rimGlowOpacity = 1.0;
        rimColor = '#BFE3FF';

        for (let g = 0; g < 4; g++) {
          const elL = refs.glintsLRef.current[g];
          const elR = refs.glintsRRef.current[g];
          if (elL) {
            elL.style.transform = 'scale(1.4)';
            elL.style.opacity = '1';
          }
          if (elR) {
            elR.style.transform = 'scale(1.4)';
            elR.style.opacity = '1';
          }
        }

        flapTime += dt;
        if (flapTime > 0.25) {
          if (isReadyRef.current) {
            optionsRef.current.onPhaseChange?.('burst');
          } else {
            optionsRef.current.onPhaseChange?.('idle');
            idleTimer = 0;
          }
        }
      } else if (currentPhase === 'idle') {
        idleTimer += dt;
        if (idleTimer > nextIdleFlapTime) {
          const idleP = (idleTimer - nextIdleFlapTime) / (cfg.cycle * 1.1);
          if (idleP <= 1) {
            const idleC = calcC(idleP, cfg.down, cfg.upEnd);
            wingAngleL = lerp(cfg.top, cfg.bottom * 0.3, idleC);
            wingAngleR = lerp(cfg.top, cfg.bottom * 0.3, idleC);
            bodyLift = -cfg.lift * 0.35 * idleC;
          } else {
            idleTimer = 0;
            nextIdleFlapTime = 1.8 + Math.random() * 1.4;
          }
        } else {
          wingAngleL = cfg.top;
          wingAngleR = cfg.top;
        }

        if (isReadyRef.current) {
          optionsRef.current.onPhaseChange?.('burst');
        }
      }

      // Update Springs
      const crestAngle = crestSpring.update(dt, crestTargetAngle);
      const tailAngle = tailSpring.update(dt, tailTargetAngle);

      // Direct DOM transforms
      // Stage Camera Push-in / Close-up + Flap 3 Impact Shake
      if (options.stageContainerRef?.current) {
        options.stageContainerRef.current.style.transform = `scale(${cameraScale}) translate(${cameraShakeX}px, ${cameraShakeY}px)`;
        options.stageContainerRef.current.style.transformOrigin = `${cameraOriginX} ${cameraOriginY}`;
      }

      // Master Emblem float & lift
      if (refs.emblemGroupRef.current && currentPhase !== 'materialize' && currentPhase !== 'smoke') {
        refs.emblemGroupRef.current.style.transform = `translate(0px, ${bodyLift + idleFloatY}px) rotate(${bodyRoll + idleFloatRot}deg)`;
      }

      // Wings (Shoulder)
      if (refs.wingLRef.current) {
        refs.wingLRef.current.style.transform = `rotate(${wingAngleL}deg) scaleY(${foreshorteningScaleY}) skewX(${foreshorteningSkew}deg)`;
      }
      if (refs.wingRRef.current) {
        refs.wingRRef.current.style.transform = `rotate(${wingAngleR}deg) scaleY(${foreshorteningScaleY}) skewX(${-foreshorteningSkew}deg)`;
      }

      // Forewings (Elbow/Wrist Joint Articulation for Biological Upstroke Arching)
      if (refs.forewingLRef?.current) {
        refs.forewingLRef.current.style.transform = `rotate(${forewingAngleL}deg)`;
      }
      if (refs.forewingRRef?.current) {
        refs.forewingRRef.current.style.transform = `rotate(${forewingAngleR}deg)`;
      }

      // 7 Feathers cascade lag & Venetian blind torsion
      for (let i = 0; i < 7; i++) {
        const lagRank = FEATHER_LAG_RANKS[i];
        let pFeatherL = 0;
        let pFeatherR = 0;

        if (
          currentPhase === 'flap1' ||
          currentPhase === 'flap2' ||
          currentPhase === 'flap3'
        ) {
          const flapDur = cfg.cycle;
          const p = flapTime / flapDur;
          pFeatherL = wrap(p - lagRank * cfg.featherLag);
          pFeatherR = wrap(p + cfg.jitter.lr - lagRank * cfg.featherLag);
        }

        const cFeatherL = calcC(pFeatherL, cfg.down, cfg.upEnd);
        const cFeatherR = calcC(pFeatherR, cfg.down, cfg.upEnd);

        const extraL = lagRank * cfg.featherExtra * cFeatherL;
        const extraR = lagRank * cfg.featherExtra * cFeatherR;

        const fanL =
          pFeatherL > cfg.down && pFeatherL < cfg.upEnd
            ? lagRank * cfg.featherFan * Math.sin(((pFeatherL - cfg.down) / (cfg.upEnd - cfg.down)) * Math.PI)
            : 0;
        const fanR =
          pFeatherR > cfg.down && pFeatherR < cfg.upEnd
            ? lagRank * cfg.featherFan * Math.sin(((pFeatherR - cfg.down) / (cfg.upEnd - cfg.down)) * Math.PI)
            : 0;

        const fElL = refs.feathersLRef.current[i];
        if (fElL) {
          fElL.style.transform = `rotate(${extraL + fanL}deg) scaleY(${featherTorsionY})`;
        }
        const fElR = refs.feathersRRef.current[i];
        if (fElR) {
          fElR.style.transform = `rotate(${extraR + fanR}deg) scaleY(${featherTorsionY})`;
        }
      }

      // Shoulder Shields
      if (refs.shieldLRef.current) {
        refs.shieldLRef.current.style.transform = `rotate(${wingAngleL * 0.3}deg)`;
      }
      if (refs.shieldRRef.current) {
        refs.shieldRRef.current.style.transform = `rotate(${wingAngleR * 0.3}deg)`;
      }

      // Crest
      if (refs.crestRef.current) {
        refs.crestRef.current.style.transform = `rotate(${crestAngle}deg)`;
      }
      if (refs.crestOuterRef.current) {
        refs.crestOuterRef.current.style.transform = `rotate(${crestAngle * 0.3}deg)`;
      }

      // Tail
      if (refs.tailRef.current) {
        refs.tailRef.current.style.transform = `rotate(${tailAngle}deg)`;
      }

      // Contact Shadow
      if (refs.shadowRef.current) {
        const shadowScale = 1 - 0.12 * Math.abs(bodyLift / (cfg.lift3 || 30));
        const shadowOpacity = Math.max(0.15, 0.65 - 0.25 * Math.abs(bodyLift / (cfg.lift3 || 30)));
        refs.shadowRef.current.style.transform = `scale(${shadowScale})`;
        refs.shadowRef.current.style.opacity = `${shadowOpacity}`;
      }

      // Counter-rotating Gradients & Specular Sweep
      if (refs.gradWingLRef.current) {
        refs.gradWingLRef.current.setAttribute(
          'gradientTransform',
          `rotate(${-wingAngleL}, ${PIVOTS.shoulder.x}, ${PIVOTS.shoulder.y}) translate(${specularSweep}, 0)`
        );
      }
      if (refs.gradWingRRef.current) {
        refs.gradWingRRef.current.setAttribute(
          'gradientTransform',
          `rotate(${-wingAngleR}, ${1000 - PIVOTS.shoulder.x}, ${PIVOTS.shoulder.y}) translate(${-specularSweep}, 0)`
        );
      }

      // Rim glow & feather shadow opacity modulation
      if (refs.wingLRef.current) {
        refs.wingLRef.current.style.setProperty('--rim-opacity', `${rimGlowOpacity}`);
        refs.wingLRef.current.style.setProperty('--rim-color', rimColor);
        refs.wingLRef.current.style.setProperty('--feather-shadow-opacity', `${featherShadowOpacity}`);
      }
      if (refs.wingRRef.current) {
        refs.wingRRef.current.style.setProperty('--rim-opacity', `${rimGlowOpacity}`);
        refs.wingRRef.current.style.setProperty('--rim-color', rimColor);
        refs.wingRRef.current.style.setProperty('--feather-shadow-opacity', `${featherShadowOpacity}`);
      }

      animIdRef.current = requestAnimationFrame(loop);
    };

    animIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animIdRef.current) {
        cancelAnimationFrame(animIdRef.current);
      }
    };
  }, [options.reducedMotion]);
}
