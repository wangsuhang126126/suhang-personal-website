import { useEffect, useRef, useState } from "react";

export default function EnergyHorizon({ scrollProgress }) {
  const wrapRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canHover || reducedMotion) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 4;
      const y = (event.clientY / window.innerHeight - 0.5) * 3;
      setOffset({ x, y });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const fadedOpacity = Math.max(0.4, 1 - scrollProgress * 0.52);

  return (
    <div
      className="energy-horizon"
      ref={wrapRef}
      aria-hidden="true"
      style={{
        "--parallax-x": `${offset.x}px`,
        "--parallax-y": `${offset.y}px`,
        "--horizon-opacity": fadedOpacity,
      }}
    >
      <svg className="horizon-svg" viewBox="0 0 1440 720" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--horizon-line)" stopOpacity="0" />
            <stop offset="48%" stopColor="var(--accent-energy)" stopOpacity="0.78" />
            <stop offset="100%" stopColor="var(--horizon-line)" stopOpacity="0" />
          </linearGradient>
          <pattern id="grain" width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M6 18h1M43 9h1M70 36h1M28 71h1M88 82h1" stroke="var(--text-primary)" strokeOpacity="0.08" />
          </pattern>
          <linearGradient id="headlineQuietGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0.34" />
            <stop offset="74%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="headlineQuietMask" maskUnits="userSpaceOnUse">
            <rect width="1440" height="720" fill="white" />
            <rect x="82" y="276" width="660" height="226" fill="url(#headlineQuietGradient)" />
          </mask>
        </defs>

        <rect className="grain-layer" width="1440" height="720" fill="url(#grain)" />

        <g className="coordinate-field" mask="url(#headlineQuietMask)">
          <path d="M76 160H1370M76 276H1370M76 514H1370" />
          <path d="M210 104V610M405 104V610M1238 104V610" />
          <path d="M164 356h24M321 356h16M574 356h26M732 356h16M1010 356h26M1306 356h18" />
          <text x="92" y="150">34.3N / 108.9E</text>
          <text x="1200" y="504">OUTWARD VECTOR</text>
        </g>

        <g className="horizon-plane">
          <g mask="url(#headlineQuietMask)">
            <line className="main-line" x1="120" y1="356" x2="1322" y2="356" />
            <line className="signal-base" x1="403" y1="356" x2="878" y2="356" />
            <line className="signal-base delayed" x1="878" y1="356" x2="1238" y2="356" />
            <line className="energy-pulse" x1="403" y1="356" x2="878" y2="356" />
            <line className="energy-pulse continuation" x1="878" y1="356" x2="1238" y2="356" />
          </g>

          <g className="node node-xian" transform="translate(403 356)">
            <circle className="node-ring" r="16" />
            <circle className="node-core" r="3.8" />
            <text x="-72" y="-132">XI’AN</text>
            <text x="-72" y="-114">34.3°N · 108.9°E</text>
          </g>

          <g className="node node-tokyo" transform="translate(878 356)">
            <circle className="node-ring" r="20" />
            <circle className="node-core" r="5.5" />
          </g>

          <g className="node node-global" transform="translate(1238 356)">
            <circle className="node-ring" r="14" />
            <circle className="node-core" r="2.8" />
            <path className="global-arrow" d="M24 0h54m-12-9 12 9-12 9" />
            <text x="-8" y="42">GLOBAL</text>
            <text x="-8" y="60">LOOKING OUTWARD →</text>
          </g>
        </g>
      </svg>

    </div>
  );
}
