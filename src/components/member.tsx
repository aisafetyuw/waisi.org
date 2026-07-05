import Image from "next/image";
import { MemberProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Member({ member }: MemberProps) {
  return (
    <div className="member p-4" style={{ backgroundColor: "var(--bg-card)", borderRadius: "12px", boxShadow: "var(--shadow-card)" }}>
      <div className="flex space-x-4 items-start">
        <div className="flex-shrink-0">
          <Image
            src={`/leaders/${member.name.replaceAll(" ", "_").toLowerCase()}.webp`}
            alt={member.name}
            width={100}
            height={100}
            className=""
          />
        </div>
        <div>
          <div
            className="text-lg font-semibold"
            style={{
              color: "var(--text-heading)",
            }}
          >
            {member.name}
          </div>
          <div
            style={{
              color: "var(--text-primary)",
              opacity: 0.7,
            }}
          >
            {member.pronouns}
          </div>
          <div
            className="font-semibold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {member.role}
          </div>
          <div className="mt-1 flex items-center space-x-2">
            <a href={`mailto:${member.email}`}>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="hover:opacity-80 text-link"
              />
            </a>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="hover:opacity-80 text-link"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
