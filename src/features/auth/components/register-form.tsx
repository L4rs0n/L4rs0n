"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { authClient } from "@/features/auth/auth-client";
import { getFieldErrors, registerSchema } from "@/features/auth/auth-schema";
import { DEFAULT_AUTHENTICATED_PATH } from "@/lib/auth/session";
import { REGISTRATION_TOKEN_HEADER } from "@/features/members/services/registration-grants.shared";

type RegisterFormProps = {
  email: string;
  initialName: string;
  token: string;
};

export function RegisterForm({
  email,
  initialName,
  token,
}: RegisterFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    const parsed = registerSchema.safeParse({
      confirmPassword: formData.get("confirmPassword"),
      email: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
      token: formData.get("token"),
    });

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      setFormError("Corrigez les champs en erreur pour finaliser votre acces.");
      return;
    }

    setErrors({});
    setFormError(null);

    startTransition(async () => {
      const { error } = await authClient.signUp.email({
        email: parsed.data.email,
        fetchOptions: {
          headers: {
            [REGISTRATION_TOKEN_HEADER]: parsed.data.token,
          },
        },
        name: parsed.data.name,
        password: parsed.data.password,
      });

      if (error) {
        setFormError(
          error.message ??
            "Creation du compte impossible avec ce lien. Demandez un nouveau lien au club.",
        );
        return;
      }

      router.replace(DEFAULT_AUTHENTICATED_PATH);
      router.refresh();
    });
  }

  return (
    <section className="surface-card rounded-[var(--radius-panel)] p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h2 className="text-3xl text-primary-strong">Activer mon acces</h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">
            Definissez votre mot de passe pour associer votre compte applicatif a
            votre fiche club. Le lien reste reserve a l&apos;adresse email ci-dessous.
          </p>
          <p className="mt-4 rounded-[var(--radius-card)] bg-white/70 px-4 py-3 text-sm text-muted">
            Une fois le compte cree, votre session s&apos;ouvrira directement sur
            votre espace club.
          </p>
        </div>

        <form
          className="rounded-[var(--radius-card)] bg-white/70 p-5"
          action={handleSubmit}
          noValidate
        >
          <input name="token" type="hidden" value={token} />

          <div className="space-y-5">
            <div>
              <label
                className="block text-sm font-semibold text-primary-strong"
                htmlFor="name"
              >
                Nom complet
              </label>
              <input
                autoComplete="name"
                className="mt-2 min-h-11 w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-foreground outline-none focus:border-accent"
                defaultValue={initialName}
                disabled={isPending}
                id="name"
                name="name"
                placeholder="Nom et prenom"
                type="text"
              />
              {errors.name ? (
                <p className="mt-2 text-sm text-danger" role="alert">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-primary-strong"
                htmlFor="email"
              >
                Adresse email validee
              </label>
              <input
                autoComplete="email"
                className="mt-2 min-h-11 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-base text-foreground outline-none focus:border-accent"
                defaultValue={email}
                id="email"
                name="email"
                readOnly
                type="email"
              />
              {errors.email ? (
                <p className="mt-2 text-sm text-danger" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-primary-strong"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                autoComplete="new-password"
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
                disabled={isPending}
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
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Creation du compte..." : "Creer mon compte"}
            </button>

            <p className="text-sm text-muted">
              Vous avez deja active votre acces ?{" "}
              <Link
                className="font-medium text-accent hover:text-primary-strong"
                href="/sign-in"
              >
                Connectez-vous
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
