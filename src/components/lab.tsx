import { LabProps } from "@/types";
import Image from "next/image";

export default function Lab(lab: LabProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" className="content-center lab" href={lab.link}>
        <Image
          src={`/labs/${lab.filename}`}
          alt={lab.name}
          height={100}
          width={100}
          className="transition-transform duration-300 ease-in-out hover:scale-110 filter hover:saturate-100 saturate-60 brightness-120"
        />
    </a>
  );
};