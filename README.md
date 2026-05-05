<p align="center">
  <img src="assets/extension-icon.png" width="128" height="128" alt="RayRead icon">
</p>

<h1 align="center">RayRead</h1>

<p align="center">
  Proofread selected text from anywhere on macOS with one Raycast command.
</p>

<p align="center">
  <img alt="Raycast Extension" src="https://img.shields.io/badge/Raycast-Extension-FF6363?style=flat-square">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square">
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-26C485?style=flat-square">
</p>

## What It Does

RayRead is a Raycast extension for fast proofreading. Select text in any app, run `Proofread Selection`, and RayRead uses AI to correct grammar, spelling, punctuation, and clarity while preserving your tone and formatting.

The default flow is intentionally simple:

```txt
select text -> run Raycast command -> corrected text is pasted back
```

## Features

- Proofread selected text without opening a separate editor.
- Paste the corrected result over the current selection.
- Copy the corrected result instead, if preferred.
- Use Raycast AI by default.
- Optionally use an OpenAI-compatible `/chat/completions` endpoint.
- Preserve meaning, tone, line breaks, Markdown, and code fences.
- Fail clearly when selected-text access is blocked by the active app.

## Usage

1. Select text in any macOS app.
2. Open Raycast.
3. Run `Proofread Selection`.
4. RayRead replaces the selected text with the corrected version.

## Preferences

| Preference                   | Values                                      | Notes                                                               |
| ---------------------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| `AI Provider`                | `Raycast AI`, `OpenAI Compatible`           | Raycast AI is the default.                                          |
| `Output Mode`                | `Paste Over Selection`, `Copy to Clipboard` | Paste is the fastest workflow.                                      |
| `OpenAI-Compatible Base URL` | URL                                         | Example: `https://api.openai.com/v1` or `http://127.0.0.1:8000/v1`. |
| `OpenAI-Compatible API Key`  | secret                                      | Required only for the OpenAI-compatible provider.                   |
| `OpenAI-Compatible Model`    | model name                                  | Example: `gpt-4.1-mini`.                                            |

## Development

```sh
npm install
npm run build
npm run lint
npm run dev
```

## Manual Test

1. Run `npm run dev`.
2. Open TextEdit, Notes, Mail, or a browser text field.
3. Type something like `this are a test with bad grammer`.
4. Select the text.
5. Run `Proofread Selection` in Raycast.
6. Confirm the selected text is replaced with corrected text.

## Project Layout

```txt
src/
  proofread.tsx
  lib/
    prompt.ts
    proofread.ts
    selected-text.ts
    providers/
      raycast-ai.ts
      openai-compatible.ts
```

## Notes

RayRead uses Raycast's selected-text API. Some apps may block or fail selected-text access; when that happens, RayRead shows a direct error instead of silently using clipboard contents.

Raycast Store metadata validation requires the `author` field to match a real Raycast Store username. Local development and GitHub usage do not require store validation.

## License

MIT
