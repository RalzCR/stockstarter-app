import StockDashboard from "../components/StockDashboard";

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
        <h1 className="text-2xl font-bold tracking-tight">
          StockStarter
        </h1>

        <button className="rounded-full bg-white text-black px-5 py-2 font-semibold hover:bg-gray-200">
          Join Waitlist
        </button>
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
          Track stocks, crypto, market trends and AI summaries in one clean beginner-friendly dashboard.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <button className="rounded-full bg-green-400 text-black px-7 py-3 font-bold hover:bg-green-300 shadow-lg shadow-green-500/20">
            Explore Dashboard
          </button>

          <button className="rounded-full border border-white/20 bg-white/5 px-7 py-3 font-bold hover:bg-white/10 backdrop-blur">
            Learn Investing
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl shadow-green-500/10">
            <p className="text-sm text-gray-400 mb-2">STOCK</p>
            <h3 className="text-3xl font-bold mb-1">Apple</h3>
            <p className="text-gray-400 mb-6">AAPL</p>
            <p className="text-green-400 text-xl font-bold">+1.82%</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
            <p className="text-sm text-gray-400 mb-2">STOCK</p>
            <h3 className="text-3xl font-bold mb-1">Nvidia</h3>
            <p className="text-gray-400 mb-6">NVDA</p>
            <p className="text-green-400 text-xl font-bold">+3.41%</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl shadow-purple-500/10">
            <p className="text-sm text-gray-400 mb-2">CRYPTO</p>
            <h3 className="text-3xl font-bold mb-1">Bitcoin</h3>
            <p className="text-gray-400 mb-6">BTC</p>
            <p className="text-red-400 text-xl font-bold">-0.74%</p>
          </div>
        </div>

        <StockDashboard />
      </section>
    </main>
  );
}