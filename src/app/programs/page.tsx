import React from "react";
import Image from "next/image";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { INTEREST_URL, DISCORD_URL, INSTAGRAM_URL } from "@/constants";

export default async function Programs() {
  return (
  <div id="programs" className="-mx-10" style={{marginLeft: '-40px', marginRight: '-40px', backgroundColor: '#FFF9F0'}}>
    <div className="px-8 py-8">
      <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <div>
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-semibold" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"Lora", serif'}}>AI Safety Fundamentals Programs</h2>
              <div className="flex flex-col gap-3">
                <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>Learn the basics of AI safety and how to prevent harm from AI systems in an eight-week reading group. WAISI offers two intro tracks, focusing on technical and policy respectively. Applications are open at the beginning of each semester, and we recommend applying to the program you are most interested in. You can participate in both tracks simultaneously.</p>
                <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>Participants meet every week to read material, complete interactive activities, and participate in discussions. Each session runs for 2 hours, with at most 1 hour of preparation work assigned prior to each session. For full details, review the handbook <a href="https://docs.google.com/document/d/1nlA0I7yGo7e7tC6xS8kBQUuyil88xrYji5KPeyUPRwA/edit?usp=sharing" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">here.</a></p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div>
                  <h3 className="text-2xl font-semibold" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '4px', fontFamily: '"Lora", serif'}}>Technical Fundamentals</h3>
                  <div className="flex flex-col gap-3 mt-3">
                    <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>The technical track of AI Safety Fundamentals is an eight-week research-oriented reading group on technical AI safety. Topics include reward specification, generalization, interpretability, unlearning, and career explorations.
                    </p>
                    {/* <p className="text-lg">
                      View last semester's curriculum <a href="https://colab.research.google.com/drive/1mAv04ekDL52WQNEn49POV6YfSikP9bIc" target="_blank">here.</a>
                    </p> */}
                    <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
                      Our technical curriculum is based on <a href="https://course.aisafetyfundamentals.com/alignment" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">this course</a>.
                    </p>
                    <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>Students with machine learning experience are especially encouraged to apply, although <b style={{color: '#6B46C1'}}>no prior experience is needed.</b></p>
                    <p className="text-xl font-semibold" style={{color: '#6B46C1', fontFamily: '"Lora", serif'}}><a href="https://forms.gle/pPn5idt81BEDH8bG8" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Apply here by this Sunday, September 21st, 11:59 PM CST. →</a></p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <Zoom>
                    <Image
                      id="programs-img"
                      src={`/spring-2023-programs.png`}
                      alt="Infographic of WAISI's programs"
                      width={324}
                      height={486}
                      className="p-2 w-full h-auto max-w-sm" style={{backgroundColor: '#FFF9F0', border: '2px solid #E8DCC8'}}
                    />
                  </Zoom>
                  <p className="mt-2 text-center text-sm" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>Click to expand!</p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '4px', fontFamily: '"Lora", serif'}}>Policy Fundamentals</h3>
                  <div className="flex flex-col gap-3 mt-3">
                    <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
                      The policy track of AI Safety Fundamentals is an eight-week reading group on the foundational governance and policy challenges posed by advanced AI systems. Topics include AI harms, economic and social impacts, responsible scaling policies, open vs. closed source AI, and career explorations.
                    </p>
                    {/* <p className="text-lg">
                      View last semester's curriculum <a href="https://docs.google.com/document/d/1A-4n6pU9AFk1p2EsOhuoHo2oYGbK-MYJ9NFWrsWw-FM/edit?usp=sharing">here</a>.
                    </p> */}
                    <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
                      Our policy curriculum is based on <a href="https://course.aisafetyfundamentals.com/governance" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">this course</a>.
                    </p>
                    <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
                    Students with public policy background and/or career interest are especially encouraged to apply, although <b style={{color: '#6B46C1'}}>no prior experience is needed</b>.
                    </p>
                    <p className="text-xl font-semibold" style={{color: '#6B46C1', fontFamily: '"Lora", serif'}}><a href="https://forms.gle/bcRimCCmg7F3uEaS9" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Apply here by Sunday, February 21st, 11:59 PM CST. →</a></p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold" style={{color: '#6B46C1', borderBottom: '2px solid #E8DCC8', paddingBottom: '8px', fontFamily: '"Lora", serif'}}>Safety Scholars Programs</h2>
            <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
            Safety Scholars are our core groups of members engaged in AI safety work. Members meet weekly to discuss topics in either technical AI safety or AI policy over a provided meal. Members also have access to office hours and co-working with our technical reseach team, participate in skill-building in relevant career areas, and get first access to opportunities and projects. Learn more about the program by <a href="https://docs.google.com/document/d/1npT_7Svl_Gp10-BV8yusx6A90OokOflWFgCagKKU0G8/edit?usp=sharing" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">reading the handbook.</a>
            </p>
            <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
            If you are a graduate student interested in participating, send us an email at <a href="mailto:aisafetyuw@gmail.com" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">aisafetyuw@gmail.com</a> so you can shadow a Scholars session. If we think you are a good fit, we will invite you to join the program.
            </p>
            <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>
            If you are an undergraduate student interested in participating, we open applications for this program towards the end of each semester. We are particularly looking for students who stood out in our intro programs, or otherwise have a strong interest in and relevant background for AI safety work. If you believe you are a particularly strong applicant, send us an email.
            </p>
        </div>
      </div>
    </div>
  </div>
  );
}