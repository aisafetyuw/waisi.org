import '@fortawesome/fontawesome-svg-core/styles.css';
import Image from 'next/image';
import { MemberProps } from "@/types";

export default function Member({ member }: MemberProps) {
  return (
    <div className="member p-4 h-full" style={{backgroundColor: '#F7F0E6'}}>
      <div className="flex space-x-4 items-start">
        <div className="flex-shrink-0">
          <Image
            src={`/leaders/${member.name.replaceAll(' ', '_').toLowerCase()}.jpg`}
            alt={member.name}
            width={100}
            height={100}
            className=""
          />
        </div>
        <div>
          <div className="text-lg font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>{member.name}</div>
          <div style={{color: '#2D2A26', opacity: 0.7, fontFamily: '"DM Serif Display", serif'}}>{member.pronouns}</div>
          <div className="font-semibold" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>{member.role}</div>
          <div className="mt-1 flex items-center space-x-2">
            <a href={`mailto:${member.email}`}>
              <i className="fa-solid fa-envelope hover:opacity-80" style={{color: '#8B5CF6'}}></i>
            </a>
            {member.linkedin &&
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin hover:opacity-80" style={{color: '#8B5CF6'}}></i>
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
