"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import TodayUsageSection from "../../../components/TodayUsageSection";
import MonthlyBillTable from "../../../components/MonthlyBillTable";
import YearlyBillChart from "../../../components/YearlyBillChart";
import { useAuth } from "../../../contexts/AuthContext";

export default function ConsumptionPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading || !user) return null;

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="relative min-h-[85vh] px-6 md:px-16 py-10">
        <h1 className="font-heading font-bold text-lg md:text-xl text-white mb-8">
          CONSUMPTION MONITORING
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TodayUsageSection />
          <MonthlyBillTable />
        </div>

        <YearlyBillChart />
      </div>
    </main>
  );
}