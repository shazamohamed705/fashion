import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useCarousel — auto-scrolling horizontal carousel hook
 *
 * @param {number} total      — number of cards
 * @param {number} interval   — ms between advances (default 3500)
 * @param {number} pauseAfterTouch — ms to pause after user touches (default 6000)
 *
 * Returns:
 *   trackRef   — ref for the scroll container
 *   cardRefs   — ref array for each card element
 *   current    — current active index (for dots)
 *   goTo(i)    — scroll to card i
 */
export function useCarousel(total, interval = 3500, pauseAfterTouch = 6000) {
  const trackRef   = useRef(null);
  const cardRefs   = useRef([]);
  const currentRef = useRef(0);
  const pausedRef  = useRef(false);
  const [current, setCurrent] = useState(0);

  /* ── Scroll to a specific card index ── */
  const goTo = useCallback((idx) => {
    const el   = trackRef.current;
    const card = cardRefs.current[idx];
    if (!el || !card) return;
    // offsetLeft relative to container, minus the paddingLeft (16px)
    el.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' });
    currentRef.current = idx;
    setCurrent(idx);
  }, []);

  /* ── Auto-advance ── */
  useEffect(() => {
    const tick = () => {
      if (pausedRef.current) return;
      goTo((currentRef.current + 1) % total);
    };
    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [total, interval, goTo]);

  /* ── Pause on touch, resume after pauseAfterTouch ── */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let resumeTimer;
    const onTouch = () => {
      pausedRef.current = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { pausedRef.current = false; }, pauseAfterTouch);
    };
    el.addEventListener('touchstart', onTouch, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouch);
      clearTimeout(resumeTimer);
    };
  }, [pauseAfterTouch]);

  /* ── Sync dot indicator on manual scroll ── */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let debounce;
    const onScroll = () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        let closest = 0;
        let minDist = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const dist = Math.abs(card.offsetLeft - 16 - el.scrollLeft);
          if (dist < minDist) { minDist = dist; closest = i; }
        });
        currentRef.current = closest;
        setCurrent(closest);
      }, 80);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => { el.removeEventListener('scroll', onScroll); clearTimeout(debounce); };
  }, []);

  return { trackRef, cardRefs, current, goTo };
}
