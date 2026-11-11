/**
 * SHARED PROMPT BLOCKS FOR REAL-WORLD BLUEPRINTS
 * Master Prompt Section 1: Standardized quality & safety blocks
 */

export const BLOCK_A_CONTENT_INTEGRITY = `Use [APPROVED_CONTENT] as the only source of names, dates, figures, claims and destinations. Before building, list any missing inputs. If a demonstration needs placeholder content, label it clearly as fictional. Do not invent customer quotes, rankings, partner logos, metrics or product capabilities.`;

export const BLOCK_B_IMPLEMENTATION_REVIEW = `Keep all text editable. Use semantic HTML, descriptive controls, visible keyboard focus, and appropriate empty and error states. Check narrow and wide layouts. Respect prefers-reduced-motion. Keep the existing project framework and dependencies; do not silently replace the stack. Return the editable files and explain any incomplete behavior or unsupported inputs. Review this specific task before proposing extra features.`;

export const BLOCK_C_REFERENCE_RECONSTRUCTION = `Use the attached reference image as the visual reference for {name}. Before building, identify the major regions from top to bottom, their relative widths and heights, alignment, spacing, typography hierarchy, surface colors, borders, imagery and repeated components, and preserve those relationships rather than substituting a generic template. Rebuild it as editable elements; do not embed the reference image as the finished interface. Approved project content and brand rules win over sample labels. If the image is missing or unreadable, ask for it instead of claiming visual fidelity.`;

export const BLOCK_D_INTERACTION_SPEC = `The reference is a static concept: the behavior below is a requirement to implement, not proof that a picture already works. For each visible control, specify its trigger, affected state and feedback. Keep local changes consistent across related views. Give search and filters real results, selection controls an explicit active state, and save actions visible pending, success and failure feedback where relevant. Use proper links for navigation, buttons for actions, and accessible names for icon controls. Do not add unrelated workflows. Do not imply a backend operation succeeded when only a local demo changed.`;

export const BLOCK_E_VISUAL_COMPARISON_DELIVERY = `1. Compare the result with the reference at matching proportions. Review region placement, relative sizes, line breaks, spacing, typography hierarchy, contrast, active states and content density before polishing decorative details.
2. Then test the narrow layout without squeezing desktop text into tiny labels.
3. Keep logos, photos and icons as separate assets and all meaningful labels editable. List any unavailable fonts or assets and any intentional departures. Return the working files plus a concise account of implemented behavior and remaining integrations. Do not promise a pixel-identical result from the prompt alone.`;

