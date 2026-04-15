import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

import { loadServerEnv } from "@/lib/env/server";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

const serverEnv = loadServerEnv();
const adapter = new PrismaPg({
  connectionString: serverEnv.DATABASE_URL,
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
