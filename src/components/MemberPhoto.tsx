"use client";

import Image from "next/image";
import { useState } from "react";

export default function MemberPhoto({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const words = name.trim().split(/\s+/);
  const initials = (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();

  if (failed) {
    return (
      <div role="img" aria-label={`${name}: photo unavailable`}
        className="flex h-[100px] w-[100px] items-center justify-center rounded-card border border-subtle bg-card-alt text-2xl font-semibold text-heading">
        <span aria-hidden="true">{initials}</span>
      </div>
    );
  }

  return <Image src={`/leaders/${words.join("_").toLowerCase()}.webp`} alt={name}
    width={100} height={100} onError={() => setFailed(true)} />;
}
