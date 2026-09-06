"use client";

import * as React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import * as tus from "tus-js-client";
import {
  ArrowRight,
  CheckCircle2,
  ImageUp,
  Loader2,
  NotebookText,
  Plus,
  Save,
  TestTube2,
  Trash2,
  Wrench,
} from "@/components/ui/tabler-icons";

import {
  addQuizAction,
  createLessonAction,
  deleteLessonAction,
  deleteProjectAction,
  deleteQuizAction,
  markLessonUploadedAction,
  moveLessonAction,
  saveNotesAction,
  saveProjectAction,
  updateLessonAction,
} from "@/app/(admin)/dashboard/mini-series/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/types/admin";

const initialState: ActionState = { ok: false, message: "" };
const textareaClass =
  "w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export type AdminQuiz = { id: string; question: string; options: string[]; answerIndex: number; hint: string; explanation: string };
export type AdminLesson = {
  id: string;
  title: string;
  description: string;
  position: number;
  bunnyVideoId: string;
  videoStatus: string;
  hasNotes: boolean;
  hasQuiz: boolean;
  hasProject: boolean;
  notes: string;
  quizzes: AdminQuiz[];
  project: { title: string; brief: string; steps: string[] } | null;
  iframeUrl: string;
};

function SubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending} className={className}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}

function Message({ state }: { state: ActionState }) {
  if (!state.message) return null;
  return <p className={state.ok ? "text-xs text-emerald-600 dark:text-emerald-400" : "text-xs text-destructive"}>{state.message}</p>;
}

// ── Video upload (TUS direct-to-Bunny) ──

function VideoUploader({ lesson, seriesId }: { lesson: AdminLesson; seriesId: string }) {
  const router = useRouter();
  const [progress, setProgress] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError("");
    setProgress(0);

    try {
      const res = await fetch("/api/admin/mini-course/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id }),
      });
      const creds = (await res.json()) as {
        videoId: string;
        libraryId: string;
        endpoint: string;
        authorizationSignature: string;
        authorizationExpire: number;
        error?: string;
      };
      if (!res.ok) throw new Error(creds.error ?? "Could not prepare upload.");

      const upload = new tus.Upload(file, {
        endpoint: creds.endpoint,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        headers: {
          AuthorizationSignature: creds.authorizationSignature,
          AuthorizationExpire: String(creds.authorizationExpire),
          LibraryId: String(creds.libraryId),
          VideoId: creds.videoId,
        },
        metadata: { filetype: file.type, title: file.name },
        onError: (err) => {
          setError(err.message || "Upload failed.");
          setProgress(null);
        },
        onProgress: (sent, total) => setProgress(Math.round((sent / total) * 100)),
        onSuccess: async () => {
          const fd = new FormData();
          fd.append("id", lesson.id);
          fd.append("seriesId", seriesId);
          await markLessonUploadedAction(fd);
          setProgress(null);
          router.refresh();
        },
      });
      upload.start();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
      setProgress(null);
    }
  }

  const uploading = progress !== null;

  return (
    <div className="space-y-2">
      {lesson.iframeUrl && lesson.videoStatus === "ready" ? (
        <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
          <iframe src={lesson.iframeUrl} title={lesson.title} loading="lazy" allowFullScreen className="size-full" />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition-colors hover:bg-muted">
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImageUp className="size-4" />}
          {lesson.bunnyVideoId ? "Replace video" : "Upload video"}
          <input type="file" accept="video/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>

        {lesson.videoStatus === "ready" ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-4" /> Ready
          </span>
        ) : lesson.bunnyVideoId ? (
          <span className="text-xs font-medium text-muted-foreground capitalize">{lesson.videoStatus}…</span>
        ) : (
          <span className="text-xs text-muted-foreground">No video yet</span>
        )}
      </div>

      {uploading ? (
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-[#c4622d] transition-all" style={{ width: `${progress}%` }} />
        </div>
      ) : null}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

// ── Resource editors ──

function NotesEditor({ lesson, seriesId }: { lesson: AdminLesson; seriesId: string }) {
  const [state, action] = useActionState(saveNotesAction, initialState);
  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="lessonId" value={lesson.id} />
      <input type="hidden" name="seriesId" value={seriesId} />
      <textarea name="content" rows={4} defaultValue={lesson.notes} placeholder="Markdown notes for this lesson…" className={textareaClass} />
      <div className="flex items-center gap-3">
        <SubmitButton>
          <Save className="size-4" /> Save notes
        </SubmitButton>
        <Message state={state} />
      </div>
    </form>
  );
}

function QuizEditor({ lesson, seriesId }: { lesson: AdminLesson; seriesId: string }) {
  const [state, action] = useActionState(addQuizAction, initialState);
  const [optionCount, setOptionCount] = React.useState(4);

  return (
    <div className="space-y-4">
      {lesson.quizzes.length > 0 ? (
        <ul className="space-y-2">
          {lesson.quizzes.map((quiz) => (
            <li key={quiz.id} className="flex items-start justify-between gap-3 rounded-lg border border-border bg-muted/40 p-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">{quiz.question}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {quiz.options.map((opt, i) => (i === quiz.answerIndex ? `✓ ${opt}` : opt)).join(" · ")}
                </p>
              </div>
              <form action={deleteQuizAction}>
                <input type="hidden" name="id" value={quiz.id} />
                <input type="hidden" name="lessonId" value={lesson.id} />
                <input type="hidden" name="seriesId" value={seriesId} />
                <Button type="submit" variant="destructive" size="icon-sm" aria-label="Delete question">
                  <Trash2 className="size-3.5" />
                </Button>
              </form>
            </li>
          ))}
        </ul>
      ) : null}

      <form action={action} className="space-y-3 rounded-lg border border-dashed border-border p-3">
        <input type="hidden" name="lessonId" value={lesson.id} />
        <input type="hidden" name="seriesId" value={seriesId} />
        <div className="space-y-2">
          <Label htmlFor={`q-${lesson.id}`}>New question</Label>
          <Input id={`q-${lesson.id}`} name="question" placeholder="What does a ROS 2 node do?" className="h-10" />
        </div>
        <div className="space-y-2">
          <Label>Options (mark the correct one)</Label>
          {Array.from({ length: optionCount }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="radio" name="answerIndex" value={i} defaultChecked={i === 0} className="size-4 accent-[#c4622d]" />
              <Input name="option" placeholder={`Option ${i + 1}`} className="h-9" />
            </div>
          ))}
          <button type="button" onClick={() => setOptionCount((c) => Math.min(c + 1, 6))} className="text-xs font-medium text-[#c4622d] hover:underline">
            + Add option
          </button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Input name="hint" placeholder="Hint (optional)" className="h-9" />
          <Input name="explanation" placeholder="Explanation (optional)" className="h-9" />
        </div>
        <div className="flex items-center gap-3">
          <SubmitButton>
            <Plus className="size-4" /> Add question
          </SubmitButton>
          <Message state={state} />
        </div>
      </form>
    </div>
  );
}

