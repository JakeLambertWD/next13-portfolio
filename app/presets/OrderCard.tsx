"use client";

import { CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import TrustBar from "./TrustBar";

const FEATURES = [
  "50 presets across 10 cinematic collections",
  "Works in Lightroom Classic, CC & mobile",
  "Delivered instantly to your email",
];

export default function OrderCard() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-[#5eb8b0]/35 bg-gradient-to-b from-[#5eb8b0]/[0.08] to-[#141618] to-60% p-7">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#5eb8b0]">
          Preset Pack
        </span>
        <span className="rounded-full bg-[#d97706] px-2.5 py-1 text-xs font-extrabold text-[#0a0c0e]">
          £20
        </span>
      </div>

      <h2 className="text-xl font-extrabold text-[#f4f1ea]">
        The Complete Collection
      </h2>
      <p className="mt-1 text-xs text-[#8a8f94]">
        50 presets · 10 collections · one-time payment
      </p>

      <ul className="mt-5 flex flex-col gap-2.5">
        {FEATURES.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2.5 text-[13.5px] text-[#c9cdd1]"
          >
            <CheckIcon className="h-4 w-4 flex-shrink-0 text-[#5eb8b0]" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href="#" // TODO: replace with the real Payhip checkout link/embed once set up
        className="mt-6 block w-full rounded-lg bg-[#5eb8b0] py-3.5 text-center text-[15px] font-extrabold text-[#0a0c0e] transition-colors hover:bg-[#7fcac3]"
      >
        Buy now — £10
      </a>
        {isLoading ? "Opening secure checkout..." : "Buy now — £20"}

      <TrustBar />
    </div>
  );
}
