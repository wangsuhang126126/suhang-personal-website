import { useLang } from "../hooks/useLang.js";
import { t } from "../i18n/siteCopy.js";

export default function HeroContent() {
  const lang = useLang();

  return (
    <div className="hero-content">
      <p className="hero-kicker">{t(lang, "home.hero.kicker")}</p>
      <h1>
        {t(lang, "home.hero.line1")}
        <br />
        {t(lang, "home.hero.line2")}
      </h1>
      <p className="hero-subhead">
        {t(lang, "home.hero.subhead.line1")}
        <br />
        {t(lang, "home.hero.subhead.line2")}
      </p>
      <div className="hero-mobile-horizon" aria-hidden="true">
        <span>Xi'an</span>
        <span className="mobile-line" />
        <span className="mobile-node">Tokyo</span>
        <span className="mobile-line" />
        <span>Global →</span>
      </div>
      <div className="identity-block">
        <p>
          Suhang Wang
          <br />
          <span lang="zh-Hans">王苏杭</span>
        </p>
        <p>{t(lang, "home.hero.identity.bio")}</p>
        <p>{t(lang, "home.hero.identity.tags")}</p>
      </div>
    </div>
  );
}
