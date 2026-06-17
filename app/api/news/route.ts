type FinnhubNewsItem = {
  headline?: string;
  summary?: string;
  url?: string;
  source?: string;
};

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        message: "Missing NEXT_PUBLIC_FINNHUB_API_KEY.",
        articles: [],
      },
      { status: 500 }
    );
  }

  const response = await fetch(
    `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`
  );

  const data = await response.json();

  if (!response.ok) {
    return Response.json(
      {
        message: "Finnhub API error.",
        status: response.status,
        data,
        articles: [],
      },
      { status: 500 }
    );
  }

  if (!Array.isArray(data)) {
    return Response.json(
      {
        message: "Finnhub returned unexpected data.",
        data,
        articles: [],
      },
      { status: 500 }
    );
  }

  const articles = data.slice(0, 3).map((item: FinnhubNewsItem) => ({
    title: item.headline || "Untitled market news",
    description: item.summary || "No summary available.",
    url: item.url || "#",
    source: {
      name: item.source || "Market News",
    },
  }));

  return Response.json({
    message: "News loaded successfully.",
    articles,
  });
}