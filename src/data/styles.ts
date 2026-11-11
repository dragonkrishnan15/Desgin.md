import { StyleDef } from '@/types';

export const STYLES: StyleDef[] = [
  {
    "id": "minimalism",
    "name": "Minimalism",
    "category": "Clean & Structured",
    "tagline": "Say more with less.",
    "defaults": {
      "paletteId": "clean-paper",
      "fontId": "inter-modern",
      "geometry": {
        "radius": 0,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "none",
        "blur": 0
      }
    },
    "rules": [
      "Huge whitespace, few elements per view",
      "One accent colour (or none)",
      "Thin type, small caps nav, quiet borders",
      "A single hero object or line of copy",
      "Motion is slow and subtle"
    ],
    "bestFor": [
      "Premium products",
      "portfolios",
      "studios",
      "single-product launches"
    ],
    "variant": "minimalism"
  },
  {
    "id": "swiss-design",
    "name": "Swiss Design",
    "category": "Clean & Structured",
    "tagline": "The grid is the hero.",
    "defaults": {
      "paletteId": "clean-paper",
      "fontId": "inter-modern",
      "geometry": {
        "radius": 0,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "none",
        "blur": 0
      }
    },
    "rules": [
      "Visible modular grid and strong alignment",
      "Flush-left, ragged-right Helvetica-style type",
      "Asymmetric composition, huge type scale jumps",
      "Red, black and white with geometric shapes",
      "Numbers and labels used as graphic elements"
    ],
    "bestFor": [
      "Agencies",
      "conferences",
      "architecture",
      "data-heavy sites"
    ],
    "variant": "swiss-design"
  },
  {
    "id": "bento-grid",
    "name": "Bento Grid",
    "category": "Clean & Structured",
    "tagline": "Everything in its box.",
    "defaults": {
      "paletteId": "bento-midnight",
      "fontId": "plus-jakarta",
      "geometry": {
        "radius": 24,
        "gap": 20,
        "borderWidth": 1,
        "shadow": "soft",
        "blur": 8
      }
    },
    "rules": [
      "Rounded tiles of mixed sizes on one grid",
      "One idea per tile: stat, icon, screenshot",
      "Consistent gaps (12-20px) and corner radius",
      "Often dark mode with one accent per tile",
      "Great for feature overviews and dashboards"
    ],
    "bestFor": [
      "SaaS feature sections",
      "product launches",
      "portfolios",
      "dashboards"
    ],
    "variant": "bento-grid"
  },
  {
    "id": "editorial-design",
    "name": "Editorial Design",
    "category": "Clean & Structured",
    "tagline": "Read it like a magazine.",
    "defaults": {
      "paletteId": "editorial-sand",
      "fontId": "playfair-editorial",
      "geometry": {
        "radius": 4,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "none",
        "blur": 0
      }
    },
    "rules": [
      "Large contrasting serif headlines",
      "Multi-column body, drop caps, pull quotes",
      "Thin rules, issue numbers, bylines, captions",
      "Full-bleed photography with art direction",
      "Mix of serif display + clean sans for meta"
    ],
    "bestFor": [
      "Blogs",
      "publications",
      "long-form stories",
      "brand journals"
    ],
    "variant": "editorial-design"
  },
  {
    "id": "luxury-typography",
    "name": "Luxury Typography",
    "category": "Clean & Structured",
    "tagline": "Type that whispers money.",
    "defaults": {
      "paletteId": "obsidian-gold",
      "fontId": "cinzel-luxury",
      "geometry": {
        "radius": 0,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "none",
        "blur": 0
      }
    },
    "rules": [
      "Oversized, high-contrast serif display type",
      "Wide-tracked uppercase labels",
      "Black / ivory palette with metallic accent",
      "Lots of negative space, centered symmetry",
      "Slow fades and refined micro-interactions"
    ],
    "bestFor": [
      "Fashion",
      "jewellery",
      "hotels",
      "perfume"
    ],
    "variant": "luxury-typography"
  },
  {
    "id": "bauhaus",
    "name": "Bauhaus",
    "category": "Clean & Structured",
    "tagline": "Circle, square, triangle.",
    "defaults": {
      "paletteId": "bauhaus-primary",
      "fontId": "dm-sans",
      "geometry": {
        "radius": 0,
        "gap": 16,
        "borderWidth": 2,
        "shadow": "hard",
        "blur": 0
      }
    },
    "rules": [
      "Primary colours: red, yellow, blue + black",
      "Circles, squares, triangles as layout blocks",
      "Geometric sans-serif, often rotated type",
      "Flat colour, no gradients or shadows",
      "Function-first, asymmetric balance"
    ],
    "bestFor": [
      "Creative studios",
      "museums",
      "education",
      "posters & events"
    ],
    "variant": "bauhaus"
  },
  {
    "id": "neumorphism",
    "name": "Neumorphism",
    "category": "Soft & Tactile",
    "tagline": "Soft plastic, pressed into the page.",
    "defaults": {
      "paletteId": "neumorphic-ash",
      "fontId": "dm-sans",
      "geometry": {
        "radius": 16,
        "gap": 16,
        "borderWidth": 0,
        "shadow": "soft",
        "blur": 0
      }
    },
    "rules": [
      "Element colour = background colour",
      "Dual shadows: light top-left, dark bottom-right",
      "Inset shadows for pressed/active states",
      "Soft rounded controls: dials, toggles, sliders",
      "Low contrast; add one accent for accessibility"
    ],
    "bestFor": [
      "Smart-home controls",
      "music players",
      "calculators",
      "widgets"
    ],
    "variant": "neumorphism"
  },
  {
    "id": "glassmorphism",
    "name": "Glassmorphism",
    "category": "Soft & Tactile",
    "tagline": "Frosted glass over colour.",
    "defaults": {
      "paletteId": "glass-aurora",
      "fontId": "outfit-contemporary",
      "geometry": {
        "radius": 20,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "soft",
        "blur": 16
      }
    },
    "rules": [
      "Background blur (backdrop-filter) on panels",
      "Semi-transparent white fills (10-25%)",
      "1px light border to catch the 'edge'",
      "Vivid gradient blobs behind the glass",
      "Layered depth with soft shadows"
    ],
    "bestFor": [
      "Fintech cards",
      "music & weather apps",
      "dashboards",
      "OS-style UIs"
    ],
    "variant": "glassmorphism"
  },
  {
    "id": "claymorphism",
    "name": "Claymorphism",
    "category": "Soft & Tactile",
    "tagline": "Puffy, squishy, friendly 3D.",
    "defaults": {
      "paletteId": "clay-soft",
      "fontId": "outfit-contemporary",
      "geometry": {
        "radius": 24,
        "gap": 20,
        "borderWidth": 0,
        "shadow": "soft",
        "blur": 0
      }
    },
    "rules": [
      "Very round corners (30px+) and pill buttons",
      "Outer shadow + inner light + inner dark shadow",
      "Pastel, candy-like colours",
      "3D clay-style illustrations and blobs",
      "Chunky rounded fonts"
    ],
    "bestFor": [
      "Kids & education",
      "habit trackers",
      "playful fintech",
      "onboarding"
    ],
    "variant": "claymorphism"
  },
  {
    "id": "skeuomorphism",
    "name": "Skeuomorphism",
    "category": "Soft & Tactile",
    "tagline": "Make it look real.",
    "defaults": {
      "paletteId": "obsidian-gold",
      "fontId": "source-serif-literary",
      "geometry": {
        "radius": 8,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "soft",
        "blur": 0
      }
    },
    "rules": [
      "Realistic textures: metal, leather, wood, paper",
      "Detailed lighting, gradients and highlights",
      "Physical metaphors: knobs, switches, notebooks",
      "Embossed/debossed text and stitching",
      "Rich depth and drop shadows"
    ],
    "bestFor": [
      "Audio/music tools",
      "camera apps",
      "retro-tech products",
      "games"
    ],
    "variant": "skeuomorphism"
  },
  {
    "id": "ethereal",
    "name": "Ethereal",
    "category": "Soft & Tactile",
    "tagline": "Light, mist and quiet glow.",
    "defaults": {
      "paletteId": "ethereal-cloud",
      "fontId": "fraunces-warm",
      "geometry": {
        "radius": 16,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "soft",
        "blur": 12
      }
    },
    "rules": [
      "Soft pastel gradients that dissolve to white",
      "Glowing orbs, halos and light leaks",
      "Thin, airy serif or light sans type",
      "Film grain / noise for softness",
      "Slow floating motion"
    ],
    "bestFor": [
      "Wellness",
      "meditation",
      "skincare",
      "spiritual & beauty brands"
    ],
    "variant": "ethereal"
  },
  {
    "id": "aurora-gradient",
    "name": "Aurora Gradient",
    "category": "Soft & Tactile",
    "tagline": "Living colour mesh.",
    "defaults": {
      "paletteId": "glass-aurora",
      "fontId": "outfit-contemporary",
      "geometry": {
        "radius": 16,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "glow",
        "blur": 10
      }
    },
    "rules": [
      "Large blurred mesh gradients, often animated",
      "Dark base so colours glow",
      "Clean sans type and minimal UI on top",
      "Subtle grain to avoid banding",
      "Glowing borders and light beams"
    ],
    "bestFor": [
      "AI products",
      "SaaS launches",
      "crypto",
      "developer tools"
    ],
    "variant": "aurora-gradient"
  },
  {
    "id": "neo-brutalism",
    "name": "Neo-Brutalism",
    "category": "Bold & Expressive",
    "tagline": "Loud, raw, unapologetic.",
    "defaults": {
      "paletteId": "neo-brutalist",
      "fontId": "syne-expressive",
      "geometry": {
        "radius": 0,
        "gap": 16,
        "borderWidth": 2,
        "shadow": "hard",
        "blur": 0
      }
    },
    "rules": [
      "Thick black borders (2-4px) on everything",
      "Hard offset shadows: 6px 6px 0 \\#000",
      "Flat, saturated, clashing colours",
      "Chunky grotesk type, stickers, tilted badges",
      "Visible structure, no gradients, no blur"
    ],
    "bestFor": [
      "Startups",
      "indie tools",
      "creator brands",
      "Gen-Z products"
    ],
    "variant": "neo-brutalism"
  },
  {
    "id": "maximalism",
    "name": "Maximalism",
    "category": "Bold & Expressive",
    "tagline": "More is more.",
    "defaults": {
      "paletteId": "electric-rose",
      "fontId": "bricolage-punchy",
      "geometry": {
        "radius": 12,
        "gap": 16,
        "borderWidth": 2,
        "shadow": "hard",
        "blur": 0
      }
    },
    "rules": [
      "Layered patterns: stripes, dots, checks",
      "Many colours and several typefaces at once",
      "Collage, stickers, overlapping elements",
      "Oversized, rotated and outlined type",
      "Dense composition with a clear focal point"
    ],
    "bestFor": [
      "Fashion drops",
      "festivals",
      "music",
      "creative agencies"
    ],
    "variant": "maximalism"
  },
  {
    "id": "memphis",
    "name": "Memphis",
    "category": "Bold & Expressive",
    "tagline": "80s confetti geometry.",
    "defaults": {
      "paletteId": "neo-brutalist",
      "fontId": "bricolage-punchy",
      "geometry": {
        "radius": 999,
        "gap": 16,
        "borderWidth": 2,
        "shadow": "hard",
        "blur": 0
      }
    },
    "rules": [
      "Squiggles, zig-zags, dots, triangles as decoration",
      "Bright pastels + black outlines",
      "Terrazzo and grid patterns",
      "Playful, slightly off-kilter layouts",
      "Rounded geometric type"
    ],
    "bestFor": [
      "Kids brands",
      "snacks & drinks",
      "creative events",
      "social apps"
    ],
    "variant": "memphis"
  },
  {
    "id": "scrapbook",
    "name": "Scrapbook",
    "category": "Bold & Expressive",
    "tagline": "Cut, tape, stick, scribble.",
    "defaults": {
      "paletteId": "wabi-sabi-tea",
      "fontId": "fraunces-warm",
      "geometry": {
        "radius": 6,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "soft",
        "blur": 0
      }
    },
    "rules": [
      "Paper textures: kraft, notebook, torn edges",
      "Polaroids and photos held with tape",
      "Handwritten fonts, doodles, arrows",
      "Stickers, stamps, tickets, sticky notes",
      "Slight rotations; nothing perfectly aligned"
    ],
    "bestFor": [
      "Travel blogs",
      "personal portfolios",
      "community & lifestyle brands"
    ],
    "variant": "scrapbook"
  },
  {
    "id": "conceptual-sketch",
    "name": "Conceptual Sketch",
    "category": "Bold & Expressive",
    "tagline": "Ideas, still in pencil.",
    "defaults": {
      "paletteId": "clean-paper",
      "fontId": "space-grotesk",
      "geometry": {
        "radius": 0,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "none",
        "blur": 0
      }
    },
    "rules": [
      "Hand-drawn wobbly borders and arrows",
      "Graph or dot-grid paper backgrounds",
      "Wireframe placeholders (crossed image boxes)",
      "Handwritten annotations and highlights",
      "Blue-pencil / marker colour palette"
    ],
    "bestFor": [
      "Design tools",
      "whiteboard apps",
      "agencies",
      "tutorials"
    ],
    "variant": "conceptual-sketch"
  },
  {
    "id": "pixel-art",
    "name": "Pixel Art",
    "category": "Retro & Digital",
    "tagline": "8-bit charm, modern layout.",
    "defaults": {
      "paletteId": "emerald-matrix",
      "fontId": "pixel-arcade",
      "geometry": {
        "radius": 0,
        "gap": 12,
        "borderWidth": 2,
        "shadow": "hard",
        "blur": 0
      }
    },
    "rules": [
      "Bitmap / pixel fonts for headlines and nav",
      "Icons and illustrations built on a visible pixel grid",
      "Stepped (non-anti-aliased) shapes, hard edges",
      "Limited palette, often on a clean light background",
      "Retro game UI: health bars, score counters"
    ],
    "bestFor": [
      "Gaming",
      "creative agencies",
      "indie products",
      "playful portfolios"
    ],
    "variant": "pixel-art"
  },
  {
    "id": "y2k-aesthetic",
    "name": "Y2K Aesthetic",
    "category": "Retro & Digital",
    "tagline": "Chrome, bubbles and futuristic optimism.",
    "defaults": {
      "paletteId": "y2k-chrome",
      "fontId": "space-grotesk",
      "geometry": {
        "radius": 999,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "glow",
        "blur": 0
      }
    },
    "rules": [
      "Liquid chrome / metallic text",
      "Holographic iridescent gradients (pink, blue, lilac)",
      "Glossy pill buttons with highlights",
      "Sparkles \u2726, stars, butterflies, blobby 3D shapes",
      "Translucent windows and early-web UI nods"
    ],
    "bestFor": [
      "Fashion",
      "beauty",
      "music",
      "Gen-Z apps"
    ],
    "variant": "y2k-aesthetic"
  },
  {
    "id": "vaporwave",
    "name": "Vaporwave",
    "category": "Retro & Digital",
    "tagline": "Statues, sunsets and old Windows.",
    "defaults": {
      "paletteId": "sunset-vaporwave",
      "fontId": "outfit-contemporary",
      "geometry": {
        "radius": 8,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "glow",
        "blur": 0
      }
    },
    "rules": [
      "Pink + teal + purple pastel gradients",
      "Retro OS windows, cursors, low-res graphics",
      "Classical statues, palms, checkerboard floors",
      "Wide-spaced text ('\uff21 \uff25 \uff33 \uff34 \uff28 \uff25 \uff34 \uff29 \uff23') & Japanese \u2192 VHS noise, scanlines, glitch"
    ],
    "bestFor": [
      "Music & playlists",
      "art projects",
      "streetwear",
      "meme savvy brands"
    ],
    "variant": "vaporwave"
  },
  {
    "id": "synthwave",
    "name": "Synthwave",
    "category": "Retro & Digital",
    "tagline": "Neon sunsets on an endless grid.",
    "defaults": {
      "paletteId": "sunset-vaporwave",
      "fontId": "space-grotesk",
      "geometry": {
        "radius": 6,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "glow",
        "blur": 0
      }
    },
    "rules": [
      "Striped gradient sun on the horizon",
      "Glowing magenta perspective grid floor",
      "Neon glow text (text-shadow blooms)",
      "Chrome / gradient italic display type",
      "Dark purple-to-black night sky, stars"
    ],
    "bestFor": [
      "Music",
      "gaming",
      "events",
      "nightlife"
    ],
    "variant": "synthwave"
  },
  {
    "id": "cybercore",
    "name": "Cybercore",
    "category": "Retro & Digital",
    "tagline": "The early internet, overclocked.",
    "defaults": {
      "paletteId": "cyberpunk-neon",
      "fontId": "jetbrains-terminal",
      "geometry": {
        "radius": 0,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "glow",
        "blur": 0
      }
    },
    "rules": [
      "Terminal / command-line windows and monospace \u2192 Acid green, cyan and magenta on black",
      "Glitch, RGB split, scanlines, noise",
      "ASCII art, wireframes, binary/hex data",
      "OS pop-ups, loading bars, cursor blinks"
    ],
    "bestFor": [
      "Developer tools",
      "hackathons",
      "security",
      "music & digital art"
    ],
    "variant": "cybercore"
  },
  {
    "id": "cyberpunk",
    "name": "Cyberpunk",
    "category": "Retro & Digital",
    "tagline": "High tech, low life, neon rain.",
    "defaults": {
      "paletteId": "cyberpunk-neon",
      "fontId": "jetbrains-terminal",
      "geometry": {
        "radius": 0,
        "gap": 16,
        "borderWidth": 2,
        "shadow": "glow",
        "blur": 0
      }
    },
    "rules": [
      "Dark city backdrops with neon glow",
      "Angular panels with clipped corners (clip-path)",
      "HUD details: brackets, coordinates, scanners",
      "Acid yellow + hot magenta + cyan accents",
      "Katakana / kanji, glitch and warning stripes"
    ],
    "bestFor": [
      "Games",
      "esports",
      "tech launches",
      "streetwear"
    ],
    "variant": "cyberpunk"
  },
  {
    "id": "surrealism",
    "name": "Surrealism",
    "category": "Artful & Heritage",
    "tagline": "Dream logic as interface.",
    "defaults": {
      "paletteId": "ethereal-cloud",
      "fontId": "fraunces-warm",
      "geometry": {
        "radius": 16,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "soft",
        "blur": 8
      }
    },
    "rules": [
      "Impossible compositions: floating, oversized objects \u2192 Arches, doors, stairs leading nowhere",
      "Dreamy skies and long cast shadows",
      "Clean serif/sans type placed calmly on top",
      "Unexpected scale and scroll-driven reveals"
    ],
    "bestFor": [
      "Art & culture",
      "creative agencies",
      "fragrances",
      "music"
    ],
    "variant": "surrealism"
  },
  {
    "id": "art-deco",
    "name": "Art Deco",
    "category": "Artful & Heritage",
    "tagline": "Gatsby-era glamour.",
    "defaults": {
      "paletteId": "obsidian-gold",
      "fontId": "cinzel-luxury",
      "geometry": {
        "radius": 0,
        "gap": 16,
        "borderWidth": 2,
        "shadow": "hard",
        "blur": 0
      }
    },
    "rules": [
      "Strict symmetry and stepped geometry",
      "Gold line ornaments, sunbursts, fans, chevrons",
      "Tall, condensed, high-waisted display type",
      "Deep jewel tones (black, emerald, navy) + gold",
      "Framed panels with double gold borders"
    ],
    "bestFor": [
      "Hotels & bars",
      "weddings",
      "events & galas",
      "premium spirits"
    ],
    "variant": "art-deco"
  },
  {
    "id": "victorian",
    "name": "Victorian",
    "category": "Artful & Heritage",
    "tagline": "Ornate, gilded, storied.",
    "defaults": {
      "paletteId": "obsidian-gold",
      "fontId": "cinzel-luxury",
      "geometry": {
        "radius": 6,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "soft",
        "blur": 0
      }
    },
    "rules": [
      "Ornate frames, flourishes and dividers",
      "Blackletter + decorative serif type mixes",
      "Damask / wallpaper patterns",
      "Rich dark palette: burgundy, green, gold, cream",
      "Engraved illustrations, labels and seals"
    ],
    "bestFor": [
      "Tea",
      "whisky",
      "perfumers",
      "bookshops"
    ],
    "variant": "victorian"
  },
  {
    "id": "bohemian",
    "name": "Bohemian",
    "category": "Artful & Heritage",
    "tagline": "Sun-baked, handmade, free.",
    "defaults": {
      "paletteId": "wabi-sabi-tea",
      "fontId": "fraunces-warm",
      "geometry": {
        "radius": 16,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "soft",
        "blur": 0
      }
    },
    "rules": [
      "Earthy palette: terracotta, sand, olive, mustard",
      "Arches, suns, moons, wavy organic shapes",
      "Woven / rug / macram\u00e9 patterns",
      "Botanical line drawings and dried flowers",
      "Soft serif + handwritten accents"
    ],
    "bestFor": [
      "Home d\u00e9cor",
      "ceramics",
      "yoga retreats",
      "travel"
    ],
    "variant": "bohemian"
  },
  {
    "id": "wabi-sabi",
    "name": "Wabi-Sabi",
    "category": "Artful & Heritage",
    "tagline": "Beauty in imperfection.",
    "defaults": {
      "paletteId": "wabi-sabi-tea",
      "fontId": "source-serif-literary",
      "geometry": {
        "radius": 8,
        "gap": 16,
        "borderWidth": 1,
        "shadow": "none",
        "blur": 0
      }
    },
    "rules": [
      "Muted earthy neutrals, paper and clay textures",
      "Asymmetry and irregular organic shapes",
      "Lots of empty space (ma)",
      "Quiet serif or mincho type, vertical text",
      "Slow, gentle transitions; nothing flashy"
    ],
    "bestFor": [
      "Ceramics",
      "tea houses",
      "architecture",
      "skincare"
    ],
    "variant": "wabi-sabi"
  }
];

export const STYLE_CATEGORIES = [
  'All',
  'Clean & Structured',
  'Bold & Expressive',
  'Soft & Tactile',
  'Retro & Digital',
  'Artful & Heritage',
] as const;
