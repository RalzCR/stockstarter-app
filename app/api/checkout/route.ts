import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

type CheckoutRequest = {
  plan?: "plus" | "premium";
};

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const plusPriceId = process.env.STRIPE_PLUS_PRICE_ID;
  const premiumPriceId = process.env.STRIPE_PREMIUM_PRICE_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!stripeSecretKey) {
    return Response.json(
      { message: "Stripe secret key is not configured." },
      { status: 500 }
    );
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return Response.json(
      { message: "Supabase authentication is not configured." },
      { status: 500 }
    );
  }

  const authorizationHeader = request.headers.get("authorization");
  const accessToken = authorizationHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return Response.json(
      { message: "Please sign in before subscribing." },
      { status: 401 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user?.email) {
    return Response.json(
      { message: "Please sign in before subscribing." },
      { status: 401 }
    );
  }

  const body: CheckoutRequest = await request.json();
  const selectedPlan = body.plan;

  if (selectedPlan !== "plus" && selectedPlan !== "premium") {
    return Response.json(
      { message: "Please choose a valid plan." },
      { status: 400 }
    );
  }

  const priceId = selectedPlan === "plus" ? plusPriceId : premiumPriceId;

  if (!priceId) {
    return Response.json(
      { message: "Stripe price ID is not configured for this plan." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: data.user.email,
      client_reference_id: data.user.id,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: {
        plan: selectedPlan,
        user_id: data.user.id,
        customer_email: data.user.email,
      },
      subscription_data: {
        metadata: {
          plan: selectedPlan,
          user_id: data.user.id,
          customer_email: data.user.email,
        },
      },
    });

    return Response.json({
      url: session.url,
    });
  } catch {
    return Response.json(
      { message: "Checkout could not be started." },
      { status: 500 }
    );
  }
}