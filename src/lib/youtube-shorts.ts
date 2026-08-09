/**
 * Dynamically fetches the latest YouTube Shorts for the channel using the
 * YouTube Data API v3.
 *
 * Requires the following environment variable:
 *   YOUTUBE_API_KEY - a YouTube Data API v3 key with read access.
 *
 * If the key is missing or any request fails, an empty list is returned so the
 * UI can gracefully render nothing instead of crashing.
 */

const CHANNEL_HANDLE = "TheOddOneshub";
const API_BASE = "https://www.googleapis.com/youtube/v3";

// Shorts are vertical videos up to ~3 minutes long. We use duration as the
// primary heuristic for detecting them.
const MAX_SHORT_SECONDS = 180;

// Cache the result for an hour so we are not hitting the API on every request.
const REVALIDATE_SECONDS = 60 * 60;

export interface YouTubeShort {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

interface ChannelsResponse {
  items?: Array<{
    contentDetails?: { relatedPlaylists?: { uploads?: string } };
  }>;
}

interface PlaylistItemsResponse {
  nextPageToken?: string;
  items?: Array<{
    contentDetails?: { videoId?: string };
  }>;
}

interface VideosResponse {
  items?: Array<{
    id: string;
    snippet?: {
      title?: string;
      publishedAt?: string;
      thumbnails?: Record<string, { url?: string } | undefined>;
    };
    contentDetails?: { duration?: string };
  }>;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Parses an ISO 8601 duration (e.g. "PT1M30S") into total seconds. */
function parseDurationSeconds(iso: string | undefined): number {
  if (!iso) return Number.MAX_SAFE_INTEGER;
  const match = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso);
  if (!match) return Number.MAX_SAFE_INTEGER;
  const [, h, m, s] = match;
  return Number(h ?? 0) * 3600 + Number(m ?? 0) * 60 + Number(s ?? 0);
}

/**
 * Confirms a video is a real Short. A Short resolves at /shorts/{id} with a
 * 200, while a regular video redirects to /watch. This filters out long-form
 * uploads that merely happen to be short in duration.
 */
async function verifyIsShort(videoId: string): Promise<boolean> {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
      method: "HEAD",
      redirect: "manual",
      next: { revalidate: REVALIDATE_SECONDS },
    });
    // 200 => genuine Short; 3xx (redirect to /watch) => long-form video.
    return res.status >= 200 && res.status < 300;
  } catch {
    return false;
  }
}

async function getUploadsPlaylistId(apiKey: string): Promise<string | null> {
  const url = `${API_BASE}/channels?part=contentDetails&forHandle=${encodeURIComponent(
    CHANNEL_HANDLE,
  )}&key=${apiKey}`;
  const data = await fetchJson<ChannelsResponse>(url);
  return data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
}

async function getUploadVideoIds(
  apiKey: string,
  playlistId: string,
  max = 100,
): Promise<string[]> {
  const ids: string[] = [];
  let pageToken: string | undefined;

  do {
    const url =
      `${API_BASE}/playlistItems?part=contentDetails&maxResults=50` +
      `&playlistId=${playlistId}&key=${apiKey}` +
      (pageToken ? `&pageToken=${pageToken}` : "");
    const data = await fetchJson<PlaylistItemsResponse>(url);
    if (!data?.items) break;

    for (const item of data.items) {
      const id = item.contentDetails?.videoId;
      if (id) ids.push(id);
    }
    pageToken = data.nextPageToken;
  } while (pageToken && ids.length < max);

  return ids.slice(0, max);
}

async function getShortsFromVideoIds(
  apiKey: string,
  videoIds: string[],
): Promise<YouTubeShort[]> {
  const candidates: YouTubeShort[] = [];

  // The videos endpoint accepts up to 50 ids per call.
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const url = `${API_BASE}/videos?part=snippet,contentDetails&id=${batch.join(
      ",",
    )}&key=${apiKey}`;
    const data = await fetchJson<VideosResponse>(url);
    if (!data?.items) continue;

    for (const video of data.items) {
      // Duration is a cheap pre-filter; genuine Shorts are always short.
      const seconds = parseDurationSeconds(video.contentDetails?.duration);
      if (seconds > MAX_SHORT_SECONDS) continue;

      const thumbnails = video.snippet?.thumbnails ?? {};
      const thumbnail =
        thumbnails.maxres?.url ??
        thumbnails.standard?.url ??
        thumbnails.high?.url ??
        thumbnails.medium?.url ??
        thumbnails.default?.url ??
        "";

      candidates.push({
        id: video.id,
        title: video.snippet?.title ?? "",
        thumbnail,
        publishedAt: video.snippet?.publishedAt ?? "",
        url: `https://www.youtube.com/shorts/${video.id}`,
      });
    }
  }

  // Verify each candidate is an actual Short, dropping long-form videos.
  const verifications = await Promise.all(
    candidates.map((c) => verifyIsShort(c.id)),
  );
  return candidates.filter((_, index) => verifications[index]);
}

/**
 * Returns the channel's Shorts, newest first. Returns an empty array when the
 * API key is not configured or any request fails.
 */
export async function getChannelShorts(): Promise<YouTubeShort[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return [];

  const uploadsPlaylistId = await getUploadsPlaylistId(apiKey);
  if (!uploadsPlaylistId) return [];

  const videoIds = await getUploadVideoIds(apiKey, uploadsPlaylistId);
  if (videoIds.length === 0) return [];

  const shorts = await getShortsFromVideoIds(apiKey, videoIds);

  return shorts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
