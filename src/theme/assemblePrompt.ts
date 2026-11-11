import { Blueprint, Theme, BlueprintInputs } from '@/types';
import { 
  BLOCK_A_CONTENT_INTEGRITY, 
  BLOCK_B_IMPLEMENTATION_REVIEW, 
  BLOCK_C_REFERENCE_RECONSTRUCTION, 
  BLOCK_D_INTERACTION_SPEC, 
  BLOCK_E_VISUAL_COMPARISON_DELIVERY 
} from '@/data/promptBlocks';
import { getResolvedTheme } from './applyTheme';

function section(title: string, content: string): string {
  return `## ${title}\n${content.trim()}`;
}

function bullets(items: string[]): string {
  return items.map(item => `- ${item.trim()}`).join('\n');
}

/**
 * Converts a theme's exact tokens into a clear, natural design direction sentence for LLMs
 */
export function themeToDirection(theme: Theme): string {
  const { palette, font, style } = getResolvedTheme(theme);
  const geo = theme.geometry;

  const shadowDescription = 
    geo.shadow === 'none' ? 'no box shadows' :
    geo.shadow === 'soft' ? 'soft ambient drop shadows' :
    geo.shadow === 'hard' ? `crisp ${geo.borderWidth + 3}px hard offset shadows (${palette.border})` :
    `radiant chromatic glow shadows (${palette.accent})`;

  const blurDescription = geo.blur > 0 ? ` with ${geo.blur}px backdrop-filter glass blur` : '';

  return `Style archetype: ${style.name} (${style.tagline}). ` +
    `Palette "${palette.name}": background ${palette.bg}, surface ${palette.surface}, text ${palette.text}, ` +
    `muted ${palette.muted}, primary accent ${palette.accent}${palette.accent2 ? `, secondary accent ${palette.accent2}` : ''}, border ${palette.border}. ` +
    `Typography: ${font.heading} for headings (weight ${font.headingWeight}, letter-spacing ${font.tracking}), ${font.body} for body text. ` +
    `Geometry: ${geo.radius}px border-radius, ${geo.gap}px layout gap, ${geo.borderWidth}px borders, ${shadowDescription}${blurDescription}.`;
}

/**
 * Assembles a ready-to-paste build prompt for any blueprint + theme combo
 */
export function assemblePrompt(
  bp: Blueprint,
  theme: Theme | null,
  inputs: BlueprintInputs = {},
  opts: { reference?: boolean } = {}
): string {
  const project = inputs.PROJECT?.trim() || '[PROJECT]';
  const audience = inputs.AUDIENCE?.trim() || '[AUDIENCE]';
  const approvedContent = inputs.APPROVED_CONTENT?.trim() || '[APPROVED_CONTENT]';
  const brandRules = inputs.BRAND_RULES?.trim() || '[BRAND_RULES]';

  const direction = theme ? themeToDirection(theme) : bp.defaultDirection;

  const blockA = BLOCK_A_CONTENT_INTEGRITY.replace('[APPROVED_CONTENT]', approvedContent);
  const blockC = BLOCK_C_REFERENCE_RECONSTRUCTION.replace('{name}', bp.name);

  const parts = [
    `Create ${bp.deliverable} for ${project} and ${audience}. The task is: ${bp.name}.`,
    section('Required content and structure', bp.unique.required),
    blockA,
    section(
      'Design direction',
      `Use ${brandRules} and the design system already selected in the project. ${direction} Keep type, spacing and color roles consistent. Prioritize the task over decoration.`
    ),
    bp.unique.contentPrep ? section('Content preparation', bp.unique.contentPrep) : null,
    bp.unique.layout ? section('Layout and behavior', bp.unique.layout) : null,
    section('Task-specific acceptance check', bullets(bp.unique.acceptance)),
    bp.unique.extras ? bp.unique.extras : null,
    bp.interactive ? BLOCK_D_INTERACTION_SPEC : null,
    BLOCK_B_IMPLEMENTATION_REVIEW,
    opts.reference ? blockC : null,
    opts.reference ? BLOCK_E_VISUAL_COMPARISON_DELIVERY : null,
  ];

  return parts.filter(Boolean).join('\n\n');
}

