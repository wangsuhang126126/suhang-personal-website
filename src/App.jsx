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
import { useTheme } from "./hooks/useTheme.js";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const isAboutPage = window.location.pathname === "/about";
  const isJourneyPage = window.location.pathname === "/journey";
  const isLabPage = window.location.pathname === "/lab";
  const isContactPage = window.location.pathname === "/contact";
  const isWritingPage = window.location.pathname === "/writing";
  const pathname = typeof window.location.pathname === "string" ? window.location.pathname : "";
  const articleSlug = pathname.match(/^\/writing\/([^/]+)$/)?.[1] || null;
  const isArticlePage = Boolean(articleSlug);

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
      ) : (
        <main>
          <section
            className="hero"
            aria-label="Suhang Wang personal website introduction"
            style={{ "--scroll-progress": scrollProgress }}
          >
            <EnergyHorizon scrollProgress={scrollProgress} />
            <HeroContent />
            <div className="scroll-hint" aria-hidden="true">
              <span>SCROLL TO EXPLORE</span>
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
      )}
    </>
  );
}
