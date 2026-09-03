"use client";
import { useEffect, useState } from "react";
import { ref, query, orderByKey, startAt, endAt, onValue } from "firebase/database";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { rtdb, db } from "../lib/firebase";

function formatDateDisplay(dateKey) {
  // dateKey is "YYYY-MM-DD" -> convert to "D/M/YYYY" to match your mockup
  const [y, m, d] = dateKey.split("-");
  return `${parseInt(d)}/${parseInt(m)}/${y}`;
}

export default function MonthlyBillTable() {
  const [appliances, setAppliances] = useState([]);
  const [tariff, setTariff] = useState(0.218);
  const [dailyBills, setDailyBills] = useState([]); // [{ date, bill }]
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchStatic() {
      const snap = await getDocs(collection(db, "appliances"));
      const applianceList = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAppliances(applianceList);

      const tariffSnap = await getDoc(doc(db, "config", "tariff"));
      const rate = tariffSnap.exists() ? tariffSnap.data().ratePerKwh ?? 0.218 : 0.218;
      setTariff(rate);
    }
    fetchStatic();
  }, []);

  useEffect(() => {
    if (appliances.length === 0) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed
    const firstDay = new Date(year, month, 1).toISOString().split("T")[0];
    const lastDay = new Date(year, month + 1, 0).toISOString().split("T")[0];

    const consumptionRef = ref(rtdb, "consumption");
    const monthQuery = query(consumptionRef, orderByKey(), startAt(firstDay), endAt(lastDay));

    const unsub = onValue(monthQuery, (snap) => {
      const data = snap.val() || {};
      const rows = Object.entries(data).map(([dateKey, appliancesForDate]) => {
        let totalBill = 0;
        appliances.forEach((a) => {
          const hours = appliancesForDate[a.id]?.hoursToday ?? 0;
          totalBill += hours * (a.watt / 1000) * tariff;
        });
        return { date: dateKey, bill: totalBill };
      });
      rows.sort((a, b) => (a.date < b.date ? 1 : -1)); // most recent first
      setDailyBills(rows);
      setLoaded(true);
    });

    return () => unsub();
  }, [appliances, tariff]);

  const todayKey = new Date().toISOString().split("T")[0];

  return (
    <div className="neu-raised p-6">
      <h3 className="font-heading font-bold text-sm text-white text-center mb-6">
        DAILY BILLS — {new Date().toLocaleDateString("en-MY", { month: "long", year: "numeric" })}
      </h3>

      {!loaded ? (
        <div className="skeleton w-full h-40" />
      ) : dailyBills.length === 0 ? (
        <p className="font-body text-grey text-sm text-center">No data yet this month.</p>
      ) : (
        <div className="max-h-72 overflow-y-auto">
          <table className="w-full text-left font-body text-sm">
            <tbody>
              {dailyBills.map((row) => (
                <tr key={row.date} className="border-b border-grey/10">
                  <td className={`py-3 ${row.date === todayKey ? "text-white font-bold" : "text-grey"}`}>
                    {formatDateDisplay(row.date)}
                  </td>
                  <td className={`py-3 text-right ${row.date === todayKey ? "text-teal font-bold" : "text-grey"}`}>
                    RM {row.bill.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}