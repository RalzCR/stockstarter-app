"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type WatchlistItem = {
  id: string;
  symbol: string;
  asset_name: string;
  asset_type: string;
  created_at: string;
};

const popularAssets = [
  { symbol: "AAPL", assetName: "Apple", assetType: "stock" },
  { symbol: "NVDA", assetName: "Nvidia", assetType: "stock" },
  { symbol: "TSLA", assetName: "Tesla", assetType: "stock" },
  { symbol: "MSFT", assetName: "Microsoft", assetType: "stock" },
  { symbol: "GOOGL", assetName: "Alphabet", assetType: "stock" },
  { symbol: "AMZN", assetName: "Amazon", assetType: "stock" },
  { symbol: "BTC", assetName: "Bitcoin", assetType: "crypto" },
  { symbol: "ETH", assetName: "Ethereum", assetType: "crypto" },
];

export default function CloudWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [symbol, setSymbol] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState<"stock" | "crypto" | "index" | "fund">("stock");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function getAccessToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  }

  async function loadWatchlist() {
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to load your cloud watchlist.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/cloud-watchlist", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Cloud watchlist could not be loaded.");
        setMessageType("error");
        return;
      }

      setWatchlist(data.watchlist || []);
    } catch {
      setMessage("Cloud watchlist could not be loaded.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function saveAsset(customAsset?: {
    symbol: string;
    assetName: string;
    assetType: string;
  }) {
    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to save assets.");
        setMessageType("error");
        setSaving(false);
        return;
      }

      const response = await fetch("/api/cloud-watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          symbol: customAsset?.symbol || symbol,
          assetName: customAsset?.assetName || assetName,
          assetType: customAsset?.assetType || assetType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Asset could not be saved.");
        setMessageType("error");
        return;
      }

      setMessage(data.message);
      setMessageType("success");
      setSymbol("");
      setAssetName("");
      setAssetType("stock");
      await loadWatchlist();
    } catch {
      setMessage("Asset could not be saved.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  async function removeAsset(id: string) {
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to remove assets.");
        setMessageType("error");
        return;
      }

      const response = await fetch("/api/cloud-watchlist", {
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
        setMessage(data.message || "Asset could not be removed.");
        setMessageType("error");
        return;
      }

      setWatchlist((currentWatchlist) =>
        currentWatchlist.filter((item) => item.id !== id)
      );
      setMessage(data.message);
      setMessageType("success");
    } catch {
      setMessage("Asset could not be removed.");
      setMessageType("error");
    }
  }

  useEffect(() => {
    loadWatchlist();
  }, []);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-cyan-400">
        Cloud Watchlist
      </p>

      <h2 className="text-4xl font-bold mb-4">
        Save assets to your account
      </h2>

      <p className="max-w-3xl text-gray-300 leading-relaxed mb-8">
        Build an account-based watchlist for the stocks, crypto assets and market
        symbols you want to follow regularly.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-5">
        <input
          value={symbol}
          onChange={(event) => setSymbol(event.target.value)}
          placeholder="Symbol, e.g. AAPL"
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-cyan-400/60"
        />

        <input
          value={assetName}
          onChange={(event) => setAssetName(event.target.value)}
          placeholder="Asset name"
          className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-cyan-400/60"
        />

        <select
          value={assetType}
          onChange={(event) =>
            setAssetType(event.target.value as "stock" | "crypto" | "index" | "fund")
          }
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-cyan-400/60"
        >
          <option value="stock">Stock</option>
          <option value="crypto">Crypto</option>
          <option value="index">Index</option>
          <option value="fund">Fund</option>
        </select>
      </div>

      <button
        onClick={() => saveAsset()}
        disabled={saving}
        className="rounded-full bg-cyan-400 px-7 py-3 font-bold text-black hover:bg-cyan-300 disabled:opacity-50"
      >
        {saving ? "Saving asset..." : "Save Asset"}
      </button>

      <div className="mt-8">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-gray-400">
          Quick add
        </p>

        <div className="flex flex-wrap gap-3">
          {popularAssets.map((asset) => (
            <button
              key={asset.symbol}
              onClick={() => saveAsset(asset)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {asset.symbol}
            </button>
          ))}
        </div>
      </div>

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
          Saved assets
        </h3>

        {loading && (
          <p className="text-gray-400">
            Loading cloud watchlist...
          </p>
        )}

        {!loading && watchlist.length === 0 && (
          <p className="text-gray-400">
            No assets saved yet.
          </p>
        )}

        {!loading && watchlist.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {watchlist.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-black/30 p-5"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                      {item.asset_type}
                    </p>

                    <h4 className="text-3xl font-bold">
                      {item.symbol}
                    </h4>

                    <p className="text-gray-300">
                      {item.asset_name}
                    </p>
                  </div>

                  <button
                    onClick={() => removeAsset(item.id)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Remove
                  </button>
                </div>

                <a
                  href={`https://www.tradingview.com/symbols/${item.symbol}/`}
                  target="_blank"
                  className="text-sm font-semibold text-green-400 hover:text-green-300"
                >
                  Open market chart →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}