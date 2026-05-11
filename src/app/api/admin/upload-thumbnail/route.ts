import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

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
    return "blog-images";
  }

  return "path-thumbnails";
}

export async function POST(request: Request) {
  await requireAdminSession();

  const zoneName = process.env.BUNNY_STORAGE_ZONE_NAME;
  const accessKey = process.env.BUNNY_STORAGE_ACCESS_KEY;

  if (!zoneName || !accessKey) {
    return NextResponse.json({ error: "Bunny Storage is not configured." }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Thumbnail file is required." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Use a JPG, PNG, WebP, or GIF image." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Thumbnail must be 4 MB or smaller." }, { status: 400 });
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "webp";
  const path = `${uploadFolder(formData.get("folder"))}/${crypto.randomUUID()}.${extension}`;
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

  return NextResponse.json({ url: publicUrlFor(path) });
}
