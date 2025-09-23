import Lab from "@/components/lab";
import { LabProps } from "@/types";

export default function Milestones() {
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
            <div className="flex flex-col gap-4">
                <div>
                    <h3>By The Numbers</h3>
                    <ul id="stats">
                        <li>
                            <span className="stat-num">10</span> PhD Safety Scholars
                        </li>
                        <li>
                            <span className="stat-num">6</span> Masters Safety Scholars
                        </li>
                        <li>
                            <span className="stat-num">50+</span> Undergraduate Safety Scholars
                        </li>
                        <li>
                            <span className="stat-num">30</span> Current AI Safety Fundamentals participants
                        </li>
                        <li>
                            <span className="stat-num">130+</span> AI Safety Fundamentals graduates
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>Involvement and Impact</h3>
                    <p className="mb-3 text-lg">
                        Research groups with members hosted by WAISI for speaker events:
                    </p>
                    <div className="collapse sm:visible grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-1 m-1 mb-8 content-center pl-14 pr-14">
                        {labs.map(lab => <Lab name={lab.name} filename={lab.filename} link={lab.link} />)}
                    </div>
                    <ul className="list-disc pl-5 text-lg">
                        <li>9 WAISI members flew out to DC to <a href="https://www.cs.wisc.edu/2025/03/13/waisi-presents-caip-advanced-ai-expo/" target="_blank">participate in a Congressional Exhibition on Advanced AI.</a></li>
                        <li>One of our members contributed to Wisconsin's <a href="https://docs.legis.wisconsin.gov/2023/proposals/reg/asm/bill/ab664" target="_blank">2023 Assembly Bill 664</a>, which requires disclosing AI-generated material in political ads.</li>
                        <li>We've hosted speakers from <a href="https://deepmind.google/" target="_blank">Google DeepMind</a>, <a href="https://www.anthropic.com/" target="_blank">Anthropic</a>, <a href="https://www.metr.org/" target="_blank">Model Evaluation and Threat Research (METR)</a>, the <a href="https://www.cnas.org/" target="_blank">Center for a New American Security (CNAS)</a>, and the <a href="https://horizonpublicservice.org/" target="_blank">Horizon Institute for Public Service</a>.</li>
                        <li>We have members in 12 research labs on campus. Learn more below.</li>
                        <li>We've collaborated with professors from the School of Computer, Data, and Information Sciences, the School of Education, the School of Business, and the Department of Philosophy.</li>
                    </ul>
                </div>
                <div>
                    <h3>Research</h3>
                    <p className="text-lg">See our <a href="research">research page</a> for recent research papers published by WAISI members and the faculty members our students collaborate with.</p>
                </div>
            </div>
            {/* TODO <h3>Alumni</h3> */}
        </div>
    );
}