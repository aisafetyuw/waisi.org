import Image from "next/image";
import { AlumnusProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Alumnus({ alumnus }: AlumnusProps) {
  return (
    <div className="alumnus h-full p-4 bg-card border border-subtle rounded-card">
      <div className="flex space-x-4 items-start">
        <div className="flex-shrink-0">
          <Image
            src={`/alumni/${alumnus.photo}.webp`}
            alt={alumnus.name}
            width={100}
            height={100}
          />
        </div>
        <div>
          <div className="text-lg font-semibold text-heading">
            {alumnus.name}
          </div>
          <div className="text-primary">{alumnus.role}</div>
          {alumnus.previously && (
            // <details> keeps this a server component and works without JS.
            <details className="group mt-1">
              <summary className="flex items-center gap-1.5 cursor-pointer list-none text-sm text-primary opacity-70 hover:opacity-100 [&::-webkit-details-marker]:hidden">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="w-2.5 transition-transform group-open:rotate-90"
                />
                Previously
              </summary>
              <div className="mt-1 text-sm text-primary opacity-70">
                {alumnus.previously}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
