"use client";
import Link from "next/link";

export default function SwitchesCard() {
  return (
    <Link
      href="/dashboard/switches"
      className="neu-raised p-6 flex flex-col items-center justify-center text-center min-h-[180px] hover:text-teal transition-colors group"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-9 h-9 mb-3 text-teal">
        <rect x="4" y="8" width="16" height="8" rx="4" />
        <circle cx="15" cy="12" r="2.5" fill="currentColor" stroke="none" />
      </svg>
      <span className="font-sub tracking-wide text-white text-lg group-hover:text-teal">
        SWITCHES
      </span>
      <span className="font-body text-xs text-grey mt-2">
        Control appliances →
      </span>
    </Link>
  );
}
