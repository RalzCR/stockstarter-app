export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

  if (!apiKey) {
    return Response.json(
      { message: "Missing Finnhub API key.", articles: [] },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`
    );

    const data = await response.json();

    const articles = data.slice(0, 3).map((item: any) => ({
      title: item.headline,
      description: item.summary,
      url: item.url,
      source: {
        name: item.source || "Market News",
      },
    }));

    return Response.json({ articles });
  } catch {
    return Response.json(
      { message: "Could not load news right now.", articles: [] },
      { status: 500 }
    );
  }
}