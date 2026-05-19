"use server";

import { eq, like } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getDb } from "@/db";
import { blogPosts, learningPaths, lessons, userPathSelections, users } from "@/db/schema";
import { clearAppSession, createAppSession, getAppSession, requireAdminSession, requireStudentSession } from "@/lib/admin-auth";
import { hashPassword, verifyPassword } from "@/lib/password";
import type { ActionState } from "@/types/admin";

const initialState: ActionState = {
  ok: false,
  message: "",
};

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 180);
}

async function uniquePathSlug(name: string) {
  const baseSlug = slugify(name);

  if (!baseSlug) {
    return "";
  }

  const existingRows = await getDb()
    .select({ slug: learningPaths.slug })
    .from(learningPaths)
    .where(like(learningPaths.slug, `${baseSlug}%`));

  return nextAvailableSlug(baseSlug, existingRows.map((row) => row.slug));
}

async function uniqueBlogSlug(input: string) {
  const baseSlug = slugify(input);

  if (!baseSlug) {
    return "";
  }

  const existingRows = await getDb()
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(like(blogPosts.slug, `${baseSlug}%`));

  return nextAvailableSlug(baseSlug, existingRows.map((row) => row.slug));
}

function nextAvailableSlug(baseSlug: string, existing: string[]) {
  const existingSlugs = new Set(existing);
  if (!existingSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let suffix = 2;
  while (existingSlugs.has(`${baseSlug}-${suffix}`)) {
    suffix += 1;
  }

  return `${baseSlug}-${suffix}`;
}

export async function loginAction(state: ActionState = initialState, formData: FormData) {
  void state;

  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");

  if (!email || !password) {
    return { ok: false, message: "Email and password are required." };
  }

  const user = await getDb().query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user || !user.passwordHash || !(await verifyPassword(password, user.passwordHash))) {
    return { ok: false, message: "Invalid email or password." };
  }

  await createAppSession({ id: user.id, email: user.email, role: user.role === "admin" ? "admin" : "student" });

  if (user.role === "admin") {
    redirect("/dashboard");
  }

  const selection = await getDb().query.userPathSelections.findFirst({
    where: eq(userPathSelections.userId, user.id),
  });

  redirect(selection ? "/my-learning" : "/learn");
}

export async function signupAction(state: ActionState = initialState, formData: FormData) {
  void state;

  const name = value(formData, "name");
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");

  if (!name || !email || password.length < 8) {
    return { ok: false, message: "Name, email, and an 8 character password are required." };
  }

  try {
    const [user] = await getDb()
      .insert(users)
      .values({
        name,
        email,
        passwordHash: await hashPassword(password),
        role: "student",
      })
      .returning();

    await createAppSession({ id: user.id, email: user.email, role: "student" });
  } catch (error) {
    const message = error instanceof Error && error.message.includes("duplicate")
      ? "An account with that email already exists."
      : "Could not create your account.";

    return { ok: false, message };
  }

  redirect("/learn");
}

export async function logoutAction() {
  await clearAppSession();
  redirect("/users/login");
}

export async function updateProfileAction(state: ActionState = initialState, formData: FormData) {
  void state;

  const session = await getAppSession();

  if (!session) {
    redirect("/users/login");
  }

  const name = value(formData, "name");

  if (!name || name.length < 2) {
    return { ok: false, message: "Name must be at least 2 characters." };
  }

  await getDb()
    .update(users)
    .set({
      name,
      updatedAt: new Date(),
    })
    .where(eq(users.id, session.userId));

  revalidatePath("/settings");
  revalidatePath("/my-learning");
  return { ok: true, message: "Profile updated." };
}

export async function selectLearningPathAction(formData: FormData) {
  const session = await getAppSession();

  if (!session) {
    redirect("/users/signup");
  }

  if (session.role === "admin") {
    redirect("/dashboard");
  }

  const pathId = value(formData, "pathId");

  if (!pathId) {
    redirect("/learn");
  }

  const path = await getDb().query.learningPaths.findFirst({
    where: eq(learningPaths.id, pathId),
  });

  if (!path || !path.isVisible) {
    redirect("/learn");
  }

  await getDb()
    .insert(userPathSelections)
    .values({
      userId: session.userId,
      pathId: path.id,
    })
    .onConflictDoUpdate({
      target: userPathSelections.userId,
      set: {
        pathId: path.id,
        updatedAt: new Date(),
      },
    });

  revalidatePath("/my-learning");
  revalidatePath(`/learn/${path.slug}`);
  redirect("/my-learning");
}

export async function switchLearningPathAction(formData: FormData) {
  await requireStudentSession();
  await selectLearningPathAction(formData);
}

