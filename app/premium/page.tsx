"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import LiveMarketCards from "../../components/LiveMarketCards";
import StockDashboard from "../../components/StockDashboard";
import NewsSection from "../../components/NewsSection";
import ResearchNotes from "../../components/ResearchNotes";
import CloudWatchlist from "../../components/CloudWatchlist";

type SubscriptionStatus = {
  plan: string;
  status: string;
  currentPeriodEnd: string | null;
};

function isPaidAccess(subscription: SubscriptionStatus) {
  return (
    (subscription.plan === "plus" || subscription.plan === "premium") &&
    (subscription.status === "active" || subscription.status === "trialing")
  );
}

function isPremiumAccess(subscription: SubscriptionStatus) {
  return (
    subscription.plan === "premium" &&
    (subscription.status === "active" || subscription.status === "trialing")
  );
}

function formatPlan(plan: string) {
  if (plan === "plus") return "Plus";
  if (plan === "premium") return "Premium";
  return "Free";
}

export default function PremiumPage() {
  const [email, setEmail] = useState("");
  const [subscription, setSubscription] = useState<SubscriptionStatus>({
    plan: "free",
    status: "free",
    currentPeriodEnd: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPremiumAccess() {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.user?.email || !data.session.access_token) {
        setLoading(false);
        return;
      }

      setEmail(data.session.user.email);

      try {
        const response = await fetch("/api/subscription-status", {
          headers: {
            Authorization: `Bearer ${data.session.access_token}`,
          },
        });

        const subscriptionData = await response.json();

        if (response.ok) {
          setSubscription(subscriptionData);
        }
      } finally {
        setLoading(false);
      }
    }

    loadPremiumAccess();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white px-8 py-16">
        <section className="max-w-4xl mx-auto">
          <p className="text-gray-300">Loading member workspace...</p>
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
              Member Workspace
            </p>

            <h1 className="mb-6 text-5xl font-bold">
              Sign in to continue
            </h1>

            <p className="mb-8 text-gray-300">
              Sign in to access your StockStarter dashboard and subscription features.
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

  if (!isPaidAccess(subscription)) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-black text-white px-8 py-16">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-180px] left-[-180px] h-[650px] w-[650px] rounded-full bg-emerald-500/40 blur-[130px]" />
          <div className="absolute bottom-[-220px] right-[-180px] h-[750px] w-[750px] rounded-full bg-cyan-500/40 blur-[140px]" />
        </div>

        <section className="relative z-10 max-w-4xl mx-auto text-center">
          <a href="/" className="text-green-400 hover:text-green-300">
            ← Back to StockStarter
          </a>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-400">
              Member Workspace
            </p>

            <h1 className="mb-6 text-5xl md:text-6xl font-bold">
              Upgrade to access member tools
            </h1>

            <p className="mb-8 text-xl text-gray-300 leading-relaxed">
              Your current plan is {formatPlan(subscription.plan)}. Upgrade to Plus or
              Premium to access cloud watchlists, research notes, enhanced workflows,
              structured dashboards and member-only tools.
            </p>

            <a
              href="/pricing"
              className="inline-flex rounded-full bg-green-400 px-7 py-3 font-bold text-black hover:bg-green-300"
            >
              View Plans
            </a>
          </div>
        </section>
      </main>
    );
  }

  const planName = formatPlan(subscription.plan);
  const workspaceTitle =
    subscription.plan === "plus" ? "Plus Workspace" : "Premium Workspace";

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white px-8 py-16">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-180px] left-[-180px] h-[650px] w-[650px] rounded-full bg-emerald-500/40 blur-[130px]" />
        <div className="absolute bottom-[-220px] right-[-180px] h-[750px] w-[750px] rounded-full bg-cyan-500/40 blur-[140px]" />
        <div className="absolute top-[30%] left-[35%] h-[450px] w-[450px] rounded-full bg-purple-500/30 blur-[120px]" />
      </div>

      <section className="relative z-10 max-w-6xl mx-auto">
        <nav className="flex items-center justify-between mb-10">
          <a href="/" className="text-green-400 hover:text-green-300">
            ← Back to StockStarter
          </a>

          <a
            href="/account"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-semibold text-white hover:bg-white/10"
          >
            Account
          </a>
        </nav>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-400">
            {workspaceTitle}
          </p>

          <h1 className="mb-4 text-5xl md:text-6xl font-bold">
            Your {planName} market workspace
          </h1>

          <p className="max-w-3xl text-xl text-gray-300 leading-relaxed">
            A structured research area for following markets, saving cloud watchlists,
            writing research notes, reviewing news, checking risk and building a calmer investing routine.
          </p>
        </div>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-3xl border border-green-400/20 bg-green-400/10 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-green-400 mb-3">
              Plan
            </p>
            <h2 className="text-3xl font-bold">{planName}</h2>
          </div>

          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400 mb-3">
              Cloud Tools
            </p>
            <h2 className="text-3xl font-bold">Active</h2>
          </div>

          <div className="rounded-3xl border border-purple-400/20 bg-purple-400/10 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-purple-400 mb-3">
              Access
            </p>
            <h2 className="text-3xl font-bold">
              {subscription.plan === "plus" ? "Plus" : "Full"}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-gray-400 mb-3">
              Account
            </p>
            <h2 className="text-xl font-bold break-words">{email}</h2>
          </div>
        </section>

        <div className="mt-10">
          <LiveMarketCards />
        </div>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-green-400/20 bg-green-400/10 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-green-400">
              Research Routine
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Daily market checklist
            </h2>

            <ul className="space-y-3 text-gray-300">
              <li>• Review major stock and crypto movement</li>
              <li>• Check whether the move is news-driven</li>
              <li>• Compare against broader market direction</li>
              <li>• Review saved cloud watchlist assets</li>
              <li>• Save research notes before reacting</li>
              <li>• Avoid making decisions from one headline</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-400">
              Watchlist System
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Account-based tracking
            </h2>

            <ul className="space-y-3 text-gray-300">
              <li>• Save assets to your StockStarter account</li>
              <li>• Keep stocks and crypto assets organised</li>
              <li>• Build a personal research list</li>
              <li>• Use the same list across sessions</li>
              <li>• Focus on assets you actively follow</li>
              <li>• Keep research separate from impulse decisions</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-purple-400/20 bg-purple-400/10 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-purple-400">
              Research Notes
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Save your thinking
            </h2>

            <ul className="space-y-3 text-gray-300">
              <li>• Save notes by symbol</li>
              <li>• Record market context</li>
              <li>• Track risks and questions</li>
              <li>• Review your thinking later</li>
              <li>• Build a calmer investing process</li>
              <li>• Avoid relying on memory alone</li>
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <CloudWatchlist />
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-green-400">
            Member Dashboard
          </p>

          <h2 className="text-4xl font-bold mb-6">
            Live chart workspace
          </h2>

          <p className="max-w-3xl text-gray-300 leading-relaxed mb-8">
            Search assets, review price action and keep your market research in one
            structured workspace.
          </p>

          <StockDashboard />
        </section>

        <section className="mt-10">
          <ResearchNotes />
        </section>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-green-400">
              Beginner Explainer
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Why did this asset move?
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>Before reacting to a move, check these five areas:</p>

              <ul className="space-y-3">
                <li>• Company news or earnings</li>
                <li>• Wider market direction</li>
                <li>• Interest rate or inflation expectations</li>
                <li>• Sector-specific movement</li>
                <li>• Crypto market sentiment or liquidity</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-400">
              Decision Filter
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Think before acting
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>Use this filter before making any financial decision:</p>

              <ul className="space-y-3">
                <li>• Do I understand what changed?</li>
                <li>• Am I reacting emotionally?</li>
                <li>• Is this based on one headline?</li>
                <li>• Have I checked multiple sources?</li>
                <li>• Does this match my own research process?</li>
              </ul>
            </div>
          </div>
        </section>

        {isPremiumAccess(subscription) ? (
          <section className="mt-10 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-cyan-400">
              Premium Research Suite
            </p>

            <h2 className="text-4xl font-bold mb-6">
              Advanced research workflow
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <h3 className="text-2xl font-bold mb-3">
                  Market Snapshot
                </h3>

                <p className="text-gray-300">
                  Review price movement, news and watchlist context together before
                  forming a view.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <h3 className="text-2xl font-bold mb-3">
                  Research Notes
                </h3>

                <p className="text-gray-300">
                  Structure your thinking around catalysts, risks, timeframes and
                  uncertainty before taking action.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <h3 className="text-2xl font-bold mb-3">
                  Premium Checklist
                </h3>

                <p className="text-gray-300">
                  Use a repeatable process to avoid chasing hype, sudden spikes or
                  emotional market moves.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <section className="mt-10 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-cyan-400">
              Premium Upgrade
            </p>

            <h2 className="text-4xl font-bold mb-4">
              Unlock the Premium Research Suite
            </h2>

            <p className="max-w-3xl text-gray-300 leading-relaxed mb-8">
              Plus users can upgrade to Premium for the full research workflow,
              expanded dashboard structure and advanced member tools.
            </p>

            <a
              href="/pricing"
              className="inline-flex rounded-full bg-cyan-400 px-7 py-3 font-bold text-black hover:bg-cyan-300"
            >
              View Premium Plan
            </a>
          </section>
        )}

        <div className="mt-10">
          <NewsSection />
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gray-400">
            Important
          </p>

          <p className="text-gray-300 leading-relaxed">
            StockStarter provides educational market information only. It does not
            provide financial advice, investment recommendations, trading signals,
            brokerage services or portfolio management.
          </p>
        </section>
      </section>
    </main>
  );
}