import { useState } from 'react';

const STORAGE_KEY = 'intro_seen';

export function useIntroSeen(): [boolean, () => void] {
  const [seen, setSeen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      // Allow overriding with URL query e.g. ?replay=1 or ?intro=1 for testing
      const params = new URLSearchParams(window.location.search);
      if (params.get('replay') === '1' || params.get('intro') === '1') {
        sessionStorage.removeItem(STORAGE_KEY);
        return false;
      }
      return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  const markSeen = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (err) {
      console.warn('sessionStorage write error:', err);
    }
    setSeen(true);
  };

  return [seen, markSeen];
}
