import { createClient } from "@supabase/supabase-js";

type PriceLevelPayload = {
  id?: string;
  symbol?: string;
  assetName?: string;
  targetPrice?: number;
  currency?: string;
  condition?: string;
  reason?: string;
  status?: string;
};

function isOwnerEmail(email: string) {
  const ownerEmails = process.env.OWNER_EMAILS || "";

  return ownerEmails
    .split(",")
    .map((ownerEmail) => ownerEmail.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.trim().toLowerCase());
}

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

async function userHasPaidAccess(userId: string, email: string) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return false;
  }

  if (isOwnerEmail(email)) {
    return true;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data } = await supabase
    .from("subscriptions")
    .select("plan, status")
    .or(`user_id.eq.${userId},customer_email.eq.${email}`)
    .in("plan", ["plus", "premium"])
    .in("status", ["active", "trialing"])
    .order("created_at", { ascending: false })
    .limit(1);

  return Boolean(data?.[0]);
}

export async function GET(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Price Levels service is not configured." },
      { status: 500 }
    );
  }

  const { user, error } = await getUserFromRequest(request);

  if (error || !user?.email) {
    return Response.json({ message: error }, { status: 401 });
  }

  const hasAccess = await userHasPaidAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "Upgrade to Plus or Premium to use Price Levels." },
      { status: 403 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data, error: levelsError } = await supabase
    .from("price_levels")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (levelsError) {
    console.error("Price levels load error:", levelsError);

    return Response.json(
      { message: "Price levels could not be loaded." },
      { status: 500 }
    );
  }

  return Response.json({
    levels: data || [],
  });
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Price Levels service is not configured." },
      { status: 500 }
    );
  }

  const { user, error } = await getUserFromRequest(request);

  if (error || !user?.email) {
    return Response.json({ message: error }, { status: 401 });
  }

  const hasAccess = await userHasPaidAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "Upgrade to Plus or Premium to use Price Levels." },
      { status: 403 }
    );
  }

  const payload = (await request.json()) as PriceLevelPayload;

  const symbol = payload.symbol?.trim().toUpperCase();
  const assetName = payload.assetName?.trim();
  const targetPrice = Number(payload.targetPrice);
  const currency = payload.currency?.trim() || "GBP";
  const condition = payload.condition?.trim() || "Above";
  const reason = payload.reason?.trim() || "";
  const status = payload.status?.trim() || "Watching";

  if (!symbol || !assetName || !targetPrice || targetPrice <= 0) {
    return Response.json(
      { message: "Please enter a symbol, asset name and target price." },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error: insertError } = await supabase
    .from("price_levels")
    .insert({
      user_id: user.id,
      user_email: user.email,
      symbol,
      asset_name: assetName,
      target_price: targetPrice,
      currency,
      condition,
      reason,
      status,
    });

  if (insertError) {
    console.error("Price levels save error:", insertError);

    return Response.json(
      { message: "Price level could not be saved." },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Price level saved.",
  });
}

export async function DELETE(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Price Levels service is not configured." },
      { status: 500 }
    );
  }

  const { user, error } = await getUserFromRequest(request);

  if (error || !user?.email) {
    return Response.json({ message: error }, { status: 401 });
  }

  const payload = (await request.json()) as PriceLevelPayload;

  if (!payload.id) {
    return Response.json(
      { message: "Price level ID is required." },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error: deleteError } = await supabase
    .from("price_levels")
    .delete()
    .eq("id", payload.id)
    .eq("user_id", user.id);

  if (deleteError) {
    console.error("Price levels delete error:", deleteError);

    return Response.json(
      { message: "Price level could not be deleted." },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Price level deleted.",
  });
}