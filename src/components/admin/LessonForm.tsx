"use client";

import * as React from "react";
import { useActionState } from "react";
import { ImageUp, Loader2, Plus } from "@/components/ui/huge-icons";

import { createLessonAction } from "@/app/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState, LearningPath } from "@/types/admin";

const initialState: ActionState = {
  ok: false,
  message: "",
};

export function LessonForm({ paths }: { paths: Pick<LearningPath, "id" | "name">[] }) {
  const [state, action, pending] = useActionState(createLessonAction, initialState);
  const [thumbnailUrl, setThumbnailUrl] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState("");

  async function uploadThumbnail(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setUploadError("");

    const body = new FormData();
    body.append("file", file);
    body.append("folder", "lesson");

    const response = await fetch("/api/admin/upload-thumbnail", {
      method: "POST",
      body,
    });

    const result = (await response.json()) as { url?: string; error?: string };

    if (!response.ok || !result.url) {
      setUploadError(result.error ?? "Upload failed.");
    } else {
      setThumbnailUrl(result.url);
    }

    setUploading(false);
  }

  return (
    <form action={action} className="space-y-5 rounded-lg border border-border bg-card p-5">
      <div>
        <h2 className="font-space text-lg font-semibold">Add lesson</h2>
        <p className="mt-1 text-sm text-muted-foreground">Attach a lesson to a path. Store Bunny video and thumbnail URLs here.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="pathId">Path</Label>
          <select
            id="pathId"
            name="pathId"
            required
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            disabled={paths.length === 0}
          >
            <option value="">Choose path</option>
            {paths.map((path) => (
              <option key={path.id} value={path.id}>
                {path.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Lesson name</Label>
          <Input id="name" name="name" required placeholder="Lesson 1: Basics" className="h-10" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="durationMinutes">Duration minutes</Label>
          <Input id="durationMinutes" name="durationMinutes" type="number" min={0} step={1} placeholder="12" className="h-10" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Short lesson summary..."
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="videoUrl">Video URL</Label>
          <Input id="videoUrl" name="videoUrl" type="url" placeholder="https://..." className="h-10" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnailUrl">Lesson thumbnail URL</Label>
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <Input
              id="thumbnailUrl"
              name="thumbnailUrl"
              value={thumbnailUrl}
              onChange={(event) => setThumbnailUrl(event.target.value)}
              placeholder="Upload or paste URL"
              className="h-10"
            />
            <label className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition-colors hover:bg-muted">
              {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImageUp className="size-4" />}
              Upload
              <input type="file" accept="image/*" className="hidden" onChange={uploadThumbnail} disabled={uploading} />
            </label>
          </div>
        </div>
      </div>

      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt="" className="aspect-video w-full max-w-sm rounded-lg border border-border object-cover" />
      ) : null}

      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" name="isHold" className="size-4 accent-foreground" />
        Hold / waiting
      </label>

      {uploadError ? <p className="text-sm text-destructive">{uploadError}</p> : null}
      {state.message ? (
        <p className={state.ok ? "text-sm text-foreground" : "text-sm text-destructive"}>{state.message}</p>
      ) : null}

      <Button type="submit" disabled={pending || uploading || paths.length === 0} className="h-10">
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
        Create lesson
      </Button>
    </form>
  );
}
