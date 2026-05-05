import { ProofreadError } from "./errors";
import { RayReadPreferences } from "./preferences";
import { createOpenAICompatibleProvider } from "./providers/openai-compatible";
import { createRaycastAIProvider } from "./providers/raycast-ai";
import { ProofreadProvider } from "./providers/types";

export async function proofreadText(
  input: string,
  preferences: RayReadPreferences,
): Promise<string> {
  const provider = createProvider(preferences);
  const output = (await provider.proofread(input)).trim();

  if (!output) {
    throw new ProofreadError(
      "Empty AI response",
      "The model returned no corrected text.",
    );
  }

  return output;
}

function createProvider(preferences: RayReadPreferences): ProofreadProvider {
  switch (preferences.provider) {
    case "raycast-ai":
      return createRaycastAIProvider();
    case "openai-compatible":
      return createOpenAICompatibleProvider(preferences);
  }
}
