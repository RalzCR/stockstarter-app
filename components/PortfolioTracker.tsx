"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Holding = {
  id: string;
  symbol: string;
  asset_name: string;
  asset_type: string;
  quantity: number;
  average_buy_price: number;
  currency: string;
  created_at: string;
};

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function PortfolioTracker() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [symbol, setSymbol] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState<"stock" | "crypto" | "index" | "fund">("stock");
  const [quantity, setQuantity] = useState("");
  const [averageBuyPrice, setAverageBuyPrice] = useState("");
  const [currency, setCurrency] = useState<"GBP" | "USD" | "EUR" | "INR">("GBP");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function getAccessToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  }

  async function loadHoldings() {
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to load your portfolio.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/portfolio-holdings", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Portfolio holdings could not be loaded.");
        setMessageType("error");
        return;
      }

      setHoldings(data.holdings || []);
    } catch {
      setMessage("Portfolio holdings could not be loaded.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function saveHolding() {
    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to save portfolio holdings.");
        setMessageType("error");
        setSaving(false);
        return;
      }

      const response = await fetch("/api/portfolio-holdings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          symbol,
          assetName,
          assetType,
          quantity: Number(quantity),
          averageBuyPrice: Number(averageBuyPrice),
          currency,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Portfolio holding could not be saved.");
        setMessageType("error");
        return;
      }

      setMessage(data.message);
      setMessageType("success");
      setSymbol("");
      setAssetName("");
      setAssetType("stock");
      setQuantity("");
      setAverageBuyPrice("");
      setCurrency("GBP");
      await loadHoldings();
    } catch {
      setMessage("Portfolio holding could not be saved.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  async function removeHolding(id: string) {
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to remove portfolio holdings.");
        setMessageType("error");
        return;
      }

      const response = await fetch("/api/portfolio-holdings", {
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
        setMessage(data.message || "Portfolio holding could not be removed.");
        setMessageType("error");
        return;
      }

      setHoldings((currentHoldings) =>
        currentHoldings.filter((holding) => holding.id !== id)
      );
      setMessage(data.message);
      setMessageType("success");
    } catch {
      setMessage("Portfolio holding could not be removed.");
      setMessageType("error");
    }
  }

  useEffect(() => {
    loadHoldings();
  }, []);

  const totalInvested = holdings.reduce((total, holding) => {
    return total + Number(holding.quantity) * Number(holding.average_buy_price);
  }, 0);

  const primaryCurrency = holdings[0]?.currency || currency;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-purple-400">
        Portfolio Tracker
      </p>

      <h2 className="text-4xl font-bold mb-4">
        Track your saved holdings
      </h2>

      <p className="max-w-3xl text-gray-300 leading-relaxed mb-8">
        Add assets you own or want to track, record your average buy price and keep
        your portfolio research organised inside your StockStarter account.
      </p>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-purple-400/20 bg-purple-400/10 p-5">
          <p className="text-sm text-purple-300 mb-2">Holdings saved</p>
          <h3 className="text-3xl font-bold">{holdings.length}</h3>
        </div>

        <div className="rounded-2xl border border-green-400/20 bg-green-400/10 p-5">
          <p className="text-sm text-green-300 mb-2">Estimated invested</p>
          <h3 className="text-3xl font-bold">
            {formatMoney(totalInvested, primaryCurrency)}
          </h3>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
          <p className="text-sm text-cyan-300 mb-2">Tracking mode</p>
          <h3 className="text-3xl font-bold">Manual</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-5">
        <input
          value={symbol}
          onChange={(event) => setSymbol(event.target.value)}
          placeholder="Symbol"
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-purple-400/60"
        />

        <input
          value={assetName}
          onChange={(event) => setAssetName(event.target.value)}
          placeholder="Asset name"
          className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-purple-400/60"
        />

        <select
          value={assetType}
          onChange={(event) =>
            setAssetType(event.target.value as "stock" | "crypto" | "index" | "fund")
          }
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-purple-400/60"
        >
          <option value="stock">Stock</option>
          <option value="crypto">Crypto</option>
          <option value="index">Index</option>
          <option value="fund">Fund</option>
        </select>

        <input
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="Quantity"
          type="number"
          min="0"
          step="any"
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-purple-400/60"
        />

        <input
          value={averageBuyPrice}
          onChange={(event) => setAverageBuyPrice(event.target.value)}
          placeholder="Avg buy price"
          type="number"
          min="0"
          step="any"
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-purple-400/60"
        />
      </div>

      <div className="mb-5 max-w-xs">
        <select
          value={currency}
          onChange={(event) =>
            setCurrency(event.target.value as "GBP" | "USD" | "EUR" | "INR")
          }
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-purple-400/60"
        >
          <option value="GBP">GBP</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>
      </div>

      <button
        onClick={saveHolding}
        disabled={saving}
        className="rounded-full bg-purple-400 px-7 py-3 font-bold text-black hover:bg-purple-300 disabled:opacity-50"
      >
        {saving ? "Saving holding..." : "Save Holding"}
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
          Saved holdings
        </h3>

        {loading && (
          <p className="text-gray-400">
            Loading portfolio holdings...
          </p>
        )}

        {!loading && holdings.length === 0 && (
          <p className="text-gray-400">
            No portfolio holdings saved yet.
          </p>
        )}

        {!loading && holdings.length > 0 && (
          <div className="space-y-4">
            {holdings.map((holding) => {
              const invested =
                Number(holding.quantity) * Number(holding.average_buy_price);

              return (
                <div
                  key={holding.id}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-purple-400">
                        {holding.asset_type}
                      </p>

                      <h4 className="text-3xl font-bold">
                        {holding.symbol}
                      </h4>

                      <p className="text-gray-300">
                        {holding.asset_name}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left lg:text-right">
                      <div>
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p className="font-bold text-white">{holding.quantity}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Average buy</p>
                        <p className="font-bold text-white">
                          {formatMoney(Number(holding.average_buy_price), holding.currency)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Invested</p>
                        <p className="font-bold text-white">
                          {formatMoney(invested, holding.currency)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeHolding(holding.id)}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-gray-500">
        Portfolio values are manually entered for tracking and education. StockStarter does not provide investment advice or brokerage services.
      </p>
    </section>
  );
}