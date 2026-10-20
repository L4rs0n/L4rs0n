import Link from "next/link";
import { switchRole } from "@/features/auth/actions/roles";
import { ROLE_LABELS, ROLES, can } from "@/features/auth/policies/roles";
import type { AccessContext } from "@/features/auth/services/authorization";

export function RoleNavigation({ context }: { context: AccessContext }) {
  return (
    <section className="surface-card rounded-[var(--radius-card)] p-6">
      <p>Rôle actif : <strong>{context.role ? ROLE_LABELS[context.role] : "Aucun rôle autorisé"}</strong></p>
      <nav aria-label="Espaces autorisés" className="mt-4 flex flex-wrap gap-4">
        {can(context.role, "member:access") && <Link href="/espace">Mon espace</Link>}
        {can(context.role, "pilotage:access") && <Link href="/pilotage">Pilotage du club</Link>}
        {can(context.role, "roles:manage") && <Link href="/pilotage/roles">Attribution des rôles</Link>}
      </nav>
      <div className="mt-4 flex flex-wrap gap-4" aria-label="Choisir un rôle attribué">
        {ROLES.filter((role) => context.user.roles.includes(role)).map((role) => (
          <form key={role} action={switchRole}>
            <input type="hidden" name="role" value={role} />
            <button type="submit" disabled={role === context.role} className="rounded border px-4 py-2 disabled:opacity-50">
              {ROLE_LABELS[role]}
            </button>
          </form>
        ))}
      </div>
    </section>
  );
}
