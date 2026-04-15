import { z } from "zod";

export const serverEnvSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL est obligatoire")
    .default("postgresql://postgres:postgres@localhost:5432/l4rs0n"),
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, "BETTER_AUTH_SECRET doit contenir au moins 32 caractères")
    .default("change-me-before-production-change-me"),
  BETTER_AUTH_URL: z
    .string()
    .url("BETTER_AUTH_URL doit être une URL valide")
    .default("http://localhost:3000"),
  APP_BASE_URL: z
    .string()
    .url("APP_BASE_URL doit être une URL valide")
    .default("http://localhost:3000"),
  CLUB_NAME: z.string().min(1).default("L4rs0n"),
  SMTP_FROM: z
    .string()
    .email("SMTP_FROM doit être une adresse email valide")
    .default("noreply@example.com"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function loadServerEnv(source: NodeJS.ProcessEnv = process.env): ServerEnv {
  return serverEnvSchema.parse(source);
}
