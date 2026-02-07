import Member from "@/components/member";
import getMembers from "@/app/team/getMembers";

export default async function Team() {
  const members = await getMembers();

  return (
    <div
      id="team"
      className="-mx-10"
      style={{
        marginLeft: "-40px",
        marginRight: "-40px",
        backgroundColor: "var(--bg-page)",
      }}
    >
      <div className="px-8 pt-8 pb-16 mx-auto" style={{ maxWidth: "1200px" }}>
        <h2
          className="text-3xl font-semibold mb-6"
          style={{
            color: "var(--text-heading)",
            paddingBottom: "8px",
          }}
        >
          Leadership Team
        </h2>
        <h3
          className="text-2xl font-semibold mb-4"
          style={{ color: "var(--text-heading)" }}
        >
          Community Builders
        </h3>
        <ul
          id="team-list"
          className="grid gap-4 m-1 mb-8"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {members
            .filter((member) => member.team == "0")
            .map((member, index) => (
              <li key={index} className="">
                <Member member={member} />
              </li>
            ))}
        </ul>
        <h3
          className="text-2xl font-semibold mb-4"
          style={{ color: "var(--text-heading)" }}
        >
          Research Team
        </h3>
        <ul
          id="team-list"
          className="grid gap-4 m-1 mb-8"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {members
            .filter((member) => member.team === "3")
            .map((member, index) => (
              <li key={index} className="">
                <Member member={member} />
              </li>
            ))}
        </ul>
        <h3
          className="text-2xl font-semibold mb-4"
          style={{ color: "var(--text-heading)" }}
        >
          Technical Team
        </h3>
        <ul
          id="team-list"
          className="grid gap-4 m-1 mb-8"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {members
            .filter((member) => member.team == "1")
            .map((member, index) => (
              <li key={index} className="">
                <Member member={member} />
              </li>
            ))}
        </ul>
        <h3
          className="text-2xl font-semibold mb-4"
          style={{ color: "var(--text-heading)" }}
        >
          Policy Team
        </h3>
        <ul
          id="team-list"
          className="grid gap-4 m-1"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {members
            .filter((member) => member.team == "2")
            .map((member, index) => (
              <li key={index} className="">
                <Member member={member} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

