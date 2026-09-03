"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import CircuitBackground from "../../components/CircuitBackground";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const { login, resetPassword } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (resetMode) {
        await resetPassword(email);
        showToast("Password reset email sent.", "info");
        setResetMode(false);
      } else {
        await login(email, password);
        showToast("Logged in successfully.", "info");
        router.push("/dashboard");
      }
    } catch (err) {
      showToast(err.message.replace("Firebase: ", ""), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
        <CircuitBackground opacity={0.35} />
        <form
          onSubmit={handleSubmit}
          className="relative z-10 neu-raised w-full max-w-sm p-8 flex flex-col gap-5"
        >
          <h1 className="font-heading font-bold text-lg text-white text-center mb-2">
            {resetMode ? "RESET PASSWORD" : "LOGIN"}
          </h1>

          <div>
            <label className="font-sub tracking-wide text-grey text-sm">
              EMAIL
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neu-inset w-full mt-1 px-4 py-3 rounded-xl bg-transparent text-white outline-none focus:ring-1 focus:ring-teal"
            />
          </div>

          {!resetMode && (
	<div>
  	<label className="font-sub tracking-wide text-grey text-sm">
   	 PASSWORD
 	 </label>
 	 <div className="relative mt-1">
  	  <input
  	    type={showPassword ? "text" : "password"}
    	  required
    	  value={password}
    	  onChange={(e) => setPassword(e.target.value)}
    	  className="neu-inset w-full px-4 py-3 pr-12 rounded-xl bg-transparent text-white outline-none focus:ring-1 focus:ring-teal"
   	 />

    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-grey hover:text-teal text-xs font-sub tracking-wide"
    >
      {showPassword ? "HIDE" : "SHOW"}
    </button>
  </div>
</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="neu-glow font-sub tracking-wider text-base py-3 rounded-xl text-white hover:text-teal transition-colors disabled:opacity-50"
          >
            {loading ? "PLEASE WAIT..." : resetMode ? "SEND RESET LINK" : "LOGIN"}
          </button>

          <button
            type="button"
            onClick={() => setResetMode((v) => !v)}
            className="font-body text-sm text-grey hover:text-teal transition-colors"
          >
            {resetMode ? "Back to login" : "Forgot password?"}
          </button>
        </form>
      </div>
    </main>
  );
}
