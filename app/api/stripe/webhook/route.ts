import { createHmac } from "node:crypto";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { sendPresetDownloadEmail } from "../../../../lib/preset-email";
import {
  hasProcessedSession,
  markSessionProcessed,
} from "../../../../lib/webhook-dedupe";

export const runtime = "nodejs";

function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string,
): boolean {
  const [timestampStr, signatureFromHeader] = signature.split(",").map((s) => {
    const [key, value] = s.split("=");
    return value;
  });

  if (!timestampStr || !signatureFromHeader) {
    return false;
  }

  const signed = `${timestampStr}.${body}`;
  const hash = createHmac("sha256", secret).update(signed).digest("hex");

  const expected = Buffer.from(hash);
  const received = Buffer.from(signatureFromHeader);

  if (
    received.length !== expected.length ||
    !timingSafeEqual(received, expected)
  ) {
    return false;
  }

  return true;
}

// Node.js crypto's timingSafeEqual requires equal-length buffers.
function timingSafeEqual(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a[i] ^ b[i];
  }

  return result === 0;
}

async function handleCheckoutSessionCompleted(sessionId: string) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!secretKey || !priceId) {
    throw new Error("Stripe is not configured.");
  }

  // Check for duplicate processing.
  if (await hasProcessedSession(sessionId)) {
    console.log(`[webhook] Session ${sessionId} already processed.`);
    return;
  }

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    const purchasedPriceId = session.line_items?.data[0]?.price?.id;
    const customerEmail =
      session.customer_details?.email ?? session.customer_email;

    // Verify payment status and product.
    if (
      session.payment_status !== "paid" ||
      session.mode !== "payment" ||
      purchasedPriceId !== priceId
    ) {
      console.error(
        `[webhook] Invalid session state: payment_status=${session.payment_status}, mode=${session.mode}, price=${purchasedPriceId}`,
      );
      return;
    }

    if (!customerEmail) {
      console.error(`[webhook] Session ${sessionId} has no customer email.`);
      return;
    }

    // Mark as processed before sending email.
    // If email fails, the webhook can be replayed.
    const wasMarked = await markSessionProcessed(sessionId);
    if (!wasMarked) {
      console.log(`[webhook] Session ${sessionId} already processed.`);
      return;
    }

    // Send the fulfillment email.
    try {
      await sendPresetDownloadEmail({
        customerEmail,
        sessionId,
      });
      console.log(
        `[webhook] Email sent for session ${sessionId} to ${customerEmail}`,
      );
    } catch (error) {
      // Log the error but do not fail the webhook.
      // Stripe will retry if we return a non-2xx status.
      console.error(
        `[webhook] Email delivery failed for session ${sessionId}:`,
        error,
      );
      throw error;
    }
  } catch (error) {
    console.error(`[webhook] Failed to handle session ${sessionId}:`, error);
    throw error;
  }
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error("[webhook] Missing signature or webhook secret.");
    return NextResponse.json(
      { error: "Webhook signature missing." },
      { status: 400 },
    );
  }

  let body: string;
  try {
    body = await request.text();
  } catch {
    console.error("[webhook] Failed to read request body.");
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyWebhookSignature(body, signature, webhookSecret)) {
    console.error("[webhook] Invalid signature.");
    return NextResponse.json(
      { error: "Webhook signature invalid." },
      { status: 403 },
    );
  }

  let event: Stripe.Event;
  try {
    event = JSON.parse(body);
  } catch {
    console.error("[webhook] Failed to parse JSON.");
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // Ignore unsupported events.
  if (event.type !== "checkout.session.completed") {
    console.log(`[webhook] Ignoring event type: ${event.type}`);
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (!session.id) {
    console.error("[webhook] Session has no ID.");
    return NextResponse.json({ error: "Invalid session." }, { status: 400 });
  }

  try {
    await handleCheckoutSessionCompleted(session.id);
    return NextResponse.json({ received: true });
  } catch (error) {
    // Return 500 so Stripe retries the webhook.
    console.error("[webhook] Fatal error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 },
    );
  }
}
