"use client";
import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { rtdb } from "../lib/firebase";

export default function BrightnessSlider() {
  const [brightness, setBrightness] = useState(100);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const brightRef = ref(rtdb, "brightness/light1");
    const unsub = onValue(brightRef, (snap) => {
      if (snap.exists()) setBrightness(snap.val());
      setLoaded(true);
    });
    return () => unsub();
  }, []);

  const handleChange = async (e) => {
    const value = parseInt(e.target.value, 10);
    setBrightness(value);
    await set(ref(rtdb, "brightness/light1"), value);
    await set(ref(rtdb, "brightness/light2"), value);
  };

  if (!loaded) {
    return <div className="skeleton w-full h-16 mt-4" />;
  }

  return (
    <div className="neu-inset p-4 mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-sub tracking-wide text-grey text-xs">
          BRIGHTNESS
        </span>
        <span className="font-body text-teal text-sm">{brightness}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        step="10"
        value={brightness}
        onChange={handleChange}
        className="lightning-slider w-full cursor-pointer"
      />
    </div>
  );
}