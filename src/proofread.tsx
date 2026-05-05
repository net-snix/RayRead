import { Clipboard, Toast, showHUD, showToast } from "@raycast/api";
import { getRayReadPreferences } from "./lib/preferences";
import { ProofreadError, toProofreadError } from "./lib/errors";
import { proofreadText } from "./lib/proofread";
import { readSelectedText } from "./lib/selected-text";

export default async function Command() {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Proofreading selection",
  });

  try {
    const preferences = getRayReadPreferences();
    const selectedText = await readSelectedText();
    const proofread = await proofreadText(selectedText, preferences);

    if (preferences.outputMode === "copy") {
      await Clipboard.copy(proofread);
      await showHUD("Proofread text copied");
    } else {
      await Clipboard.paste(proofread);
      await showHUD("Proofread text pasted");
    }

    toast.style = Toast.Style.Success;
    toast.title = "Proofread complete";
  } catch (error) {
    const proofreadError = toProofreadError(error);
    toast.style = Toast.Style.Failure;
    toast.title = proofreadError.title;
    toast.message = proofreadError.message;

    if (proofreadError instanceof ProofreadError) {
      await showHUD(proofreadError.title);
    }
  }
}
