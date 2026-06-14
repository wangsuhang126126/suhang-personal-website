import WorkflowNode from "./WorkflowNode.jsx";
import WorkflowPulse from "./WorkflowPulse.jsx";

export default function WorkflowNetwork({ nodes }) {
  return (
    <div className="workflow-network" aria-label="AI augmented workflow network">
      <svg className="workflow-lines" viewBox="0 0 760 620" aria-hidden="true">
        <path className="workflow-branch workflow-branch-research" d="M380 118 L410 292" />
        <path className="workflow-branch workflow-branch-synthesis" d="M575 225 L428 300" />
        <path className="workflow-branch workflow-branch-decision" d="M232 404 L372 324" />
        <path className="workflow-branch workflow-branch-execution" d="M400 506 L404 338" />
        <path className="workflow-branch workflow-branch-learning" d="M160 282 L366 306" />
        <path className="workflow-return" d="M160 282 C172 168 250 98 380 118" />
        <WorkflowPulse />
      </svg>

      <div className="workflow-center" aria-label="Human judgment">
        <span className="workflow-center-rings" aria-hidden="true" />
        <span className="workflow-center-point" aria-hidden="true" />
        <span>HUMAN</span>
        <span>JUDGMENT</span>
      </div>

      {nodes.map((node, index) => (
        <WorkflowNode key={node.number} node={node} index={index} />
      ))}

      <p className="workflow-microcopy">AI AUGMENTS THE WORKFLOW</p>
    </div>
  );
}
