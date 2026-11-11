import React from 'react';
import { Wing } from './Wing';
import { PIVOTS } from './FLAP';

export interface EmblemRefs {
  rootRef: React.RefObject<SVGSVGElement>;
  emblemGroupRef: React.RefObject<SVGGElement>;
  shadowRef: React.RefObject<SVGEllipseElement>;
  wingLRef: React.RefObject<SVGGElement>;
  wingRRef: React.RefObject<SVGGElement>;
  forewingLRef?: React.RefObject<SVGGElement>;
  forewingRRef?: React.RefObject<SVGGElement>;
  feathersLRef: React.MutableRefObject<(SVGGElement | null)[]>;
  feathersRRef: React.MutableRefObject<(SVGGElement | null)[]>;
  shieldLRef: React.RefObject<SVGGElement>;
  shieldRRef: React.RefObject<SVGGElement>;
  glintsLRef: React.MutableRefObject<(SVGGElement | null)[]>;
  glintsRRef: React.MutableRefObject<(SVGGElement | null)[]>;
  bodyRef: React.RefObject<SVGGElement>;
  crestRef: React.RefObject<SVGGElement>;
  crestOuterRef: React.RefObject<SVGGElement>;
  tailRef: React.RefObject<SVGGElement>;
  gradWingLRef: React.RefObject<SVGLinearGradientElement>;
  gradWingRRef: React.RefObject<SVGLinearGradientElement>;
  materializeMaskStopRef?: React.RefObject<SVGStopElement>;
  wordmarkRef?: React.RefObject<SVGTextElement>;
}

interface EmblemProps {
  refs: EmblemRefs;
  className?: string;
  materializeProgress?: number; // 0 to 1 (bottom-up mask progression)
  showWordmark?: boolean;
}

