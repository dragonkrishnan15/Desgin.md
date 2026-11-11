import { Theme } from '@/types';
import { getResolvedTheme } from './applyTheme';

export function generateAiPrompt(theme: Theme, pageType: string = 'landing page and dashboard'): string {
  const { palette, font, style } = getResolvedTheme(theme);
  const geo = theme.geometry;

  const rulesFormatted = style.rules.length > 0 
    ? style.rules.join('; ') 
    : 'Maintain visual hierarchy, crisp contrast, and cohesive geometry.';

  return `Design a ${pageType} using the "${style.name}" design style.
Colors: background ${palette.bg}, surface ${palette.surface}, text ${palette.text}, accent ${palette.accent}, secondary ${palette.accent2}.
Typography: headings in ${font.heading} (weight ${font.headingWeight}), body in ${font.body} (weight ${font.bodyWeight}); heading tracking ${font.tracking}.
Shape: corner radius ${geo.radius}px, gap ${geo.gap}px, border ${geo.borderWidth}px, shadow style ${geo.shadow}, glass blur ${geo.blur}px.
Signature rules: ${rulesFormatted}.
Keep spacing on an 8px scale. Ensure WCAG AA contrast.`;
}

