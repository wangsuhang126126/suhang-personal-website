import { useEffect, useRef, useState } from "react";
import ImageLightbox from "../components/ImageLightbox.jsx";
import MinimalFooter from "../components/MinimalFooter.jsx";
import { useLang } from "../hooks/useLang.js";
import { t } from "../i18n/siteCopy.js";

const pathRowKeys = [
  { number: "01", titleKey: "about.path.row1.title", textKey: "about.path.row1.text" },
  { number: "02", titleKey: "about.path.row2.title", textKey: "about.path.row2.text" },
  { number: "03", titleKey: "about.path.row3.title", textKey: "about.path.row3.text" },
  { number: "04", titleKey: "about.path.row4.title", textKey: "about.path.row4.text" },
];

const beyondRowKeys = [
  { titleKey: "about.beyond.row1.title", textKey: "about.beyond.row1.text" },
  { titleKey: "about.beyond.row2.title", textKey: "about.beyond.row2.text" },
  { titleKey: "about.beyond.row3.title", textKey: "about.beyond.row3.text" },
  { titleKey: "about.beyond.row4.title", textKey: "about.beyond.row4.text" },
];

const directionRowKeys = [
  { number: "01", titleKey: "about.direction.row1.title", textKey: "about.direction.row1.text" },
  { number: "02", titleKey: "about.direction.row2.title", textKey: "about.direction.row2.text" },
  { number: "03", titleKey: "about.direction.row3.title", textKey: "about.direction.row3.text" },
];

const personalDimensionKeys = ["work", "japan", "energy", "ai", "life", "curiosity"];

const aboutInfoColumns = [
  {
    titleKey: "about.info.languages.title",
    items: [
      "about.info.languages.chinese",
      "about.info.languages.japanese",
      "about.info.languages.english",
    ],
  },
  {
    titleKey: "about.info.focus.title",
    items: [
      "about.info.focus.storage",
      "about.info.focus.japan",
      "about.info.focus.transition",
      "about.info.focus.business",
      "about.info.focus.ai",
      "about.info.focus.projects",
    ],
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

function HeadingLines({ lang, line1Key, line2Key }) {
  const lines = [t(lang, line1Key), t(lang, line2Key)].filter(Boolean);
  return lines.reduce((acc, line, i, arr) => {
    acc.push(line);
    if (i < arr.length - 1) acc.push(<br key={i} />);
    return acc;
  }, []);
}

function EditorialRows({ rows, lang, numbered = true }) {
  return (
    <div className="about-editorial-rows">
      {rows.map((row, index) => (
        <div className="about-editorial-row" key={row.titleKey} style={{ "--about-row-index": index }}>
          {numbered ? <span className="about-row-number">{row.number}</span> : null}
          <strong>{t(lang, row.titleKey)}</strong>
          <p>{t(lang, row.textKey)}</p>
        </div>
      ))}
    </div>
  );
}

function AboutInfoModule({ lang }) {
  return (
    <div className="about-info-module" aria-label={t(lang, "about.info.aria")}>
      {aboutInfoColumns.map((column) => (
        <section className="about-info-card" key={column.titleKey} aria-label={t(lang, column.titleKey)}>
          <h2>{t(lang, column.titleKey)}</h2>
          <ul>
            {column.items.map((itemKey) => (
              <li key={itemKey}>{t(lang, itemKey)}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function AboutIntroduction({ lang }) {
  const [ref, isVisible] = useReveal();

  return (
    <section
      className={`about-section about-introduction${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="about-introduction-title"
    >
      <div className="about-introduction-inner">
        <div className="about-introduction-copy">
          <SectionMarker number="01" label={t(lang, "about.intro.marker")} />
          <h1 id="about-introduction-title">
            <HeadingLines lang={lang} line1Key="about.intro.h1.line1" line2Key="about.intro.h1.line2" />
          </h1>
          <div className="about-name-lockup" aria-label="Suhang Wang multilingual name">
            <p>Suhang Wang (Frank)</p>
            <p lang="zh-Hans">王苏杭</p>
            <p lang="ja">王 蘇杭（おう そこう）</p>
          </div>
          <div className="about-dimensions" aria-label="Personal dimensions">
            {personalDimensionKeys.map((key) => (
              <span key={key}>{t(lang, `about.intro.dim.${key}`)}</span>
            ))}
          </div>
          <div className="about-body-copy">
            <p>{t(lang, "about.intro.body.p1")}</p>
            <p>{t(lang, "about.intro.body.p2")}</p>
          </div>
          <AboutInfoModule lang={lang} />
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

function AboutPathSection({ lang }) {
  const [ref, isVisible] = useReveal();

  return (
    <section
      className={`about-section about-path${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="about-path-title"
    >
      <div className="about-section-inner about-path-inner">
        <div className="about-section-copy">
          <SectionMarker number="02" label={t(lang, "about.path.marker")} />
          <h2 id="about-path-title">
            <HeadingLines lang={lang} line1Key="about.path.h2.line1" line2Key="about.path.h2.line2" />
          </h2>
        </div>
        <div className="about-section-detail">
          <div className="about-body-copy">
            <p>{t(lang, "about.path.body.p1")}</p>
            <p>{t(lang, "about.path.body.p2")}</p>
            <p>{t(lang, "about.path.body.p3")}</p>
          </div>
          <EditorialRows rows={pathRowKeys} lang={lang} />
        </div>
      </div>
    </section>
  );
}

function BeyondWorkSection({ lang }) {
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
          <SectionMarker number="03" label={t(lang, "about.beyond.marker")} />
          <h2 id="about-beyond-title">
            <HeadingLines lang={lang} line1Key="about.beyond.h2.line1" line2Key="about.beyond.h2.line2" />
          </h2>
          <div className="about-body-copy">
            <p>{t(lang, "about.beyond.body.p1")}</p>
            <p>{t(lang, "about.beyond.body.p2")}</p>
            <p>{t(lang, "about.beyond.body.p3")}</p>
            <p>{t(lang, "about.beyond.body.p4")}</p>
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
        <EditorialRows rows={beyondRowKeys} lang={lang} numbered={false} />
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

function AboutDirectionSection({ lang }) {
  const [ref, isVisible] = useReveal();

  return (
    <section
      className={`about-section about-direction${isVisible ? " is-visible" : ""}`}
      ref={ref}
      aria-labelledby="about-direction-title"
    >
      <div className="about-section-inner about-direction-inner">
        <div className="about-section-copy">
          <SectionMarker number="04" label={t(lang, "about.direction.marker")} />
          <h2 id="about-direction-title">
            <HeadingLines lang={lang} line1Key="about.direction.h2.line1" line2Key="about.direction.h2.line2" />
          </h2>
        </div>
        <div className="about-section-detail">
          <div className="about-body-copy">
            <p>{t(lang, "about.direction.body.p1")}</p>
            <p>{t(lang, "about.direction.body.p2")}</p>
            <p>{t(lang, "about.direction.body.p3")}</p>
            <p>{t(lang, "about.direction.body.p4")}</p>
          </div>
          <EditorialRows rows={directionRowKeys} lang={lang} />
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const lang = useLang();

  return (
    <main className="about-page">
      <AboutIntroduction lang={lang} />
      <AboutPathSection lang={lang} />
      <BeyondWorkSection lang={lang} />
      <AboutDirectionSection lang={lang} />
      <MinimalFooter />
    </main>
  );
}
