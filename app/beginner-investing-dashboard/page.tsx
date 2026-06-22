import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beginner Investing Dashboard",
  description:
    "Use StockStarter's beginner investing dashboard to follow stocks, crypto, market news, charts and research tools in one simple workspace.",
};

const dashboardFeatures = [
  {
    title: "Market data in one place",
    description:
      "Follow stocks, crypto, charts and market news without jumping between lots of confusing platforms.",
  },
  {
    title: "Beginner-friendly layout",
    description:
      "StockStarter is designed to make market information easier to understand for people still learning.",
  },
  {
    title: "Research workflow tools",
    description:
      "Use watchlists, notes, scorecards, price levels and a decision journal when you are ready to organise your research.",
  },
];

const beginnerSteps = [
  "Check what is moving in the market.",
  "Look at stock and crypto charts.",
  "Read the latest market news.",
  "Practise ideas in the virtual simulator.",
  "Save research notes and review your decisions.",
];

const toolCards = [
  "Live market cards",
  "Stock and crypto dashboard",
  "Market news",
  "AI-style market summaries",
  "Practice portfolio simulator",
  "Cloud watchlist",
  "Portfolio tracker",
  "Research notes",
  "Decision journal",
];

export default function BeginnerInvestingDashboardPage() {
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
            <a href="/stock-market-simulator" className="text-sm text-gray-300 hover:text-white">
              Simulator
            </a>

            <a href="/pricing" className="text-sm text-gray-300 hover:text-white">
              Pricing
            </a>

            <a
              href="/#dashboard"
              className="rounded-full bg-green-400 px-5 py-2 font-semibold text-black hover:bg-green-300"
            >
              Open Dashboard
            </a>
          </div>
        </nav>

        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              Beginner investing dashboard
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              A simpler dashboard
              <span className="block bg-gradient-to-r from-green-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                for learning the market.
              </span>
            </h1>

            <p className="mb-8 max-w-3xl text-xl leading-relaxed text-gray-300">
              StockStarter gives beginners a cleaner way to follow stocks,
              crypto, charts, market news and research tools. Learn what is
              moving, practise with virtual money and build better investing
              habits from one workspace.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/#dashboard"
                className="rounded-full bg-green-400 px-7 py-3 text-center font-bold text-black shadow-lg shadow-green-500/20 hover:bg-green-300"
              >
                Explore Free Dashboard
              </a>

              <a
                href="/simulator"
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-7 py-3 text-center font-bold text-cyan-300 hover:bg-cyan-400/20"
              >
                Try Simulator
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-green-300">
              What you can do
            </p>

            <div className="grid grid-cols-1 gap-3">
              {toolCards.map((tool) => (
                <div
                  key={tool}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4 font-semibold text-gray-200"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {dashboardFeatures.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
            >
              <h2 className="mb-3 text-2xl font-bold">{feature.title}</h2>

              <p className="leading-relaxed text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-green-400/20 bg-green-400/10 p-8 md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-300">
                Learning routine
              </p>

              <h2 className="text-4xl font-bold md:text-5xl">
                Use a simple process instead of guessing.
              </h2>
            </div>

            <div className="space-y-4">
              {beginnerSteps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <p className="mb-2 text-sm uppercase tracking-[0.25em] text-cyan-400">
                    Step {index + 1}
                  </p>

                  <p className="text-lg font-semibold text-gray-200">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">
            Why beginners need a clear dashboard
          </p>

          <h2 className="mb-5 text-4xl font-bold md:text-5xl">
            Market information can feel overwhelming.
          </h2>

          <div className="space-y-5 text-lg leading-relaxed text-gray-300">
            <p>
              When you are new to investing, it is easy to get lost between
              charts, social media posts, news headlines and random opinions.
              StockStarter brings the main learning tools into one cleaner
              dashboard so you can build a more structured routine.
            </p>

            <p>
              The free dashboard helps you explore the market, while the
              simulator lets you practise with virtual money. Plus and Premium
              add saved research tools for users who want to track their
              decisions more seriously.
            </p>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8 text-center md:p-10">
          <h2 className="mb-5 text-4xl font-bold md:text-5xl">
            Start learning with StockStarter.
          </h2>

          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-300">
            Open the free dashboard, explore market data and use the simulator
            to practise before making real financial decisions.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/#dashboard"
              className="rounded-full bg-cyan-400 px-8 py-4 font-bold text-black hover:bg-cyan-300"
            >
              Open Free Dashboard
            </a>

            <a
              href="/pricing"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-bold text-white hover:bg-white/10"
            >
              Compare Plans
            </a>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gray-400">
            Important
          </p>

          <p className="leading-relaxed text-gray-300">
            StockStarter provides educational market information, virtual
            practice tools and research organisation tools only. It does not
            provide financial advice, investment recommendations, brokerage
            services or trading signals.
          </p>
        </section>
      </section>
    </main>
  );
}