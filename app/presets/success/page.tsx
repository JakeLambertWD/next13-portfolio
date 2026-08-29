import Link from "next/link";
import Stripe from "stripe";
import EmailDownloadLink from "./EmailDownloadLink";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

function isValidSessionId(sessionId: string) {
  return /^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId);
}

function hasValidEmail(email: string | null | undefined) {
  return Boolean(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
}

async function getVerifiedSession(sessionId: string) {
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
      !hasValidEmail(customerEmail)
    ) {
      return null;
    }

    return session;
  } catch (error) {
    console.error("[presets/success] failed to verify session:", error);
    return null;
  }
}

export default async function PresetPurchaseSuccess({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;
  const session = sessionId ? await getVerifiedSession(sessionId) : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0c0e] px-6 text-center text-[#f4f1ea]">
      <div className="w-full max-w-md rounded-2xl border border-[#5eb8b0]/35 bg-[#141618] p-8">
        {session ? (
          <>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#5eb8b0]">
              Payment complete
            </p>
            <h1 className="mt-3 text-3xl font-extrabold">
              Thank you for your purchase
            </h1>
            <p className="mt-3 text-sm text-[#c9cdd1]">
              Your payment has been verified. Download your preset pack below.
            </p>
            <a
              href={`/api/presets/download?session_id=${encodeURIComponent(session.id)}`}
              className="mt-6 inline-block rounded-lg bg-[#5eb8b0] px-5 py-3 text-sm font-extrabold text-[#0a0c0e] transition-colors hover:bg-[#7fcac3]"
            >
              Download preset pack
            </a>
            <EmailDownloadLink sessionId={session.id} />
          </>
        ) : (
          <>
            <p className="text-[11px] font-bold uppercase tracking-widest text-red-300">
              Payment could not be verified
            </p>
            <h1 className="mt-3 text-3xl font-extrabold">
              We could not confirm this purchase
            </h1>
            <p className="mt-3 text-sm text-[#c9cdd1]">
              Please contact support before trying again.
            </p>
          </>
        )}
        <Link
          href="/presets"
          className="mt-6 inline-block text-sm font-bold text-[#5eb8b0] hover:text-[#7fcac3] pl-4"
        >
          Return to presets
        </Link>
      </div>
    </main>
  );
}
