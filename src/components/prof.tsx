import { ProfProps } from "@/types";

export default function Professor({ name, link, focus, extra }: ProfProps) {
    return (
      <div className="transform transition-transform hover:scale-105 member p-4 h-full" style={{backgroundColor: '#F7F0E6'}}>
        <div className="">
          <div className="text-lg font-semibold" style={{fontFamily: '"Lora", serif'}}>
            <a href={link} target="_blank" className="hover:underline" style={{color: '#8B5CF6', textDecoration: 'none'}}>{name}</a>
          </div>
          {extra && <div className="mt-1 text-sm font-light" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>{extra}</div>}
          <div className="mt-1 font-semibold" style={{color: '#2D2A26', fontFamily: '"Lora", serif'}}>{focus}</div>
        </div>
      </div>
    );
}