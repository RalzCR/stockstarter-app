"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type PriceLevel = {
  id: string;
  symbol: string;
  asset_name: string;
  target_price: number;
  currency: string;
  condition: string;
  reason: string;
  status: string;
  created_at: string;
};

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function PriceLevelsTracker() {
  const [levels, setLevels] = useState<PriceLevel[]>([]);
  const [symbol, setSymbol] = useState("");
  const [assetName, setAssetName] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [currency, setCurrency] = useState<"GBP" | "USD" | "EUR" | "INR">("GBP");
  const [condition, setCondition] = useState<"Above" | "Below">("Above");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("Watching");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function getAccessToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  }

  async function loadLevels() {
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to load price levels.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/price-levels", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Price levels could not be loaded.");
        setMessageType("error");
        return;
      }

      setLevels(data.levels || []);
    } catch {
      setMessage("Price levels could not be loaded.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function saveLevel() {
    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to save price levels.");
        setMessageType("error");
        setSaving(false);
        return;
      }

      const response = await fetch("/api/price-levels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          symbol,
          assetName,
          targetPrice: Number(targetPrice),
          currency,
          condition,
          reason,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Price level could not be saved.");
        setMessageType("error");
        return;
      }

      setMessage(data.message);
      setMessageType("success");
      setSymbol("");
      setAssetName("");
      setTargetPrice("");
      setCurrency("GBP");
      setCondition("Above");
      setReason("");
      setStatus("Watching");
      await loadLevels();
    } catch {
      setMessage("Price level could not be saved.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteLevel(id: string) {
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to delete price levels.");
        setMessageType("error");
        return;
      }

      const response = await fetch("/api/price-levels", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Price level could not be deleted.");
        setMessageType("error");
        return;
      }

      setLevels((currentLevels) =>
        currentLevels.filter((level) => level.id !== id)
      );

      setMessage(data.message);
      setMessageType("success");
    } catch {
      setMessage("Price level could not be deleted.");
      setMessageType("error");
    }
  }

  useEffect(() => {
    loadLevels();
  }, []);

  return (
    <section className="rounded-3xl border border-orange-400/20 bg-orange-400/10 p-8">
      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-orange-300">
        Price Levels Tracker
      </p>

      <h2 className="text-4xl font-bold mb-4">
        Save target levels to watch
      </h2>

      <p className="max-w-3xl text-gray-300 leading-relaxed mb-8">
        Save important price levels for stocks and crypto assets so your research
        has clear reference points over time.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-5">
        <input
          value={symbol}
          onChange={(event) => setSymbol(event.target.value)}
          placeholder="Symbol, e.g. AAPL"
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-300/60"
        />

        <input
          value={assetName}
          onChange={(event) => setAssetName(event.target.value)}
          placeholder="Asset name"
          className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-300/60"
        />

        <input
          value={targetPrice}
          onChange={(event) => setTargetPrice(event.target.value)}
          placeholder="Target price"
          type="number"
          min="0"
          step="any"
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-300/60"
        />

        <select
          value={currency}
          onChange={(event) =>
            setCurrency(event.target.value as "GBP" | "USD" | "EUR" | "INR")
          }
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-300/60"
        >
          <option value="GBP">GBP</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <select
          value={condition}
          onChange={(event) => setCondition(event.target.value as "Above" | "Below")}
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-300/60"
        >
          <option value="Above">Watch if price moves above</option>
          <option value="Below">Watch if price moves below</option>
        </select>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-300/60"
        >
          <option value="Watching">Watching</option>
          <option value="Important level">Important level</option>
          <option value="Needs review">Needs review</option>
          <option value="No longer relevant">No longer relevant</option>
        </select>
      </div>

      <textarea
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        placeholder="Why is this level important?"
        rows={4}
        className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-300/60"
      />

      <button
        onClick={saveLevel}
        disabled={saving}
        className="mt-5 rounded-full bg-orange-300 px-7 py-3 font-bold text-black hover:bg-orange-200 disabled:opacity-50"
      >
        {saving ? "Saving level..." : "Save Price Level"}
      </button>

      {message && (
        <p
          className={`mt-4 text-sm ${
            messageType === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-5">
          Saved price levels
        </h3>

        {loading && (
          <p className="text-gray-400">
            Loading price levels...
          </p>
        )}

        {!loading && levels.length === 0 && (
          <p className="text-gray-400">
            No price levels saved yet.
          </p>
        )}

        {!loading && levels.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {levels.map((level) => (
              <div
                key={level.id}
                className="rounded-2xl border border-white/10 bg-black/30 p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-orange-300">
                      {level.condition}
                    </p>

                    <h4 className="text-3xl font-bold">
                      {level.symbol}
                    </h4>

                    <p className="text-gray-300">
                      {level.asset_name}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteLevel(level.id)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Delete
                  </button>
                </div>

                <p className="text-2xl font-bold text-white">
                  {level.condition} {formatMoney(Number(level.target_price), level.currency)}
                </p>

                <p className="mt-2 text-sm text-green-400">
                  Status: {level.status}
                </p>

                <p className="mt-5 whitespace-pre-wrap text-gray-300 leading-relaxed">
                  {level.reason}
                </p>

                <p className="mt-5 text-xs text-gray-500">
                  Saved{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(level.created_at))}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-gray-500">
        Price levels are saved reference points only. StockStarter does not send
        automatic price notifications from this tool.
      </p>
    </section>
  );
}