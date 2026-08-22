"use client";

import { ChevronRightIcon } from "@heroicons/react/24/solid";

type Props = {
  href: string;
  title: string;
  subtitle: string;
};

export default function LinkButton({ href, title, subtitle }: Props) {
  return (
    <a
      href={href}
      className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
    >
      <span>
        <span className="block text-sm font-bold text-[#f4f1ea]">{title}</span>
        <span className="mt-0.5 block text-xs text-[#8a8f94]">{subtitle}</span>
      </span>
      <ChevronRightIcon className="h-4 w-4 text-[#8a8f94]" />
    </a>
  );
}
