import "@fortawesome/fontawesome-svg-core/styles.css";
import { ProgramProps } from "@/types";

export default function Program({ program }: ProgramProps) {
  return (
    <div className="program bg-gray-100 h-full shadow-lg rounded-lg p-4 w-full flex flex-col">
      <h3>
        {program.link ? 
        <a target="_blank" href={program.link}>
          <div dangerouslySetInnerHTML={{ __html: program.name }} />
        </a> :
        <div dangerouslySetInnerHTML={{ __html: program.name }} />}
      </h3>
      {program.reserved_for && (
        <p className="bg-fuchsia-400 bg-opacity-20 rounded-md p-2 mb-4 text-xs">
          ⓘ Reserved for {program.reserved_for}
        </p>
      )}
      <hr className="mb-2" />
      {program.desc && (
        <p>
          {program.desc}
        </p>
      )}
      {program.email && (
        <p>
          Email <a href={"mailto:" + program.email}>{program.email}</a> with
          your qualifications and why you are interested.
        </p>
      )}
      {program.curriculumLink && (
        <div>
          <hr className="mb-2" />
          <p>
            {program.curriculumSimilarTo
              ? "Curriculum similar to: "
              : "Curriculum: "}
            <a target="_blank" href={program.curriculumLink}>{program.curriculumLink}</a>
          </p>
        </div>
      )}
      {program.applicationLink && (
        program.closed
          ? <a
            target="_blank" 
            className="waisi-button closed bg-red-400 bg-opacity-50 hover:bg-opacity-70 rounded-md text-center p-1 m-4 shadow-lg"
          >
            <b>Applications closed!</b>
          </a>
          : <a
            target="_blank"
            href={program.applicationLink}
            className="waisi-button closed bg-red-400 bg-opacity-50 hover:bg-opacity-70 rounded-md text-center p-1 m-4 shadow-lg"
          >
            <b>Apply now!</b>
          </a>
        
      )}
      {program.applicationDeadline && (
        <p>Applications due by {program.applicationDeadline}.</p>
      )}
    </div>
  );
}
