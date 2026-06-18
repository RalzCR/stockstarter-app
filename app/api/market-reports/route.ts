import { createClient } from "@supabase/supabase-js";

type MarketReportRequest = {
  id?: string;
  symbol?: string;
  assetName?: string;
  reportType?: "stock" | "crypto" | "index" | "fund";
  timeframe?: string;
  watchStatus?: string;
  summary?: string;
  catalysts?: string;
  risks?: string;
  notes?: string;
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

async function userHasPremiumAccess(userId: string, email: string) {
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
    subscription?.plan === "premium" &&
    (subscription?.status === "active" || subscription?.status === "trialing")
  );
}

export async function GET(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Market reports service is not configured." },
      { status: 500 }
    );
  }

  const user = await getAuthenticatedUser(request);

  if (!user?.email) {
    return Response.json(
      { message: "Please sign in to view market reports." },
      { status: 401 }
    );
  }

  const hasAccess = await userHasPremiumAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "A Premium plan is required to use market research reports." },
      { status: 403 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data, error } = await supabase
    .from("market_research_reports")
    .select(
      "id, symbol, asset_name, report_type, timeframe, watch_status, summary, catalysts, risks, notes, created_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json(
      { message: "Market research reports could not be loaded." },
      { status: 500 }
    );
  }

  return Response.json({
    reports: data || [],
  });
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Market reports service is not configured." },
      { status: 500 }
    );
  }

  const user = await getAuthenticatedUser(request);

  if (!user?.email) {
    return Response.json(
      { message: "Please sign in to save market reports." },
      { status: 401 }
    );
  }

  const hasAccess = await userHasPremiumAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "A Premium plan is required to save market research reports." },
      { status: 403 }
    );
  }

  const body: MarketReportRequest = await request.json();

  const symbol = body.symbol?.trim().toUpperCase();
  const assetName = body.assetName?.trim();
  const reportType = body.reportType || "stock";
  const timeframe = body.timeframe?.trim();
  const watchStatus = body.watchStatus?.trim();
  const summary = body.summary?.trim();
  const catalysts = body.catalysts?.trim();
  const risks = body.risks?.trim();
  const notes = body.notes?.trim();

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

  if (!timeframe) {
    return Response.json(
      { message: "Please choose a research timeframe." },
      { status: 400 }
    );
  }

  if (!watchStatus) {
    return Response.json(
      { message: "Please choose a watch status." },
      { status: 400 }
    );
  }

  if (!summary || summary.length < 20) {
    return Response.json(
      { message: "Please enter a summary with at least 20 characters." },
      { status: 400 }
    );
  }

  if (!catalysts || catalysts.length < 10) {
    return Response.json(
      { message: "Please enter at least one catalyst." },
      { status: 400 }
    );
  }

  if (!risks || risks.length < 10) {
    return Response.json(
      { message: "Please enter at least one risk." },
      { status: 400 }
    );
  }

  if (!notes || notes.length < 10) {
    return Response.json(
      { message: "Please enter research notes with at least 10 characters." },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error } = await supabase.from("market_research_reports").insert([
    {
      user_id: user.id,
      user_email: user.email,
      symbol,
      asset_name: assetName,
      report_type: reportType,
      timeframe,
      watch_status: watchStatus,
      summary,
      catalysts,
      risks,
      notes,
    },
  ]);

  if (error) {
    return Response.json(
      { message: "Market research report could not be saved." },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Market research report saved.",
  });
}

export async function DELETE(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Market reports service is not configured." },
      { status: 500 }
    );
  }

  const user = await getAuthenticatedUser(request);

  if (!user?.email) {
    return Response.json(
      { message: "Please sign in to delete market reports." },
      { status: 401 }
    );
  }

  const hasAccess = await userHasPremiumAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "A Premium plan is required to manage market research reports." },
      { status: 403 }
    );
  }

  const body: MarketReportRequest = await request.json();

  if (!body.id) {
    return Response.json(
      { message: "Missing market report ID." },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error } = await supabase
    .from("market_research_reports")
    .delete()
    .eq("id", body.id)
    .eq("user_id", user.id);

  if (error) {
    return Response.json(
      { message: "Market research report could not be deleted." },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Market research report deleted.",
  });
}