import { useEffect, useRef, useState } from "react";

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
            technology, Japan, and practical collaboration.
          </p>
          <p className="contact-footer-note">
            If you have a relevant question, project idea,
            <br />
            media inquiry, or professional opportunity,
            <br />
            please send a short message below.
          </p>
          <p className="contact-footer-note">
            I read messages selectively and reply
            <br />
            when there is a clear fit.
          </p>
        </div>

        <div className="contact-footer-panel">
          {/* TODO: Connect this form to Formspree or Cloudflare Pages Functions before enabling submissions. */}
          <form
            className="contact-form"
            aria-label="Contact form"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label>
              <span>Name</span>
              <input name="name" autoComplete="name" type="text" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" autoComplete="email" type="email" />
            </label>
            <label>
              <span>Topic</span>
              <input name="topic" type="text" />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows="5" />
            </label>
            <button type="submit">Send Message</button>
          </form>

          <nav className="contact-footer-nav" aria-label="Footer navigation">
            {footerLinks.map((link, index) => (
              <a
                className="contact-link contact-link-nav"
                href={link.href}
                key={link.text}
                style={{ "--contact-link-index": index }}
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
