import { useEffect } from "react";
import MinimalFooter from "../components/MinimalFooter.jsx";
import { articleMdxComponents } from "../components/mdx/ArticleMdxComponents.jsx";
import { getArticle, getArticleVersions } from "../content/articles.js";
import { getLang, savePreferredLang, withLang } from "../i18n/siteCopy.js";

const languageLabels = {
  zh: "ZH",
  ja: "JP",
  en: "EN",
};

function getRequestedLanguage() {
  return getLang();
}

function formatDate(date) {
  if (!date) {
    return "DRAFT";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(`${date}T00:00:00`));
}

export default function ArticlePage({ slug }) {
  const requestedLanguage = getRequestedLanguage();
  const article = getArticle(slug, requestedLanguage);
  const versions = getArticleVersions(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug, requestedLanguage]);

  if (!article) {
    return (
      <main className="article-page">
        <section className="article-not-found" aria-labelledby="article-not-found-title">
          <div className="article-page-inner">
            <p className="article-page-marker">
              <span>404</span>
              <span>WRITING</span>
            </p>
            <h1 id="article-not-found-title">ARTICLE NOT FOUND.</h1>
            <p>The article you are looking for is not available yet.</p>
            <a href={withLang("/writing", requestedLanguage)}>BACK TO WRITING →</a>
          </div>
        </section>
        <MinimalFooter />
      </main>
    );
  }

  const ArticleContent = article.Component;

  return (
    <main className="article-page">
      <article className="article-detail" aria-labelledby="article-title">
        <div className="article-page-inner">
          <a className="article-back-link" href={withLang("/writing", requestedLanguage)}>
            ← WRITING
          </a>

          <header className="article-header">
            <p className="article-page-marker">
              <span>{formatDate(article.date)}</span>
              <span>{article.status || "published"}</span>
            </p>
            <h1 id="article-title">{article.title}</h1>
            <p className="article-summary">{article.summary}</p>
            <div className="article-meta-row">
              <span>{Array.isArray(article.tags) ? article.tags.join(" · ") : article.tags}</span>
              <nav className="article-language-switcher" aria-label="Article language versions">
                {Object.keys(languageLabels).map((language) => {
                  const isAvailable = Boolean(versions[language]);
                  const isActive = article.language === language;
                  return isAvailable ? (
                    <a
                      aria-current={isActive ? "page" : undefined}
                      href={`/writing/${article.slug}?lang=${language}`}
                      key={language}
                      onClick={() => savePreferredLang(language)}
                    >
                      {languageLabels[language]}
                    </a>
                  ) : (
                    <span aria-disabled="true" key={language}>
                      {languageLabels[language]}
                    </span>
                  );
                })}
              </nav>
            </div>
          </header>

          {article.language !== requestedLanguage && versions[requestedLanguage] ? null : article.language !== requestedLanguage ? (
            <p className="article-language-note">
              The requested language is not available yet, so this version is shown instead.
            </p>
          ) : null}

          <div className="article-prose">
            <ArticleContent components={articleMdxComponents} />
          </div>
        </div>
      </article>
      <MinimalFooter />
    </main>
  );
}
