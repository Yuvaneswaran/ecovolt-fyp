"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
import Navbar from "../../../components/Navbar";
import CircuitBackground from "../../../components/CircuitBackground";
import OfflineBanner from "../../../components/OfflineBanner";
import SwitchToggle from "../../../components/SwitchToggle";
import { useAuth } from "../../../contexts/AuthContext";
import { db, rtdb } from "../../../lib/firebase";

export default function SwitchesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [appliances, setAppliances] = useState([]);
  const [deviceOnline, setDeviceOnline] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    async function fetchAppliances() {
      const snap = await getDocs(collection(db, "appliances"));
      setAppliances(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    fetchAppliances();

    const statusRef = ref(rtdb, "device/online");
    const unsub = onValue(statusRef, (snap) => {
      setDeviceOnline(snap.exists() ? snap.val() : false);
    });
    return () => unsub();
  }, []);

  if (loading || !user) return null;

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="relative min-h-[85vh] px-6 md:px-16 py-10 overflow-hidden">
        <CircuitBackground opacity={0.25} />
        <div className="relative z-10">
          <h1 className="font-heading font-bold text-lg md:text-xl text-white mb-8">
            SWITCHES
          </h1>
          <OfflineBanner />
<div className="grid grid-cols-6 gap-6 mt-6">
  {appliances.map((a, index) => {
    let positionClass = "col-span-2"; // top row: 3 buttons, 2 columns each = fills all 6
    if (index === 3) positionClass = "col-span-2 col-start-2"; // sits between col 1 & 2 of top row
    if (index === 4) positionClass = "col-span-2 col-start-4"; // sits between col 2 & 3 of top row
    return (
      <SwitchToggle
        key={a.id}
        id={a.id}
        name={a.name}
        type={a.type}
        watt={a.watt}
        deviceOnline={deviceOnline}
        className={positionClass}
      />
    );
  })}
</div>
        </div>
      </div>
    </main>
  );
}
