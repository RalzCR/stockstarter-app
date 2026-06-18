import { createClient } from "@supabase/supabase-js";

function isOwnerEmail(email: string) {
  const ownerEmails = process.env.OWNER_EMAILS || "";

  return ownerEmails
    .split(",")
    .map((ownerEmail) => ownerEmail.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.trim().toLowerCase());
}

export async function GET(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !supabaseServiceRoleKey ||
    !publicSupabaseUrl ||
    !publicSupabaseAnonKey
  ) {
    return Response.json(
      { message: "Subscription service is not configured." },
      { status: 500 }
    );
  }

  const authorizationHeader = request.headers.get("authorization");
  const accessToken = authorizationHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return Response.json(
      { message: "Please sign in." },
      { status: 401 }
    );
  }

  const authClient = createClient(publicSupabaseUrl, publicSupabaseAnonKey);
  const { data, error } = await authClient.auth.getUser(accessToken);

  if (error || !data.user?.email) {
    return Response.json(
      { message: "Please sign in." },
      { status: 401 }
    );
  }

  if (isOwnerEmail(data.user.email)) {
    return Response.json({
      plan: "premium",
      status: "active",
      currentPeriodEnd: null,
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data: subscriptions, error: subscriptionError } = await supabase
    .from("subscriptions")
    .select("plan, status, current_period_end")
    .or(`user_id.eq.${data.user.id},customer_email.eq.${data.user.email}`)
    .order("created_at", { ascending: false })
    .limit(1);

  if (subscriptionError) {
    return Response.json(
      { message: "Subscription status could not be loaded." },
      { status: 500 }
    );
  }

  const subscription = subscriptions?.[0];

  if (!subscription) {
    return Response.json({
      plan: "free",
      status: "free",
      currentPeriodEnd: null,
    });
  }

  return Response.json({
    plan: subscription.plan,
    status: subscription.status,
    currentPeriodEnd: subscription.current_period_end,
  });
}