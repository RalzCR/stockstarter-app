import StockDashboard from "../components/StockDashboard";
import LiveMarketCards from "../components/LiveMarketCards";
import NewsSection from "../components/NewsSection";
import AISummary from "../components/AISummary";
import WaitlistForm from "../components/WaitlistForm";
import AuthNavButton from "../components/AuthNavButton";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white px-8 py-10">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-180px] left-[-180px] h-[650px] w-[650px] rounded-full bg-emerald-500/40 blur-[130px]" />
        <div className="absolute bottom-[-220px] right-[-180px] h-[750px] w-[750px] rounded-full bg-cyan-500/40 blur-[140px]" />
        <div className="absolute top-[30%] left-[35%] h-[450px] w-[450px] rounded-full bg-purple-500/30 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between mb-20">
        <a href="/" className="text-2xl font-bold tracking-tight">
          StockStarter
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#markets" className="hover:text-white">
            Markets
          </a>

          <a href="#dashboard" className="hover:text-white">
            Dashboard
          </a>

          <a href="#news" className="hover:text-white">
            News
          </a>

          <a href="#ai" className="hover:text-white">
            AI Insights
          </a>

          <a href="/pricing" className="hover:text-white">
            Pricing
          </a>

          <AuthNavButton variant="link" />
        </div>

        <div className="flex items-center gap-3">
          <AuthNavButton variant="button" />

          <a
            href="/pricing"
            className="rounded-full bg-white text-black px-5 py-2 font-semibold hover:bg-gray-200"
          >
            View Plans
          </a>
        </div>
      </nav>

      <section className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-block mb-6 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-200 backdrop-blur">
          AI-powered stock & crypto insights
        </div>

        <h2 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
          Understand markets
          <span className="block bg-gradient-to-r from-green-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            without the confusion.
          </span>
        </h2>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Track stocks, crypto, market trends and educational insights in one clean
          beginner-friendly dashboard.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <a
            href="#dashboard"
            className="rounded-full bg-green-400 text-black px-7 py-3 font-bold hover:bg-green-300 shadow-lg shadow-green-500/20"
          >
            Explore Dashboard
          </a>

          <a
            href="/pricing"
            className="rounded-full border border-white/20 bg-white/5 px-7 py-3 font-bold hover:bg-white/10 backdrop-blur"
          >
            View Plans
          </a>
        </div>

        <div id="markets">
          <LiveMarketCards />
        </div>

        <div id="dashboard">
          <StockDashboard />
        </div>

        <div id="news">
          <NewsSection />
        </div>

        <div id="ai">
          <AISummary />
        </div>

        <WaitlistForm />

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

            <a href="/account" className="hover:text-white">
              Account
            </a>
          </div>

          <p className="mb-3">
            StockStarter is an educational market dashboard. It does not provide financial advice,
            investment recommendations or trading signals.
          </p>

          <p>
            Market prices, crypto data and news can change rapidly. Always do your own research
            before making financial decisions.
          </p>
        </footer>
      </section>
    </main>
  );
}