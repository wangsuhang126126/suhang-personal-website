export default function PerspectiveVector({ vector, index }) {
  return (
    <article className="perspective-vector" tabIndex="0" style={{ "--vector-index": index }}>
      <span className="vector-number">{vector.number}</span>
      <div className="vector-main">
        <h3>{vector.title}</h3>
        <p className="vector-label">{vector.label}</p>
        <p className="vector-text">{vector.text}</p>
      </div>
      <span className="vector-arrow" aria-hidden="true">
        →
      </span>
    </article>
  );
}
