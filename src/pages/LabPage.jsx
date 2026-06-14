import MinimalFooter from "../components/MinimalFooter.jsx";

export default function LabPage() {
  return (
    <main className="lab-page">
      <section className="lab-placeholder-section" aria-labelledby="lab-title">
        <div className="lab-placeholder-inner">
          <p className="lab-page-marker">
            <span>01</span>
            <span>LAB</span>
          </p>

          <h1 id="lab-title">
            TOOLS,
            <br />
            EXPERIMENTS,
            <br />
            AND SMALL SYSTEMS.
          </h1>

          <div className="lab-placeholder-copy">
            <p>
              A future space for energy tools, AI-assisted experiments,
              <br />
              {" "}
              small digital projects, and practical prototypes.
            </p>
            <p>
              This section will eventually include interactive tools such as
              <br />
              {" "}
              battery storage simulators, policy trackers, and personal experiments.
            </p>
          </div>

          <p className="lab-coming-soon">COMING SOON →</p>
        </div>
      </section>

      <MinimalFooter />
    </main>
  );
}
