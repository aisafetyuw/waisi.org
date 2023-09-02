import AboutImage from "@/components/aboutimg";

export default function About() {
  return (
    <div id="about" className="page">
      <h2>Our Mission</h2>
      <div id="mission">
        <p className="mb-3">
          Founded in Spring 2023, the Wisconsin AI Safety Initiative aspires to serve as an incubator for high-impact
          careers promoting and facilitating the safe advancement of artificial intelligence.
          Meet our team <a href="/team">here</a>, and see our newly refined programs <a href="/programs">here</a>.
        </p>
        <AboutImage filename={'mission'} alt={'Our Mission'} />
      </div>
      <h2>Why AI Safety?</h2>
      <div>
        <h3>Exponential AI Advancement</h3>
        <p className="mb-3">
          The field of Artificial Intelligence (AI) has seen notable acceleration, fueled by the <a target="_blank" href="https://cset.georgetown.edu/publication/the-ai-triad-and-what-it-means-for-national-security-strategy/">
          triad of data availability, growing computational power, and algorithmic progress</a>. We’re already seeing some beneficial applications of AI in <a target="_blank" href="https://en.wikipedia.org/wiki/Artificial_intelligence_in_healthcare">healthcare</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/Seeing_AI">accessibility</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/Machine_translation">language translation</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/Advanced_driver-assistance_system">automotive safety</a>,
          and <a target="_blank" href="https://en.wikipedia.org/wiki/Artificial_intelligence_art">art creation</a>, to name just a few. The potential for economic growth
          has taken a large <a target="_blank" href="https://www.businessnewsdaily.com/9402-artificial-intelligence-business-trends.html">mindshare of the business world</a> while the potential
          for <a target="_blank" href="https://arxiv.org/pdf/2306.12001.pdf">catastrophic outcomes</a> has taken a <a target="_blank" href="https://www.vox.com/future-perfect/2023/8/18/23836362/ai-slow-down-poll-regulation">
          large mindshare of the population at large</a>. AI is already beginning to make many productive aspects of our lives easier, and we should not
          anticipate this trend to stop.
        </p>
        <p className="mb-3">
          Eventually, we should expect <a target="_blank" href="https://www.cold-takes.com/transformative-ai-timelines-part-1-of-4-what-kind-of-ai/#explosive-scientific-and-technological-advancement">AIs that will automate
          R&D (Research and Development) across many STEM-related areas</a>, even
          Artificial Intelligence, sparking feedback loops of intelligence growth. Extreme hypothetical versions of this are referred to
          as <a target="_blank" href="https://en.wikipedia.org/wiki/Technological_singularity">the Singularity</a>, where the hyperbolic growth of intelligence goes haywire within hours or days, but, beyond this case, one can
          easily see how the <a target="_blank" href="https://www.lesswrong.com/posts/HBxe6wdjxK239zajf/what-failure-looks-like">feedback cycles here gradually take humans more and more out of the loop and, without specific interventions,
          could get out of hand</a>.  

          And, in case you didn't know, <a target="_blank" href="https://www.cnn.com/videos/tv/2023/05/02/amanpour-leahy-ai.cnn#:~:text=Follow%20CNN-,AI%20Researcher%3A%20There%27s%20more%20regulation%20on%20selling%20sandwiches,on%20%27God%2Dlike%27%20tech&text=Conjecture%20CEO%20Connor%20Leahy%20warns,intelligence%20is%20not%20far%20away.">
          there is currently more governmental regulation for sandwiches than there is for artificial intelligence.</a>
        </p>
        <AboutImage filename={'advancement'} alt={'Exponential AI Advancement'} />
        <h3>This may be difficult to control</h3>
        <p className="mb-3">
          There exist no methods to comprehensively align AI to make it behave how we'd like in all circumstances. There are many technical reasons for this.
        </p>
        <ul className="mb-3 list-disc">
          <li className="ml-4">
            <a target="_blank" href="https://www.deepmind.com/blog/specification-gaming-the-flip-side-of-ai-ingenuity">Reward Specification</a>
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://deepmindsafetyresearch.medium.com/goal-misgeneralisation-why-correct-specifications-arent-enough-for-correct-goals-cf96ebc60924">Goal Misgeneralization</a>
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://arxiv.org/pdf/2110.11334.pdf">Out of Distribution Inputs</a>
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://neurips.cc/virtual/2021/poster/28400">Dangerous Instrumental Goals</a>
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://arxiv.org/abs/2304.11082">LLM Jailbreakability</a>
          </li>
        </ul>
        <p className="mb-3">
          Furthermore, AIs are currently <a target="_blank" href="https://en.wikipedia.org/wiki/Black_box">blackboxes</a> whose internals we
          don't understand. We know that they grow their learnings and internal schemas through the process of <a target="_blank" href="https://youtu.be/IHZwWFHWa-w?si=JhipFNH8hXMloXn1">gradient descent</a>, but we can't understand specifically
          what these schemes are and how subcomponents of the neural network contribute to the overall decision making process. 

          Solutions such as <a target="_blank" href="https://arxiv.org/abs/2211.03540">scalable model oversight</a> and <a target="_blank" href="https://www.alignmentforum.org/posts/vnocLyeWXcAxtdDnP/a-comprehensive-mechanistic-interpretability-explainer-and">mechanistic interpretability</a>
          are still in their infancy. Without these, we can't even know the extent of an AI's capabilities to try to be informed when we make regulatory decisions.
          We know what <a target="_blank" href="https://arxiv.org/pdf/2305.15324.pdf">dangerous capabilities</a> might look like, but how could we detect them?
        </p>
        <AboutImage filename={'control'} alt={'This may be difficult to control'} />
        <h3>What downsides do we face?</h3>
        <p className="mb-3">
          Already, the <b>negative ethical consequences</b> from such difficulties in AI engineering are present:
        </p>
        <ul className="mb-3 list-disc">
          <li className="ml-4">
            Bolstering <a target="_blank" href="https://www.forbes.com/sites/korihale/2021/09/02/ai-bias-caused-80-of-black-mortgage-applicants-to-be-denied/#:~:text=Specifically%2C%2080%25%20of%20Black%20applicants,bias%20hidden%20in%20mortgage%20algorithms%3F">systemic discrimination in housing</a>, <a target="_blank" href="https://www.hsph.harvard.edu/ecpe/how-to-prevent-algorithmic-bias-in-health-care/">healthcare</a>, and <a target="_blank" href="https://www.technologyreview.com/2020/07/17/1005396/predictive-policing-algorithms-racist-dismantled-machine-learning-bias-criminal-justice/">policing</a>
          </li>
          <li className="ml-4">
            Unintentional <a target="_blank" href="https://www.datagrail.io/blog/data-privacy/generative-ai-privacy-issues/#:~:text=Personal%20data%2C%20like%20names%2C%20addresses,or%20misuse%20of%20this%20information.">exposure of private user information</a>
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://www.cnn.com/2023/06/08/politics/desantis-campaign-video-fake-ai-image/index.html">Political deepfakes</a> and <a target="_blank" href="https://apnews.com/article/pentagon-explosion-misinformation-stock-market-ai-96f534c790872fde67012ee81b5ed6a4">misinformation</a>
          </li>
          <li className="ml-4">
            Fatal mistakes in <a target="_blank" href="https://www.washingtonpost.com/technology/2023/06/10/tesla-autopilot-crashes-elon-musk/">high stakes scenarios</a>
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://www.npr.org/2023/06/13/1181868277/how-ai-is-revolutionizing-how-governments-conduct-surveillance">Empowering surveillance capabilities</a> of oppressive regimes
          </li>
        </ul>
        <p className="mb-3">
          In the next 2-5 years as the technology gets more powerful, we can expect the scale of the negative effects from <b>human bad actor misuse</b> to get even larger:
        </p>
        <ul className="mb-3 list-disc">
          <li className="ml-4">
            Individually <a target="_blank" href="https://www.wired.com/story/generative-ai-custom-disinformation/">targeted misinformation</a> to one's preferences and biases
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://arxiv.org/ftp/arxiv/papers/2306/2306.03809.pdf">Engineering novel bioweapons</a> that could spark pandemics
          </li>
          <li className="ml-4">
            Launching <a target="_blank" href="https://thehackernews.com/2023/07/wormgpt-new-ai-tool-allows.html">larger scale cyberattacks</a> than ever before
          </li>
        </ul>
        <p className="mb-3">
          Longer term, we may need to worry about risks from <b>autonomous AI</b>:
        </p>
        <ul className="mb-3 list-disc">
          <li className="ml-4">
            <a target="_blank" href="https://arxiv.org/abs/2206.13353">Power Seeking AI</a> that attempts to take over the world as an <a target="_blank" href="https://drive.google.com/file/d/1KewDov1taegTzrqJ4uurmJ2CJ0Y72EU3/view">instrumental means</a> to better be able to pursue its goals
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://www.lesswrong.com/posts/zthDPAjh9w6Ytbeks/deceptive-alignment">Deceptive AI</a> that behaves well under human observation but pursues its true goals when let free
          </li>
        </ul>
        <AboutImage filename={'downsides'} alt={'What downsides do we face?'} />
        <h3>Let's take this seriously</h3>
        <p className="mb-4">
          We ought to take all of these downsides seriously, even the more hypothetical ones. They are a pretty clear and
          research grounded extrapolation of where AI technology will go. The leaders of the top AI companies agree and
          have signed on in agreement with the <a target="_blank" href="https://www.safe.ai/statement-on-ai-risk">Center for AI Safety's Statement on AI Risk</a> which reads: 
        </p>
        <p className="mb-4 text-xl text-gray-500">
          “Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war.”
        </p>
        <p className="mb-3">
          How the development of AI turns out will influence not just the next 25 years but likely the next 1,000,000. <b>Come
          join the Wisconsin AI Safety Initiative</b> and learn how to contribute to mitigating these risks and ensuring that AI is beneficial for all of us. 
          See our programming <a href="/programming">here</a>.
        </p>
        <AboutImage filename={'seriously'} alt={'We ought to take all of these downsides seriously'} />
        <h3>Other Introductory Resources</h3>
        <h4 className="mb-3 text-lg font-semibold">Readings</h4>
        <ul className="mb-3 list-disc">
          <li className="ml-4">
            <a target="_blank" href="https://80000hours.org/problem-profiles/artificial-intelligence/">Preventing an AI-related catastrophe</a> (Benjamin Hilton)
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://arxiv.org/pdf/2306.12001.pdf">An Overview of Catastrophic AI Risks</a> (Dan Hendrycks, Mantas Mazeika, Thomas Woodside)
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://arxiv.org/pdf/2209.00626.pdf">The alignment problem from a deep learning perspective</a> (Richard Ngo, Lawrence Chan, Sören Mindermann)
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://wp.nyu.edu/arg/why-ai-safety/">Why I Think More NLP Researchers Should Engage with AI Safety Concerns</a> (Samuel Bowman)
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://www.cold-takes.com/ai-safety-seems-hard-to-measure/">AI Safety Seems Hard to Measure</a> (Holden Karnofsky)
          </li>
        </ul>
        <h4 className="mb-3 text-lg font-semibold">Podcasts</h4>
        <ul className="mb-3 list-disc">
          <li className="ml-4">
            <a target="_blank" href="https://80000hours.org/podcast/episodes/rohin-shah-deepmind-doomers-and-doubters/">Rohin Shah</a> or <a target="_blank" href="https://80000hours.org/podcast/episodes/ben-garfinkel-classic-ai-risk-arguments/">Ben Garfinkel</a> on the <a target="_blank" href="https://80000hours.org/podcast/">80,000 Hours Podcast</a>
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://axrp.net/episode/2021/12/02/episode-12-ai-xrisk-paul-christiano.html">Paul Christiano</a> or <a target="_blank" href="https://axrp.net/episode/2022/03/31/episode-13-first-principles-agi-safety-richard-ngo.html">Richard Ngo</a> on the <a target="_blank" href="https://axrp.net/">AI X-risk Research Podcast</a>
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://www.youtube.com/watch?v=IKFQfYaJ0AY">Ajeya Cotra</a> or <a target="_blank" href="https://www.youtube.com/watch?v=mUhO6st6M_0">Neel Nanda</a> on the <a target="_blank" href="https://futureoflife.org/project/future-of-life-institute-podcast/">Future of Life Institute Podcast</a>
          </li>
          <li className="ml-4">
            <a target="_blank" href="https://www.youtube.com/watch?v=_kRg-ZP1vQc">Carl Shulman</a> on the <a target="_blank" href="https://podcasts.apple.com/podcast/dwarkesh-podcast-lunar-society-formerly/id1516093381">Dwarkesh Podcast</a>
          </li>
        </ul>
        <h4 className="mb-3 text-lg font-semibold">Video</h4>
        <ul className="mb-3 list-disc">
          <li className="ml-4">
            <b>Shorter</b>: <a target="_blank" href="https://youtu.be/pYXy-A4siMw?si=YO95mOdG06vzlj9R">Intro to AI Safety, Remastered</a>
          </li>
          <li className="ml-4">
            <b>Longer</b>: <a target="_blank" href="https://www.youtube.com/watch?v=yl2nlejBcg0&t=721s">Vael Gates: Researcher Perceptions of Current and Future AI</a>
          </li>
        </ul>
        <h4 className="mb-3 text-lg font-semibold">Books</h4>
        <ul className="mb-3 list-disc">
          <li className="ml-4">
            <i><a target="_blank" href="https://en.wikipedia.org/wiki/The_Alignment_Problem">The Alignment Problem</a></i> by Brain Christian
          </li>
          <li className="ml-4">
            <i><a target="_blank" href="https://en.wikipedia.org/wiki/Human_Compatible">Human Compatible</a></i> by Stuart Russell
          </li>
          <li className="ml-4">
            <i><a target="_blank" href="https://en.wikipedia.org/wiki/Superintelligence:_Paths,_Dangers,_Strategies">Superintelligence</a></i> by Nick Bostrom
          </li>
        </ul>
      </div>
    </div>
  );
}