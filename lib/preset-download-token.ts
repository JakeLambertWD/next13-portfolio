import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_LIFETIME_SECONDS = 7 * 24 * 60 * 60;

function getTokenSecret() {
  return process.env.DOWNLOAD_TOKEN_SECRET;
}

export function createPresetDownloadToken(
  sessionId: string,
  checkoutCreatedAt: number,
) {
  const secret = getTokenSecret();
  if (!secret) {
    throw new Error("DOWNLOAD_TOKEN_SECRET is not configured.");
  }

  const payload = Buffer.from(
    JSON.stringify({
      exp: checkoutCreatedAt + TOKEN_LIFETIME_SECONDS,
      sessionId,
    }),
  ).toString("base64url");
  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function getSessionIdFromPresetDownloadToken(token: string) {
  const secret = getTokenSecret();
  const [payload, signature] = token.split(".");

  if (!secret || !payload || !signature) {
    return null;
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  const received = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (
    received.length !== expected.length ||
    !timingSafeEqual(received, expected)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (
      typeof parsed.sessionId !== "string" ||
      typeof parsed.exp !== "number" ||
      parsed.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return parsed.sessionId;
  } catch {
    return null;
  }
}
