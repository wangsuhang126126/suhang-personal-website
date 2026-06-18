import MinimalFooter from "../components/MinimalFooter.jsx";
import { useLang } from "../hooks/useLang.js";
import { t, withLang } from "../i18n/siteCopy.js";

export default function NotFoundPage() {
  const lang = useLang();

  return (
    <main className="not-found-page" data-lang={lang}>
      <section className="not-found-section" aria-labelledby="not-found-title">
        <div className="not-found-inner">
          <p className="section-marker">
            <span>404</span>
            <span>{t(lang, "notFound.marker")}</span>
          </p>
          <h1 id="not-found-title">{t(lang, "notFound.title")}</h1>
          <p>{t(lang, "notFound.body")}</p>
          <a href={withLang("/", lang)}>{t(lang, "notFound.home")} →</a>
        </div>
      </section>
      <MinimalFooter />
    </main>
  );
}
