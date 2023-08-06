import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image';
import { MemberProps } from "@/types";

export default function Member({ member }: MemberProps) {
  return (
    <div className="member bg-white shadow-md rounded-lg p-4 h-full">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={`/leaders/${member.name.replace(' ', '_').toLowerCase()}.jpeg`}
            alt={member.name}
            width={100}
            height={100}
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <div className="text-lg font-semibold">{member.name}</div>
          <div className="text-gray-500">{member.pronouns}</div>
          <div className="mt-3 flex items-center space-x-2">
            <a href={`mailto:${member.email}`}>
              <FontAwesomeIcon icon={['fas', 'envelope']} className="text-gray-500" />
            </a>
            {member.linkedin &&
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={['fab', 'linkedin']} className="text-gray-500" />
              </a>
            }
            {member.twitter &&
              <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={['fab', 'twitter']} className="text-gray-500" />
              </a>
            }
          </div>
        </div>
      </div>
      <div className="mt-3">
        <p>{member.description}</p>
      </div>
    </div>
  );
}
