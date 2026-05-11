# TheOddOnes

Next.js app with a public marketing landing page and a password-protected admin panel for managing learning paths, lessons, and blogs.

## Setup

1. Install packages:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in the values.

Required admin/database values:

- `DATABASE_URL`: Neon Postgres connection string with SSL.
- `NEXT_PUBLIC_APP_URL`: app URL, for example `http://localhost:3000` locally.
- `ADMIN_SESSION_SECRET`: random secret, at least 32 characters.

Required Bunny values:

- `BUNNY_STORAGE_ZONE_NAME`: Bunny Storage zone name.
- `BUNNY_STORAGE_ACCESS_KEY`: storage API key.
- `BUNNY_STORAGE_REGION`: storage region prefix, for example `ny`, or blank for the default Bunny host.
- `BUNNY_PULL_ZONE_URL`: public pull-zone URL used to serve uploaded thumbnails and video URLs you paste into the admin.

## Database Workflow

Schema lives in `src/db/schema.ts`.

Tables:

- `users`: admin/student login accounts. Indexed by `email` and `role`.
- `learning_paths`: course/path records. Indexed by `slug`, `is_visible`, `is_launched`, and `created_at`.
- `lessons`: lessons inside a path. Indexed by `path_id`, `is_hold`, `created_at`, and `(path_id, created_at)`.
- `blog_posts`: path-specific blogs. Indexed by `path_id`, `slug`, `created_at`, and `(path_id, created_at)`.

Lessons are linked to paths with a foreign key. Deleting a path deletes its lessons.

Generate a migration after changing the schema:

```bash
npm run db:generate
```

Apply migrations to Neon:

```bash
npm run db:migrate
```

Create or update the first admin user in the database:

```bash
npm run db:create-admin -- admin@example.com password123 "Admin Name"
```

Open Drizzle Studio:

```bash
npm run db:studio
```

The Drizzle client is in `src/db/index.ts`. Shared data types are in `src/types/admin.ts`.

Check whether Neon has the expected tables:

```bash
npm run db:check
```

## Admin

Run the app:

```bash
npm run dev
```

Open `http://localhost:3000/users/login`, sign in with the admin account you created in Neon, then manage admin content from `/dashboard`. Student signup uses `/users/signup` and creates a `student` user.

Auth routes:

- `/users/login`: student/admin sign in.
- `/users/signup`: student account creation.
- `/login`: redirects to `/users/login` for old links.

Redirects:

- Admin login goes to `/dashboard`.
- Student login/signup goes to `/learn`, the available paths page.

GitHub login is wired through OAuth. In GitHub OAuth App settings, use:

```txt
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/api/auth/github/callback
```

Then set:

```env
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Google is still a UI placeholder until its callback flow is implemented.

The admin panel can:

- Show sidebar analytics for users, paths, lessons, blogs, visible paths, launched paths, and held lessons.
- Add a path with name, slug, description, thumbnail URL, launched state, and visible state.
- Add lessons under a path with lesson name, duration, description, hold/waiting state, lesson thumbnail URL, and video URL.
- Add blogs under a path with blog name, small description, content, slug, thumbnail, and inline content images.
- Upload path and lesson thumbnails to Bunny Storage.
- Upload blog thumbnails and inline blog images to Bunny Storage.
- Store video links only. Upload the actual video in Bunny, then paste the public Bunny video URL into the lesson form.
- Toggle launched and visible state.
- Toggle lesson hold/waiting state.
- Delete paths and lessons.
- Delete blogs.

## Lesson Workflow

1. Create a path from `/dashboard`.
   Path slugs are generated automatically from the path name.
2. Upload your lesson video to Bunny manually.
3. Copy the public video URL from your Bunny pull zone.
4. In `/dashboard/lessons`, use **Add lesson**:
   - Choose the path.
   - Add lesson name.
   - Add duration in minutes.
   - Add description.
   - Paste the Bunny video URL.
   - Upload or paste a lesson thumbnail URL.
   - Turn on **Hold / waiting** if the lesson should not be treated as ready.
5. Click **Create lesson**.

After changing schema, always run:

```bash
npm run db:generate
npm run db:migrate
```

## Blog Workflow

1. Open `/dashboard/blogs`.
2. Choose the path this blog belongs to.
3. Add blog name, slug, small description, and cover thumbnail.
4. Write content in the editor using MDX-style markdown:
   - `## Heading`
   - `**bold**`
   - `*italic*`
   - `[link](https://example.com)`
   - `![image alt](https://image-url)`
5. Use the image button in the editor to upload a Bunny image and insert it into the middle of the blog.
6. Check the preview panel.
7. Create the blog.

Public blog routes:

- `/blogs`: all blogs with path filter links.
- `/blogs/path/[pathSlug]`: blogs for one path.
- `/blogs/[slug]`: individual blog page.
