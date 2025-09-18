import React from "react";
import Image from "next/image";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { INTEREST_URL, DISCORD_URL, INSTAGRAM_URL } from "@/constants";

export default async function Programs() {
  return (
  <div id="programs" className="page">
    <div className="px-4 sm:px-12 md:px-24 lg:px-32">
      <div className="flex flex-col xl:flex-row md:gap-8 lg:gap-16">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Image
                src="/about/Leaders.jpg"
                alt="WAISI students participating in a group discussion"
                width={792}
                height={891}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="w-full sm:w-1/2 h-auto rounded-lg shadow-lg bg-gray-50"
              />
              <Image
                src="/about/Scholars_1.jpg"
                alt="7 students learning about AI"
                width={792}
                height={891}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="w-full sm:w-1/2 h-auto rounded-lg shadow-lg bg-gray-50"
              />
            </div>
            <h2 className="border-b">Getting Involved</h2>
            <p className="text-lg">WAISI hosts speaker events and socials relevant to AI safety. To keep up to date, you can subscribe to our <a href={INTEREST_URL} target="_blank">mailing list</a>, join our <a href={DISCORD_URL} target="_blank">Discord community</a>, or follow our <a href={INSTAGRAM_URL} target="_blank">Instagram</a>.</p>
            <p className="text-lg">Want to get more involved? We run two main programs: <b>AI Safety Fundamentals</b> (our introductory programs) and <b>Safety Scholars</b> (our core membership groups). More details below.</p>
          </div>
          <div className="flex flex-col">
            <div>
            <div className="flex flex-col gap-2">
              <h2 className="border-b">AI Safety Fundamentals Programs</h2>
              <div className="flex flex-col gap-2">
                <p className="text-lg">Learn the basics of AI safety and how to prevent harm from AI systems in an eight-week reading group. WAISI offers two intro tracks, focusing on technical and policy respectively. Applications are open at the beginning of each semester, and we recommend applying to the program you are most interested in. You can participate in both tracks simultaneously.</p>
                <p className="text-lg">Participants meet every week to read material, complete interactive activities, and participate in discussions. Each session runs for 2 hours, with at most 1 hour of preparation work assigned prior to each session. For full details, review the handbook <a href="https://docs.google.com/document/d/1nlA0I7yGo7e7tC6xS8kBQUuyil88xrYji5KPeyUPRwA/edit?usp=sharing" target="_blank">here.</a></p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16">
                <div>
                  <h3 className="border-b">Technical Fundamentals</h3>
                  <div className="flex flex-col gap-2">
                    <p className="text-lg">The technical track of AI Safety Fundamentals is an eight-week research-oriented reading group on technical AI safety. Topics include reward specification, generalization, interpretability, unlearning, and career explorations.
                    </p>
                    {/* <p className="text-lg">
                      View last semester's curriculum <a href="https://colab.research.google.com/drive/1mAv04ekDL52WQNEn49POV6YfSikP9bIc" target="_blank">here.</a>
                    </p> */}
                    <p className="text-lg">
                      Our technical curriculum is based on <a href="https://course.aisafetyfundamentals.com/alignment" target="_blank">this course</a>. 
                    </p>
                    <p className="text-lg">Students with machine learning experience are especially encouraged to apply, although <b>no prior experience is needed.</b></p>
                    <b className="text-xl"><a href="https://forms.gle/pPn5idt81BEDH8bG8" target="_blank">Apply here by this Sunday, September 21st, 11:59 PM CST. →</a></b>
                  </div>
                </div>
                <div>
                  <h3 className="border-b">Policy Fundamentals</h3>
                  <div className="flex flex-col gap-2">
                    <p className="text-lg">
                      The policy track of AI Safety Fundamentals is an eight-week reading group on the foundational governance and policy challenges posed by advanced AI systems. Topics include AI harms, economic and social impacts, responsible scaling policies, open vs. closed source AI, and career explorations.
                    </p>
                    {/* <p className="text-lg">
                      View last semester's curriculum <a href="https://docs.google.com/document/d/1A-4n6pU9AFk1p2EsOhuoHo2oYGbK-MYJ9NFWrsWw-FM/edit?usp=sharing">here</a>.
                    </p> */}
                    <p className="text-lg">
                      Our policy curriculum is based on <a href="https://course.aisafetyfundamentals.com/governance" target="_blank">this course</a>. 
                    </p>
                    <p className="text-lg">
                    Students with public policy background and/or career interest are especially encouraged to apply, although <b>no prior experience is needed</b>.
                    </p>
                    <b className="text-xl"><a href="https://forms.gle/bcRimCCmg7F3uEaS9" target="_blank">Apply here by Sunday, February 21st, 11:59 PM CST. →</a></b>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="border-b">Safety Scholars Programs</h2>
            <p className="text-lg">
            Safety Scholars are our core groups of members engaged in AI safety work. Members meet weekly to discuss topics in either technical AI safety or AI policy over a provided meal. Members also have access to office hours and co-working with our technical reseach team, participate in skill-building in relevant career areas, and get first access to opportunities and projects. Learn more about the program by <a href="https://docs.google.com/document/d/1npT_7Svl_Gp10-BV8yusx6A90OokOflWFgCagKKU0G8/edit?usp=sharing" target="_blank">reading the handbook.</a>
            </p>
            <p className="text-lg">
            If you are a graduate student interested in participating, send us an email at <a href="mailto:aisafetyuw@gmail.com">aisafetyuw@gmail.com</a> so you can shadow a Scholars session. If we think you are a good fit, we will invite you to join the program.
            </p>
            <p className="text-lg">
            If you are an undergraduate student interested in participating, we open applications for this program towards the end of each semester. We are particularly looking for students who stood out in our intro programs, or otherwise have a strong interest in and relevant background for AI safety work. If you believe you are a particularly strong applicant, send us an email.
            </p>
          </div>
        </div>
        <div className="mt-8 xl:mt-0 xl:w-full">
          <div className="top-8">
            <Zoom>
              <Image
                id="programs-img"
                src={`/spring-2023-programs.png`}
                alt="Infographic of WAISI's programs"
                width={648}
                height={972}
                className="rounded-lg shadow-lg bg-gray-50 p-2 w-full h-auto"
              />
            </Zoom>
            <p className="invisible xl:visible mt-2">Click on the image to expand it!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}