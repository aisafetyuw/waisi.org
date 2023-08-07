import { DISCORD_URL, SLACK_URL, WIN_URL } from '@/constants';
import JoinButton from '@/components/joinButton';

export default function Home() {
  return (
    <div id="home" className="page">
      <h1>Wisconsin AI Safety Initiative</h1>
      <div id="home-content">
        <main>
          <p className="mb-3">
            We are a very ambitious but friendly group interested in building a community of people
            collaborating together to mitigate the risks that increasingly capable <b>artificial intelligence</b> brings
            to the world.
          </p>
        </main>
        <p className="mb-3">
          We refine each other's mental models of the risks and build the skills to solve them through <b>AI alignment</b> and <b>AI governance.</b>
        </p>
        <div id="join-buttons">
          <JoinButton url={WIN_URL} text="WIN" />
          &nbsp;&nbsp;
          <JoinButton url={DISCORD_URL} fa="discord" text="Discord" />
        </div>
      </div>
    </div>
  )
}
