"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { authClient } from "@/features/auth/auth-client";
import { getFieldErrors, signInSchema } from "@/features/auth/auth-schema";
import { resolvePostAuthRedirect } from "@/lib/auth/session";

type SignInFormProps = {
  callbackUrl?: string;
  resetSucceeded?: boolean;
};

export function SignInForm({
  callbackUrl,
  resetSucceeded = false,
}: SignInFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  function handleSubmit(formData: FormData) {
    const parsed = signInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      setFormError("Corrigez les champs en erreur pour continuer.");
      return;
    }

    setErrors({});
    setFormError(null);

    const redirectTo = resolvePostAuthRedirect(
      callbackUrl,
      window.location.origin,
    );

    startTransition(async () => {
      const { error } = await authClient.signIn.email({
        ...parsed.data,
        callbackURL: redirectTo,
        rememberMe,
      });

      if (error) {
        setFormError(
          error.message ??
            "Connexion impossible avec ces identifiants. Verifiez vos informations.",
        );
        return;
      }

      router.replace(redirectTo);
      router.refresh();
    });
  }

  return (
    <section className="surface-card rounded-[var(--radius-panel)] p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-3xl text-primary-strong">Se connecter</h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">
            Utilisez l&apos;adresse email et le mot de passe de votre compte club.
            La session restera restauree cote serveur tant qu&apos;elle reste valide.
          </p>

          {resetSucceeded ? (
            <p
              className="mt-4 rounded-[var(--radius-card)] bg-accent-soft px-4 py-3 text-sm font-medium text-primary-strong"
              role="status"
            >
              Votre mot de passe a ete mis a jour. Vous pouvez maintenant vous
              reconnecter.
            </p>
          ) : null}

          {callbackUrl ? (
            <p className="mt-4 rounded-[var(--radius-card)] bg-white/70 px-4 py-3 text-sm text-muted">
              Une fois connecte, vous serez renvoye vers la surface demandee.
            </p>
          ) : null}
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
                disabled={isPending}
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

            <div>
              <div className="flex items-center justify-between gap-3">
                <label
                  className="block text-sm font-semibold text-primary-strong"
                  htmlFor="password"
                >
                  Mot de passe
                </label>
                <Link
                  className="text-sm font-medium text-accent hover:text-primary-strong"
                  href="/forgot-password"
                >
                  Mot de passe oublie ?
                </Link>
              </div>
              <input
                autoComplete="current-password"
                className="mt-2 min-h-11 w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-foreground outline-none focus:border-accent"
                disabled={isPending}
                id="password"
                name="password"
                type="password"
              />
              {errors.password ? (
                <p className="mt-2 text-sm text-danger" role="alert">
                  {errors.password}
                </p>
              ) : null}
            </div>

            <label className="flex min-h-11 items-center gap-3 text-sm text-muted">
              <input
                checked={rememberMe}
                className="size-4 rounded border border-border text-accent"
                disabled={isPending}
                onChange={(event) => setRememberMe(event.target.checked)}
                type="checkbox"
              />
              <span>Rester connecte sur cet appareil</span>
            </label>

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
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Connexion en cours..." : "Ouvrir ma session"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
