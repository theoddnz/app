import { randomBytes, scryptSync } from "crypto";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local", override: true });

const [, , emailArg, passwordArg, ...nameParts] = process.argv;
const email = emailArg?.trim().toLowerCase();
const password = passwordArg ?? "";
const name = nameParts.join(" ").trim() || "Admin";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing.");
  process.exit(1);
}

if (!email || !email.includes("@") || password.length < 8) {
  console.error("Usage: npm run db:create-admin -- admin@example.com password123 Your Name");
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

function hashPassword(value) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(value, salt, 64);

  return `scrypt$${salt}$${derivedKey.toString("hex")}`;
}

const sql = neon(process.env.DATABASE_URL);

await sql.query(
  `
    insert into users (name, email, password_hash, role)
    values ($1, $2, $3, 'admin')
    on conflict (email) do update set
      name = excluded.name,
      password_hash = excluded.password_hash,
      role = 'admin',
      updated_at = now()
  `,
  [name, email, hashPassword(password)],
);

console.log(`Admin user is ready: ${email}`);
