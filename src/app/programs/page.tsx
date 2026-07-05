import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "WAISI's semester programs: Technical Fundamentals, Policy Fundamentals, Technical Upskilling, and the Safety Scholars program.",
};

export default async function Programs() {
  return (
    <div
      id="programs"
      className="-mx-10"
      style={{
        marginLeft: "-40px",
        marginRight: "-40px",
        backgroundColor: "var(--bg-page)",
      }}
    >
      <div className="px-16 py-8 pb-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <div>
              <div className="flex flex-col gap-4">
                <div className="max-w-6xl mx-auto mb-8 relative">
                  {/* Top Row - AI Safety Fundamentals Programs (Centered) */}
                  <div className="flex justify-center mb-16">
                    <div
                      className="flex flex-col gap-2 p-6 w-full md:w-2/3 relative z-10"
                      style={{
                        backgroundColor: "var(--bg-page)",
                        borderRadius: "12px",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      <h2
                        className="text-3xl font-semibold"
                        style={{
                          color: "var(--text-heading)",
                          paddingBottom: "8px",
                        }}
                      >
                        AI Safety Fundamentals Programs
                      </h2>
                      <ul
                        className="list-disc pl-5 text-lg space-y-2 mt-2"
                        style={{
                          color: "var(--text-primary)",
                        }}
                      >
                        <li>8-week reading group on AI safety fundamentals</li>
                        <li>
                          Two tracks available: technical and policy (can
                          participate in both simultaneously)
                        </li>
                        <li>Applications open at the start of each semester</li>
                        <li>
                          Weekly 2-hour sessions with readings, activities, and
                          discussions
                        </li>
                        <li>Maximum 1 hour of prep work before each session</li>
                        <li>
                          Full details available in{" "}
                          <a
                            href="https://docs.google.com/document/d/1nlA0I7yGo7e7tC6xS8kBQUuyil88xrYji5KPeyUPRwA/edit?usp=sharing"
                            target="_blank" rel="noopener noreferrer"
                            style={{ color: "var(--text-link)", textDecoration: "none" }}
                            className="hover:underline"
                          >
                            program handbook
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Connection Lines */}
                  <svg
                    className="absolute hidden md:block"
                    style={{
                      top: "280px",
                      left: "0",
                      width: "100%",
                      height: "140px",
                      pointerEvents: "none",
                      zIndex: 0,
                    }}
                  >
                    {/* Line from AI Safety Fundamentals to Technical */}
                    <line
                      x1="50%"
                      y1="0"
                      x2="25%"
                      y2="95%"
                      stroke="var(--line-color)"
                      strokeWidth="2"
                    />
                    {/* Line from AI Safety Fundamentals to Policy */}
                    <line
                      x1="50%"
                      y1="0"
                      x2="75%"
                      y2="95%"
                      stroke="var(--line-color)"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* Bottom Row - Technical and Policy Fundamentals */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Technical Fundamentals */}
                    <div
                      className="flex flex-col gap-2 p-6 relative"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        borderRadius: "12px",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      <h3
                        className="text-2xl font-semibold"
                        style={{
                          color: "var(--text-heading)",
                          paddingBottom: "8px",
                        }}
                      >
                        Technical Fundamentals
                      </h3>
                      <ul
                        className="list-disc pl-5 text-lg space-y-2 mt-2"
                        style={{
                          color: "var(--text-primary)",
                        }}
                      >
                        <li>
                          <b style={{ color: "var(--text-heading)" }}>Topics include:</b>{" "}
                          reward specification, generalization,
                          interpretability, unlearning, career explorations, and
                          more
                        </li>
                        <li>
                          Curriculum based on the{" "}
                          <a
                            href="https://course.aisafetyfundamentals.com/alignment"
                            target="_blank" rel="noopener noreferrer"
                            style={{ color: "var(--text-link)", textDecoration: "none" }}
                            className="hover:underline"
                          >
                            Bluedot Alignment Course
                          </a>
                        </li>
                        <li>
                          Machine learning experience encouraged but not
                          required
                        </li>
                      </ul>
                      <p
                        className="text-lg mt-2"
                        style={{
                          color: "var(--text-primary)",
                        }}
                      >
                        Applications are due by February 23rd, 2026.{" "}
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLSdJ5rgafADd1JlnpmVoCd323XMUGOGzGreGWsmaLGF_3OvMMg/viewform?usp=header"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "var(--text-link)", textDecoration: "none" }}
                          className="hover:underline"
                        >
                          Apply here
                        </a>
                        .
                      </p>
                    </div>

                    {/* Policy Fundamentals */}
                    <div
                      className="flex flex-col gap-2 p-6 relative"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        borderRadius: "12px",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      <h3
                        className="text-2xl font-semibold"
                        style={{
                          color: "var(--text-heading)",
                          paddingBottom: "8px",
                        }}
                      >
                        Policy Fundamentals
                      </h3>
                      <ul
                        className="list-disc pl-5 text-lg space-y-2 mt-2"
                        style={{
                          color: "var(--text-primary)",
                        }}
                      >
                        <li>
                          <b style={{ color: "var(--text-heading)" }}>Topics include:</b> AI
                          harms, economic and social impacts, responsible
                          scaling policies, open vs. closed source AI, career
                          explorations, and more
                        </li>
                        <li>
                          Curriculum based on the{" "}
                          <a
                            href="https://course.aisafetyfundamentals.com/governance"
                            target="_blank" rel="noopener noreferrer"
                            style={{ color: "var(--text-link)", textDecoration: "none" }}
                            className="hover:underline"
                          >
                            Bluedot Governance Course
                          </a>
                        </li>
                        <li>
                          Public policy background or career interest encouraged
                          but not required
                        </li>
                      </ul>
                      <p
                        className="text-lg mt-2"
                        style={{
                          color: "var(--text-primary)",
                        }}
                      >
                        Applications are due by February 23rd, 2026.{" "}
                        <a
                          href="https://forms.gle/4fBTy2cFxuQECqz17"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "var(--text-link)", textDecoration: "none" }}
                          className="hover:underline"
                        >
                          Apply here
                        </a>
                        .
                      </p>
                    </div>
                  </div>

                  {/* Technical Upskilling Program (Centered) */}
                  <div className="flex justify-center mt-16">
                    <div
                      className="flex flex-col gap-2 p-6 w-full md:w-2/3 relative z-10"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        borderRadius: "12px",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      <h2
                        className="text-3xl font-semibold"
                        style={{
                          color: "var(--text-heading)",
                          paddingBottom: "8px",
                        }}
                      >
                        Technical Upskilling Program
                      </h2>

                      <div className="flex flex-col gap-3 mt-4">
                        <ul
                          className="list-disc pl-5 text-lg space-y-2"
                          style={{
                            color: "var(--text-primary)",
                          }}
                        >
                          <li>Build a strong foundational knowledge of machine learning</li>
                          <li>Receive a general overview of the major topics covered in AI Safety</li>
                          <li>Be well equipped with the knowledge necessary to participate effectively in technical scholars sessions</li>
                          <li>Receive a certificate of completion after completing the program in full</li>
                        </ul>

                        <div>
                          <p
                            className="text-lg mb-2"
                            style={{
                              color: "var(--text-heading)",
                              fontWeight: "bold",
                            }}
                          >
                            Additional info:
                          </p>
                          <p
                            className="text-lg"
                            style={{
                              color: "var(--text-primary)",
                            }}
                          >
                            <a
                              href="https://docs.google.com/document/d/16UH2uN-9Bu8DMiBNqYc1LYbkBIhVF0R_dvN9nC-3qIo/edit?usp=sharing"
                              target="_blank" rel="noopener noreferrer"
                              style={{ color: "var(--text-link)", textDecoration: "none" }}
                              className="hover:underline"
                            >
                              View the program details document
                            </a>
                          </p>
                        </div>

                        <div>
                          <p
                            className="text-lg mb-2"
                            style={{
                              color: "var(--text-heading)",
                              fontWeight: "bold",
                            }}
                          >
                            Interest:
                          </p>
                          <p
                            className="text-lg"
                            style={{
                              color: "var(--text-primary)",
                            }}
                          >
                            <a
                              href="https://forms.gle/ZB9855GZi6aZ4obh9"
                              target="_blank" rel="noopener noreferrer"
                              style={{ color: "var(--text-link)", textDecoration: "none" }}
                              className="hover:underline"
                            >
                              Fill out the interest form
                            </a>{" "}
                            to express your interest in joining this program.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row - Safety Scholars Programs (Centered) */}
                  <div className="flex justify-center mt-16">
                    <div
                      className="flex flex-col gap-2 p-6 w-full md:w-2/3 relative z-10"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        borderRadius: "12px",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      <h2
                        className="text-3xl font-semibold"
                        style={{
                          color: "var(--text-heading)",
                          paddingBottom: "8px",
                        }}
                      >
                        Safety Scholars Programs
                      </h2>

                      <div className="flex flex-col gap-3 mt-4">
                        <p
                          className="text-lg"
                          style={{
                            color: "var(--text-primary)",
                          }}
                        >
                          <b style={{ color: "var(--text-heading)" }}>Core structure:</b>{" "}
                          Weekly meetings to discuss either Technical or Policy
                          based AI Safety topics
                        </p>

                        <div>
                          <p
                            className="text-lg mb-2"
                            style={{
                              color: "var(--text-heading)",
                              fontWeight: "bold",
                            }}
                          >
                            Member benefits:
                          </p>
                          <ul
                            className="list-disc pl-5 text-lg space-y-2"
                            style={{
                              color: "var(--text-primary)",
                            }}
                          >
                            <li>
                              Office hours and co-working sessions with
                              technical research team
                            </li>
                            <li>Skill-building in relevant career areas</li>
                            <li>
                              Priority access to opportunities and projects
                            </li>
                            <li>Free meals provided at each meeting</li>
                          </ul>
                        </div>

                        <div>
                          <p
                            className="text-lg mb-2"
                            style={{
                              color: "var(--text-heading)",
                              fontWeight: "bold",
                            }}
                          >
                            Graduate students:
                          </p>
                          <p
                            className="text-lg"
                            style={{
                              color: "var(--text-primary)",
                            }}
                          >
                            Email{" "}
                            <a
                              href="mailto:aisafetyuw@gmail.com"
                              style={{
                                color: "var(--text-link)",
                                textDecoration: "none",
                              }}
                              className="hover:underline"
                            >
                              aisafetyuw@gmail.com
                            </a>{" "}
                            to shadow a session. Invitations will be extended to
                            good fits.
                          </p>
                        </div>

                        <div>
                          <p
                            className="text-lg mb-2"
                            style={{
                              color: "var(--text-heading)",
                              fontWeight: "bold",
                            }}
                          >
                            Undergraduates:
                          </p>
                          <p
                            className="text-lg"
                            style={{
                              color: "var(--text-primary)",
                            }}
                          >
                            Applications open at the end of each semester.
                            Priority is given to standout intro program
                            participants or those with strong AI safety
                            background and interest.
                          </p>
                        </div>

                        <p
                          className="text-lg"
                          style={{
                            color: "var(--text-primary)",
                          }}
                        >
                          Strong applicants encouraged to reach out directly via
                          email.
                        </p>

                        <p
                          className="text-lg"
                          style={{
                            color: "var(--text-primary)",
                          }}
                        >
                          Learn more about the program by{" "}
                          <a
                            href="https://docs.google.com/document/d/1npT_7Svl_Gp10-BV8yusx6A90OokOflWFgCagKKU0G8/edit?usp=sharing"
                            target="_blank" rel="noopener noreferrer"
                            style={{ color: "var(--text-link)", textDecoration: "none" }}
                            className="hover:underline"
                          >
                            reading the handbook.
                          </a>
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

