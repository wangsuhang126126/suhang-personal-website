import MinimalFooter from "../components/MinimalFooter.jsx";

const labProjects = [
  {
    title: "Battery Storage Simulator",
    description:
      "An interactive tool for exploring residential battery storage, solar generation, and energy use scenarios.",
    status: "In progress",
    statusTone: "in-progress",
    categories: ["Energy", "Simulator"],
    action: "Preview pending",
  },
  {
    title: "Family Spirit Pokedex",
    description:
      "A playful family personality-card generator built as a small AI-assisted digital project.",
    status: "Built",
    statusTone: "built",
    categories: ["AI", "Family"],
    action: "Project archive",
  },
  {
    title: "Energy Policy Tracker",
    description:
      "A future space for tracking Japan's energy policy, subsidies, VPP, DR, and storage-related updates.",
    status: "Planned",
    statusTone: "planned",
    categories: ["Japan", "Policy"],
    action: "Planned",
  },
  {
    title: "AI Writing Workflow",
    description:
      "Notes and tools for using AI to research, structure, draft, review, and publish long-form writing.",
    status: "Planned",
    statusTone: "planned",
    categories: ["Writing", "AI"],
    action: "Planned",
  },
];

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
              A working space for energy tools, AI-assisted experiments,
              <br />
              {" "}
              small digital projects, and practical prototypes.
            </p>
            <p>
              This section gathers interactive tools such as
              <br />
              {" "}
              battery storage simulators, policy trackers, and personal experiments.
            </p>
          </div>

          <div className="lab-project-grid" aria-label="Lab projects">
            {labProjects.map((project, index) => (
              <article className="lab-project-card" key={project.title}>
                <div className="lab-project-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className={`lab-project-status is-${project.statusTone}`}>{project.status}</span>
                </div>

                <h2>{project.title}</h2>
                <p>{project.description}</p>

                <div className="lab-project-footer">
                  <div className="lab-project-tags" aria-label={`${project.title} categories`}>
                    {project.categories.map((category) => (
                      <span key={category}>{category}</span>
                    ))}
                  </div>
                  <span className="lab-project-action" aria-disabled="true">
                    {project.action} →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MinimalFooter />
    </main>
  );
}
