import Image from "next/image";
import React from "react";

import Program from "@/components/program";
import getPrograms from "@/app/programs/getPrograms";

export default async function Programs() {
  const programs = await getPrograms();

  return (
    <div id="programs" className="mb-8 sm:mb-16 p-4">
      <h2>Programs</h2>
      <div id="program-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 lg:w-2/3 gap-4 m-1 mb-8">
          {programs.filter(program => ["governance", "alignment"].includes(program.type)).map((program, index) => (
            <div key={index}>
              <Program program={program} />
            </div>
          ))}
        </div>
        <div>
          <Image
            id="programs-img"
            src={`/spring-2023-programs.png`}
            alt="Infographic of Spring 2023 programs"
            width={648}
            height={972}
            className="rounded-lg shadow-lg bg-gray-50 m-2 p-2"
          />
          <p className="mb-3 ml-3 text-xs text-gray-500">
            Infographic designed by <a target="_blank" href="https://www.instagram.com/sophie_noelle_art/">Sophie Fellinger</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
