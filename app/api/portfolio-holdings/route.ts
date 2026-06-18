import { createClient } from "@supabase/supabase-js";

type PortfolioHoldingRequest = {
  id?: string;
  symbol?: string;
  assetName?: string;
  assetType?: "stock" | "crypto" | "index" | "fund";
  quantity?: number;
  averageBuyPrice?: number;
  currency?: "GBP" | "USD" | "EUR" | "INR";
};

function isOwnerEmail(email: string) {
  const ownerEmails = process.env.OWNER_EMAILS || "";

  return ownerEmails
    .split(",")
    .map((ownerEmail) => ownerEmail.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.trim().toLowerCase());
}

async function getAuthenticatedUser(request: Request) {
  const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!publicSupabaseUrl || !publicSupabaseAnonKey) {
    return null;
  }

  const authorizationHeader = request.headers.get("authorization");
  const accessToken = authorizationHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return null;
  }

  const authClient = createClient(publicSupabaseUrl, publicSupabaseAnonKey);
  const { data, error } = await authClient.auth.getUser(accessToken);

  if (error || !data.user?.email) {
    return null;
  }

  return data.user;
}

async function userHasPaidAccess(userId: string, email: string) {
  if (isOwnerEmail(email)) {
    return true;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return false;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("plan, status")
    .or(`user_id.eq.${userId},customer_email.eq.${email}`)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    return false;
  }

  const subscription = subscriptions?.[0];

  return (
    (subscription?.plan === "plus" || subscription?.plan === "premium") &&
    (subscription?.status === "active" || subscription?.status === "trialing")
  );
}

export async function GET(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Portfolio service is not configured." },
      { status: 500 }
    );
  }

  const user = await getAuthenticatedUser(request);

  if (!user?.email) {
    return Response.json(
      { message: "Please sign in to view your portfolio." },
      { status: 401 }
    );
  }

  const hasAccess = await userHasPaidAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "A Plus or Premium plan is required to use the portfolio tracker." },
      { status: 403 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data, error } = await supabase
    .from("portfolio_holdings")
    .select("id, symbol, asset_name, asset_type, quantity, average_buy_price, currency, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json(
      { message: "Portfolio holdings could not be loaded." },
      { status: 500 }
    );
  }

  return Response.json({
    holdings: data || [],
  });
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Portfolio service is not configured." },
      { status: 500 }
    );
  }

  const user = await getAuthenticatedUser(request);

  if (!user?.email) {
    return Response.json(
      { message: "Please sign in to save portfolio holdings." },
      { status: 401 }
    );
  }

  const hasAccess = await userHasPaidAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "A Plus or Premium plan is required to save portfolio holdings." },
      { status: 403 }
    );
  }

  const body: PortfolioHoldingRequest = await request.json();

  const symbol = body.symbol?.trim().toUpperCase();
  const assetName = body.assetName?.trim();
  const assetType = body.assetType || "stock";
  const quantity = Number(body.quantity);
  const averageBuyPrice = Number(body.averageBuyPrice);
  const currency = body.currency || "GBP";

  if (!symbol || symbol.length > 20) {
    return Response.json(
      { message: "Please enter a valid symbol." },
      { status: 400 }
    );
  }

  if (!assetName || assetName.length < 2) {
    return Response.json(
      { message: "Please enter the asset name." },
      { status: 400 }
    );
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    return Response.json(
      { message: "Please enter a valid quantity." },
      { status: 400 }
    );
  }

  if (!Number.isFinite(averageBuyPrice) || averageBuyPrice <= 0) {
    return Response.json(
      { message: "Please enter a valid average buy price." },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error } = await supabase.from("portfolio_holdings").insert([
    {
      user_id: user.id,
      user_email: user.email,
      symbol,
      asset_name: assetName,
      asset_type: assetType,
      quantity,
      average_buy_price: averageBuyPrice,
      currency,
    },
  ]);

  if (error) {
    return Response.json(
      { message: "Portfolio holding could not be saved." },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Portfolio holding saved.",
  });
}

export async function DELETE(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Portfolio service is not configured." },
      { status: 500 }
    );
  }

  const user = await getAuthenticatedUser(request);

  if (!user?.email) {
    return Response.json(
      { message: "Please sign in to remove portfolio holdings." },
      { status: 401 }
    );
  }

  const hasAccess = await userHasPaidAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "A Plus or Premium plan is required to manage portfolio holdings." },
      { status: 403 }
    );
  }

  const body: PortfolioHoldingRequest = await request.json();

  if (!body.id) {
    return Response.json(
      { message: "Missing portfolio holding ID." },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error } = await supabase
    .from("portfolio_holdings")
    .delete()
    .eq("id", body.id)
    .eq("user_id", user.id);

  if (error) {
    return Response.json(
      { message: "Portfolio holding could not be removed." },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Portfolio holding removed.",
  });
}