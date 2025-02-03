import React from "react";

export default async function Programs() {
  return (
  <div id="programs" className="page">
    <div className="sm:px-20 md:px-40 lg:px-60 mb-8 sm:mb-16 flex flex-col gap-8">
    <div className="flex flex-col gap-1">
      <h2 className="border-b font-bold">Stay Connected</h2>
      <p>Join our <a href="https://waisi.org/discord" target="_blank">Discord community</a> for open discussion on AI safety topics, event announcements, and application deadline reminders.</p>
      <p>You can also follow our <a href="https://www.instagram.com/aisafetyuw/" target="_blank">Instagram</a> for these announcements.</p>
    </div>
    <div className="flex flex-col gap-2">
      <h2 className="border-b font-bold">AI Safety Fundamentals Programs</h2>
      <div className="flex flex-col gap-1">
        <p>Learn the basics of AI safety and how to prevent harm from AI systems. WAISI offers two intro tracks, focusing on technical and policy respectively. We recommend applying to the program you are most interested in. You can participate in both tracks simultaneously.</p>
        <p>Participants will meet every week for 8 weeks to read material, complete interactive activities, and participate in discussions. Each session runs for 2 hours, with at most 1 hour of preparation work assigned prior to each session. For full details, review the handbook <a href="https://docs.google.com/document/d/1nlA0I7yGo7e7tC6xS8kBQUuyil88xrYji5KPeyUPRwA/edit?usp=sharing" target="_blank">here.</a></p>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16"> */}
        <div>
          <h3 className="border-b">Technical Fundamentals</h3>
          <div className="flex flex-col gap-1">
            <p>The technical track of AI Safety Fundamentals is an eight-week research-oriented reading group on technical AI safety. Topics include reward specification, generalization, interpretability, unlearning, and career explorations. View last semester's curriculum <a href="https://colab.research.google.com/drive/1mAv04ekDL52WQNEn49POV6YfSikP9bIc" target="_blank">here.</a></p>
            <p>Students with machine learning experience are especially encouraged to apply, although <b>no prior experience is needed.</b></p>
            <b className="text-xl"><a href="https://docs.google.com/forms/d/e/1FAIpQLSdMtjkEGX2Y643_tsdvFsLVHHiLZSIkHbeJfkP6zZWpztfjSg/viewform?usp=dialog" target="_blank">Apply here by Friday, February 14th, 11:59 PM CST. →</a></b>
          </div>
        </div>
        <div>
          <h3 className="border-b">Policy Fundamentals</h3>
          <div className="flex flex-col gap-1">
            <p>
            The policy track of AI Safety Fundamentals is an eight-week reading group on the foundational governance and policy challenges posed by advanced AI systems. Topics include AI harms, economic and social impacts, responsible scaling policies, open vs. closed source AI, and career explorations. View last semester's curriculum <a href="https://docs.google.com/document/d/1A-4n6pU9AFk1p2EsOhuoHo2oYGbK-MYJ9NFWrsWw-FM/edit?usp=sharing">here</a>.
            </p>
            <p>
            Students with public policy background and/or career interest are especially encouraged to apply, although <b>no prior experience is needed</b>.
            </p>
            <b className="text-xl"><a href="https://docs.google.com/forms/d/e/1FAIpQLSe1IjXd0QfiWLTjgfhVbod1V-SOQULtMDUEV-76pTEZydryVw/viewform?usp=dialog" target="_blank">Apply here by Friday, February 14th, 11:59 PM CST. →</a></b>
          </div>
        </div>
      {/* </div> */}
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="border-b font-bold">Safety Scholars Programs</h2>
      <p>
      WAISI also runs Safety Scholars, our core group of members engaged in AI safety work. Members meet weekly to discuss a topic in either technical AI safety research or AI policy over a provided meal. Additional activities include skill-building in relevant career areas, professional networking, and first access to opportunities and projects. Learn more about the program by <a href="https://docs.google.com/document/d/1npT_7Svl_Gp10-BV8yusx6A90OokOflWFgCagKKU0G8/edit?usp=sharing" target="_blank">reading the handbook.</a>
      </p>
      <p>
      Applications are typically competitive, and are open towards the end of each semester. We are particularly looking for students who stood out in our intro programs, or graduate students interested in relevant work. If you believe you're a particularly strong applicant, feel free to send us an email at <a href="mailto:aisafetyuw@gmail.com">aisafetyuw@gmail.com</a>. 
      </p>
    </div>
    </div>
  </div>
  );
}