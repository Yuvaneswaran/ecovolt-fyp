"use client";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { rtdb, db } from "../lib/firebase";

export default function TodayUsageSection() {
  const [appliances, setAppliances] = useState([]);
  const [hoursData, setHoursData] = useState({});
  const [tariff, setTariff] = useState(0.218);
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const d = new Date();
      setTodayDate(d.toLocaleDateString("en-MY", { day: "numeric", month: "long", year: "numeric" }));
    };
    updateDate();
    const interval = setInterval(updateDate, 60000); // refresh in case date rolls over while page is open
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchStatic() {
      const snap = await getDocs(collection(db, "appliances"));
      setAppliances(snap.docs.map((d) => ({ id: d.id, ...d.data() })));

      const tariffSnap = await getDoc(doc(db, "config", "tariff"));
      if (tariffSnap.exists()) setTariff(tariffSnap.data().ratePerKwh ?? 0.218);
    }
    fetchStatic();
  }, []);

  useEffect(() => {
    const dateKey = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const consumptionRef = ref(rtdb, `consumption/${dateKey}`);
    const unsub = onValue(consumptionRef, (snap) => {
      setHoursData(snap.val() || {});
    });
    return () => unsub();
  }, []);

  return (
    <div className="neu-raised p-6">
      <h3 className="font-heading font-bold text-sm text-white text-center mb-6">
        {todayDate}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {appliances.map((a) => {
          const hours = hoursData[a.id]?.hoursToday ?? 0;
          const bill = hours * (a.watt / 1000) * tariff;
          return (
            <div key={a.id} className="neu-inset p-4 text-center">
              <div className="font-sub tracking-wide text-teal text-sm mb-2 capitalize">
                {a.name || a.id}
              </div>
              <div className="font-body text-xs text-grey">
                {hours.toFixed(2)} hrs × RM{tariff}
              </div>
              <div className="font-heading text-white text-base mt-2">
                RM {bill.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}