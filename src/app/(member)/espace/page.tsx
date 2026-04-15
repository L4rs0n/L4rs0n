import { PageShell } from "@/components/layout/page-shell";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { requireAuth } from "@/features/auth/services/require-auth";

export default async function MemberSpacePage() {
  const session = await requireAuth("/espace");

  return (
    <PageShell
      eyebrow="Surface adherent"
      title="Session restauree cote serveur pour l&apos;espace membre"
      description="Cette surface confirme qu&apos;une session Better Auth valide est bien lue cote serveur avant l&apos;affichage des parcours adherent."
    >
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <article className="surface-card rounded-[var(--radius-panel)] p-6 sm:p-8">
          <h2 className="text-3xl text-primary-strong">
            Bienvenue, {session.user.name}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            La connexion email / mot de passe est active. Cette page lit une
            session persistee cote serveur et sert de point d&apos;entree pour les
            parcours mobile-first des adherents.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-white/70 p-4">
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                Email
              </dt>
              <dd className="mt-2 text-base font-semibold text-primary-strong">
                {session.user.email}
              </dd>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white/70 p-4">
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                Session
              </dt>
              <dd className="mt-2 text-base font-semibold text-primary-strong">
                Active jusqu&apos;au{" "}
                {new Intl.DateTimeFormat("fr-FR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(session.session.expiresAt))}
              </dd>
            </div>
          </dl>
        </article>

        <aside className="surface-card rounded-[var(--radius-panel)] p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
            Suite du MVP
          </p>
          <ul className="mt-4 space-y-3 text-base leading-7 text-muted">
            <li>Consultation des activites et affichage de l&apos;eligibilite.</li>
            <li>Acces guide aux documents et annonces utiles.</li>
            <li>Surface adaptee selon le role actif en story 1.4.</li>
          </ul>
          <div className="mt-6">
            <SignOutButton />
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
