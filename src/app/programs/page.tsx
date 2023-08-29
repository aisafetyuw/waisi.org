import Image from "next/image";
import React, { useEffect, useRef } from "react";

import Program from "@/components/program";
import getPrograms from "@/app/programs/getPrograms";

export default async function Programs() {
  const programs = await getPrograms();

  const alignmentPrograms = programs.filter(
    (program) => program.type === "alignment"
  );
  const alignmentHalfLength = Math.ceil(alignmentPrograms.length / 2);
  const alignmentProgramsOne = alignmentPrograms.splice(0, alignmentHalfLength);
  const alignmentProgramsTwo = alignmentPrograms;

  const governancePrograms = programs.filter(
    (program) => program.type === "governance"
  );
  const governanceHalfLength = Math.ceil(governancePrograms.length / 2);
  const governanceProgramsOne = governancePrograms.splice(
    0,
    governanceHalfLength
  );
  const governanceProgramsTwo = governancePrograms;

  return (
    <div id="programs" className="mb-8 sm:mb-16 p-4">
      <h2>Fall 2023 Programs</h2>
      <div className="flex flex-row">
        <div>
          <div>
            <h2>Alignment</h2>
            <div className="flex flex-wrap justify-between space-y-4 md:space-y-0">
              <div className="w-full md:w-1/2 space-y-4 md:pr-2">
                {alignmentProgramsOne.map((program, index) => (
                  <div key={index}>
                    <Program program={program} />
                  </div>
                ))}
              </div>
              <div className="w-full md:w-1/2 space-y-4 md:pl-2">
                {alignmentProgramsTwo.map((program, index) => (
                  <div key={index}>
                    <Program program={program} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2>Governance</h2>
            <div className="flex flex-wrap justify-between space-y-4 md:space-y-0">
              <div className="w-full md:w-1/2 space-y-4 md:pr-2">
                {governanceProgramsOne.map((program, index) => (
                  <div key={index}>
                    <Program program={program} />
                  </div>
                ))}
              </div>
              <div className="w-full md:w-1/2 space-y-4 md:pl-2">
                {governanceProgramsTwo.map((program, index) => (
                  <div key={index}>
                    <Program program={program} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Image
          id="programs-img"
          src={`/fall-2023-programs.jpeg`}
          alt="Poster of fall 2023 programs"
          width={1080 * .6}
          height={1920 * .6}
          className="rounded-lg shadow-lg bg-gray-50 m-2 p-4"
        />
      </div>
    </div>
  );
}
