import { Opportunity } from "@/content/home";

export default function OpportunityCard({
  opportunity,
  className = "",
}: {
  opportunity: Opportunity;
  className?: string;
}) {
  return (
    <a
      href="/programs"
      className={`flex flex-col gap-2 p-6 relative cursor-pointer bg-card-alt rounded-card shadow-card no-underline ${className}`}
    >
      <h3 className="text-2xl font-semibold text-heading">
        {opportunity.title}
      </h3>
      <p className="text-lg text-primary">{opportunity.description}</p>
      <p className="text-lg font-semibold mt-2 text-link">
        Click to learn more
      </p>
    </a>
  );
}
