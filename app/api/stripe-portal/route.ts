import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!stripeSecretKey) {
    return Response.json(
      { message: "Stripe is not configured." },
      { status: 500 }
    );
  }

  if (
    !supabaseUrl ||
    !supabaseServiceRoleKey ||
    !publicSupabaseUrl ||
    !publicSupabaseAnonKey
  ) {
    return Response.json(
      { message: "Account service is not configured." },
      { status: 500 }
    );
  }

  const authorizationHeader = request.headers.get("authorization");
  const accessToken = authorizationHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return Response.json(
      { message: "Please sign in to manage billing." },
      { status: 401 }
    );
  }

  const authClient = createClient(publicSupabaseUrl, publicSupabaseAnonKey);
  const { data, error } = await authClient.auth.getUser(accessToken);

  if (error || !data.user?.email) {
    return Response.json(
      { message: "Please sign in to manage billing." },
      { status: 401 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data: subscriptions, error: subscriptionError } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id, plan, status")
    .or(`user_id.eq.${data.user.id},customer_email.eq.${data.user.email}`)
    .order("created_at", { ascending: false })
    .limit(1);

  if (subscriptionError) {
    return Response.json(
      { message: "Billing details could not be loaded." },
      { status: 500 }
    );
  }

  const subscription = subscriptions?.[0];

  if (!subscription?.stripe_customer_id) {
    return Response.json(
      { message: "No active Stripe billing profile was found for this account." },
      { status: 400 }
    );
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${siteUrl}/account`,
    });

    return Response.json({
      url: portalSession.url,
    });
  } catch {
    return Response.json(
      { message: "Billing portal could not be opened." },
      { status: 500 }
    );
  }
}