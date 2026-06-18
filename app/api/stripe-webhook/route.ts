import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

function getSubscriptionPeriodEnd(subscription: Stripe.Subscription) {
  const firstSubscriptionItem = subscription.items.data[0];
  const currentPeriodEnd = firstSubscriptionItem?.current_period_end;

  if (!currentPeriodEnd) {
    return null;
  }

  return new Date(currentPeriodEnd * 1000).toISOString();
}

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!stripeSecretKey || !stripeWebhookSecret) {
    return Response.json(
      { message: "Stripe webhook is not configured." },
      { status: 500 }
    );
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Supabase is not configured." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecretKey);
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return Response.json(
      { message: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  const rawBody = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      stripeWebhookSecret
    );
  } catch {
    return Response.json(
      { message: "Invalid Stripe webhook signature." },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id;

      const customerId =
        typeof session.customer === "string"
          ? session.customer
          : session.customer?.id;

      const customerEmail =
        session.customer_details?.email || session.customer_email || null;

      const plan = session.metadata?.plan || "unknown";

      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        await supabase.from("subscriptions").upsert(
          {
            stripe_customer_id: customerId || null,
            stripe_subscription_id: subscriptionId,
            customer_email: customerEmail,
            plan,
            status: subscription.status,
            current_period_end: getSubscriptionPeriodEnd(subscription),
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "stripe_subscription_id",
          }
        );
      }
    }

    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object as Stripe.Subscription;

      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id;

      const plan = subscription.metadata?.plan || "unknown";

      await supabase.from("subscriptions").upsert(
        {
          stripe_customer_id: customerId,
          stripe_subscription_id: subscription.id,
          plan,
          status: subscription.status,
          current_period_end: getSubscriptionPeriodEnd(subscription),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "stripe_subscription_id",
        }
      );
    }

    return Response.json({ received: true });
  } catch {
    return Response.json(
      { message: "Webhook could not be processed." },
      { status: 500 }
    );
  }
}