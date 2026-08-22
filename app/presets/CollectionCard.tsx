"use client";

import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function CollectionCard({ icon, title, description }: Props) {
  return (
    <div className="flex min-h-[168px] flex-col justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
      {icon}
      <div>
        <div className="text-sm font-bold text-[#f4f1ea]">{title}</div>
        <div className="mt-1 text-xs leading-relaxed text-[#8a8f94]">
          {description}
        </div>
      </div>
    </div>
  );
}
