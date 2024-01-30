import { DISCORD_URL, TWITTER_URL } from '@/constants';
import Button from '@/components/button';
import Events from '@/components/events';
import AboutImage from '@/components/aboutImage';

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
        <div id="buttons" className="py-2">
          <Button url={"/about"} text="About" />
          &nbsp;&nbsp;
          <Button url={"/programs"} text="Programs" />
          &nbsp;&nbsp;
          <Button url={DISCORD_URL} fa="discord" text="Discord" />
          {/* &nbsp;&nbsp; */}
          {/* <Button url={TWITTER_URL} fa="twitter" text="Twitter" /> */}
        </div>
        <Events />
      </div>
    </div>
  )
}

