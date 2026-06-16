import { useLang } from "../hooks/useLang.js";
import { t, withLang } from "../i18n/siteCopy.js";

const footerNavKeys = [
  { key: "nav.writing", href: "/writing" },
  { key: "nav.journey", href: "/journey" },
  { key: "nav.lab", href: "/lab" },
  { key: "nav.about", href: "/about" },
  { key: "nav.contact", href: "/contact" },
];

export default function MinimalFooter() {
  const lang = useLang();

  return (
    <footer className="minimal-footer" aria-label="Site footer">
      <div className="minimal-footer-inner">
        <div className="minimal-footer-meta">
          <p>{t(lang, "footer.copyright")}</p>
          <p>{t(lang, "footer.location")}</p>
        </div>

        <nav className="minimal-footer-nav" aria-label="Footer navigation">
          {footerNavKeys.map((link) => (
            <a href={withLang(link.href, lang)} key={link.key}>
              {t(lang, link.key)}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
