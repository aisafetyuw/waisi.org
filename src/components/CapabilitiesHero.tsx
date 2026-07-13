// Hero illustration: a METR-style "time horizon" capabilities chart — task
// length AI can complete vs. model release date, exponential trend — drawn as
// a mountain slope with a climber ascending it. Pure static SVG, styled to
// the editorial token system (hairlines, mono labels, violet accent).

const Y_LABELS = [
  { y: 380, label: "5 sec" },
  { y: 316, label: "1 min" },
  { y: 252, label: "15 min" },
  { y: 188, label: "2 hrs" },
  { y: 124, label: "1 day" },
  { y: 60, label: "1 week" },
];

const X_LABELS = [
  { x: 80, label: "2019" },
  { x: 192, label: "2021" },
  { x: 304, label: "2023" },
  { x: 416, label: "2025" },
  { x: 528, label: "2027" },
];

// Model milestones sitting on the curve.
const MODELS = [
  { x: 96, y: 366, label: "GPT-2", anchor: "start" },
  { x: 168, y: 350, label: "GPT-3", anchor: "start" },
  { x: 300, y: 292, label: "GPT-4", anchor: "start" },
  { x: 380, y: 216, label: "o1", anchor: "start" },
  { x: 428, y: 152, label: "Claude 4", anchor: "end" },
];

export default function CapabilitiesHero() {
  return (
    <svg
      viewBox="0 0 600 440"
      role="img"
      aria-label="Chart of AI task time horizons growing exponentially with model release dates, with a climber ascending the curve"
      className="w-full h-auto max-w-[620px]"
    >
      {/* faint horizontal gridlines */}
      {Y_LABELS.map(({ y }) => (
        <line
          key={y}
          x1="72"
          y1={y}
          x2="552"
          y2={y}
          stroke="var(--border-subtle)"
          strokeWidth="1"
        />
      ))}

      {/* axes */}
      <line x1="72" y1="24" x2="72" y2="388" stroke="var(--text-primary)" strokeWidth="1" />
      <line x1="72" y1="388" x2="552" y2="388" stroke="var(--text-primary)" strokeWidth="1" />

      {/* y labels */}
      {Y_LABELS.map(({ y, label }) => (
        <text
          key={label}
          x="64"
          y={y + 3}
          textAnchor="end"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          fill="var(--text-primary)"
          opacity="0.55"
        >
          {label}
        </text>
      ))}

      {/* x labels */}
      {X_LABELS.map(({ x, label }) => (
        <text
          key={label}
          x={x}
          y="406"
          textAnchor="middle"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          fill="var(--text-primary)"
          opacity="0.55"
        >
          {label}
        </text>
      ))}

      {/* axis titles */}
      <text
        x="30"
        y="206"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        fill="var(--text-primary)"
        opacity="0.55"
        transform="rotate(-90 30 206)"
        textAnchor="middle"
      >
        task length AI can complete
      </text>
      <text
        x="312"
        y="430"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        fill="var(--text-primary)"
        opacity="0.55"
        textAnchor="middle"
      >
        model release date
      </text>

      {/* mountain fill under the curve */}
      <path
        d="M 80 372 C 180 356, 260 320, 330 264 C 390 216, 430 160, 458 108 L 458 388 L 80 388 Z"
        fill="var(--text-link)"
        opacity="0.06"
      />

      {/* the climbed curve */}
      <path
        d="M 80 372 C 180 356, 260 320, 330 264 C 390 216, 430 160, 458 108"
        fill="none"
        stroke="var(--text-link)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* the unclimbed stretch — dashed, heading off the chart */}
      <path
        d="M 458 108 C 478 72, 494 48, 508 28"
        fill="none"
        stroke="var(--text-link)"
        strokeWidth="2"
        strokeDasharray="2 6"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* model milestone dots */}
      {MODELS.map(({ x, y, label, anchor }) => (
        <g key={label}>
          <circle cx={x} cy={y} r="3.5" fill="var(--text-link)" />
          <text
            x={anchor === "end" ? x - 9 : x + 9}
            y={y + 4}
            textAnchor={anchor as "start" | "end"}
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            fill="var(--text-primary)"
            opacity="0.75"
          >
            {label}
          </text>
        </g>
      ))}

      {/* the climber, ascending just past the last milestone */}
      <g
        transform="translate(452 96) rotate(24)"
        stroke="var(--text-heading)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      >
        {/* head */}
        <circle cx="0" cy="-13" r="4" fill="var(--text-heading)" stroke="none" />
        {/* torso, leaning into the slope */}
        <path d="M 0 -9 L -3 2" />
        {/* rear leg planted, front leg stepping up */}
        <path d="M -3 2 L -8 11" />
        <path d="M -3 2 L 3 8 L 4 13" />
        {/* trailing arm, and leading arm planting an axe uphill */}
        <path d="M -1 -6 L -8 0" />
        <path d="M -1 -6 L 7 -9" />
        {/* ice axe */}
        <path d="M 7 -9 L 11 -3" strokeWidth="1.6" />
      </g>
    </svg>
  );
}
