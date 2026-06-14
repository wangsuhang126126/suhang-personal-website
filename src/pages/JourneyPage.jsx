import { useEffect, useRef, useState } from "react";
import MinimalFooter from "../components/MinimalFooter.jsx";

const journeySections = [
  {
    id: "market",
    number: "02",
    label: "MARKET",
    title: (
      <>
        LEARNING HOW
        <br />
        BUSINESS MOVES
        <br />
        ACROSS BORDERS.
      </>
    ),
    body: (
      <>
        <p>
          Early in my career, I worked across international
          <br />
          business environments where products, customers,
          <br />
          and expectations did not always move in the same direction.
        </p>
        <p>
          That period taught me that market development is not only
          <br />
          about selling. It is about understanding context:
          <br />
          language, timing, incentives, trust, and the gap between
          <br />
          what a company offers and what a customer can actually use.
        </p>
      </>
    ),
    rows: [
      {
        number: "01",
        title: "CONTEXT",
        text: (
          <>
            Markets are shaped by more than demand.
            <br />
            They are shaped by timing, trust, and local habits.
          </>
        ),
      },
      {
        number: "02",
        title: "TRANSLATION",
        text: (
          <>
            Good business development often means translating
            <br />
            between product logic and customer reality.
          </>
        ),
      },
      {
        number: "03",
        title: "EXECUTION",
        text: (
          <>
            Strategy only matters when it becomes something
            <br />
            customers, partners, and teams can act on.
          </>
        ),
      },
    ],
  },
  {
    id: "energy",
    number: "03",
    label: "ENERGY",
    variant: "energy",
    title: (
      <>
        FROM SOLAR MODULES
        <br />
        TO STORAGE SYSTEMS.
      </>
    ),
    body: (
      <>
        <p>Renewable energy gave my work a stronger sense of direction.</p>
        <p>
          In solar, I learned how hardware, channels,
          <br />
          EPCs, developers, pricing, supply chains,
          <br />
          and policy all interact in the real market.
        </p>
        <p>
          But the energy transition is moving beyond generation alone.
          <br />
          Storage, demand response, VPPs, and home energy management
          <br />
          are becoming part of a wider system.
        </p>
        <p>That shift is where my current focus is heading.</p>
      </>
    ),
    rows: [
      {
        number: "01",
        title: "SOLAR",
        text: (
          <>
            A foundation in renewable energy products,
            <br />
            channels, and commercial execution.
          </>
        ),
      },
      {
        number: "02",
        title: "JAPAN",
        text: (
          <>
            A market where policy, quality expectations,
            <br />
            partners, and trust strongly shape adoption.
          </>
        ),
      },
      {
        number: "03",
        title: "STORAGE",
        text: (
          <>
            A move from selling components toward enabling
            <br />
            more flexible energy use.
          </>
        ),
      },
      {
        number: "04",
        title: "SYSTEMS",
        text: (
          <>
            The future is less about isolated products
            <br />
            and more about connected energy behavior.
          </>
        ),
      },
    ],
  },
  {
    id: "technology",
    number: "04",
    label: "TECHNOLOGY",
    variant: "technology",
    title: (
      <>
        TOOLS CHANGE
        <br />
        HOW WORK GETS DONE.
      </>
    ),
    body: (
      <>
        <p>Working with enterprise technology and AI tools changed how I think about work.</p>
        <p>
          It made clear that software is only valuable when it fits real workflows,
          <br />
          real users, and real organizational constraints.
        </p>
        <p>
          It also changed my own working method:
          <br />
          using AI for research, writing, analysis, product thinking,
          <br />
          and small experiments that would have been harder to build before.
        </p>
      </>
    ),
    rows: [
      {
        number: "01",
        title: "WORKFLOW",
        text: "Tools matter when they improve how people actually work.",
      },
      {
        number: "02",
        title: "ADOPTION",
        text: (
          <>
            A product is not complete until users can understand it,
            <br />
            trust it, and make it part of their routine.
          </>
        ),
      },
      {
        number: "03",
        title: "AI",
        text: (
          <>
            AI is most useful when it sharpens judgment
            <br />
            and accelerates useful work.
          </>
        ),
      },
      {
        number: "04",
        title: "BUILDING",
        text: (
          <>
            Small experiments help turn abstract ideas
            <br />
            into something visible and testable.
          </>
        ),
      },
    ],
  },
  {
    id: "next-chapter",
    number: "05",
    label: "NEXT CHAPTER",
    variant: "energy",
    title: (
      <>
        RESIDENTIAL ENERGY
        <br />
        IN JAPAN.
      </>
    ),
    body: (
      <>
        <p>
          The next chapter is focused on residential energy storage
          <br />
          and the systems around it.
        </p>
        <p>
          For Japan, the opportunity is not only to install more batteries.
          <br />
          It is to connect households, solar generation, storage,
          <br />
          demand response, aggregators, utilities, and policy
          <br />
          into a more flexible energy system.
        </p>
        <p>
          That requires more than product knowledge.
          <br />
          It requires market understanding, partner development,
          <br />
          customer education, and long-term execution.
        </p>
        <p>This is the work I want to keep building toward.</p>
      </>
    ),
    rows: [
      {
        number: "01",
        title: "HOUSEHOLDS",
        text: (
          <>
            Homes are becoming more active participants
            <br />
            in the energy system.
          </>
        ),
      },
      {
        number: "02",
        title: "PARTNERS",
        text: (
          <>
            Residential energy adoption depends on installers,
            <br />
            channels, aggregators, utilities, and local trust.
          </>
        ),
      },
      {
        number: "03",
        title: "LONG TERM",
        text: (
          <>
            The most meaningful work compounds through depth,
            <br />
            execution, and patience.
          </>
        ),
      },
    ],
  },
];

