import { z } from "zod";

export const AUTH_PASSWORD_MIN_LENGTH = 8;
export const AUTH_PASSWORD_MAX_LENGTH = 128;

export const signInSchema = z.object({
  email: z.email("Saisissez une adresse email valide."),
  password: z
    .string()
    .min(1, "Saisissez votre mot de passe.")
    .max(AUTH_PASSWORD_MAX_LENGTH),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Saisissez une adresse email valide."),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Le lien de reinitialisation est incomplet."),
    newPassword: z
      .string()
      .min(
        AUTH_PASSWORD_MIN_LENGTH,
        `Le mot de passe doit contenir au moins ${AUTH_PASSWORD_MIN_LENGTH} caracteres.`,
      )
      .max(
        AUTH_PASSWORD_MAX_LENGTH,
        `Le mot de passe doit contenir au maximum ${AUTH_PASSWORD_MAX_LENGTH} caracteres.`,
      ),
    confirmPassword: z
      .string()
      .min(1, "Confirmez votre nouveau mot de passe."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export function getFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path[0];

    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }

  return fieldErrors;
}
