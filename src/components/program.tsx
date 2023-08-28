import '@fortawesome/fontawesome-svg-core/styles.css';
import { ProgramProps } from "@/types";

export default function Program({ program }: ProgramProps) {
  return (
    <div className="program bg-gray-50 shadow-lg rounded-lg p-2 h-max flex flex-col space-y-2">
      <h3>{program.name}</h3>
      {program.description &&
        <p>{program.description}</p>
      }
      {program.email &&
        <p>
          Email <a href={"mailto:" + program.email}>{program.email}</a> with your qualifications and why you are interested.
        </p>
      }
      {program.curriculumLink &&
        <p>
          {program.curriculumSimilarTo ? "Curriculum similar to: " : "Curriculum: "}
          <a href={program.curriculumLink}>{program.curriculumLink}</a>
        </p>
      }
      {program.applicationLink &&
        <a href={program.applicationLink}>Apply here!</a>
      }
      {program.applicationDeadline &&
        <p>Applications due by {program.applicationDeadline}.</p>
      }
    </div>
  );
}