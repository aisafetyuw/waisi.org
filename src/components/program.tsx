import "@fortawesome/fontawesome-svg-core/styles.css";
import { ProgramProps } from "@/types";

export default function Program({ program }: ProgramProps) {
  return (
    <div className="program bg-gray-100 shadow-lg rounded-lg p-4 h-max w-full flex flex-col">
      <h3>{program.name}</h3>
      {program.reserved_for && (
        <p className="bg-fuchsia-400 bg-opacity-20 rounded-md p-2 mb-4 text-xs">
          ⓘ Reserved for {program.reserved_for}
        </p>
      )}
      <hr className="mb-2" />
      {program.email && (
        <p>
          Email <a href={"mailto:" + program.email}>{program.email}</a> with
          your qualifications and why you are interested.
        </p>
      )}
      {program.curriculumLink && (
        <p>
          {program.curriculumSimilarTo
            ? "Curriculum similar to: "
            : "Curriculum: "}
          <a target="_blank" href={program.curriculumLink}>{program.curriculumLink}</a>
        </p>
      )}
      {program.applicationLink && (
        <a
          target="_blank" 
          className="waisi-button bg-indigo-400 bg-opacity-50 hover:bg-opacity-70 rounded-md text-center p-1 m-4 shadow-lg"
          href={program.applicationLink}
        >
          <b>Apply now!</b>
        </a>
      )}
      {program.applicationDeadline && (
        <p>Applications due by {program.applicationDeadline}.</p>
      )}
      {program.link && (
        <p>
          <a target="_blank" href={program.link}>{program.link}</a>
        </p>
      )}
    </div>
  );
}
