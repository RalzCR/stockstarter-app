import SubscribeButton from "./SubscribeButton";

const freeFeatures = [
  "Live market dashboard",
  "Stock and crypto chart workspace",
  "Latest market news",
  "Practice Portfolio Simulator with virtual cash",
  "Beginner-friendly market explanations",
  "Educational investing reminders",
];

const plusFeatures = [
  "Everything in Free",
  "Plus member workspace",
  "Full Practice Portfolio Simulator access",
  "Cloud Watchlist saved to your account",
  "Portfolio Tracker for manual holdings",
  "Price Levels Tracker",
  "Research Scorecard for clearer asset decisions",
  "Decision Journal for tracking your thinking",
  "Research Notes by stock or crypto symbol",
  "Saved asset research workflow",
  "Billing and subscription management",
];

const premiumFeatures = [
  "Everything in Plus",
  "Premium member workspace",
  "Premium Market Research Reports",
  "Saved summaries, catalysts and risks",
  "Research timeframe and watch-status tracking",
  "Advanced research organisation workflow",
  "Full Price Levels access",
  "Full Research Scorecard access",
  "Full Decision Journal access",
  "Full access to current and future Premium tools",
];

const comparisonRows = [
  {
    feature: "Live dashboard, charts and news",
    free: "Included",
    plus: "Included",
    premium: "Included",
  },
  {
    feature: "Practice Portfolio Simulator",
    free: "Included",
    plus: "Included",
    premium: "Included",
  },
  {
    feature: "Saved watchlist and research notes",
    free: "Not included",
    plus: "Included",
    premium: "Included",
  },
  {
    feature: "Portfolio, price levels and decision journal",
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
    feature: "Premium Market Reports",
    free: "Not included",
    plus: "Not included",
    premium: "Included",
  },
];

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="mb-8 space-y-3 text-gray-300">
      {features.map((feature) => (
        <li key={feature} className="flex gap-3">
          <span className="mt-1 text-green-400">✓</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PricingSection() {
  return (
    <section className="mt-24 text-left">
      <div className="mb-12 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-400">
          Plans
        </p>

        <h2 className="mb-4 text-5xl font-bold">
          Choose how you want to use StockStarter
        </h2>

        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300">
          Start free to learn the market and practise with virtual money.
          Upgrade when you want to save research, track decisions and build a
          more organised investing routine.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gray-400">
            Free
          </p>

          <h3 className="mb-3 text-4xl font-bold">£0</h3>

          <p className="mb-3 font-semibold text-white">
            Learn and practise
          </p>

          <p className="mb-6 text-gray-300">
            For beginners who want to explore market data, read news, practise
            with virtual money and understand the basics before upgrading.
          </p>

          <FeatureList features={freeFeatures} />

          <a
            href="/#dashboard"
            className="inline-flex rounded-full border border-white/10 bg-white/5 px-7 py-3 font-bold text-white hover:bg-white/10"
          >
            Use Free Dashboard
          </a>
        </div>

        <div className="relative rounded-3xl border border-green-400/30 bg-green-400/10 p-8 shadow-lg shadow-green-500/10 backdrop-blur-xl">
          <div className="absolute right-6 top-6 rounded-full bg-green-400 px-4 py-1 text-xs font-bold text-black">
            Best starting plan
          </div>

          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-green-400">
            Plus
          </p>

          <h3 className="mb-3 text-4xl font-bold">
            £3.99
            <span className="text-lg font-medium text-gray-400"> / month</span>
          </h3>

          <p className="mb-3 font-semibold text-white">
            Save and organise research
          </p>

          <p className="mb-6 text-gray-300">
            For users who want to move beyond browsing and start building a
            proper research workflow with saved tools and account-based tracking.
          </p>

          <FeatureList features={plusFeatures} />

          <SubscribeButton label="Start Plus" plan="plus" />

          <p className="mt-4 text-sm text-gray-400">
            Best for most beginners who want structure without needing the full
            Premium research suite.
          </p>
        </div>

        <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8 shadow-lg shadow-cyan-500/10 backdrop-blur-xl">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-400">
            Premium
          </p>

          <h3 className="mb-3 text-4xl font-bold">
            £9.99
            <span className="text-lg font-medium text-gray-400"> / month</span>
          </h3>

          <p className="mb-3 font-semibold text-white">
            Deeper research workflow
          </p>

          <p className="mb-6 text-gray-300">
            For users who want the full research suite, including structured
            market reports, catalysts, risks and a more complete review process.
          </p>

          <FeatureList features={premiumFeatures} />

          <SubscribeButton label="Start Premium" plan="premium" />

          <p className="mt-4 text-sm text-gray-400">
            Best for users who want to keep more detailed research records and
            review opportunities more seriously.
          </p>
        </div>
      </div>

      <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="mb-8">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gray-400">
            Compare
          </p>

          <h3 className="text-4xl font-bold">
            What each plan includes
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-sm uppercase tracking-[0.2em] text-gray-400">
                <th className="py-4 pr-6">Feature</th>
                <th className="py-4 pr-6">Free</th>
                <th className="py-4 pr-6 text-green-300">Plus</th>
                <th className="py-4 text-cyan-300">Premium</th>
              </tr>
            </thead>

            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b border-white/10">
                  <td className="py-5 pr-6 font-semibold text-white">
                    {row.feature}
                  </td>

                  <td className="py-5 pr-6 text-gray-300">{row.free}</td>

                  <td className="py-5 pr-6 text-gray-300">{row.plus}</td>

                  <td className="py-5 text-gray-300">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
          <h3 className="mb-3 text-2xl font-bold">
            Can I use StockStarter for free?
          </h3>

          <p className="leading-relaxed text-gray-300">
            Yes. The free plan includes the dashboard, chart workspace, market
            news and simulator so you can learn and practise first.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
          <h3 className="mb-3 text-2xl font-bold">
            What does Plus add?
          </h3>

          <p className="leading-relaxed text-gray-300">
            Plus adds account-based tools for saving research, tracking holdings,
            setting price levels, scoring assets and recording decisions.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
          <h3 className="mb-3 text-2xl font-bold">
            What does Premium add?
          </h3>

          <p className="leading-relaxed text-gray-300">
            Premium adds the deeper research workflow, including structured
            market reports with summaries, catalysts, risks and watch status.
          </p>
        </div>
      </section>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gray-400">
          Important
        </p>

        <p className="leading-relaxed text-gray-300">
          StockStarter provides educational market information, virtual practice
          tools and personal research organisation tools only. It does not
          provide financial advice, investment recommendations, trading signals,
          brokerage services or portfolio management.
        </p>
      </div>
    </section>
  );
}