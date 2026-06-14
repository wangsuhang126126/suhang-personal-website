import { useEffect, useRef, useState } from "react";

const contactLinks = [
  {
    label: "EMAIL",
    text: "wangsuhang126126@gmail.com",
    href: "mailto:wangsuhang126126@gmail.com",
  },
  {
    label: "LINKEDIN",
    text: "linkedin.com/in/wangsuhang",
    href: "https://www.linkedin.com/in/wangsuhang",
  },
];

const footerLinks = [
  {
    text: "WRITING",
    href: "/writing",
  },
  {
    text: "JOURNEY",
    href: "/journey",
  },
  {
    text: "ABOUT",
    href: "/about",
  },
];

export default function ContactFooterSection() {
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
            <span>CONTACT</span>
          </p>
          <h2 id="contact-footer-title">
            LET&rsquo;S STAY
            <br />
            IN TOUCH.
          </h2>
          <p className="contact-footer-body">
            For conversations around energy,
            <br />
            technology, Japan, and the wider world.
          </p>
          <p className="contact-footer-note">
            Work matters.
            <br />
            So do curiosity, place, and the life around it.
          </p>
        </div>

        <div className="contact-footer-links" aria-label="Contact and site links">
          {contactLinks.map((link, index) => (
            <a
              className="contact-link contact-link-primary"
              href={link.href}
              key={link.label}
              style={{ "--contact-link-index": index }}
              {...(link.label === "LINKEDIN" ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span>{link.label}</span>
              <strong>{link.text}</strong>
            </a>
          ))}

          <nav className="contact-footer-nav" aria-label="Footer navigation">
            {footerLinks.map((link, index) => (
              <a
                className="contact-link contact-link-nav"
                href={link.href}
                key={link.text}
                style={{ "--contact-link-index": index + contactLinks.length }}
              >
                <strong>
                  {link.text} <span aria-hidden="true">→</span>
                </strong>
              </a>
            ))}
          </nav>
        </div>

        <div className="contact-footer-bottom">
          <div className="contact-footer-divider" aria-hidden="true" />
          <div className="contact-footer-meta">
            <p>© 2026 Suhang Wang</p>
            <p>TOKYO · JAPAN</p>
            <p>
              China-born.
              <span> Japan-based.</span>
              <span> Looking outward.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
