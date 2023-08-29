import { AboutImageProps } from "@/types";
import Image from "next/image";

export default function AboutImage({ filename, alt, left }: AboutImageProps) {
    return (
      <Image
        src={`/about/${filename}.jpg`}
        alt={alt}
        width={320}
        height={180}
        className={`rounded-lg shadow-lg bg-gray-50 m-4 about-img-${left === true ? 'left' : 'right'}`}
      />
    );
}