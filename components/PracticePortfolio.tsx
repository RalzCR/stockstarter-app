"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type PracticePortfolioData = {
  id: string;
  user_id: string;
  user_email: string;
  starting_cash: number;
  cash_balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
};

type PracticeHolding = {
  id: string;
  symbol: string;
  asset_name: string;
  asset_type: string;
  quantity: number;
  average_price: number;
  currency: string;
  created_at: string;
  updated_at: string;
};

type PracticeTrade = {
  id: string;
  symbol: string;
  asset_name: string;
  asset_type: string;
  side: string;
  quantity: number;
  trade_price: number;
  total_value: number;
  currency: string;
  notes: string;
  created_at: string;
};

type MarketData = {
  symbol: string;
  currentPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  chart: {
    time: string;
    price: number;
  }[];
  updatedAt: string;
};

function formatMoney(value: number, currency = "GBP") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 6,
  }).format(Number(value || 0));
}

function MiniLineChart({ points }: { points: MarketData["chart"] }) {
  if (!points || points.length < 2) {
    return (
      <div className="flex h-32 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-sm text-gray-500">
        Chart unavailable
      </div>
    );
  }

  const width = 520;
  const height = 150;
  const padding = 16;
  const prices = points.map((point) => point.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const range = maxPrice - minPrice || 1;

  const path = points
    .map((point, index) => {
      const x =
        padding +
        (index / Math.max(points.length - 1, 1)) * (width - padding * 2);
      const y =
        height -
        padding -
        ((point.price - minPrice) / range) * (height - padding * 2);

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const finalPrice = points[points.length - 1]?.price || 0;
  const firstPrice = points[0]?.price || 0;
  const isUp = finalPrice >= firstPrice;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-36 w-full">
        <path
          d={path}
          fill="none"
          stroke={isUp ? "#4ade80" : "#f87171"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point, index) => {
          const x =
            padding +
            (index / Math.max(points.length - 1, 1)) * (width - padding * 2);
          const y =
            height -
            padding -
            ((point.price - minPrice) / range) * (height - padding * 2);

          if (index !== 0 && index !== points.length - 1) {
            return null;
          }

          return (
            <circle
              key={`${point.time}-${index}`}
              cx={x}
              cy={y}
              r="5"
              fill={isUp ? "#4ade80" : "#f87171"}
            />
          );
        })}
      </svg>

      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>{points[0]?.time}</span>
        <span>{points[points.length - 1]?.time}</span>
      </div>
    </div>
  );
}

