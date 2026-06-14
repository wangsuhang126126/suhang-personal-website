import SHMonogram from "./SHMonogram.jsx";

export default function NavigationBrand({ collapsed }) {
  const scrollToTop = () => {
    if (window.location.pathname !== "/") {
      window.location.assign("/#");
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  const handleClick = (event) => {
    event.preventDefault();
    scrollToTop();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scrollToTop();
    }
  };

  return (
    <a
      className={`brand${collapsed ? " is-collapsed" : ""}`}
      href="#"
      aria-label="Return to top — Suhang Wang"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className="brand-mark">
        <SHMonogram />
      </span>
      <span className="brand-text">
        <span className="brand-name-full">Suhang Wang (Frank)</span>
        <span className="brand-name-cn" lang="zh-Hans">
          王苏杭
        </span>
      </span>
    </a>
  );
}
