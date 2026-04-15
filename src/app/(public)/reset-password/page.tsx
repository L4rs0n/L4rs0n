import { redirect } from "next/navigation";

import { AuthPageShell } from "@/features/auth/components/auth-page-shell";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { getSession } from "@/features/auth/services/get-session";
import { resolvePostAuthRedirect } from "@/lib/auth/session";
import { loadServerEnv } from "@/lib/env/server";

type SearchParams = Promise<{
  token?: string | string[];
}>;

type ResetPasswordPageProps = {
  searchParams: SearchParams;
};

function pickString(value?: string | string[]) {
  return typeof value === "string" ? value : undefined;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const session = await getSession();

  if (session) {
    redirect(resolvePostAuthRedirect(undefined, loadServerEnv().APP_BASE_URL));
  }

  const params = await searchParams;

  return (
    <AuthPageShell
      eyebrow="Nouveau mot de passe"
      title="Mettre a jour votre mot de passe"
      description="Le lien de reinitialisation vous ramene ici pour definir un nouveau secret sans exposer d'information sensible sur le compte."
    >
      <ResetPasswordForm token={pickString(params.token)} />
    </AuthPageShell>
  );
}
