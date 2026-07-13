// Hero: static visualizer of METR-Horizon-v1.1 results (p50 horizon length
// vs. LLM release date, SOTA models from GPT-4 (Nov '23) onward) on a LINEAR
// y-axis. Solid line of best fit through the shown data (log-linear least
// squares: doubling ~108 days, R² = 0.980), a frontier line stitched through
// the points, and CSS-only hover tooltips (model · horizon · equivalent
// software task). Tooltips live in their own top layer so they always paint
// above the chart. Data: benchmark_results_1_1.yaml; coordinates
// precomputed. y spans 0-30 hours linearly, x spans Nov 2023 → mid-2027.

type Pt = {
  x: number;
  y: number;
  name: string;
  time: string;
  task: string;
};

// SOTA models from GPT-4 (Nov '23) onward.
const POINTS: Pt[] = [
  { x: 40.0, y: 387.2, name: "GPT-4 (Nov '23)", time: "4 min", task: "Fix a one-line bug" },
  { x: 113.7, y: 386.6, name: "GPT-4o", time: "7 min", task: "Fix a one-line bug" },
  { x: 128.6, y: 385.8, name: "Claude 3.5 Sonnet (Jun)", time: "11 min", task: "Fix bugs in a small Python library" },
  { x: 161.3, y: 384.1, name: "o1-preview", time: "20 min", task: "Fix bugs in a small Python library" },
  { x: 176.9, y: 384.0, name: "Claude 3.5 Sonnet (Oct)", time: "21 min", task: "Fix bugs in a small Python library" },
  { x: 194.1, y: 380.5, name: "o1", time: "39 min", task: "Fix bugs in a small Python library" },
  { x: 225.7, y: 376.3, name: "Claude 3.7 Sonnet", time: "1.0 hrs", task: "Exploit a buffer overflow" },
  { x: 245.6, y: 364.9, name: "o3", time: "2.0 hrs", task: "Exploit a buffer overflow" },
  { x: 289.7, y: 348.8, name: "GPT-5", time: "3.4 hrs", task: "Train an adversarially robust image model" },
  { x: 329.8, y: 344.6, name: "Gemini 3 Pro", time: "3.7 hrs", task: "Train an adversarially robust image model" },
  { x: 332.2, y: 331.4, name: "Claude Opus 4.5", time: "4.9 hrs", task: "Train an adversarially robust image model" },
  { x: 338.8, y: 319.9, name: "GPT-5.2", time: "5.9 hrs", task: "Train an adversarially robust image model" },
  { x: 360.7, y: 249.0, name: "Claude Opus 4.6", time: "12.0 hrs", task: "Exploit a vulnerable smart contract" },
  { x: 384.5, y: 186.0, name: "Claude Mythos Preview (early)", time: "17.4 hrs", task: "Fix a complex bug in an ML research codebase" },
];

const LABELS: { x: number; y: number; text: string; anchor: "start" | "end" | "middle" }[] = [
  { x: 36, y: 374, text: "GPT-4", anchor: "start" },
  { x: 378, y: 181, text: "Mythos", anchor: "end" },
];

// Line of best fit through the shown points, drawn to the maximum extent of
// the chart.
const FIT_PATH =
  "M 40 387.5 L 63.4 387.2 L 86.8 386.8 L 110.2 386.3 L 133.6 385.4 " +
  "L 157 384.2 L 180.4 382.4 L 203.8 379.8 L 227.2 376 L 250.7 370.3 " +
  "L 274.1 361.9 L 297.5 349.6 L 320.9 331.6 L 332.6 319.5 L 344.3 304.9 " +
  "L 356 287.2 L 367.7 265.8 L 379.4 239.7 L 391.1 208.2 L 402.8 169.9 " +
  "L 414.5 123.4 L 426.2 67";

const X_TICKS = [
  { x: 61.8, label: "2024" },
  { x: 204.6, label: "2025" },
  { x: 347.0, label: "2026" },
];

const TIP_H = 56;
// Approximate mono glyph widths (px per char) at each line's font size.
const CH_NAME = 6.7; // 11px
const CH_TIME = 6.4; // 10.5px
const CH_TASK = 5.8; // 9.5px
const TIP_PAD = 10;

