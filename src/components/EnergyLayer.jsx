export default function EnergyLayer({ layer, index }) {
  return (
    <article
      className="energy-layer"
      style={{ "--layer-index": index, "--track-length": layer.length }}
    >
      <div className="energy-layer-meta">
        <span>{layer.number}</span>
        <h3>{layer.action}</h3>
      </div>
      <div className="energy-layer-content">
        <p className="energy-layer-label">{layer.label}</p>
        <p className="energy-layer-text">{layer.text}</p>
        <div className="energy-track" aria-hidden="true">
          <span className="energy-track-line" />
          <span className="energy-track-node" />
        </div>
      </div>
    </article>
  );
}
