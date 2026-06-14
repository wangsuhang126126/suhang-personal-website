export default function WorkflowNode({ node, index }) {
  return (
    <button
      className={`workflow-node workflow-node-${node.position}`}
      type="button"
      style={{ "--workflow-index": index }}
    >
      <span className="workflow-node-marker" aria-hidden="true" />
      <span className="workflow-node-number">{node.number}</span>
      <span className="workflow-node-title">{node.title}</span>
      <span className="workflow-node-text">
        {node.text.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    </button>
  );
}
