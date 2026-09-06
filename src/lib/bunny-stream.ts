import "server-only";

import { createHash } from "node:crypto";

// Bunny Stream — server-side video management + presigned (TUS) uploads.
// The API key never leaves the server; the browser receives only a short-lived
// signature so it can upload the file bytes directly to Bunny.

const STREAM_API_BASE = "https://video.bunnycdn.com";
const TUS_ENDPOINT = "https://video.bunnycdn.com/tusupload";

type BunnyStreamConfig = {
  libraryId: string;
  apiKey: string;
  cdnHostname: string;
};

function getConfig(): BunnyStreamConfig {
  const libraryId = process.env.BUNNY_STREAM_LIBRARY_ID?.trim();
  const apiKey = process.env.BUNNY_STREAM_API_KEY?.trim();
  const cdnHostname = (process.env.BUNNY_STREAM_CDN_HOSTNAME ?? "")
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  if (!libraryId || !apiKey) {
    throw new Error("BUNNY_STREAM_LIBRARY_ID and BUNNY_STREAM_API_KEY are required.");
  }

  return { libraryId, apiKey, cdnHostname };
}

export function isBunnyStreamConfigured(): boolean {
  return Boolean(process.env.BUNNY_STREAM_LIBRARY_ID && process.env.BUNNY_STREAM_API_KEY);
}

/** Creates an empty video entry and returns its guid, ready to receive an upload. */
export async function createBunnyVideo(title: string): Promise<{ videoId: string; libraryId: string }> {
  const { libraryId, apiKey } = getConfig();

  const res = await fetch(`${STREAM_API_BASE}/library/${libraryId}/videos`, {
    method: "POST",
    headers: {
      AccessKey: apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error(`Bunny createVideo failed (${res.status}).`);
  }

  const data = (await res.json()) as { guid?: string };
  if (!data.guid) {
    throw new Error("Bunny createVideo returned no guid.");
  }

  return { videoId: data.guid, libraryId };
}

export type BunnyTusCredentials = {
  endpoint: string;
  libraryId: string;
  videoId: string;
  authorizationSignature: string;
  // Unix time in milliseconds after which the signature is no longer valid.
  authorizationExpire: number;
};

/**
 * Generates the presigned headers a browser TUS client needs to upload directly
 * to Bunny. Signature = sha256(libraryId + apiKey + expiration + videoId).
 */
export function createBunnyTusCredentials(videoId: string, ttlSeconds = 60 * 60): BunnyTusCredentials {
  const { libraryId, apiKey } = getConfig();
  const authorizationExpire = Date.now() + ttlSeconds * 1000;
  const authorizationSignature = createHash("sha256")
    .update(`${libraryId}${apiKey}${authorizationExpire}${videoId}`)
    .digest("hex");

  return {
    endpoint: TUS_ENDPOINT,
    libraryId,
    videoId,
    authorizationSignature,
    authorizationExpire,
  };
}

export type BunnyPlayback = {
  iframe: string;
  hls: string;
  thumbnail: string;
};

export function getBunnyPlayback(videoId: string, libraryIdOverride?: string): BunnyPlayback {
  const { libraryId, cdnHostname } = getConfig();
  const lib = libraryIdOverride?.trim() || libraryId;

  return {
    iframe: `https://iframe.mediadelivery.net/embed/${lib}/${videoId}`,
    hls: cdnHostname ? `https://${cdnHostname}/${videoId}/playlist.m3u8` : "",
    thumbnail: cdnHostname ? `https://${cdnHostname}/${videoId}/thumbnail.jpg` : "",
  };
}

/** Fetches a video's current transcoding status + duration from Bunny. */
export async function getBunnyVideo(videoId: string): Promise<{ status: number; length: number } | null> {
  const { libraryId, apiKey } = getConfig();

  const res = await fetch(`${STREAM_API_BASE}/library/${libraryId}/videos/${videoId}`, {
    headers: { AccessKey: apiKey, Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { status?: number; length?: number };
  return { status: data.status ?? 0, length: data.length ?? 0 };
}

export async function deleteBunnyVideo(videoId: string): Promise<void> {
  const { libraryId, apiKey } = getConfig();

  await fetch(`${STREAM_API_BASE}/library/${libraryId}/videos/${videoId}`, {
    method: "DELETE",
    headers: { AccessKey: apiKey, Accept: "application/json" },
  });
}
