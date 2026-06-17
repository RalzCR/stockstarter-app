"use client";

import { useEffect, useState } from "react";
import TradingViewWidget from "./TradingViewWidget";

const popularSymbols = [
  { label: "Apple", symbol: "NASDAQ:AAPL" },
  { label: "Nvidia", symbol: "NASDAQ:NVDA" },
  { label: "Tesla", symbol: "NASDAQ:TSLA" },
  { label: "Microsoft", symbol: "NASDAQ:MSFT" },
  { label: "Bitcoin", symbol: "BITSTAMP:BTCUSD" },
  { label: "Ethereum", symbol: "BITSTAMP:ETHUSD" },
];

export default function StockDashboard() {
  const [selectedSymbol, setSelectedSymbol] = useState("NASDAQ:AAPL");
  const [inputSymbol, setInputSymbol] = useState("NASDAQ:AAPL");
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("stockstarter-watchlist");

    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "stockstarter-watchlist",
      JSON.stringify(watchlist)
    );
  }, [watchlist]);

  function loadSymbol(symbol: string) {
    setSelectedSymbol(symbol);
    setInputSymbol(symbol);
  }

  function addToWatchlist() {
    const cleanedSymbol = inputSymbol.trim().toUpperCase();

    if (!cleanedSymbol) return;

    if (!watchlist.includes(cleanedSymbol)) {
      setWatchlist([...watchlist, cleanedSymbol]);
    }

    loadSymbol(cleanedSymbol);
  }

  function removeFromWatchlist(symbol: string) {
    setWatchlist(watchlist.filter((item) => item !== symbol));
  }

  return (
    <section className="mt-20 text-left">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.25em] text-green-400 mb-3">
          Live Chart
        </p>

        <h2 className="text-4xl font-bold mb-4">
          Search any stock or crypto
        </h2>

        <p className="text-gray-400">
          Try symbols like NASDAQ:TSLA, NASDAQ:NVDA, BITSTAMP:BTCUSD or NASDAQ:AAPL.
        </p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          value={inputSymbol}
          onChange={(e) => setInputSymbol(e.target.value)}
          placeholder="Search symbol e.g. NASDAQ:TSLA"
          className="w-full rounded-full bg-white/10 border border-white/20 px-6 py-3 text-white outline-none focus:border-green-400/60"
        />

        <button
          onClick={() => loadSymbol(inputSymbol.trim().toUpperCase())}
          className="rounded-full bg-green-400 text-black px-6 py-3 font-bold hover:bg-green-300 whitespace-nowrap"
        >
          Load Chart
        </button>

        <button
          onClick={addToWatchlist}
          className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-bold hover:bg-white/20 whitespace-nowrap"
        >
          Add to Watchlist
        </button>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {popularSymbols.map((item) => (
          <button
            key={item.symbol}
            onClick={() => loadSymbol(item.symbol)}
            className={`rounded-full px-5 py-2 font-semibold transition ${
              selectedSymbol === item.symbol
                ? "bg-green-400 text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {watchlist.length > 0 && (
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-bold mb-4">
            Your Watchlist
          </h3>

          <div className="flex flex-wrap gap-3">
            {watchlist.map((symbol) => (
              <div
                key={symbol}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2"
              >
                <button
                  onClick={() => loadSymbol(symbol)}
                  className="font-semibold text-white hover:text-green-400"
                >
                  {symbol}
                </button>

                <button
                  onClick={() => removeFromWatchlist(symbol)}
                  className="text-gray-400 hover:text-red-400"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-3xl overflow-hidden border border-white/10">
        <TradingViewWidget symbol={selectedSymbol} />
      </div>
    </section>
  );
}