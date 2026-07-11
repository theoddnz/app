"use client";

import { useActionState } from "react";
import { Loader2, Plus } from "@/components/ui/tabler-icons";

import { createBlogCategoryAction } from "@/app/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/types/admin";

const initialState: ActionState = {
  ok: false,
  message: "",
};

export function BlogCategoryForm() {
  const [state, action, pending] = useActionState(createBlogCategoryAction, initialState);

  return (
    <form action={action} className="space-y-5 rounded-lg border border-border bg-card p-5">
      <div>
        <h2 className="text-lg font-semibold">Create category</h2>
        <p className="mt-1 text-sm text-muted-foreground">Add categories that appear in the blog editor dropdown and public blog filters.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Category name</Label>
          <Input id="name" name="name" required placeholder="Engineering" className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" placeholder="engineering" className="h-10" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" placeholder="Optional note for admins." className="h-10" />
      </div>

      {state.message ? (
        <p className={state.ok ? "text-sm text-foreground" : "text-sm text-destructive"}>{state.message}</p>
      ) : null}

      <Button type="submit" disabled={pending} className="h-10">
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
        Add category
      </Button>
    </form>
  );
}
