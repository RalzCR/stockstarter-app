"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import LiveMarketCards from "../../components/LiveMarketCards";
import NewsSection from "../../components/NewsSection";

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
          <p className="text-gray-300">Loading premium dashboard...</p>
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
              Premium Dashboard
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
              Premium Dashboard
            </p>

            <h1 className="mb-6 text-5xl md:text-6xl font-bold">
              Upgrade to access premium tools
            </h1>

            <p className="mb-8 text-xl text-gray-300 leading-relaxed">
              Your current plan is {formatPlan(subscription.plan)}. Upgrade to Plus or
              Premium to access enhanced research tools, premium dashboard workflows
              and subscription features.
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
            Premium Dashboard
          </p>

          <h1 className="mb-4 text-5xl md:text-6xl font-bold">
            Your premium market workspace
          </h1>

          <p className="max-w-3xl text-xl text-gray-300 leading-relaxed">
            Access enhanced market research tools, structured dashboards and
            beginner-friendly workflows built for StockStarter {formatPlan(subscription.plan)} users.
          </p>
        </div>

        <div className="mt-10">
          <LiveMarketCards />
        </div>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-green-400/20 bg-green-400/10 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-green-400">
              Research Workflow
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Analyse before reacting
            </h2>

            <ul className="space-y-3 text-gray-300">
              <li>• Check the price movement</li>
              <li>• Read the latest market news</li>
              <li>• Review broader market context</li>
              <li>• Compare against your watchlist</li>
              <li>• Avoid impulsive decisions</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-400">
              Watchlist Review
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Focus on selected assets
            </h2>

            <ul className="space-y-3 text-gray-300">
              <li>• Track companies and crypto assets clearly</li>
              <li>• Keep research organised</li>
              <li>• Separate long-term interest from short-term noise</li>
              <li>• Build a cleaner market routine</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-purple-400/20 bg-purple-400/10 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-purple-400">
              Risk Checklist
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Understand market uncertainty
            </h2>

            <ul className="space-y-3 text-gray-300">
              <li>• Prices can move sharply</li>
              <li>• News can be incomplete or delayed</li>
              <li>• Past performance does not guarantee future results</li>
              <li>• Diversification and research matter</li>
            </ul>
          </div>
        </section>

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