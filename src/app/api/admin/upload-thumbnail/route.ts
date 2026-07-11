import { NextResponse } from "next/server";

import { getAppSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const ALLOWED_VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);

function bunnyStorageHost() {
  const region = process.env.BUNNY_STORAGE_REGION?.trim();
  return region ? `${region}.storage.bunnycdn.com` : "storage.bunnycdn.com";
}

function publicUrlFor(path: string) {
  const pullZoneUrl = process.env.BUNNY_PULL_ZONE_URL?.replace(/\/$/, "");

  if (!pullZoneUrl) {
    throw new Error("BUNNY_PULL_ZONE_URL is required.");
  }

  return `${pullZoneUrl}/${path}`;
}

function uploadFolder(value: FormDataEntryValue | null) {
  if (value === "lesson") {
    return "lesson-thumbnails";
  }

  if (value === "blog") {
    return "blog-media";
  }

  if (value === "author-profile") {
    return "author-profiles";
  }

  return "path-thumbnails";
}

export async function POST(request: Request) {
  const session = await getAppSession();

  if (!session || (session.role !== "admin" && session.role !== "author")) {
    return NextResponse.json({ error: "You must be signed in as an admin or author." }, { status: 401 });
  }

  const zoneName = process.env.BUNNY_STORAGE_ZONE_NAME;
  const accessKey = process.env.BUNNY_STORAGE_ACCESS_KEY;

  if (!zoneName || !accessKey) {
    return NextResponse.json({ error: "Bunny Storage is not configured." }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "A media file is required." }, { status: 400 });
  }

  const folder = formData.get("folder");
  const isImage = ALLOWED_IMAGE_TYPES.has(file.type);
  const isVideo = folder === "blog" && ALLOWED_VIDEO_TYPES.has(file.type);

  if (!isImage && !isVideo) {
    return NextResponse.json({ error: "Use a JPG, PNG, WebP, GIF, MP4, WebM, or MOV file." }, { status: 400 });
  }

  if (isImage && file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: "Images must be 8 MB or smaller." }, { status: 400 });
  }

  if (isVideo && file.size > MAX_VIDEO_SIZE) {
    return NextResponse.json({ error: "Videos must be 100 MB or smaller." }, { status: 400 });
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "webp";
  const path = `${uploadFolder(folder)}/${crypto.randomUUID()}.${extension}`;
  const uploadUrl = `https://${bunnyStorageHost()}/${zoneName}/${path}`;
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      AccessKey: accessKey,
      "Content-Type": "application/octet-stream",
    },
    body: Buffer.from(await file.arrayBuffer()),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    const message = `Bunny upload failed with ${response.status} ${response.statusText}.`;

    console.error(message, {
      details,
      host: bunnyStorageHost(),
      zoneName,
      path,
    });

    return NextResponse.json(
      {
        error: process.env.NODE_ENV === "production" ? "Bunny upload failed." : message,
        details: process.env.NODE_ENV === "production" ? undefined : details,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ url: publicUrlFor(path), type: isVideo ? "video" : "image" });
}
