export default function AISummary() {
  return (
    <section className="mt-24 text-left">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

          <p className="text-sm uppercase tracking-[0.25em] text-green-400">
            AI Market Insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Smarter market insights, explained clearly.
            </h2>

            <p className="text-lg leading-relaxed text-gray-300 mb-8">
              StockStarter helps simplify market movement by combining live prices,
              market news, watchlists and educational summaries into one clear
              dashboard for beginner investors.
            </p>

            <a
              href="#waitlist"
              className="inline-flex rounded-full bg-green-400 px-6 py-3 font-bold text-black hover:bg-green-300"
            >
              Get Access
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <p className="text-sm text-green-400 mb-2">
                Market context
              </p>

              <h3 className="text-xl font-semibold mb-2">
                Understand why assets move
              </h3>

              <p className="text-gray-400">
                View market news and price action together so major movements are easier to interpret.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <p className="text-sm text-cyan-400 mb-2">
                Watchlist insights
              </p>

              <h3 className="text-xl font-semibold mb-2">
                Track the assets that matter to you
              </h3>

              <p className="text-gray-400">
                Save stocks and crypto assets to keep your market dashboard focused and relevant.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <p className="text-sm text-purple-400 mb-2">
                Beginner friendly
              </p>

              <h3 className="text-xl font-semibold mb-2">
                Financial information in plain English
              </h3>

              <p className="text-gray-400">
                StockStarter is built to make market information easier to understand without hype or complex jargon.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          StockStarter provides educational market information only and does not provide financial advice,
          investment recommendations or trading signals.
        </p>
      </div>
    </section>
  );
}