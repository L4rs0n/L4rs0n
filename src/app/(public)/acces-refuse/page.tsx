import { PageShell } from "@/components/layout/page-shell";
import { requireAccessContext } from "@/features/auth/services/access";
import { RoleNavigation } from "@/features/auth/components/role-navigation";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

export default async function AccessDeniedPage() {
  const context = await requireAccessContext("/espace");
  return (
    <PageShell eyebrow="Accès refusé" title="Droits insuffisants" description="Votre rôle actif ne permet pas cet accès. Choisissez un rôle attribué ou contactez un administrateur du club.">
      <RoleNavigation context={context} />
      <SignOutButton />
    </PageShell>
  );
}
