import { useRef } from "react";
import { useDampedScrollProgress } from "../hooks/useDampedScrollProgress.js";
import EnergySystemVisual from "./EnergySystemVisual.jsx";

export default function EnergyFlowInterlude() {
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
              CHINA.
              <br />
              JAPAN.
              <br />
              THE WORLD BEYOND.
            </p>
          </div>

          <div className="energy-flow-copy">
            <p className="section-marker">
              <span>ENERGY</span>
              <span>IN MOTION</span>
            </p>
            <h2 id="energy-flow-title">
              FROM SUNLIGHT
              <br />
              TO SYSTEM.
            </h2>
            <p className="energy-flow-body">
              Clean energy becomes more valuable
              <br />
              when it can be stored, connected,
              <br />
              and intelligently coordinated.
            </p>
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
