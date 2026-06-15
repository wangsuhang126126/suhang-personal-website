const footerLinks = [
  {
    label: "Writing",
    href: "/writing",
  },
  {
    label: "Journey",
    href: "/journey",
  },
  {
    label: "Lab",
    href: "/lab",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function MinimalFooter() {
  return (
    <footer className="minimal-footer" aria-label="Site footer">
      <div className="minimal-footer-inner">
        <div className="minimal-footer-meta">
          <p>© 2026 Suhang Wang</p>
          <p>Tokyo · Japan</p>
        </div>

        <nav className="minimal-footer-nav" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
