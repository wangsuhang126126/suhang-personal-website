import { useEffect, useRef, useState } from "react";
import PerspectiveVector from "./PerspectiveVector.jsx";
import TokyoTransitionLine from "./TokyoTransitionLine.jsx";

const vectors = [
  {
    number: "01",
    title: "CHINA → JAPAN → GLOBAL",
    label: "GEOGRAPHIC VECTOR",
    text: "A perspective shaped across borders, languages, and markets.",
  },
  {
    number: "02",
    title: "SOLAR → ENERGY STORAGE → FUTURE SYSTEMS",
    label: "ENERGY VECTOR",
    text: "A professional journey through the evolving energy transition.",
  },
  {
    number: "03",
    title: "BUSINESS → TECHNOLOGY → AI",
    label: "TECHNOLOGY VECTOR",
    text: "A growing interest in how tools reshape decisions, work, and society.",
  },
];

export default function PerspectiveSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`perspective-section${isVisible ? " is-visible" : ""}`}
      id="perspective"
      ref={sectionRef}
      aria-labelledby="perspective-title"
    >
      <TokyoTransitionLine />
      <div className="perspective-inner">
        <div className="perspective-copy">
          <p className="section-marker">
            <span>01</span>
            <span>PERSPECTIVE</span>
          </p>
          <h2 id="perspective-title">
            THREE PATHS
            <br />
            SHAPE THE WAY
            <br />
            I SEE THE FUTURE.
          </h2>
          <p className="perspective-body">
            Born in Xi’an and shaped by more than a decade of living and working in Japan, I
            observe energy, technology, and international business through three intersecting paths.
          </p>
        </div>

        <div className="vector-list" aria-label="Three perspective vectors">
          {vectors.map((vector, index) => (
            <PerspectiveVector key={vector.number} vector={vector} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
