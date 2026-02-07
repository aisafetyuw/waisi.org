import Events from "@/components/events";

export default function Calendar() {
    return (
      <div
        id="calendar"
        className="page"
        style={{ backgroundColor: "var(--bg-page)" }}
      >
        <Events />
      </div>
    );
}