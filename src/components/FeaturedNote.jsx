export default function FeaturedNote() {
  return (
    <a className="featured-note" href="/writing" aria-label="Read note: Japan's Residential Energy Transition: What Comes After Solar?">
      <span className="featured-note-kicker">FEATURED NOTE</span>
      <span className="featured-note-title">
        Japan&rsquo;s Residential Energy Transition:
        <br />
        What Comes After Solar?
      </span>
      <span className="featured-note-meta">ENERGY · JAPAN</span>
      <span className="featured-note-text">
        A closer look at how storage,
        <br />
        VPPs, and distributed energy
        <br />
        are reshaping the residential market.
      </span>
      <span className="featured-note-action">
        READ NOTE <span aria-hidden="true">→</span>
      </span>
    </a>
  );
}
