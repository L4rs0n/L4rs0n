import { z } from "zod";

const requiredString = (name: string) =>
  z.string().trim().min(1, `${name} est obligatoire`);

export const serverEnvSchema = z.object({
  DATABASE_URL: requiredString("DATABASE_URL"),
  BETTER_AUTH_SECRET: requiredString("BETTER_AUTH_SECRET")
    .min(32, "BETTER_AUTH_SECRET doit contenir au moins 32 caracteres")
    .refine(
      (value) => value !== "replace-with-at-least-32-random-characters",
      "BETTER_AUTH_SECRET doit etre remplace par une vraie valeur secrete",
    ),
  BETTER_AUTH_URL: requiredString("BETTER_AUTH_URL").url(
    "BETTER_AUTH_URL doit etre une URL valide",
  ),
  APP_BASE_URL: requiredString("APP_BASE_URL").url(
    "APP_BASE_URL doit etre une URL valide",
  ),
  CLUB_NAME: requiredString("CLUB_NAME"),
  SMTP_FROM: requiredString("SMTP_FROM").email(
    "SMTP_FROM doit etre une adresse email valide",
  ),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function loadServerEnv(
  source: NodeJS.ProcessEnv = process.env,
): ServerEnv {
  return serverEnvSchema.parse(source);
}
