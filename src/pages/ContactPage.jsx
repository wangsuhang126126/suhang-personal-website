import { useEffect } from "react";
import ContactForm from "../components/ContactForm.jsx";
import MinimalFooter from "../components/MinimalFooter.jsx";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className="contact-page">
      <section className="contact-page-section" aria-labelledby="contact-page-title">
        <div className="contact-page-inner">
          <div className="contact-page-copy">
            <p className="section-marker">
              <span>01</span>
              <span>CONTACT</span>
            </p>
            <h1 id="contact-page-title">
              LET&rsquo;S STAY
              <br />
              IN TOUCH.
            </h1>
            <p className="contact-page-body">
              For conversations around energy, technology, Japan, and practical collaboration.
            </p>
            <p className="contact-page-note">I read messages selectively and reply when there is a clear fit.</p>
          </div>

          <div className="contact-page-panel">
            <ContactForm />
          </div>
        </div>
      </section>
      <MinimalFooter />
    </main>
  );
}
