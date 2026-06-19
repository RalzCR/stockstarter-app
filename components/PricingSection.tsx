import SubscribeButton from "./SubscribeButton";

export default function PricingSection() {
  return (
    <section className="mt-24 text-left">
      <div className="mb-10 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-400">
          Plans
        </p>

        <h2 className="text-5xl font-bold mb-4">
          Choose your StockStarter workspace
        </h2>

        <p className="mx-auto max-w-3xl text-lg text-gray-300 leading-relaxed">
          Start free with market charts and news, or upgrade to save research,
          track holdings, save price levels, score assets, record decisions and
          build a structured market routine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gray-400">
            Free
          </p>

          <h3 className="text-4xl font-bold mb-3">£0</h3>

          <p className="mb-6 text-gray-300">
            For exploring live market data and beginner-friendly financial
            information.
          </p>

          <ul className="mb-8 space-y-3 text-gray-300">
            <li>• Live market dashboard</li>
            <li>• Stock and crypto chart workspace</li>
            <li>• Latest market news</li>
            <li>• Beginner-friendly market explanations</li>
            <li>• Educational investing reminders</li>
          </ul>

          <a
            href="/#dashboard"
            className="inline-flex rounded-full border border-white/10 bg-white/5 px-7 py-3 font-bold text-white hover:bg-white/10"
          >
            Use Free Dashboard
          </a>
        </div>

        <div className="relative rounded-3xl border border-green-400/30 bg-green-400/10 p-8 backdrop-blur-xl shadow-lg shadow-green-500/10">
          <div className="absolute right-6 top-6 rounded-full bg-green-400 px-4 py-1 text-xs font-bold text-black">
            Popular
          </div>

          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-green-400">
            Plus
          </p>

          <h3 className="text-4xl font-bold mb-3">
            £3.99
            <span className="text-lg font-medium text-gray-400"> / month</span>
          </h3>

          <p className="mb-6 text-gray-300">
            For users who want account-based tools to save research, track
            assets and improve decision-making.
          </p>

          <ul className="mb-8 space-y-3 text-gray-300">
            <li>• Everything in Free</li>
            <li>• Plus member workspace</li>
            <li>• Cloud Watchlist saved to your account</li>
            <li>• Portfolio Tracker for manual holdings</li>
            <li>• Price Levels Tracker</li>
            <li>• Research Scorecard for clearer asset decisions</li>
            <li>• Decision Journal for clearer thinking</li>
            <li>• Research Notes by stock or crypto symbol</li>
            <li>• Saved asset research workflow</li>
            <li>• Member dashboard menu</li>
            <li>• Billing and subscription management</li>
          </ul>

          <SubscribeButton label="Start Plus" plan="plus" />
        </div>

        <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8 backdrop-blur-xl shadow-lg shadow-cyan-500/10">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-400">
            Premium
          </p>

          <h3 className="text-4xl font-bold mb-3">
            £9.99
            <span className="text-lg font-medium text-gray-400"> / month</span>
          </h3>

          <p className="mb-6 text-gray-300">
            For users who want the full structured research suite and deeper
            market organisation tools.
          </p>

          <ul className="mb-8 space-y-3 text-gray-300">
            <li>• Everything in Plus</li>
            <li>• Premium member workspace</li>
            <li>• Premium Market Research Reports</li>
            <li>• Saved summaries, catalysts and risks</li>
            <li>• Research timeframe and watch-status tracking</li>
            <li>• Advanced decision filters</li>
            <li>• Full Price Levels access</li>
            <li>• Full Research Scorecard access</li>
            <li>• Full Decision Journal access</li>
            <li>• Premium research workflow section</li>
            <li>• Full access to current and future Premium tools</li>
          </ul>

          <SubscribeButton label="Start Premium" plan="premium" />
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gray-400">
          Important
        </p>

        <p className="text-gray-300 leading-relaxed">
          StockStarter provides educational market information and personal
          research organisation tools only. It does not provide financial advice,
          investment recommendations, trading signals, brokerage services or
          portfolio management.
        </p>
      </div>
    </section>
  );
}