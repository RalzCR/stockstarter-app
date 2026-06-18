"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type MarketReport = {
  id: string;
  symbol: string;
  asset_name: string;
  report_type: string;
  timeframe: string;
  watch_status: string;
  summary: string;
  catalysts: string;
  risks: string;
  notes: string;
  created_at: string;
};

export default function MarketResearchReports() {
  const [reports, setReports] = useState<MarketReport[]>([]);
  const [symbol, setSymbol] = useState("");
  const [assetName, setAssetName] = useState("");
  const [reportType, setReportType] = useState<"stock" | "crypto" | "index" | "fund">("stock");
  const [timeframe, setTimeframe] = useState("1–3 months");
  const [watchStatus, setWatchStatus] = useState("Researching");
  const [summary, setSummary] = useState("");
  const [catalysts, setCatalysts] = useState("");
  const [risks, setRisks] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function getAccessToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  }

  async function loadReports() {
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to load market reports.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/market-reports", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Market reports could not be loaded.");
        setMessageType("error");
        return;
      }

      setReports(data.reports || []);
    } catch {
      setMessage("Market reports could not be loaded.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function saveReport() {
    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to save market reports.");
        setMessageType("error");
        setSaving(false);
        return;
      }

      const response = await fetch("/api/market-reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          symbol,
          assetName,
          reportType,
          timeframe,
          watchStatus,
          summary,
          catalysts,
          risks,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Market report could not be saved.");
        setMessageType("error");
        return;
      }

      setMessage(data.message);
      setMessageType("success");
      setSymbol("");
      setAssetName("");
      setReportType("stock");
      setTimeframe("1–3 months");
      setWatchStatus("Researching");
      setSummary("");
      setCatalysts("");
      setRisks("");
      setNotes("");
      await loadReports();
    } catch {
      setMessage("Market report could not be saved.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteReport(id: string) {
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to delete market reports.");
        setMessageType("error");
        return;
      }

      const response = await fetch("/api/market-reports", {
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
        setMessage(data.message || "Market report could not be deleted.");
        setMessageType("error");
        return;
      }

      setReports((currentReports) =>
        currentReports.filter((report) => report.id !== id)
      );
      setMessage(data.message);
      setMessageType("success");
    } catch {
      setMessage("Market report could not be deleted.");
      setMessageType("error");
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <section className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8">
      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-cyan-400">
        Premium Market Reports
      </p>

      <h2 className="text-4xl font-bold mb-4">
        Build structured research reports
      </h2>

      <p className="max-w-3xl text-gray-300 leading-relaxed mb-8">
        Premium users can create saved research reports covering a symbol, timeframe,
        catalysts, risks and personal research notes.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-5">
        <input
          value={symbol}
          onChange={(event) => setSymbol(event.target.value)}
          placeholder="Symbol, e.g. NVDA"
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-cyan-400/60"
        />

        <input
          value={assetName}
          onChange={(event) => setAssetName(event.target.value)}
          placeholder="Asset name"
          className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-cyan-400/60"
        />

        <select
          value={reportType}
          onChange={(event) =>
            setReportType(event.target.value as "stock" | "crypto" | "index" | "fund")
          }
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-cyan-400/60"
        >
          <option value="stock">Stock</option>
          <option value="crypto">Crypto</option>
          <option value="index">Index</option>
          <option value="fund">Fund</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <select
          value={timeframe}
          onChange={(event) => setTimeframe(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-cyan-400/60"
        >
          <option value="1–4 weeks">1–4 weeks</option>
          <option value="1–3 months">1–3 months</option>
          <option value="3–12 months">3–12 months</option>
          <option value="1 year+">1 year+</option>
        </select>

        <select
          value={watchStatus}
          onChange={(event) => setWatchStatus(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-cyan-400/60"
        >
          <option value="Researching">Researching</option>
          <option value="Watching closely">Watching closely</option>
          <option value="Needs more evidence">Needs more evidence</option>
          <option value="High uncertainty">High uncertainty</option>
        </select>
      </div>

      <textarea
        value={summary}
        onChange={(event) => setSummary(event.target.value)}
        placeholder="Research summary: what is happening and why are you watching this asset?"
        rows={4}
        className="mb-5 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-cyan-400/60"
      />

      <textarea
        value={catalysts}
        onChange={(event) => setCatalysts(event.target.value)}
        placeholder="Catalysts: earnings, product launches, sector momentum, macro events, crypto narratives, etc."
        rows={4}
        className="mb-5 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-cyan-400/60"
      />

      <textarea
        value={risks}
        onChange={(event) => setRisks(event.target.value)}
        placeholder="Risks: valuation, volatility, regulation, competition, weak guidance, liquidity, etc."
        rows={4}
        className="mb-5 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-cyan-400/60"
      />

      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Your research notes and questions to review later."
        rows={4}
        className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-cyan-400/60"
      />

      <button
        onClick={saveReport}
        disabled={saving}
        className="mt-5 rounded-full bg-cyan-400 px-7 py-3 font-bold text-black hover:bg-cyan-300 disabled:opacity-50"
      >
        {saving ? "Saving report..." : "Save Market Report"}
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
          Saved market reports
        </h3>

        {loading && (
          <p className="text-gray-400">
            Loading market reports...
          </p>
        )}

        {!loading && reports.length === 0 && (
          <p className="text-gray-400">
            No market reports saved yet.
          </p>
        )}

        {!loading && reports.length > 0 && (
          <div className="space-y-5">
            {reports.map((report) => (
              <div
                key={report.id}
                className="rounded-2xl border border-white/10 bg-black/30 p-6"
              >
                <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                      {report.report_type} · {report.timeframe}
                    </p>

                    <h4 className="text-3xl font-bold">
                      {report.symbol}
                    </h4>

                    <p className="text-gray-300">
                      {report.asset_name}
                    </p>

                    <p className="mt-2 text-sm text-green-400">
                      Status: {report.watch_status}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteReport(report.id)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Delete
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="mb-2 text-sm text-cyan-400">Summary</p>
                    <p className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                      {report.summary}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="mb-2 text-sm text-green-400">Catalysts</p>
                    <p className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                      {report.catalysts}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="mb-2 text-sm text-red-300">Risks</p>
                    <p className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                      {report.risks}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="mb-2 text-sm text-purple-300">Notes</p>
                    <p className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                      {report.notes}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-xs text-gray-500">
                  Saved{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(report.created_at))}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-gray-500">
        Market reports are for personal research organisation only and are not investment recommendations.
      </p>
    </section>
  );
}