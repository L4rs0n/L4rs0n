import { PageShell } from "@/components/layout/page-shell";
import { requireAccess } from "@/features/auth/services/access";
import { RoleNavigation } from "@/features/auth/components/role-navigation";
import { assignRoles } from "@/features/auth/actions/roles";
import { ROLE_LABELS, ROLES } from "@/features/auth/policies/roles";
import { prisma } from "@/lib/db/client";

export default async function RolesPage({ searchParams }: {
  searchParams: Promise<{ error?: string; updated?: string }>;
}) {
  const context = await requireAccess("roles:manage", "/pilotage/roles");
  const params = await searchParams;
  const users = await prisma.user.findMany({
    select: { id: true, email: true, roles: true },
    orderBy: { email: "asc" },
    take: 100,
  });
  return (
    <PageShell eyebrow="Administration" title="Attribution des rôles" description="Attribuez un ou plusieurs rôles configurés. Les changements sont appliqués au prochain accès protégé.">
      <RoleNavigation context={context} />
      {params.error === "invalid-roles" && <p role="alert">Sélectionnez au moins un rôle configuré pour un utilisateur valide.</p>}
      {params.updated === "1" && <p role="status">Les rôles ont été enregistrés.</p>}
      <p>Les 100 premiers comptes sont affichés, par adresse email.</p>
      {users.map((user) => (
        <form key={user.id} action={assignRoles} className="surface-card rounded-[var(--radius-card)] p-6">
          <input type="hidden" name="userId" value={user.id} />
          <fieldset>
            <legend className="font-semibold">{user.email}</legend>
            {ROLES.map((role) => (
              <label key={role} className="my-2 block">
                <input type="checkbox" name="roles" value={role} defaultChecked={user.roles.includes(role)} className="mr-2" />
                {ROLE_LABELS[role]}
              </label>
            ))}
          </fieldset>
          <button type="submit" className="mt-4 rounded border px-4 py-2">Enregistrer les rôles</button>
        </form>
      ))}
    </PageShell>
  );
}
