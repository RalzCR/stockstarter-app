"use client";

import { useMemo, useState } from "react";

function formatMoney(value: number, currency: string) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 6,
  }).format(value);
}

export default function RiskCalculator() {
  const [currency, setCurrency] = useState<"GBP" | "USD" | "EUR" | "INR">("GBP");
  const [portfolioValue, setPortfolioValue] = useState("");
  const [riskPercent, setRiskPercent] = useState("1");
  const [entryPrice, setEntryPrice] = useState("");
  const [referencePrice, setReferencePrice] = useState("");

  const results = useMemo(() => {
    const portfolio = Number(portfolioValue);
    const risk = Number(riskPercent);
    const entry = Number(entryPrice);
    const reference = Number(referencePrice);

    const amountAtRisk =
      Number.isFinite(portfolio) && Number.isFinite(risk)
        ? portfolio * (risk / 100)
        : 0;

    const riskPerUnit =
      Number.isFinite(entry) && Number.isFinite(reference)
        ? Math.abs(entry - reference)
        : 0;

    const estimatedUnits =
      amountAtRisk > 0 && riskPerUnit > 0 ? amountAtRisk / riskPerUnit : 0;

    const estimatedPositionValue =
      estimatedUnits > 0 && Number.isFinite(entry) ? estimatedUnits * entry : 0;

    const portfolioAllocation =
      estimatedPositionValue > 0 && portfolio > 0
        ? (estimatedPositionValue / portfolio) * 100
        : 0;

    return {
      amountAtRisk,
      riskPerUnit,
      estimatedUnits,
      estimatedPositionValue,
      portfolioAllocation,
    };
  }, [portfolioValue, riskPercent, entryPrice, referencePrice]);

  return (
    <section className="rounded-3xl border border-orange-400/20 bg-orange-400/10 p-8">
      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-orange-300">
        Risk Calculator
      </p>

      <h2 className="text-4xl font-bold mb-4">
        Estimate position size before acting
      </h2>

      <p className="max-w-3xl text-gray-300 leading-relaxed mb-8">
        Use a simple risk-based calculation to understand how position size,
        reference price and portfolio value affect the amount you could lose.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Currency
          </label>

          <select
            value={currency}
            onChange={(event) =>
              setCurrency(event.target.value as "GBP" | "USD" | "EUR" | "INR")
            }
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-300/60"
          >
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Portfolio value
          </label>

          <input
            value={portfolioValue}
            onChange={(event) => setPortfolioValue(event.target.value)}
            type="number"
            min="0"
            step="any"
            placeholder="10000"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-300/60"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Risk per idea %
          </label>

          <input
            value={riskPercent}
            onChange={(event) => setRiskPercent(event.target.value)}
            type="number"
            min="0"
            step="any"
            placeholder="1"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-300/60"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Entry price
          </label>

          <input
            value={entryPrice}
            onChange={(event) => setEntryPrice(event.target.value)}
            type="number"
            min="0"
            step="any"
            placeholder="100"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-300/60"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Stop/reference price
          </label>

          <input
            value={referencePrice}
            onChange={(event) => setReferencePrice(event.target.value)}
            type="number"
            min="0"
            step="any"
            placeholder="95"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-300/60"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-orange-400/20 bg-black/30 p-5">
          <p className="mb-2 text-sm text-orange-300">
            Maximum amount at risk
          </p>

          <h3 className="text-3xl font-bold">
            {formatMoney(results.amountAtRisk, currency)}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <p className="mb-2 text-sm text-gray-400">
            Risk per unit
          </p>

          <h3 className="text-3xl font-bold">
            {formatMoney(results.riskPerUnit, currency)}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <p className="mb-2 text-sm text-gray-400">
            Estimated units
          </p>

          <h3 className="text-3xl font-bold">
            {formatNumber(results.estimatedUnits)}
          </h3>
        </div>

        <div className="rounded-2xl border border-green-400/20 bg-green-400/10 p-5">
          <p className="mb-2 text-sm text-green-300">
            Estimated position value
          </p>

          <h3 className="text-3xl font-bold">
            {formatMoney(results.estimatedPositionValue, currency)}
          </h3>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-5">
        <p className="mb-2 text-sm text-gray-400">
          Estimated portfolio allocation
        </p>

        <h3 className="text-3xl font-bold">
          {Number.isFinite(results.portfolioAllocation)
            ? `${results.portfolioAllocation.toFixed(2)}%`
            : "—"}
        </h3>
      </div>

      <p className="mt-6 text-xs text-gray-500">
        This calculator is for education and personal planning only. It does not
        recommend any trade, position, stop price, investment amount or financial decision.
      </p>
    </section>
  );
}