import { useEffect, useState } from "react";
import Navigation from "./components/Navigation.jsx";
import EnergyHorizon from "./components/EnergyHorizon.jsx";
import HeroContent from "./components/HeroContent.jsx";
import EnergyFlowInterlude from "./components/EnergyFlowInterlude.jsx";
import PerspectiveSection from "./components/PerspectiveSection.jsx";
import EnergySection from "./components/EnergySection.jsx";
import TechnologySection from "./components/TechnologySection.jsx";
import WritingPreviewSection from "./components/WritingPreviewSection.jsx";
import ContactFooterSection from "./components/ContactFooterSection.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import JourneyPage from "./pages/JourneyPage.jsx";
import LabPage from "./pages/LabPage.jsx";
import WritingPage from "./pages/WritingPage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { useTheme } from "./hooks/useTheme.js";
import { useLang } from "./hooks/useLang.js";
import { t } from "./i18n/siteCopy.js";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const lang = useLang();
  const [scrollProgress, setScrollProgress] = useState(0);
  const rawPathname = typeof window.location.pathname === "string" ? window.location.pathname : "/";
  const pathname = rawPathname.replace(/\/+$/, "") || "/";
  const isHomePage = pathname === "/";
  const isAboutPage = pathname === "/about";
  const isJourneyPage = pathname === "/journey";
  const isLabPage = pathname === "/lab";
  const isContactPage = pathname === "/contact";
  const isWritingPage = pathname === "/writing";
  const articleSlug = pathname.match(/^\/writing\/([^/]+)$/)?.[1] || null;
  const isArticlePage = Boolean(articleSlug);

  useEffect(() => {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : lang);
  }, [lang]);

  useEffect(() => {
    const canonicalUrl = new URL(pathname, "https://suhangwang.com").href;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);
  }, [pathname]);

  useEffect(() => {
    const updateProgress = () => {
      setScrollProgress(Math.min(window.scrollY / 340, 1));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    if (
      isAboutPage ||
      isJourneyPage ||
      isLabPage ||
      isContactPage ||
      isWritingPage ||
      isArticlePage ||
      window.location.hash !== "#contact"
    ) {
      return undefined;
    }

    const scrollToContact = () => {
      document.querySelector("#contact")?.scrollIntoView({ block: "start", behavior: "auto" });
    };

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToContact);
    });
    const timeout = window.setTimeout(scrollToContact, 160);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [isAboutPage, isJourneyPage, isLabPage, isContactPage, isWritingPage, isArticlePage]);

  return (
    <>
      <Navigation theme={theme} onToggleTheme={toggleTheme} />
      {isAboutPage ? (
        <AboutPage />
      ) : isJourneyPage ? (
        <JourneyPage />
      ) : isLabPage ? (
        <LabPage />
      ) : isContactPage ? (
        <ContactPage />
      ) : isWritingPage ? (
        <WritingPage />
      ) : isArticlePage ? (
        <ArticlePage slug={articleSlug} />
      ) : isHomePage ? (
        <main>
          <section
            className="hero"
            aria-label="Suhang Wang personal website introduction"
            style={{ "--scroll-progress": scrollProgress }}
          >
            <EnergyHorizon scrollProgress={scrollProgress} />
            <HeroContent />
            <div className="scroll-hint" aria-hidden="true">
              <span>{t(lang, "home.hero.scroll")}</span>
              <span>↓</span>
            </div>
          </section>
          <PerspectiveSection />
          <EnergyFlowInterlude />
          <EnergySection />
          <TechnologySection />
          <WritingPreviewSection />
          <ContactFooterSection />
        </main>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
