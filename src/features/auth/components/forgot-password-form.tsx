"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { authClient } from "@/features/auth/auth-client";
import {
  forgotPasswordSchema,
  getFieldErrors,
} from "@/features/auth/auth-schema";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(formData: FormData) {
    const parsed = forgotPasswordSchema.safeParse({
      email: formData.get("email"),
    });

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      setFormError("Saisissez une adresse email valide.");
      return;
    }

    setErrors({});
    setFormError(null);

    startTransition(async () => {
      const { error } = await authClient.requestPasswordReset({
        email: parsed.data.email,
        redirectTo: new URL("/reset-password", window.location.origin).toString(),
      });

      if (error) {
        setFormError(
          error.message ??
            "Impossible d'envoyer la demande pour le moment. Reessayez dans un instant.",
        );
        return;
      }

      setSubmitted(true);
    });
  }

  return (
    <section className="surface-card rounded-[var(--radius-panel)] p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-3xl text-primary-strong">
            Reinitialiser le mot de passe
          </h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">
            Saisissez l&apos;email de votre compte. Si un acces actif existe, un lien
            de reinitialisation sera prepare.
          </p>
          <p className="mt-4 rounded-[var(--radius-card)] bg-white/70 px-4 py-3 text-sm text-muted">
            En local, le lien est journalise cote serveur tant qu&apos;aucun
            fournisseur email reel n&apos;est configure.
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
                htmlFor="email"
              >
                Adresse email
              </label>
              <input
                autoComplete="email"
                className="mt-2 min-h-11 w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-foreground outline-none focus:border-accent"
                disabled={isPending || submitted}
                id="email"
                name="email"
                placeholder="vous@club.fr"
                type="email"
              />
              {errors.email ? (
                <p className="mt-2 text-sm text-danger" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>

            {submitted ? (
              <p
                className="rounded-[var(--radius-card)] bg-accent-soft px-4 py-3 text-sm font-medium text-primary-strong"
                role="status"
              >
                Si un compte actif correspond a cet email, un lien de
                reinitialisation est maintenant disponible.
              </p>
            ) : null}

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
              disabled={isPending || submitted}
              type="submit"
            >
              {isPending ? "Preparation du lien..." : "Recevoir un lien"}
            </button>

            <Link
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-border bg-white px-5 py-3 text-base font-semibold text-primary-strong transition hover:bg-surface-contrast"
              href="/sign-in"
            >
              Retour a la connexion
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
