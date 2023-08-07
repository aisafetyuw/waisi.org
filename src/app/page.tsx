import { DISCORD_URL, WIN_URL } from '@/constants';
import JoinButton from '@/components/joinButton';

export default function Home() {
  return (
    <div id="home" className="page">
      <h1 className="text-gradient text-5xl font-extrabold py-4">Wisconsin AI Safety Initiative</h1>
      <div id="home-content">
        <main>
          <h3 className="mb-4">
            We're a community aiming to <b>mitigate the risks</b> that increasingly capable <b>artificial intelligence</b> brings to the world.
          </h3>
        </main>
        <h3 className="mb-4">
          We refine each other's mental models of the risks and build the skills to solve them through <b>AI alignment</b> and <b>AI governance.</b>
        </p>
        <div id="join-buttons" className="py-2">
          <JoinButton url={WIN_URL} text="WIN" />
          &nbsp;&nbsp;
          <JoinButton url={DISCORD_URL} fa="discord" text="Discord" />
        </div>
      </div>
    </div>
  )
}
