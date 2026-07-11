"use client";

import * as React from "react";
import { Dialog } from "radix-ui";
import { Plus, X } from "@/components/ui/tabler-icons";

import { BlogForm } from "@/components/admin/BlogForm";
import { Button } from "@/components/ui/button";
import type { ActionState, BlogCategory, LearningPath } from "@/types/admin";

type BlogCreateDialogProps = {
  paths: Pick<LearningPath, "id" | "name">[];
  categories?: Pick<BlogCategory, "id" | "name">[];
  action?: (
    state: ActionState,
    formData: FormData,
  ) => Promise<ActionState>;
  buttonLabel?: string;
  heading?: string;
  description?: string;
  submitLabel?: string;
};

export function BlogCreateDialog({
  paths,
  categories = [],
  action,
  buttonLabel = "Add new blog",
  heading = "Add new blog",
  description = "Write the post, upload Bunny images or videos, copy returned URLs, and place them in the MDX content.",
  submitLabel = "Create blog",
}: BlogCreateDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button type="button" className="h-10">
          <Plus className="size-4" />
          {buttonLabel}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90svh] w-[min(1180px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg border border-border bg-card p-4 shadow-2xl outline-none sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-xl font-semibold">{heading}</Dialog.Title>
              <Dialog.Description className="mt-1 max-w-3xl text-sm text-muted-foreground">
                {description}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button type="button" variant="outline" size="icon-sm" aria-label="Close dialog">
                <X className="size-4" />
              </Button>
            </Dialog.Close>
          </div>

          <BlogForm
            paths={paths}
            categories={categories}
            action={action}
            heading={heading}
            description="Fill the blog details, upload media, then publish."
            submitLabel={submitLabel}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
