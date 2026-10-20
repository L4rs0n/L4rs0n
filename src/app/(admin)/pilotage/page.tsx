import { requireAccess } from "@/features/auth/services/access";
import { PageShell } from "@/components/layout/page-shell";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { RoleNavigation } from "@/features/auth/components/role-navigation";

export default async function AdminDashboardPage() {
  const context = await requireAccess("pilotage:access", "/pilotage");
  return (
    <PageShell eyebrow="Surface responsable" title="Pilotage du club" description="Retrouvez les outils correspondant à votre rôle actif de responsable.">
      <RoleNavigation context={context} />
      <section className="surface-card rounded-[var(--radius-card)] p-6">
        <h2 className="text-3xl">Bienvenue, {context.user.name}</h2>
        <p className="my-4">{context.user.email}</p>
        <SignOutButton />
      </section>
    </PageShell>
  );
}
