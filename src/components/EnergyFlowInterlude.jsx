import { useRef } from "react";
import { useDampedScrollProgress } from "../hooks/useDampedScrollProgress.js";
import EnergySystemVisual from "./EnergySystemVisual.jsx";
import { useLang } from "../hooks/useLang.js";
import { t } from "../i18n/siteCopy.js";

export default function EnergyFlowInterlude() {
  const lang = useLang();
  const sectionRef = useRef(null);
  const progress = useDampedScrollProgress(sectionRef);

  return (
    <section
      className="energy-flow-interlude"
      ref={sectionRef}
      style={{ "--flow-progress": progress }}
      aria-labelledby="energy-flow-title"
    >
      <div className="energy-flow-sticky">
        <div className="energy-flow-inner">
          <div className="geo-handoff" aria-hidden="true">
            <p>
              {t(lang, "home.flow.geo.line1")}
              <br />
              {t(lang, "home.flow.geo.line2")}
              <br />
              {t(lang, "home.flow.geo.line3")}
            </p>
          </div>

          <div className="energy-flow-copy">
            <p className="section-marker">
              <span>{t(lang, "home.flow.marker.a")}</span>
              <span>{t(lang, "home.flow.marker.b")}</span>
            </p>
            <h2 id="energy-flow-title">
              {t(lang, "home.flow.heading.line1")}
              <br />
              {t(lang, "home.flow.heading.line2")}
            </h2>
            <p className="energy-flow-body">{t(lang, "home.flow.body")}</p>
          </div>

          <EnergySystemVisual />
          <div className="mobile-energy-flow" aria-hidden="true">
            <div className="mobile-energy-line" />
            {["SUNLIGHT", "SOLAR", "HOME", "STORAGE", "GRID", "VPP"].map((label, index) => (
              <div
                className={`mobile-energy-step mobile-energy-step-${index + 1}`}
                key={label}
                style={{ "--mobile-flow-index": index }}
              >
                <span />
                <strong>{label}</strong>
              </div>
            ))}
            <i className="mobile-energy-pulse" />
          </div>

          <div className="energy-flow-phases" aria-hidden="true">
            <p className="flow-phase flow-phase-generate">
              <span>01</span>
              GENERATE
              <small>SOLAR INPUT</small>
            </p>
            <p className="flow-phase flow-phase-store">
              <span>02</span>
              STORE
              <small>RESIDENTIAL ENERGY STORAGE</small>
            </p>
            <p className="flow-phase flow-phase-connect">
              <span>03</span>
              CONNECT
              <small>GRID INTERACTION</small>
            </p>
            <p className="flow-phase flow-phase-orchestrate">
              <span>04</span>
              ORCHESTRATE
              <small>VPP · HEMS · DISTRIBUTED ENERGY</small>
            </p>
          </div>

          <div className="energy-flow-guide" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
