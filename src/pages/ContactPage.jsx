import { useEffect } from "react";
import ContactForm from "../components/ContactForm.jsx";
import MinimalFooter from "../components/MinimalFooter.jsx";
import { useLang } from "../hooks/useLang.js";
import { t } from "../i18n/siteCopy.js";

export default function ContactPage() {
  const lang = useLang();

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
              <span>{t(lang, "contact.marker")}</span>
            </p>
            <h1 id="contact-page-title">
              {t(lang, "contact.heading.line1")}
              <br />
              {t(lang, "contact.heading.line2")}
            </h1>
            <p className="contact-page-body">{t(lang, "contact.body")}</p>
            <p className="contact-page-note">{t(lang, "contact.note")}</p>
          </div>

          <div className="contact-page-panel">
            <ContactForm lang={lang} />
          </div>
        </div>
      </section>
      <MinimalFooter />
    </main>
  );
}
