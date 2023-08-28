import Image from "next/image";
import Program from "@/components/program";
import getPrograms from "@/app/programs/getPrograms";

export default async function Programs() {
  const programs = await getPrograms();

  return (
    <div id="programs" className="page mb-8 sm:mb-16">
      <div>
        <h2>Events</h2>
      </div>
      <div>
        <h2>Fall 2023 Programs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Image
              src={`/fall-2023-programs.jpeg`}
              alt="programming"
              width={1080}
              height={1920}
              className="rounded-lg shadow-lg bg-gray-50 p-4"
            />
          </div>
          <div className="grid grid-cols-1m-1 gap-4 list-none">
            {programs.map((program, index) => (
              <li key={index}>
                <Program program={program} />
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
