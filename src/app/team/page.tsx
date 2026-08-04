import Member from "@/components/member";
import Alumnus from "@/components/alumnus";
import getMembers from "@/app/team/getMembers";
import { NOTABLE_ALUMNI } from "@/content/team";
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
  const members = await getMembers();

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
      </div>
    </div>
  );
}
