import { getSelectedText } from "@raycast/api";
import { ProofreadError } from "./errors";

export async function readSelectedText(): Promise<string> {
  try {
    const selectedText = await getSelectedText();
    const trimmed = selectedText.trim();

    if (!trimmed) {
      throw new ProofreadError(
        "No selected text",
        "Select text in the frontmost app and run Proofread again.",
      );
    }

    return selectedText;
  } catch (error) {
    if (error instanceof ProofreadError) {
      throw error;
    }

    throw new ProofreadError(
      "Could not read selection",
      "Select text in the frontmost app and run Proofread again.",
    );
  }
}
