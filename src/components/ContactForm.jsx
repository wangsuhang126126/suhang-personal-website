import { useState } from "react";
import { t } from "../i18n/siteCopy.js";

export default function ContactForm({ lang = "en" }) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
    company: "",
  });
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = formValues.name.trim();
    const email = formValues.email.trim();
    const topic = formValues.topic.trim();
    const message = formValues.message.trim();

    if (!name || !email || !topic || !message) {
      setStatus("error");
      setStatusMessage(t(lang, "form.required"));
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          topic,
          message,
          company: formValues.company,
          source: window.location.href,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || "Contact form submission failed.");
      }

      setFormValues({
        name: "",
        email: "",
        topic: "",
        message: "",
        company: "",
      });
      setStatus("success");
      setStatusMessage(t(lang, "form.success"));
    } catch {
      setStatus("error");
      setStatusMessage(t(lang, "form.error"));
    }
  };

  return (
    <>
      <form
        className="contact-form"
        aria-label="Contact form"
        onSubmit={handleSubmit}
      >
        <label className="contact-form-honeypot" aria-hidden="true">
          <span>Company</span>
          <input
            name="company"
            autoComplete="off"
            tabIndex="-1"
            type="text"
            value={formValues.company}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>{t(lang, "form.name")}</span>
          <input name="name" autoComplete="name" type="text" value={formValues.name} onChange={handleChange} required />
        </label>
        <label>
          <span>{t(lang, "form.email")}</span>
          <input name="email" autoComplete="email" type="email" value={formValues.email} onChange={handleChange} required />
        </label>
        <label>
          <span>{t(lang, "form.topic")}</span>
          <input name="topic" type="text" value={formValues.topic} onChange={handleChange} required />
        </label>
        <label>
          <span>{t(lang, "form.message")}</span>
          <textarea name="message" rows="5" value={formValues.message} onChange={handleChange} required />
        </label>
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? t(lang, "form.sending") : t(lang, "form.submit")}
        </button>
        {statusMessage ? (
          <p className={`contact-form-status is-${status}`} role={status === "error" ? "alert" : "status"}>
            {statusMessage}
          </p>
        ) : null}
      </form>
    </>
  );
}
