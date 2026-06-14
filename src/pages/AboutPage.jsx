import { useEffect, useRef, useState } from "react";
import ImageLightbox from "../components/ImageLightbox.jsx";
import MinimalFooter from "../components/MinimalFooter.jsx";

const pathRows = [
  {
    number: "01",
    title: "MARKETS",
    text: (
      <>
        Understanding how products meet
        <br />
        real customer needs.
      </>
    ),
  },
  {
    number: "02",
    title: "TECHNOLOGY",
    text: (
      <>
        Translating complex tools
        <br />
        into useful outcomes.
      </>
    ),
  },
  {
    number: "03",
    title: "ENERGY",
    text: (
      <>
        Working on problems
        <br />
        with long-term significance.
      </>
    ),
  },
  {
    number: "04",
    title: "BUILDING",
    text: (
      <>
        Turning ideas into something
        <br />
        people can actually use.
      </>
    ),
  },
];

const beyondRows = [
  {
    title: "LEARNING",
    text: (
      <>
        Languages, books,
        <br />
        and the habit of starting again.
      </>
    ),
  },
  {
    title: "BUILDING",
    text: (
      <>
        Websites, small tools,
        <br />
        and experiments with AI.
      </>
    ),
  },
  {
    title: "PLACES",
    text: (
      <>
        Travel, cities,
        <br />
        and the texture of everyday life.
      </>
    ),
  },
  {
    title: "LIFE",
    text: (
      <>
        Music, photography,
        <br />
        and time with the people close to me.
      </>
    ),
  },
];

const directionRows = [
  {
    number: "01",
    title: "DEPTH",
    text: (
      <>
        Become a stronger practitioner,
        <br />
        not simply a more experienced salesperson.
      </>
    ),
  },
  {
    number: "02",
    title: "TOOLS",
    text: (
      <>
        Use AI to think, research,
        <br />
        communicate, and build more effectively.
      </>
    ),
  },
  {
    number: "03",
    title: "BALANCE",
    text: (
      <>
        Make room for work that matters
        <br />
        and a life that remains fully lived.
      </>
    ),
  },
];

const beyondImages = [
  {
    className: "about-life-photo",
    src: "/images/about/about-life-parrot.jpg",
    alt: "Suhang Wang standing by the waterfront with a parrot resting on his shoulder.",
    label: "Open larger view of Suhang Wang with a parrot by the waterfront",
  },
  {
    className: "about-travel-photo",
    src: "/images/about/about-travel-singapore.jpg",
    alt: "Suhang Wang standing by the waterfront with the Singapore skyline in the background.",
    label: "Open larger view of Suhang Wang by the Singapore skyline",
  },
];

