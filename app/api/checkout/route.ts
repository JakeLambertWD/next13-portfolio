import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Use the configured site URL for Stripe redirects, with the request URL as a local fallback.
function getSiteOrigin(request: Request) {
  const configuredUrl = process.env.SITE_URL;

  if (configuredUrl) {
    return new URL(configuredUrl).origin;
  }

  return new URL(request.url).origin;
}

export async function POST(request: Request) {
  // Keep both values on the server so the browser cannot change the product or price.
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  // Stop early when the app has not been configured with Stripe credentials.
  if (!secretKey || !priceId) {
    return NextResponse.json(
      { error: "Stripe checkout is not configured." },
      { status: 500 },
    );
  }

  let origin: string;

  try {
    // Stripe requires valid absolute URLs for the success and cancel redirects.
    origin = getSiteOrigin(request);
  } catch {
    return NextResponse.json(
      { error: "The checkout site URL is invalid." },
      { status: 500 },
    );
  }

  try {
    // Create a one-time Checkout Session using the server-controlled Stripe Price.
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      managed_payments: { enabled: false },
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/presets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/presets`,
    });

    // A hosted Checkout URL is required for the browser redirect.
    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    // Return a safe message instead of exposing Stripe errors or secret details.
    console.error("[api/checkout] failed to create session:", error);
    return NextResponse.json(
      { error: "Unable to create a checkout session." },
      { status: 502 },
    );
  }
}
