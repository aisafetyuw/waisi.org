// Hero illustration: minimal static visualizer of METR-Horizon-v1.1
// benchmark results (p50 horizon length vs. LLM release date, 2023 onward)
// on a LINEAR y-axis, with the log-linear regression fit drawn to the full
// extent of the chart. Data: benchmark_results_1_1.yaml. Fit: ln(minutes) =
// -4.5703 + 0.003888·days since 2019-01-01 (doubling ~178 days, R² = 0.92).
// Coordinates precomputed; y spans 0-30 hours linearly, x spans 2023 →
// mid-2027.

type Pt = { x: number; y: number; sota: boolean };

// Models released 2023 onward (px coordinates in the 600x430 box).
const POINTS: Pt[] = [
  { x: 62.8, y: 387.2, sota: true }, // gpt-4
  { x: 137.9, y: 387.2, sota: true }, // gpt-4-1106
  { x: 175.5, y: 387.2, sota: false }, // claude 3 opus
  { x: 186.9, y: 387.3, sota: false }, // gpt-4-turbo
  { x: 197.7, y: 386.6, sota: true }, // gpt-4o
  { x: 209.7, y: 385.8, sota: true }, // claude 3.5 sonnet (jun)
  { x: 236.3, y: 384.1, sota: true }, // o1-preview
  { x: 249.0, y: 384.0, sota: true }, // claude 3.5 sonnet (oct)
  { x: 262.9, y: 380.5, sota: true }, // o1
  { x: 288.6, y: 376.3, sota: true }, // claude 3.7 sonnet
  { x: 304.8, y: 364.9, sota: true }, // o3
  { x: 316.2, y: 368.6, sota: false }, // claude 4 opus
  { x: 339.9, y: 368.6, sota: false }, // claude 4.1 opus
  { x: 340.5, y: 348.8, sota: true }, // gpt-5
  { x: 373.2, y: 344.6, sota: true }, // gemini 3 pro
  { x: 373.5, y: 344.7, sota: false }, // gpt-5.1-codex-max
  { x: 375.1, y: 331.4, sota: true }, // claude opus 4.5
  { x: 380.4, y: 319.9, sota: true }, // gpt-5.2
  { x: 398.2, y: 249.0, sota: true }, // claude opus 4.6
  { x: 398.2, y: 320.4, sota: false }, // gpt-5.3-codex
  { x: 402.6, y: 313.7, sota: false }, // gemini 3.1 pro
  { x: 407.0, y: 321.9, sota: false }, // gpt-5.4
  { x: 417.5, y: 186.0, sota: true }, // claude mythos preview (early)
];

const LABELS: { x: number; y: number; text: string; anchor: "start" | "end" | "middle" }[] = [
  { x: 62.8, y: 374, text: "GPT-4", anchor: "middle" },
  { x: 411, y: 181, text: "Mythos (early)", anchor: "end" },
];

// The regression fit, drawn to the maximum extent of the chart (2023 → the
// top-right edge at ~mid-2027).
const FIT_PATH =
  "M 40 387.4 L 68.5 387.2 L 97 386.8 L 125.5 386.3 L 154 385.6 L 182.5 384.6 " +
  "L 211 383.2 L 239.5 381.2 L 268 378.4 L 296.5 374.3 L 325 368.6 " +
  "L 353.5 360.5 L 382 348.9 L 401 338.6 L 420 325.7 L 439 309.3 " +
  "L 458 288.6 L 477 262.5 L 496 229.5 L 515 187.9 L 534 135.3 L 553 69";

const X_TICKS = [
  { x: 40, label: "2023" },
  { x: 155.6, label: "2024" },
  { x: 271.5, label: "2025" },
  { x: 387.1, label: "2026" },
  { x: 502.7, label: "2027" },
];

export default function CapabilitiesHero() {
  return (
    <svg
      viewBox="0 0 600 430"
      role="img"
      aria-label="METR Horizon v1.1 results from 2023 onward: the task duration AI can complete at 50% success grows exponentially with model release date."
      className="w-full h-auto max-w-[620px]"
    >
      {/* x axis */}
      <line x1="40" y1="388" x2="560" y2="388" stroke="var(--text-primary)" strokeWidth="1" />
      {X_TICKS.map(({ x, label }) => (
        <text key={x} x={x} y="408" textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill="var(--text-primary)" opacity="0.55">
          {label}
        </text>
      ))}

      {/* regression fit — full extent of the chart */}
      <path d={FIT_PATH} fill="none" stroke="var(--text-link)" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" />

      {/* data points: SOTA solid, non-SOTA faded */}
      {POINTS.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.sota ? 3.2 : 2.4}
          fill="var(--text-link)"
          opacity={p.sota ? 1 : 0.3}
        />
      ))}

      {/* milestone labels */}
      {LABELS.map(({ x, y, text, anchor }) => (
        <text key={text} x={x} y={y} textAnchor={anchor} fontSize="10.5" fontFamily="ui-monospace, monospace" fill="var(--text-primary)" opacity="0.7">
          {text}
        </text>
      ))}
    </svg>
  );
}
