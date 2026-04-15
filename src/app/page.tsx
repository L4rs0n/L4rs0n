import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { LinkCard } from "@/components/ui/link-card";

const foundationBlocks = [
  {
    title: "Socle App Router",
    description:
      "Next.js App Router, TypeScript, Tailwind CSS et séparation claire des surfaces d'expérience.",
  },
  {
    title: "Frontières métier",
    description:
      "Les domaines prioritaires du MVP sont préparés sous `src/features` pour éviter la logique dispersée.",
  },
  {
    title: "Fondation qualité",
    description:
      "Le dépôt est prêt à porter lint, typecheck, build et un pipeline CI minimal dès la première story.",
  },
];

const navigationCards = [
  {
    href: "/espace",
    eyebrow: "Surface adhérent",
    title: "Préparer les parcours mobiles",
    description:
      "Zone de référence pour les futures pages de consultation, d'éligibilité et d'inscription.",
  },
  {
    href: "/pilotage",
    eyebrow: "Surface responsable",
    title: "Préparer le pilotage du club",
    description:
      "Zone de départ pour les futures vues d'administration, de conformité et d'exploitation.",
  },
];

export default function HomePage() {
  return (
    <PageShell
      eyebrow="Story 1.1"
      title="Initialiser un socle robuste avant d'attaquer le métier"
      description="Cette page confirme que l'application démarre sur un socle server-first, lisible et prêt à accueillir les domaines prioritaires de L4rs0n."
    >
      <section className="grid gap-5 lg:grid-cols-[1.3fr_0.9fr]">
        <article className="surface-card rounded-[var(--radius-panel)] p-6 sm:p-8">
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-primary-strong">
              Mono-club, mobile-first, server-first
            </span>
            <h2 className="text-3xl leading-none text-primary-strong sm:text-4xl">
              Une base sobre, mais déjà orientée livraison
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              Le MVP de L4rs0n doit rester simple à exploiter pour une petite
              équipe, sans sacrifier la clarté de l&apos;architecture. Cette
              fondation prépare les futurs modules `auth`, `members`,
              `activities`, `documents`, `announcements` et `audit`.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-3 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2"
                href="/pilotage"
              >
                Ouvrir la surface responsable
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-white/70 px-5 py-3 text-base font-semibold text-primary-strong transition-colors hover:bg-surface-contrast focus-visible:outline-2 focus-visible:outline-offset-2"
                href="/espace"
              >
                Ouvrir la surface adhérent
              </Link>
            </div>
          </div>
        </article>

        <aside className="surface-card rounded-[var(--radius-panel)] p-6 sm:p-8">
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
              Architecture
            </p>
            <ul className="space-y-3 text-base leading-7 text-muted">
              <li>Server Actions pour les mutations same-origin.</li>
              <li>Route Handlers pour les frontières HTTP explicites.</li>
              <li>Prisma + PostgreSQL comme base de persistance relationnelle.</li>
              <li>Zod aux frontières d&apos;entrée et env validé.</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {foundationBlocks.map((block) => (
          <article
            key={block.title}
            className="surface-card rounded-[var(--radius-card)] p-5"
          >
            <h2 className="text-2xl text-primary-strong">{block.title}</h2>
            <p className="mt-3 text-base leading-7 text-muted">
              {block.description}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {navigationCards.map((card) => (
          <LinkCard key={card.href} {...card} />
        ))}
      </section>
    </PageShell>
  );
}
