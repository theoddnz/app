import { and, count, desc, eq, ilike, ne, or, type SQL } from "drizzle-orm";
import Link from "next/link";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState } from "@/components/admin/DashboardCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Search, Users } from "@/components/ui/tabler-icons";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

type UsersPageProps = {
  searchParams: Promise<{
    page?: string | string[];
    q?: string | string[];
    role?: string | string[];
    auth?: string | string[];
  }>;
};

type UserFilters = {
  query: string;
  role: string;
  auth: string;
};

function getPageValue(value: string | string[] | undefined) {
  const rawPage = Array.isArray(value) ? value[0] : value;
  const page = Number.parseInt(rawPage ?? "1", 10);

  return Number.isFinite(page) && page > 0 ? page : 1;
}

function getStringValue(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function roleBadgeClass(role: string) {
  if (role === "admin") {
    return "bg-foreground text-background";
  }

  if (role === "author") {
    return "bg-[#c4622d]/15 text-[#9b451b] ring-1 ring-[#c4622d]/25";
  }

  return "bg-muted text-muted-foreground";
}

function getWhereClause(filters: UserFilters) {
  const conditions: SQL[] = [ne(users.role, "admin")];

  if (filters.query) {
    const query = `%${filters.query}%`;
    const searchClause = or(
      ilike(users.name, query),
      ilike(users.email, query),
      ilike(users.profileRole, query),
    );

    if (searchClause) {
      conditions.push(searchClause);
    }
  }

  if (filters.role && filters.role !== "admin") {
    conditions.push(eq(users.role, filters.role));
  }

  if (filters.auth) {
    conditions.push(eq(users.authProvider, filters.auth));
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
}

function pageHref(page: number, filters: UserFilters) {
  const params = new URLSearchParams();

  params.set("page", String(page));

  if (filters.query) {
    params.set("q", filters.query);
  }

  if (filters.role) {
    params.set("role", filters.role);
  }

  if (filters.auth) {
    params.set("auth", filters.auth);
  }

  return `/dashboard/users?${params.toString()}`;
}

export default async function UsersAdminPage({ searchParams }: UsersPageProps) {
  await requireAdminSession();

  const params = await searchParams;
  const filters = {
    query: getStringValue(params.q),
    role: getStringValue(params.role),
    auth: getStringValue(params.auth),
  };
  const requestedPage = getPageValue(params.page);
  const db = getDb();
  const whereClause = getWhereClause(filters);
  const [{ total }] = await db.select({ total: count() }).from(users).where(whereClause);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const offset = (currentPage - 1) * PAGE_SIZE;
  const start = total === 0 ? 0 : offset + 1;
  const end = Math.min(offset + PAGE_SIZE, total);

  const paginatedUsers = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      profileRole: users.profileRole,
      authProvider: users.authProvider,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(whereClause)
    .orderBy(desc(users.createdAt))
    .limit(PAGE_SIZE)
    .offset(offset);

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="People"
        title="Users"
        description="View registered users, roles, authentication methods, and profile details."
      />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <Users className="size-5" />
            </span>
            <div>
              <h2 className="text-xl font-semibold">All users</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Showing {start}-{end} of {total} users
              </p>
            </div>
          </div>
          <span className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <form action="/dashboard/users" className="rounded-lg border border-border bg-card p-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_auto_auto] lg:items-end">
            <label className="space-y-1.5">
              <span className="text-xs font-medium uppercase text-muted-foreground">Search</span>
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="q"
                  defaultValue={filters.query}
                  placeholder="Name, email, or profile"
                  className="pl-8"
                />
              </div>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium uppercase text-muted-foreground">Role</span>
              <select
                name="role"
                defaultValue={filters.role}
                className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="">All roles</option>
                <option value="student">Student</option>
                <option value="author">Author</option>
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium uppercase text-muted-foreground">Auth</span>
              <select
                name="auth"
                defaultValue={filters.auth}
                className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="">All methods</option>
                <option value="password">Password</option>
                <option value="github">GitHub</option>
              </select>
            </label>

            <Button type="submit" className="h-8">
              <Search className="size-4" />
              Filter
            </Button>

            <Button asChild variant="outline" className="h-8">
              <Link href="/dashboard/users">Reset</Link>
            </Button>
          </div>
        </form>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {paginatedUsers.length === 0 ? (
            <EmptyState icon={Users} title="No users found" description="Try adjusting your search or filters." />
          ) : (
            <div className="max-h-[calc(100svh-18rem)] overflow-auto">
              <table className="min-w-[940px] w-full border-collapse text-left text-sm">
                <thead className="sticky top-0 z-10 border-b border-border bg-muted/80 text-xs uppercase text-muted-foreground backdrop-blur">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">Name</th>
                    <th scope="col" className="px-4 py-3 font-medium">Email</th>
                    <th scope="col" className="px-4 py-3 font-medium">Profile</th>
                    <th scope="col" className="px-4 py-3 font-medium">Role</th>
                    <th scope="col" className="px-4 py-3 font-medium">Auth</th>
                    <th scope="col" className="px-4 py-3 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="transition-colors hover:bg-muted/45">
                      <td className="max-w-[220px] px-4 py-3 align-middle">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold uppercase text-muted-foreground">
                            {(user.name || user.email).slice(0, 1)}
                          </span>
                          <span className="truncate font-medium">{user.name || "Unnamed user"}</span>
                        </div>
                      </td>
                      <td className="max-w-[280px] px-4 py-3 align-middle text-muted-foreground">
                        <span className="block truncate">{user.email}</span>
                      </td>
                      <td className="max-w-[220px] px-4 py-3 align-middle text-muted-foreground">
                        <span className="block truncate">{user.profileRole || "No profile role"}</span>
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <span
                          className={cn(
                            "inline-flex h-7 items-center rounded-md px-2.5 text-xs font-medium capitalize",
                            roleBadgeClass(user.role),
                          )}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-middle capitalize text-muted-foreground">{user.authProvider}</td>
                      <td className="whitespace-nowrap px-4 py-3 align-middle text-muted-foreground">{formatDate(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          {currentPage > 1 ? (
            <Button asChild variant="outline" size="sm">
              <Link href={pageHref(currentPage - 1, filters)}>
                <ArrowLeft className="size-4" />
                Previous
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <ArrowLeft className="size-4" />
              Previous
            </Button>
          )}

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
              .map((page, index, pages) => {
                const previousPage = pages[index - 1];
                const showGap = previousPage && page - previousPage > 1;

                return (
                  <div key={page} className="flex items-center gap-1">
                    {showGap ? <span className="px-2 text-sm text-muted-foreground">...</span> : null}
                    <Button asChild={page !== currentPage} variant={page === currentPage ? "default" : "outline"} size="icon" className="size-9">
                      {page === currentPage ? <span>{page}</span> : <Link href={pageHref(page, filters)}>{page}</Link>}
                    </Button>
                  </div>
                );
              })}
          </div>

          {currentPage < totalPages ? (
            <Button asChild variant="outline" size="sm">
              <Link href={pageHref(currentPage + 1, filters)}>
                Next
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Next
              <ArrowRight className="size-4" />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
