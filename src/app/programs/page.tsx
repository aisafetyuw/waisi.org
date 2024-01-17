import Image from "next/image";
import React from "react";

import Program from "@/components/program";
import getPrograms from "@/app/programs/getPrograms";

export default async function Programs() {
  const programs = await getPrograms();

  const alignmentPrograms = programs.filter(
    (program) => program.type === "alignment"
  );

  const governancePrograms = programs.filter(
    (program) => program.type === "governance"
  );

  return (
    <div id="programs" className="mb-8 sm:mb-16 p-4">
      <p className="mb-3">
        Infographic designed by Sophie Fellinger.
      </p>
      <p id="see-info" className="mb-3">
        See bottom infographic for more information.
      </p>
      <div id="program-container">
        <div>
          <div>
            <h2>Alignment Programs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 m-1 mb-8">
              {alignmentPrograms.map((program, index) => (
                <div key={index}>
                  <Program program={program} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2>Governance Programs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 m-1 mb-8">
              {governancePrograms.map((program, index) => (
                <div key={index}>
                  <Program program={program} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Image
          id="programs-img"
          src={`/spring-2023-programs.png`}
          alt="Infographic of Spring 2023 programs"
          width={648}
          height={972}
          className="rounded-lg shadow-lg bg-gray-50 m-2 p-2"
        />
      </div>
    </div>
  );
}
