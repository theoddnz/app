"use client";

import * as React from "react";
import { useActionState } from "react";
import { ImageUp, Loader2, Plus } from "lucide-react";

import { createLearningPathAction } from "@/app/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/types/admin";

const initialState: ActionState = {
  ok: false,
  message: "",
};

export function PathForm() {
  const [state, action, pending] = useActionState(createLearningPathAction, initialState);
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
        <h2 className="font-space text-lg font-semibold">Add path</h2>
        <p className="mt-1 text-sm text-muted-foreground">Create a learning path and upload its Bunny thumbnail.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required placeholder="Design Foundations" className="h-10" />
        <p className="text-xs text-muted-foreground">Slug is generated automatically from this name.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="What this path helps someone learn..."
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-2">
          <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
          <Input
            id="thumbnailUrl"
            name="thumbnailUrl"
            value={thumbnailUrl}
            onChange={(event) => setThumbnailUrl(event.target.value)}
            placeholder="Upload below or paste a URL"
            className="h-10"
          />
        </div>
        <label className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition-colors hover:bg-muted">
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImageUp className="size-4" />}
          Upload
          <input type="file" accept="image/*" className="hidden" onChange={uploadThumbnail} disabled={uploading} />
        </label>
      </div>

      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt="" className="aspect-video w-full max-w-sm rounded-lg border border-border object-cover" />
      ) : null}

      <div className="flex flex-wrap gap-4">
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" name="isLaunched" className="size-4 accent-foreground" />
          Launched
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" name="isVisible" defaultChecked className="size-4 accent-foreground" />
          Visible
        </label>
      </div>

      {uploadError ? <p className="text-sm text-destructive">{uploadError}</p> : null}
      {state.message ? (
        <p className={state.ok ? "text-sm text-foreground" : "text-sm text-destructive"}>{state.message}</p>
      ) : null}

      <Button type="submit" disabled={pending || uploading} className="h-10">
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
        Create path
      </Button>
    </form>
  );
}
