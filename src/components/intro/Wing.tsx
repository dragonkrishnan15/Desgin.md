import React from 'react';
import { PIVOTS } from './FLAP';

interface WingProps {
  side: 'left' | 'right';
  wingGroupRef: React.RefObject<SVGGElement>;
  forewingRef?: React.RefObject<SVGGElement>;
  featherRefs: React.MutableRefObject<(SVGGElement | null)[]>;
  shieldRef: React.RefObject<SVGGElement>;
  glintRefs?: React.MutableRefObject<(SVGGElement | null)[]>;
  gradientId: string;
}

// 7 exquisitely sculpted aerodynamic feather paths (left wing in 1000x550 space)
// Root pivots match: (405,220), (375,240), (355,265), (345,295), (350,328), (365,358), (390,388)
const FEATHER_PATHS = [
  // Feather 0: Longest primary wing blade, sweeping up and out to (110, 80)
  "M 405 220 C 370 195 240 135 110 80 C 145 105 235 170 330 220 C 370 238 395 240 405 220 Z",
  // Feather 1: Second primary blade reaching (135, 145)
  "M 375 240 C 335 220 225 180 135 145 C 175 175 255 225 320 260 C 355 275 370 265 375 240 Z",
  // Feather 2: Third primary blade reaching (165, 215)
  "M 355 265 C 315 250 230 230 165 215 C 205 245 270 280 315 305 C 345 315 355 295 355 265 Z",
  // Feather 3: Fourth flight feather reaching (200, 285)
  "M 345 295 C 310 290 245 285 200 285 C 240 315 285 340 315 355 C 340 360 348 330 345 295 Z",
  // Feather 4: Fifth secondary feather reaching (240, 350)
  "M 350 328 C 320 335 275 345 240 350 C 275 375 310 395 335 400 C 352 400 355 365 350 328 Z",
  // Feather 5: Sixth covert reaching (285, 410)
  "M 365 358 C 345 375 310 395 285 410 C 315 425 340 435 360 435 C 372 430 372 395 365 358 Z",
  // Feather 6: Bottom inner covert reaching (335, 460)
  "M 390 388 C 375 415 350 440 335 460 C 360 465 385 460 400 445 C 408 430 402 405 390 388 Z",
];

// Chiseled center spine rib lines providing metallic cross-reflections
const FEATHER_SPINES = [
  "M 405 220 Q 255 155 110 80",
  "M 375 240 Q 255 195 135 145",
  "M 355 265 Q 260 245 165 215",
  "M 345 295 Q 275 290 200 285",
  "M 350 328 Q 295 340 240 350",
  "M 365 358 Q 325 385 285 410",
  "M 390 388 Q 365 425 335 460",
];

// Feather tip sparkle positions
const GLINT_POSITIONS = [
  { x: 110, y: 80, rot: -32 },
  { x: 135, y: 145, rot: -20 },
  { x: 165, y: 215, rot: -10 },
  { x: 200, y: 285, rot: 5 },
];

