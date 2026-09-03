"use client";
import Link from "next/link";

export default function LightingCard() {
  return (
    <Link
      href="/dashboard/lighting"
      className="neu-raised p-6 flex flex-col items-center justify-center text-center min-h-[180px] hover:text-teal transition-colors group"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-9 h-9 mb-3 text-teal">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.5.5.8 1 .8 1.7V16h6.4v-.8c0-.7.3-1.2.8-1.7A6 6 0 0012 3z" />
      </svg>
      <span className="font-sub tracking-wide text-white text-lg group-hover:text-teal">
        LIGHTING CONTROL
      </span>
      <span className="font-body text-xs text-grey mt-2">
        Auto or manual brightness →
      </span>
    </Link>
  );
}