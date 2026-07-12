"use client";

import { useEffect, useRef } from "react";

// Full-page background texture: a heatmap of simulated GPT-1-style weight
// magnitudes (block-structured Gaussian noise), rendered once to a small
// canvas and tiled. Recolored to the paper palette so it reads as a faint
// texture, never competing with content. Inspired by weights.press.

// Deterministic PRNG so the texture is identical on every visit.
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function boxMuller(rng: () => number) {
  let u1 = rng();
  while (u1 === 0) u1 = rng();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * rng());
}

// Paper-palette colormap: bg-page → warm gray → faint violet. Kept extremely
// low-contrast on purpose ("non-impeding").
const COLORMAP: [number, number, number, number][] = [
  [0.0, 250, 249, 247], // --bg-page
  [0.55, 248, 246, 243],
  [0.8, 245, 242, 238],
  [0.93, 243, 239, 243],
  [1.0, 237, 232, 245], // faint violet, rare peaks
];

function getColor(t: number): [number, number, number] {
  t = Math.max(0, Math.min(1, t));
  for (let i = 0; i < COLORMAP.length - 1; i++) {
    if (t <= COLORMAP[i + 1][0]) {
      const f =
        (t - COLORMAP[i][0]) / (COLORMAP[i + 1][0] - COLORMAP[i][0]);
      return [
        COLORMAP[i][1] + f * (COLORMAP[i + 1][1] - COLORMAP[i][1]),
        COLORMAP[i][2] + f * (COLORMAP[i + 1][2] - COLORMAP[i][2]),
        COLORMAP[i][3] + f * (COLORMAP[i + 1][3] - COLORMAP[i][3]),
      ];
    }
  }
  const last = COLORMAP[COLORMAP.length - 1];
  return [last[1], last[2], last[3]];
}

function generateHeatmapDataURL(
  width: number,
  height: number,
  seed: number,
): string {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(width, height);
  const d = img.data;

  // Per-block magnitudes give the texture its "weight matrix" structure.
  const bs = Math.max(4, Math.floor(Math.min(width, height) / 20));
  const bx = Math.ceil(width / bs);
  const by = Math.ceil(height / bs);
  const mags = new Float32Array(bx * by);
  const magRng = mulberry32(seed + 777);
  for (let i = 0; i < mags.length; i++) {
    mags[i] = 0.01 + magRng() * magRng() * 0.25;
  }

  const rng = mulberry32(seed);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const mag = mags[Math.floor(y / bs) * bx + Math.floor(x / bs)];
      const val = boxMuller(rng) * mag;
      const t = Math.sqrt(Math.min(Math.abs(val) / 0.2, 1));
      const [r, g, b] = getColor(t);
      const i = (y * width + x) * 4;
      d[i] = r;
      d[i + 1] = g;
      d[i + 2] = b;
      d[i + 3] = 255;
    }
  }

  // Blend the right edge into the left so the horizontal tiling is seamless.
  const blend = Math.floor(width * 0.1);
  for (let y = 0; y < height; y++) {
    for (let j = 0; j < blend; j++) {
      const f = j / blend;
      const ri = (y * width + (width - blend + j)) * 4;
      const li = (y * width + j) * 4;
      d[ri] = d[ri] * (1 - f) + d[li] * f;
      d[ri + 1] = d[ri + 1] * (1 - f) + d[li + 1] * f;
      d[ri + 2] = d[ri + 2] * (1 - f) + d[li + 2] * f;
    }
  }

  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

export default function WeightsBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.backgroundImage = `url(${generateHeatmapDataURL(480, 240, 42)})`;
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="weights-bg fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
