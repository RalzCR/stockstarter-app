"use client";

import { useEffect, useState } from "react";

type MarketData = {
  price: number;
  change: number;
};

export default function LiveMarketCards() {
  const [apple, setApple] = useState<MarketData | null>(null);
  const [nvidia, setNvidia] = useState<MarketData | null>(null);
  const [bitcoin, setBitcoin] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

      const appleRes = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${apiKey}`
      );

      const nvidiaRes = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=NVDA&token=${apiKey}`
      );

      const btcRes = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );

      const appleData = await appleRes.json();
      const nvidiaData = await nvidiaRes.json();
      const btcData = await btcRes.json();

      setApple({
        price: appleData.c,
        change: appleData.dp,
      });

      setNvidia({
        price: nvidiaData.c,
        change: nvidiaData.dp,
      });

      setBitcoin(btcData.bitcoin.usd);
    }

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-16">
      <div className="group rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl shadow-green-500/10 transition duration-300 hover:scale-105 hover:border-green-400/30">
        <p className="text-sm text-gray-400 mb-2">STOCK</p>
        <h3 className="text-3xl font-bold mb-1">Apple</h3>
        <p className="text-gray-400 mb-6">AAPL</p>

        {apple ? (
          <>
            <p className="text-2xl font-bold mb-2">
              ${apple.price.toFixed(2)}
            </p>

            <p
              className={`text-xl font-bold ${
                apple.change >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {apple.change > 0 ? "+" : ""}
              {apple.change.toFixed(2)}%
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="group rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 transition duration-300 hover:scale-105 hover:border-cyan-400/30">
        <p className="text-sm text-gray-400 mb-2">STOCK</p>
        <h3 className="text-3xl font-bold mb-1">Nvidia</h3>
        <p className="text-gray-400 mb-6">NVDA</p>

        {nvidia ? (
          <>
            <p className="text-2xl font-bold mb-2">
              ${nvidia.price.toFixed(2)}
            </p>

            <p
              className={`text-xl font-bold ${
                nvidia.change >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {nvidia.change > 0 ? "+" : ""}
              {nvidia.change.toFixed(2)}%
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="group rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl shadow-purple-500/10 transition duration-300 hover:scale-105 hover:border-purple-400/30">
        <p className="text-sm text-gray-400 mb-2">CRYPTO</p>
        <h3 className="text-3xl font-bold mb-1">Bitcoin</h3>
        <p className="text-gray-400 mb-6">BTC</p>

        {bitcoin ? (
          <p className="text-2xl font-bold text-yellow-400">
            ${bitcoin.toLocaleString()}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}