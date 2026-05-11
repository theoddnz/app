import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local", override: true });

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

let pathsTable;
let lessonsTable;
let blogsTable;
let usersTable;
let migrationsTable;

try {
  [pathsTable] = await sql.query(
    "select to_regclass('public.learning_paths') as table_name",
    [],
  );
  [usersTable] = await sql.query(
    "select to_regclass('public.users') as table_name",
    [],
  );
  [lessonsTable] = await sql.query(
    "select to_regclass('public.lessons') as table_name",
    [],
  );
  [blogsTable] = await sql.query(
    "select to_regclass('public.blog_posts') as table_name",
    [],
  );
  [migrationsTable] = await sql.query(
    "select to_regclass('drizzle.__drizzle_migrations') as table_name",
    [],
  );
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown database error.";

  console.error("Could not connect to DATABASE_URL.");
  console.error(message);
  console.error("Use a remote Neon Postgres URL, usually ending in .neon.tech with sslmode=require.");
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      learning_paths: pathsTable.table_name,
      lessons: lessonsTable.table_name,
      blog_posts: blogsTable.table_name,
      users: usersTable.table_name,
      drizzle_migrations: migrationsTable.table_name,
    },
    null,
    2,
  ),
);
