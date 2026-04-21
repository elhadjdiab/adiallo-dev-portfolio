import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@/generated/prisma";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..", "..");
const sqliteNextToSchema = path.join(projectRoot, "src", "config", "dev.db");

/**
 * Next.js résout `file:./dev.db` depuis la racine du repo ; la base SQLite est
 * à côté du schéma Prisma (`src/config/dev.db`). Sans ce correctif : erreur 14 SQLite.
 */
function ensureSqliteDatabasePath() {
  const url = process.env.DATABASE_URL;
  if (!url?.startsWith("file:")) return;

  const raw = url.slice("file:".length).replace(/^\.\//, "");
  const candidate = path.isAbsolute(raw) ? raw : path.join(projectRoot, raw);

  if (!fs.existsSync(candidate) && fs.existsSync(sqliteNextToSchema)) {
    process.env.DATABASE_URL = `file:${sqliteNextToSchema}`;
  }
}

ensureSqliteDatabasePath();

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
