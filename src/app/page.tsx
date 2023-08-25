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
          We first develop a <b>holistic understanding of the risks</b> and then build the skills to solve them in <b>AI alignment</b> and <b>AI governance.</b>
        </h3>
        <div id="join-buttons" className="py-2">
          <JoinButton url={"/about"} text="About" />
          &nbsp;&nbsp;
          {/*<JoinButton url={"/programming"} text="Programming" />*/}
          {/*&nbsp;&nbsp;*/}
          <JoinButton url={DISCORD_URL} fa="discord" text="Discord" />
          &nbsp;&nbsp;
          <JoinButton url={WIN_URL} text="WIN" />
        </div>
      </div>
    </div>
  )
}
