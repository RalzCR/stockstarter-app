import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Stock Market Simulator",
  description:
    "Practise buying and selling stocks with virtual money using StockStarter's beginner-friendly stock market simulator.",
};

const simulatorBenefits = [
  {
    title: "Practise with virtual cash",
    description:
      "Start with a virtual £100,000 portfolio and test stock ideas without risking real money.",
  },
  {
    title: "Use live market prices",
    description:
      "Look up live stock prices, invest by amount or quantity, and see how your virtual position changes.",
  },
  {
    title: "Learn by doing",
    description:
      "Understand trade value, quantity, cost basis, holdings and virtual profit or loss through practical use.",
  },
];

const steps = [
  "Search for a stock symbol such as AAPL or TSLA.",
  "Load the live price.",
  "Choose how much virtual money to invest.",
  "Complete the practice trade.",
  "Track your virtual holdings and review the result.",
];

export default function StockMarketSimulatorPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-8 text-white md:px-8 md:py-10">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[-180px] h-[650px] w-[650px] rounded-full bg-emerald-500/40 blur-[130px]" />
        <div className="absolute bottom-[-220px] right-[-180px] h-[750px] w-[750px] rounded-full bg-cyan-500/40 blur-[140px]" />
        <div className="absolute left-[35%] top-[30%] h-[450px] w-[450px] rounded-full bg-purple-500/30 blur-[120px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl">
        <nav className="mb-16 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold tracking-tight">
            StockStarter
          </a>

          <div className="flex items-center gap-4">
            <a href="/pricing" className="text-sm text-gray-300 hover:text-white">
              Pricing
            </a>

            <a
              href="/simulator"
              className="rounded-full bg-green-400 px-5 py-2 font-semibold text-black hover:bg-green-300"
            >
              Open Simulator
            </a>
          </div>
        </nav>

        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              Free virtual portfolio simulator
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              Practise stock trading
              <span className="block bg-gradient-to-r from-green-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                with virtual money.
              </span>
            </h1>

            <p className="mb-8 max-w-3xl text-xl leading-relaxed text-gray-300">
              StockStarter’s stock market simulator helps beginners practise
              buying and selling stocks with a virtual £100,000 portfolio. Learn
              how trades work, test ideas and build confidence before using real
              money.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/simulator"
                className="rounded-full bg-green-400 px-7 py-3 text-center font-bold text-black shadow-lg shadow-green-500/20 hover:bg-green-300"
              >
                Start Free Simulator
              </a>

              <a
                href="/pricing"
                className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-center font-bold text-white hover:bg-white/10"
              >
                View Plans
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-cyan-300">
              Example simulator trade
            </p>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-gray-400">Starting virtual cash</p>
                <p className="mt-1 text-4xl font-bold">£100,000</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-gray-400">Practice idea</p>
                <p className="mt-1 text-2xl font-bold">Invest £5,000 in AAPL</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-gray-400">What you learn</p>
                <p className="mt-1 text-lg font-semibold text-gray-200">
                  Quantity, trade value, cost basis, live value and virtual
                  profit/loss.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {simulatorBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
            >
              <h2 className="mb-3 text-2xl font-bold">{benefit.title}</h2>

              <p className="leading-relaxed text-gray-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8 md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">
                How it works
              </p>

              <h2 className="text-4xl font-bold md:text-5xl">
                Learn the market step by step.
              </h2>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <p className="mb-2 text-sm uppercase tracking-[0.25em] text-green-400">
                    Step {index + 1}
                  </p>

                  <p className="text-lg font-semibold text-gray-200">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-400">
            Why use a stock market simulator?
          </p>

          <h2 className="mb-5 text-4xl font-bold md:text-5xl">
            Practise before you commit real money.
          </h2>

          <div className="space-y-5 text-lg leading-relaxed text-gray-300">
            <p>
              A stock market simulator is useful for beginners because it lets
              you understand how buying, selling, position size and portfolio
              value work without putting real capital at risk.
            </p>

            <p>
              StockStarter is built for learning and research organisation. You
              can use the free simulator first, then upgrade when you want to
              save research notes, track watchlists, record decisions and build
              a more structured investing workflow.
            </p>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-green-400/20 bg-green-400/10 p-8 text-center md:p-10">
          <h2 className="mb-5 text-4xl font-bold md:text-5xl">
            Start practising with virtual money today.
          </h2>

          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-300">
            Open the StockStarter simulator, search a stock symbol, load a live
            price and make your first virtual trade.
          </p>

          <a
            href="/simulator"
            className="inline-flex rounded-full bg-green-400 px-8 py-4 font-bold text-black hover:bg-green-300"
          >
            Open Free Stock Simulator
          </a>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gray-400">
            Important
          </p>

          <p className="leading-relaxed text-gray-300">
            StockStarter’s simulator uses virtual money only. It does not place
            real trades, connect to a broker, provide financial advice or
            recommend any asset.
          </p>
        </section>
      </section>
    </main>
  );
}