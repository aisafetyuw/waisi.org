import '@fortawesome/fontawesome-svg-core/styles.css';
import Image from 'next/image';
import { MemberProps } from "@/types";

export default function Member({ member }: MemberProps) {
  return (
    <div className="member bg-gray-50 shadow-lg rounded-lg p-4 h-full transform transition-transform hover:scale-105">
      <div className="flex space-x-4 items-start">
        <div className="flex-shrink-0">
          <Image
            src={`/leaders/${member.name.replaceAll(' ', '_').toLowerCase()}.jpg`}
            alt={member.name}
            width={100}
            height={100}
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <div className="text-lg font-semibold">{member.name}</div>
          <div className="text-gray-500">{member.pronouns}</div>
          <div className="text-gray-700 font-semibold">{member.role}</div>
          <div className="mt-1 flex items-center space-x-2">
            <a href={`mailto:${member.email}`}>
              <i className="fa-solid fa-envelope text-gray-500 hover:text-gray-700"></i>
            </a>
            {member.linkedin &&
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin text-gray-500 hover:text-gray-700"></i>
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
