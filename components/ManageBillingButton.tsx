"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ManageBillingButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function openBillingPortal() {
    setLoading(true);
    setMessage("");

    try {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.access_token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch("/api/stripe-portal", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
        },
      });

      const portalData = await response.json();

      if (!response.ok || !portalData.url) {
        setMessage(portalData.message || "Billing portal could not be opened.");
        return;
      }

      window.location.href = portalData.url;
    } catch {
      setMessage("Billing portal could not be opened.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={openBillingPortal}
        disabled={loading}
        className="inline-flex rounded-full bg-green-400 px-6 py-3 font-bold text-black hover:bg-green-300 disabled:opacity-50"
      >
        {loading ? "Opening billing..." : "Manage Billing"}
      </button>

      {message && (
        <p className="mt-3 text-sm text-red-400">
          {message}
        </p>
      )}
    </div>
  );
}