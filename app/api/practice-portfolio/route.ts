import { createClient } from "@supabase/supabase-js";

type TradePayload = {
  side?: "buy" | "sell";
  symbol?: string;
  assetName?: string;
  assetType?: string;
  quantity?: number;
  tradePrice?: number;
  currency?: string;
  notes?: string;
};

async function getUserFromRequest(request: Request) {
  const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!publicSupabaseUrl || !publicSupabaseAnonKey) {
    return {
      user: null,
      error: "Authentication service is not configured.",
    };
  }

  const authorizationHeader = request.headers.get("authorization");
  const accessToken = authorizationHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return {
      user: null,
      error: "Please sign in.",
    };
  }

  const authClient = createClient(publicSupabaseUrl, publicSupabaseAnonKey);
  const { data, error } = await authClient.auth.getUser(accessToken);

  if (error || !data.user?.email) {
    return {
      user: null,
      error: "Please sign in.",
    };
  }

  return {
    user: data.user,
    error: null,
  };
}

async function getOrCreatePortfolio(userId: string, email: string) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return {
      portfolio: null,
      error: "Practice Portfolio service is not configured.",
    };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data: existingPortfolio, error: existingError } = await supabase
    .from("practice_portfolios")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (existingError) {
    console.error("Practice portfolio load error:", existingError);

    return {
      portfolio: null,
      error: "Practice Portfolio could not be loaded.",
    };
  }

  if (existingPortfolio) {
    return {
      portfolio: existingPortfolio,
      error: null,
    };
  }

  const { data: newPortfolio, error: createError } = await supabase
    .from("practice_portfolios")
    .insert({
      user_id: userId,
      user_email: email,
      starting_cash: 100000,
      cash_balance: 100000,
      currency: "GBP",
    })
    .select("*")
    .single();

  if (createError) {
    console.error("Practice portfolio create error:", createError);

    return {
      portfolio: null,
      error: "Practice Portfolio could not be created.",
    };
  }

  return {
    portfolio: newPortfolio,
    error: null,
  };
}

