import Image from "next/image";
import { AlumnusProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

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
          {(alumnus.linkedin || alumnus.website) && (
            <div className="mt-1 flex items-center space-x-2">
              {alumnus.linkedin && (
                <a
                  href={alumnus.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${alumnus.name} on LinkedIn`}
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="hover:opacity-80 text-link"
                  />
                </a>
              )}
              {alumnus.website && (
                <a
                  href={alumnus.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${alumnus.name}'s website`}
                >
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="hover:opacity-80 text-link"
                  />
                </a>
              )}
            </div>
          )}
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
