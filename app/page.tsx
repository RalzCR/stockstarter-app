import TradingViewWidget from "../components/TradingViewWidget";
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-slate-900 text-white px-8 py-10">
      <nav className="flex items-center justify-between mb-20">
        <h1 className="text-2xl font-bold tracking-tight">
          StockStarter
        </h1>

        <button className="rounded-full bg-white text-black px-5 py-2 font-semibold hover:bg-gray-200">
          Join Waitlist
        </button>
      </nav>

      <section className="max-w-5xl mx-auto text-center">
        <div className="inline-block mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
          AI-powered stock & crypto insights
        </div>

        <h2 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
          Understand markets
          <span className="block bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            without the confusion.
          </span>
        </h2>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Track stocks, crypto, market trends and AI summaries in one clean beginner-friendly dashboard.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <button className="rounded-full bg-green-400 text-black px-7 py-3 font-bold hover:bg-green-300">
            Explore Dashboard
          </button>

          <button className="rounded-full border border-white/20 px-7 py-3 font-bold hover:bg-white/10">
            Learn Investing
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm text-gray-400 mb-2">STOCK</p>
            <h3 className="text-3xl font-bold mb-1">Apple</h3>
            <p className="text-gray-400 mb-6">AAPL</p>
            <p className="text-green-400 text-xl font-bold">+1.82%</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm text-gray-400 mb-2">STOCK</p>
            <h3 className="text-3xl font-bold mb-1">Nvidia</h3>
            <p className="text-gray-400 mb-6">NVDA</p>
            <p className="text-green-400 text-xl font-bold">+3.41%</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm text-gray-400 mb-2">CRYPTO</p>
            <h3 className="text-3xl font-bold mb-1">Bitcoin</h3>
            <p className="text-gray-400 mb-6">BTC</p>
            <p className="text-red-400 text-xl font-bold">-0.74%</p>
          </div>
        </div>
        <div className="mt-20 rounded-3xl overflow-hidden border border-white/10">
          <TradingViewWidget />
        </div>
      </section>
    </main>
  );
}