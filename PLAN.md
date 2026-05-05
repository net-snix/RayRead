# RayRead Proofread Extension Plan

## Goal

Create a Raycast extension command named `Proofread Selection` that lets Espen select text in any app, open Raycast, type `proofread`, and replace the selected text with an AI-proofread version.

## Product Behavior

1. User selects text in the frontmost app.
2. User opens Raycast and runs `Proofread Selection`.
3. Extension reads the selected text with Raycast's selected-text API.
4. Extension sends the text to an AI provider with a strict proofreading prompt.
5. Extension pastes the corrected text back into the frontmost app.
6. If anything fails, extension shows a clear HUD/toast with the exact next action.

## Architecture

```txt
RayRead/
  assets/
    extension-icon.png
    extension-icon.svg
  PLAN.md
  README.md
  package.json
  tsconfig.json
  src/
    proofread.tsx
    lib/
      errors.ts
      preferences.ts
      prompt.ts
      proofread.ts
      selected-text.ts
      providers/
        openai-compatible.ts
        raycast-ai.ts
        types.ts
```

## Command Design

The command is a Raycast `no-view` command:

- no React UI
- fast selected-text workflow
- loading toast while AI runs
- paste result by default
- optional copy-only output mode

## AI Provider Design

Use a small provider interface:

```ts
interface ProofreadProvider {
  proofread(input: string): Promise<string>;
}
```

Default provider:

- Raycast AI via `AI.ask`
- fail fast if Raycast AI access is unavailable

Optional provider:

- OpenAI-compatible HTTP endpoint
- supports `baseUrl`, `apiKey`, and `model` preferences
- useful for OpenAI, local gateways, or other compatible servers

## Prompt Contract

The model must:

- fix grammar, spelling, punctuation, and clarity
- preserve meaning, tone, formatting, line breaks, and Markdown/code fences
- return only the corrected text
- avoid commentary

## Failure Handling

Clear errors:

- no selected text found
- Raycast AI unavailable
- OpenAI-compatible provider missing config
- model/API error
- AI returned empty output
- paste failed

No silent clipboard fallback in the canonical path. If selection capture fails, the user gets a direct recovery message.

## Verification

Before handoff:

- `npm install`
- `npm run build`
- `npm run lint`
- inspect generated files and command manifest

Manual app test:

1. Open Notes or TextEdit.
2. Type text with typos.
3. Select it.
4. Run `Proofread Selection` in Raycast.
5. Confirm selected text is replaced by corrected text.

## References

- Raycast selected text: `getSelectedText`
- Raycast AI: `AI.ask`
- Raycast clipboard paste: `Clipboard.paste`
- Raycast command mode: `no-view`
