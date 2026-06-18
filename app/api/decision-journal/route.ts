import { createClient } from "@supabase/supabase-js";

type DecisionJournalRequest = {
  id?: string;
  symbol?: string;
  decisionType?: string;
  confidenceLevel?: string;
  emotionLevel?: string;
  reason?: string;
  risk?: string;
  reviewDate?: string;
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
      { message: "Decision journal service is not configured." },
      { status: 500 }
    );
  }

  const user = await getAuthenticatedUser(request);

  if (!user?.email) {
    return Response.json(
      { message: "Please sign in to view your decision journal." },
      { status: 401 }
    );
  }

  const hasAccess = await userHasPaidAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "A Plus or Premium plan is required to use the decision journal." },
      { status: 403 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data, error } = await supabase
    .from("decision_journal")
    .select(
      "id, symbol, decision_type, confidence_level, emotion_level, reason, risk, review_date, created_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json(
      { message: "Decision journal entries could not be loaded." },
      { status: 500 }
    );
  }

  return Response.json({
    entries: data || [],
  });
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Decision journal service is not configured." },
      { status: 500 }
    );
  }

  const user = await getAuthenticatedUser(request);

  if (!user?.email) {
    return Response.json(
      { message: "Please sign in to save decision journal entries." },
      { status: 401 }
    );
  }

  const hasAccess = await userHasPaidAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "A Plus or Premium plan is required to save decision journal entries." },
      { status: 403 }
    );
  }

  const body: DecisionJournalRequest = await request.json();

  const symbol = body.symbol?.trim().toUpperCase();
  const decisionType = body.decisionType?.trim();
  const confidenceLevel = body.confidenceLevel?.trim();
  const emotionLevel = body.emotionLevel?.trim();
  const reason = body.reason?.trim();
  const risk = body.risk?.trim();
  const reviewDate = body.reviewDate || null;

  if (!symbol || symbol.length > 20) {
    return Response.json(
      { message: "Please enter a valid symbol." },
      { status: 400 }
    );
  }

  if (!decisionType) {
    return Response.json(
      { message: "Please choose a decision type." },
      { status: 400 }
    );
  }

  if (!confidenceLevel) {
    return Response.json(
      { message: "Please choose a confidence level." },
      { status: 400 }
    );
  }

  if (!emotionLevel) {
    return Response.json(
      { message: "Please choose an emotion level." },
      { status: 400 }
    );
  }

  if (!reason || reason.length < 15) {
    return Response.json(
      { message: "Please enter a reason with at least 15 characters." },
      { status: 400 }
    );
  }

  if (!risk || risk.length < 10) {
    return Response.json(
      { message: "Please enter the main risk with at least 10 characters." },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error } = await supabase.from("decision_journal").insert([
    {
      user_id: user.id,
      user_email: user.email,
      symbol,
      decision_type: decisionType,
      confidence_level: confidenceLevel,
      emotion_level: emotionLevel,
      reason,
      risk,
      review_date: reviewDate,
    },
  ]);

  if (error) {
    return Response.json(
      { message: "Decision journal entry could not be saved." },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Decision journal entry saved.",
  });
}

export async function DELETE(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Decision journal service is not configured." },
      { status: 500 }
    );
  }

  const user = await getAuthenticatedUser(request);

  if (!user?.email) {
    return Response.json(
      { message: "Please sign in to delete decision journal entries." },
      { status: 401 }
    );
  }

  const hasAccess = await userHasPaidAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "A Plus or Premium plan is required to manage the decision journal." },
      { status: 403 }
    );
  }

  const body: DecisionJournalRequest = await request.json();

  if (!body.id) {
    return Response.json(
      { message: "Missing decision journal entry ID." },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error } = await supabase
    .from("decision_journal")
    .delete()
    .eq("id", body.id)
    .eq("user_id", user.id);

  if (error) {
    return Response.json(
      { message: "Decision journal entry could not be deleted." },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Decision journal entry deleted.",
  });
}