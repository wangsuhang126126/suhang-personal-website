import { useEffect, useRef, useState } from "react";
import MinimalFooter from "../components/MinimalFooter.jsx";

const featuredNote = {
  href: "/writing/japan-residential-energy-transition",
  title: (
    <>
      Japan&rsquo;s Residential Energy Transition:
      <br />
      What Comes After Solar?
    </>
  ),
  body: (
    <>
      A closer look at how storage, VPPs,
      <br />
      and distributed energy are reshaping
      <br />
      the residential energy market in Japan.
    </>
  ),
  tags: "ENERGY · JAPAN · STORAGE",
};

const writingEntries = [
  {
    number: "01",
    title: (
      <>
        Japan&rsquo;s Residential Energy Transition:
        <br />
        What Comes After Solar?
      </>
    ),
    tags: "ENERGY · JAPAN · STORAGE",
    href: "/writing/japan-residential-energy-transition",
  },
  {
    number: "02",
    title: "AI as a Tool for Better Decisions",
    tags: "AI · WORKFLOW · PRODUCTIVITY",
    href: "/writing/ai-better-decisions",
  },
  {
    number: "03",
    title: "Notes from Japan",
    tags: "LIFE · OBSERVATION · CULTURE",
    href: "/writing/notes-from-japan",
  },
  {
    number: "04",
    title: "Understanding VPPs in Japan",
    tags: "ENERGY · VPP · POLICY",
    href: "/writing/understanding-vpps-japan",
  },
  {
    number: "05",
    title: "From Solar Sales to Energy Systems",
    tags: "CAREER · ENERGY · MARKET",
    href: "/writing/solar-sales-to-energy-systems",
  },
  {
    number: "06",
    title: "Building Small Things with AI",
    tags: "AI · CREATION · TOOLS",
    href: "/writing/building-small-things-with-ai",
  },
];

const topicRows = [
  {
    title: "ENERGY SYSTEMS",
    text: (
      <>
        Residential storage, VPPs, distributed energy,
        <br />
        and the Japanese market.
      </>
    ),
  },
  {
    title: "AI & TOOLS",
    text: (
      <>
        How AI changes research, communication,
        <br />
        decision-making, and creation.
      </>
    ),
  },
  {
    title: "JAPAN NOTES",
    text: (
      <>
        Observations from life, work, language,
        <br />
        and culture in Japan.
      </>
    ),
  },
  {
    title: "BUILDING",
    text: (
      <>
        Small digital projects, personal systems,
        <br />
        and practical experiments.
      </>
    ),
  },
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

function WritingHero() {
  const [ref, isVisible] = useWritingReveal();

  return (
    <section
      className={`writing-page-section writing-page-hero${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="writing-page-title"
    >
      <div className="writing-page-inner writing-page-hero-inner">
        <WritingMarker number="01" label="WRITING" />
        <h1 id="writing-page-title">
          FIELD NOTES
          <br />
          FOR A WORLD
          <br />
          IN TRANSITION.
        </h1>
        <p className="writing-page-hero-body">
          Notes on energy, technology, Japan,
          <br />
          and the systems reshaping how we live and work.
        </p>
      </div>
    </section>
  );
}

function WritingFeatured() {
  const [ref, isVisible] = useWritingReveal();

  return (
    <section
      className={`writing-page-section writing-page-featured${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="writing-featured-title"
    >
      <div className="writing-page-inner writing-page-featured-inner">
        <WritingMarker number="02" label="FEATURED" />
        <a className="writing-featured-note" href={featuredNote.href}>
          <span className="writing-featured-kicker">FEATURED NOTE</span>
          <h2 id="writing-featured-title">{featuredNote.title}</h2>
          <p>{featuredNote.body}</p>
          <span className="writing-featured-tags">{featuredNote.tags}</span>
          <span className="writing-featured-action">
            READ NOTE <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>
    </section>
  );
}

function WritingIndex() {
  const [ref, isVisible] = useWritingReveal();

  return (
    <section
      className={`writing-page-section writing-page-index${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="writing-index-title"
    >
      <div className="writing-page-inner writing-page-index-inner">
        <div className="writing-page-section-head">
          <WritingMarker number="03" label="INDEX" />
          <h2 id="writing-index-title">INDEX</h2>
        </div>
        <div className="writing-index-list">
          {writingEntries.map((entry, index) => (
            <a
              className="writing-index-row"
              href={entry.href}
              key={entry.number}
              style={{ "--writing-page-row-index": index }}
            >
              <span className="writing-index-number">{entry.number}</span>
              <span className="writing-index-main">
                <strong>{entry.title}</strong>
                <span>{entry.tags}</span>
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

function WritingTopics() {
  const [ref, isVisible] = useWritingReveal();

  return (
    <section
      className={`writing-page-section writing-page-topics${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="writing-topics-title"
    >
      <div className="writing-page-inner writing-page-topics-inner">
        <div className="writing-page-section-head">
          <WritingMarker number="04" label="TOPICS" />
          <h2 id="writing-topics-title">TOPICS</h2>
        </div>
        <div className="writing-topic-list">
          {topicRows.map((topic, index) => (
            <div className="writing-topic-row" key={topic.title} style={{ "--writing-page-row-index": index }}>
              <strong>{topic.title}</strong>
              <p>{topic.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WritingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className="writing-page">
      <WritingHero />
      <WritingFeatured />
      <WritingIndex />
      <WritingTopics />
      <MinimalFooter />
    </main>
  );
}
