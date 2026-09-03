"use client";
import { useEffect, useRef, useState } from "react";
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

export default function OccupancyCard() {
  const [count, setCount] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [tick, setTick] = useState(false);
  const prevCount = useRef(null);

  useEffect(() => {
    const countRef = ref(rtdb, "occupancy/count");
    const unsub = onValue(countRef, (snap) => {
      const val = snap.val();
      if (prevCount.current !== null && prevCount.current !== val) {
        setTick(true);
        setTimeout(() => setTick(false), 500);
      }
      prevCount.current = val;
      setCount(val);
      setUpdatedAt(Date.now());
    });
    return () => unsub();
  }, []);

  return (
    <div className="neu-raised p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
      <span className="font-sub tracking-wide text-grey text-sm mb-2">
        OCCUPANCY
      </span>
      {count === null ? (
        <div className="skeleton w-20 h-10" />
      ) : (
        <span
          className={`font-heading font-bold text-3xl text-white ${tick ? "tick-animate" : ""}`}
        >
          {count}
        </span>
      )}
      <span className="font-body text-xs text-grey mt-3">
        Updated {timeAgo(updatedAt)}
      </span>
    </div>
  );
}
