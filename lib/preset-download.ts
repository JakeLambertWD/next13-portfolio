import path from "node:path";

const configuredPath = process.env.PRESET_DOWNLOAD_PATH;

export const presetDownloadPath = path.resolve(
  process.cwd(),
  configuredPath ?? "downloads/Lamberts Lens Preset Pack.zip",
);
