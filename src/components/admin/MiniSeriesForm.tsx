"use client";

import * as React from "react";
import { useActionState } from "react";
import { Loader2 } from "@/components/ui/tabler-icons";

import { createMiniSeriesAction, updateMiniSeriesAction } from "@/app/(admin)/dashboard/mini-series/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/types/admin";

const initialState: ActionState = { ok: false, message: "" };

const textareaClass =
  "w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";
const selectClass =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export type MiniSeriesDefaults = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  curriculum: string;
  priceCents: number;
  currency: string;
  lessonCountOverride: number;
  dodoProductId: string;
  thumbnailUrl: string;
  status: string;
};

export function MiniSeriesForm({
  mode,
  series,
  submitLabel,
}: {
  mode: "create" | "edit";
  series?: MiniSeriesDefaults;
  submitLabel: string;
}) {
  const action = mode === "create" ? createMiniSeriesAction : updateMiniSeriesAction;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {mode === "edit" && series ? <input type="hidden" name="id" value={series.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required defaultValue={series?.title} placeholder="ROS 2 in a weekend" className="h-10" />
        </div>
        {mode === "create" ? (
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (optional)</Label>
            <Input id="slug" name="slug" placeholder="auto from title" className="h-10" />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select id="status" name="status" defaultValue={series?.status ?? "draft"} className={selectClass}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input id="subtitle" name="subtitle" defaultValue={series?.subtitle} placeholder="One line hook" className="h-10" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="price">Price / month</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            step="0.01"
            defaultValue={series ? (series.priceCents / 100).toFixed(2) : ""}
            placeholder="9.00"
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Input id="currency" name="currency" maxLength={3} defaultValue={series?.currency ?? "usd"} className="h-10 uppercase" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lessonCount">Lessons (display)</Label>
          <Input
            id="lessonCount"
            name="lessonCount"
            type="number"
            min={0}
            step={1}
            defaultValue={series?.lessonCountOverride || ""}
            placeholder="e.g. 8"
            className="h-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dodoProductId">Dodo subscription product ID</Label>
        <Input id="dodoProductId" name="dodoProductId" defaultValue={series?.dodoProductId} placeholder="pdt_..." className="h-10" />
      </div>

      {mode === "edit" ? (
        <div className="space-y-2">
          <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
          <Input id="thumbnailUrl" name="thumbnailUrl" defaultValue={series?.thumbnailUrl} placeholder="https://..." className="h-10" />
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea id="description" name="description" rows={3} defaultValue={series?.description} placeholder="What learners get..." className={textareaClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="curriculum">Curriculum</Label>
        <textarea id="curriculum" name="curriculum" rows={5} defaultValue={series?.curriculum} placeholder={"One item per line...\nModule 1: ...\nModule 2: ..."} className={textareaClass} />
      </div>

      {state.message ? (
        <p className={state.ok ? "text-sm text-foreground" : "text-sm text-destructive"}>{state.message}</p>
      ) : null}

      <div className="flex justify-end">
        <Button type="submit" disabled={pending} className="h-10">
          {pending ? <Loader2 className="size-4 animate-spin" /> : null}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
