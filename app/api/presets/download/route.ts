import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { Readable } from "node:stream";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { presetDownloadPath } from "../../../../lib/preset-download";
import { getSessionIdFromPresetDownloadToken } from "../../../../lib/preset-download-token";

export const runtime = "nodejs";

function isValidSessionId(sessionId: string) {
  return /^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId);
}

async function hasPaidForPresetPack(sessionId: string) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!secretKey || !priceId || !isValidSessionId(sessionId)) {
    return false;
  }

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    const purchasedPriceId = session.line_items?.data[0]?.price?.id;

    return (
      session.payment_status === "paid" &&
      session.mode === "payment" &&
      purchasedPriceId === priceId
    );
  } catch (error) {
    console.error("[api/presets/download] failed to verify session:", error);
    return false;
  }
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const token = searchParams.get("token");
  const sessionId = token
    ? getSessionIdFromPresetDownloadToken(token)
    : searchParams.get("session_id");

  if (!sessionId || !(await hasPaidForPresetPack(sessionId))) {
    return NextResponse.json(
      { error: "Download is not authorized." },
      { status: 403 },
    );
  }

  try {
    const fileInfo = await stat(presetDownloadPath);
    if (!fileInfo.isFile()) {
      throw new Error("Preset download path is not a file.");
    }

    const stream = Readable.toWeb(createReadStream(presetDownloadPath));
    return new NextResponse(stream as unknown as BodyInit, {
      headers: {
        "Content-Disposition":
          'attachment; filename="Lamberts Lens Preset Pack.zip"',
        "Content-Length": fileInfo.size.toString(),
        "Content-Type": "application/zip",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("[api/presets/download] failed to read product:", error);
    return NextResponse.json(
      { error: "The preset download is unavailable." },
      { status: 503 },
    );
  }
}
