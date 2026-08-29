"use client";

import { ChevronRightIcon } from "@heroicons/react/24/solid";

type Props = {
  href: string;
  title: string;
  subtitle: string;
  comingSoon?: boolean;
  disabled?: boolean;
};

export default function LinkButton({
  href,
  title,
  subtitle,
  comingSoon = false,
  disabled = false,
}: Props) {
  return (
    <a
      href={href}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      onClick={disabled ? (event) => event.preventDefault() : undefined}
      className={`flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 transition-colors ${
        disabled
          ? "cursor-not-allowed opacity-60"
          : "hover:border-white/20 hover:bg-white/[0.06]"
      }`}
    >
      <span>
        <span className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#f4f1ea]">{title}</span>
          {comingSoon && (
            <span className="rounded border border-[#d97706]/50 bg-[#d97706]/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#f5b94e]">
              Coming soon
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-xs text-[#8a8f94]">{subtitle}</span>
      </span>
      <ChevronRightIcon className="h-4 w-4 text-[#8a8f94]" />
    </a>
  );
}