function ProjectEditor({ lesson, seriesId }: { lesson: AdminLesson; seriesId: string }) {
  const [state, action] = useActionState(saveProjectAction, initialState);
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="lessonId" value={lesson.id} />
      <input type="hidden" name="seriesId" value={seriesId} />
      <div className="space-y-2">
        <Label htmlFor={`p-title-${lesson.id}`}>Project title</Label>
        <Input id={`p-title-${lesson.id}`} name="title" defaultValue={lesson.project?.title} placeholder="Build a line follower" className="h-10" />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`p-brief-${lesson.id}`}>Brief</Label>
        <textarea id={`p-brief-${lesson.id}`} name="brief" rows={3} defaultValue={lesson.project?.brief} placeholder="What to build and why…" className={textareaClass} />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`p-steps-${lesson.id}`}>Steps (one per line)</Label>
        <textarea id={`p-steps-${lesson.id}`} name="steps" rows={4} defaultValue={lesson.project?.steps.join("\n")} placeholder={"Wire the sensor\nFlash the firmware\n…"} className={textareaClass} />
      </div>
      <div className="flex items-center gap-3">
        <SubmitButton>
          <Save className="size-4" /> Save project
        </SubmitButton>
        {lesson.project ? (
          <form action={deleteProjectAction}>
            <input type="hidden" name="lessonId" value={lesson.id} />
            <input type="hidden" name="seriesId" value={seriesId} />
            <Button type="submit" variant="outline" size="sm">
              Remove
            </Button>
          </form>
        ) : null}
        <Message state={state} />
      </div>
    </form>
  );
}

// ── Lesson card ──

const TABS = [
  { key: "notes", label: "Notes", icon: NotebookText },
  { key: "quiz", label: "Questions", icon: TestTube2 },
  { key: "project", label: "Project", icon: Wrench },
] as const;

