import { InferGetServerSidePropsType } from 'next';
import { getServerSideProps } from '@/app/about/getServerSideProps';
import { DISCORD_URL, SLACK_URL } from '@/constants';
import Member from '@/components/member';

export default function About(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div id="about" className="page">
      <h2>Our Mission</h2>
      <div id="mission">
        <p className="mb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <p className="mb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>
      <h2>Getting Started</h2>
      <div id="getting-started">
        <p className="mb-3">
          Looking to get involved? <b>Join our <a href={SLACK_URL}>Slack</a> and <a href={DISCORD_URL}>Discord</a> channels</b> to connect with
          other students and keep up with club announcements.
        </p>
        <p className="mb-3">
          Each semester, we host two introductory fellowships—one for those interested <b>AI alignment</b>, the other
          for those interested in <b>AI governance</b>.
          To keep up with all of our programming, take a look at our <a>events page</a>.
        </p>
      </div>
      <h2>Leadership Team</h2>
      <div>
        <ul id="team">
          {props.members.map(member => <Member member={member} />)}
        </ul>
      </div>
    </div>
  );
}