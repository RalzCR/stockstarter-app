import StockDashboard from "../components/StockDashboard";
import LiveMarketCards from "../components/LiveMarketCards";
import NewsSection from "../components/NewsSection";
import AISummary from "../components/AISummary";
import WaitlistForm from "../components/WaitlistForm";
import AuthNavButton from "../components/AuthNavButton";

const featureCards = [
  {
    title: "Practise before risking money",
    description:
      "Use the Stock Market Simulator to build a virtual £100,000 portfolio, test ideas and understand how buying and selling works.",
  },
  {
    title: "Ask StockHelper AI",
    description:
      "Plus and Premium users can ask beginner-friendly investing questions, research stocks and understand risks with StockHelper AI.",
  },
  {
    title: "Build better research habits",
    description:
      "Use watchlists, notes, price levels, scorecards and a decision journal to organise your thinking before making financial decisions.",
  },
];

const workspaceTools = [
  "StockHelper AI",
  "Cloud Watchlist",
  "Portfolio Tracker",
  "Price Levels Tracker",
  "Research Scorecard",
  "Decision Journal",
  "Research Notes",
  "Premium Market Reports",
  "Practice Portfolio Simulator",
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white px-6 py-8 md:px-8 md:py-10">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-180px] left-[-180px] h-[650px] w-[650px] rounded-full bg-emerald-500/40 blur-[130px]" />
        <div className="absolute bottom-[-220px] right-[-180px] h-[750px] w-[750px] rounded-full bg-cyan-500/40 blur-[140px]" />
        <div className="absolute top-[30%] left-[35%] h-[450px] w-[450px] rounded-full bg-purple-500/30 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <nav className="relative z-10 mx-auto mb-20 flex max-w-7xl items-center justify-between">
        <a href="/" className="text-2xl font-bold tracking-tight">
          StockStarter
        </a>

        <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
          <a href="#markets" className="hover:text-white">
            Markets
          </a>

          <a href="/stock-market-simulator" className="hover:text-white">
            Simulator Guide
          </a>

          <a href="/beginner-investing-dashboard" className="hover:text-white">
            Beginner Dashboard
          </a>

          <a href="/stockhelper" className="hover:text-white">
            StockHelper AI
          </a>

          <a href="#workspace-preview" className="hover:text-white">
            Workspace
          </a>

          <a href="/pricing" className="hover:text-white">
            Pricing
          </a>

          <AuthNavButton variant="link" />
        </div>

        <div className="flex items-center gap-3">
          <AuthNavButton variant="button" />

          <a
            href="/simulator"
            className="hidden rounded-full bg-white px-5 py-2 font-semibold text-black hover:bg-gray-200 sm:inline-flex"
          >
            Practice Portfolio
          </a>
        </div>
      </nav>

      <section className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-block rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-200 backdrop-blur">
            Beginner-friendly stock, crypto, AI and market research tools
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            Understand markets
            <span className="block bg-gradient-to-r from-green-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              before you invest.
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-300">
            StockStarter helps beginners practise with virtual money, follow
            live market data, ask StockHelper AI, organise research and build
            better investing habits without the confusion.
          </p>

          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/simulator"
              className="rounded-full bg-green-400 px-7 py-3 font-bold text-black shadow-lg shadow-green-500/20 hover:bg-green-300"
            >
              Start Practice Portfolio
            </a>

            <a
              href="/stockhelper"
              className="rounded-full border border-purple-400/30 bg-purple-400/10 px-7 py-3 font-bold text-purple-300 backdrop-blur hover:bg-purple-400/20"
            >
              Try StockHelper AI
            </a>

            <a
              href="/pricing"
              className="rounded-full border border-white/20 bg-white/5 px-7 py-3 font-bold backdrop-blur hover:bg-white/10"
            >
              View Plans
            </a>
          </div>
        </div>

        <section className="mb-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {featureCards.map((feature) => (
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

        <section
          id="simulator-preview"
          className="mb-16 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8 md:p-10 backdrop-blur-xl"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">
                Practice first
              </p>

              <h2 className="mb-5 text-4xl font-bold md:text-5xl">
                Build a virtual portfolio before using real money.
              </h2>

              <p className="mb-7 text-lg leading-relaxed text-gray-300">
                The Stock Market Simulator gives you £100,000 in virtual cash.
                Search live prices, invest by amount or quantity, track virtual
                holdings and reset whenever you want to practise again.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/simulator"
                  className="rounded-full bg-cyan-400 px-7 py-3 text-center font-bold text-black hover:bg-cyan-300"
                >
                  Open Simulator
                </a>

                <a
                  href="/stock-market-simulator"
                  className="rounded-full border border-white/10 bg-white/5 px-7 py-3 text-center font-bold text-white hover:bg-white/10"
                >
                  How the Simulator Works
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.25em] text-gray-400">
                  Example
                </p>

                <p className="rounded-full bg-green-400/10 px-4 py-2 text-sm font-semibold text-green-300">
                  Virtual money
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Starting cash</p>
                  <p className="mt-1 text-3xl font-bold">£100,000</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Trade idea</p>
                  <p className="mt-1 text-2xl font-bold">Invest £5,000 in AAPL</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Learning outcome</p>
                  <p className="mt-1 text-lg font-semibold text-gray-200">
                    See quantity, cost basis, live value and virtual profit/loss.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 rounded-3xl border border-purple-400/20 bg-purple-400/10 p-8 md:p-10 backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-purple-300">
                New paid feature
              </p>

              <h2 className="mb-5 text-4xl font-bold md:text-5xl">
                Ask StockHelper AI before making decisions.
              </h2>

              <p className="mb-7 text-lg leading-relaxed text-gray-300">
                StockHelper AI helps Plus and Premium users understand investing
                terms, research stocks, compare bullish and bearish points, spot
                risks and build a clearer decision framework. It is educational
                only and does not give direct buy or sell instructions.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/stockhelper"
                  className="rounded-full bg-purple-400 px-7 py-3 text-center font-bold text-black hover:bg-purple-300"
                >
                  Open StockHelper AI
                </a>

                <a
                  href="/pricing"
                  className="rounded-full border border-white/10 bg-white/5 px-7 py-3 text-center font-bold text-white hover:bg-white/10"
                >
                  View Plus & Premium
                </a>
              </div>
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

        <section className="mb-16 rounded-3xl border border-green-400/20 bg-green-400/10 p-8 md:p-10 backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-300">
                Beginner dashboard
              </p>

              <h2 className="mb-5 text-4xl font-bold md:text-5xl">
                One clear place to start learning the market.
              </h2>

              <p className="mb-7 text-lg leading-relaxed text-gray-300">
                Instead of jumping between confusing platforms, StockStarter
                brings market data, charts, news, simulator tools, AI help and
                research features into one beginner-friendly workspace.
              </p>

              <a
                href="/beginner-investing-dashboard"
                className="inline-flex rounded-full bg-green-400 px-7 py-3 text-center font-bold text-black hover:bg-green-300"
              >
                Learn About the Dashboard
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Live market cards",
                "Stock and crypto charts",
                "StockHelper AI",
                "Market news",
                "Practice simulator",
                "Research notes",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5 font-semibold text-gray-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="markets" className="scroll-mt-10">
          <LiveMarketCards />
        </div>

        <section
          id="workspace-preview"
          className="my-16 rounded-3xl border border-green-400/20 bg-green-400/10 p-8 md:p-10 backdrop-blur-xl"
        >
          <div className="mb-8 max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-300">
              Member workspace
            </p>

            <h2 className="mb-5 text-4xl font-bold md:text-5xl">
              Move from random research to a structured workflow.
            </h2>

            <p className="text-lg leading-relaxed text-gray-300">
              StockStarter Plus and Premium help you ask better research
              questions, save notes, track holdings, set price levels, score
              opportunities and record why you made each decision.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workspaceTools.map((tool) => (
              <div
                key={tool}
                className="rounded-2xl border border-white/10 bg-black/30 p-5 font-semibold text-gray-200"
              >
                {tool}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/premium"
              className="rounded-full bg-green-400 px-7 py-3 text-center font-bold text-black hover:bg-green-300"
            >
              Open Workspace
            </a>

            <a
              href="/stockhelper"
              className="rounded-full border border-purple-400/30 bg-purple-400/10 px-7 py-3 text-center font-bold text-purple-300 hover:bg-purple-400/20"
            >
              Try StockHelper AI
            </a>

            <a
              href="/pricing"
              className="rounded-full border border-white/10 bg-white/5 px-7 py-3 text-center font-bold text-white hover:bg-white/10"
            >
              See Plus and Premium
            </a>
          </div>
        </section>

        <div id="dashboard" className="scroll-mt-10">
          <StockDashboard />
        </div>

        <section className="my-16 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-purple-300">
                How it works
              </p>

              <h2 className="text-4xl font-bold">
                A simple routine for learning the market.
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-green-400">
                1. Watch
              </p>

              <h3 className="mb-3 text-2xl font-bold">Follow market movement</h3>

              <p className="text-gray-300">
                Check stocks, crypto, charts and news to understand what is
                moving and why.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-400">
                2. Practise
              </p>

              <h3 className="mb-3 text-2xl font-bold">Test ideas virtually</h3>

              <p className="text-gray-300">
                Use the simulator to practise trades and learn from results
                without using real money.
              </p>
            </div>

            <div className="hidden lg:block" />

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-yellow-400">
                3. Ask
              </p>

              <h3 className="mb-3 text-2xl font-bold">Use StockHelper AI</h3>

              <p className="text-gray-300">
                Ask beginner-friendly questions about investing terms, risks,
                research checklists and how to think through decisions.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-purple-400">
                4. Review
              </p>

              <h3 className="mb-3 text-2xl font-bold">Learn from decisions</h3>

              <p className="text-gray-300">
                Use your decision journal and portfolio history to see what you
                thought, what happened and what to improve.
              </p>
            </div>
          </div>
        </section>

        <div id="news" className="scroll-mt-10">
          <NewsSection />
        </div>

        <div id="ai" className="scroll-mt-10">
          <AISummary />
        </div>

        <section className="my-16 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8 md:p-10 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">
            Ready to start?
          </p>

          <h2 className="mb-5 text-4xl font-bold md:text-5xl">
            Start with the free dashboard and simulator.
          </h2>

          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-300">
            Use StockStarter to learn the basics, practise with virtual money
            and upgrade when you are ready to use StockHelper AI, save research
            and track your decision process properly.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/simulator"
              className="rounded-full bg-cyan-400 px-7 py-3 font-bold text-black hover:bg-cyan-300"
            >
              Try Simulator
            </a>

            <a
              href="/stockhelper"
              className="rounded-full border border-purple-400/30 bg-purple-400/10 px-7 py-3 font-bold text-purple-300 hover:bg-purple-400/20"
            >
              Open StockHelper AI
            </a>

            <a
              href="/pricing"
              className="rounded-full border border-white/10 bg-white/5 px-7 py-3 font-bold text-white hover:bg-white/10"
            >
              Compare Plans
            </a>
          </div>
        </section>

        <WaitlistForm />

        <footer className="mt-16 border-t border-white/10 pt-8 text-left text-sm text-gray-500">
          <div className="mb-6 flex flex-wrap gap-4">
            <a href="/stockhelper" className="hover:text-white">
              StockHelper AI
            </a>

            <a href="/stock-market-simulator" className="hover:text-white">
              Stock Market Simulator
            </a>

            <a href="/beginner-investing-dashboard" className="hover:text-white">
              Beginner Investing Dashboard
            </a>

            <a href="/privacy" className="hover:text-white">
              Privacy Policy
            </a>

            <a href="/terms" className="hover:text-white">
              Terms
            </a>

            <a href="/refund-policy" className="hover:text-white">
              Refund Policy
            </a>

            <a href="/contact" className="hover:text-white">
              Contact
            </a>

            <a href="/pricing" className="hover:text-white">
              Pricing
            </a>

            <a href="/premium" className="hover:text-white">
              Workspace
            </a>

            <a href="/simulator" className="hover:text-white">
              Simulator
            </a>

            <a href="/account" className="hover:text-white">
              Account
            </a>
          </div>

          <p className="mb-3">
            StockStarter is an educational market dashboard, AI research
            assistant and research organisation tool. It does not provide
            financial advice, investment recommendations, brokerage services or
            trading signals.
          </p>

          <p>
            Market prices, crypto data and news can change rapidly. Always do
            your own research before making financial decisions.
          </p>
        </footer>
      </section>
    </main>
  );
}