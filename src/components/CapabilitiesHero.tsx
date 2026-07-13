// Hero illustration: static visualizer of METR-Horizon-v1.1 benchmark
// results (p50 horizon length vs. LLM release date) on a LINEAR y-axis, with
// the log-linear regression fit drawn to the full extent of the chart and a
// climber ascending it. Data: benchmark_results_1_1.yaml (26 models,
// 2019-2026). Fit: ln(minutes) = -4.5703 + 0.003888·days since 2019-01-01
// → doubling every ~178 days, R² = 0.92 (log space). Coordinates are
// precomputed; y spans 0-30 hours linearly, x spans 2019 → mid-2027.

type Pt = { x: number; y: number; sota: boolean };

// All 26 models from the benchmark file (px coordinates in the 600x440 box).
const POINTS: Pt[] = [
  { x: 78.8, y: 388.0, sota: true }, // gpt2 2019-02-14, 0.1 min
  { x: 151.4, y: 388.0, sota: true }, // davinci-002
  { x: 252.8, y: 387.9, sota: true }, // gpt-3.5-turbo-instruct
  { x: 309.1, y: 387.2, sota: true }, // gpt-4
  { x: 345.8, y: 387.2, sota: true }, // gpt-4-1106
  { x: 364.2, y: 387.2, sota: false }, // claude 3 opus
  { x: 369.8, y: 387.3, sota: false }, // gpt-4-turbo
  { x: 375.0, y: 386.6, sota: true }, // gpt-4o
  { x: 380.9, y: 385.8, sota: true }, // claude 3.5 sonnet (jun)
  { x: 393.9, y: 384.1, sota: true }, // o1-preview
  { x: 400.1, y: 384.0, sota: true }, // claude 3.5 sonnet (oct)
  { x: 406.9, y: 380.5, sota: true }, // o1
  { x: 419.4, y: 376.3, sota: true }, // claude 3.7 sonnet
  { x: 427.3, y: 364.9, sota: true }, // o3
  { x: 432.9, y: 368.6, sota: false }, // claude 4 opus
  { x: 444.5, y: 368.6, sota: false }, // claude 4.1 opus
  { x: 444.8, y: 348.8, sota: true }, // gpt-5
  { x: 460.7, y: 344.6, sota: true }, // gemini 3 pro
  { x: 460.9, y: 344.7, sota: false }, // gpt-5.1-codex-max
  { x: 461.7, y: 331.4, sota: true }, // claude opus 4.5
  { x: 464.3, y: 319.9, sota: true }, // gpt-5.2
  { x: 473.0, y: 249.0, sota: true }, // claude opus 4.6
  { x: 473.0, y: 320.4, sota: false }, // gpt-5.3-codex
  { x: 475.1, y: 313.7, sota: false }, // gemini 3.1 pro
  { x: 477.3, y: 321.9, sota: false }, // gpt-5.4
  { x: 482.4, y: 186.0, sota: true }, // claude mythos preview (early)
];

const LABELS: { x: number; y: number; text: string; anchor: "start" | "end" | "middle" }[] = [
  { x: 85, y: 378, text: "GPT-2", anchor: "start" },
  { x: 309, y: 374, text: "GPT-4", anchor: "middle" },
  { x: 400, y: 372, text: "o1", anchor: "end" },
  { x: 421, y: 356, text: "o3", anchor: "end" },
  { x: 438, y: 344, text: "GPT-5", anchor: "end" },
  { x: 455, y: 327, text: "Opus 4.5", anchor: "end" },
  { x: 466, y: 246, text: "Opus 4.6", anchor: "end" },
  { x: 476, y: 181, text: "Mythos (early)", anchor: "end" },
];

