import { useEffect, useRef } from 'react';
import { savePortfolio } from '../services/storage';

/**
 * Debounced auto-save hook.
 * Saves portfolio data to user-scoped localStorage after `delay` ms of inactivity.
 */
export function useAutoSave(data, uid, delay = 800) {
  const timerRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip initial mount save
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!data) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      savePortfolio(data, uid);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data, uid, delay]);
}

