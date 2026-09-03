"use client";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useToast } from "../contexts/ToastContext";

export default function FeedbackSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    try {
      await addDoc(collection(db, "feedback"), {
        name: name.trim() || "Anonymous",
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      showToast("Thanks for your feedback!", "info");
      setName("");
      setMessage("");
    } catch (err) {
      showToast("Couldn't send feedback, try again.", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative py-16 px-6 md:px-16 max-w-xl mx-auto text-center border-t border-grey/10">
      <h2 className="font-heading font-bold text-lg text-white mb-2">
        FEEDBACK
      </h2>
      <p className="font-body text-grey text-sm mb-6">
        Got a suggestion or spotted something off? Let us know.
      </p>
      <form onSubmit={handleSubmit} className="neu-raised p-6 flex flex-col gap-4 text-left">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="neu-inset px-4 py-2.5 rounded-xl bg-transparent text-white text-sm outline-none focus:ring-1 focus:ring-teal"
        />
        <textarea
          placeholder="Your feedback..."
          required
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="neu-inset px-4 py-2.5 rounded-xl bg-transparent text-white text-sm outline-none focus:ring-1 focus:ring-teal resize-none"
        />
        <button
          type="submit"
          disabled={sending}
          className="neu-glow font-sub tracking-wider text-sm py-2.5 rounded-xl text-white hover:text-teal transition-colors disabled:opacity-50"
        >
          {sending ? "SENDING..." : "SEND FEEDBACK"}
        </button>
      </form>
    </section>
  );
}
