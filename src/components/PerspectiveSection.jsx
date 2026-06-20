import { useEffect, useRef, useState } from "react";
import PerspectiveVector from "./PerspectiveVector.jsx";
import { useLang } from "../hooks/useLang.js";
import { t } from "../i18n/siteCopy.js";

const vectorKeys = [
  {
    number: "01",
    title: "CHINA → JAPAN → GLOBAL",
    labelKey: "home.perspective.v1.label",
    textKey: "home.perspective.v1.text",
  },
  {
    number: "02",
    title: "SOLAR → ENERGY STORAGE → FUTURE SYSTEMS",
    labelKey: "home.perspective.v2.label",
    textKey: "home.perspective.v2.text",
  },
  {
    number: "03",
    title: "BUSINESS → TECHNOLOGY → AI",
    labelKey: "home.perspective.v3.label",
    textKey: "home.perspective.v3.text",
  },
];

export default function PerspectiveSection() {
  const lang = useLang();
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

  const vectors = vectorKeys.map((v) => ({
    number: v.number,
    title: v.title,
    label: t(lang, v.labelKey),
    text: t(lang, v.textKey),
  }));

  return (
    <section
      className={`perspective-section${isVisible ? " is-visible" : ""}`}
      id="perspective"
      ref={sectionRef}
      aria-labelledby="perspective-title"
    >
      <div className="perspective-inner">
        <div className="perspective-copy">
          <p className="section-marker">
            <span>01</span>
            <span>{t(lang, "home.perspective.marker")}</span>
          </p>
          <h2 id="perspective-title">
            {t(lang, "home.perspective.heading.line1")}
            <br />
            {t(lang, "home.perspective.heading.line2")}
            <br />
            {t(lang, "home.perspective.heading.line3")}
          </h2>
          <p className="perspective-body">{t(lang, "home.perspective.body")}</p>
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
