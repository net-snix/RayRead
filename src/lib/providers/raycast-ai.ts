import { AI, environment } from "@raycast/api";
import { ProofreadError } from "../errors";
import { createProofreadPrompt } from "../prompt";
import { ProofreadProvider } from "./types";

export function createRaycastAIProvider(): ProofreadProvider {
  return {
    async proofread(input) {
      if (!environment.canAccess(AI)) {
        throw new ProofreadError(
          "Raycast AI unavailable",
          "Enable Raycast AI access or switch provider in preferences.",
        );
      }

      return AI.ask(createProofreadPrompt(input));
    },
  };
}
