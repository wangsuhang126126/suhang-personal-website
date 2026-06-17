import { useEffect, useRef, useState } from "react";
import MinimalFooter from "../components/MinimalFooter.jsx";
import { useLang } from "../hooks/useLang.js";
import { t } from "../i18n/siteCopy.js";

const sectionMeta = [
  {
    id: "market",
    number: "02",
    labelKey: "journey.market.label",
    h2Keys: ["journey.market.h2.line1", "journey.market.h2.line2", "journey.market.h2.line3"],
    bodyKeys: ["journey.market.body.p1", "journey.market.body.p2"],
    rows: [
      { number: "01", titleKey: "journey.market.row1.title", textKey: "journey.market.row1.text" },
      { number: "02", titleKey: "journey.market.row2.title", textKey: "journey.market.row2.text" },
      { number: "03", titleKey: "journey.market.row3.title", textKey: "journey.market.row3.text" },
    ],
  },
  {
    id: "energy",
    number: "03",
    labelKey: "journey.energy.label",
    variant: "energy",
    h2Keys: ["journey.energy.h2.line1", "journey.energy.h2.line2", "journey.energy.h2.line3"],
    bodyKeys: [
      "journey.energy.body.p1",
      "journey.energy.body.p2",
      "journey.energy.body.p3",
      "journey.energy.body.p4",
    ],
    rows: [
      { number: "01", titleKey: "journey.energy.row1.title", textKey: "journey.energy.row1.text" },
      { number: "02", titleKey: "journey.energy.row2.title", textKey: "journey.energy.row2.text" },
      { number: "03", titleKey: "journey.energy.row3.title", textKey: "journey.energy.row3.text" },
      { number: "04", titleKey: "journey.energy.row4.title", textKey: "journey.energy.row4.text" },
    ],
  },
  {
    id: "technology",
    number: "04",
    labelKey: "journey.technology.label",
    variant: "technology",
    h2Keys: ["journey.technology.h2.line1", "journey.technology.h2.line2", "journey.technology.h2.line3"],
    bodyKeys: [
      "journey.technology.body.p1",
      "journey.technology.body.p2",
      "journey.technology.body.p3",
    ],
    rows: [
      { number: "01", titleKey: "journey.technology.row1.title", textKey: "journey.technology.row1.text" },
      { number: "02", titleKey: "journey.technology.row2.title", textKey: "journey.technology.row2.text" },
      { number: "03", titleKey: "journey.technology.row3.title", textKey: "journey.technology.row3.text" },
      { number: "04", titleKey: "journey.technology.row4.title", textKey: "journey.technology.row4.text" },
    ],
  },
  {
    id: "next-chapter",
    number: "05",
    labelKey: "journey.next.label",
    variant: "energy",
    h2Keys: ["journey.next.h2.line1", "journey.next.h2.line2", "journey.next.h2.line3"],
    bodyKeys: [
      "journey.next.body.p1",
      "journey.next.body.p2",
      "journey.next.body.p3",
      "journey.next.body.p4",
    ],
    rows: [
      { number: "01", titleKey: "journey.next.row1.title", textKey: "journey.next.row1.text" },
      { number: "02", titleKey: "journey.next.row2.title", textKey: "journey.next.row2.text" },
      { number: "03", titleKey: "journey.next.row3.title", textKey: "journey.next.row3.text" },
    ],
  },
];

const progressionKeys = [
  { labelKey: "journey.progress.place.label", pathKey: "journey.progress.place.path" },
  { labelKey: "journey.progress.energy.label", pathKey: "journey.progress.energy.path" },
  { labelKey: "journey.progress.work.label", pathKey: "journey.progress.work.path" },
];

function renderLines(lang, ...keys) {
  const lines = keys.map((k) => t(lang, k)).filter(Boolean);
  return lines.reduce((acc, line, i, arr) => {
    acc.push(line);
    if (i < arr.length - 1) acc.push(<br key={i} />);
    return acc;
  }, []);
}

function useJourneyReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = ref.current;
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
      { rootMargin: "0px 0px -18% 0px", threshold: 0.16 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function JourneyMarker({ number, label }) {
  return (
    <p className="journey-page-marker">
      <span>{number}</span>
      <span>{label}</span>
    </p>
  );
}

function JourneyRows({ rows, lang }) {
  return (
    <div className="journey-row-list">
      {rows.map((row, index) => (
        <div className="journey-row" key={row.titleKey} style={{ "--journey-row-index": index }}>
          <span className="journey-row-number">{row.number}</span>
          <div className="journey-row-main">
            <strong>{t(lang, row.titleKey)}</strong>
            <p>{t(lang, row.textKey)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function JourneyHero({ lang }) {
  const [ref, isVisible] = useJourneyReveal();

  return (
    <section className={`journey-page-hero${isVisible ? " is-visible" : ""}`} ref={ref} aria-labelledby="journey-title">
      <div className="journey-page-hero-inner">
        <JourneyMarker number="01" label={t(lang, "journey.hero.marker")} />
        <h1 id="journey-title">
          {renderLines(lang, "journey.hero.h1.line1", "journey.hero.h1.line2", "journey.hero.h1.line3")}
        </h1>
        <div className="journey-page-hero-body">
          <p>{t(lang, "journey.hero.body.p1")}</p>
          <p>{t(lang, "journey.hero.body.p2")}</p>
        </div>
        <div className="journey-progress-map" aria-label="Journey progression">
          {progressionKeys.map((item) => (
            <div className="journey-progress-row" key={item.labelKey}>
              <span>{t(lang, item.labelKey)}</span>
              <strong>{t(lang, item.pathKey)}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneySection({ section, lang }) {
  const [ref, isVisible] = useJourneyReveal();

  return (
    <section
      className={`journey-page-section journey-page-${section.id}${section.variant ? ` is-${section.variant}` : ""}${
        isVisible ? " is-visible" : ""
      }`}
      ref={ref}
      aria-labelledby={`journey-${section.id}-title`}
    >
      <div className="journey-page-section-inner">
        <div className="journey-page-section-copy">
          <JourneyMarker number={section.number} label={t(lang, section.labelKey)} />
          <h2 id={`journey-${section.id}-title`}>{renderLines(lang, ...section.h2Keys)}</h2>
          <div className="journey-page-section-body">
            {section.bodyKeys.map((key) => (
              <p key={key}>{t(lang, key)}</p>
            ))}
          </div>
        </div>
        <JourneyRows rows={section.rows} lang={lang} />
      </div>
    </section>
  );
}

export default function JourneyPage() {
  const lang = useLang();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className="journey-page">
      <JourneyHero lang={lang} />
      {sectionMeta.map((section) => (
        <JourneySection key={section.id} section={section} lang={lang} />
      ))}
      <MinimalFooter />
    </main>
  );
}
