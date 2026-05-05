/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** AI Provider - Choose which AI provider proofreads the selected text. */
  "provider": "raycast-ai" | "openai-compatible",
  /** Output Mode - Paste over the selected text or only copy the result. */
  "outputMode": "paste" | "copy",
  /** OpenAI-Compatible Base URL - Example: https://api.openai.com/v1 or http://127.0.0.1:8000/v1 */
  "openaiBaseUrl": string,
  /** OpenAI-Compatible API Key - Required only when using OpenAI Compatible. */
  "openaiApiKey"?: string,
  /** OpenAI-Compatible Model - Model name for the OpenAI-compatible chat completions endpoint. */
  "openaiModel": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `proofread` command */
  export type Proofread = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `proofread` command */
  export type Proofread = {}
}

