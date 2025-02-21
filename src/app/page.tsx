import { INTEREST_URL, DISCORD_URL, INSTAGRAM_URL, TWITTER_URL, LINKEDIN_URL } from '@/constants';
import Button from '@/components/button';

export default function Home() {
  return (
    <div id="home" className="page">
      <div className="flex flex-col py-4">
        <h1 className="text-4xl md:text-6xl" >
          We're a group of UW-Madison students building skills to{' '}
          <span className="text-gradient inline">reduce risks from advanced AI.</span>
        </h1>
      </div>
      <div className="flex flex-col py-4 gap-4 w-full md:w-2/3 text-xl md:text-2xl">
      <Button url={INTEREST_URL} text="Join our mailing list →"/>
      {/* <Button url={"https://docs.google.com/forms/d/e/1FAIpQLSdMtjkEGX2Y643_tsdvFsLVHHiLZSIkHbeJfkP6zZWpztfjSg/viewform?usp=dialog"} text="Apply to our technical intro program →"/>
      <Button url={"https://docs.google.com/forms/d/e/1FAIpQLSe1IjXd0QfiWLTjgfhVbod1V-SOQULtMDUEV-76pTEZydryVw/viewform?usp=dialog"} text="Apply to our policy intro program →"/> */}
      </div>
      <div id="home-content">
        <div className="flex flex-col py-4">
        <h3 className="text-xl">
        At the Wisconsin AI Safety Initiative (WAISI), we think that reducing risks from advanced artificial intelligence may be one of the most important problems of our time. It's a challenge that spans technical research, policy, and ethics — and we're bringing people together to work on it.
        </h3>
        <h3 className="text-xl">
        We run semester-long introductory programs on AI safety, including a technical and policy track. <a href="/programs" className="underline">Learn more here.</a>
        </h3>
        <h3 className="text-xl">
        We also host Safety Scholars, our core group of members. Scholars meet weekly to discuss a relevant research paper over a provided meal, and often go on to work on relevant projects. <a href="/programs" className="underline">Learn more here.</a>
        </h3>
        </div>
        {/* <div id="buttons" className="flex flex-wrap mb-8 gap-2">
          <Button url={"/about"} text="About" />
          <Button url={"/programs"} text="Programs" />
          <Button url={DISCORD_URL} fa="discord" text="Discord" />
          <Button url={INSTAGRAM_URL} fa="instagram" text="Instagram" />
          <Button url={TWITTER_URL} fa="twitter" text="Twitter" />
          <Button url={LINKEDIN_URL} fa="linkedin" text="LinkedIn" />
        </div> */}
      </div>
    </div>
  )
}
