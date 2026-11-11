// WCAG 2.1 Contrast & Luminance calculations

export function hexToRgb(hex: string): [number, number, number] {
  let cleanHex = hex.replace(/^#/, '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  if (cleanHex.length !== 6) {
    return [0, 0, 0];
  }
  const num = parseInt(cleanHex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(c => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(hexA: string, hexB: string): number {
  const lumA = luminance(hexA);
  const lumB = luminance(hexB);
  const brightest = Math.max(lumA, lumB);
  const darkest = Math.min(lumA, lumB);
  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return Math.round(ratio * 100) / 100;
}

export function getContrastStatus(ratio: number, minRatio: number = 4.5): "pass" | "warn" | "fail" {
  if (ratio >= minRatio) return "pass";
  if (ratio >= 3.0) return "warn";
  return "fail";
}

export function checkPaletteContrast(bg: string, text: string): {
  ratio: number;
  status: "pass" | "warn" | "fail";
  isAA: boolean;
} {
  const ratio = contrast(bg, text);
  const status = getContrastStatus(ratio, 4.5);
  return {
    ratio,
    status,
    isAA: ratio >= 4.5,
  };
}

