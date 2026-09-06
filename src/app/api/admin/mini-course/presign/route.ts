import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getAppSession } from "@/lib/admin-auth";
import { getDb } from "@/db";
import { miniSeriesLessons } from "@/db/schema";
import {
  createBunnyTusCredentials,
  createBunnyVideo,
  isBunnyStreamConfigured,
} from "@/lib/bunny-stream";

export const runtime = "nodejs";

// Creates a Bunny Stream video for a lesson and returns short-lived TUS upload
// credentials so the browser can upload the file directly to Bunny.
export async function POST(request: Request) {
  const session = await getAppSession();

  if (!session || (session.role !== "admin" && session.role !== "author")) {
    return NextResponse.json({ error: "You must be signed in as an admin or author." }, { status: 401 });
  }

  if (!isBunnyStreamConfigured()) {
    return NextResponse.json({ error: "Bunny Stream is not configured." }, { status: 500 });
  }

  let body: { lessonId?: string };
  try {
    body = (await request.json()) as { lessonId?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const lessonId = body.lessonId?.trim();
  if (!lessonId) {
    return NextResponse.json({ error: "lessonId is required." }, { status: 400 });
  }

  const db = getDb();
  const [lesson] = await db
    .select({ id: miniSeriesLessons.id, title: miniSeriesLessons.title })
    .from(miniSeriesLessons)
    .where(eq(miniSeriesLessons.id, lessonId))
    .limit(1);

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found." }, { status: 404 });
  }

  try {
    const { videoId, libraryId } = await createBunnyVideo(lesson.title || "Untitled lesson");

    await db
      .update(miniSeriesLessons)
      .set({
        bunnyVideoId: videoId,
        bunnyLibraryId: libraryId,
        videoStatus: "uploading",
        updatedAt: new Date(),
      })
      .where(eq(miniSeriesLessons.id, lessonId));

    const creds = createBunnyTusCredentials(videoId);

    return NextResponse.json({
      videoId,
      libraryId,
      endpoint: creds.endpoint,
      authorizationSignature: creds.authorizationSignature,
      authorizationExpire: creds.authorizationExpire,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to prepare upload.";
    return NextResponse.json(
      { error: process.env.NODE_ENV === "production" ? "Failed to prepare upload." : message },
      { status: 500 },
    );
  }
}