export async function GET(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Practice Portfolio service is not configured." },
      { status: 500 }
    );
  }

  const { user, error } = await getUserFromRequest(request);

  if (error || !user?.email) {
    return Response.json({ message: error }, { status: 401 });
  }

  const { portfolio, error: portfolioError } = await getOrCreatePortfolio(
    user.id,
    user.email
  );

  if (portfolioError || !portfolio) {
    return Response.json(
      { message: portfolioError || "Practice Portfolio could not be loaded." },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data: holdings, error: holdingsError } = await supabase
    .from("practice_holdings")
    .select("*")
    .eq("user_id", user.id)
    .gt("quantity", 0)
    .order("created_at", { ascending: false });

  if (holdingsError) {
    console.error("Practice holdings load error:", holdingsError);

    return Response.json(
      { message: "Practice holdings could not be loaded." },
      { status: 500 }
    );
  }

  const { data: trades, error: tradesError } = await supabase
    .from("practice_trades")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(25);

  if (tradesError) {
    console.error("Practice trades load error:", tradesError);

    return Response.json(
      { message: "Practice trades could not be loaded." },
      { status: 500 }
    );
  }

  return Response.json({
    portfolio,
    holdings: holdings || [],
    trades: trades || [],
  });
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Practice Portfolio service is not configured." },
      { status: 500 }
    );
  }

  const { user, error } = await getUserFromRequest(request);

  if (error || !user?.email) {
    return Response.json({ message: error }, { status: 401 });
  }

  const payload = (await request.json()) as TradePayload;

  const side = payload.side;
  const symbol = payload.symbol?.trim().toUpperCase();
  const assetName = payload.assetName?.trim();
  const assetType = payload.assetType?.trim() || "stock";
  const quantity = Number(payload.quantity);
  const tradePrice = Number(payload.tradePrice);
  const currency = payload.currency?.trim() || "GBP";
  const notes = payload.notes?.trim() || "";
  const totalValue = quantity * tradePrice;

  if (!side || !["buy", "sell"].includes(side)) {
    return Response.json(
      { message: "Please choose buy or sell." },
      { status: 400 }
    );
  }

  if (!symbol || !assetName || quantity <= 0 || tradePrice <= 0) {
    return Response.json(
      { message: "Please enter a symbol, asset name, quantity and price." },
      { status: 400 }
    );
  }

  const { portfolio, error: portfolioError } = await getOrCreatePortfolio(
    user.id,
    user.email
  );

  if (portfolioError || !portfolio) {
    return Response.json(
      { message: portfolioError || "Practice Portfolio could not be loaded." },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  if (side === "buy") {
    if (Number(portfolio.cash_balance) < totalValue) {
      return Response.json(
        { message: "You do not have enough virtual cash for this trade." },
        { status: 400 }
      );
    }

    const { data: existingHolding, error: holdingLoadError } = await supabase
      .from("practice_holdings")
      .select("*")
      .eq("user_id", user.id)
      .eq("symbol", symbol)
      .maybeSingle();

    if (holdingLoadError) {
      console.error("Practice holding load error:", holdingLoadError);

      return Response.json(
        { message: "Holding could not be loaded." },
        { status: 500 }
      );
    }

    if (existingHolding) {
      const oldQuantity = Number(existingHolding.quantity);
      const oldAveragePrice = Number(existingHolding.average_price);
      const newQuantity = oldQuantity + quantity;

      const newAveragePrice =
        (oldQuantity * oldAveragePrice + quantity * tradePrice) / newQuantity;

      const { error: updateHoldingError } = await supabase
        .from("practice_holdings")
        .update({
          asset_name: assetName,
          asset_type: assetType,
          quantity: newQuantity,
          average_price: newAveragePrice,
          currency,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingHolding.id)
        .eq("user_id", user.id);

      if (updateHoldingError) {
        console.error("Practice holding update error:", updateHoldingError);

        return Response.json(
          { message: "Holding could not be updated." },
          { status: 500 }
        );
      }
    } else {
      const { error: insertHoldingError } = await supabase
        .from("practice_holdings")
        .insert({
          user_id: user.id,
          user_email: user.email,
          symbol,
          asset_name: assetName,
          asset_type: assetType,
          quantity,
          average_price: tradePrice,
          currency,
        });

      if (insertHoldingError) {
        console.error("Practice holding insert error:", insertHoldingError);

        return Response.json(
          { message: "Holding could not be created." },
          { status: 500 }
        );
      }
    }

    const { error: cashUpdateError } = await supabase
      .from("practice_portfolios")
      .update({
        cash_balance: Number(portfolio.cash_balance) - totalValue,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (cashUpdateError) {
      console.error("Practice cash update error:", cashUpdateError);

      return Response.json(
        { message: "Virtual cash could not be updated." },
        { status: 500 }
      );
    }
  }

  if (side === "sell") {
    const { data: existingHolding, error: holdingLoadError } = await supabase
      .from("practice_holdings")
      .select("*")
      .eq("user_id", user.id)
      .eq("symbol", symbol)
      .maybeSingle();

    if (holdingLoadError || !existingHolding) {
      return Response.json(
        { message: "You do not own this asset in your practice portfolio." },
        { status: 400 }
      );
    }

    const currentQuantity = Number(existingHolding.quantity);

    if (quantity > currentQuantity) {
      return Response.json(
        { message: "You cannot sell more than your current holding." },
        { status: 400 }
      );
    }

    const newQuantity = currentQuantity - quantity;

    const { error: updateHoldingError } = await supabase
      .from("practice_holdings")
      .update({
        quantity: newQuantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingHolding.id)
      .eq("user_id", user.id);

    if (updateHoldingError) {
      console.error("Practice holding sell update error:", updateHoldingError);

      return Response.json(
        { message: "Holding could not be updated." },
        { status: 500 }
      );
    }

    const { error: cashUpdateError } = await supabase
      .from("practice_portfolios")
      .update({
        cash_balance: Number(portfolio.cash_balance) + totalValue,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (cashUpdateError) {
      console.error("Practice cash sell update error:", cashUpdateError);

      return Response.json(
        { message: "Virtual cash could not be updated." },
        { status: 500 }
      );
    }
  }

  const { error: tradeInsertError } = await supabase
    .from("practice_trades")
    .insert({
      user_id: user.id,
      user_email: user.email,
      symbol,
      asset_name: assetName,
      asset_type: assetType,
      side,
      quantity,
      trade_price: tradePrice,
      total_value: totalValue,
      currency,
      notes,
    });

  if (tradeInsertError) {
    console.error("Practice trade insert error:", tradeInsertError);

    return Response.json(
      { message: "Trade could not be saved." },
      { status: 500 }
    );
  }

  return Response.json({
    message:
      side === "buy"
        ? "Virtual buy trade completed."
        : "Virtual sell trade completed.",
  });
}

export async function DELETE(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Practice Portfolio service is not configured." },
      { status: 500 }
    );
  }

  const { user, error } = await getUserFromRequest(request);

  if (error || !user?.email) {
    return Response.json({ message: error }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error: holdingsDeleteError } = await supabase
    .from("practice_holdings")
    .delete()
    .eq("user_id", user.id);

  if (holdingsDeleteError) {
    console.error("Practice holdings reset error:", holdingsDeleteError);

    return Response.json(
      { message: "Practice holdings could not be reset." },
      { status: 500 }
    );
  }

  const { error: tradesDeleteError } = await supabase
    .from("practice_trades")
    .delete()
    .eq("user_id", user.id);

  if (tradesDeleteError) {
    console.error("Practice trades reset error:", tradesDeleteError);

    return Response.json(
      { message: "Practice trade history could not be reset." },
      { status: 500 }
    );
  }

  const { data: existingPortfolio, error: portfolioLoadError } = await supabase
    .from("practice_portfolios")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (portfolioLoadError) {
    console.error("Practice portfolio reset load error:", portfolioLoadError);

    return Response.json(
      { message: "Practice Portfolio could not be reset." },
      { status: 500 }
    );
  }

  if (existingPortfolio) {
    const { error: resetPortfolioError } = await supabase
      .from("practice_portfolios")
      .update({
        starting_cash: 100000,
        cash_balance: 100000,
        currency: "GBP",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (resetPortfolioError) {
      console.error("Practice portfolio reset error:", resetPortfolioError);

      return Response.json(
        { message: "Practice Portfolio could not be reset." },
        { status: 500 }
      );
    }
  } else {
    const { error: createPortfolioError } = await supabase
      .from("practice_portfolios")
      .insert({
        user_id: user.id,
        user_email: user.email,
        starting_cash: 100000,
        cash_balance: 100000,
        currency: "GBP",
      });

    if (createPortfolioError) {
      console.error("Practice portfolio reset create error:", createPortfolioError);

      return Response.json(
        { message: "Practice Portfolio could not be recreated." },
        { status: 500 }
      );
    }
  }

  return Response.json({
    message: "Practice Portfolio reset to £100,000 virtual cash.",
  });
}