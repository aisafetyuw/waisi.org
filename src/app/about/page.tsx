import Member from "@/components/member";
import { MemberData } from "@/types";

export default function About() {
  const members: MemberData[] = []; // TODO populate

  return (
    <div id="about">
      <h2>Our Mission</h2>
      <div id="mission">
        <p>

        </p>
      </div>
      <h2>Getting Started</h2>
      <div id="getting-started">
        <p>
          
        </p>
      </div>
      <h2>Leadership Team</h2>
      <div id="team">
        {members.map(member => <Member member={member} />)}
      </div>
    </div>
  )
}