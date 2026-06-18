import PricingSection from "../../components/PricingSection";

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white px-8 py-10">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-180px] left-[-180px] h-[650px] w-[650px] rounded-full bg-emerald-500/40 blur-[130px]" />
        <div className="absolute bottom-[-220px] right-[-180px] h-[750px] w-[750px] rounded-full bg-cyan-500/40 blur-[140px]" />
        <div className="absolute top-[30%] left-[35%] h-[450px] w-[450px] rounded-full bg-purple-500/30 blur-[120px]" />
      </div>

      <section className="relative z-10 max-w-6xl mx-auto">
        <nav className="flex items-center justify-between mb-16">
          <a href="/" className="text-2xl font-bold tracking-tight">
            StockStarter
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="/" className="hover:text-white">
              Home
            </a>

            <a href="/#dashboard" className="hover:text-white">
              Dashboard
            </a>

            <a href="/#news" className="hover:text-white">
              News
            </a>

            <a href="/contact" className="hover:text-white">
              Contact
            </a>
          </div>

          <a
            href="/#waitlist"
            className="rounded-full bg-white px-5 py-2 font-semibold text-black hover:bg-gray-200"
          >
            Join Waitlist
          </a>
        </nav>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl text-left">
          <p className="text-sm uppercase tracking-[0.3em] text-green-400 mb-4">
            StockStarter Plans
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Choose a plan that matches how you follow the market.
          </h1>

          <p className="max-w-3xl text-xl text-gray-300 leading-relaxed">
            StockStarter gives beginner investors a cleaner way to follow stocks,
            crypto, market news, watchlists and educational insights without turning
            the dashboard into a complicated trading platform.
          </p>
        </div>

        <PricingSection />

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-4">
            Educational market tools, not financial advice.
          </h2>

          <p className="text-gray-300 leading-relaxed">
            StockStarter provides educational market information only. It does not
            provide financial advice, investment recommendations, trading signals,
            brokerage services, portfolio management or trading execution.
          </p>
        </section>

        <footer className="mt-16 border-t border-white/10 pt-8 text-sm text-gray-500 text-left">
          <div className="mb-6 flex flex-wrap gap-4">
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
          </div>

          <p>
            Market prices, crypto data and news can change rapidly. Always do your own
            research before making financial decisions.
          </p>
        </footer>
      </section>
    </main>
  );
}