import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthPageShell } from "@/features/auth/components/auth-page-shell";
import { RegisterForm } from "@/features/auth/components/register-form";
import { getSession } from "@/features/auth/services/get-session";
import { getRegistrationGrantPageState } from "@/features/members/services/registration-grants";
import { DEFAULT_AUTHENTICATED_PATH } from "@/lib/auth/session";

type SearchParams = Promise<{
  token?: string | string[];
}>;

type RegisterPageProps = {
  searchParams: SearchParams;
};

function pickString(value?: string | string[]) {
  return typeof value === "string" ? value : undefined;
}

function getRegistrationErrorCopy(
  status:
    | "missing-token"
    | "invalid-token"
    | "expired-token"
    | "consumed-token"
    | "revoked-token"
    | "already-linked",
) {
  switch (status) {
    case "missing-token":
      return {
        description:
          "Ce parcours de creation de compte doit etre ouvert depuis un lien d'activation envoye par le club.",
        title: "Lien d'activation manquant",
      };
    case "invalid-token":
      return {
        description:
          "Le lien fourni n'est pas reconnu. Demandez un nouveau lien d'activation au club.",
        title: "Lien d'activation invalide",
      };
    case "expired-token":
      return {
        description:
          "Ce lien d'activation a expire. Le club doit emettre un nouveau lien pour finaliser votre acces.",
        title: "Lien d'activation expire",
      };
    case "consumed-token":
      return {
        description:
          "Ce lien a deja ete utilise. Si votre compte existe deja, connectez-vous. Sinon, contactez le club.",
        title: "Lien deja utilise",
      };
    case "revoked-token":
      return {
        description:
          "Ce lien n'est plus autorise. Demandez au club de verifier votre rattachement avant de reessayer.",
        title: "Lien desactive",
      };
    case "already-linked":
      return {
        description:
          "Cette fiche club est deja associee a un compte applicatif. Utilisez la connexion ou contactez le club en cas de doute.",
        title: "Acces deja active",
      };
  }
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const session = await getSession();

  if (session) {
    redirect(DEFAULT_AUTHENTICATED_PATH);
  }

  const token = pickString(params.token);
  const state = await getRegistrationGrantPageState(token);

  if (state.status !== "valid") {
    const copy = getRegistrationErrorCopy(state.status);

    return (
      <AuthPageShell
        eyebrow="Acces club"
        title={copy.title}
        description={copy.description}
      >
        <section className="surface-card rounded-[var(--radius-panel)] p-6 sm:p-8">
          <div className="space-y-4 text-base leading-7 text-muted">
            <p>
              Si vous pensez que votre rattachement est correct, demandez au club
              un nouveau lien d&apos;activation.
            </p>
            <p>
              Vous avez deja un compte ?{" "}
              <Link
                className="font-medium text-accent hover:text-primary-strong"
                href="/sign-in"
              >
                Ouvrir la connexion
              </Link>
              .
            </p>
          </div>
        </section>
      </AuthPageShell>
    );
  }

  return (
    <AuthPageShell
      eyebrow="Acces club"
      title="Creation securisee du compte club"
      description="Ce parcours active un acces prive uniquement quand le club a deja valide votre rattachement."
    >
      <RegisterForm
        email={state.email}
        initialName={state.memberName}
        token={token!}
      />
    </AuthPageShell>
  );
}
