import { useEffect, useRef, useState } from "react";
import EnergyLayer from "./EnergyLayer.jsx";
import EnergyPulse from "./EnergyPulse.jsx";
import { useLang } from "../hooks/useLang.js";
import { t } from "../i18n/siteCopy.js";

const layers = [
  {
    number: "01",
    action: "GENERATE",
    label: "SOLAR ENERGY",
    text: "Clean electricity enters the system.",
    length: "52%",
  },
  {
    number: "02",
    action: "STORE",
    label: "RESIDENTIAL ENERGY STORAGE",
    text: "Energy becomes available when homes need it.",
    length: "74%",
  },
  {
    number: "03",
    action: "ORCHESTRATE",
    label: "VPP · HOME ENERGY MANAGEMENT · GRID INTERACTION",
    text: "Distributed assets begin to operate as part of a wider system.",
    length: "96%",
  },
];

export default function EnergySection() {
  const lang = useLang();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      setIsActive(false);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`energy-section${isVisible ? " is-visible" : ""}${isActive ? " is-active" : ""}`}
      id="energy"
      ref={sectionRef}
      aria-labelledby="energy-title"
    >
      <div className="energy-continuity" aria-hidden="true" />
      <div className="energy-inner">
        <div className="energy-copy">
          <p className="section-marker">
            <span>02</span>
            <span>{t(lang, "home.energy.marker")}</span>
          </p>
          <h2 id="energy-title">
            <span className="energy-title-line">{t(lang, "home.energy.heading.line1")}</span>
            <span className="energy-title-line">{t(lang, "home.energy.heading.line2")}</span>
          </h2>
          <p className="energy-body">{t(lang, "home.energy.body")}</p>
        </div>

        <div className="energy-system" aria-label="Generate, store, orchestrate energy system">
          <EnergyPulse />
          {layers.map((layer, index) => (
            <EnergyLayer key={layer.number} layer={layer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
