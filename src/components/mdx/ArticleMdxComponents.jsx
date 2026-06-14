function getYouTubeEmbedUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const videoId =
      parsedUrl.hostname.includes("youtu.be") ? parsedUrl.pathname.slice(1) : parsedUrl.searchParams.get("v");

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } catch {
    return url;
  }
}

export function Callout({ children, type = "note" }) {
  return (
    <aside className={`article-callout article-callout-${type}`}>
      <span>{type}</span>
      <div>{children}</div>
    </aside>
  );
}

export function ArticleImage({ alt, caption, src }) {
  return (
    <figure className="article-image">
      <img alt={alt} src={src} />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function VideoEmbed({ title = "Embedded video", url }) {
  return (
    <div className="article-video">
      <iframe
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        src={getYouTubeEmbedUrl(url)}
        title={title}
      />
    </div>
  );
}

export function DataCard({ label, note, value }) {
  return (
    <aside className="article-data-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {note ? <p>{note}</p> : null}
    </aside>
  );
}

export const articleMdxComponents = {
  ArticleImage,
  Callout,
  DataCard,
  VideoEmbed,
};
