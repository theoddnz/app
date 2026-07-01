"use client";

import { useActionState } from "react";
import { Loader2, Plus, Save } from "@/components/ui/tabler-icons";

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
  const isEditing = Boolean(initialValues?.id);

  return (
    <form action={action} className="space-y-5 rounded-lg border border-border bg-card p-5">
      {initialValues?.id ? <input type="hidden" name="id" value={initialValues.id} /> : null}

      <div>
        <h2 className="text-lg font-semibold">{heading}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
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

      <Button type="submit" disabled={pending} className="h-10">
        {pending ? <Loader2 className="size-4 animate-spin" /> : isEditing ? <Save className="size-4" /> : <Plus className="size-4" />}
        {submitLabel}
      </Button>
    </form>
  );
}
