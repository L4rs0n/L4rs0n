import { PageShell } from "@/components/layout/page-shell";

export default function AdminDashboardPage() {
  return (
    <PageShell
      eyebrow="Surface responsable"
      title="Base prête pour le pilotage administratif"
      description="Cette surface prépare la future navigation d'administration sans embarquer encore les écrans métier profonds."
    >
      <section className="grid gap-4 md:grid-cols-2">
        <article className="surface-card rounded-[var(--radius-card)] p-6">
          <h2 className="text-3xl text-primary-strong">
            Ce que la fondation réserve
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            Des routes, composants et frontières serveur cohérents pour les
            modules membres, activités, documents, annonces et audit.
          </p>
        </article>
        <article className="surface-card rounded-[var(--radius-card)] p-6">
          <h2 className="text-3xl text-primary-strong">
            Ce qui n&apos;est pas encore livré
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            Aucun workflow métier n&apos;est actif ici. La story 1.1 verrouille
            seulement le terrain pour les stories suivantes.
          </p>
        </article>
      </section>
    </PageShell>
  );
}
