"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type ResearchNote = {
  id: string;
  symbol: string;
  title: string;
  note: string;
  created_at: string;
};

export default function ResearchNotes() {
  const [notes, setNotes] = useState<ResearchNote[]>([]);
  const [symbol, setSymbol] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function getAccessToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  }

  async function loadNotes() {
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to load research notes.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/research-notes", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Research notes could not be loaded.");
        setMessageType("error");
        return;
      }

      setNotes(data.notes || []);
    } catch {
      setMessage("Research notes could not be loaded.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function saveNote() {
    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to save research notes.");
        setMessageType("error");
        setSaving(false);
        return;
      }

      const response = await fetch("/api/research-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          symbol,
          title,
          note,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Research note could not be saved.");
        setMessageType("error");
        return;
      }

      setMessage(data.message);
      setMessageType("success");
      setSymbol("");
      setTitle("");
      setNote("");
      await loadNotes();
    } catch {
      setMessage("Research note could not be saved.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteNote(id: string) {
    setMessage("");
    setMessageType("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setMessage("Sign in to delete research notes.");
        setMessageType("error");
        return;
      }

      const response = await fetch("/api/research-notes", {
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
        setMessage(data.message || "Research note could not be deleted.");
        setMessageType("error");
        return;
      }

      setNotes((currentNotes) =>
        currentNotes.filter((researchNote) => researchNote.id !== id)
      );
      setMessage(data.message);
      setMessageType("success");
    } catch {
      setMessage("Research note could not be deleted.");
      setMessageType("error");
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-green-400">
        Research Notes
      </p>

      <h2 className="text-4xl font-bold mb-4">
        Save your market thinking
      </h2>

      <p className="max-w-3xl text-gray-300 leading-relaxed mb-8">
        Keep structured notes for stocks, crypto assets and market ideas so your
        research process stays organised over time.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <input
          value={symbol}
          onChange={(event) => setSymbol(event.target.value)}
          placeholder="Symbol, e.g. AAPL"
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-400/60"
        />

        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Note title"
          className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-400/60"
        />
      </div>

      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Write your research note, key risks, market context, or questions to review later."
        rows={6}
        className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-400/60"
      />

      <button
        onClick={saveNote}
        disabled={saving}
        className="mt-5 rounded-full bg-green-400 px-7 py-3 font-bold text-black hover:bg-green-300 disabled:opacity-50"
      >
        {saving ? "Saving note..." : "Save Research Note"}
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
          Saved notes
        </h3>

        {loading && (
          <p className="text-gray-400">
            Loading research notes...
          </p>
        )}

        {!loading && notes.length === 0 && (
          <p className="text-gray-400">
            No research notes saved yet.
          </p>
        )}

        {!loading && notes.length > 0 && (
          <div className="space-y-4">
            {notes.map((researchNote) => (
              <div
                key={researchNote.id}
                className="rounded-2xl border border-white/10 bg-black/30 p-5"
              >
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-green-400">
                      {researchNote.symbol}
                    </p>

                    <h4 className="text-xl font-bold">
                      {researchNote.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => deleteNote(researchNote.id)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Delete
                  </button>
                </div>

                <p className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                  {researchNote.note}
                </p>

                <p className="mt-4 text-xs text-gray-500">
                  Saved{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(researchNote.created_at))}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}