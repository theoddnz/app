"use client";

import * as React from "react";
import { Check, ImageUp, Loader2, Video, Copy, LinkIcon } from "@/components/ui/tabler-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type BlogMediaUploaderProps = {
  onInsertSnippet: (snippet: string) => void;
  onSetCover: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
};

type UploadResult = {
  url?: string;
  type?: "image" | "video";
  error?: string;
};

function mdxSnippetFor(url: string, type: "image" | "video") {
  if (type === "video") {
    return `\n<video controls src="${url}" className="w-full rounded-lg" />\n`;
  }

  return `\n![Blog image](${url})\n`;
}

export function BlogMediaUploader({
  onInsertSnippet,
  onSetCover,
  onUploadingChange,
}: BlogMediaUploaderProps) {
  const [uploading, setUploading] = React.useState(false);
  const [uploadedUrl, setUploadedUrl] = React.useState("");
  const [uploadedType, setUploadedType] = React.useState<"image" | "video">("image");
  const [error, setError] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  async function uploadMedia(file?: File) {
    if (!file) {
      return;
    }

    setUploading(true);
    onUploadingChange?.(true);
    setError("");
    setCopied(false);

    const body = new FormData();
    body.append("file", file);
    body.append("folder", "blog");

    try {
      const response = await fetch("/api/admin/upload-thumbnail", {
        method: "POST",
        body,
      });
      const result = (await response.json()) as UploadResult;

      if (!response.ok || !result.url) {
        setError(result.error ?? "Upload failed.");
        return;
      }

      const type = result.type ?? (file.type.startsWith("video/") ? "video" : "image");
      setUploadedUrl(result.url);
      setUploadedType(type);
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  }

  async function copyUrl() {
    if (!uploadedUrl) {
      return;
    }

    await navigator.clipboard.writeText(uploadedUrl);
    setCopied(true);
  }

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Upload blog media</p>
          <p className="mt-1 text-xs text-muted-foreground">Images and videos upload to Bunny. Copy the URL or insert the MDX snippet.</p>
        </div>
        <label className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition-colors hover:bg-muted">
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImageUp className="size-4" />}
          Upload
          <input type="file" accept="image/*,video/*" className="hidden" onChange={(event) => uploadMedia(event.target.files?.[0])} disabled={uploading} />
        </label>
      </div>

      {uploadedUrl ? (
        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            <Input value={uploadedUrl} readOnly className="h-10 font-mono text-xs" aria-label="Uploaded Bunny URL" />
            <Button type="button" variant="outline" size="icon-lg" onClick={copyUrl} aria-label="Copy uploaded URL">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onInsertSnippet(mdxSnippetFor(uploadedUrl, uploadedType))}>
              {uploadedType === "video" ? <Video className="size-4" /> : <ImageUp className="size-4" />}
              Insert in content
            </Button>
            {uploadedType === "image" ? (
              <Button type="button" variant="outline" size="sm" onClick={() => onSetCover(uploadedUrl)}>
                <LinkIcon className="size-4" />
                Use as cover
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}

      {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
