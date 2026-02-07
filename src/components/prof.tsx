import { ProfProps } from "@/types";

export default function Professor({ name, link, focus, extra }: ProfProps) {
  return (
    <div
      className="transform transition-transform hover:scale-105 member p-4 h-full"
      style={{ backgroundColor: "var(--bg-card)", borderRadius: "12px", boxShadow: "var(--shadow-card)" }}
    >
      <div className="">
        <div className="text-lg font-semibold">
          <a
            href={link}
            target="_blank"
            className="hover:underline"
            style={{ color: "var(--text-link)", textDecoration: "none" }}
          >
            {name}
          </a>
        </div>
        {extra && (
          <div
            className="mt-1 text-sm font-light"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {extra}
          </div>
        )}
        <div className="mt-1 font-semibold" style={{ color: "var(--text-primary)" }}>
          {focus}
        </div>
      </div>
    </div>
  );
}

