"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  description: string;
  url: string;
  source: {
    name: string;
  };
};

export default function NewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news");

        const data = await response.json();

        if (!response.ok || !data.articles || data.articles.length === 0) {
          setError("Could not load news right now.");
          return;
        }

        setArticles(data.articles);
      } catch {
        setError("Could not load news right now.");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <section className="mt-24 text-left">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold">
          Latest Market News
        </h2>

        <button className="rounded-full border border-white/10 bg-white/5 px-5 py-2 hover:bg-white/10">
          Live Feed
        </button>
      </div>

      {loading && (
        <p className="text-gray-400">
          Loading latest market news...
        </p>
      )}

      {error && (
        <p className="text-red-400">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/10 hover:scale-105 transition"
            >
              <p className="text-sm text-green-400 mb-4">
                {article.source.name}
              </p>

              <h3 className="text-2xl font-bold mb-4">
                {article.title}
              </h3>

              <p className="text-gray-400">
                {article.description}
              </p>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}