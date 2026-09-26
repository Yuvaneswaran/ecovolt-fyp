"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import CircuitBackground from "../../components/CircuitBackground";
import DeviceStatusBadge from "../../components/DeviceStatusBadge";
import OfflineBanner from "../../components/OfflineBanner";
import ResetDeviceButton from "../../components/ResetDeviceButton";
import ConsumptionCard from "../../components/ConsumptionCard";
import SwitchesCard from "../../components/SwitchesCard";
import OccupancyCard from "../../components/OccupancyCard";
import LuxCard from "../../components/LuxCard";
import LightingCard from "../../components/LightingCard";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <main className="relative min-h-screen">
        <Navbar />
        <div className="p-10 text-grey font-body">Loading...</div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="relative min-h-[85vh] px-6 md:px-16 py-10 overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-heading font-bold text-lg md:text-xl text-white">
              DASHBOARD
            </h1>
            <div className="flex items-center gap-4">
              <DeviceStatusBadge />
            </div>
          </div>

          <OfflineBanner />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <ConsumptionCard />
            <SwitchesCard />
            <OccupancyCard />
            <LuxCard />
            <div className="md:col-span-2">
              <LightingCard />
            </div>
            <div className="md:col-span-2">
              <ResetDeviceButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}