export const Wing: React.FC<WingProps> = ({
  side,
  wingGroupRef,
  forewingRef,
  featherRefs,
  shieldRef,
  glintRefs,
  gradientId,
}) => {
  const isRight = side === 'right';

  // 4-point diamond star sparkle with diamond aspect ratio
  const sparklePath = "M 0 -13 Q 1 -3 11 0 Q 1 3 0 13 Q -1 3 -11 0 Q -1 -3 0 -13 Z";

  const renderFeather = (i: number) => {
    const d = FEATHER_PATHS[i];
    const pivot = PIVOTS.feathers[i];
    return (
      <g
        key={i}
        ref={(el) => {
          featherRefs.current[i] = el;
        }}
        className="feather"
        data-i={i}
        style={{
          transformOrigin: `${pivot.x}px ${pivot.y}px`,
          transformBox: 'view-box',
        }}
      >
        {/* Deep ambient shadow between feathers for metal depth */}
        <path
          d={d}
          fill="none"
          stroke="#020408"
          strokeWidth="2.5"
          className="feather-shadow"
          strokeOpacity="var(--feather-shadow-opacity, 0.85)"
          transform="translate(1.5, 2)"
        />

        {/* Base feather body with diagonal chrome gradient */}
        <path
          d={d}
          fill={`url(#${gradientId})`}
          stroke="#0a0f1d"
          strokeWidth="0.8"
        />

        {/* Subtle brushed metal pattern overlay */}
        <path
          d={d}
          fill="url(#brushed-metal-pat)"
          opacity="0.14"
          style={{ mixBlendMode: 'overlay' }}
        />

        {/* Ice-blue & pure white specular rim line */}
        <path
          d={d}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          className="rim-glow"
          style={{
            stroke: 'var(--rim-color, #ffffff)',
            strokeOpacity: 'var(--rim-opacity, 0.75)',
          }}
        />

        {/* Faint ice-blue secondary highlight (#BFE3FF) */}
        <path
          d={d}
          fill="none"
          stroke="#BFE3FF"
          strokeWidth="0.6"
          strokeOpacity="0.55"
          transform="translate(-0.8, -0.8)"
        />

        {/* Soft violet rim accent (#9B8CFF at 35% opacity max) */}
        <path
          d={d}
          fill="none"
          stroke="#9B8CFF"
          strokeWidth="0.5"
          strokeOpacity="0.35"
          transform="translate(0.5, 0.5)"
        />

        {/* Chiseled metallic center spine rib */}
        <path
          d={FEATHER_SPINES[i]}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.1"
          strokeOpacity="0.9"
          strokeLinecap="round"
        />
        {/* Spine shadow for bevel relief */}
        <path
          d={FEATHER_SPINES[i]}
          fill="none"
          stroke="#050811"
          strokeWidth="1.0"
          strokeOpacity="0.75"
          transform="translate(1.2, 1.5)"
        />
      </g>
    );
  };

  return (
    <g
      ref={wingGroupRef}
      id={`wing-${isRight ? 'R' : 'L'}`}
      className="feathered-wing"
      style={{
        transformOrigin: `${PIVOTS.shoulder.x}px ${PIVOTS.shoulder.y}px`,
        transformBox: 'view-box',
      }}
    >
      {/* Covert & Secondary Feathers (Feathers 4, 5, 6 attached to forearm) */}
      {[4, 5, 6].map((i) => renderFeather(i))}

      {/* Forewing Arm Group (Feathers 0, 1, 2, 3 attached to wrist/hand for biological arching) */}
      <g
        ref={forewingRef}
        id="forewing-primaries"
        style={{
          transformOrigin: `${PIVOTS.elbow.x}px ${PIVOTS.elbow.y}px`,
          transformBox: 'view-box',
        }}
      >
        {[0, 1, 2, 3].map((i) => renderFeather(i))}

        {/* Feather Tip Glints & Additive Glint Blooms */}
        {GLINT_POSITIONS.map((glint, idx) => (
          <g
            key={idx}
            transform={`translate(${glint.x}, ${glint.y}) rotate(${glint.rot})`}
          >
            {/* Additive Glint Bloom sprite behind sparkle */}
            <circle
              cx="0"
              cy="0"
              r="16"
              fill="url(#glint-bloom-grad)"
              className="glint-bloom"
              style={{ mixBlendMode: 'screen', opacity: 0.6 }}
            />

            <g
              ref={(el) => {
                if (glintRefs) glintRefs.current[idx] = el;
              }}
              className="glint"
              data-glint-i={idx}
              style={{
                transformOrigin: '0 0',
                opacity: 0.35,
                transform: 'scale(0.5)',
              }}
            >
              <path d={sparklePath} fill="#ffffff" />
              <circle cx="0" cy="0" r="3" fill="#ffffff" />
              <circle cx="0" cy="0" r="1" fill="#bfe3ff" />
            </g>
          </g>
        ))}
      </g>

      {/* Shoulder Shield Armor Plate */}
      <g
        ref={shieldRef}
        id="shoulder-shield"
        style={{
          transformOrigin: `${PIVOTS.shoulder.x}px ${PIVOTS.shoulder.y}px`,
          transformBox: 'view-box',
        }}
      >
        {/* Drop shadow behind shield plate */}
        <path
          d="M 440 250 C 475 260 485 285 470 315 C 455 345 425 350 410 330 C 400 310 410 270 440 250 Z"
          fill="#020408"
          opacity="0.8"
          transform="translate(2, 2.5)"
        />
        <path
          d="M 440 250 C 475 260 485 285 470 315 C 455 345 425 350 410 330 C 400 310 410 270 440 250 Z"
          fill={`url(#${gradientId})`}
          stroke="#050811"
          strokeWidth="1.2"
        />
        <path
          d="M 440 250 C 475 260 485 285 470 315 C 455 345 425 350 410 330 C 400 310 410 270 440 250 Z"
          fill="url(#brushed-metal-pat)"
          opacity="0.14"
          style={{ mixBlendMode: 'overlay' }}
        />
        {/* Specular rim */}
        <path
          d="M 438 258 C 465 268 472 288 460 310 C 448 330 425 335 416 322"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.4"
          strokeOpacity="0.9"
        />
        {/* Chrome shoulder rivet */}
        <circle cx="442" cy="290" r="4.5" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.2" />
        <circle cx="440.8" cy="288.8" r="1.5" fill="#ffffff" />
      </g>

      {/* Feather Tip Glints & Additive Glint Blooms (Outer translate/rotate + Inner anim group) */}
      {GLINT_POSITIONS.map((glint, idx) => (
        <g
          key={idx}
          transform={`translate(${glint.x}, ${glint.y}) rotate(${glint.rot})`}
        >
          {/* Additive Glint Bloom sprite behind sparkle */}
          <circle
            cx="0"
            cy="0"
            r="16"
            fill="url(#glint-bloom-grad)"
            className="glint-bloom"
            style={{ mixBlendMode: 'screen', opacity: 0.6 }}
          />

          <g
            ref={(el) => {
              if (glintRefs) glintRefs.current[idx] = el;
            }}
            className="glint"
            data-glint-i={idx}
            style={{
              transformOrigin: '0 0',
              opacity: 0.35,
              transform: 'scale(0.5)',
            }}
          >
            <path d={sparklePath} fill="#ffffff" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
            <circle cx="0" cy="0" r="1" fill="#bfe3ff" />
          </g>
        </g>
      ))}

      {/* Moving Key Light sprite (additive soft highlight following wing tips) */}
      <circle
        cx="140"
        cy="150"
        r="48"
        fill="url(#keylight-grad)"
        className="moving-keylight"
        style={{ mixBlendMode: 'overlay', pointerEvents: 'none' }}
      />
    </g>
  );
};
