"use client";

type MemberWorkspaceMenuProps = {
  plan?: string;
};

const workspaceLinks = [
  { label: "StockHelper AI", href: "/stockhelper" },
  { label: "Practice Portfolio", href: "/simulator" },
  { label: "Cloud Watchlist", href: "#cloud-watchlist" },
  { label: "Portfolio Tracker", href: "#portfolio-tracker" },
  { label: "Price Levels", href: "#price-levels" },
  { label: "Research Scorecard", href: "#research-scorecard" },
  { label: "Decision Journal", href: "#decision-journal" },
  { label: "Charts", href: "#chart-workspace" },
  { label: "Research Notes", href: "#research-notes" },
  { label: "Premium Reports", href: "#premium-reports" },
  { label: "News", href: "#market-news" },
];

export default function MemberWorkspaceMenu({ plan }: MemberWorkspaceMenuProps) {
  const workspaceMenuLabel =
    plan === "premium" ? "Premium Workspace Menu" : "Workspace Menu";

  return (
    <div className="sticky top-4 z-30 mb-10 rounded-3xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-green-400">
          {workspaceMenuLabel}
        </p>

        <h2 className="mt-2 text-2xl font-bold">Jump to your tools</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {workspaceLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}