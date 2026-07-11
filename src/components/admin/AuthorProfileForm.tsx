"use client";

import * as React from "react";
import { useActionState } from "react";
import { ImageUp, Loader2, Plus, Save } from "@/components/ui/tabler-icons";

import { createAuthorProfileAction } from "@/app/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/types/admin";

const initialState: ActionState = {
  ok: false,
  message: "",
};

type AuthorProfileFormProps = {
  action?: (
    state: ActionState,
    formData: FormData,
  ) => Promise<ActionState>;
  initialValues?: {
    id?: string;
    name?: string;
    profileRole?: string;
    profileImageUrl?: string | null;
    email?: string;
  };
  heading?: string;
  description?: string;
  submitLabel?: string;
};

export function AuthorProfileForm({
  action: formAction = createAuthorProfileAction,
  initialValues,
  heading = "Create author profile",
  description = "Add a blog author with dashboard access. Profile image can be added later.",
  submitLabel = "Create author",
}: AuthorProfileFormProps) {
  const [state, action, pending] = useActionState(formAction, initialState);
  const [profileImageUrl, setProfileImageUrl] = React.useState(initialValues?.profileImageUrl ?? "");
  const [imageFailed, setImageFailed] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState("");
  const isEditing = Boolean(initialValues?.id);
  const avatarLetter = (initialValues?.name || initialValues?.email || "A").slice(0, 1).toUpperCase();

  async function uploadProfileImage(file?: File) {
    if (!file) {
      return;
    }

    setUploading(true);
    setUploadError("");

    const body = new FormData();
    body.append("file", file);
    body.append("folder", "author-profile");

    try {
      const response = await fetch("/api/admin/upload-thumbnail", {
        method: "POST",
        body,
      });
      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        setUploadError(result.error ?? "Upload failed.");
        return;
      }

      setProfileImageUrl(result.url);
      setImageFailed(false);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={action} className="space-y-5 rounded-lg border border-border bg-card p-5">
      {initialValues?.id ? <input type="hidden" name="id" value={initialValues.id} /> : null}

      <div>
        <h2 className="text-lg font-semibold">{heading}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-4 rounded-lg border border-border bg-background p-4 md:grid-cols-[auto_1fr] md:items-center">
        {profileImageUrl && !imageFailed ? (
          <img
            src={profileImageUrl}
            alt=""
            className="size-20 rounded-full border border-border object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="flex size-20 items-center justify-center rounded-full bg-[#c4622d]/15 text-2xl font-bold text-[#c4622d]">
            {avatarLetter}
          </span>
        )}

        <div className="space-y-3">
          <input type="hidden" name="profileImageUrl" value={profileImageUrl} />
          <label className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition-colors hover:bg-muted">
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImageUp className="size-4" />}
            Upload image
            <input type="file" accept="image/*" className="hidden" onChange={(event) => uploadProfileImage(event.target.files?.[0])} disabled={uploading} />
          </label>
          {uploadError ? <p className="text-sm text-destructive">{uploadError}</p> : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required defaultValue={initialValues?.name} placeholder="Author name" className="h-10" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profileRole">Role</Label>
          <Input id="profileRole" name="profileRole" required defaultValue={initialValues?.profileRole} placeholder="Robotics writer" className="h-10" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required defaultValue={initialValues?.email} placeholder="author@example.com" className="h-10" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{isEditing ? "New password" : "Password"}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required={!isEditing}
            placeholder={isEditing ? "Leave blank to keep current password" : "Minimum 8 characters"}
            className="h-10"
          />
        </div>
      </div>

      {state.message ? (
        <p className={state.ok ? "text-sm text-foreground" : "text-sm text-destructive"}>{state.message}</p>
      ) : null}

      <Button type="submit" disabled={pending || uploading} className="h-10">
        {pending ? <Loader2 className="size-4 animate-spin" /> : isEditing ? <Save className="size-4" /> : <Plus className="size-4" />}
        {submitLabel}
      </Button>
    </form>
  );
}
