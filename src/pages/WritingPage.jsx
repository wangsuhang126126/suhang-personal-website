import { useEffect, useRef, useState } from "react";
import MinimalFooter from "../components/MinimalFooter.jsx";
import { getArticleIndex } from "../content/articles.js";
import { useLang } from "../hooks/useLang.js";
import { t } from "../i18n/siteCopy.js";

function formatArticleDate(date) {
  if (!date) {
    return "DRAFT";
  }

  try {
    const parsed = new Date(`${date}T00:00:00`);
    if (isNaN(parsed.getTime())) return "DRAFT";
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(parsed);
  } catch {
    return "DRAFT";
  }
}

function formatTags(tags) {
  return Array.isArray(tags) ? tags.join(" · ") : tags;
}

const topicKeys = [
  { title: "writing.topics.energy.title", body: "writing.topics.energy.body" },
  { title: "writing.topics.ai.title", body: "writing.topics.ai.body" },
  { title: "writing.topics.japan.title", body: "writing.topics.japan.body" },
  { title: "writing.topics.building.title", body: "writing.topics.building.body" },
];

function useWritingReveal() {
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
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function WritingMarker({ number, label }) {
  return (
    <p className="writing-page-marker">
      <span>{number}</span>
      <span>{label}</span>
    </p>
  );
}

function WritingHero({ lang }) {
  const [ref, isVisible] = useWritingReveal();

  return (
    <section
      className={`writing-page-section writing-page-hero${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="writing-page-title"
    >
      <div className="writing-page-inner writing-page-hero-inner">
        <WritingMarker number="01" label={t(lang, "writing.marker")} />
        <h1 id="writing-page-title">
          {[t(lang, "writing.hero.line1"), t(lang, "writing.hero.line2"), t(lang, "writing.hero.line3")]
            .filter(Boolean)
            .reduce((acc, line, i, arr) => {
              acc.push(line);
              if (i < arr.length - 1) acc.push(<br key={i} />);
              return acc;
            }, [])}
        </h1>
        <p className="writing-page-hero-body">{t(lang, "writing.hero.body")}</p>
      </div>
    </section>
  );
}

function WritingFeatured({ lang, featuredNote }) {
  const [ref, isVisible] = useWritingReveal();

  if (!featuredNote) {
    return null;
  }

  return (
    <section
      className={`writing-page-section writing-page-featured${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="writing-featured-title"
    >
      <div className="writing-page-inner writing-page-featured-inner">
        <WritingMarker number="02" label={t(lang, "writing.featured.marker")} />
        <a className="writing-featured-note" href={`/writing/${featuredNote.slug}?lang=${lang}`}>
          <span className="writing-featured-kicker">{t(lang, "writing.featured.kicker")}</span>
          <h2 id="writing-featured-title">{featuredNote.title}</h2>
          <p>{featuredNote.summary}</p>
          <span className="writing-featured-tags">{formatTags(featuredNote.tags)}</span>
          <span className="writing-featured-action">
            {t(lang, "writing.featured.action")} <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>
    </section>
  );
}

function WritingIndex({ lang, writingEntries }) {
  const [ref, isVisible] = useWritingReveal();

  return (
    <section
      className={`writing-page-section writing-page-index${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="writing-index-title"
    >
      <div className="writing-page-inner writing-page-index-inner">
        <div className="writing-page-section-head">
          <WritingMarker number="03" label={t(lang, "writing.index.marker")} />
          <h2 id="writing-index-title">{t(lang, "writing.index.heading")}</h2>
        </div>
        <div className="writing-index-list">
          {writingEntries.map((entry, index) => (
            <a
              className="writing-index-row"
              href={`/writing/${entry.slug}?lang=${lang}`}
              key={entry.slug}
              style={{ "--writing-page-row-index": index }}
            >
              <span className="writing-index-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="writing-index-main">
                <span className="writing-index-meta">
                  <span>{formatArticleDate(entry.date)}</span>
                  <span>{formatTags(entry.tags)}</span>
                  {entry.status && entry.status !== "published" ? <span>{entry.status}</span> : null}
                </span>
                <strong>{entry.title}</strong>
                <span className="writing-index-description">{entry.summary}</span>
              </span>
              <span className="writing-index-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WritingTopics({ lang }) {
  const [ref, isVisible] = useWritingReveal();

  return (
    <section
      className={`writing-page-section writing-page-topics${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="writing-topics-title"
    >
      <div className="writing-page-inner writing-page-topics-inner">
        <div className="writing-page-section-head">
          <WritingMarker number="04" label={t(lang, "writing.topics.marker")} />
          <h2 id="writing-topics-title">{t(lang, "writing.topics.heading")}</h2>
        </div>
        <div className="writing-topic-list">
          {topicKeys.map((keys, index) => (
            <div className="writing-topic-row" key={keys.title} style={{ "--writing-page-row-index": index }}>
              <strong>{t(lang, keys.title)}</strong>
              <p>{t(lang, keys.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WritingPage() {
  const lang = useLang();
  const writingEntries = getArticleIndex(lang);
  const featuredNote = writingEntries[0] || null;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className="writing-page">
      <WritingHero lang={lang} />
      <WritingFeatured lang={lang} featuredNote={featuredNote} />
      <WritingIndex lang={lang} writingEntries={writingEntries} />
      <WritingTopics lang={lang} />
      <MinimalFooter />
    </main>
  );
}
