import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://getstockstarter.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      route: "",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      route: "/stock-market-simulator",
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      route: "/pricing",
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      route: "/simulator",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      route: "/login",
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      route: "/account",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      route: "/premium",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      route: "/contact",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      route: "/privacy",
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      route: "/terms",
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      route: "/refund-policy",
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
  ];

  return routes.map((page) => ({
    url: `${siteUrl}${page.route}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}