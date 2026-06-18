"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

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

  const planName = formatPlan(subscription.plan);
  const planStatus = formatStatus(subscription.status);
  const isPaidPlan = subscription.plan === "plus" || subscription.plan === "premium";

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

          <p className="text-xl text-gray-300">
            Signed in as {email}
          </p>
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
                <a
                  href="/#dashboard"
                  className="inline-flex rounded-full bg-green-400 px-6 py-3 font-bold text-black hover:bg-green-300"
                >
                  Open Dashboard
                </a>
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

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-400">
              Dashboard
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Market tools
            </h2>

            <p className="mb-6 text-gray-300">
              Access live charts, market news, watchlist tools and educational market information from the main dashboard.
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
              Billing
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Subscription access
            </h2>

            <p className="mb-6 text-gray-300">
              Plus and Premium subscriptions are processed securely through Stripe and linked to your StockStarter account.
            </p>

            <a
              href="/pricing"
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white hover:bg-white/10"
            >
              View Plans
            </a>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gray-400">
            Important
          </p>

          <p className="text-gray-300 leading-relaxed">
            StockStarter provides educational market information only. It does not provide financial advice,
            investment recommendations, trading signals, brokerage services or portfolio management.
          </p>
        </section>
      </section>
    </main>
  );
}