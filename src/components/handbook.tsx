import { HandbookProps } from "@/types";

export default function Handbook(props: HandbookProps) {
    return (
        <div className="flex">
            <a href={props.url} target="_blank" rel="noopener noreferrer" className="group w-full h-full">
                <div className="box relative waisi-button rounded-lg transition-all duration-300 ease-in-out h-28 drop-shadow-md">
                    <div className="absolute inset-0 flex items-center justify-center p-4 ease-in-out group-hover:opacity-0">
                        <h2 className="title font-bold text-xl underline text-center">{props.title}</h2>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center p-4 ease-in-out opacity-0 group-hover:opacity-100">
                        <p className="description text-gray-200 text-center">{props.description}</p>
                    </div>
                </div>
            </a>
        </div>
    );
};
