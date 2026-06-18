"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ManageBillingButton from "../../components/ManageBillingButton";

type SubscriptionStatus = {
  plan: string;
  status: string;
  currentPeriodEnd: string | null;
};

function formatPlan(plan: string) {
  if (plan === "plus") return "Plus";
  if (plan === "premium") return "Premium";
  return "Free";
}

function formatStatus(status: string) {
  if (status === "active") return "Active";
  if (status === "trialing") return "Trialing";
  if (status === "past_due") return "Past due";
  if (status === "canceled") return "Cancelled";
  if (status === "free") return "Free";
  return status;
}

function formatDate(dateValue: string | null) {
  if (!dateValue) return "Not applicable";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateValue));
}

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [subscription, setSubscription] = useState<SubscriptionStatus>({
    plan: "free",
    status: "free",
    currentPeriodEnd: null,
  });
  const [loading, setLoading] = useState(true);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);

  useEffect(() => {
    async function loadAccount() {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.user?.email || !data.session.access_token) {
        setEmail("");
        setLoading(false);
        setSubscriptionLoading(false);
        return;
      }

      setEmail(data.session.user.email);
      setLoading(false);

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
      } catch {
        setSubscription({
          plan: "free",
          status: "free",
          currentPeriodEnd: null,
        });
      } finally {
        setSubscriptionLoading(false);
      }
    }

    loadAccount();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white px-8 py-16">
        <section className="max-w-3xl mx-auto">
          <p className="text-gray-300">Loading account...</p>
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

            <h1 className="mb-6 text-5xl font-bold">Sign in required</h1>

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

  const planName = formatPlan(subscription.plan);
  const planStatus = formatStatus(subscription.status);
  const isPaidPlan = subscription.plan === "plus" || subscription.plan === "premium";
  const isPremiumPlan = subscription.plan === "premium";

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

          <button
            onClick={signOut}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-semibold text-white hover:bg-white/10"
          >
            Sign Out
          </button>
        </nav>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-400">
            Account Dashboard
          </p>

          <h1 className="mb-4 text-5xl md:text-6xl font-bold">
            Your StockStarter account
          </h1>

          <p className="text-xl text-gray-300">Signed in as {email}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-green-400/20 bg-green-400/10 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-green-400">
              Current Plan
            </p>

            <h2 className="mb-4 text-4xl font-bold">
              {subscriptionLoading ? "Loading..." : planName}
            </h2>

            <div className="space-y-3 text-gray-300">
              <p>
                Status:{" "}
                <span className="font-semibold text-white">
                  {subscriptionLoading ? "Checking" : planStatus}
                </span>
              </p>

              <p>
                Current period end:{" "}
                <span className="font-semibold text-white">
                  {subscriptionLoading
                    ? "Checking"
                    : formatDate(subscription.currentPeriodEnd)}
                </span>
              </p>
            </div>

            <div className="mt-8">
              {isPaidPlan ? (
                <ManageBillingButton />
              ) : (
                <a
                  href="/pricing"
                  className="inline-flex rounded-full bg-green-400 px-6 py-3 font-bold text-black hover:bg-green-300"
                >
                  Upgrade Plan
                </a>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-400">
              Member Workspace
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              {isPaidPlan ? `Open ${planName} tools` : "Upgrade to member tools"}
            </h2>

            <p className="mb-6 text-gray-300">
              {isPaidPlan
                ? "Access your cloud watchlist, portfolio tracker, price levels, decision journal, research notes and member dashboard."
                : "Upgrade to Plus or Premium to unlock account-based research tools."}
            </p>

            {isPaidPlan ? (
              <a
                href="/premium"
                className="inline-flex rounded-full bg-cyan-400 px-6 py-3 font-bold text-black hover:bg-cyan-300"
              >
                Open Member Workspace
              </a>
            ) : (
              <a
                href="/pricing"
                className="inline-flex rounded-full bg-cyan-400 px-6 py-3 font-bold text-black hover:bg-cyan-300"
              >
                View Plans
              </a>
            )}
          </div>

          <div className="rounded-3xl border border-purple-400/20 bg-purple-400/10 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-purple-400">
              Premium Access
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              {isPremiumPlan ? "Premium active" : "Market Reports"}
            </h2>

            <p className="mb-6 text-gray-300">
              {isPremiumPlan
                ? "Create Premium Market Reports with summaries, catalysts, risks and watch-status tracking."
                : "Premium unlocks structured market reports and the full research workflow."}
            </p>

            {isPremiumPlan ? (
              <a
                href="/premium#premium-reports"
                className="inline-flex rounded-full bg-purple-400 px-6 py-3 font-bold text-black hover:bg-purple-300"
              >
                Open Premium Reports
              </a>
            ) : (
              <a
                href="/pricing"
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white hover:bg-white/10"
              >
                View Premium
              </a>
            )}
          </div>
        </div>

        {isPaidPlan && (
          <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-green-400">
              Your Tools
            </p>

            <h2 className="mb-6 text-4xl font-bold">Quick access</h2>

            <div className="flex flex-wrap gap-3">
              <a
                href="/premium#cloud-watchlist"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Cloud Watchlist
              </a>

              <a
                href="/premium#portfolio-tracker"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Portfolio Tracker
              </a>

              <a
                href="/premium#price-levels"
                className="rounded-full border border-orange-400/30 bg-orange-400/10 px-5 py-3 font-semibold text-orange-200 hover:bg-orange-400/20"
              >
                Price Levels
              </a>

              <a
                href="/premium#decision-journal"
                className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 font-semibold text-yellow-200 hover:bg-yellow-400/20"
              >
                Decision Journal
              </a>

              <a
                href="/premium#chart-workspace"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Chart Workspace
              </a>

              <a
                href="/premium#research-notes"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Research Notes
              </a>

              <a
                href="/premium#market-news"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Market News
              </a>

              {isPremiumPlan && (
                <a
                  href="/premium#premium-reports"
                  className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 font-semibold text-cyan-300 hover:bg-cyan-400/20"
                >
                  Premium Reports
                </a>
              )}
            </div>
          </section>
        )}

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