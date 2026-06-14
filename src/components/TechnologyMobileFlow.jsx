export default function TechnologyMobileFlow({ nodes }) {
  return (
    <div className="technology-mobile-flow" aria-label="Human judgment workflow">
      <div className="mobile-judgment-node">
        <span aria-hidden="true" />
        <strong>HUMAN JUDGMENT</strong>
      </div>
      <div className="mobile-workflow-line" aria-hidden="true" />
      {nodes.map((node, index) => (
        <div
          className="mobile-workflow-item"
          key={node.number}
          style={{ "--workflow-index": index }}
        >
          <span className="mobile-workflow-marker" aria-hidden="true" />
          <span className="workflow-node-number">{node.number}</span>
          <strong>{node.title}</strong>
          <p>{node.text.replace("\n", " ")}</p>
        </div>
      ))}
    </div>
  );
}
