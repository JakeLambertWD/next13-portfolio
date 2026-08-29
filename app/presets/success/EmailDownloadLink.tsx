"use client";

import { useEffect, useState } from "react";

type Props = {
  sessionId: string;
};

export default function EmailDownloadLink({ sessionId }: Props) {
  const [message, setMessage] = useState(
    "Sending your download link to your email...",
  );

  async function sendEmail(delivery: "initial" | "backup") {
    setMessage(
      delivery === "initial"
        ? "Sending your download link to your email..."
        : "Sending a backup link to your email...",
    );

    try {
      const response = await fetch("/api/presets/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, delivery }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const requestId =
          typeof data.requestId === "string"
            ? ` Reference: ${data.requestId}`
            : "";
        throw new Error(
          typeof data.error === "string"
            ? `${data.error}${requestId}`
            : "Email delivery failed.",
        );
      }

      setMessage("A backup download link was sent to your email.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Email delivery failed.",
      );
    }
  }

  useEffect(() => {
    void sendEmail("initial");
  }, []);

  return (
    <div className="mt-4 text-xs text-[#8a8f94]">
      <p aria-live="polite">{message}</p>
      <button
        type="button"
        onClick={() => void sendEmail("backup")}
        className="mt-2 font-bold text-[#5eb8b0] hover:text-[#7fcac3]"
      >
        Email me the link again
      </button>
    </div>
  );
}
