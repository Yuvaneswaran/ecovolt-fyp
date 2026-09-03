"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ref, onValue, set } from "firebase/database";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../contexts/AuthContext";
import { rtdb } from "../../../lib/firebase";

export default function LightingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState("manual");
  const [subMode, setSubMode] = useState("all");
  const [brightAll, setBrightAll] = useState(100);
  const [bright1, setBright1] = useState(100);
  const [bright2, setBright2] = useState(100);
  const [lux, setLux] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    const modeRef = ref(rtdb, "lightingControl/mode");
    const subModeRef = ref(rtdb, "lightingControl/manualSubMode");
    const allRef = ref(rtdb, "brightness/all");
    const l1Ref = ref(rtdb, "brightness/light1");
    const l2Ref = ref(rtdb, "brightness/light2");
    const luxRef = ref(rtdb, "lux/average");

    const unsubs = [
      onValue(modeRef, (s) => { if (s.exists()) setMode(s.val()); }),
      onValue(subModeRef, (s) => { if (s.exists()) setSubMode(s.val()); }),
      onValue(allRef, (s) => { if (s.exists()) setBrightAll(s.val()); }),
      onValue(l1Ref, (s) => { if (s.exists()) setBright1(s.val()); }),
      onValue(l2Ref, (s) => { if (s.exists()) setBright2(s.val()); }),
      onValue(luxRef, (s) => { setLux(s.val()); setReady(true); }),
    ];
    return () => unsubs.forEach((u) => u());
  }, []);

  const setModeValue = (val) => set(ref(rtdb, "lightingControl/mode"), val);
  const setSubModeValue = (val) => set(ref(rtdb, "lightingControl/manualSubMode"), val);

  if (loading || !user) return null;

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="relative min-h-[85vh] px-6 md:px-16 py-10">
        <h1 className="font-heading font-bold text-lg md:text-xl text-white mb-8">
          LIGHTING CONTROL
        </h1>

        {/* Mode toggle */}
        <div className="neu-raised p-6 mb-6">
          <span className="font-sub tracking-wide text-grey text-sm block mb-3">
            MODE
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => setModeValue("auto")}
              className={`flex-1 py-3 rounded-xl font-sub tracking-wide text-sm transition-colors ${
                mode === "auto" ? "neu-glow text-teal" : "switch-off text-grey"
              }`}
            >
              AUTOMATIC
            </button>
            <button
              onClick={() => setModeValue("manual")}
              className={`flex-1 py-3 rounded-xl font-sub tracking-wide text-sm transition-colors ${
                mode === "manual" ? "neu-glow text-teal" : "switch-off text-grey"
              }`}
            >
              MANUAL
            </button>
          </div>
        </div>

        {/* Auto mode info */}
        {mode === "auto" && (
          <div className="neu-inset p-6 text-center">
            <p className="font-body text-grey text-sm mb-2">
              Brightness is being controlled automatically based on ambient light.
            </p>
            <p className="font-body text-white text-sm">
              Current lux: {ready ? `${Math.round(lux ?? 0)} lux` : "..."}
            </p>
          </div>
        )}

        {/* Manual mode controls */}
        {mode === "manual" && (
          <div className="neu-raised p-6">
            <span className="font-sub tracking-wide text-grey text-sm block mb-3">
              MANUAL SETTING
            </span>
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setSubModeValue("all")}
                className={`flex-1 py-2.5 rounded-xl font-sub tracking-wide text-sm transition-colors ${
                  subMode === "all" ? "neu-glow text-teal" : "switch-off text-grey"
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setSubModeValue("individual")}
                className={`flex-1 py-2.5 rounded-xl font-sub tracking-wide text-sm transition-colors ${
                  subMode === "individual" ? "neu-glow text-teal" : "switch-off text-grey"
                }`}
              >
                ONE BY ONE
              </button>
            </div>

            {subMode === "all" ? (
              <SliderRow
                label="ALL LIGHTS"
                value={brightAll}
                onChange={(v) => set(ref(rtdb, "brightness/all"), v)}
              />
            ) : (
              <div className="flex flex-col gap-6">
                <SliderRow
                  label="LIGHT 1"
                  value={bright1}
                  onChange={(v) => set(ref(rtdb, "brightness/light1"), v)}
                />
                <SliderRow
                  label="LIGHT 2"
                  value={bright2}
                  onChange={(v) => set(ref(rtdb, "brightness/light2"), v)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function SliderRow({ label, value, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-sub tracking-wide text-grey text-xs">{label}</span>
        <span className="font-body text-teal text-sm">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="lightning-slider w-full cursor-pointer"
      />
    </div>
  );
}