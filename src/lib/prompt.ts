export function createProofreadPrompt(input: string): string {
  return [
    "Proofread the text below.",
    "Fix grammar, spelling, punctuation, clarity, and obvious typos.",
    "Preserve the writer's meaning, tone, formatting, line breaks, Markdown, and code fences.",
    "Do not explain the changes.",
    "Do not wrap the answer in quotes.",
    "Return only the corrected text.",
    "",
    "TEXT:",
    input,
  ].join("\n");
}