export const Emblem: React.FC<EmblemProps> = ({
  refs,
  className = '',
  materializeProgress = 1.0,
  showWordmark = false,
}) => {
  return (
    <svg
      ref={refs.rootRef}
      viewBox="0 0 1000 550"
      className={`w-full max-w-[920px] aspect-[1000/550] overflow-visible select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Left Wing Diagonal Chrome Gradient (Fixed upper-left light source) */}
        <linearGradient
          ref={refs.gradWingLRef}
          id="chrome-diag-L"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="12%" stopColor="#f8fafc" />
          <stop offset="24%" stopColor="#bfe3ff" />
          <stop offset="36%" stopColor="#64748b" />
          <stop offset="48%" stopColor="#0f172a" />
          <stop offset="52%" stopColor="#020408" />
          <stop offset="64%" stopColor="#f1f5f9" />
          <stop offset="78%" stopColor="#94a3b8" />
          <stop offset="90%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        {/* Right Wing Diagonal Chrome Gradient */}
        <linearGradient
          ref={refs.gradWingRRef}
          id="chrome-diag-R"
          x1="100%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="12%" stopColor="#f8fafc" />
          <stop offset="24%" stopColor="#bfe3ff" />
          <stop offset="36%" stopColor="#64748b" />
          <stop offset="48%" stopColor="#0f172a" />
          <stop offset="52%" stopColor="#020408" />
          <stop offset="64%" stopColor="#f1f5f9" />
          <stop offset="78%" stopColor="#94a3b8" />
          <stop offset="90%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        {/* Vertical Chrome Gradient for Body, Crest & Tail */}
        <linearGradient id="chrome-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="10%" stopColor="#f1f5f9" />
          <stop offset="22%" stopColor="#cbd5e1" />
          <stop offset="38%" stopColor="#334155" />
          <stop offset="50%" stopColor="#020408" />
          <stop offset="64%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#94a3b8" />
          <stop offset="90%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        {/* Brushed-metal hairline pattern overlay */}
        <pattern
          id="brushed-metal-pat"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="4" x2="40" y2="4" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="0" y1="11" x2="40" y2="11" stroke="#000000" strokeWidth="0.6" strokeOpacity="0.5" />
          <line x1="0" y1="20" x2="40" y2="20" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.3" />
          <line x1="0" y1="27" x2="40" y2="27" stroke="#000000" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="0" y1="34" x2="40" y2="34" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.35" />
        </pattern>

        {/* Glint Bloom additive radial gradient */}
        <radialGradient id="glint-bloom-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#bfe3ff" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#9b8cff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Moving key light soft additive highlight */}
        <radialGradient id="keylight-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#bfe3ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Bottom-up Materialize Gradient Mask (Section 4) */}
        <linearGradient
          id="materialize-linear-grad"
          x1="0"
          y1="550"
          x2="0"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop
            offset={`${Math.max(0, Math.min(100, materializeProgress * 100))}%`}
            stopColor="#ffffff"
          />
          <stop
            offset={`${Math.max(0, Math.min(100, (materializeProgress + 0.05) * 100))}%`}
            stopColor="#000000"
          />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>

        <mask id="materialize-mask" maskUnits="userSpaceOnUse">
          <rect
            x="0"
            y="0"
            width="1000"
            height="550"
            fill="url(#materialize-linear-grad)"
          />
        </mask>

        {/* Soft shadow blur filter */}
        <filter id="shadow-blur" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* #shadow: Soft contact ground shadow under emblem */}
      <ellipse
        ref={refs.shadowRef}
        id="shadow"
        cx={PIVOTS.shadow.x}
        cy={PIVOTS.shadow.y}
        rx="260"
        ry="18"
        fill="rgba(2, 4, 8, 0.6)"
        filter="url(#shadow-blur)"
        style={{
          transformOrigin: `${PIVOTS.shadow.x}px ${PIVOTS.shadow.y}px`,
          transformBox: 'view-box',
        }}
      />

      {/* Master Emblem Group (Under bottom-up materialize mask during Scene 2) */}
      <g
        ref={refs.emblemGroupRef}
        id="emblem-master"
        mask={materializeProgress < 0.99 ? 'url(#materialize-mask)' : undefined}
        style={{
          transformOrigin: '500px 320px',
          transformBox: 'view-box',
        }}
      >
        {/* #tail: Two swept filigree tail scroll paths */}
        <g
          ref={refs.tailRef}
          id="tail"
          style={{
            transformOrigin: `${PIVOTS.tail.x}px ${PIVOTS.tail.y}px`,
            transformBox: 'view-box',
          }}
        >
          {/* Left tail scroll */}
          <path
            d="M 505 460 C 495 480 470 505 440 520 C 465 522 492 505 505 485 C 507 475 506 465 505 460 Z"
            fill="url(#chrome-vert)"
            stroke="#020408"
            strokeWidth="0.9"
          />
          {/* Right tail scroll */}
          <path
            d="M 505 460 C 515 480 540 505 570 520 C 545 522 518 505 505 485 C 503 475 504 465 505 460 Z"
            fill="url(#chrome-vert)"
            stroke="#020408"
            strokeWidth="0.9"
          />
          {/* Center tail anchor teardrop */}
          <path
            d="M 505 455 C 498 470 496 495 505 515 C 514 495 512 470 505 455 Z"
            fill="url(#chrome-vert)"
            stroke="#020408"
            strokeWidth="0.8"
          />
          {/* Brushed metal overlay */}
          <path
            d="M 440 520 C 470 505 495 480 505 460 C 515 480 540 505 570 520 C 545 522 518 505 505 485 C 492 505 465 522 440 520 Z"
            fill="url(#brushed-metal-pat)"
            opacity="0.15"
            style={{ mixBlendMode: 'overlay' }}
          />
          {/* Specular highlights */}
          <path
            d="M 505 462 C 496 480 475 504 445 519 M 505 462 C 514 480 535 504 565 519"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeOpacity="0.85"
          />
        </g>

        {/* #wing-L: Left Wing (7 feathers + shoulder + articulated forewing) */}
        <Wing
          side="left"
          wingGroupRef={refs.wingLRef}
          forewingRef={refs.forewingLRef}
          featherRefs={refs.feathersLRef}
          shieldRef={refs.shieldLRef}
          glintRefs={refs.glintsLRef}
          gradientId="chrome-diag-L"
        />

        {/* #wing-R: Mirrored Right Wing (transform="translate(1000,0) scale(-1,1)") */}
        <g transform="translate(1000, 0) scale(-1, 1)">
          <Wing
            side="right"
            wingGroupRef={refs.wingRRef}
            forewingRef={refs.forewingRRef}
            featherRefs={refs.feathersRRef}
            shieldRef={refs.shieldRRef}
            glintRefs={refs.glintsRRef}
            gradientId="chrome-diag-R"
          />
        </g>

        {/* #body: S-curved body, neck and beak */}
        <g
          ref={refs.bodyRef}
          id="body"
          style={{
            transformOrigin: '500px 320px',
            transformBox: 'view-box',
          }}
        >
          {/* Main torso breastplate */}
          <path
            d="M 495 245 C 475 270 460 310 465 360 C 470 405 490 445 500 465 C 510 445 530 405 535 360 C 540 310 525 270 505 245 Z"
            fill="url(#chrome-vert)"
            stroke="#020408"
            strokeWidth="1.2"
          />
          {/* Torso brushed metal */}
          <path
            d="M 495 245 C 475 270 460 310 465 360 C 470 405 490 445 500 465 C 510 445 530 405 535 360 C 540 310 525 270 505 245 Z"
            fill="url(#brushed-metal-pat)"
            opacity="0.16"
            style={{ mixBlendMode: 'overlay' }}
          />

          {/* S-curve neck & head sweeping rightward */}
          <path
            d="M 495 245 C 492 230 495 210 505 200 C 515 205 522 215 518 230 C 515 242 505 255 495 245 Z"
            fill="url(#chrome-vert)"
            stroke="#020408"
            strokeWidth="1"
          />
          {/* Sharp predatory beak on the right */}
          <path
            d="M 515 210 Q 528 215 524 222 Q 515 220 514 216 Z"
            fill="#ffffff"
            stroke="#020408"
            strokeWidth="0.8"
          />

          {/* Center chest chiseled ridge */}
          <path
            d="M 500 245 L 500 455"
            stroke="#ffffff"
            strokeWidth="1.4"
            strokeOpacity="0.9"
          />
          <path
            d="M 501.5 245 L 501.5 455"
            stroke="#020408"
            strokeWidth="1.0"
            strokeOpacity="0.75"
          />

          {/* Beveled pectoral chevron plates */}
          <path
            d="M 480 300 Q 500 315 520 300 M 475 340 Q 500 360 525 340 M 480 380 Q 500 400 520 380"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.1"
            strokeOpacity="0.85"
          />
          <path
            d="M 480 301.5 Q 500 316.5 520 301.5 M 475 341.5 Q 500 361.5 525 341.5 M 480 381.5 Q 500 401.5 520 381.5"
            fill="none"
            stroke="#020408"
            strokeWidth="0.9"
            strokeOpacity="0.6"
          />
        </g>

        {/* #crest: Center spike + 4 side crest feathers */}
        <g
          ref={refs.crestRef}
          id="crest"
          style={{
            transformOrigin: `${PIVOTS.crest.x}px ${PIVOTS.crest.y}px`,
            transformBox: 'view-box',
          }}
        >
          {/* Center Primary Spike */}
          <path
            d="M 497 235 L 500 178 L 503 235 Z"
            fill="url(#chrome-vert)"
            stroke="#020408"
            strokeWidth="0.9"
          />
          <path d="M 500 235 L 500 179" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.95" />

          {/* Outer Crest Feathers (1.3x motion factor via ref) */}
          <g ref={refs.crestOuterRef} id="crest-outer">
            {/* Left inner crest */}
            <path
              d="M 494 235 C 490 215 484 198 480 188 C 486 200 493 218 496 235 Z"
              fill="url(#chrome-vert)"
              stroke="#020408"
              strokeWidth="0.8"
            />
            {/* Left outer crest */}
            <path
              d="M 490 235 C 480 220 468 206 462 200 C 472 212 485 225 492 235 Z"
              fill="url(#chrome-vert)"
              stroke="#020408"
              strokeWidth="0.8"
            />
            {/* Right inner crest */}
            <path
              d="M 506 235 C 510 215 516 198 520 188 C 514 200 507 218 504 235 Z"
              fill="url(#chrome-vert)"
              stroke="#020408"
              strokeWidth="0.8"
            />
            {/* Right outer crest */}
            <path
              d="M 510 235 C 520 220 532 206 538 200 C 528 212 515 225 508 235 Z"
              fill="url(#chrome-vert)"
              stroke="#020408"
              strokeWidth="0.8"
            />
          </g>

          {/* Crown gem / crest base highlight */}
          <circle cx="500" cy="235" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
          <circle cx="500" cy="235" r="1.5" fill="#f8fafc" />
        </g>

        {/* Section 6.6 Wordmark: Fades in under emblem at Flap 3 */}
        {showWordmark && (
          <text
            ref={refs.wordmarkRef}
            x="500"
            y="525"
            textAnchor="middle"
            fill="url(#chrome-vert)"
            stroke="#0a0f1d"
            strokeWidth="0.6"
            className="font-black tracking-[0.2em] uppercase select-none transition-all duration-700"
            style={{ fontSize: '20px', letterSpacing: '0.14em' }}
          >
            StyleLab
          </text>
        )}
      </g>
    </svg>
  );
};