export async function createLearningPathAction(
  state: ActionState = initialState,
  formData: FormData,
) {
  void state;
  await requireAdminSession();

  const name = value(formData, "name");
  const description = value(formData, "description");
  const thumbnailUrl = value(formData, "thumbnailUrl");
  const slug = await uniquePathSlug(name);
  const isLaunched = formData.get("isLaunched") === "on";
  const isVisible = formData.get("isVisible") === "on";

  if (!name || !slug) {
    return { ok: false, message: "Name is required." };
  }

  try {
    await getDb().insert(learningPaths).values({
      name,
      slug,
      description,
      thumbnailUrl,
      isLaunched,
      isVisible,
    });
  } catch (error) {
    const message = error instanceof Error && error.message.includes("duplicate")
      ? "That slug already exists. Use a different path name or slug."
      : "Could not create the path.";

    return { ok: false, message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/paths");
  return { ok: true, message: "Path created." };
}

export async function updateLearningPathStatusAction(formData: FormData) {
  await requireAdminSession();

  const id = value(formData, "id");

  if (!id) {
    return;
  }

  await getDb()
    .update(learningPaths)
    .set({
      isLaunched: formData.get("isLaunched") === "on",
      isVisible: formData.get("isVisible") === "on",
      updatedAt: new Date(),
    })
    .where(eq(learningPaths.id, id));

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/paths");
}

export async function deleteLearningPathAction(formData: FormData) {
  await requireAdminSession();

  const id = value(formData, "id");

  if (!id) {
    return;
  }

  await getDb().delete(learningPaths).where(eq(learningPaths.id, id));
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/paths");
  revalidatePath("/dashboard/lessons");
}

export async function createLessonAction(
  state: ActionState = initialState,
  formData: FormData,
) {
  void state;
  await requireAdminSession();

  const pathId = value(formData, "pathId");
  const name = value(formData, "name");
  const durationMinutes = Number(value(formData, "durationMinutes") || "0");
  const description = value(formData, "description");
  const thumbnailUrl = value(formData, "thumbnailUrl");
  const videoUrl = value(formData, "videoUrl");
  const isHold = formData.get("isHold") === "on";

  if (!pathId || !name) {
    return { ok: false, message: "Path and lesson name are required." };
  }

  if (!Number.isFinite(durationMinutes) || durationMinutes < 0) {
    return { ok: false, message: "Duration must be zero or more minutes." };
  }

  try {
    await getDb().insert(lessons).values({
      pathId,
      name,
      durationMinutes: Math.round(durationMinutes),
      description,
      isHold,
      thumbnailUrl,
      videoUrl,
    });
  } catch {
    return { ok: false, message: "Could not create the lesson." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/lessons");
  return { ok: true, message: "Lesson created." };
}

export async function updateLessonHoldAction(formData: FormData) {
  await requireAdminSession();

  const id = value(formData, "id");

  if (!id) {
    return;
  }

  await getDb()
    .update(lessons)
    .set({
      isHold: formData.get("isHold") === "on",
      updatedAt: new Date(),
    })
    .where(eq(lessons.id, id));

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/lessons");
}

export async function deleteLessonAction(formData: FormData) {
  await requireAdminSession();

  const id = value(formData, "id");

  if (!id) {
    return;
  }

  await getDb().delete(lessons).where(eq(lessons.id, id));
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/lessons");
}

export async function createBlogPostAction(
  state: ActionState = initialState,
  formData: FormData,
) {
  void state;
  await requireAdminSession();

  const pathId = value(formData, "pathId");
  const title = value(formData, "title");
  const requestedSlug = value(formData, "slug");
  const excerpt = value(formData, "excerpt");
  const content = String(formData.get("content") ?? "").trim();
  const thumbnailUrl = value(formData, "thumbnailUrl");
  const slug = await uniqueBlogSlug(requestedSlug || title);

  if (!pathId || !title || !slug) {
    return { ok: false, message: "Path, title, and slug are required." };
  }

  if (!content) {
    return { ok: false, message: "Blog content is required." };
  }

  try {
    await getDb().insert(blogPosts).values({
      pathId,
      title,
      slug,
      excerpt,
      content,
      thumbnailUrl,
    });
  } catch {
    return { ok: false, message: "Could not create the blog post." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/blogs");
  revalidatePath("/blogs");
  return { ok: true, message: `Blog created at /blogs/${slug}.` };
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireAdminSession();

  const id = value(formData, "id");

  if (!id) {
    return;
  }

  await getDb().delete(blogPosts).where(eq(blogPosts.id, id));
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/blogs");
  revalidatePath("/blogs");
}
