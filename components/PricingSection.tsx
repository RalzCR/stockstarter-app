import SubscribeButton from "./SubscribeButton";

const freeFeatures = [
  "Live stock and crypto dashboard",
  "Market news and summaries",
  "Free practice portfolio simulator",
  "Beginner investing dashboard",
  "Educational market information",
];

const plusFeatures = [
  "Everything in Free",
  "StockHelper AI research assistant",
  "Cloud watchlist",
  "Portfolio tracker",
  "Price levels tracker",
  "Research scorecard",
  "Decision journal",
  "Research notes",
];

const premiumFeatures = [
  "Everything in Plus",
  "StockHelper AI research assistant",
  "Premium market reports",
  "Full research workspace",
  "Advanced research organisation tools",
  "Better workflow for serious learners",
  "Best option for active research",
];

const comparisonRows = [
  {
    feature: "Live market dashboard",
    free: "Included",
    plus: "Included",
    premium: "Included",
  },
  {
    feature: "Practice portfolio simulator",
    free: "Included",
    plus: "Included",
    premium: "Included",
  },
  {
    feature: "StockHelper AI",
    free: "Not included",
    plus: "Included",
    premium: "Included",
  },
  {
    feature: "Cloud watchlist",
    free: "Not included",
    plus: "Included",
    premium: "Included",
  },
  {
    feature: "Portfolio tracker",
    free: "Not included",
    plus: "Included",
    premium: "Included",
  },
  {
    feature: "Price levels tracker",
    free: "Not included",
    plus: "Included",
    premium: "Included",
  },
  {
    feature: "Research scorecard",
    free: "Not included",
    plus: "Included",
    premium: "Included",
  },
  {
    feature: "Decision journal",
    free: "Not included",
    plus: "Included",
    premium: "Included",
  },
  {
    feature: "Research notes",
    free: "Not included",
    plus: "Included",
    premium: "Included",
  },
  {
    feature: "Premium market reports",
    free: "Not included",
    plus: "Not included",
    premium: "Included",
  },
];

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {features.map((feature) => (
        <li key={feature} className="flex gap-3 text-gray-300">
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-400 text-xs font-bold text-black">
            ✓
          </span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PricingSection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl">
      <div className="mx-auto mb-14 max-w-4xl text-center">
        <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-200 backdrop-blur">
          Simple pricing for learning the market
        </div>

        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
          Choose how you want
          <span className="block bg-gradient-to-r from-green-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            to learn and research.
          </span>
        </h1>

        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
          Start free with the dashboard and simulator. Upgrade when you want
          StockHelper AI, saved research tools and a more structured investing
          workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-400">
            Free
          </p>

          <h2 className="mb-3 text-3xl font-bold">Learn and practise</h2>

          <p className="mb-6 text-gray-300">
            Best for beginners who want to explore the dashboard and practise
            with virtual money.
          </p>

          <div className="mb-6">
            <span className="text-5xl font-bold">£0</span>
            <span className="text-gray-400"> / month</span>
          </div>

          <a
            href="/simulator"
            className="flex w-full justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white hover:bg-white/10"
          >
            Start Free
          </a>

          <FeatureList features={freeFeatures} />
        </div>

        <div className="relative rounded-3xl border border-green-400/40 bg-green-400/10 p-8 shadow-2xl shadow-green-500/10 backdrop-blur-xl">
          <div className="absolute right-6 top-6 rounded-full bg-green-400 px-4 py-2 text-sm font-bold text-black">
            Best first upgrade
          </div>

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-300">
            Plus
          </p>

          <h2 className="mb-3 text-3xl font-bold">Save and organise research</h2>

          <p className="mb-6 text-gray-300">
            Best for users who want StockHelper AI, saved research notes,
            watchlists, portfolio tracking and a clearer decision process.
          </p>

          <div className="mb-6">
            <span className="text-5xl font-bold">£3.99</span>
            <span className="text-gray-400"> / month</span>
          </div>

          <SubscribeButton
            plan="plus"
            label="Upgrade to Plus"
            className="flex w-full justify-center rounded-full bg-green-400 px-6 py-3 font-bold text-black hover:bg-green-300"
          />

          <FeatureList features={plusFeatures} />
        </div>

        <div className="rounded-3xl border border-purple-400/30 bg-purple-400/10 p-8 backdrop-blur-xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-purple-300">
            Premium
          </p>

          <h2 className="mb-3 text-3xl font-bold">Deeper research workflow</h2>

          <p className="mb-6 text-gray-300">
            Best for users who want the full workspace, StockHelper AI and
            premium research reports in one place.
          </p>

          <div className="mb-6">
            <span className="text-5xl font-bold">£9.99</span>
            <span className="text-gray-400"> / month</span>
          </div>

          <SubscribeButton
            plan="premium"
            label="Upgrade to Premium"
            className="flex w-full justify-center rounded-full bg-purple-400 px-6 py-3 font-bold text-black hover:bg-purple-300"
          />

          <FeatureList features={premiumFeatures} />
        </div>
      </div>

      <section className="mt-16 rounded-3xl border border-purple-400/20 bg-purple-400/10 p-8 md:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-purple-300">
              Paid feature
            </p>

            <h2 className="mb-5 text-4xl font-bold md:text-5xl">
              StockHelper AI is included with Plus and Premium.
            </h2>

            <p className="text-lg leading-relaxed text-gray-300">
              Ask beginner-friendly questions about investing terms, company
              research, valuation basics, risk factors and what to check before
              making a decision. StockHelper AI gives educational research help,
              not direct buy or sell instructions.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-gray-400">
              Example questions
            </p>

            <div className="space-y-3">
              {[
                "What should I research before buying a stock?",
                "Explain P/E ratio in simple terms.",
                "What are bullish and bearish points for Apple?",
                "How do I think about risk if I already own a stock?",
              ].map((question) => (
                <div
                  key={question}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 font-semibold text-gray-200"
                >
                  {question}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="border-b border-white/10 p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-300">
            Compare plans
          </p>

          <h2 className="text-4xl font-bold">What each plan includes</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-sm uppercase tracking-[0.2em] text-gray-400">
                <th className="p-5">Feature</th>
                <th className="p-5">Free</th>
                <th className="p-5">Plus</th>
                <th className="p-5">Premium</th>
              </tr>
            </thead>

            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b border-white/10">
                  <td className="p-5 font-semibold text-white">{row.feature}</td>
                  <td className="p-5 text-gray-300">{row.free}</td>
                  <td className="p-5 text-green-300">{row.plus}</td>
                  <td className="p-5 text-purple-300">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
          <h3 className="mb-3 text-2xl font-bold">Is StockHelper AI financial advice?</h3>

          <p className="leading-relaxed text-gray-300">
            No. StockHelper AI is an educational research assistant. It can
            explain ideas, risks and research checklists, but it does not tell
            users to buy, sell or hold investments.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
          <h3 className="mb-3 text-2xl font-bold">Can I start for free?</h3>

          <p className="leading-relaxed text-gray-300">
            Yes. The free plan includes the dashboard, market information and
            the practice portfolio simulator. You can upgrade when you want the
            saved research workspace and StockHelper AI.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
          <h3 className="mb-3 text-2xl font-bold">Which paid plan should I choose?</h3>

          <p className="leading-relaxed text-gray-300">
            Plus is the best first upgrade for most beginners. Premium is better
            if you want the full research workspace and premium reports.
          </p>
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-yellow-300">
          Important
        </p>

        <p className="leading-relaxed text-yellow-100/80">
          StockStarter provides educational market information, virtual
          practice tools, AI research assistance and research organisation tools
          only. It does not provide financial advice, investment
          recommendations, brokerage services or trading signals.
        </p>
      </section>
    </section>
  );
}