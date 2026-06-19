import { createClient } from "@supabase/supabase-js";

type ScorecardPayload = {
  symbol?: string;
  assetName?: string;
  assetType?: string;
  businessQuality?: number;
  riskLevel?: number;
  valuationComfort?: number;
  confidenceLevel?: number;
  timeHorizon?: string;
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

function calculateFinalScore(payload: ScorecardPayload) {
  const businessQuality = Number(payload.businessQuality);
  const riskLevel = Number(payload.riskLevel);
  const valuationComfort = Number(payload.valuationComfort);
  const confidenceLevel = Number(payload.confidenceLevel);

  const riskScore = 11 - riskLevel;

  return Math.round(
    ((businessQuality + riskScore + valuationComfort + confidenceLevel) / 40) *
      100
  );
}

function getResultLabel(score: number) {
  if (score >= 80) return "Strong watchlist candidate";
  if (score >= 65) return "Worth researching further";
  if (score >= 50) return "Mixed setup";
  return "High caution";
}

function isScoreInRange(value: unknown) {
  const numberValue = Number(value);
  return Number.isInteger(numberValue) && numberValue >= 1 && numberValue <= 10;
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
      { message: "Research Scorecard service is not configured." },
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
      { message: "Upgrade to Plus or Premium to use Research Scorecards." },
      { status: 403 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data, error: scorecardError } = await supabase
    .from("research_scorecards")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (scorecardError) {
    return Response.json(
      { message: "Research Scorecards could not be loaded." },
      { status: 500 }
    );
  }

  return Response.json({
    scorecards: data || [],
  });
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Research Scorecard service is not configured." },
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
      { message: "Upgrade to Plus or Premium to use Research Scorecards." },
      { status: 403 }
    );
  }

  const payload = (await request.json()) as ScorecardPayload;

  const symbol = payload.symbol?.trim().toUpperCase();
  const assetName = payload.assetName?.trim();
  const assetType = payload.assetType?.trim() || "stock";
  const timeHorizon = payload.timeHorizon?.trim();
  const notes = payload.notes?.trim() || "";

  if (!symbol || !assetName || !timeHorizon) {
    return Response.json(
      { message: "Please enter a symbol, asset name and time horizon." },
      { status: 400 }
    );
  }

  if (
    !isScoreInRange(payload.businessQuality) ||
    !isScoreInRange(payload.riskLevel) ||
    !isScoreInRange(payload.valuationComfort) ||
    !isScoreInRange(payload.confidenceLevel)
  ) {
    return Response.json(
      { message: "All score values must be between 1 and 10." },
      { status: 400 }
    );
  }

  const finalScore = calculateFinalScore(payload);
  const resultLabel = getResultLabel(finalScore);

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error: insertError } = await supabase
    .from("research_scorecards")
    .insert({
      user_id: user.id,
      user_email: user.email,
      symbol,
      asset_name: assetName,
      asset_type: assetType,
      business_quality: Number(payload.businessQuality),
      risk_level: Number(payload.riskLevel),
      valuation_comfort: Number(payload.valuationComfort),
      confidence_level: Number(payload.confidenceLevel),
      time_horizon: timeHorizon,
      notes,
      final_score: finalScore,
      result_label: resultLabel,
    });

  if (insertError) {
    return Response.json(
      { message: "Research Scorecard could not be saved." },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Research Scorecard saved.",
    finalScore,
    resultLabel,
  });
}

export async function DELETE(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Research Scorecard service is not configured." },
      { status: 500 }
    );
  }

  const { user, error } = await getUserFromRequest(request);

  if (error || !user?.email) {
    return Response.json({ message: error }, { status: 401 });
  }

  const payload = await request.json();

  if (!payload.id) {
    return Response.json(
      { message: "Scorecard ID is required." },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error: deleteError } = await supabase
    .from("research_scorecards")
    .delete()
    .eq("id", payload.id)
    .eq("user_id", user.id);

  if (deleteError) {
    return Response.json(
      { message: "Research Scorecard could not be deleted." },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Research Scorecard deleted.",
  });
}