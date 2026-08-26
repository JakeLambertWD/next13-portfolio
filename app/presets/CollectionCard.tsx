"use client";

import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  imageSrc: string;
  imagePosition?: string;
};

export default function CollectionCard({
  icon,
  title,
  description,
  imageSrc,
  imagePosition = "center",
}: Props) {
  return (
    <div
      className="relative flex min-h-[168px] flex-col justify-between gap-4 overflow-hidden rounded-xl border border-white/10 bg-cover bg-center p-5"
      style={{
        backgroundImage: `url('${imageSrc}')`,
        backgroundPosition: imagePosition,
      }}
    >
      <div className="absolute inset-0 bg-[#0a0c0e]/70" />
      <div className="relative z-10">{icon}</div>
      <div className="relative z-10">
        <div className="text-sm font-bold text-[#f4f1ea]">{title}</div>
        <div className="mt-1 text-xs leading-relaxed text-[#c9cdd1]">
          {description}
        </div>
      </div>
    </div>
  );
}
