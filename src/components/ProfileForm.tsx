"use client";

import { useActionState } from "react";
import { Loader2, Save } from "lucide-react";

import { updateProfileAction } from "@/app/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/types/admin";

const initialState: ActionState = {
  ok: false,
  message: "",
};

export function ProfileForm({ name }: { name: string }) {
  const [state, action, pending] = useActionState(updateProfileAction, initialState);

  return (
    <form action={action} className="rounded-lg border border-border bg-card p-6">
      <div>
        <h2 className="font-space text-xl font-semibold">Profile</h2>
        <p className="mt-1 text-sm text-muted-foreground">Keep your public account details tidy.</p>
      </div>

      <div className="mt-6 space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={name} className="h-10" />
      </div>

      {state.message ? (
        <p className={state.ok ? "mt-4 text-sm text-foreground/60" : "mt-4 text-sm text-destructive"}>
          {state.message}
        </p>
      ) : null}

      <Button type="submit" className="mt-6" disabled={pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        Save profile
      </Button>
    </form>
  );
}
