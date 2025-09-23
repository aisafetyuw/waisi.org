import { ProfProps } from "@/types";

export default function Professor({ name, link, focus, extra }: ProfProps) {
    return (
      <div className="transform transition-transform hover:scale-105 member bg-gray-50 shadow-lg rounded-lg p-4 h-full">
        <div className="">
          <div className="text-lg font-semibold">
            <a href={link} target="_blank" className="text-purple-600 hover:underline">{name}</a>
          </div>
          {extra && <div className="text-gray-500 mt-1 text-sm font-light">{extra}</div>}
          <div className="text-gray-700 mt-1 font-semibold">{focus}</div>
        </div>
      </div>
    );
}