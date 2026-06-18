"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

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
      const { data } = await supabase.auth.getSession();

      if (!data.session?.access_token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify({
          plan,
        }),
      });

      const checkoutData = await response.json();

      if (!response.ok || !checkoutData.url) {
        setMessage(checkoutData.message || "Checkout could not be started.");
        return;
      }

      window.location.href = checkoutData.url;
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