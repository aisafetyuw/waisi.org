import React from "react";

export default async function Programs() {
  return (
  <div id="programs" className="-mx-10" style={{marginLeft: '-40px', marginRight: '-40px', backgroundColor: '#FFF9F0'}}>
    <div className="px-16 py-8 pb-16">
      <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <div>
            <div className="flex flex-col gap-4">
              <div className="max-w-6xl mx-auto mb-8 relative">
                {/* Top Row - AI Safety Fundamentals Programs (Centered) */}
                <div className="flex justify-center mb-16">
                  <div className="flex flex-col gap-2 p-6 w-full md:w-2/3 relative z-10" style={{backgroundColor: '#FFF9F0', border: '2px solid #E8DCC8'}}>
                    <h2 className="text-3xl font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>AI Safety Fundamentals Programs</h2>
                    <ul className="list-disc pl-5 text-lg space-y-2 mt-2" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                      <li>8-week reading group on AI safety fundamentals</li>
                      <li>Two tracks available: technical and policy (can participate in both simultaneously)</li>
                      <li>Applications open at the start of each semester</li>
                      <li>Weekly 2-hour sessions with readings, activities, and discussions</li>
                      <li>Maximum 1 hour of prep work before each session</li>
                      <li>Full details available in <a href="https://docs.google.com/document/d/1nlA0I7yGo7e7tC6xS8kBQUuyil88xrYji5KPeyUPRwA/edit?usp=sharing" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">program handbook</a></li>
                    </ul>
                  </div>
                </div>

                {/* Connection Lines */}
                <svg className="absolute hidden md:block" style={{top: '280px', left: '0', width: '100%', height: '140px', pointerEvents: 'none', zIndex: 0}}>
                  {/* Line from AI Safety Fundamentals to Technical */}
                  <line x1="50%" y1="0" x2="25%" y2="95%" stroke="#E8DCC8" strokeWidth="2" />
                  {/* Line from AI Safety Fundamentals to Policy */}
                  <line x1="50%" y1="0" x2="75%" y2="95%" stroke="#E8DCC8" strokeWidth="2" />
                </svg>

                {/* Bottom Row - Technical and Policy Fundamentals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Technical Fundamentals */}
                  <div className="flex flex-col gap-2 p-6 relative" style={{backgroundColor: '#F7F0E6', border: '2px solid #E8DCC8'}}>
                    <h3 className="text-2xl font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Technical Fundamentals</h3>
                    <ul className="list-disc pl-5 text-lg space-y-2" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                      <li><b style={{color: '#6B46C1'}}>Topics include:</b> reward specification, generalization, interpretability, unlearning, career explorations, and more</li>
                      <li>Curriculum based on the <a href="https://course.aisafetyfundamentals.com/alignment" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Bluedot Alignment Course</a></li>
                      <li>Machine learning experience encouraged but not required</li>
                    </ul>
                    <p className="text-xl font-semibold mt-2" style={{color: '#8B5CF6', fontFamily: '"DM Serif Display", serif'}}><a href="https://forms.gle/pPn5idt81BEDH8bG8" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Apply here by this Sunday, September 21st, 11:59 PM CST. →</a></p>
                  </div>

                  {/* Policy Fundamentals */}
                  <div className="flex flex-col gap-2 p-6 relative" style={{backgroundColor: '#F7F0E6', border: '2px solid #E8DCC8'}}>
                    <h3 className="text-2xl font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Policy Fundamentals</h3>
                    <ul className="list-disc pl-5 text-lg space-y-2" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                      <li><b style={{color: '#6B46C1'}}>Topics include:</b> AI harms, economic and social impacts, responsible scaling policies, open vs. closed source AI, career explorations, and more</li>
                      <li>Curriculum based on the <a href="https://course.aisafetyfundamentals.com/governance" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Bluedot Governance Course</a></li>
                      <li>Public policy background or career interest encouraged but not required</li>
                    </ul>
                    <p className="text-xl font-semibold mt-2" style={{color: '#8B5CF6', fontFamily: '"DM Serif Display", serif'}}><a href="https://forms.gle/bcRimCCmg7F3uEaS9" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">Apply here by Sunday, February 21st, 11:59 PM CST. →</a></p>
                  </div>
                </div>

                {/* Bottom Row - Safety Scholars Programs (Centered) */}
                <div className="flex justify-center mt-16">
                  <div className="flex flex-col gap-2 p-6 w-full md:w-2/3 relative z-10" style={{backgroundColor: '#F7F0E6', border: '2px solid #E8DCC8'}}>
                    <h2 className="text-3xl font-semibold" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif'}}>Safety Scholars Programs</h2>

                    <div className="flex flex-col gap-3 mt-2">
                      <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                        <b style={{color: '#6B46C1'}}>Core structure:</b> Weekly meetings to discuss either Technical or Policy based AI Safety topics
                      </p>

                      <div>
                        <p className="text-lg mb-2" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif', fontWeight: 'bold'}}>Member benefits:</p>
                        <ul className="list-disc pl-5 text-lg space-y-2" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                          <li>Office hours and co-working sessions with technical research team</li>
                          <li>Skill-building in relevant career areas</li>
                          <li>Priority access to opportunities and projects</li>
                          <li>Free meals provided at each meeting</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-lg mb-2" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif', fontWeight: 'bold'}}>Graduate students:</p>
                        <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                          Email <a href="mailto:aisafetyuw@gmail.com" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">aisafetyuw@gmail.com</a> to shadow a session. Invitations will be extended to good fits.
                        </p>
                      </div>

                      <div>
                        <p className="text-lg mb-2" style={{color: '#6B46C1', fontFamily: '"DM Serif Display", serif', fontWeight: 'bold'}}>Undergraduates:</p>
                        <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                          Applications open at the end of each semester. Priority is given to standout intro program participants or those with strong AI safety background and interest.
                        </p>
                      </div>

                      <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                        Strong applicants encouraged to reach out directly via email.
                      </p>

                      <p className="text-lg" style={{color: '#2D2A26', fontFamily: '"DM Serif Display", serif'}}>
                        Learn more about the program by <a href="https://docs.google.com/document/d/1npT_7Svl_Gp10-BV8yusx6A90OokOflWFgCagKKU0G8/edit?usp=sharing" target="_blank" style={{color: '#8B5CF6', textDecoration: 'none'}} className="hover:underline">reading the handbook.</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
}