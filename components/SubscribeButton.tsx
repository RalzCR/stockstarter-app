"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

type SubscribeButtonProps = {
  plan: "plus" | "premium";
  label: string;
  className?: string;
};

export default function SubscribeButton({
  plan,
  label,
  className,
}: SubscribeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubscribe() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ plan }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "Checkout could not be started.");
        setIsLoading(false);
        return;
      }

      if (result.url) {
        window.location.href = result.url;
        return;
      }

      setErrorMessage("Checkout link was not returned.");
    } catch {
      setErrorMessage("Checkout could not be started. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleSubscribe}
        disabled={isLoading}
        className={
          className ||
          "flex w-full justify-center rounded-full bg-green-400 px-6 py-3 font-bold text-black hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-60"
        }
      >
        {isLoading ? "Loading..." : label}
      </button>

      {errorMessage && (
        <p className="mt-3 text-sm font-semibold text-red-300">
          {errorMessage}
        </p>
      )}
    </div>
  );
}