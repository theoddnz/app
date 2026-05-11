import "server-only";

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

config({ path: ".env.local", override: true });

let cachedDb: ReturnType<typeof createDb> | null = null;

function createDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to connect to Neon.");
  }

  return drizzle(neon(databaseUrl), { schema });
}

export function getDb() {
  cachedDb ??= createDb();
  return cachedDb;
}

export { schema };