function LessonCard({ lesson, seriesId, index, total }: { lesson: AdminLesson; seriesId: string; index: number; total: number }) {
  const [state, action] = useActionState(updateLessonAction, initialState);
  const [tab, setTab] = React.useState<(typeof TABS)[number]["key"] | null>(null);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#c4622d]/10 text-sm font-semibold text-[#c4622d]">
          {index + 1}
        </span>

        <form action={action} className="flex-1 space-y-3">
          <input type="hidden" name="id" value={lesson.id} />
          <input type="hidden" name="seriesId" value={seriesId} />
          <Input name="title" defaultValue={lesson.title} required className="h-10 font-medium" />
          <textarea name="description" rows={2} defaultValue={lesson.description} placeholder="Lesson summary…" className={textareaClass} />
          <div className="flex items-center gap-3">
            <SubmitButton>
              <Save className="size-4" /> Save
            </SubmitButton>
            <Message state={state} />
          </div>
        </form>

        <div className="flex shrink-0 flex-col items-end gap-1">
          <div className="flex gap-1">
            <form action={moveLessonAction}>
              <input type="hidden" name="id" value={lesson.id} />
              <input type="hidden" name="seriesId" value={seriesId} />
              <input type="hidden" name="direction" value="up" />
              <Button type="submit" variant="outline" size="icon-sm" aria-label="Move up" disabled={index === 0}>
                <ArrowRight className="size-3.5 -rotate-90" />
              </Button>
            </form>
            <form action={moveLessonAction}>
              <input type="hidden" name="id" value={lesson.id} />
              <input type="hidden" name="seriesId" value={seriesId} />
              <input type="hidden" name="direction" value="down" />
              <Button type="submit" variant="outline" size="icon-sm" aria-label="Move down" disabled={index === total - 1}>
                <ArrowRight className="size-3.5 rotate-90" />
              </Button>
            </form>
          </div>
          <form action={deleteLessonAction}>
            <input type="hidden" name="id" value={lesson.id} />
            <input type="hidden" name="seriesId" value={seriesId} />
            <Button type="submit" variant="destructive" size="icon-sm" aria-label="Delete lesson">
              <Trash2 className="size-3.5" />
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <VideoUploader lesson={lesson} seriesId={seriesId} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
        {TABS.map(({ key, label, icon: Icon }) => {
          const filled = key === "notes" ? lesson.hasNotes : key === "quiz" ? lesson.hasQuiz : lesson.hasProject;
          const active = tab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(active ? null : key)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                active ? "border-[#c4622d] bg-[#c4622d]/10 text-[#c4622d]" : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="size-3.5" />
              {label}
              {filled ? <CheckCircle2 className="size-3.5 text-emerald-500" /> : null}
            </button>
          );
        })}
      </div>

      {tab ? (
        <div className="mt-3 rounded-xl bg-muted/40 p-3 sm:p-4">
          {tab === "notes" ? <NotesEditor lesson={lesson} seriesId={seriesId} /> : null}
          {tab === "quiz" ? <QuizEditor lesson={lesson} seriesId={seriesId} /> : null}
          {tab === "project" ? <ProjectEditor lesson={lesson} seriesId={seriesId} /> : null}
        </div>
      ) : null}
    </div>
  );
}

function AddLessonForm({ seriesId }: { seriesId: string }) {
  const [state, action] = useActionState(createLessonAction, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-3 rounded-2xl border border-dashed border-border bg-card p-4 sm:p-5">
      <input type="hidden" name="seriesId" value={seriesId} />
      <div className="space-y-2">
        <Label htmlFor="new-lesson-title">Add a lesson</Label>
        <Input id="new-lesson-title" name="title" required placeholder="Lesson title" className="h-10" />
      </div>
      <textarea name="description" rows={2} placeholder="Optional summary…" className={textareaClass} />
      <div className="flex items-center gap-3">
        <SubmitButton>
          <Plus className="size-4" /> Add lesson
        </SubmitButton>
        <Message state={state} />
      </div>
    </form>
  );
}

export function MiniSeriesLessonsManager({ seriesId, lessons }: { seriesId: string; lessons: AdminLesson[] }) {
  return (
    <div className="space-y-4">
      {lessons.map((lesson, i) => (
        <LessonCard key={lesson.id} lesson={lesson} seriesId={seriesId} index={i} total={lessons.length} />
      ))}
      <AddLessonForm seriesId={seriesId} />
    </div>
  );
}
