import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type Plan = "free" | "plus" | "premium";

function isOwnerEmail(email: string) {
  const ownerEmails = process.env.OWNER_EMAILS || "";

  return ownerEmails
    .split(",")
    .map((ownerEmail) => ownerEmail.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.trim().toLowerCase());
}

function getOwnerPlan(): Plan {
  const ownerPlan = process.env.OWNER_PLAN?.trim().toLowerCase();

  if (ownerPlan === "plus") {
    return "plus";
  }

  return "premium";
}

function isPaidPlan(plan: Plan) {
  return plan === "plus" || plan === "premium";
}

function inferPlanFromSubscription(subscription: Record<string, unknown> | null): Plan {
  if (!subscription) {
    return "free";
  }

  const status = String(
    subscription.status ||
      subscription.subscription_status ||
      subscription.stripe_status ||
      ""
  ).toLowerCase();

  const plan = String(
    subscription.plan ||
      subscription.tier ||
      subscription.product_name ||
      subscription.price_name ||
      ""
  ).toLowerCase();

  const looksActive =
    status === "active" ||
    status === "trialing" ||
    status === "paid" ||
    status === "";

  if (!looksActive) {
    return "free";
  }

  if (plan.includes("premium")) {
    return "premium";
  }

  if (plan.includes("plus")) {
    return "plus";
  }

  return "free";
}

async function getUserPlan(email: string): Promise<Plan> {
  if (isOwnerEmail(email)) {
    return getOwnerPlan();
  }

  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return "free";
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data, error } = await adminClient
    .from("subscriptions")
    .select("*")
    .eq("user_email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("StockHelper subscription lookup error:", error);
    return "free";
  }

  return inferPlanFromSubscription(data);
}

async function getUserFromToken(token: string) {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error("Supabase is not configured.");
  }

  const authClient = createClient(supabaseUrl, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const {
    data: { user },
    error,
  } = await authClient.auth.getUser(token);

  if (error || !user?.email) {
    return null;
  }

  return user;
}

function buildPrompt(plan: Plan, question: string) {
  return `
You are StockHelper AI, a beginner-friendly stock market research assistant inside StockStarter.

Your role:
- Explain stock market concepts clearly.
- Help users understand companies, sectors, risks, valuation basics and investing terms.
- Give balanced bullish and bearish points.
- Provide research checklists and questions to consider.
- Help users avoid emotional decisions.
- Encourage diversification, risk management and independent research.

Hard safety rules:
- Do not give personalised financial advice.
- Do not tell the user to buy, sell, hold, short or allocate a specific amount.
- Do not say a stock will definitely rise or fall.
- Do not guarantee returns.
- Do not act as a regulated financial adviser.
- If the user asks "Should I buy/sell/hold?", respond with a decision framework, not a direct instruction.
- If a question requires current live price/news data, tell the user to check live data in StockStarter and official sources.

Response style:
- Be clear and practical.
- Use headings where helpful.
- Keep the answer beginner-friendly.
- End with a short "What to check next" section.
- Include a brief reminder that this is educational information, not financial advice.

User plan: ${plan}

User question:
${question}
`;
}

export async function POST(request: Request) {
  try {
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      return NextResponse.json(
        {
          error:
            "StockHelper AI is not configured yet. Add GEMINI_API_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "").trim();

    if (!token) {
      return NextResponse.json(
        { error: "Please sign in to use StockHelper AI." },
        { status: 401 }
      );
    }

    const user = await getUserFromToken(token);

    if (!user?.email) {
      return NextResponse.json(
        { error: "Please sign in again to use StockHelper AI." },
        { status: 401 }
      );
    }

    const plan = await getUserPlan(user.email);

    if (!isPaidPlan(plan)) {
      return NextResponse.json(
        {
          error:
            "StockHelper AI is available on Plus and Premium plans. Upgrade to unlock it.",
          upgradeRequired: true,
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const question = String(body.question || "").trim();

    if (!question) {
      return NextResponse.json(
        { error: "Please enter a question." },
        { status: 400 }
      );
    }

    if (question.length > 1500) {
      return NextResponse.json(
        { error: "Please keep your question under 1,500 characters." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: geminiKey,
    });

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: buildPrompt(plan, question),
    });

    return NextResponse.json({
      answer:
        response.text ||
        "StockHelper could not generate an answer. Please try again.",
    });
  } catch (error) {
    console.error("StockHelper AI error:", error);

    return NextResponse.json(
      {
        error:
          "StockHelper AI could not answer right now. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}