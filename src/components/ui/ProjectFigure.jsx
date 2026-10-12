import './ProjectFigure.css'

/**
 * An abstract architectural frame, drawn for a project tile.
 *
 * No project photography has been supplied, and dressing these entries in
 * stock imagery would present someone else's building as Beyond Service work.
 * So each project gets a line figure that abstracts its discipline — a
 * structural grid, a distribution circuit, a floor plan, a riser diagram —
 * rather than a photograph that claims something untrue.
 *
 * Purely decorative: the tile's own text carries the meaning, so these are
 * hidden from assistive technology.
 *
 * @param {{ variant?: 'grid' | 'circuit' | 'plan' | 'riser', className?: string }} props
 */
export default function ProjectFigure({ variant = 'grid', className = '' }) {
  return (
    <svg
      className={`pfig pfig--${variant} ${className}`.trim()}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {variant === 'grid' && <Grid />}
      {variant === 'circuit' && <Circuit />}
      {variant === 'plan' && <Plan />}
      {variant === 'riser' && <Riser />}
    </svg>
  )
}

/* Civil — a structural column and beam grid. */
function Grid() {
  const cols = [70, 140, 210, 280, 350]
  const rows = [80, 160, 240, 320]
  return (
    <g className="pfig__ink">
      {cols.map((x) => (
        <line key={`c${x}`} x1={x} y1="40" x2={x} y2="360" />
      ))}
      {rows.map((y) => (
        <line key={`r${y}`} x1="40" y1={y} x2="380" y2={y} />
      ))}
      <rect className="pfig__accent" x="140" y="160" width="70" height="80" />
      <rect className="pfig__frame" x="40" y="40" width="320" height="320" />
    </g>
  )
}

/* MEP & ELV — a distribution run with nodes. */
function Circuit() {
  const nodes = [
    [90, 120],
    [200, 120],
    [310, 200],
    [200, 280],
    [90, 280],
  ]
  return (
    <g className="pfig__ink">
      <polyline points="90,120 200,120 200,280 90,280" />
      <polyline points="200,120 310,120 310,280 200,280" />
      <line x1="40" y1="200" x2="360" y2="200" />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" />
      ))}
      <circle className="pfig__accent-dot" cx="310" cy="200" r="7" />
      <rect className="pfig__frame" x="40" y="60" width="320" height="280" />
    </g>
  )
}

/* Civil Interior — nested partitions, read as a floor plan. */
function Plan() {
  return (
    <g className="pfig__ink">
      <rect x="40" y="60" width="320" height="280" />
      <line x1="40" y1="180" x2="230" y2="180" />
      <line x1="230" y1="60" x2="230" y2="340" />
      <line x1="230" y1="250" x2="360" y2="250" />
      <rect x="70" y="90" width="130" height="60" />
      <rect className="pfig__accent" x="262" y="92" width="66" height="126" />
      <line x1="120" y1="180" x2="120" y2="340" />
    </g>
  )
}

/* Fire & Safety — a riser with branch lines and heads. */
function Riser() {
  const branches = [110, 170, 230, 290]
  return (
    <g className="pfig__ink">
      <line x1="120" y1="50" x2="120" y2="350" strokeWidth="2" />
      {branches.map((y) => (
        <g key={y}>
          <line x1="120" y1={y} x2="320" y2={y} />
          <circle cx="320" cy={y} r="5" />
        </g>
      ))}
      <circle className="pfig__accent-dot" cx="320" cy="170" r="7" />
      <rect className="pfig__frame" x="40" y="40" width="320" height="320" />
    </g>
  )
}
