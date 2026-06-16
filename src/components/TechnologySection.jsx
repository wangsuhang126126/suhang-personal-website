import { useEffect, useRef, useState } from "react";
import TechnologyMobileFlow from "./TechnologyMobileFlow.jsx";
import WorkflowNetwork from "./WorkflowNetwork.jsx";
import { useLang } from "../hooks/useLang.js";
import { t } from "../i18n/siteCopy.js";

const workflowNodes = [
  {
    number: "01",
    title: "RESEARCH",
    text: "Finding signals\nin a noisy world.",
    position: "research",
  },
  {
    number: "02",
    title: "SYNTHESIS",
    text: "Turning information\ninto structure.",
    position: "synthesis",
  },
  {
    number: "03",
    title: "DECISION",
    text: "Choosing where\nto focus.",
    position: "decision",
  },
  {
    number: "04",
    title: "EXECUTION",
    text: "Moving from insight\nto action.",
    position: "execution",
  },
  {
    number: "05",
    title: "LEARNING",
    text: "Improving through\ncontinuous feedback.",
    position: "learning",
  },
];

export default function TechnologySection() {
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
      className={`technology-section${isVisible ? " is-visible" : ""}${isActive ? " is-active" : ""}`}
      id="technology"
      ref={sectionRef}
      aria-labelledby="technology-title"
    >
      <div className="technology-bridge" aria-hidden="true" />
      <div className="technology-inner">
        <div className="technology-copy">
          <p className="section-marker">
            <span>03</span>
            <span>{t(lang, "home.technology.marker")}</span>
          </p>
          <h2 id="technology-title">
            {t(lang, "home.technology.heading.line1")}
            <br />
            {t(lang, "home.technology.heading.line2")}
          </h2>
          <p className="technology-body">{t(lang, "home.technology.body")}</p>
        </div>

        <WorkflowNetwork nodes={workflowNodes} />
        <TechnologyMobileFlow nodes={workflowNodes} />
      </div>
    </section>
  );
}
