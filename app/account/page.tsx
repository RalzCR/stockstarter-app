"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.user?.email) {
        setEmail("");
        setLoading(false);
        return;
      }

      setEmail(data.session.user.email);
      setLoading(false);
    }

    loadSession();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white px-8 py-16">
        <section className="max-w-3xl mx-auto">
          <p className="text-gray-300">
            Loading account...
          </p>
        </section>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="min-h-screen bg-black text-white px-8 py-16">
        <section className="max-w-3xl mx-auto text-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-400">
              Account
            </p>

            <h1 className="mb-6 text-5xl font-bold">
              Sign in required
            </h1>

            <p className="mb-8 text-gray-300">
              Sign in to access your StockStarter account.
            </p>

            <a
              href="/login"
              className="inline-flex rounded-full bg-green-400 px-7 py-3 font-bold text-black hover:bg-green-300"
            >
              Sign In
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white px-8 py-16">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-180px] left-[-180px] h-[650px] w-[650px] rounded-full bg-emerald-500/40 blur-[130px]" />
        <div className="absolute bottom-[-220px] right-[-180px] h-[750px] w-[750px] rounded-full bg-cyan-500/40 blur-[140px]" />
      </div>

      <section className="relative z-10 max-w-5xl mx-auto">
        <a href="/" className="text-green-400 hover:text-green-300">
          ← Back to StockStarter
        </a>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-400">
            Account Dashboard
          </p>

          <h1 className="mb-4 text-5xl md:text-6xl font-bold">
            Your StockStarter account
          </h1>

          <p className="text-xl text-gray-300">
            Signed in as {email}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-green-400">
              Plan
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Free
            </h2>

            <p className="mb-6 text-gray-300">
              Upgrade to Plus or Premium to access enhanced dashboard and market research tools.
            </p>

            <a
              href="/pricing"
              className="inline-flex rounded-full bg-green-400 px-6 py-3 font-bold text-black hover:bg-green-300"
            >
              View Plans
            </a>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-400">
              Dashboard
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Market tools
            </h2>

            <p className="mb-6 text-gray-300">
              Continue using live charts, market news and watchlist tools from the main dashboard.
            </p>

            <a
              href="/#dashboard"
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white hover:bg-white/10"
            >
              Open Dashboard
            </a>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-purple-400">
              Security
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Account access
            </h2>

            <p className="mb-6 text-gray-300">
              Sign out when using a shared device.
            </p>

            <button
              onClick={signOut}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white hover:bg-white/10"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}