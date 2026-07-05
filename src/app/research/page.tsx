import getResearch from "@/app/research/getResearch";
import Professor from "@/components/prof";
import ResearchList from "@/components/ResearchList";
import { ProfProps } from "@/types";

// Re-fetch the research sheet in the background at most once an hour, so
// spreadsheet edits go live without a redeploy.
export const revalidate = 3600;

export default async function ResearchPage() {
  const research = await getResearch();
  const clubMembers = new Set(
    (research ?? []).map((paper) => paper.author.trim()),
  );

  const profs: ProfProps[] = [
    {
      name: "Sharon Li",
      link: "https://pages.cs.wisc.edu/~sharonli/",
      focus:
        "Algorithmic and theoretical foundations of reliable machine learning",
      extra: "Associate Professor in the Department of Computer Sciences",
    },
    {
      name: "Grigorios Chrysos",
      link: "https://grigorisg9gr.github.io/_pages/about/",
      focus: "Learning (robust) representations and generative modeling",
      extra: "Assistant Professor",
    },
    {
      name: "Fred Sala",
      link: "https://pages.cs.wisc.edu/~fredsala/",
      focus: "Fundamentals of data-driven systems and machine learning",
      extra: "Assistant Professor in the Department of Computer Sciences",
    },
    {
      name: "Kangwook Lee",
      link: "https://kangwooklee.com/",
      focus: "Theory and algorithms for deep learning with foundation models",
      extra:
        "Associate Professor in the Electrical and Computer Engineering Department",
    },
    {
      name: "Junjie Hu",
      link: "https://junjiehu.github.io/",
      focus: "Natural language processing and machine learning",
      extra: "Assistant Professor in the Department of Computer Sciences",
    },
    {
      name: "Dimitris Papailiopoulos",
      link: "https://papail.io/",
      focus: "Machine learning, coding theory, and optimization",
      extra:
        "Associate Professor in the Electrical and Computer Engineering Department",
    },
    {
      name: "Vikas Singh",
      link: "https://www.biostat.wisc.edu/~vsingh/",
      focus: "Image analysis, computer vision, and ML in biostatistics",
      extra: "Professor in the Department of Biostatistics",
    },
    {
      name: "Patrick McDaniel",
      link: "https://patrickmcdaniel.org/",
      focus: "Mobile security, adversarial ML, and systems security research",
      extra: "Professor in the Department of Computer Sciences",
    },
    {
      name: "Josiah Hanna",
      link: "https://pages.cs.wisc.edu/~jphanna/",
      focus: "Reinforcement learning and autonomous agents",
      extra: "Assistant Professor in the Department of Computer Sciences",
    },
    {
      name: "Ramya Vinayak",
      link: "https://ramyakv.github.io/",
      focus: "Machine learning, statistical inference, and crowdsourcing",
      extra: "Assistant Professor in the ECE Department",
    },
    {
      name: "Somesh Jha",
      link: "https://pages.cs.wisc.edu/~jha/",
      focus: "Adversarial machine learning, privacy, and formal methods",
      extra: "Professor in the Department of Computer Sciences",
    },
    {
      name: "Yiqiao Zhong",
      link: "https://pages.stat.wisc.edu/~zhong35/",
      focus:
        "LLM evaluations, high dimensional statistics, and deep learning theory",
      extra: "Assistant Professor in the Department of Statistics",
    },
  ];

  return (
    <div
      id="research"
      style={{
        backgroundColor: "var(--bg-page)",
        marginLeft: "-40px",
        marginRight: "-40px",
      }}
    >
      <div className="mx-auto pt-8" style={{ width: "75%" }}>
        <h2
          className="text-3xl font-semibold mb-6"
          style={{
            color: "var(--text-heading)",
            paddingBottom: "8px",
          }}
        >
          <span style={{ color: "var(--text-heading)" }}>WAISI</span>{" "}
          <span style={{ color: "var(--text-primary)" }}>&</span>{" "}
          <span style={{ color: "#800000" }}>XLab</span>
        </h2>
        <div className="space-y-6 mb-12">
          <div className="p-6" style={{ backgroundColor: "var(--bg-card)", borderRadius: "12px", boxShadow: "var(--shadow-card)" }}>
            <h3
              className="text-xl font-semibold mb-3"
              style={{
                color: "var(--text-heading)",
              }}
            >
              WAISI Technical AI Safety Workshop Program
            </h3>
            <p
              className="leading-relaxed"
              style={{
                color: "var(--text-primary)",
              }}
            >
              Most AI Safety communities introduce members who are interested in
              technical AI safety through the pipeline of Intro Technical
              Fellowship → Paper Reading Sessions → Alignment Research Engineer
              Accelerator program (ARENA) → Research Programs (SPAR, XLab SRF,
              MATS). However, most university groups have struggled with ARENA
              sessions for a few key reasons: the steep learning curve,
              significant time commitment, and lack of experienced TA's. The
              technical workshop program aims to address these issues by
              creating ARENA-styled workshops on AI Safety topics that focus on
              shorter, more manageable exercises, while still preserving the
              rigor of research-style work.
            </p>
          </div>

          <div className="p-6" style={{ backgroundColor: "var(--bg-card)", borderRadius: "12px", boxShadow: "var(--shadow-card)" }}>
            <h3
              className="text-xl font-semibold mb-3"
              style={{
                color: "var(--text-heading)",
              }}
            >
              Transferable Adversarial Materials (TAM): Defeating ISR AUASs and
              LAWSs via Disruptive and Adversarial Material
            </h3>
            <p
              className="leading-relaxed"
              style={{
                color: "var(--text-primary)",
              }}
            >
              Within the past decade, small portable Unmanned Aerial Systems
              (UASs) operated by individual infantry units have been
              demonstrated to be vital assets on the battlefield in
              intelligence, surveillance, and reconnaissance (ISR) roles as well
              as in one-way suicide attacks (loitering munition) and reusable
              bomb-dropping UASs. Many countries are attempting to integrate AI
              vision models into these systems to automate navigation and target
              identification and reduce vulnerability to jamming. We aim to
              demonstrate the effectiveness of a Transferable Adversarial
              Material (TAM), a deformable material which could be deployed in a
              variety of settings and deceive military-purpose computer vision
              models analogous to those being deployed in AUASs.
            </p>
          </div>
        </div>
        <div className="flex align-center justify-center mb-6">
          <h1
            className="text-4xl font-semibold"
            style={{
              color: "var(--text-heading)",
            }}
          >
            Our Research Catalog
          </h1>
        </div>
        {research === null ? (
          <p
            className="text-lg text-center mb-12"
            style={{ color: "var(--text-primary)" }}
          >
            We couldn&apos;t load the research catalog right now &#8212; please
            check back soon.
          </p>
        ) : (
          <ResearchList research={research} clubMembers={clubMembers} />
        )}
        <div className="mt-12 pb-16">
          <h2
            className="text-3xl font-semibold mb-6"
            style={{
              color: "var(--text-heading)",
              paddingBottom: "8px",
            }}
          >
            Faculty Collaborators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1">
            {profs
              .sort((a, b) =>
                a.name
                  .split(" ")[1]
                  .toLowerCase()
                  .localeCompare(b.name.split(" ")[1].toLowerCase()),
              ) // sort by last name
              .map((prof) => (
                <Professor
                  key={prof.name}
                  link={prof.link}
                  name={prof.name}
                  extra={prof.extra}
                  focus={prof.focus}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
