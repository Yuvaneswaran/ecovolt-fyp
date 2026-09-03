"use client";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../lib/firebase";

export default function OfflineBanner() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const statusRef = ref(rtdb, "device/online");
    const unsub = onValue(statusRef, (snap) => {
      setOnline(snap.exists() ? snap.val() : false);
    });
    return () => unsub();
  }, []);

  if (online) return null;

  return (
    <div className="relative z-10 mx-6 md:mx-16 mt-6 neu-inset border border-amber-500/40 px-5 py-3 text-sm font-body text-amber-300">
      ⚠️ Device offline — showing last known data. Switches are disabled until the device reconnects.
    </div>
  );
}
