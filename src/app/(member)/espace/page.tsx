import { redirect } from "next/navigation";
import { can, roleHome } from "@/features/auth/policies/roles";
import { requireAccessContext } from "@/features/auth/services/access";
import { PageShell } from "@/components/layout/page-shell";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { RoleNavigation } from "@/features/auth/components/role-navigation";

export default async function MemberSpacePage() {
  const context = await requireAccessContext("/espace");
  if (!can(context.role, "member:access")) redirect(roleHome(context.role));
  return (
    <PageShell eyebrow="Surface adhérent" title="Mon espace adhérent" description="Retrouvez les informations et les parcours destinés aux adhérents.">
      <RoleNavigation context={context} />
      <section className="surface-card rounded-[var(--radius-card)] p-6">
        <h2 className="text-3xl">Bienvenue, {context.user.name}</h2>
        <p className="my-4">{context.user.email}</p>
        <SignOutButton />
      </section>
    </PageShell>
  );
}
