"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page.
 *
 * Anything marked `data-reveal` gets `data-shown` when it enters the viewport,
 * and CSS does the rest — so server components stay server components and no
 * element pays for its own client boundary.
 *
 * Three things this has to survive, all of which left content stuck invisible
 * before:
 *
 *   1. Content that is already on screen at mount — landing on `#fares`, or
 *      restoring a scroll position. An IntersectionObserver does report those
 *      on its first callback, but only for elements that exist when it starts,
 *      so anything added later was missed. A MutationObserver now picks those
 *      up.
 *   2. A watchdog. If anything ever prevents the callback from firing, content
 *      must not stay hidden — text is more important than the animation.
 *   3. Reduced motion, where everything is shown immediately.
 */
export function RevealObserver() {
  useEffect(() => {
    const show = (el: Element) => el.setAttribute("data-shown", "");
    const pending = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pending().forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          observer.unobserve(entry.target);
        }
      },
      // No negative bottom margin: elements that arrive at the edge of the
      // viewport while earlier siblings are still animating would otherwise
      // sit just outside the trigger area and stay hidden.
      { rootMargin: "300px 0px 0px 0px", threshold: 0 },
    );

    const observeAll = () => {
      for (const target of pending()) observer.observe(target);
    };
    observeAll();

    // Client-navigated pages mount new content after this effect has run.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    // Last resort: never leave content hidden because of a missed callback.
    const watchdog = window.setTimeout(() => pending().forEach(show), 2000);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.clearTimeout(watchdog);
    };
  }, []);

  return null;
}
