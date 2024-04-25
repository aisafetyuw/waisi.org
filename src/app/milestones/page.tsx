import Lab from "@/components/lab";
import Professor from "@/components/prof";
import { LabProps, ProfProps } from "@/types";

export default function Milestones() {
    const profs: ProfProps[] = [
        {
            name: "Sharon Li",
            link: "https://pages.cs.wisc.edu/~sharonli/",
            focus: "Algorithmic and theoretical foundations of reliable machine learning",
            // extra: "MIT Technology Review's 2023 Innovator of the Year",
        },
        {
            name: "Grigorios Chrysos",
            link: "https://grigorisg9gr.github.io/_pages/about/",
            focus: "Learning (robust) representations and generative modeling",
        },
        {
            name: "Fred Sala",
            link: "https://pages.cs.wisc.edu/~fredsala/",
            focus: "Fundamentals of data-driven systems and machine learning",
        },
        {
            name: "Kangwook Lee",
            link: "https://kangwooklee.com/",
            focus: "Theory and algorithms for deep learning with foundation models",
        },
        {
            name: "Junjie Hu",
            link: "https://junjiehu.github.io/",
            focus: "Natural language processing and machine learning",
        },
        {
            name: "Dimitris Papailiopoulos",
            link: "https://papail.io/",
            focus: "Machine learning, coding theory, and optimization",
        },
    ];

    const labs: LabProps[] = [
        {
            name: "Google DeepMind",
            filename: "deepmind.png",
            link: "https://deepmind.google/",
        },
        {
            name: "METR",
            filename: "arcevals.svg",
            link: "https://metr.org/",
        },
        {
            name: "Center for a New American Security",
            filename: "cnas.png",
            link: "https://www.cnas.org/",
        },
        {
            name: "Anthropic",
            filename: "anthropic.webp",
            link: "https://www.anthropic.com/",
        },
    ];

    return (
        <div id="achievements" className="page">
            <h2>Group Milestones</h2>
            <h3>By The Numbers</h3>
            <ul id="stats">
                <li>
                    <span className="stat-num">6</span> PhD Safety Scholars
                </li>
                <li>
                    <span className="stat-num">3</span> Masters Safety Scholars
                </li>
                <li>
                    <span className="stat-num">20+</span> Undergraduate Safety Scholars
                </li>
                <li>
                    <span className="stat-num">39</span> Current AI Safety Fundamentals participants
                </li>
                <li>
                    <span className="stat-num">100+</span> AI Safety Fundamentals graduates
                </li>
            </ul>
            <h3>Involvement and Impact</h3>
            <p className="mb-3 text-lg">
                Research groups with members hosted by WAISI for speaker events:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-1 m-1 mb-8 content-center pl-14 pr-14">
                {labs.map(lab => <Lab name={lab.name} filename={lab.filename} link={lab.link} />)}
            </div>
            <p className="mb-3 text-lg">
                One of our members contributed to <a target="_blank" className="link" href="https://docs.legis.wisconsin.gov/2023/proposals/reg/asm/bill/ab664">AB 664</a>, a bill on disclosing AI generated material in political ads.
            </p>
            <h4 className="mb-3 font-semibold text-lg">
                Members in these professors' research labs:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-1 mb-8">
                {profs.sort((a, b) => a.name.split(' ')[1].toLowerCase().localeCompare(b.name.split(' ')[1].toLowerCase())) // sort by last name
                      .map(prof => <Professor link={prof.link} name={prof.name} extra={prof.extra} focus={prof.focus} />)}
            </div>
            {/* TODO <h3>Alumni</h3> */}
        </div>
    );
}