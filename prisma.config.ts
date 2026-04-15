import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";

loadEnvConfig(process.cwd());

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL est obligatoire pour les commandes Prisma. Configurez-le dans .env.local, .env ou l'environnement du shell.",
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl,
  },
});
