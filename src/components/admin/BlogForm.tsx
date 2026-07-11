"use client";

import * as React from "react";
import { useActionState } from "react";
import { Bold, Eye, Heading2, ImageUp, Italic, LinkIcon, Loader2, Plus, Save } from "@/components/ui/tabler-icons";

import { createBlogPostAction } from "@/app/admin-actions";
import { BlogMediaUploader } from "@/components/admin/BlogMediaUploader";
import { MarkdownPreview } from "@/components/blog/MarkdownPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState, BlogCategory, LearningPath } from "@/types/admin";

const initialState: ActionState = {
  ok: false,
  message: "",
};

type BlogFormProps = {
  paths: Pick<LearningPath, "id" | "name">[];
  categories?: Pick<BlogCategory, "id" | "name">[];
  action?: (
    state: ActionState,
    formData: FormData,
  ) => Promise<ActionState>;
  initialValues?: {
    id?: string;
    pathId?: string;
    categoryId?: string | null;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    thumbnailUrl?: string;
  };
  heading?: string;
  description?: string;
  submitLabel?: string;
};

export function BlogForm({
  paths,
  categories = [],
  action: createAction = createBlogPostAction,
  initialValues,
  heading = "Add blog",
  description = "Write in MDX-style markdown, preview it, and attach it to a path.",
  submitLabel = "Create blog",
}: BlogFormProps) {
  const [state, action, pending] = useActionState(createAction, initialState);
  const [content, setContent] = React.useState(initialValues?.content ?? "");
  const [thumbnailUrl, setThumbnailUrl] = React.useState(initialValues?.thumbnailUrl ?? "");
  const [uploading, setUploading] = React.useState(false);
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

  function insertRawSnippet(snippet: string) {
    const editor = editorRef.current;
    if (!editor) {
      setContent((value) => `${value}${snippet}`);
      return;
    }

    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const next = `${content.slice(0, start)}${snippet}${content.slice(end)}`;

    setContent(next);
    requestAnimationFrame(() => {
      editor.focus();
      editor.setSelectionRange(start + snippet.length, start + snippet.length);
    });
  }

  return (
    <form action={action} className="space-y-5 rounded-lg border border-border bg-card p-5">
      {initialValues?.id ? <input type="hidden" name="id" value={initialValues.id} /> : null}

      <div>
        <h2 className="text-lg font-semibold">{heading}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
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
            defaultValue={initialValues?.pathId ?? ""}
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
          <Label htmlFor="categoryId">Category</Label>
          <select
            id="categoryId"
            name="categoryId"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            defaultValue={initialValues?.categoryId ?? ""}
          >
            <option value="">No category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Blog name</Label>
          <Input id="title" name="title" required defaultValue={initialValues?.title} placeholder="How builders learn faster" className="h-10" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Blog slug</Label>
          <Input id="slug" name="slug" defaultValue={initialValues?.slug} placeholder="how-builders-learn-faster" className="h-10" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Small description</Label>
        <Input id="excerpt" name="excerpt" defaultValue={initialValues?.excerpt} placeholder="A short summary shown in blog cards." className="h-10" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnailUrl">Blog thumbnail</Label>
        <Input
          id="thumbnailUrl"
          name="thumbnailUrl"
          value={thumbnailUrl}
          onChange={(event) => setThumbnailUrl(event.target.value)}
          placeholder="Upload media below or paste a cover URL"
          className="h-10"
        />
      </div>

      <BlogMediaUploader onInsertSnippet={insertRawSnippet} onSetCover={setThumbnailUrl} onUploadingChange={setUploading} />

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
              <Button type="button" variant="outline" size="icon-sm" onClick={() => insertRawSnippet("\n![Blog image](https://)\n")} aria-label="Insert image markdown">
                <ImageUp className="size-4" />
              </Button>
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

      {state.message ? (
        <p className={state.ok ? "text-sm text-foreground" : "text-sm text-destructive"}>{state.message}</p>
      ) : null}

      <Button type="submit" disabled={pending || uploading || paths.length === 0} className="h-10">
        {pending ? <Loader2 className="size-4 animate-spin" /> : initialValues?.id ? <Save className="size-4" /> : <Plus className="size-4" />}
        {submitLabel}
      </Button>
    </form>
  );
}
