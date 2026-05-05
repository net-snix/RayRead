# RayRead

RayRead is a small Raycast extension for proofreading selected text.

Select text in any app, run `Proofread Selection` from Raycast, and RayRead will proofread the selected text with AI and paste the corrected version back into the active app.

## Features

- Proofread selected text without opening a separate editor.
- Paste the corrected result over the current selection.
- Copy the corrected result instead, if preferred.
- Use Raycast AI by default.
- Optionally use an OpenAI-compatible `/chat/completions` endpoint.

## Usage

1. Select text in any app.
2. Open Raycast.
3. Run `Proofread Selection`.
4. RayRead replaces the selected text with the corrected version.

## Preferences

- `AI Provider`: `Raycast AI` or `OpenAI Compatible`.
- `Output Mode`: paste over selection or copy to clipboard.
- `OpenAI-Compatible Base URL`: for OpenAI or local compatible servers.
- `OpenAI-Compatible API Key`: required only for the OpenAI-compatible provider.
- `OpenAI-Compatible Model`: model name for the provider.

## Development

```sh
npm install
npm run build
npm run lint
npm run dev
```

## Notes

RayRead uses Raycast's selected-text API. Some apps may block or fail selected-text access; when that happens, RayRead shows a direct error instead of silently using clipboard contents.

Raycast Store metadata validation requires the `author` field to match a real Raycast Store username. Local development and GitHub usage do not require store validation.
