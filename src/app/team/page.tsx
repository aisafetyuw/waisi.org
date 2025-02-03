import Member from '@/components/member';
import getMembers from '@/app/team/getMembers';

export default async function Team() {
  const members = await getMembers();
  
  return (
    <div id="team" className="page">
      <h2>Leadership Team</h2>
      <h3>Community Builders</h3>
      <ul id="team-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1 mb-8">
        {members.filter(member => member.team == '0').map((member, index) => (
          <li key={index} className="col-span-1 h-full bg-white">
            <Member member={member} />
          </li>
        ))}
      </ul>
      <h3>Research Team</h3>
      <ul id="team-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1 mb-8">
        {members.filter(member => member.team === '3').map((member, index) => (
          <li key={index} className="col-span-1 h-full bg-white">
            <Member member={member} />
          </li>
        ))}
      </ul>
      <h3>Technical Team</h3>
      <ul id="team-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1 mb-8">
        {members.filter(member => member.team == '1').map((member, index) => (
            <li key={index} className="col-span-1 h-full bg-white">
                <Member member={member} />
            </li>
        ))}
      </ul>
      <h3>Policy Team</h3>
      <ul id="team-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1 mb-8">
        {members.filter(member => member.team == '2').map((member, index) => (
            <li key={index} className="col-span-1 h-full bg-white">
                <Member member={member} />
            </li>
        ))}
      </ul>
    </div>
  );
}