import { useEffect, useRef, useState } from "react";
import FeaturedNote from "./FeaturedNote.jsx";
import WritingPreviewRow from "./WritingPreviewRow.jsx";
import { useLang } from "../hooks/useLang.js";
import { withLang } from "../i18n/siteCopy.js";

const notes = [
  {
    number: "01",
    title: "THE NEXT PHASE OF RESIDENTIAL ENERGY",
  },
  {
    number: "02",
    title: "AI AS A TOOL FOR BETTER DECISIONS",
  },
  {
    number: "03",
    title: "NOTES FROM JAPAN",
  },
];

export default function WritingPreviewSection() {
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
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`writing-preview-section${isVisible ? " is-visible" : ""}`}
      id="writing"
      ref={sectionRef}
      aria-labelledby="writing-preview-title"
    >
      <div className="writing-preview-inner">
        <div className="writing-preview-copy">
          <p className="section-marker">
            <span>04</span>
            <span>WRITING</span>
          </p>
          <h2 id="writing-preview-title">
            FIELD NOTES
            <br />
            FROM A WORLD
            <br />
            IN TRANSITION.
          </h2>
          <p className="writing-preview-body">
            Notes on energy, technology, Japan,
            <br />
            and the systems shaping the future.
          </p>
        </div>

        <div className="writing-preview-index" aria-label="Selected writing previews">
          <div className="writing-divider writing-divider-top" aria-hidden="true" />
          <FeaturedNote lang={lang} />
          <div className="writing-divider" aria-hidden="true" />
          <div className="writing-preview-rows">
            {notes.map((note, index) => (
              <WritingPreviewRow key={note.number} note={note} index={index} lang={lang} />
            ))}
          </div>
          <a className="writing-all-link" href={withLang("/writing", lang)}>
            VIEW ALL WRITING <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
