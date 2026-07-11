import { eq } from "drizzle-orm";

import { updateOwnAuthorProfileAction } from "@/app/admin-actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AuthorProfileForm } from "@/components/admin/AuthorProfileForm";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { requireAuthorSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AuthorProfilePage() {
  const session = await requireAuthorSession();

  const author = await getDb().query.users.findFirst({
    where: eq(users.id, session.userId),
    columns: {
      id: true,
      name: true,
      email: true,
      profileRole: true,
      profileImageUrl: true,
    },
  });

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Profile"
        description="Update the name, role, email, and optional password shown on your public blog profile."
      />

      {author ? (
        <AuthorProfileForm
          action={updateOwnAuthorProfileAction}
          initialValues={{
            id: author.id,
            name: author.name,
            email: author.email,
            profileRole: author.profileRole,
            profileImageUrl: author.profileImageUrl,
          }}
          heading="Your profile"
          description="Keep your public author card up to date."
          submitLabel="Save profile"
        />
      ) : null}
    </div>
  );
}
