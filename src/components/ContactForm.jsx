import { t } from "../i18n/siteCopy.js";

export default function ContactForm({ lang = "en" }) {
  return (
    <>
      {/* TODO: Connect this form to Formspree or Cloudflare Pages Functions before enabling submissions. */}
      <form
        className="contact-form"
        aria-label="Contact form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label>
          <span>{t(lang, "form.name")}</span>
          <input name="name" autoComplete="name" type="text" />
        </label>
        <label>
          <span>{t(lang, "form.email")}</span>
          <input name="email" autoComplete="email" type="email" />
        </label>
        <label>
          <span>{t(lang, "form.topic")}</span>
          <input name="topic" type="text" />
        </label>
        <label>
          <span>{t(lang, "form.message")}</span>
          <textarea name="message" rows="5" />
        </label>
        <button type="submit">{t(lang, "form.submit")}</button>
      </form>
    </>
  );
}
