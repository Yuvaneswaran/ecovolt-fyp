"use client";
import { useEffect, useState } from "react";
import { ref, query, orderByKey, startAt, endAt, onValue } from "firebase/database";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { rtdb, db } from "../lib/firebase";

const MONTH_LABELS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const BAR_COLORS = ["#2E86FF", "#B98CFF", "#FFB25E", "#FFE45E", "#00D9FF", "#FF7A9E", "#7AFFB2", "#FFA07A", "#C0FF7A", "#7A9AFF", "#FF7AF0", "#7AFFE0"];

export default function YearlyBillChart() {
  const [appliances, setAppliances] = useState([]);
  const [tariff, setTariff] = useState(0.218);
  const [monthlyBills, setMonthlyBills] = useState(
    MONTH_LABELS.map((m) => ({ month: m, bill: 0 }))
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchStatic() {
      const snap = await getDocs(collection(db, "appliances"));
      setAppliances(snap.docs.map((d) => ({ id: d.id, ...d.data() })));

      const tariffSnap = await getDoc(doc(db, "config", "tariff"));
      setTariff(tariffSnap.exists() ? tariffSnap.data().ratePerKwh ?? 0.218 : 0.218);
    }
    fetchStatic();
  }, []);

  useEffect(() => {
    if (appliances.length === 0) return;

    const year = new Date().getFullYear();
    const firstDay = `${year}-01-01`;
    const lastDay = `${year}-12-31`;

    const consumptionRef = ref(rtdb, "consumption");
    const yearQuery = query(consumptionRef, orderByKey(), startAt(firstDay), endAt(lastDay));

    const unsub = onValue(yearQuery, (snap) => {
      const data = snap.val() || {};
      const totals = new Array(12).fill(0);

      Object.entries(data).forEach(([dateKey, appliancesForDate]) => {
        const monthIndex = parseInt(dateKey.split("-")[1], 10) - 1; // 0-indexed
        let dayBill = 0;
        appliances.forEach((a) => {
          const hours = appliancesForDate[a.id]?.hoursToday ?? 0;
          dayBill += hours * (a.watt / 1000) * tariff;
        });
        totals[monthIndex] += dayBill;
      });

      setMonthlyBills(MONTH_LABELS.map((m, i) => ({ month: m, bill: +totals[i].toFixed(2) })));
      setLoaded(true);
    });

    return () => unsub();
  }, [appliances, tariff]);

  return (
    <div className="neu-raised p-6">
      <h3 className="font-heading font-bold text-sm text-white text-center mb-6">
        MONTHLY BILL — {new Date().getFullYear()}
      </h3>

      {!loaded ? (
        <div className="skeleton w-full h-72" />
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={monthlyBills}>
            <CartesianGrid stroke="#7C838B" strokeOpacity={0.15} vertical={false} />
            <XAxis dataKey="month" stroke="#7C838B" fontSize={11} />
            <YAxis stroke="#7C838B" fontSize={11} />
            <Tooltip
              contentStyle={{
                background: "#10151D",
                border: "1px solid #7C838B33",
                borderRadius: 8,
              }}
              labelStyle={{ color: "#E8EAED" }}
              formatter={(value) => [`RM ${value}`, "Bill"]}
            />
            <Bar dataKey="bill" radius={[6, 6, 0, 0]}>
              {monthlyBills.map((entry, index) => (
                <Cell key={entry.month} fill={BAR_COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}