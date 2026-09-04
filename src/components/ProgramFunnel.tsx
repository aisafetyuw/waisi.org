import Link from "next/link";

// Upside-down trapezoid "funnel" for the Get involved section: the two
// fellowship tracks form the wide mouth, Technical Upskilling the middle,
// Safety Scholars the narrow end. One clip-path on the wrapper cuts the whole
// stack, so the outline is a single four-sided trapezoid; the thin gaps
// between full-width layers and the divider between the two top tracks are
// the page background showing through.
const FUNNEL_CLIP = "polygon(0% 0%, 100% 0%, 73% 100%, 27% 100%)";

// No flex-1 here: in the column stack it would override each layer's fixed
// height. The two top halves get their own flex-1 to split the row.
// `group` lets the label recolour on the layer's hover/press, matching the
// site-wide rule for clickable text (colour change, never an underline).
const layerLink =
  "group flex items-center justify-center transition-colors text-center";
const layerLabel =
  "font-serif text-base md:text-xl text-heading transition-colors group-hover:text-brand group-active:text-link-hover";

export default function ProgramFunnel() {
  return (
    <div
      className="flex flex-col gap-1 max-w-3xl mx-auto"
      style={{ clipPath: FUNNEL_CLIP }}
    >
      <div className="flex h-20 md:h-24">
        <Link
          href="/programs"
          className={`${layerLink} flex-1 bg-violet-100 hover:bg-violet-200 pl-[11%] pr-2`}
        >
          <span className={layerLabel}>Policy Fellowship</span>
        </Link>
        <div className="w-1 bg-page shrink-0" />
        <Link
          href="/programs"
          className={`${layerLink} flex-1 bg-violet-100 hover:bg-violet-200 pr-[11%] pl-2`}
        >
          <span className={layerLabel}>Technical Fellowship</span>
        </Link>
      </div>

      <Link
        href="/programs"
        className={`${layerLink} h-20 md:h-24 bg-violet-200 hover:bg-violet-300 px-[20%]`}
      >
        <span className={layerLabel}>Technical Upskilling</span>
      </Link>

      <Link
        href="/programs"
        className={`${layerLink} h-20 md:h-24 bg-violet-300 hover:bg-violet-400 px-[29%]`}
      >
        <span className={layerLabel}>Safety Scholars</span>
      </Link>
    </div>
  );
}
