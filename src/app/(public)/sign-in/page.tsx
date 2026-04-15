import { redirect } from "next/navigation";

import { AuthPageShell } from "@/features/auth/components/auth-page-shell";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { getSession } from "@/features/auth/services/get-session";
import { resolvePostAuthRedirect } from "@/lib/auth/session";
import { loadServerEnv } from "@/lib/env/server";

type SearchParams = Promise<{
  callbackURL?: string | string[];
  reset?: string | string[];
}>;

type SignInPageProps = {
  searchParams: SearchParams;
};

function pickString(value?: string | string[]) {
  return typeof value === "string" ? value : undefined;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const callbackUrl = pickString(params.callbackURL);
  const session = await getSession();

  if (session) {
    redirect(
      resolvePostAuthRedirect(callbackUrl, loadServerEnv().APP_BASE_URL),
    );
  }

  return (
    <AuthPageShell
      eyebrow="Acces club"
      title="Connexion securisee du club"
      description="Le parcours de connexion ouvre une session persistée cote serveur et reste optimise pour les usages mobiles du club."
    >
      <SignInForm
        callbackUrl={callbackUrl}
        resetSucceeded={pickString(params.reset) === "success"}
      />
    </AuthPageShell>
  );
}
