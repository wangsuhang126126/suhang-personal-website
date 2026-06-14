export default function EnergySystemVisual() {
  return (
    <svg
      className="energy-flow-visual"
      viewBox="0 0 980 520"
      aria-hidden="true"
      focusable="false"
    >
      <g className="sunlight-group">
        <path className="sunbeam sunbeam-one" d="M88 42 L170 138" />
        <path className="sunbeam sunbeam-two" d="M148 34 L214 130" />
        <path className="sunbeam sunbeam-three" d="M214 38 L258 126" />
        <text className="system-label sunlight-label" x="82" y="30">SUNLIGHT</text>
      </g>

      <g className="system-lines">
        <path className="energy-guide-line" d="M170 242 C260 218 330 230 398 250 S540 286 626 262 S782 214 902 246" />
        <path className="grid-branch branch-one" d="M650 260 L704 170 L774 166" />
        <path className="grid-branch branch-two" d="M674 272 L760 320 L836 316" />
        <path className="grid-branch branch-three" d="M746 238 L842 208" />
      </g>

      <g className="solar-plane">
        <path d="M122 206 L246 176 L292 238 L162 272 Z" />
        <path d="M152 198 L198 260 M188 190 L236 252 M224 182 L272 244 M148 230 L268 202" />
        <text className="system-label" x="124" y="306">SOLAR INPUT</text>
      </g>

      <g className="home-node">
        <path d="M354 232 L404 188 L456 232" />
        <path d="M372 232 H438 V302 H372 Z" />
        <path d="M394 302 V260 H416 V302" />
        <text className="system-label" x="354" y="336">HOME</text>
      </g>

      <g className="storage-node">
        <rect x="524" y="216" width="86" height="112" rx="7" />
        <path d="M544 246 H590 M544 274 H590 M544 302 H574" />
        <path className="storage-retain" d="M524 332 H610" />
        <text className="system-label" x="500" y="362">RESIDENTIAL STORAGE</text>
      </g>

      <g className="grid-node">
        <path d="M700 194 V314 M662 224 H738 M676 254 H724 M686 284 H714" />
        <text className="system-label" x="650" y="352">GRID INTERACTION</text>
      </g>

      <g className="distributed-nodes">
        <circle className="distributed-node distributed-one" cx="774" cy="166" r="8" />
        <circle className="distributed-node distributed-two" cx="836" cy="316" r="8" />
        <circle className="distributed-node distributed-three" cx="842" cy="208" r="8" />
      </g>

      <g className="vpp-network">
        <circle className="vpp-center" cx="902" cy="246" r="16" />
        <path d="M902 246 L842 208 M902 246 L836 316 M902 246 L774 166" />
        <text className="system-label" x="806" y="388">VPP · DISTRIBUTED ENERGY</text>
      </g>

      <circle className="energy-flow-pulse" cx="0" cy="0" r="5" />
    </svg>
  );
}