const journeyProgressions = [
  {
    label: "PLACE",
    path: "China → Japan → Global",
  },
  {
    label: "ENERGY",
    path: "Solar → Storage → Systems",
  },
  {
    label: "WORK",
    path: "Business → Technology → AI",
  },
];

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

function JourneyHero() {
  const [ref, isVisible] = useJourneyReveal();

  return (
    <section className={`journey-page-hero${isVisible ? " is-visible" : ""}`} ref={ref} aria-labelledby="journey-title">
      <div className="journey-page-hero-inner">
        <JourneyMarker number="01" label="JOURNEY" />
        <h1 id="journey-title">
          A PATH
          <br />
          TOWARD
          <br />
          ENERGY SYSTEMS.
        </h1>
        <div className="journey-page-hero-body">
          <p>
            My work has moved across markets,
            <br />
            technologies, and business models.
          </p>
          <p>
            The common thread has become clearer over time:
            <br />
            understanding real customer needs,
            <br />
            building trust in complex markets,
            <br />
            and turning technical products into practical adoption.
          </p>
        </div>
        <div className="journey-progress-map" aria-label="Journey progression">
          {journeyProgressions.map((item) => (
            <div className="journey-progress-row" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.path}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneyRows({ rows }) {
  return (
    <div className="journey-row-list">
      {rows.map((row, index) => (
        <div className="journey-row" key={row.title} style={{ "--journey-row-index": index }}>
          <span className="journey-row-number">{row.number}</span>
          <div className="journey-row-main">
            <strong>{row.title}</strong>
            <p>{row.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function JourneySection({ section }) {
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
          <JourneyMarker number={section.number} label={section.label} />
          <h2 id={`journey-${section.id}-title`}>{section.title}</h2>
          <div className="journey-page-section-body">{section.body}</div>
        </div>
        <JourneyRows rows={section.rows} />
      </div>
    </section>
  );
}

export default function JourneyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className="journey-page">
      <JourneyHero />
      {journeySections.map((section) => (
        <JourneySection key={section.id} section={section} />
      ))}
      <MinimalFooter />
    </main>
  );
}
