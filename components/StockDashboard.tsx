"use client";

import { useState } from "react";
import TradingViewWidget from "./TradingViewWidget";

const buttons = [
  { label: "Nvidia", symbol: "NASDAQ:NVDA" },
  { label: "Tesla", symbol: "NASDAQ:TSLA" },
  { label: "Bitcoin", symbol: "BITSTAMP:BTCUSD" },
];

export default function StockDashboard() {
  const [symbol, setSymbol] = useState("NASDAQ:AAPL");

  return (
    <div className="mt-20">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-center">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Search symbol e.g. NASDAQ:TSLA"
          className="w-full md:w-[420px] rounded-full bg-white/10 border border-white/20 px-6 py-3 text-white outline-none"
        />

        {buttons.map((button) => (
          <button
            key={button.symbol}
            onClick={() => setSymbol(button.symbol)}
            className={`rounded-full px-6 py-3 font-bold ${
              symbol === button.symbol
                ? "bg-green-400 text-black"
                : "bg-white/10 text-white"
            }`}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div className="rounded-3xl overflow-hidden border border-white/10">
        <TradingViewWidget symbol={symbol} />
      </div>
    </div>
  );
}