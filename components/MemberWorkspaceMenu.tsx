type MemberWorkspaceMenuProps = {
  plan: "plus" | "premium";
};

export default function MemberWorkspaceMenu({ plan }: MemberWorkspaceMenuProps) {
  const isPremium = plan === "premium";

  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-green-400">
            Workspace Menu
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Jump to your tools
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="#cloud-watchlist"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Cloud Watchlist
          </a>

          <a
            href="#portfolio-tracker"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Portfolio Tracker
          </a>

          <a
            href="#price-levels"
            className="rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-200 hover:bg-orange-400/20"
          >
            Price Levels
          </a>

          <a
            href="#decision-journal"
            className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200 hover:bg-yellow-400/20"
          >
            Decision Journal
          </a>

          <a
            href="#chart-workspace"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Charts
          </a>

          <a
            href="#research-notes"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Research Notes
          </a>

          <a
            href="#premium-reports"
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              isPremium
                ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20"
                : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            Premium Reports
          </a>

          <a
            href="#market-news"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            News
          </a>
        </div>
      </div>
    </section>
  );
}