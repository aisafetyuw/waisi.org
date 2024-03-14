import Professor from "@/components/prof";
import { ProfProps } from "@/types";

export default function Milestones() {
    const profs: ProfProps[] = [
        {
            name: "Sharon Li",
            link: "https://pages.cs.wisc.edu/~sharonli/",
            focus: "Algorithmic and Theoretical Foundations of Reliable Machine Learning",
            extra: "MIT Technology Review's 2023 Innovator of the Year",
        },
        {
            name: "Fred Sala",
            link: "https://pages.cs.wisc.edu/~fredsala/",
            focus: "Fundamentals of Data-Driven Systems and Machine Learning",
        },
        {
            name: "Kangwook Lee",
            link: "https://kangwooklee.com/",
            focus: "Theory and Algorithms for Deep Learning with Foundation Models",
        },
        {
            name: "Junjie Hu",
            link: "https://junjiehu.github.io/",
            focus: "Natural Language Processing and Machine Learning",
        },
        {
            name: "Dimitris Papailiopoulos",
            link: "https://papail.io/",
            focus: "Machine learning, coding theory, and optimization",
        },
    ];

    return (
        <div id="achievements" className="page">
            <h2>Group Achievements</h2>
            <h3>By The Numbers</h3>
            <ul id="stats">
                <li>
                    <span className="stat-num">6</span> PhD Safety Scholars
                </li>
                <li>
                    <span className="stat-num">3</span> Masters Safety Scholars
                </li>
                <li>
                    <span className="stat-num">20+</span> undergraduate Safety Scholars
                </li>
                <li>
                    <span className="stat-num">39</span> current AI Safety Fundamentals participants
                </li>
                <li>
                    <span className="stat-num">100+</span> AI Safety Fundamentals graduates
                </li>
            </ul>
            <h3>Involvement and Impact</h3>
            {/* TODO <p>
                Research groups with members hosted by WAISI for speaker events:
            </p> */}
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