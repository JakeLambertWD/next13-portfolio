"use client";

import { LockClosedIcon } from "@heroicons/react/24/solid";

export default function TrustBar() {
  return (
    <div className="mt-4 flex flex-col items-center gap-3 border-t border-white/10 pt-4">
      <div className="flex items-center gap-1.5">
        <LockClosedIcon className="h-3 w-3 text-[#8a8f94]" />
        <span className="text-[11px] text-[#8a8f94]">
          Secure checkout powered by Stripe
        </span>
      </div>
      <div className="text-center text-[11px] tracking-wide text-[#63696e]">
        Visa · Mastercard · Amex · PayPal · Apple Pay · Google Pay
      </div>
    </div>
  );
}
