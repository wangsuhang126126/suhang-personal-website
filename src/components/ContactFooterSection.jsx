import { useEffect, useRef, useState } from "react";
import ContactForm from "./ContactForm.jsx";
import { useLang } from "../hooks/useLang.js";
import { t, withLang } from "../i18n/siteCopy.js";

const footerLinks = [
  {
    key: "nav.writing",
    href: "/writing",
  },
  {
    key: "nav.journey",
    href: "/journey",
  },
  {
    key: "nav.about",
    href: "/about",
  },
];

export default function ContactFooterSection() {
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
    <footer
      className={`contact-footer-section${isVisible ? " is-visible" : ""}`}
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-footer-title"
    >
      <div className="contact-footer-inner">
        <div className="contact-footer-copy">
          <p className="section-marker">
            <span>05</span>
            <span>{t(lang, "home.contact.marker")}</span>
          </p>
          <h2 id="contact-footer-title">
            {t(lang, "home.contact.heading.line1")}
            {t(lang, "home.contact.heading.line2") ? (
              <>
                <br />
                {t(lang, "home.contact.heading.line2")}
              </>
            ) : null}
          </h2>
          <p className="contact-footer-body">{t(lang, "home.contact.body")}</p>
          <p className="contact-footer-note">{t(lang, "home.contact.note1")}</p>
          <p className="contact-footer-note">{t(lang, "home.contact.note2")}</p>
        </div>

        <div className="contact-footer-panel">
          <ContactForm lang={lang} />

          <nav className="contact-footer-nav" aria-label="Footer navigation">
            {footerLinks.map((link, index) => (
              <a
                className="contact-link contact-link-nav"
                href={withLang(link.href, lang)}
                key={link.key}
                style={{ "--contact-link-index": index }}
              >
                <strong>
                  {t(lang, link.key)} <span aria-hidden="true">→</span>
                </strong>
              </a>
            ))}
          </nav>
        </div>

        <div className="contact-footer-bottom">
          <div className="contact-footer-divider" aria-hidden="true" />
          <div className="contact-footer-meta">
            <p>{t(lang, "footer.copyright")}</p>
            <p>{t(lang, "footer.location")}</p>
            <p>
              {t(lang, "home.contact.meta.line1")}
              <span> {t(lang, "home.contact.meta.line2")}</span>
              <span> {t(lang, "home.contact.meta.line3")}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
