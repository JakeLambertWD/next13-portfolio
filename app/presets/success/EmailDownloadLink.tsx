"use client";

import { useState } from "react";

type Props = {
  sessionId: string;
};

export default function EmailDownloadLink({ sessionId }: Props) {
  const sentKey = `preset-email-sent:${sessionId}`;
  const [message, setMessage] = useState(
    "Need a backup link? Request it here.",
  );

  async function sendEmail() {
    if (window.sessionStorage.getItem(sentKey)) {
      setMessage("A backup download link was sent to your email.");
      return;
    }

    setMessage("Sending a backup link to your email...");

    try {
      const response = await fetch("/api/presets/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Email delivery failed.",
        );
      }

      window.sessionStorage.setItem(sentKey, "true");
      setMessage("A backup download link was sent to your email.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Email delivery failed.",
      );
    }
  }

  return (
    <div className="mt-4 text-xs text-[#8a8f94]">
      <p aria-live="polite">{message}</p>
      <button
        type="button"
        onClick={sendEmail}
        className="mt-2 font-bold text-[#5eb8b0] hover:text-[#7fcac3]"
      >
        Email me the link again
      </button>
    </div>
  );
}
