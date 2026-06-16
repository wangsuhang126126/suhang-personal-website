import { useEffect, useState } from "react";
import NavigationBrand from "./NavigationBrand.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { useLang } from "../hooks/useLang.js";
import { t, withLang } from "../i18n/siteCopy.js";

const navKeys = [
  { key: "nav.writing", href: "/writing" },
  { key: "nav.journey", href: "/journey" },
  { key: "nav.lab", href: "/lab" },
  { key: "nav.about", href: "/about" },
  { key: "nav.contact", href: "/contact" },
];

const langButtons = [
  { label: "EN", code: "en" },
  { label: "JP", code: "ja" },
  { label: "ZH", code: "zh" },
];

function langHref(code) {
  const path = window.location.pathname;
  return `${path}?lang=${code}`;
}

export default function Navigation({ theme, onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [brandCollapsed, setBrandCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = window.location.pathname;
  const lang = useLang();

  const toggleMenu = () => setMenuOpen((open) => !open);
  const handleMenuKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
    }
  };

  useEffect(() => {
    const updateNav = () => {
      setIsScrolled(window.scrollY > 8);
      setBrandCollapsed(window.scrollY > 110);
    };

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    return () => window.removeEventListener("scroll", updateNav);
  }, []);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <nav className="nav" aria-label="Primary navigation">
        <NavigationBrand collapsed={brandCollapsed} />

        <div className="nav-right">
          <div className="nav-links" aria-label="Site sections">
            {navKeys.map((link) => (
              <a
                className={currentPath === link.href ? "is-active" : undefined}
                href={withLang(link.href, lang)}
                key={link.key}
              >
                {t(lang, link.key)}
              </a>
            ))}
          </div>

          <div className="language-links" aria-label="Language choices">
            {langButtons.map(({ label, code }) => (
              <a
                className={lang === code ? "is-active" : undefined}
                href={langHref(code)}
                key={code}
                aria-current={lang === code ? "true" : undefined}
              >
                {label}
              </a>
            ))}
          </div>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
            onKeyDown={handleMenuKeyDown}
          >
            <span />
            <span />
          </button>
        </div>

        <div className={`mobile-panel${menuOpen ? " is-open" : ""}`}>
          {navKeys.map((link) => (
            <a
              className={currentPath === link.href ? "is-active" : undefined}
              href={withLang(link.href, lang)}
              key={link.key}
              onClick={() => setMenuOpen(false)}
            >
              {t(lang, link.key)}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
