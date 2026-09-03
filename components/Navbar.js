"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="relative z-20 flex items-center justify-between px-6 md:px-10 py-4 bg-black/40 backdrop-blur-sm border-b border-grey/10">
      <Link href="/" className="flex items-center gap-3">
	<div className="logo-badge w-12 h-12 rounded-full overflow-hidden bg-white relative">
  	<Image
    	src="/logo.png"
   	 alt="EcoVolt logo"
    	fill
    	className="object-cover scale-[1.7]"
 	 />
	</div>
        <span className="font-heading text-xs md:text-sm text-white leading-tight">
          ECOVOLT
        </span>
      </Link>

      <div className="flex items-center gap-4">
        {user && (
          <span className="font-sub tracking-wide text-grey text-sm hidden md:inline">
            Hi, {user.displayName || user.email?.split("@")[0]}
          </span>
        )}
        {user ? (
          <button
            onClick={logout}
            className="neu-raised font-sub tracking-wider text-sm px-5 py-2 rounded-xl hover:text-teal transition-colors"
          >
            LOGOUT
          </button>
        ) : (
          <Link
            href="/login"
            className="neu-raised font-sub tracking-wider text-sm px-5 py-2 rounded-xl hover:text-teal transition-colors"
          >
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
}
