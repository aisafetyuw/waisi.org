import JoinButton from '@/components/joinButton';
import { DISCORD_URL, SLACK_URL, WIN_URL } from '@/urls';

export default function Home() {
  return (
    <div id="home">
      <h1>Wisconsin AI Safety Initiative</h1>
      <div id="home-content">
        <img alt="Wisconsin AI Safety Initiative" src="/images/placeholder.png" height={128} />
        <main>
          We are a very ambitious but friendly group interested in building a community of people
          collaborating together to mitigate the risks that increasingly capable <b>Artificial Intelligence</b> brings
          to the world.
        </main>
        <p>
          We refine each other's mental models of the risks and build the skills to solve them through <b>AI Alignment</b> and <b>AI Governance.</b>
        </p>
        <div id="join-buttons">
          <JoinButton url={SLACK_URL} fa="slack" text="Slack" />
          <JoinButton url={DISCORD_URL} fa="discord" text="Discord" />
          <JoinButton url={WIN_URL} text="WIN" />
        </div>
      </div>
    </div>
  )
}
