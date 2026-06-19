"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Scorecard = {
  id: string;
  symbol: string;
  asset_name: string;
  asset_type: string;
  business_quality: number;
  risk_level: number;
  valuation_comfort: number;
  confidence_level: number;
  time_horizon: string;
  notes: string;
  final_score: number;
  result_label: string;
  created_at: string;
};

function getResultLabel(score: number) {
  if (score >= 80) return "Strong watchlist candidate";
  if (score >= 65) return "Worth researching further";
  if (score >= 50) return "Mixed setup";
  return "High caution";
}

function scoreClass(score: number) {
  if (score >= 80) return "text-green-400";
  if (score >= 65) return "text-cyan-300";
  if (score >= 50) return "text-yellow-300";
  return "text-red-300";
}

export default function ResearchScorecard() {
  const [scorecards, setScorecards] = useState<Scorecard[]>([]);
  const [symbol, setSymbol] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState("stock");
  const [businessQuality, setBusinessQuality] = useState(7);
  const [riskLevel, setRiskLevel] = useState(5);
  const [valuationComfort, setValuationComfort] = useState(6);
  const [confidenceLevel, setConfidenceLevel] = useState(6);
  const [timeHorizon, setTimeHorizon] = useState("Long term");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const previewScore = useMemo(() => {
    const riskScore = 11 - riskLevel;

    return Math.round(
      ((businessQuality + riskScore + valuationComfort + confidenceLevel) / 40) *
        100
    );
  }, [businessQuality, riskLevel, valuationComfort, confidenceLevel]);

  async function getAccessToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  }

  async function loadScorecards() {
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to load Research Scorecards.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/research-scorecards", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Research Scorecards could not be loaded.");
        setMessageType("error");
        return;
      }

      setScorecards(data.scorecards || []);
    } catch {
      setMessage("Research Scorecards could not be loaded.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function saveScorecard() {
    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to save a Research Scorecard.");
        setMessageType("error");
        setSaving(false);
        return;
      }

      const response = await fetch("/api/research-scorecards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          symbol,
          assetName,
          assetType,
          businessQuality,
          riskLevel,
          valuationComfort,
          confidenceLevel,
          timeHorizon,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Research Scorecard could not be saved.");
        setMessageType("error");
        return;
      }

      setMessage(`${data.message} Final score: ${data.finalScore}%.`);
      setMessageType("success");
      setSymbol("");
      setAssetName("");
      setAssetType("stock");
      setBusinessQuality(7);
      setRiskLevel(5);
      setValuationComfort(6);
      setConfidenceLevel(6);
      setTimeHorizon("Long term");
      setNotes("");
      await loadScorecards();
    } catch {
      setMessage("Research Scorecard could not be saved.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteScorecard(id: string) {
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to delete a Research Scorecard.");
        setMessageType("error");
        return;
      }

      const response = await fetch("/api/research-scorecards", {
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
        setMessage(data.message || "Research Scorecard could not be deleted.");
        setMessageType("error");
        return;
      }

      setScorecards((currentScorecards) =>
        currentScorecards.filter((scorecard) => scorecard.id !== id)
      );

      setMessage(data.message);
      setMessageType("success");
    } catch {
      setMessage("Research Scorecard could not be deleted.");
      setMessageType("error");
    }
  }

  useEffect(() => {
    loadScorecards();
  }, []);

  return (
    <section className="rounded-3xl border border-purple-400/20 bg-purple-400/10 p-8">
      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-purple-300">
        Research Scorecard
      </p>

      <div className="mb-8 grid grid-cols-1 lg:grid-cols-[1.5fr_0.8fr] gap-8">
        <div>
          <h2 className="text-4xl font-bold mb-4">
            Score an asset before making a decision
          </h2>

          <p className="max-w-3xl text-gray-300 leading-relaxed">
            Rate a stock or crypto asset using simple research factors. The final
            score helps you separate strong ideas from emotional decisions.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-gray-400">
            Live Score
          </p>

          <p className={`text-5xl font-bold ${scoreClass(previewScore)}`}>
            {previewScore}%
          </p>

          <p className="mt-3 text-gray-300">
            {getResultLabel(previewScore)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-5">
        <input
          value={symbol}
          onChange={(event) => setSymbol(event.target.value)}
          placeholder="Symbol, e.g. AAPL"
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-purple-300/60"
        />

        <input
          value={assetName}
          onChange={(event) => setAssetName(event.target.value)}
          placeholder="Asset name"
          className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-purple-300/60"
        />

        <select
          value={assetType}
          onChange={(event) => setAssetType(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-purple-300/60"
        >
          <option value="stock">Stock</option>
          <option value="crypto">Crypto</option>
          <option value="fund">Fund</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <label className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-semibold">Business quality</span>
            <span className="text-purple-300">{businessQuality}/10</span>
          </div>

          <input
            type="range"
            min="1"
            max="10"
            value={businessQuality}
            onChange={(event) => setBusinessQuality(Number(event.target.value))}
            className="w-full"
          />
        </label>

        <label className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-semibold">Risk level</span>
            <span className="text-purple-300">{riskLevel}/10</span>
          </div>

          <input
            type="range"
            min="1"
            max="10"
            value={riskLevel}
            onChange={(event) => setRiskLevel(Number(event.target.value))}
            className="w-full"
          />
        </label>

        <label className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-semibold">Valuation comfort</span>
            <span className="text-purple-300">{valuationComfort}/10</span>
          </div>

          <input
            type="range"
            min="1"
            max="10"
            value={valuationComfort}
            onChange={(event) => setValuationComfort(Number(event.target.value))}
            className="w-full"
          />
        </label>

        <label className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-semibold">Confidence level</span>
            <span className="text-purple-300">{confidenceLevel}/10</span>
          </div>

          <input
            type="range"
            min="1"
            max="10"
            value={confidenceLevel}
            onChange={(event) => setConfidenceLevel(Number(event.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <select
          value={timeHorizon}
          onChange={(event) => setTimeHorizon(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-purple-300/60"
        >
          <option value="Short term">Short term</option>
          <option value="Medium term">Medium term</option>
          <option value="Long term">Long term</option>
          <option value="Long-term compounder">Long-term compounder</option>
        </select>

        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Quick notes, positives, concerns or next steps"
          rows={4}
          className="lg:col-span-2 resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-purple-300/60"
        />
      </div>

      <button
        onClick={saveScorecard}
        disabled={saving}
        className="mt-5 rounded-full bg-purple-300 px-7 py-3 font-bold text-black hover:bg-purple-200 disabled:opacity-50"
      >
        {saving ? "Saving scorecard..." : "Save Research Scorecard"}
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
          Saved scorecards
        </h3>

        {loading && (
          <p className="text-gray-400">
            Loading Research Scorecards...
          </p>
        )}

        {!loading && scorecards.length === 0 && (
          <p className="text-gray-400">
            No Research Scorecards saved yet.
          </p>
        )}

        {!loading && scorecards.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {scorecards.map((scorecard) => (
              <div
                key={scorecard.id}
                className="rounded-2xl border border-white/10 bg-black/30 p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-purple-300">
                      {scorecard.asset_type}
                    </p>

                    <h4 className="text-3xl font-bold">
                      {scorecard.symbol}
                    </h4>

                    <p className="text-gray-300">
                      {scorecard.asset_name}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteScorecard(scorecard.id)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Delete
                  </button>
                </div>

                <p className={`text-4xl font-bold ${scoreClass(Number(scorecard.final_score))}`}>
                  {Number(scorecard.final_score)}%
                </p>

                <p className="mt-2 text-gray-300">
                  {scorecard.result_label}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-300">
                  <p>Quality: {scorecard.business_quality}/10</p>
                  <p>Risk: {scorecard.risk_level}/10</p>
                  <p>Valuation: {scorecard.valuation_comfort}/10</p>
                  <p>Confidence: {scorecard.confidence_level}/10</p>
                </div>

                <p className="mt-4 text-sm text-cyan-300">
                  Horizon: {scorecard.time_horizon}
                </p>

                {scorecard.notes && (
                  <p className="mt-5 whitespace-pre-wrap text-gray-300 leading-relaxed">
                    {scorecard.notes}
                  </p>
                )}

                <p className="mt-5 text-xs text-gray-500">
                  Saved{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(scorecard.created_at))}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-gray-500">
        Research Scorecards are personal research tools only. They do not provide
        investment advice, recommendations or trading signals.
      </p>
    </section>
  );
}