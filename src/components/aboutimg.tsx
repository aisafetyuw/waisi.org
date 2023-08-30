import { AboutImageProps } from "@/types";
import Image from "next/image";

export default function AboutImage({ filename, alt }: AboutImageProps) {
    return (
      <div className="flex justify-center items-center">
        <Image
          src={`/about/${filename}.jpg`}
          alt={alt}
          width={1584}
          height={891}
          className="rounded-lg shadow-lg bg-gray-50 m-4"
        />
      </div>
    );
}