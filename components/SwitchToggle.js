"use client";
import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { rtdb } from "../lib/firebase";
import { useToast } from "../contexts/ToastContext";

const ICONS = {
  light: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.5.5.8 1 .8 1.7V16h6.4v-.8c0-.7.3-1.2.8-1.7A6 6 0 0012 3z" />
    </svg>
  ),
  fan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <path strokeLinecap="round" d="M12 12c0-3 2-6 5-6s3 4 0 5-5 1-5 1zM12 12c-3 0-6 2-6 5s4 3 5 0 1-5 1-5zM12 12c3 0 6-2 6 1s-4-3-5 0-1 5-1 5z" />
    </svg>
  ),
  socket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <circle cx="10" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="11" r="1" fill="currentColor" stroke="none" />
      <path strokeLinecap="round" d="M12 14v3" />
    </svg>
  ),
};

export default function SwitchToggle({ id, name, type, watt, deviceOnline, className = "" }) {
  const [state, setState] = useState(null);
  const [pending, setPending] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const stateRef = ref(rtdb, `switches/${id}`);
    const unsub = onValue(stateRef, (snap) => {
      setState(snap.val());
      setPending(false);
    });
    return () => unsub();
  }, [id]);

  const handleToggle = async () => {
    if (!deviceOnline) {
      showToast("Device is offline — can't toggle right now.", "warning");
      return;
    }
    setPending(true);
    try {
      await set(ref(rtdb, `switches/${id}`), !state);
    } catch (err) {
      showToast(`Failed to toggle ${name}.`, "error");
      setPending(false);
    }
  };

  const icon = ICONS[type] || ICONS.socket;

  return (
    <button
      onClick={handleToggle}
      disabled={pending || !deviceOnline}
      className={`${className} p-6 flex flex-col items-center text-center transition-all duration-300 ${
        state ? "neu-glow" : "switch-off"
      } ${!deviceOnline ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div className={state ? "text-teal" : "text-grey"}>{icon}</div>
      <span className="font-sub tracking-wide text-white text-base mt-3">
        {name}
      </span>
      <span className="font-body text-xs text-grey mt-1 capitalize">
        {type} · {watt}W
      </span>
      <span
        className={`font-sub tracking-wider text-xs mt-3 ${
          pending ? "text-grey animate-pulse" : state ? "text-teal" : "text-grey"
        }`}
      >
        {pending ? "UPDATING..." : state ? "ON" : "OFF"}
      </span>
    </button>
  );
}
