import MinimalFooter from "../components/MinimalFooter.jsx";
import { useLang } from "../hooks/useLang.js";
import { t } from "../i18n/siteCopy.js";

const labProjects = [
  {
    key: "battery",
    statusKey: "lab.status.inProgress",
    statusTone: "in-progress",
  },
  {
    key: "family",
    statusKey: "lab.status.built",
    statusTone: "built",
  },
];

export default function LabPage() {
  const lang = useLang();
  const headingLines = [t(lang, "lab.hero.line1"), t(lang, "lab.hero.line2"), t(lang, "lab.hero.line3")].filter(Boolean);

  return (
    <main className="lab-page" data-lang={lang}>
      <section className="lab-placeholder-section" aria-labelledby="lab-title">
        <div className="lab-placeholder-inner">
          <p className="lab-page-marker">
            <span>01</span>
            <span>{t(lang, "lab.marker")}</span>
          </p>

          <h1 id="lab-title">
            {headingLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < headingLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>

          <div className="lab-placeholder-copy">
            <p>{t(lang, "lab.body.p1")}</p>
            <p>{t(lang, "lab.body.p2")}</p>
          </div>

          <div className="lab-project-grid" aria-label={t(lang, "lab.projects.aria")}>
            {labProjects.map((project, index) => (
              <article className="lab-project-card" key={project.key}>
                <div className="lab-project-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className={`lab-project-status is-${project.statusTone}`}>{t(lang, project.statusKey)}</span>
                </div>

                <h2>{t(lang, `lab.project.${project.key}.title`)}</h2>
                <p>{t(lang, `lab.project.${project.key}.description`)}</p>

                <div className="lab-project-footer">
                  <div
                    className="lab-project-tags"
                    aria-label={`${t(lang, `lab.project.${project.key}.title`)} ${t(lang, "lab.project.categories")}`}
                  >
                    <span>{t(lang, `lab.project.${project.key}.category1`)}</span>
                    <span>{t(lang, `lab.project.${project.key}.category2`)}</span>
                  </div>
                  <span className="lab-project-action" aria-disabled="true">
                    {t(lang, `lab.project.${project.key}.action`)} →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MinimalFooter />
    </main>
  );
}
