import Stripe from "stripe";

type CheckoutRequest = {
  plan?: "plus" | "premium";
};

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const plusPriceId = process.env.STRIPE_PLUS_PRICE_ID;
  const premiumPriceId = process.env.STRIPE_PREMIUM_PRICE_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!stripeSecretKey) {
    return Response.json(
      { message: "Stripe secret key is not configured." },
      { status: 500 }
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
      },
      subscription_data: {
        metadata: {
          plan: selectedPlan,
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