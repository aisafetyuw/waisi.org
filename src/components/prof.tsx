import { ProfProps } from "@/types";

export default function Professor({ name, link, focus, extra }: ProfProps) {
  return (
    <div
      className="member p-4 h-full bg-card border border-subtle rounded-card"
    >
      <div className="">
        <div className="text-lg font-semibold">
          <a
            href={link}
            target="_blank" rel="noopener noreferrer"
            className="hover:underline text-link no-underline"
          >
            {name}
          </a>
        </div>
        {extra && (
          <div className="mt-1 text-sm font-light text-primary">
            {extra}
          </div>
        )}
        <div className="mt-1 font-semibold text-primary">
          {focus}
        </div>
      </div>
    </div>
  );
}

