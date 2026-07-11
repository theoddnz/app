import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/ui/tabler-icons";

import { updateAuthorProfileByAdminAction } from "@/app/admin-actions";
import { AuthorProfileForm } from "@/components/admin/AuthorProfileForm";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function EditAuthorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;

  const author = await getDb().query.users.findFirst({
    where: and(eq(users.id, id), eq(users.role, "author")),
    columns: {
      id: true,
      name: true,
      email: true,
      profileRole: true,
      profileImageUrl: true,
    },
  });

  if (!author) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="outline" className="h-9">
        <Link href="/dashboard/authors">
          <ArrowLeft className="size-4" />
          Back to authors
        </Link>
      </Button>

      <AuthorProfileForm
        action={updateAuthorProfileByAdminAction}
        initialValues={author}
        heading="Edit author profile"
        description="Update the author name, public role, login email, or reset their password."
        submitLabel="Save author"
      />
    </div>
  );
}
