"use client";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../lib/firebase";

function timeAgo(ts) {
  if (!ts) return "—";
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  return `${m}m ago`;
}

export default function LuxCard() {
  const [lux, setLux] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    // Expects ESP32 to write the average of the 4 BH1750 sensors here,
    // e.g. Firebase.RTDB.setFloat(&fbdo, "/lux/average", avgLux);
    const luxRef = ref(rtdb, "lux/average");
    const unsub = onValue(luxRef, (snap) => {
      setLux(snap.val());
      setUpdatedAt(Date.now());
    });
    return () => unsub();
  }, []);

  return (
    <div className="neu-raised p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
      <span className="font-sub tracking-wide text-grey text-sm mb-2">
        BRIGHTNESS (AVG)
      </span>
      {lux === null ? (
        <div className="skeleton w-24 h-10" />
      ) : (
        <span className="font-heading font-bold text-3xl text-white">
          {Math.round(lux)} <span className="text-lg text-grey">lux</span>
        </span>
      )}
      <span className="font-body text-xs text-grey mt-3">
        Updated {timeAgo(updatedAt)}
      </span>
    </div>
  );
}
