import { ProofreadError } from "../errors";
import { RayReadPreferences } from "../preferences";
import { createProofreadPrompt } from "../prompt";
import { ProofreadProvider } from "./types";

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  error?: {
    message?: string;
  };
};

export function createOpenAICompatibleProvider(
  preferences: RayReadPreferences,
): ProofreadProvider {
  const baseUrl = normalizeBaseUrl(preferences.openaiBaseUrl);
  const apiKey = preferences.openaiApiKey?.trim();
  const model = preferences.openaiModel?.trim();

  if (!baseUrl) {
    throw new ProofreadError(
      "Missing base URL",
      "Set OpenAI-Compatible Base URL in extension preferences.",
    );
  }

  if (!apiKey) {
    throw new ProofreadError(
      "Missing API key",
      "Set OpenAI-Compatible API Key in extension preferences.",
    );
  }

  if (!model) {
    throw new ProofreadError(
      "Missing model",
      "Set OpenAI-Compatible Model in extension preferences.",
    );
  }

  return {
    async proofread(input) {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0,
          messages: [
            {
              role: "user",
              content: createProofreadPrompt(input),
            },
          ],
        }),
      });

      const body = (await response
        .json()
        .catch(() => ({}))) as ChatCompletionResponse;

      if (!response.ok) {
        throw new ProofreadError(
          "AI request failed",
          body.error?.message ?? `HTTP ${response.status}`,
        );
      }

      const content = body.choices?.[0]?.message?.content;

      if (!content) {
        throw new ProofreadError(
          "Empty AI response",
          "The provider returned no message content.",
        );
      }

      return content;
    },
  };
}

function normalizeBaseUrl(baseUrl?: string): string | undefined {
  const trimmed = baseUrl?.trim().replace(/\/+$/, "");
  return trimmed || undefined;
}