function tipWidth(p: Pt): number {
  const w = Math.max(
    p.name.length * CH_NAME,
    ("p50 horizon: " + p.time).length * CH_TIME,
    ("≈ " + p.task).length * CH_TASK,
  );
  return Math.ceil(w + TIP_PAD * 2);
}

// A transparent hover target plus the tooltip itself. These live in the
// topmost layer of the SVG so tooltips always paint above dots and lines.
function TipTarget({ p }: { p: Pt }) {
  const w = tipWidth(p);
  // Tooltips open to the right of the dot, sliding left just enough to stay
  // inside the chart bounds.
  const tx = Math.min(p.x + 12, 545 - w);
  const ty = Math.max(10, p.y - TIP_H - 8);
  return (
    <g className="hero-dot">
      <circle cx={p.x} cy={p.y} r="12" fill="transparent" />
      <g className="hero-tip">
        <rect x={tx} y={ty} width={w} height={TIP_H} rx="4" fill="var(--bg-card)" stroke="var(--border-subtle)" />
        <text x={tx + TIP_PAD} y={ty + 17} fontSize="11" fontFamily="ui-monospace, monospace" fontWeight="600" fill="var(--text-heading)">
          {p.name}
        </text>
        <text x={tx + TIP_PAD} y={ty + 32} fontSize="10.5" fontFamily="ui-monospace, monospace" fill="var(--text-link)">
          p50 horizon: {p.time}
        </text>
        <text x={tx + TIP_PAD} y={ty + 47} fontSize="9.5" fontFamily="ui-monospace, monospace" fill="var(--text-primary)" opacity="0.75">
          ≈ {p.task}
        </text>
      </g>
    </g>
  );
}

export default function CapabilitiesHero() {
  return (
    <svg
      viewBox="0 0 545 430"
      overflow="visible"
      role="img"
      aria-label="METR Horizon v1.1 results from 2023 onward: the task duration AI can complete at 50% success grows exponentially with model release date. Hover a point for the model, its horizon, and an equivalent software engineering task."
      className="w-full h-auto"
    >
      <defs>
        {/* wispy ends: strokes fade out at both extremes */}
        <linearGradient id="axis-fade" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="545" y2="0">
          <stop offset="0" stopColor="var(--text-primary)" stopOpacity="0.9" />
          <stop offset="0.8" stopColor="var(--text-primary)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--text-primary)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fit-fade" gradientUnits="userSpaceOnUse" x1="40" y1="388" x2="426" y2="67">
          <stop offset="0" stopColor="var(--text-heading)" stopOpacity="1" />
          <stop offset="0.86" stopColor="var(--text-heading)" stopOpacity="1" />
          <stop offset="1" stopColor="var(--text-heading)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* x axis */}
      <line x1="40" y1="388" x2="545" y2="388" stroke="url(#axis-fade)" strokeWidth="1" />
      {X_TICKS.map(({ x, label }) => (
        <text key={x} x={x} y="408" textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill="var(--text-primary)" opacity="0.55">
          {label}
        </text>
      ))}

      {/* line of best fit — solid ink, wispy at both ends */}
      <path d={FIT_PATH} fill="none" stroke="url(#fit-fade)" strokeWidth="2" strokeLinecap="round" />

      {/* milestone labels */}
      {LABELS.map(({ x, y, text, anchor }) => (
        <text key={text} x={x} y={y} textAnchor={anchor} fontSize="10.5" fontFamily="ui-monospace, monospace" fill="var(--text-primary)" opacity="0.7">
          {text}
        </text>
      ))}

      {/* the climber, scaling the best-fit line (extracted silhouette;
          the raised hand and left knee rest against the curve) */}
      <image
        href="/climber.png"
        x="391"
        y="181"
        width="22"
        height="35"
      />

      {/* data points */}
      {POINTS.map((p) => (
        <circle key={p.name} cx={p.x} cy={p.y} r="3.2" fill="var(--text-link)" />
      ))}

      {/* top layer: hover targets + tooltips (always in front) */}
      {POINTS.map((p) => (
        <TipTarget key={p.name} p={p} />
      ))}
    </svg>
  );
}
