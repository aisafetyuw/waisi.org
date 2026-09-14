import Image from "next/image";
import Member from "@/components/member";
import Alumnus from "@/components/alumnus";
import getMembers from "@/app/team/getMembers";
import { FACULTY_ADVISORS, NOTABLE_ALUMNI } from "@/content/team";
import { PAST_LEADERSHIP } from "@/content/pastLeadership";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership team of the Wisconsin AI Safety Initiative at UW–Madison.",
};

// Re-fetch the members sheet in the background at most once an hour, so
// spreadsheet edits go live without a redeploy.
export const revalidate = 3600;

export default async function Team() {
  const roster = await getMembers();
  const normalize = (value?: string) => (value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  // Zach has moved to past leadership; the live sheet still lists him.
  const members = roster?.filter((person) => normalize(person.name) !== "zach lichtman") ?? null;
  const existingNames = new Set(
    [...(members ?? []), ...NOTABLE_ALUMNI].map((person) => normalize(person.name)),
  );
  const existingEmails = new Set(
    (members ?? []).map((person) => normalize(person.email ?? "")).filter(Boolean),
  );
  // Re-check exclusions on each roster refresh so returning leaders are not
  // also listed as past leadership. If the live roster fails, do not guess.
  const pastLeaders = PAST_LEADERSHIP.filter(
    (person) => !existingNames.has(normalize(person.name)) &&
      !(person.email && existingEmails.has(normalize(person.email))),
  );

  return (
    <div id="team" className="-mx-10">
      <div className="px-8 pt-8 pb-16 mx-auto max-w-[1200px]">
        <h2 className="text-3xl font-semibold mb-6 text-heading pb-2">
          Leadership Team
        </h2>

        {members === null ? (
          <p className="text-lg text-primary">
            We couldn&apos;t load the team list right now &#8212; please check
            back soon.
          </p>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-4 text-heading">
              Operations Team
            </h3>
            <ul
              id="team-list"
              className="grid gap-4 m-1 mb-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]"
            >
              {members
                .filter((member) => member.team == "0")
                .map((member, index) => (
                  <li key={index} className="">
                    <Member member={member} />
                  </li>
                ))}
            </ul>
            <h3 className="text-2xl font-semibold mb-4 text-heading">
              Research Team
            </h3>
            <ul
              id="team-list"
              className="grid gap-4 m-1 mb-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]"
            >
              {members
                .filter((member) => member.team === "3")
                .map((member, index) => (
                  <li key={index} className="">
                    <Member member={member} />
                  </li>
                ))}
            </ul>
            <h3 className="text-2xl font-semibold mb-4 text-heading">
              Technical Team
            </h3>
            <ul
              id="team-list"
              className="grid gap-4 m-1 mb-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]"
            >
              {members
                .filter((member) => member.team == "1")
                .map((member, index) => (
                  <li key={index} className="">
                    <Member member={member} />
                  </li>
                ))}
            </ul>
            <h3 className="text-2xl font-semibold mb-4 text-heading">
              Policy Team
            </h3>
            <ul
              id="team-list"
              className="grid gap-4 m-1 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]"
            >
              {members
                .filter((member) => member.team == "2")
                .map((member, index) => (
                  <li key={index} className="">
                    <Member member={member} />
                  </li>
                ))}
            </ul>
          </>
        )}

        {/* Static — renders even when the members sheet is unavailable. */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold mb-6 text-heading pb-2 text-center">
            Faculty Advisor
          </h2>
          <div className="flex justify-center m-1">
            {FACULTY_ADVISORS.map((advisor) => (
              <div
                key={advisor.name}
                className="flex flex-col items-center text-center p-6 w-full max-w-xs bg-card border border-subtle rounded-card"
              >
                <Image
                  src={`/advisors/${advisor.photo}.webp`}
                  alt={advisor.name}
                  width={140}
                  height={140}
                  className="rounded-card"
                />
                <div className="mt-4 text-lg font-semibold">
                  <a
                    href={advisor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-link-hover active:text-link-hover transition-colors text-link no-underline"
                  >
                    {advisor.name}
                  </a>
                </div>
                <div className="mt-1 text-sm font-semibold text-primary">
                  {advisor.position}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Static list — renders even when the members sheet is unavailable. */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold mb-6 text-heading pb-2">
            Notable Alumni
          </h2>
          <ul className="grid gap-4 m-1 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {NOTABLE_ALUMNI.map((alumnus) => (
              <li key={alumnus.name}>
                <Alumnus alumnus={alumnus} />
              </li>
            ))}
          </ul>
        </section>

        <section id="past-leadership" aria-labelledby="past-leadership-heading" className="mt-16">
          <h2 id="past-leadership-heading" className="text-3xl font-semibold mb-6 text-heading pb-2">
            Past Leadership
          </h2>
          {members === null ? (
            <p className="text-lg text-primary">
              We couldn&apos;t load past leadership right now — please check back soon.
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-1">
              {pastLeaders.map((person) => (
                <li key={person.name} className="min-w-0 p-5 bg-card border border-subtle rounded-card">
                  <h3 className="text-xl text-heading">{person.name}</h3>
                  <dl className="mt-2 space-y-2 text-sm text-primary">
                    <div>
                      <dt className="font-semibold">Years</dt>
                      <dd>{person.years}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Title</dt>
                      <dd>{person.role ?? "Not listed"}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
