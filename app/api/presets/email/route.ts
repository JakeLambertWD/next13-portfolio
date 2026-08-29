import Stripe from "stripe";
import { NextResponse } from "next/server";
import { sendPresetDownloadEmail } from "../../../../lib/preset-email";

export const runtime = "nodejs";

function isValidSessionId(sessionId: string) {
  return /^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId);
}

function isValidEmail(email: string | null | undefined) {
  return Boolean(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
}

async function getPaidCustomerEmail(sessionId: string) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!secretKey || !priceId || !isValidSessionId(sessionId)) {
    return null;
  }

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    const purchasedPriceId = session.line_items?.data[0]?.price?.id;
    const customerEmail =
      session.customer_details?.email ?? session.customer_email;

    if (
      session.payment_status !== "paid" ||
      session.mode !== "payment" ||
      purchasedPriceId !== priceId ||
      !isValidEmail(customerEmail)
    ) {
      return null;
    }

    return customerEmail;
  } catch (error) {
    console.error("[api/presets/email] failed to verify session:", error);
    return null;
  }
}

export async function POST(request: Request) {
  let sessionId: unknown;

  try {
    ({ sessionId } = await request.json());
  } catch {
    return NextResponse.json(
      { error: "Unable to send the email." },
      { status: 400 },
    );
  }

  if (typeof sessionId !== "string") {
    return NextResponse.json(
      { error: "Unable to send the email." },
      { status: 403 },
    );
  }

  const customerEmail = await getPaidCustomerEmail(sessionId);
  if (!customerEmail) {
    return NextResponse.json(
      { error: "Unable to send the email." },
      { status: 403 },
    );
  }

  try {
    await sendPresetDownloadEmail({ customerEmail, sessionId });
    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error("[api/presets/email] delivery failed:", error);
    return NextResponse.json(
      { error: "We could not send the download email. Please try again." },
      { status: 503 },
    );
  }
}
