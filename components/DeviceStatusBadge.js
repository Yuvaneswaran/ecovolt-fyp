"use client";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../lib/firebase";

export default function DeviceStatusBadge() {
  const [online, setOnline] = useState(null);

  useEffect(() => {
    const statusRef = ref(rtdb, "device/online");
    const unsub = onValue(statusRef, (snap) => {
      setOnline(snap.exists() ? snap.val() : false);
    });
    return () => unsub();
  }, []);

  if (online === null) {
    return <div className="skeleton w-24 h-6" />;
  }

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sub tracking-wide ${
        online ? "text-teal" : "text-grey"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          online ? "bg-teal shadow-[0_0_8px_#00D9FF]" : "bg-grey"
        }`}
      />
      {online ? "DEVICE ONLINE" : "DEVICE OFFLINE"}
    </div>
  );
}