export default function PracticePortfolio() {
  const [portfolio, setPortfolio] = useState<PracticePortfolioData | null>(null);
  const [holdings, setHoldings] = useState<PracticeHolding[]>([]);
  const [trades, setTrades] = useState<PracticeTrade[]>([]);
  const [marketDataBySymbol, setMarketDataBySymbol] = useState<
    Record<string, MarketData>
  >({});
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [symbol, setSymbol] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState("stock");
  const [quantity, setQuantity] = useState("");
  const [tradePrice, setTradePrice] = useState("");
  const [currency, setCurrency] = useState<"GBP" | "USD" | "EUR">("GBP");
  const [notes, setNotes] = useState("");
  const [selectedMarketData, setSelectedMarketData] =
    useState<MarketData | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);
  const [refreshingPrices, setRefreshingPrices] = useState(false);

  const estimatedTradeValue = useMemo(() => {
    const q = Number(quantity);
    const p = Number(tradePrice);

    if (!q || !p || q <= 0 || p <= 0) {
      return 0;
    }

    return q * p;
  }, [quantity, tradePrice]);

  const investedValue = useMemo(() => {
    return holdings.reduce((total, holding) => {
      return total + Number(holding.quantity) * Number(holding.average_price);
    }, 0);
  }, [holdings]);

  const liveHoldingsValue = useMemo(() => {
    return holdings.reduce((total, holding) => {
      const marketData = marketDataBySymbol[holding.symbol];
      const livePrice = marketData?.currentPrice || Number(holding.average_price);

      return total + Number(holding.quantity) * livePrice;
    }, 0);
  }, [holdings, marketDataBySymbol]);

  const totalPracticeValue = Number(portfolio?.cash_balance || 0) + liveHoldingsValue;
  const totalGainLoss = liveHoldingsValue - investedValue;
  const totalGainLossPercent = investedValue
    ? (totalGainLoss / investedValue) * 100
    : 0;

  async function getAccessToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  }

  async function fetchMarketData(symbolValue: string) {
    const cleanSymbol = symbolValue.trim().toUpperCase();

    if (!cleanSymbol) {
      return null;
    }

    const response = await fetch(
      `/api/practice-market-data?symbol=${encodeURIComponent(cleanSymbol)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Market data could not be loaded.");
    }

    return data as MarketData;
  }

  async function lookupCurrentPrice() {
    setLookingUp(true);
    setMessage("");
    setMessageType("");

    try {
      const data = await fetchMarketData(symbol);

      if (!data) {
        setMessage("Enter a symbol first.");
        setMessageType("error");
        return;
      }

      setSelectedMarketData(data);
      setTradePrice(String(Number(data.currentPrice.toFixed(2))));
      setCurrency("USD");

      setMarketDataBySymbol((current) => ({
        ...current,
        [data.symbol]: data,
      }));

      setMessage(`Loaded live price for ${data.symbol}.`);
      setMessageType("success");
    } catch (error) {
      setSelectedMarketData(null);
      setMessage(
        error instanceof Error
          ? error.message
          : "Live price could not be loaded."
      );
      setMessageType("error");
    } finally {
      setLookingUp(false);
    }
  }

  async function refreshHoldingPrices(currentHoldings: PracticeHolding[]) {
    if (!currentHoldings.length) {
      return;
    }

    setRefreshingPrices(true);

    const symbols = Array.from(
      new Set(currentHoldings.map((holding) => holding.symbol))
    );

    const results = await Promise.allSettled(
      symbols.map((holdingSymbol) => fetchMarketData(holdingSymbol))
    );

    const nextMarketData: Record<string, MarketData> = {};

    results.forEach((result) => {
      if (result.status === "fulfilled" && result.value) {
        nextMarketData[result.value.symbol] = result.value;
      }
    });

    setMarketDataBySymbol((current) => ({
      ...current,
      ...nextMarketData,
    }));

    setRefreshingPrices(false);
  }

  async function loadPortfolio() {
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to use the Practice Portfolio.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/practice-portfolio", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Practice Portfolio could not be loaded.");
        setMessageType("error");
        return;
      }

      setPortfolio(data.portfolio);
      setHoldings(data.holdings || []);
      setTrades(data.trades || []);

      await refreshHoldingPrices(data.holdings || []);
    } catch {
      setMessage("Practice Portfolio could not be loaded.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function submitTrade() {
    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to place a virtual trade.");
        setMessageType("error");
        setSaving(false);
        return;
      }

      const response = await fetch("/api/practice-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          side,
          symbol,
          assetName,
          assetType,
          quantity: Number(quantity),
          tradePrice: Number(tradePrice),
          currency,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Virtual trade could not be completed.");
        setMessageType("error");
        return;
      }

      setMessage(data.message);
      setMessageType("success");
      setSymbol("");
      setAssetName("");
      setAssetType("stock");
      setQuantity("");
      setTradePrice("");
      setCurrency("GBP");
      setNotes("");
      setSelectedMarketData(null);
      await loadPortfolio();
    } catch {
      setMessage("Virtual trade could not be completed.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadPortfolio();
  }, []);

  return (
    <section className="space-y-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-400">
          Stock Market Simulator
        </p>

        <h1 className="mb-5 text-5xl md:text-6xl font-bold">
          Build a virtual £100,000 portfolio
        </h1>

        <p className="max-w-4xl text-xl text-gray-300 leading-relaxed">
          Practise buying and selling stocks with virtual money. Use live price
          lookup, track your holdings and watch your simulator portfolio move
          with the market.
        </p>
      </div>

      {message && (
        <div
          className={`rounded-2xl border p-5 ${
            messageType === "success"
              ? "border-green-400/20 bg-green-400/10 text-green-300"
              : "border-red-400/20 bg-red-400/10 text-red-300"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        <div className="rounded-3xl border border-green-400/20 bg-green-400/10 p-6">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-green-400">
            Starting Cash
          </p>

          <h2 className="text-3xl font-bold">
            {formatMoney(Number(portfolio?.starting_cash || 100000), "GBP")}
          </h2>
        </div>

        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-400">
            Cash Balance
          </p>

          <h2 className="text-3xl font-bold">
            {formatMoney(Number(portfolio?.cash_balance || 0), "GBP")}
          </h2>
        </div>

        <div className="rounded-3xl border border-purple-400/20 bg-purple-400/10 p-6">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-purple-400">
            Cost Basis
          </p>

          <h2 className="text-3xl font-bold">
            {formatMoney(investedValue, "GBP")}
          </h2>
        </div>

        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-yellow-400">
            Live Holding Value
          </p>

          <h2 className="text-3xl font-bold">
            {formatMoney(liveHoldingsValue, "GBP")}
          </h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gray-400">
            Virtual P/L
          </p>

          <h2
            className={`text-3xl font-bold ${
              totalGainLoss >= 0 ? "text-green-400" : "text-red-300"
            }`}
          >
            {formatMoney(totalGainLoss, "GBP")}
          </h2>

          <p
            className={`mt-2 text-sm ${
              totalGainLoss >= 0 ? "text-green-400" : "text-red-300"
            }`}
          >
            {totalGainLossPercent.toFixed(2)}%
          </p>
        </div>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-gray-400">
          Virtual Trade
        </p>

        <h2 className="mb-6 text-4xl font-bold">
          Place a practice buy or sell
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <select
            value={side}
            onChange={(event) => setSide(event.target.value as "buy" | "sell")}
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-300/60"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>

          <input
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
            placeholder="Symbol, e.g. AAPL"
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-300/60"
          />

          <input
            value={assetName}
            onChange={(event) => setAssetName(event.target.value)}
            placeholder="Asset name"
            className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-300/60"
          />

          <select
            value={assetType}
            onChange={(event) => setAssetType(event.target.value)}
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-300/60"
          >
            <option value="stock">Stock</option>
            <option value="crypto">Crypto</option>
            <option value="fund">Fund / ETF</option>
            <option value="other">Other</option>
          </select>

          <button
            onClick={lookupCurrentPrice}
            disabled={lookingUp}
            className="rounded-2xl bg-cyan-400 px-5 py-4 font-bold text-black hover:bg-cyan-300 disabled:opacity-50"
          >
            {lookingUp ? "Loading..." : "Live Price"}
          </button>
        </div>

        {selectedMarketData && (
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-5">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-6">
              <p className="mb-2 text-sm uppercase tracking-[0.25em] text-cyan-300">
                Live Price
              </p>

              <h3 className="text-4xl font-bold">
                {formatMoney(selectedMarketData.currentPrice, "USD")}
              </h3>

              <p
                className={`mt-2 text-sm ${
                  selectedMarketData.change >= 0
                    ? "text-green-400"
                    : "text-red-300"
                }`}
              >
                {selectedMarketData.change >= 0 ? "+" : ""}
                {selectedMarketData.change.toFixed(2)} (
                {selectedMarketData.changePercent.toFixed(2)}%)
              </p>
            </div>

            <MiniLineChart points={selectedMarketData.chart} />
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
          <input
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            placeholder="Quantity"
            type="number"
            min="0"
            step="any"
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-300/60"
          />

          <input
            value={tradePrice}
            onChange={(event) => setTradePrice(event.target.value)}
            placeholder="Trade price"
            type="number"
            min="0"
            step="any"
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-300/60"
          />

          <select
            value={currency}
            onChange={(event) =>
              setCurrency(event.target.value as "GBP" | "USD" | "EUR")
            }
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-300/60"
          >
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>

          <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
              Trade Value
            </p>

            <p className="mt-1 text-2xl font-bold">
              {formatMoney(estimatedTradeValue, currency)}
            </p>
          </div>
        </div>

        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Optional reason for this virtual trade"
          rows={4}
          className="mt-4 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-300/60"
        />

        <button
          onClick={submitTrade}
          disabled={saving}
          className="mt-5 rounded-full bg-green-400 px-7 py-3 font-bold text-black hover:bg-green-300 disabled:opacity-50"
        >
          {saving ? "Saving virtual trade..." : "Complete Virtual Trade"}
        </button>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-gray-400">
              Holdings
            </p>

            <h2 className="text-4xl font-bold">
              Current virtual holdings
            </h2>
          </div>

          <button
            onClick={() => refreshHoldingPrices(holdings)}
            disabled={refreshingPrices || holdings.length === 0}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 disabled:opacity-50"
          >
            {refreshingPrices ? "Refreshing..." : "Refresh Live Prices"}
          </button>
        </div>

        {loading && (
          <p className="text-gray-400">
            Loading holdings...
          </p>
        )}

        {!loading && holdings.length === 0 && (
          <p className="text-gray-400">
            No virtual holdings yet. Place a practice buy to start building your portfolio.
          </p>
        )}

        {!loading && holdings.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {holdings.map((holding) => {
              const marketData = marketDataBySymbol[holding.symbol];
              const livePrice =
                marketData?.currentPrice || Number(holding.average_price);
              const costValue =
                Number(holding.quantity) * Number(holding.average_price);
              const liveValue = Number(holding.quantity) * livePrice;
              const gainLoss = liveValue - costValue;
              const gainLossPercent = costValue ? (gainLoss / costValue) * 100 : 0;

              return (
                <div
                  key={holding.id}
                  className="rounded-2xl border border-white/10 bg-black/30 p-6"
                >
                  <p className="mb-2 text-sm uppercase tracking-[0.25em] text-green-400">
                    {holding.asset_type}
                  </p>

                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-bold">
                        {holding.symbol}
                      </h3>

                      <p className="text-gray-300">
                        {holding.asset_name}
                      </p>
                    </div>

                    <p className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
                      {holding.currency}
                    </p>
                  </div>

                  {marketData?.chart && (
                    <div className="mb-5">
                      <MiniLineChart points={marketData.chart} />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-gray-300">
                    <p>
                      Quantity
                      <span className="block text-xl font-bold text-white">
                        {formatNumber(Number(holding.quantity))}
                      </span>
                    </p>

                    <p>
                      Average price
                      <span className="block text-xl font-bold text-white">
                        {formatMoney(Number(holding.average_price), holding.currency)}
                      </span>
                    </p>

                    <p>
                      Live price
                      <span className="block text-xl font-bold text-white">
                        {formatMoney(livePrice, "USD")}
                      </span>
                    </p>

                    <p>
                      Live value
                      <span className="block text-xl font-bold text-white">
                        {formatMoney(liveValue, "USD")}
                      </span>
                    </p>

                    <p>
                      Virtual P/L
                      <span
                        className={`block text-xl font-bold ${
                          gainLoss >= 0 ? "text-green-400" : "text-red-300"
                        }`}
                      >
                        {formatMoney(gainLoss, "USD")}
                      </span>
                    </p>

                    <p>
                      P/L %
                      <span
                        className={`block text-xl font-bold ${
                          gainLoss >= 0 ? "text-green-400" : "text-red-300"
                        }`}
                      >
                        {gainLossPercent.toFixed(2)}%
                      </span>
                    </p>
                  </div>

                  <p className="mt-5 text-xs text-gray-500">
                    Live prices use available market data and may be delayed or unavailable for some symbols.
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-gray-400">
          Trade History
        </p>

        <h2 className="mb-6 text-4xl font-bold">
          Recent virtual trades
        </h2>

        {loading && (
          <p className="text-gray-400">
            Loading trade history...
          </p>
        )}

        {!loading && trades.length === 0 && (
          <p className="text-gray-400">
            No virtual trades yet.
          </p>
        )}

        {!loading && trades.length > 0 && (
          <div className="space-y-4">
            {trades.map((trade) => (
              <div
                key={trade.id}
                className="rounded-2xl border border-white/10 bg-black/30 p-5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p
                      className={`mb-1 text-sm uppercase tracking-[0.25em] ${
                        trade.side === "buy" ? "text-green-400" : "text-red-300"
                      }`}
                    >
                      {trade.side}
                    </p>

                    <h3 className="text-2xl font-bold">
                      {trade.symbol} — {trade.asset_name}
                    </h3>

                    <p className="text-gray-400">
                      {formatNumber(Number(trade.quantity))} units at{" "}
                      {formatMoney(Number(trade.trade_price), trade.currency)}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-2xl font-bold">
                      {formatMoney(Number(trade.total_value), trade.currency)}
                    </p>

                    <p className="text-sm text-gray-500">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(trade.created_at))}
                    </p>
                  </div>
                </div>

                {trade.notes && (
                  <p className="mt-4 text-gray-300">
                    {trade.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gray-400">
          Important
        </p>

        <p className="text-gray-300 leading-relaxed">
          Stock Market Simulator uses virtual money only. It does not place real
          trades, connect to a broker, provide investment advice or recommend
          any asset.
        </p>
      </section>
    </section>
  );
}