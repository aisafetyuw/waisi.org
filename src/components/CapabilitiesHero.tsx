// Hero: static visualizer of METR-Horizon-v1.1 results (p50 horizon length
// vs. LLM release date, 2023 onward, SOTA models only) on a LINEAR y-axis.
// Solid line of best fit through the shown data (log-linear least squares on
// the 2023+ points: doubling ~122 days, R² = 0.935), a frontier line stitched
// through the points, and CSS-only hover tooltips (model · horizon ·
// equivalent software task). Tooltips live in their own top layer so they
// always paint above the chart. Data: benchmark_results_1_1.yaml;
// coordinates precomputed. y spans 0-30 hours linearly, x spans 2023 →
// mid-2027.

type Pt = {
  x: number;
  y: number;
  name: string;
  time: string;
  task: string;
};

// SOTA models released 2023 onward.
const POINTS: Pt[] = [
  { x: 62.8, y: 387.2, name: "GPT-4", time: "4 min", task: "Fix a one-line bug" },
  { x: 137.9, y: 387.2, name: "GPT-4 (Nov '23)", time: "4 min", task: "Fix a one-line bug" },
  { x: 197.7, y: 386.6, name: "GPT-4o", time: "7 min", task: "Fix a one-line bug" },
  { x: 209.7, y: 385.8, name: "Claude 3.5 Sonnet (Jun)", time: "11 min", task: "Fix bugs in a small Python library" },
  { x: 236.3, y: 384.1, name: "o1-preview", time: "20 min", task: "Fix bugs in a small Python library" },
  { x: 249.0, y: 384.0, name: "Claude 3.5 Sonnet (Oct)", time: "21 min", task: "Fix bugs in a small Python library" },
  { x: 262.9, y: 380.5, name: "o1", time: "39 min", task: "Fix bugs in a small Python library" },
  { x: 288.6, y: 376.3, name: "Claude 3.7 Sonnet", time: "1.0 hrs", task: "Exploit a buffer overflow" },
  { x: 304.8, y: 364.9, name: "o3", time: "2.0 hrs", task: "Exploit a buffer overflow" },
  { x: 340.5, y: 348.8, name: "GPT-5", time: "3.4 hrs", task: "Train an adversarially robust image model" },
  { x: 373.2, y: 344.6, name: "Gemini 3 Pro", time: "3.7 hrs", task: "Train an adversarially robust image model" },
  { x: 375.1, y: 331.4, name: "Claude Opus 4.5", time: "4.9 hrs", task: "Train an adversarially robust image model" },
  { x: 380.4, y: 319.9, name: "GPT-5.2", time: "5.9 hrs", task: "Train an adversarially robust image model" },
  { x: 398.2, y: 249.0, name: "Claude Opus 4.6", time: "12.0 hrs", task: "Exploit a vulnerable smart contract" },
  { x: 417.5, y: 186.0, name: "Claude Mythos Preview (early)", time: "17.4 hrs", task: "Fix a complex bug in an ML research codebase" },
];

const LABELS: { x: number; y: number; text: string; anchor: "start" | "end" | "middle" }[] = [
  { x: 62.8, y: 374, text: "GPT-4", anchor: "middle" },
  { x: 411, y: 181, text: "Mythos (early)", anchor: "end" },
];

// Line of best fit through the 2023+ points, drawn to the maximum extent of
// the chart.
const FIT_PATH =
  "M 40 387.9 L 68.5 387.8 L 97 387.6 L 125.5 387.4 L 154 387 L 182.5 386.3 " +
  "L 211 385.3 L 239.5 383.4 L 268 380.4 L 296.5 375.3 L 315.5 370.2 " +
  "L 334.5 363 L 353.5 352.8 L 372.5 338.6 L 391.5 318.6 L 410.5 290.5 " +
  "L 429.5 251 L 448.5 195.5 L 467.5 117.6 L 477 67.5";

// Frontier line stitched through the points in release order.
const SOTA_LINE =
  "M 62.8 387.2 L 137.9 387.2 L 197.7 386.6 L 209.7 385.8 L 236.3 384.1 " +
  "L 249 384 L 262.9 380.5 L 288.6 376.3 L 304.8 364.9 L 340.5 348.8 " +
  "L 373.2 344.6 L 375.1 331.4 L 380.4 319.9 L 398.2 249 L 417.5 186";

const X_TICKS = [
  { x: 40, label: "2023" },
  { x: 155.6, label: "2024" },
  { x: 271.5, label: "2025" },
  { x: 387.1, label: "2026" },
  { x: 502.7, label: "2027" },
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
  const flip = p.x + 12 + w > 590;
  const tx = flip ? p.x - w - 12 : p.x + 12;
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
      viewBox="0 0 600 430"
      role="img"
      aria-label="METR Horizon v1.1 results from 2023 onward: the task duration AI can complete at 50% success grows exponentially with model release date. Hover a point for the model, its horizon, and an equivalent software engineering task."
      className="w-full h-auto"
    >
      {/* x axis */}
      <line x1="40" y1="388" x2="560" y2="388" stroke="var(--text-primary)" strokeWidth="1" />
      {X_TICKS.map(({ x, label }) => (
        <text key={x} x={x} y="408" textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill="var(--text-primary)" opacity="0.55">
          {label}
        </text>
      ))}

      {/* line of best fit — solid, full extent of the chart */}
      <path d={FIT_PATH} fill="none" stroke="var(--text-link)" strokeWidth="2" strokeLinecap="round" />

      {/* frontier line through the points */}
      <path d={SOTA_LINE} fill="none" stroke="var(--text-link)" strokeWidth="1.2" opacity="0.45" strokeLinejoin="round" />

      {/* milestone labels */}
      {LABELS.map(({ x, y, text, anchor }) => (
        <text key={text} x={x} y={y} textAnchor={anchor} fontSize="10.5" fontFamily="ui-monospace, monospace" fill="var(--text-primary)" opacity="0.7">
          {text}
        </text>
      ))}

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
