"use client";

import { StarIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type Props = {
  href: string;
  title: string;
  subtitle: string;
  price: string;
};

export default function FeaturedLinkCard({ href, title, subtitle, price }: Props) {
  return (
    <a
      href={href}
      className="group relative block w-full overflow-hidden rounded-2xl border border-[#5eb8b0]/40 bg-cover bg-center p-6 transition-colors hover:border-[#5eb8b0]/70"
      style={{ backgroundImage: "url('/IMG_5191.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#0a0c0e]/65 transition-colors group-hover:bg-[#0a0c0e]/55" />

      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5eb8b0]/40 bg-[#0a0c0e]/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#5eb8b0]">
          <StarIcon className="h-3 w-3" />
          Featured
        </span>
        <span className="rounded-full bg-[#d97706] px-2.5 py-1 text-xs font-extrabold text-[#0a0c0e]">
          {price}
        </span>
      </div>

      <h3 className="relative z-10 mt-5 text-2xl font-extrabold text-[#f4f1ea]">{title}</h3>
      <p className="relative z-10 mt-1 text-sm text-[#c9cdd1]">{subtitle}</p>

      <span className="relative z-10 mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#5eb8b0]">
        Get the pack
        <ChevronRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
