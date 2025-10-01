import Member from '@/components/member';
import getMembers from '@/app/team/getMembers';

export default async function Team() {
  const members = await getMembers();
  
  return (
    <div id="team" className="-mx-10" style={{marginLeft: '-40px', marginRight: '-40px', backgroundColor: '#FFF9F0'}}>
      <div className="px-16 pt-8 pb-16">
        <h2 className="text-3xl font-semibold mb-6" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"DM Serif Display", serif'}}>Leadership Team</h2>
        <h3 className="text-2xl font-semibold mb-4" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Community Builders</h3>
        <ul id="team-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1 mb-8">
        {members.filter(member => member.team == '0').map((member, index) => (
          <li key={index} className="col-span-1 h-full">
            <Member member={member} />
          </li>
        ))}
        </ul>
        <h3 className="text-2xl font-semibold mb-4" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Research Team</h3>
        <ul id="team-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1 mb-8">
        {members.filter(member => member.team === '3').map((member, index) => (
          <li key={index} className="col-span-1 h-full">
            <Member member={member} />
          </li>
        ))}
        </ul>
        <h3 className="text-2xl font-semibold mb-4" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Technical Team</h3>
        <ul id="team-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1 mb-8">
        {members.filter(member => member.team == '1').map((member, index) => (
            <li key={index} className="col-span-1 h-full">
                <Member member={member} />
            </li>
        ))}
        </ul>
        <h3 className="text-2xl font-semibold mb-4" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Policy Team</h3>
        <ul id="team-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1">
        {members.filter(member => member.team == '2').map((member, index) => (
            <li key={index} className="col-span-1 h-full">
                <Member member={member} />
            </li>
        ))}
        </ul>
      </div>
    </div>
  );
}