"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page.
 *
 * Anything marked `data-reveal` gets `data-shown` when it scrolls into view,
 * and CSS does the rest — so server components stay server components and no
 * element pays for its own client boundary. Under reduced motion nothing is
 * observed and the CSS shows everything outright.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not([data-shown])",
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return null;
}
