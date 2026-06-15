import { useEffect, useState } from "react";
import NavigationBrand from "./NavigationBrand.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const navLinks = [
  { label: "Writing", href: "/writing" },
  { label: "Journey", href: "/journey" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const languages = ["EN", "JP", "ZH"];

export default function Navigation({ theme, onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [brandCollapsed, setBrandCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = window.location.pathname;
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
            {navLinks.map((link) => (
              <a
                className={currentPath === link.href ? "is-active" : undefined}
                href={link.href}
                key={link.label}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="language-links" aria-label="Language choices">
            {languages.map((language) => (
              <a href="#" key={language}>
                {language}
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
          {navLinks.map((link) => (
            <a
              className={currentPath === link.href ? "is-active" : undefined}
              href={link.href}
              key={link.label}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
