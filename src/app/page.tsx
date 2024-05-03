import { DISCORD_URL, INSTAGRAM_URL, TWITTER_URL, LINKEDIN_URL } from '@/constants';
import Button from '@/components/button';

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
          We first develop a <b>holistic understanding of the risks</b> and then build the skills to solve them with <b>technical safety research</b> and <b>policy frameworks</b>.
        </h3>
        <div id="buttons" className="py-2">
          <Button url={"/about"} text="About" />
          &nbsp;&nbsp;
          <Button url={"/programs"} text="Programs" />
          &nbsp;&nbsp;
          <Button url={DISCORD_URL} fa="discord" text="Discord" />
          &nbsp;&nbsp;
          <Button url={INSTAGRAM_URL} fa="instagram" text="Instagram" />
          &nbsp;&nbsp;
          <Button url={TWITTER_URL} fa="twitter" text="Twitter" />
          &nbsp;&nbsp;
          <Button url={LINKEDIN_URL} fa="linkedin" text="LinkedIn" />
        </div>
      </div>
    </div>
  )
}
