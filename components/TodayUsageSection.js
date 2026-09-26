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

  // ==========================================
  // DATE
  // ==========================================
  useEffect(() => {
    const updateDate = () => {
      const d = new Date();

      setTodayDate(
        d.toLocaleDateString("en-MY", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };

    updateDate();

    const interval = setInterval(updateDate, 60000);

    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // LOAD APPLIANCES + TARIFF
  // ==========================================
  useEffect(() => {
    async function fetchStatic() {
      const snap = await getDocs(
        collection(db, "appliances")
      );

      setAppliances(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );

      const tariffSnap = await getDoc(
        doc(db, "config", "tariff")
      );

      if (tariffSnap.exists()) {
        setTariff(
          tariffSnap.data().ratePerKwh ?? 0.218
        );
      }
    }

    fetchStatic();
  }, []);

  // ==========================================
  // READ TODAY'S LIVE CONSUMPTION
  // ==========================================
  useEffect(() => {
  const now = new Date();

  const dateKey =
    `${now.getFullYear()}-` +
    `${String(now.getMonth() + 1).padStart(2, "0")}-` +
    `${String(now.getDate()).padStart(2, "0")}`;

  console.log("TODAY DATE KEY:", dateKey);

  const consumptionRef = ref(
    rtdb,
    `consumption/${dateKey}`
  );

  const unsub = onValue(consumptionRef, (snap) => {
    console.log("TODAY FIREBASE DATA:", snap.val());

    setHoursData(snap.val() || {});
  });

  return () => unsub();
}, []);

  // ==========================================
  // DISPLAY
  // ==========================================
  return (
    <div className="neu-raised p-6">

      <h3 className="font-heading font-bold text-sm text-white text-center mb-6">
        {todayDate}
      </h3>

      <div className="grid grid-cols-2 gap-4">

        {appliances.map((a) => {

          // CALCULATIONS
          const hours =
            hoursData[a.id]?.hoursToday ?? 0;

          const watt =
            Number(a.watt) || 0;

          const energy =
            hours * (watt / 1000);

          const bill =
            energy * tariff;

          return (
            <div
              key={a.id}
              className="neu-inset p-4 text-center"
            >

              {/* APPLIANCE NAME */}
              <div className="font-sub tracking-wide text-teal text-sm mb-3 capitalize">
                {a.name || a.id}
              </div>

              {/* HOURS */}
              <div className="font-body text-xs text-grey mb-1">
                Used: {hours.toFixed(3)} hrs
              </div>

              {/* ENERGY */}
              <div className="font-body text-xs text-grey mb-1">
                Energy: {energy.toFixed(4)} kWh
              </div>

              {/* TARIFF */}
              <div className="font-body text-xs text-grey">
                Rate: RM {tariff.toFixed(3)}/kWh
              </div>

              {/* BILL */}
              <div className="font-heading text-white text-base mt-3">
                RM {bill.toFixed(3)}
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}