// The regression line, sampled every 45 days and drawn to the maximum extent
// of the plot — from 2019 all the way to the top-right edge (~mid-2027).
const FIT_PATH =
  "M 72 388 L 197.3 388 L 204.3 387.9 L 225.1 387.9 L 246 387.8 L 266.9 387.7 " +
  "L 280.8 387.6 L 294.8 387.5 L 308.7 387.2 L 322.6 386.9 L 336.5 386.5 " +
  "L 350.4 385.8 L 364.4 384.9 L 378.3 383.6 L 392.2 381.7 L 406.1 379.1 " +
  "L 420.1 375.4 L 434 370.1 L 447.9 362.6 L 461.8 352 L 468.8 345.1 " +
  "L 475.7 336.9 L 482.7 327.1 L 489.7 315.5 L 496.6 301.6 L 503.6 285.1 " +
  "L 510.5 265.4 L 517.5 242 L 524.5 214.1 L 531.4 180.8 L 538.4 141.2 " +
  "L 545.3 94";

const Y_TICKS = [
  { y: 388, label: "0" },
  { y: 330, label: "5 h" },
  { y: 272, label: "10 h" },
  { y: 214, label: "15 h" },
  { y: 156, label: "20 h" },
  { y: 98, label: "25 h" },
  { y: 40, label: "30 h" },
];

const X_TICKS = [
  { x: 72, label: "2019" },
  { x: 185.1, label: "2021" },
  { x: 298, label: "2023" },
  { x: 411.1, label: "2025" },
  { x: 524, label: "2027" },
];

export default function CapabilitiesHero() {
  return (
    <svg
      viewBox="0 0 600 440"
      role="img"
      aria-label="METR Horizon v1.1 results: the task duration AI can complete at 50% success, plotted linearly against model release date. An exponential fit with R-squared 0.92 doubles every 178 days; a climber ascends the curve."
      className="w-full h-auto max-w-[620px]"
    >
      {/* gridlines */}
      {Y_TICKS.map(({ y }) => (
        <line key={y} x1="72" y1={y} x2="552" y2={y} stroke="var(--border-subtle)" strokeWidth="1" />
      ))}

      {/* axes */}
      <line x1="72" y1="24" x2="72" y2="388" stroke="var(--text-primary)" strokeWidth="1" />
      <line x1="72" y1="388" x2="552" y2="388" stroke="var(--text-primary)" strokeWidth="1" />

      {/* tick labels */}
      {Y_TICKS.map(({ y, label }) => (
        <text key={y} x="64" y={y + 3} textAnchor="end" fontSize="11" fontFamily="ui-monospace, monospace" fill="var(--text-primary)" opacity="0.55">
          {label}
        </text>
      ))}
      {X_TICKS.map(({ x, label }) => (
        <text key={x} x={x} y="406" textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill="var(--text-primary)" opacity="0.55">
          {label}
        </text>
      ))}

      {/* axis titles */}
      <text x="26" y="206" fontSize="11" fontFamily="ui-monospace, monospace" fill="var(--text-primary)" opacity="0.55" transform="rotate(-90 26 206)" textAnchor="middle">
        p50 task duration (human hours)
      </text>
      <text x="312" y="430" fontSize="11" fontFamily="ui-monospace, monospace" fill="var(--text-primary)" opacity="0.55" textAnchor="middle">
        LLM release date
      </text>

      {/* regression fit — drawn to the full extent of the chart */}
      <path d={FIT_PATH} fill="none" stroke="var(--text-link)" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" />

      {/* fit annotation */}
      <text x="96" y="84" fontSize="11.5" fontFamily="ui-monospace, monospace" fill="var(--text-primary)" opacity="0.8">
        METR-Horizon-v1.1 · p50 horizon
      </text>
      <text x="96" y="102" fontSize="11.5" fontFamily="ui-monospace, monospace" fill="var(--text-link)">
        doubling every ~178 days · R² = 0.92
      </text>

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

      {/* the climber, ascending the steep stretch of the fit */}
      <g
        transform="translate(508 254) rotate(42)"
        stroke="var(--text-heading)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      >
        <circle cx="0" cy="-13" r="4" fill="var(--text-heading)" stroke="none" />
        <path d="M 0 -9 L -3 2" />
        <path d="M -3 2 L -8 11" />
        <path d="M -3 2 L 3 8 L 4 13" />
        <path d="M -1 -6 L -8 0" />
        <path d="M -1 -6 L 7 -9" />
        <path d="M 7 -9 L 11 -3" strokeWidth="1.6" />
      </g>
    </svg>
  );
}
