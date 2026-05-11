"use client";

import * as React from "react";
import { useActionState } from "react";
import { Bold, Eye, Heading2, ImageUp, Italic, LinkIcon, Loader2, Plus } from "lucide-react";

import { createBlogPostAction } from "@/app/admin-actions";
import { MarkdownPreview } from "@/components/blog/MarkdownPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState, LearningPath } from "@/types/admin";

const initialState: ActionState = {
  ok: false,
  message: "",
};

export function BlogForm({ paths }: { paths: Pick<LearningPath, "id" | "name">[] }) {
  const [state, action, pending] = useActionState(createBlogPostAction, initialState);
  const [content, setContent] = React.useState("");
  const [thumbnailUrl, setThumbnailUrl] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState("");
  const editorRef = React.useRef<HTMLTextAreaElement>(null);

  function insertSnippet(before: string, after = "", placeholder = "text") {
    const editor = editorRef.current;
    if (!editor) {
      setContent((value) => `${value}${before}${placeholder}${after}`);
      return;
    }

    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = content.slice(start, end) || placeholder;
    const next = `${content.slice(0, start)}${before}${selected}${after}${content.slice(end)}`;

    setContent(next);
    requestAnimationFrame(() => {
      editor.focus();
      editor.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  async function uploadImage(insertIntoContent: boolean, file?: File) {
    if (!file) {
      return;
    }

    setUploading(true);
    setUploadError("");

    const body = new FormData();
    body.append("file", file);
    body.append("folder", "blog");

    const response = await fetch("/api/admin/upload-thumbnail", {
      method: "POST",
      body,
    });

    const result = (await response.json()) as { url?: string; error?: string };

    if (!response.ok || !result.url) {
      setUploadError(result.error ?? "Upload failed.");
    } else if (insertIntoContent) {
      insertSnippet(`\n![Blog image](${result.url})\n`, "", "");
    } else {
      setThumbnailUrl(result.url);
    }

    setUploading(false);
  }

  return (
    <form action={action} className="space-y-5 rounded-lg border border-border bg-card p-5">
      <div>
        <h2 className="text-lg font-semibold">Add blog</h2>
        <p className="mt-1 text-sm text-muted-foreground">Write in MDX-style markdown, preview it, and attach it to a path.</p>
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
          <Label htmlFor="title">Blog name</Label>
          <Input id="title" name="title" required placeholder="How builders learn faster" className="h-10" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Blog slug</Label>
          <Input id="slug" name="slug" placeholder="how-builders-learn-faster" className="h-10" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Small description</Label>
        <Input id="excerpt" name="excerpt" placeholder="A short summary shown in blog cards." className="h-10" />
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-2">
          <Label htmlFor="thumbnailUrl">Blog thumbnail</Label>
          <Input
            id="thumbnailUrl"
            name="thumbnailUrl"
            value={thumbnailUrl}
            onChange={(event) => setThumbnailUrl(event.target.value)}
            placeholder="Upload or paste URL"
            className="h-10"
          />
        </div>
        <label className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition-colors hover:bg-muted">
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImageUp className="size-4" />}
          Upload cover
          <input type="file" accept="image/*" className="hidden" onChange={(event) => uploadImage(false, event.target.files?.[0])} disabled={uploading} />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label htmlFor="content">Blog content</Label>
            <div className="flex flex-wrap gap-1">
              <Button type="button" variant="outline" size="icon-sm" onClick={() => insertSnippet("## ", "", "Heading")}>
                <Heading2 className="size-4" />
              </Button>
              <Button type="button" variant="outline" size="icon-sm" onClick={() => insertSnippet("**", "**", "bold")}>
                <Bold className="size-4" />
              </Button>
              <Button type="button" variant="outline" size="icon-sm" onClick={() => insertSnippet("*", "*", "italic")}>
                <Italic className="size-4" />
              </Button>
              <Button type="button" variant="outline" size="icon-sm" onClick={() => insertSnippet("[", "](https://)", "link")}>
                <LinkIcon className="size-4" />
              </Button>
              <label className="inline-flex size-7 cursor-pointer items-center justify-center rounded-lg border border-border hover:bg-muted">
                <ImageUp className="size-4" />
                <input type="file" accept="image/*" className="hidden" onChange={(event) => uploadImage(true, event.target.files?.[0])} disabled={uploading} />
              </label>
            </div>
          </div>
          <textarea
            ref={editorRef}
            id="content"
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={18}
            placeholder={"## Start writing\n\nUse **bold**, *italic*, [links](https://...), and ![images](https://...)."}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 font-mono text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Eye className="size-4" />
            Preview
          </div>
          <div className="min-h-[468px] rounded-lg border border-border bg-background p-5">
            <MarkdownPreview content={content} />
          </div>
        </div>
      </div>

      {uploadError ? <p className="text-sm text-destructive">{uploadError}</p> : null}
      {state.message ? (
        <p className={state.ok ? "text-sm text-foreground" : "text-sm text-destructive"}>{state.message}</p>
      ) : null}

      <Button type="submit" disabled={pending || uploading || paths.length === 0} className="h-10">
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
        Create blog
      </Button>
    </form>
  );
}
