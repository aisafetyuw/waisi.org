import Link from "next/link";

// Upside-down trapezoid "funnel" for the Get involved section: the two
// fundamentals tracks form the wide mouth, Technical Upskilling the middle,
// Safety Scholars the narrow end. Each layer's clip-path continues the
// previous layer's slant (9% inset per layer) so the stack reads as one
// tapering shape; the 4px column gap and the white divider between the two
// top tracks are the page background showing through.
const LAYER_CLIPS = [
  "polygon(0% 0%, 100% 0%, 91% 100%, 9% 100%)",
  "polygon(9% 0%, 91% 0%, 82% 100%, 18% 100%)",
  "polygon(18% 0%, 82% 0%, 73% 100%, 27% 100%)",
];

const layerLink =
  "flex-1 flex items-center justify-center transition-colors text-center";
const layerLabel = "font-serif text-base md:text-xl text-heading";

export default function ProgramFunnel() {
  return (
    <div className="flex flex-col gap-1 max-w-3xl mx-auto">
      <div
        className="flex h-20 md:h-24"
        style={{ clipPath: LAYER_CLIPS[0] }}
      >
        <Link
          href="/programs"
          className={`${layerLink} bg-violet-100 hover:bg-violet-200 pl-[11%] pr-2`}
        >
          <span className={layerLabel}>Policy Fundamentals</span>
        </Link>
        <div className="w-1 bg-page shrink-0" />
        <Link
          href="/programs"
          className={`${layerLink} bg-violet-100 hover:bg-violet-200 pr-[11%] pl-2`}
        >
          <span className={layerLabel}>Technical Fundamentals</span>
        </Link>
      </div>

      <Link
        href="/programs"
        className={`${layerLink} h-20 md:h-24 bg-violet-200 hover:bg-violet-300 px-[20%]`}
        style={{ clipPath: LAYER_CLIPS[1] }}
      >
        <span className={layerLabel}>Technical Upskilling</span>
      </Link>

      <Link
        href="/programs"
        className={`${layerLink} h-20 md:h-24 bg-violet-300 hover:bg-violet-400 px-[29%]`}
        style={{ clipPath: LAYER_CLIPS[2] }}
      >
        <span className={layerLabel}>Safety Scholars</span>
      </Link>
    </div>
  );
}
