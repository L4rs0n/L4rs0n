import { z } from "zod";

export const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("L4rs0n"),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

export function loadPublicEnv(
  source: NodeJS.ProcessEnv = process.env,
): PublicEnv {
  return publicEnvSchema.parse(source);
}