function useReveal() {
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
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function SectionMarker({ number, label }) {
  return (
    <p className="about-section-marker">
      <span>{number}</span>
      <span>{label}</span>
    </p>
  );
}

function EditorialRows({ rows, numbered = true }) {
  return (
    <div className="about-editorial-rows">
      {rows.map((row, index) => (
        <div className="about-editorial-row" key={row.title} style={{ "--about-row-index": index }}>
          {numbered ? <span className="about-row-number">{row.number}</span> : null}
          <strong>{row.title}</strong>
          <p>{row.text}</p>
        </div>
      ))}
    </div>
  );
}

function AboutIntroduction() {
  const [ref, isVisible] = useReveal();

  return (
    <section
      className={`about-section about-introduction${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="about-introduction-title"
    >
      <div className="about-introduction-inner">
        <div className="about-introduction-copy">
          <SectionMarker number="01" label="ABOUT" />
          <h1 id="about-introduction-title">
            A LIFE
            <br />
            IN PROGRESS.
          </h1>
          <div className="about-name-lockup" aria-label="Suhang Wang multilingual name">
            <p>Suhang Wang (Frank)</p>
            <p lang="zh-Hans">王苏杭</p>
            <p lang="ja">王 蘇杭（おう そこう）</p>
          </div>
          <div className="about-body-copy">
            <p>
              Over the years, I have moved across places,
              <br />
              industries, and different ways of thinking.
            </p>
            <p>
              The path has not always been predictable,
              <br />
              but it has gradually clarified what matters to me:
              <br />
              useful work, thoughtful collaboration,
              <br />
              and the discipline to keep learning.
            </p>
          </div>
        </div>
        <figure className="about-portrait">
          <img
            src="/images/about/about-portrait-park.jpg"
            alt="Suhang Wang seated on a park bench in a natural outdoor setting."
          />
        </figure>
      </div>
    </section>
  );
}

function AboutPathSection() {
  const [ref, isVisible] = useReveal();

  return (
    <section
      className={`about-section about-path${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="about-path-title"
    >
      <div className="about-section-inner about-path-inner">
        <div className="about-section-copy">
          <SectionMarker number="02" label="PATH" />
          <h2 id="about-path-title">
            FINDING
            <br />
            THE THREAD.
          </h2>
        </div>
        <div className="about-section-detail">
          <div className="about-body-copy">
            <p>
              My path has included international business,
              <br />
              consumer products, internet platforms,
              <br />
              enterprise technology, solar energy,
              <br />
              and energy storage.
            </p>
            <p>
              Some transitions opened new possibilities.
              <br />
              Others sharpened my understanding of where
              <br />
              I can contribute best.
            </p>
            <p>
              Over time, the thread became clearer:
              <br />
              I am most engaged when the work is connected
              <br />
              to a real market, a real customer need,
              <br />
              and a problem worth solving for the long term.
            </p>
          </div>
          <EditorialRows rows={pathRows} />
        </div>
      </div>
    </section>
  );
}

function BeyondWorkSection() {
  const [ref, isVisible] = useReveal();
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const imageButtonRefs = useRef([]);

  const closeLightbox = () => {
    const button = imageButtonRefs.current[activeImageIndex];
    setActiveImageIndex(null);
    window.requestAnimationFrame(() => button?.focus());
  };

  return (
    <section
      className={`about-section about-beyond${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="about-beyond-title"
    >
      <div className="about-beyond-inner">
        <div className="about-beyond-copy">
          <SectionMarker number="03" label="BEYOND WORK" />
          <h2 id="about-beyond-title">
            WHAT KEEPS
            <br />
            ME CURIOUS.
          </h2>
          <div className="about-body-copy">
            <p>
              Outside work, I am drawn to learning
              <br />
              in many different forms.
            </p>
            <p>
              I enjoy languages, books, music, photography,
              <br />
              travel, and the small digital projects
              <br />
              that AI now makes possible.
            </p>
            <p>
              I like the feeling of becoming a beginner again:
              <br />
              testing a new tool, learning a new phrase,
              <br />
              noticing a city more carefully,
              <br />
              or making something that did not exist
              <br />
              the day before.
            </p>
            <p>
              Not every interest needs to become a project.
              <br />
              Some simply make life richer
              <br />
              and keep work in perspective.
            </p>
          </div>
        </div>
        <div className="about-beyond-images">
          {beyondImages.map((image, index) => (
            <figure className={image.className} key={image.src}>
              <button
                className="about-image-button"
                type="button"
                aria-label={image.label}
                onClick={() => setActiveImageIndex(index)}
                ref={(node) => {
                  imageButtonRefs.current[index] = node;
                }}
              >
                <img src={image.src} alt={image.alt} />
              </button>
            </figure>
          ))}
        </div>
        <EditorialRows rows={beyondRows} numbered={false} />
      </div>
      {activeImageIndex !== null ? (
        <ImageLightbox
          images={beyondImages}
          activeIndex={activeImageIndex}
          onClose={closeLightbox}
          onSelect={setActiveImageIndex}
        />
      ) : null}
    </section>
  );
}

function AboutDirectionSection() {
  const [ref, isVisible] = useReveal();

  return (
    <section
      className={`about-section about-direction${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="about-direction-title"
    >
      <div className="about-section-inner about-direction-inner">
        <div className="about-section-copy">
          <SectionMarker number="04" label="DIRECTION" />
          <h2 id="about-direction-title">
            BUILDING
            <br />
            WITH INTENT.
          </h2>
        </div>
        <div className="about-section-detail">
          <div className="about-body-copy">
            <p>
              I am less interested in collecting titles
              <br />
              than in developing depth.
            </p>
            <p>
              In energy, I want to understand the market,
              <br />
              the technology, and the systems around it
              <br />
              well enough to contribute with judgment.
            </p>
            <p>
              In AI, I want to use tools practically:
              <br />
              for research, decision-making,
              <br />
              communication, and creation.
            </p>
            <p>
              And beyond work, I want to leave enough room
              <br />
              for curiosity, the people close to me,
              <br />
              and the experiences that make a life feel whole.
            </p>
          </div>
          <EditorialRows rows={directionRows} />
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutIntroduction />
      <AboutPathSection />
      <BeyondWorkSection />
      <AboutDirectionSection />
      <MinimalFooter />
    </main>
  );
}
