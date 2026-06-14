import { useEffect, useState } from "react";

export function useDampedScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setProgress(1);
      return undefined;
    }

    let target = 0;
    let current = 0;
    let frame = 0;

    const measure = () => {
      const rect = element.getBoundingClientRect();
      const travel = Math.max(rect.height - window.innerHeight, 1);
      target = Math.min(Math.max(-rect.top / travel, 0), 1);
    };

    const animate = () => {
      current += (target - current) * 0.045;
      if (Math.abs(target - current) < 0.001) {
        current = target;
      }
      setProgress(current);
      frame = window.requestAnimationFrame(animate);
    };

    const update = () => measure();

    measure();
    frame = window.requestAnimationFrame(animate);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [ref]);

  return progress;
}
