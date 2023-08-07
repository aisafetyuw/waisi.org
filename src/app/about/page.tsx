import { DISCORD_URL, SLACK_URL } from '@/constants';
import Member from '@/components/member';
import getMembers from '@/app/about/getMembers';

export default async function About() {
  const members = await getMembers();

  return (
    <div id="about" className="page">
      <h2>Our Mission</h2>
      <div id="mission">
        <p className="mb-3">
          Founded in the spring of 2023, the <b>Wisconsin AI Safety Initiative</b> aspires to serve as an incubator for
          students looking towards high-impact careers promoting and facilitating the safe advancement of artificial intelligence.
          Along with this comes providing members with venues to <b>learn</b> about cutting edge developments in the field of
          AI safety, <b>connect</b> with other like-minded individuals (both students and professionals), and <b>upskill</b> via project
          opportunities to gain a deep, holistic understanding of alignment research and AI interpretability and/or
          prepare for careers in governance promoting thorough and just regulation of AI and related technologies.
        </p>
      </div>
      <h2>Getting Started</h2>
      <div id="getting-started">
        <p className="mb-3">
          Looking to get involved? <b>Join our <a href={DISCORD_URL}>Discord channel</a></b> to
          get connected with us and keep up with club announcements.
        </p>
        <p className="mb-3">
          Each semester, we host two introductory fellowships—one for those interested in <b>AI alignment</b>, the other
          for those interested in <b>AI governance</b>. Stay tuned for updates pertaining to Fall 2023!
          {/*To keep up with all of our programming, take a look at our <a href="/events">events page</a>.*/}
        </p>
      </div>
      <h2>Leadership Team</h2>
      <div className="mb-3">
        <ul id="team" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1">
          {members.map((member, index) => (
            <li key={index} className="col-span-1 h-full bg-white">
              <Member member={member} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}