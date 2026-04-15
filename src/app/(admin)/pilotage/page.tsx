import { PageShell } from "@/components/layout/page-shell";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { requireAuth } from "@/features/auth/services/require-auth";

export default async function AdminDashboardPage() {
  const session = await requireAuth("/pilotage");

  return (
    <PageShell
      eyebrow="Surface responsable"
      title="Session restauree pour le pilotage administratif"
      description="La surface responsable n&apos;est plus un simple placeholder public: elle exige maintenant une session authentifiee avant affichage."
    >
      <section className="grid gap-4 md:grid-cols-2">
        <article className="surface-card rounded-[var(--radius-card)] p-6">
          <h2 className="text-3xl text-primary-strong">Ce qui est deja verrouille</h2>
          <p className="mt-3 text-base leading-7 text-muted">
            Le chargement de session s&apos;effectue cote serveur avant toute
            exposition de la surface. La logique fine de role actif viendra
            ensuite.
          </p>
          <dl className="mt-6 space-y-3 text-base leading-7 text-muted">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                Utilisateur
              </dt>
              <dd className="text-primary-strong">{session.user.email}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                Session
              </dt>
              <dd className="text-primary-strong">
                Expire le{" "}
                {new Intl.DateTimeFormat("fr-FR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(session.session.expiresAt))}
              </dd>
            </div>
          </dl>
        </article>
        <article className="surface-card rounded-[var(--radius-card)] p-6">
          <h2 className="text-3xl text-primary-strong">
            Ce qui reste volontairement ouvert
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            Aucun workflow metier n&apos;est encore actif ici. La story 1.2 pose
            l&apos;authentification, pas encore la matrice RBAC complete ni les
            pages d&apos;administration profondes.
          </p>
          <div className="mt-6">
            <SignOutButton />
          </div>
        </article>
      </section>
    </PageShell>
  );
}
