"use client";

import { useEffect, useState } from "react";
import {
  ref,
  query,
  orderByKey,
  startAt,
  endAt,
  onValue,
} from "firebase/database";
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import { rtdb, db } from "../lib/firebase";

function formatDateDisplay(dateKey) {
  const [y, m, d] = dateKey.split("-");
  return `${parseInt(d)}/${parseInt(m)}/${y}`;
}

export default function MonthlyBillTable() {
  const [appliances, setAppliances] = useState([]);
  const [tariff, setTariff] = useState(0.218);
  const [dailyBills, setDailyBills] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // =====================================================
  // LOAD APPLIANCE INFORMATION + TARIFF
  // =====================================================
  useEffect(() => {
    async function fetchStatic() {
      try {
        const snap = await getDocs(collection(db, "appliances"));

        const applianceList = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setAppliances(applianceList);

        const tariffSnap = await getDoc(
          doc(db, "config", "tariff")
        );

        const rate = tariffSnap.exists()
          ? tariffSnap.data().ratePerKwh ?? 0.218
          : 0.218;

        setTariff(rate);
      } catch (error) {
        console.error(
          "Error loading appliance information:",
          error
        );
      }
    }

    fetchStatic();
  }, []);

  // =====================================================
  // READ MONTH CONSUMPTION FROM FIREBASE RTDB
  // =====================================================
  useEffect(() => {
    if (appliances.length === 0) return;

    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(
      year,
      month,
      1
    )
      .toISOString()
      .split("T")[0];

    const lastDay = new Date(
      year,
      month + 1,
      0
    )
      .toISOString()
      .split("T")[0];

    const consumptionRef = ref(
      rtdb,
      "consumption"
    );

    const monthQuery = query(
      consumptionRef,
      orderByKey(),
      startAt(firstDay),
      endAt(lastDay)
    );

    const unsub = onValue(monthQuery, (snap) => {
      const data = snap.val() || {};

      const rows = Object.entries(data).map(
        ([dateKey, appliancesForDate]) => {
          let totalBill = 0;
          let totalKwh = 0;

          const applianceBreakdown = appliances.map(
            (a) => {
              const hours =
                appliancesForDate[a.id]?.hoursToday ?? 0;

              const watt = Number(a.watt) || 0;

              // Energy = Power(kW) × Time(hours)
              const kwh =
                hours * (watt / 1000);

              // Cost = Energy(kWh) × Tariff
              const bill =
                kwh * tariff;

              totalBill += bill;
              totalKwh += kwh;

              return {
                id: a.id,
                name: a.name || a.id,
                hours,
                watt,
                kwh,
                bill,
              };
            }
          );

          return {
            date: dateKey,
            bill: totalBill,
            kwh: totalKwh,
            appliances: applianceBreakdown,
          };
        }
      );

      // Most recent day first
      rows.sort((a, b) =>
        a.date < b.date ? 1 : -1
      );

      setDailyBills(rows);
      setLoaded(true);
    });

    return () => unsub();
  }, [appliances, tariff]);

  // Use local date instead of UTC date
  const now = new Date();

  const todayKey =
    `${now.getFullYear()}-` +
    `${String(now.getMonth() + 1).padStart(2, "0")}-` +
    `${String(now.getDate()).padStart(2, "0")}`;

  return (
    <div className="neu-raised p-6">

      <h3 className="font-heading font-bold text-sm text-white text-center mb-6">
        DAILY BILLS —{" "}
        {new Date().toLocaleDateString("en-MY", {
          month: "long",
          year: "numeric",
        })}
      </h3>

      {!loaded ? (

        <div className="skeleton w-full h-40" />

      ) : dailyBills.length === 0 ? (

        <p className="font-body text-grey text-sm text-center">
          No data yet this month.
        </p>

      ) : (

        <div className="max-h-96 overflow-y-auto">

          {dailyBills.map((row) => (

            <div
              key={row.date}
              className="border-b border-grey/10 py-4"
            >

              {/* DATE + DAILY TOTAL */}
              <div className="flex justify-between items-center mb-3">

                <span
                  className={
                    row.date === todayKey
                      ? "text-white font-bold font-body text-sm"
                      : "text-grey font-body text-sm"
                  }
                >
                  {formatDateDisplay(row.date)}
                </span>

                <span
                  className={
                    row.date === todayKey
                      ? "text-teal font-bold font-body text-sm"
                      : "text-grey font-body text-sm"
                  }
                >
                  RM {row.bill.toFixed(2)}
                </span>

              </div>

              {/* TOTAL ENERGY */}
              <div className="font-body text-xs text-grey mb-3">
                Total Energy: {row.kwh.toFixed(4)} kWh
              </div>

              {/* APPLIANCE BREAKDOWN */}
              <div className="space-y-2">

                {row.appliances.map((a) => (

                  <div
                    key={a.id}
                    className="grid grid-cols-3 gap-3 items-center font-body text-xs"
                  >

                    {/* APPLIANCE */}
                    <span className="text-teal capitalize">
                      {a.name}
                    </span>

                    {/* HOURS */}
                    <span className="text-grey text-center">
                      {a.hours.toFixed(3)} hrs
                    </span>

                    {/* BILL */}
                    <span className="text-white text-right">
                      RM {a.bill.toFixed(3)}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}