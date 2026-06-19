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
      </section>
    </main>
  );
}