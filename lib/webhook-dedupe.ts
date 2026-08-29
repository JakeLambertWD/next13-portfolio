import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dedupeFilePath = path.join(
  process.cwd(),
  "data",
  "processed-sessions.json",
);

async function readProcessedSessions(): Promise<Set<string>> {
  try {
    const raw = await readFile(dedupeFilePath, "utf8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return new Set();
    }

    return new Set(
      parsed.filter((value): value is string => typeof value === "string"),
    );
  } catch {
    return new Set();
  }
}

async function writeProcessedSessions(sessions: Set<string>): Promise<void> {
  await mkdir(path.dirname(dedupeFilePath), { recursive: true });
  await writeFile(
    dedupeFilePath,
    JSON.stringify(Array.from(sessions), null, 2),
    "utf8",
  );
}

export async function hasProcessedSession(sessionId: string): Promise<boolean> {
  const sessions = await readProcessedSessions();
  return sessions.has(sessionId);
}

export async function markSessionProcessed(
  sessionId: string,
): Promise<boolean> {
  const sessions = await readProcessedSessions();

  if (sessions.has(sessionId)) {
    return false;
  }

  sessions.add(sessionId);
  await writeProcessedSessions(sessions);
  return true;
}
