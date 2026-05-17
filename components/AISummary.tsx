export default function AISummary() {
  return (
    <section className="mt-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green-400">
            AI MARKET SUMMARY
          </p>
        </div>

        <h2 className="text-4xl font-bold mb-6">
          AI Insights Coming Soon
        </h2>

        <p className="max-w-3xl text-lg leading-relaxed text-gray-300">
          AI-powered market summaries will soon analyse live stock prices,
          crypto trends and breaking financial news to generate simple
          beginner-friendly insights in real time.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400 mb-2">
              LIVE STOCK ANALYSIS
            </p>

            <h3 className="text-xl font-semibold">
              Real-time market movement tracking
            </h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400 mb-2">
              AI NEWS INSIGHTS
            </p>

            <h3 className="text-xl font-semibold">
              Simplified explanations of market news
            </h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400 mb-2">
              BEGINNER FRIENDLY
            </p>

            <h3 className="text-xl font-semibold">
              Easy-to-understand financial summaries
            </h3>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Market conditions can change rapidly. This platform does not provide
          financial advice.
        </p>
      </div>
    </section>
  );
}