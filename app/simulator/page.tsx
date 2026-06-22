import PracticePortfolio from "../../components/PracticePortfolio";

export default function SimulatorPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white px-8 py-10">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-180px] left-[-180px] h-[650px] w-[650px] rounded-full bg-emerald-500/40 blur-[130px]" />
        <div className="absolute bottom-[-220px] right-[-180px] h-[750px] w-[750px] rounded-full bg-cyan-500/40 blur-[140px]" />
        <div className="absolute top-[30%] left-[35%] h-[450px] w-[450px] rounded-full bg-purple-500/30 blur-[120px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold tracking-tight">
            StockStarter
          </a>

          <div className="flex items-center gap-4">
            <a href="/stock-market-simulator" className="text-sm text-gray-300 hover:text-white">
              Simulator Guide
            </a>

            <a href="/premium" className="text-sm text-gray-300 hover:text-white">
              Workspace
            </a>

            <a href="/account" className="text-sm text-gray-300 hover:text-white">
              Account
            </a>

            <a
              href="/pricing"
              className="rounded-full bg-green-400 px-5 py-2 font-semibold text-black hover:bg-green-300"
            >
              Plans
            </a>
          </div>
        </nav>

        <PracticePortfolio />

        <section className="mt-12 rounded-3xl border border-green-400/20 bg-green-400/10 p-8 md:p-10 backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-300">
                Next step after practising
              </p>

              <h2 className="mb-5 text-4xl font-bold md:text-5xl">
                Turn practice trades into a proper research routine.
              </h2>

              <p className="text-lg leading-relaxed text-gray-300">
                The simulator helps you practise with virtual money. Plus and
                Premium help you save research notes, track a real watchlist,
                set price levels, score opportunities and record why you made
                each decision.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-gray-400">
                Unlock with Plus
              </p>

              <div className="space-y-3 text-gray-300">
                <p>✓ Save your cloud watchlist</p>
                <p>✓ Track manual holdings</p>
                <p>✓ Set price levels to watch</p>
                <p>✓ Score stock and crypto ideas</p>
                <p>✓ Record decisions in a journal</p>
                <p>✓ Keep research notes by symbol</p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/pricing"
                  className="rounded-full bg-green-400 px-6 py-3 text-center font-bold text-black hover:bg-green-300"
                >
                  View Plans
                </a>

                <a
                  href="/premium"
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-center font-bold text-white hover:bg-white/10"
                >
                  Open Workspace
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gray-400">
            Educational use only
          </p>

          <p className="leading-relaxed text-gray-300">
            The StockStarter simulator uses virtual money only. It does not
            place real trades, connect to a broker, provide financial advice or
            recommend any asset.
          </p>
        </section>
      </section>
    </main>
  );
}