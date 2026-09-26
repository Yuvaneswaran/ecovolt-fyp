"use client";

import { useState } from "react";
import { ref, set } from "firebase/database";
import { rtdb } from "../lib/firebase";

export default function ResetDeviceButton() {
  const [confirming, setConfirming] = useState(false);

  const handleReset = async () => {
    await set(ref(rtdb, "system/resetCommand"), true);
    setConfirming(false);
  };

  return (
    <div className="neu-raised p-4 text-center">
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="font-sub tracking-wide text-sm text-grey hover:text-teal transition-colors"
        >
          RESET DEVICE
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="font-body text-xs text-grey">
            This will restart the ESP32. Confirm?
          </p>

          <div className="flex gap-2 justify-center">
            <button
              onClick={handleReset}
              className="neu-glow px-4 py-1.5 rounded-lg text-xs text-white"
            >
              YES, RESET
            </button>

            <button
              onClick={() => setConfirming(false)}
              className="switch-off px-4 py-1.5 rounded-lg text-xs text-grey"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}