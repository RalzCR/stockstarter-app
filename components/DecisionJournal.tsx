"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type DecisionEntry = {
  id: string;
  symbol: string;
  decision_type: string;
  confidence_level: string;
  emotion_level: string;
  reason: string;
  risk: string;
  review_date: string | null;
  created_at: string;
};

export default function DecisionJournal() {
  const [entries, setEntries] = useState<DecisionEntry[]>([]);
  const [symbol, setSymbol] = useState("");
  const [decisionType, setDecisionType] = useState("Watching");
  const [confidenceLevel, setConfidenceLevel] = useState("Medium");
  const [emotionLevel, setEmotionLevel] = useState("Calm");
  const [reason, setReason] = useState("");
  const [risk, setRisk] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function getAccessToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  }

  async function loadEntries() {
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to load your decision journal.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/decision-journal", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Decision journal could not be loaded.");
        setMessageType("error");
        return;
      }

      setEntries(data.entries || []);
    } catch {
      setMessage("Decision journal could not be loaded.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function saveEntry() {
    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to save decision journal entries.");
        setMessageType("error");
        setSaving(false);
        return;
      }

      const response = await fetch("/api/decision-journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          symbol,
          decisionType,
          confidenceLevel,
          emotionLevel,
          reason,
          risk,
          reviewDate: reviewDate || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Decision journal entry could not be saved.");
        setMessageType("error");
        return;
      }

      setMessage(data.message);
      setMessageType("success");
      setSymbol("");
      setDecisionType("Watching");
      setConfidenceLevel("Medium");
      setEmotionLevel("Calm");
      setReason("");
      setRisk("");
      setReviewDate("");
      await loadEntries();
    } catch {
      setMessage("Decision journal entry could not be saved.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteEntry(id: string) {
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to delete decision journal entries.");
        setMessageType("error");
        return;
      }

      const response = await fetch("/api/decision-journal", {
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
        setMessage(data.message || "Decision journal entry could not be deleted.");
        setMessageType("error");
        return;
      }

      setEntries((currentEntries) =>
        currentEntries.filter((entry) => entry.id !== id)
      );
      setMessage(data.message);
      setMessageType("success");
    } catch {
      setMessage("Decision journal entry could not be deleted.");
      setMessageType("error");
    }
  }

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <section className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-8">
      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-yellow-300">
        Decision Journal
      </p>

      <h2 className="text-4xl font-bold mb-4">
        Record your thinking before acting
      </h2>

      <p className="max-w-3xl text-gray-300 leading-relaxed mb-8">
        Save the reason, risk, confidence and emotion behind a market decision so
        you can review your process later with more clarity.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-5">
        <input
          value={symbol}
          onChange={(event) => setSymbol(event.target.value)}
          placeholder="Symbol, e.g. TSLA"
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-yellow-300/60"
        />

        <select
          value={decisionType}
          onChange={(event) => setDecisionType(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-yellow-300/60"
        >
          <option value="Watching">Watching</option>
          <option value="Researching">Researching</option>
          <option value="Considering buy">Considering buy</option>
          <option value="Considering sell">Considering sell</option>
          <option value="Holding">Holding</option>
          <option value="Avoiding">Avoiding</option>
        </select>

        <select
          value={confidenceLevel}
          onChange={(event) => setConfidenceLevel(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-yellow-300/60"
        >
          <option value="Low">Low confidence</option>
          <option value="Medium">Medium confidence</option>
          <option value="High">High confidence</option>
        </select>

        <select
          value={emotionLevel}
          onChange={(event) => setEmotionLevel(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-yellow-300/60"
        >
          <option value="Calm">Calm</option>
          <option value="Excited">Excited</option>
          <option value="Fearful">Fearful</option>
          <option value="FOMO">FOMO</option>
          <option value="Uncertain">Uncertain</option>
        </select>
      </div>

      <textarea
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        placeholder="Reason: what are you thinking and what evidence are you using?"
        rows={4}
        className="mb-5 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-yellow-300/60"
      />

      <textarea
        value={risk}
        onChange={(event) => setRisk(event.target.value)}
        placeholder="Main risk: what could go wrong or what might you be missing?"
        rows={4}
        className="mb-5 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-yellow-300/60"
      />

      <div className="mb-5 max-w-sm">
        <label className="mb-2 block text-sm font-semibold text-gray-300">
          Optional review date
        </label>

        <input
          value={reviewDate}
          onChange={(event) => setReviewDate(event.target.value)}
          type="date"
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-yellow-300/60"
        />
      </div>

      <button
        onClick={saveEntry}
        disabled={saving}
        className="rounded-full bg-yellow-300 px-7 py-3 font-bold text-black hover:bg-yellow-200 disabled:opacity-50"
      >
        {saving ? "Saving entry..." : "Save Decision Entry"}
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
          Saved decision entries
        </h3>

        {loading && (
          <p className="text-gray-400">
            Loading decision journal...
          </p>
        )}

        {!loading && entries.length === 0 && (
          <p className="text-gray-400">
            No decision entries saved yet.
          </p>
        )}

        {!loading && entries.length > 0 && (
          <div className="space-y-5">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl border border-white/10 bg-black/30 p-6"
              >
                <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">
                      {entry.decision_type}
                    </p>

                    <h4 className="text-3xl font-bold">
                      {entry.symbol}
                    </h4>

                    <p className="mt-2 text-sm text-gray-400">
                      Confidence: {entry.confidence_level} · Emotion:{" "}
                      {entry.emotion_level}
                    </p>

                    {entry.review_date && (
                      <p className="mt-2 text-sm text-green-400">
                        Review date:{" "}
                        {new Intl.DateTimeFormat("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(entry.review_date))}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Delete
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="mb-2 text-sm text-yellow-300">Reason</p>
                    <p className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                      {entry.reason}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="mb-2 text-sm text-red-300">Risk</p>
                    <p className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                      {entry.risk}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-xs text-gray-500">
                  Saved{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(entry.created_at))}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-gray-500">
        Decision journal entries are for personal reflection and research organisation only.
      </p>
    </section>
  );
}