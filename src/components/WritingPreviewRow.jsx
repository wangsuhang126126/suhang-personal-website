export default function WritingPreviewRow({ note, index }) {
  return (
    <a
      className="writing-preview-row"
      href="/writing"
      style={{ "--writing-row-index": index }}
      aria-label={`Read writing preview: ${note.title}`}
    >
      <span className="writing-row-number">{note.number}</span>
      <span className="writing-row-title">{note.title}</span>
      <span className="writing-row-arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}
