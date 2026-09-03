"use client";
import Link from "next/link";

export default function ConsumptionCard() {
  return (
    <Link
      href="/dashboard/consumption"
      className="neu-raised p-6 flex flex-col items-center justify-center text-center min-h-[180px] hover:text-teal transition-colors group"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-9 h-9 mb-3 text-teal">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M8 17V10m5 7V6m5 11v-8" />
      </svg>
      <span className="font-sub tracking-wide text-white text-lg group-hover:text-teal">
        CONSUMPTION
      </span>
      <span className="font-body text-xs text-grey mt-2">
        View monthly usage &amp; bill →
      </span>
    </Link>
  );
}
