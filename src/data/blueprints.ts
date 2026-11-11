import { Blueprint, BlueprintGroup } from '@/types';

export const BLUEPRINT_GROUPS: BlueprintGroup[] = [
  'Product UI',
  'Presentation & Story',
  'Marketing',
  'Industry Homepages',
];

export const BLUEPRINTS: Blueprint[] = [
  {
    id: 'workspace-dashboard',
    name: 'Project Workspace Dashboard',
    group: 'Product UI',
    tagline: 'Where do I resume?',
    deliverable: 'an interactive frontend prototype with explicitly labeled demo data',
    interactive: true,
    defaults: {
      palette: {
        bg: '#F6F7F9',
        surface: '#FFFFFF',
        surface2: '#F0F2F5',
        text: '#1C1F24',
        muted: '#6B7280',
        accent: '#2F5BEA',
        accent2: '#4F46E5',
        success: '#10B981',
        danger: '#EF4444',
        border: '#E3E6EB',
      },
      fontId: 'inter-modern',
      geometry: {
        radius: 8,
        gap: 16,
        borderWidth: 1,
        shadow: 'none',
        blur: 0,
      },
      motion: 'subtle',
    },
    defaultDirection: 'light neutral canvas, graphite text, cobalt accent, precise hairline separators; dense but legible hierarchy.',
    unique: {
      required: 'Show recent work, assigned tasks, deadlines and project activity with clear priorities.',
      contentPrep: 'Choose the user\'s most important daily decisions. Supply projects, assigned tasks, deadlines and activity records. Distinguish personal responsibility from general team updates.',
      layout: 'Prioritize work that needs action first, then recent projects, then supporting activity. Do not make every metric or event equally prominent; the dashboard should explain where to resume. Keep the next action clear.',
      acceptance: [
        'Distinguish personal actions from team activity and preserve empty states.',
        'Test three cases: a brand-new workspace, an overdue task, and a project with no recent activity.',
        'Do not fill empty space with fictional productivity numbers.'
      ],
    },
    blocks: ['A', 'D', 'B', 'C', 'E'],
    placeholders: ['PROJECT', 'AUDIENCE', 'APPROVED_CONTENT', 'BRAND_RULES'],
    renderer: 'WorkspaceDashboard',
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Overview Dashboard',
    group: 'Product UI',
    tagline: 'Numbers you can trust.',
    deliverable: 'an interactive frontend prototype with labeled demo data',
    interactive: true,
    defaults: {
      palette: {
        bg: '#FAF8F4',
        surface: '#FFFFFF',
        surface2: '#F4EFEA',
        text: '#1B1B1B',
        muted: '#6B6760',
        accent: '#1F9D6B',
        accent2: '#10B981',
        success: '#1F9D6B',
        danger: '#D94848',
        border: '#E8E3DA',
      },
      fontId: 'dm-sans-clean',
      geometry: {
        radius: 12,
        gap: 16,
        borderWidth: 1,
        shadow: 'soft',
        blur: 0,
      },
      motion: 'subtle',
    },
    defaultDirection: 'warm white, ink text, restrained mint selected states; generous spacing and simple controls.',
    unique: {
      required: 'Present a primary metric, a date range, a comparison period and supporting breakdowns.',
      contentPrep: 'Define each metric\'s unit, denominator, aggregation and date range. Prepare comparison-period values and explicit missing-data cases before choosing charts.',
      layout: 'Give the primary metric a clear place, then explain changes with relevant breakdowns. Keep the active period and comparison basis next to the values they affect.',
      extras: `Calculation rules:
- Percentage change = (current - previous) / previous x 100, shown with the sign.
- If previous is 0 or missing, show "n/a" instead of 0% or infinity.
- Missing data renders as a gap or "no data", never as zero.
- Show units and denominators next to every value.
- Negative change must be understandable without relying on color alone.`,
      acceptance: [
        'Change periods and verify every value updates consistently.',
        'Test a zero denominator, a missing day and a negative change.',
        'Empty data must not render as zero, and percentages must use the stated calculation.'
      ],
    },
    blocks: ['A', 'D', 'B', 'C', 'E'],
    placeholders: ['PROJECT', 'AUDIENCE', 'APPROVED_CONTENT', 'BRAND_RULES'],
    renderer: 'AnalyticsDashboard',
  },
  {
    id: 'story-presentation',
    name: 'Product Story Presentation',
    group: 'Presentation & Story',
    tagline: 'Six slides, one story.',
    deliverable: 'an editable HTML presentation, 16:9 canvas',
    interactive: true,
    defaults: {
      palette: {
        bg: '#FAF7EE',
        surface: '#FFFFFF',
        surface2: '#F2EDE0',
        text: '#1F1F1D',
        muted: '#737370',
        accent: '#C6F135',
        accent2: '#84CC16',
        success: '#10B981',
        danger: '#EF4444',
        border: '#E4DFCF',
      },
      fontId: 'space-grotesk',
      geometry: {
        radius: 8,
        gap: 20,
        borderWidth: 1,
        shadow: 'soft',
        blur: 0,
      },
      motion: 'subtle',
    },
    defaultDirection: 'ivory, charcoal and a single lime accent; oversized headlines, deliberate whitespace, clear hierarchy.',
    unique: {
      required: 'Build six slides: problem, current workflow, approach, three capabilities, evidence and next action.',
      contentPrep: 'Choose the user problem, current workflow, proposed approach, three supported capabilities, available evidence and the next action. Keep missing evidence clearly identified.',
      layout: 'Use six slides to tell one connected story. Let each capability support the same workflow instead of introducing unrelated features. Reserve the evidence slide for supplied proof.',
      extras: `Presentation behavior:
- 16:9 canvas that scales to the window.
- Previous and next buttons, left/right arrow-key navigation, and a slide counter (e.g. 2 / 6).
- Print layout with exactly one slide per page.
- Keep navigation outside exported/printed slide content.
- Keep speaker notes separate from visible slide content.
- One main idea per slide.
- Use charts only when real comparable values are supplied; include units, source dates and limitations.`,
      acceptance: [
        'Use evidence placeholders instead of invented customer or performance claims.',
        'Check that the narrative still makes sense without invented quotes or growth figures.',
        'An evidence placeholder is more useful than a persuasive but unsupported claim.'
      ],
    },
    blocks: ['A', 'B', 'C', 'E'],
    placeholders: ['PROJECT', 'AUDIENCE', 'APPROVED_CONTENT', 'BRAND_RULES'],
    renderer: 'StoryPresentation',
  },
  {
    id: 'scroll-story',
    name: 'Scroll Story Section',
    group: 'Presentation & Story',
    tagline: 'Three stages, no scroll hijacking.',
    deliverable: 'an HTML/CSS/JS interaction study',
    interactive: true,
    defaults: {
      palette: {
        bg: '#FFFFFF',
        surface: '#F4F5F6',
        surface2: '#E9EBEF',
        text: '#17191C',
        muted: '#6B7280',
        accent: '#22C55E',
        accent2: '#15803D',
        success: '#22C55E',
        danger: '#EF4444',
        border: '#E5E7EB',
      },
      fontId: 'inter-modern',
      geometry: {
        radius: 8,
        gap: 24,
        borderWidth: 1,
        shadow: 'soft',
        blur: 0,
      },
      motion: 'expressive',
    },
    defaultDirection: 'white, charcoal and vivid green highlights; clearly labeled start, transition and end states.',
    unique: {
      required: 'Reveal three narrative stages as the reader scrolls through a bounded section. Provide explicit start, active and completed states.',
      contentPrep: 'Prepare three narrative stages and the content that belongs to each. Define a bounded section and a complete static reading order.',
      layout: 'Use scroll position to reveal the narrative without taking control away from the reader. Keep captions and images connected. Do not pin more content than the screen can display.',
      extras: `Interaction rules:
- Never block or hijack native scroll (no wheel preventDefault, no scroll locking).
- Drive stage changes from real scroll progress (IntersectionObserver or scroll-linked), never from a decorative timer.
- Document each trigger and transition.
- Provide a pause or skip control where motion plays automatically.
- prefers-reduced-motion: all three stages stack as normal readable content with no animation.`,
      acceptance: [
        'All three stages stay readable without animation, with no trapped or skipped content.',
        'Scroll in both directions, resize midway, and enable reduced motion.'
      ],
    },
    blocks: ['A', 'D', 'B', 'C', 'E'],
    placeholders: ['PROJECT', 'AUDIENCE', 'APPROVED_CONTENT', 'BRAND_RULES'],
    renderer: 'ScrollStory',
  },
  {
    id: 'launch-page',
    name: 'Product Launch Page',
    group: 'Marketing',
    tagline: 'One promise, shown working.',
    deliverable: 'a responsive HTML website',
    interactive: false,
    defaults: {
      palette: {
        bg: '#FBFBF8',
        surface: '#E8F0FA',
        surface2: '#D7E5F7',
        text: '#0B1F3A',
        muted: '#52627A',
        accent: '#2B5FD9',
        accent2: '#1D4ED8',
        success: '#10B981',
        danger: '#EF4444',
        border: '#D5E0EF',
      },
      fontId: 'plus-jakarta',
      geometry: {
        radius: 12,
        gap: 20,
        borderWidth: 1,
        shadow: 'soft',
        blur: 0,
      },
      motion: 'subtle',
    },
    defaultDirection: 'paper white, deep navy and quiet pale-blue panels; precise grid and spacious typography.',
    unique: {
      required: 'Explain one product promise, show its core workflow, list three verified capabilities and offer one next action.',
      contentPrep: 'Choose one audience problem. Gather approved product screenshots, three supported capabilities and a real next-action destination. Write a product promise that the supplied workflow can demonstrate.',
      layout: 'Use the hero to state the promise, then walk through the task from input to result. Place each capability explanation beside the relevant screenshot instead of building an unrelated feature-card wall.',
      acceptance: [
        'Remove unsupported metrics, testimonials and fake partner logos.',
        'Follow the page as a first-time visitor.',
        'Every claim must be visible in the workflow or backed by approved evidence. Replace invented testimonials and metrics with concrete product explanation.'
      ],
    },
    blocks: ['A', 'B', 'C', 'E'],
    placeholders: ['PROJECT', 'AUDIENCE', 'APPROVED_CONTENT', 'BRAND_RULES'],
    renderer: 'LaunchPage',
  },
  {
    id: 'bento-features',
    name: 'Bento Features Section',
    group: 'Marketing',
    tagline: 'Everything your team needs. Nothing it does not.',
    deliverable: 'one dark features section',
    interactive: false,
    defaults: {
      palette: {
        bg: '#0B0B12',
        surface: '#14141F',
        surface2: '#1D1D2C',
        text: '#F5F5FA',
        muted: '#9A9AB0',
        accent: '#8B5CF6',
        accent2: '#22D3EE',
        success: '#10B981',
        danger: '#EF4444',
        border: 'rgba(255,255,255,0.08)',
      },
      fontId: 'inter-modern',
      geometry: {
        radius: 24,
        gap: 20,
        borderWidth: 1,
        shadow: 'glow',
        blur: 12,
      },
      motion: 'expressive',
    },
    defaultDirection: 'dark theme, rounded tiles, thin borders, violet and cyan accents.',
    unique: {
      required: `Create a dark features section laid out as a bento grid.
Headline: "Everything your team needs. Nothing it does not."
Four tiles of different sizes:
1. Large tile: Real-time sync.
2. Live analytics: small bars that grow when the tile scrolls into view.
3. 99.99% uptime across 14 regions: a slowly spinning ring.
4. SSO with Okta, Google and Azure: a lock icon.`,
      layout: 'Style: rounded tiles, thin borders, violet and cyan accents. Mobile: stack all tiles in one column.',
      extras: `Motion rules:
- Bars grow once on first view (IntersectionObserver), staggered 80ms.
- The ring rotates slowly (about 40s per turn, linear, infinite).
- prefers-reduced-motion: bars appear at full height and the ring stays still.`,
      acceptance: [
        'The 99.99% and 14 regions figures come from the brief; keep them editable and flag them as "confirm before publishing".',
        'Mobile stacks all tiles in one vertical column cleanly.',
        'Respect prefers-reduced-motion with instant static rendering.'
      ],
    },
    blocks: ['A', 'B', 'C', 'E'],
    placeholders: ['PROJECT', 'AUDIENCE', 'APPROVED_CONTENT', 'BRAND_RULES'],
    renderer: 'BentoFeatures',
  },
  {
    id: 'osteria-lume',
    name: 'Wood-Fire Restaurant Homepage',
    group: 'Industry Homepages',
    tagline: 'Slow food, quick to love.',
    deliverable: 'a restaurant homepage',
    interactive: false,
    defaults: {
      palette: {
        bg: '#1A1411',
        surface: '#241B16',
        surface2: '#32251E',
        text: '#F3E9D7',
        muted: '#BFAE95',
        accent: '#E0A030',
        accent2: '#C28322',
        success: '#10B981',
        danger: '#EF4444',
        border: '#3A2D25',
      },
      fontId: 'playfair-literary',
      geometry: {
        radius: 8,
        gap: 16,
        borderWidth: 1,
        shadow: 'soft',
        blur: 0,
      },
      motion: 'subtle',
    },
    defaultDirection: 'dark warm background, cream text, amber accents, serif headings.',
    unique: {
      required: `Create a homepage for a wood-fire Italian restaurant called Osteria Lume.
Header: Menu, Wine, Private dining, Story, and a "Reserve" button.
Hero:
- Small label: "Wood fire · Fresh pasta"
- Headline: "Slow food, quick to love."
- One sentence about handmade pasta and the wine list.
- "Book a table" button and a "View the menu" link.
Below the hero: three info blocks: hours, address, and private dining for groups.`,
      layout: 'Mobile: make booking easy to reach with a sticky bottom "Reserve" bar (44px minimum touch target).',
      acceptance: [
        'Hours, address and phone were not supplied. Show clearly labeled placeholders ("[Hours to confirm]"), never invented values.',
        'Mobile sticky reserve bar provides seamless booking access.',
        'Warm wood-fire atmospheric depth with legible cream typography.'
      ],
    },
    blocks: ['A', 'B', 'C', 'E'],
    placeholders: ['PROJECT', 'AUDIENCE', 'APPROVED_CONTENT', 'BRAND_RULES'],
    renderer: 'RestaurantHome',
  },
  {
    id: 'law-firm',
    name: 'Law Firm Homepage',
    group: 'Industry Homepages',
    tagline: 'Counsel that stands beside you, not above you.',
    deliverable: 'a complete law firm homepage',
    interactive: false,
    defaults: {
      palette: {
        bg: '#F8F5EE',
        surface: '#FFFFFF',
        surface2: '#F1ECDF',
        text: '#14213D',
        muted: '#5B6478',
        accent: '#B8975A',
        accent2: '#8E713A',
        success: '#10B981',
        danger: '#EF4444',
        border: '#E4DDCC',
      },
      fontId: 'source-serif-literary',
      geometry: {
        radius: 6,
        gap: 18,
        borderWidth: 1,
        shadow: 'none',
        blur: 0,
      },
      motion: 'subtle',
    },
    defaultDirection: 'navy and muted gold on warm off-white, serif headings.',
    unique: {
      required: `Design a complete homepage for a law firm called Ashford & Reyes.
Header: firm name, links for Practice areas, Our team, Results and Insights, and a "Free consultation" button.
Hero:
- Headline: "Counsel that stands beside you, not above you"
- One sentence about employment, family and business law.
- "Book a consultation" button and a "See our results" link.
Then: a row of three proof numbers, practice-area cards, and a contact footer.`,
      layout: 'Desktop: refined editorial columns. Mobile: stack everything cleanly.',
      acceptance: [
        'Proof numbers and case results were not supplied. Use labeled placeholders ("[Figure to confirm]"), never invented outcomes or guarantees.',
        'Leave a visible slot for the legal disclaimer and bar/regulatory wording the firm must supply.',
        'Gold used with restraint, ensuring high contrast text readability.'
      ],
    },
    blocks: ['A', 'B', 'C', 'E'],
    placeholders: ['PROJECT', 'AUDIENCE', 'APPROVED_CONTENT', 'BRAND_RULES'],
    renderer: 'LawFirmHome',
  },
];

export function getBlueprintById(id: string): Blueprint | undefined {
  return BLUEPRINTS.find(b => b.id === id);
}

export function getBlueprintsAsStyles(): import('@/types').StyleDef[] {
  return BLUEPRINTS.map(bp => ({
    id: `bp-${bp.id}`,
    name: bp.name,
    category: 'Real-World Blueprints',
    tagline: bp.tagline,
    defaults: {
      paletteId: bp.id === 'bento-features' ? 'bento-midnight' : bp.id === 'osteria-lume' ? 'wabi-sabi-tea' : bp.id === 'law-firm' ? 'editorial-sepia' : 'clean-paper',
      fontId: bp.defaults.fontId,
      geometry: bp.defaults.geometry,
    },
    rules: bp.unique.acceptance,
    bestFor: [bp.group, bp.deliverable],
    variant: bp.id === 'bento-features' ? 'bento-grid' : bp.id === 'scroll-story' ? 'minimalism' : 'standard',
  }));
}
