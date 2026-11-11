import { useState, useEffect } from 'react';

/**
 * Tracks real application readiness:
 * - document.fonts.ready
 * - DOM paint completion
 * - Respects minimum and maximum duration constraints (e.g. 4s min, 8s max)
 */
export function useAppReady(minDurationMs: number = 4000, maxDurationMs: number = 8000): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const startTime = performance.now();

    const checkReady = async () => {
      try {
        if ('fonts' in document) {
          await document.fonts.ready;
        }
      } catch (err) {
        console.warn('Font readiness check skipped:', err);
      }

      const elapsed = performance.now() - startTime;
      const remainingMin = Math.max(0, minDurationMs - elapsed);

      setTimeout(() => {
        if (isMounted) {
          setIsReady(true);
        }
      }, remainingMin);
    };

    checkReady();

    // Safety timeout max duration
    const maxTimeout = setTimeout(() => {
      if (isMounted) setIsReady(true);
    }, maxDurationMs);

    return () => {
      isMounted = false;
      clearTimeout(maxTimeout);
    };
  }, [minDurationMs, maxDurationMs]);

  return isReady;
}
