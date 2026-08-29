import { Resend } from "resend";
import { createPresetDownloadToken } from "./preset-download-token";

type SendPresetEmailArgs = {
  customerEmail: string;
  sessionId: string;
};

export async function sendPresetDownloadEmail({
  customerEmail,
  sessionId,
}: SendPresetEmailArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;
  const siteUrl = process.env.SITE_URL;
  const supportEmail = process.env.SUPPORT_EMAIL;

  if (!apiKey || !emailFrom || !siteUrl || !supportEmail) {
    throw new Error("Email delivery is not configured.");
  }

  const token = createPresetDownloadToken(sessionId);
  const downloadUrl = `${new URL(siteUrl).origin}/api/presets/download?token=${encodeURIComponent(token)}`;
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: emailFrom,
    to: customerEmail,
    subject: "Your Lightroom Preset Pack download",
    html: `
      <p>Thank you for purchasing Lambert's Lens Preset Pack.</p>
      <p><a href="${downloadUrl}">Download preset pack</a></p>
      <p>This link expires in 7 days. Please do not share it because it is tied to your purchase.</p>
      <p>If you need help, contact ${supportEmail}.</p>
    `,
  }, {
    idempotencyKey: `preset-download/${sessionId}`,
  });

  if (result.error) {
    throw new Error(`Resend rejected the email: ${result.error.message}`);
  }
}
