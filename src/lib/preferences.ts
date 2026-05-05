import { getPreferenceValues } from "@raycast/api";

export type ProviderId = "raycast-ai" | "openai-compatible";
export type OutputMode = "paste" | "copy";

export type RayReadPreferences = {
  provider: ProviderId;
  outputMode: OutputMode;
  openaiBaseUrl?: string;
  openaiApiKey?: string;
  openaiModel?: string;
};

export function getRayReadPreferences(): RayReadPreferences {
  return getPreferenceValues<RayReadPreferences>();
}
