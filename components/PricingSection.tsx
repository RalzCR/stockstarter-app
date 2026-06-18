import SubscribeButton from "./SubscribeButton";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="mt-24 text-left"
    >
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-green-400 mb-4">
          Pricing
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Choose the right StockStarter plan.
        </h2>

        <p className="max-w-3xl text-gray-300 text-lg leading-relaxed">
          Start with the free market dashboard or upgrade for enhanced tools that make
          market research clearer, faster and easier to manage.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.25em] text-gray-400 mb-4">
            Free
          </p>

          <h3 className="text-4xl font-bold mb-3">
            £0
          </h3>

          <p className="text-gray-400 mb-8">
            Core market tools for beginner investors.
          </p>

          <ul className="space-y-4 text-gray-300 mb-8">
            <li>• Live stock and crypto dashboard</li>
            <li>• Interactive market charts</li>
            <li>• Basic watchlist tools</li>
            <li>• Latest market news</li>
            <li>• Educational market information</li>
          </ul>

          <a
            href="#dashboard"
            className="inline-flex rounded-full border border-white/10 bg-white/5 px-7 py-3 font-bold text-white hover:bg-white/10"
          >
            Use Free Dashboard
          </a>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-green-400/30 bg-green-400/10 p-8 backdrop-blur-xl">
          <div className="absolute right-6 top-6 rounded-full bg-green-400 px-4 py-1 text-xs font-bold text-black">
            Popular
          </div>

          <p className="text-sm uppercase tracking-[0.25em] text-green-400 mb-4">
            Plus
          </p>

          <h3 className="text-4xl font-bold mb-3">
            £3.99
            <span className="text-lg font-normal text-gray-400">
              /month
            </span>
          </h3>

          <p className="text-gray-300 mb-8">
            Enhanced tools for users who want a clearer view of market movement,
            watchlists and educational insights.
          </p>

          <ul className="space-y-4 text-gray-200 mb-8">
            <li>• Everything in Free</li>
            <li>• Enhanced watchlist experience</li>
            <li>• Premium market insight tools</li>
            <li>• Cleaner dashboard workflow</li>
            <li>• Subscription access managed securely through Stripe</li>
          </ul>

          <SubscribeButton
            label="Start Plus"
            plan="plus"
          />

          <p className="mt-5 text-xs text-gray-400">
            Payments are processed securely by Stripe. StockStarter provides educational
            market information only and does not provide financial advice.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8 backdrop-blur-xl">
          <div className="absolute right-6 top-6 rounded-full bg-cyan-400 px-4 py-1 text-xs font-bold text-black">
            Advanced
          </div>

          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400 mb-4">
            Premium
          </p>

          <h3 className="text-4xl font-bold mb-3">
            £9.99
            <span className="text-lg font-normal text-gray-400">
              /month
            </span>
          </h3>

          <p className="text-gray-300 mb-8">
            Advanced access for users who want deeper market organisation, stronger
            research tools and a more complete dashboard experience.
          </p>

          <ul className="space-y-4 text-gray-200 mb-8">
            <li>• Everything in Plus</li>
            <li>• Advanced dashboard tools</li>
            <li>• Expanded market research workflow</li>
            <li>• Priority support for account and billing questions</li>
            <li>• Premium access managed securely through Stripe</li>
          </ul>

          <SubscribeButton
            label="Start Premium"
            plan="premium"
          />

          <p className="mt-5 text-xs text-gray-400">
            Premium is designed for users who want a more complete market dashboard
            experience while keeping financial information educational and clear.
          </p>
        </div>
      </div>
    </section>
  );
}