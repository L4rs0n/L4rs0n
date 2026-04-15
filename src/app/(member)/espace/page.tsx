import { PageShell } from "@/components/layout/page-shell";

export default function MemberSpacePage() {
  return (
    <PageShell
      eyebrow="Surface adhérent"
      title="Base prête pour les parcours de consultation et d&apos;action rapide"
      description="Cette page n&apos;implémente pas encore le métier, mais elle réserve l&apos;espace de navigation destiné aux parcours mobile-first des adhérents."
    >
      <section className="surface-card rounded-[var(--radius-panel)] p-6 sm:p-8">
        <h2 className="text-3xl text-primary-strong">Prochaines briques</h2>
        <ul className="mt-4 space-y-3 text-base leading-7 text-muted">
          <li>Authentification email / mot de passe et session persistée.</li>
          <li>Consultation des activités et affichage de l&apos;éligibilité.</li>
          <li>Accès guidé aux documents et annonces utiles.</li>
        </ul>
      </section>
    </PageShell>
  );
}
