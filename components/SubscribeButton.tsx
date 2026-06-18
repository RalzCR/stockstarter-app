"use client";

import { useState } from "react";

type SubscribeButtonProps = {
  label: string;
  plan: "plus" | "premium";
};

export default function SubscribeButton({ label, plan }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function startCheckout() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        setMessage(data.message || "Checkout could not be started.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setMessage("Checkout could not be started. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={startCheckout}
        disabled={loading}
        className="rounded-full bg-green-400 px-7 py-3 font-bold text-black hover:bg-green-300 disabled:opacity-50"
      >
        {loading ? "Opening checkout..." : label}
      </button>

      {message && (
        <p className="mt-3 text-sm text-red-400">
          {message}
        </p>
      )}
    </div>
  );
}