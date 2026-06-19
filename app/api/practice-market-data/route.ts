type ChartPoint = {
  time: string;
  price: number;
};

function buildFallbackChart(currentPrice: number, previousClose: number) {
  if (!currentPrice || !previousClose) {
    return [];
  }

  return [
    {
      time: "Previous close",
      price: previousClose,
    },
    {
      time: "Current",
      price: currentPrice,
    },
  ];
}

export async function GET(request: Request) {
  const finnhubApiKey = process.env.FINNHUB_API_KEY;

  if (!finnhubApiKey) {
    return Response.json(
      { message: "Market data service is not configured." },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol")?.trim().toUpperCase();

  if (!symbol) {
    return Response.json(
      { message: "Symbol is required." },
      { status: 400 }
    );
  }

  try {
    const quoteUrl = new URL("https://finnhub.io/api/v1/quote");
    quoteUrl.searchParams.set("symbol", symbol);
    quoteUrl.searchParams.set("token", finnhubApiKey);

    const quoteResponse = await fetch(quoteUrl.toString(), {
      cache: "no-store",
    });

    const quoteData = await quoteResponse.json();

    if (!quoteResponse.ok || !quoteData || !Number(quoteData.c)) {
      return Response.json(
        { message: "Live price could not be loaded for this symbol." },
        { status: 404 }
      );
    }

    const currentPrice = Number(quoteData.c);
    const previousClose = Number(quoteData.pc || 0);
    const change = previousClose ? currentPrice - previousClose : 0;
    const changePercent = previousClose ? (change / previousClose) * 100 : 0;

    const now = Math.floor(Date.now() / 1000);
    const thirtyDaysAgo = now - 60 * 60 * 24 * 30;

    let chart: ChartPoint[] = buildFallbackChart(currentPrice, previousClose);

    try {
      const candleUrl = new URL("https://finnhub.io/api/v1/stock/candle");
      candleUrl.searchParams.set("symbol", symbol);
      candleUrl.searchParams.set("resolution", "D");
      candleUrl.searchParams.set("from", String(thirtyDaysAgo));
      candleUrl.searchParams.set("to", String(now));
      candleUrl.searchParams.set("token", finnhubApiKey);

      const candleResponse = await fetch(candleUrl.toString(), {
        cache: "no-store",
      });

      const candleData = await candleResponse.json();

      if (
        candleResponse.ok &&
        candleData?.s === "ok" &&
        Array.isArray(candleData.c) &&
        Array.isArray(candleData.t)
      ) {
        chart = candleData.c.map((closePrice: number, index: number) => {
          const timestamp = Number(candleData.t[index]) * 1000;

          return {
            time: new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "short",
            }).format(new Date(timestamp)),
            price: Number(closePrice),
          };
        });
      }
    } catch {
      chart = buildFallbackChart(currentPrice, previousClose);
    }

    return Response.json({
      symbol,
      currentPrice,
      previousClose,
      change,
      changePercent,
      chart,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return Response.json(
      { message: "Market data could not be loaded." },
      { status: 500 }
    );
  }
}