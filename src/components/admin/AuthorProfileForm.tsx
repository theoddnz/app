"use client";

import { useActionState } from "react";
import { Loader2, Plus } from "@/components/ui/tabler-icons";

import { createAuthorProfileAction } from "@/app/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/types/admin";

const initialState: ActionState = {
  ok: false,
  message: "",
};

export function AuthorProfileForm() {
  const [state, action, pending] = useActionState(createAuthorProfileAction, initialState);

  return (
    <form action={action} className="space-y-5 rounded-lg border border-border bg-card p-5">
      <div>
        <h2 className="text-lg font-semibold">Create author profile</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a blog author with dashboard access. Profile image can be added later.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Author name" className="h-10" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profileRole">Role</Label>
          <Input id="profileRole" name="profileRole" required placeholder="Robotics writer" className="h-10" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="author@example.com" className="h-10" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required placeholder="Minimum 8 characters" className="h-10" />
        </div>
      </div>

      {state.message ? (
        <p className={state.ok ? "text-sm text-foreground" : "text-sm text-destructive"}>{state.message}</p>
      ) : null}

      <Button type="submit" disabled={pending} className="h-10">
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
        Create author
      </Button>
    </form>
  );
}
