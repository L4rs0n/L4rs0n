"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { authClient } from "@/features/auth/auth-client";
import {
  getFieldErrors,
  resetPasswordSchema,
} from "@/features/auth/auth-schema";

type ResetPasswordFormProps = {
  token?: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  function handleSubmit(formData: FormData) {
    const parsed = resetPasswordSchema.safeParse({
      token,
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      setFormError("Le formulaire contient encore des erreurs.");
      return;
    }

    setErrors({});
    setFormError(null);

    startTransition(async () => {
      const { error } = await authClient.resetPassword({
        token: parsed.data.token,
        newPassword: parsed.data.newPassword,
      });

      if (error) {
        setFormError(
          error.message ??
            "Le lien est invalide ou a expire. Demandez un nouveau lien de reinitialisation.",
        );
        return;
      }

      setCompleted(true);
      router.replace("/sign-in?reset=success");
      router.refresh();
    });
  }

  if (!token) {
    return (
      <section className="surface-card rounded-[var(--radius-panel)] p-6 sm:p-8">
        <p
          className="rounded-[var(--radius-card)] bg-[rgba(217,119,6,0.12)] px-4 py-3 text-sm text-primary-strong"
          role="alert"
        >
          Le lien de reinitialisation est incomplet. Demandez un nouveau lien
          depuis l&apos;ecran precedent.
        </p>
      </section>
    );
  }

  return (
    <section className="surface-card rounded-[var(--radius-panel)] p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-3xl text-primary-strong">
            Definir un nouveau mot de passe
          </h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">
            Choisissez un mot de passe robuste pour restaurer l&apos;acces a votre
            compte club.
          </p>
        </div>

        <form
          className="rounded-[var(--radius-card)] bg-white/70 p-5"
          action={handleSubmit}
          noValidate
        >
          <div className="space-y-5">
            <div>
              <label
                className="block text-sm font-semibold text-primary-strong"
                htmlFor="newPassword"
              >
                Nouveau mot de passe
              </label>
              <input
                autoComplete="new-password"
                className="mt-2 min-h-11 w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-foreground outline-none focus:border-accent"
                disabled={isPending || completed}
                id="newPassword"
                name="newPassword"
                type="password"
              />
              {errors.newPassword ? (
                <p className="mt-2 text-sm text-danger" role="alert">
                  {errors.newPassword}
                </p>
              ) : null}
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-primary-strong"
                htmlFor="confirmPassword"
              >
                Confirmer le mot de passe
              </label>
              <input
                autoComplete="new-password"
                className="mt-2 min-h-11 w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-foreground outline-none focus:border-accent"
                disabled={isPending || completed}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
              {errors.confirmPassword ? (
                <p className="mt-2 text-sm text-danger" role="alert">
                  {errors.confirmPassword}
                </p>
              ) : null}
            </div>

            {formError ? (
              <p
                className="rounded-[var(--radius-card)] bg-[rgba(192,57,43,0.08)] px-4 py-3 text-sm text-danger"
                role="alert"
              >
                {formError}
              </p>
            ) : null}

            <button
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-base font-semibold text-white transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isPending || completed}
              type="submit"
            >
              {isPending ? "Mise a jour..." : "Mettre a jour le mot de passe"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
