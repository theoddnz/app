"use client";

import * as React from "react";
import { Dialog } from "radix-ui";
import { Plus, X } from "@/components/ui/tabler-icons";

import { PathForm } from "@/components/admin/PathForm";
import { Button } from "@/components/ui/button";

export function PathCreateDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button type="button" className="h-10">
          <Plus className="size-4" />
          Add path
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90svh] w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl border border-border bg-card p-4 shadow-2xl outline-none sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-xl font-semibold">Create path</Dialog.Title>
              <Dialog.Description className="mt-1 max-w-md text-sm text-muted-foreground">
                Add a learning path. The slug is generated automatically from the name.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button type="button" variant="outline" size="icon-sm" aria-label="Close dialog">
                <X className="size-4" />
              </Button>
            </Dialog.Close>
          </div>

          <PathForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
