import { redirect } from "next/navigation";

import { AuthPageShell } from "@/features/auth/components/auth-page-shell";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { getSession } from "@/features/auth/services/get-session";
import { resolvePostAuthRedirect } from "@/lib/auth/session";
import { loadServerEnv } from "@/lib/env/server";

export default async function ForgotPasswordPage() {
  const session = await getSession();

  if (session) {
    redirect(resolvePostAuthRedirect(undefined, loadServerEnv().APP_BASE_URL));
  }

  return (
    <AuthPageShell
      eyebrow="Recuperation"
      title="Retrouver l'acces a votre compte"
      description="Le flux de reinitialisation reste prudent sur les messages retour et se contente de confirmer qu'une demande a ete preparee."
    >
      <ForgotPasswordForm />
    </AuthPageShell>
  );
}
