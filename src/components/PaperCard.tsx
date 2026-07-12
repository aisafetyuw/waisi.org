import Image from "next/image";
import { PaperHighlight } from "@/content/home";

export default function PaperCard({ paper }: { paper: PaperHighlight }) {
  return (
    <div className="flex flex-col overflow-hidden bg-card border border-subtle rounded-card">
      <div className="relative w-full" style={{ height: "200px" }}>
        <Image src={paper.image} alt={paper.alt} fill className="object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-3 text-heading">
          {paper.title}
        </h3>
        <div className="mt-auto">
          <a
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold inline-block hover:underline text-link no-underline"
          >
            Read paper →
          </a>
        </div>
      </div>
    </div>
  );
}
