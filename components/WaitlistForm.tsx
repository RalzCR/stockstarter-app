"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function joinWaitlist() {
    const cleanedEmail = email.trim().toLowerCase();

    if (!cleanedEmail.includes("@") || !cleanedEmail.includes(".")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanedEmail,
        }),
      });

      const data = await response.json();

      setMessage(data.message);

      if (response.ok) {
        setEmail("");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="waitlist"
      className="mt-24 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-left"
    >
      <p className="text-sm uppercase tracking-[0.25em] text-green-400 mb-3">
        Early Access
      </p>

      <h2 className="text-4xl font-bold mb-4">
        Join the StockStarter waitlist
      </h2>

      <p className="text-gray-300 mb-6 max-w-2xl">
        Get updates when AI summaries, saved portfolios, alerts and premium market tools are added.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-full bg-white/10 border border-white/20 px-6 py-3 text-white outline-none focus:border-green-400/60"
        />

        <button
          onClick={joinWaitlist}
          disabled={loading}
          className="rounded-full bg-green-400 text-black px-7 py-3 font-bold hover:bg-green-300 whitespace-nowrap disabled:opacity-50"
        >
          {loading ? "Joining..." : "Join Waitlist"}
        </button>
      </div>

      {message && (
        <p className="mt-4 text-sm text-green-400">
          {message}
        </p>
      )}

      <p className="mt-6 text-xs text-gray-500">
        Your email will be saved securely to the StockStarter waitlist.
      </p>
    </section>
  );
}