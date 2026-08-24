import { useEffect, useRef } from 'react';
import { savePortfolio } from '../services/storage';

/**
 * Debounced auto-save hook.
 * Saves portfolio data to localStorage after `delay` ms of inactivity.
 */
export function useAutoSave(data, delay = 800) {
  const timerRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip initial mount save — loadPortfolio already handles that
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      savePortfolio(data);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data, delay]);
}
