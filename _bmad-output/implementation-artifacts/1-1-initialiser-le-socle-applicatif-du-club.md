# Story 1.1: Initialiser le socle applicatif du club

Status: done

## Story

As a équipe produit,  
I want initialiser l'application avec le starter retenu et la structure cible,  
so that les stories suivantes s'appuient sur une base cohérente avec l'architecture validée.

## Acceptance Criteria

1. Étant donné que le dépôt d'implémentation démarre vide, quand la story est terminée, alors un projet Next.js App Router TypeScript avec `src/`, Tailwind, lint et structure de domaines existe.
2. La base de configuration pour Prisma, Better Auth, Zod et les variables d'environnement est préparée sans créer tout le modèle métier upfront.
3. Un pipeline qualité minimal de fondation exécute au moins `lint`, `typecheck` et `build` sur le dépôt dès le démarrage, prêt à être étendu par les stories d'exploitation.

## Scope et limites

- Cette story crée le socle technique et documentaire, pas les fonctionnalités métier.
- Cette story ne doit pas implémenter le flux complet d'authentification, de reset password, ni le modèle membre complet: cela appartient aux stories suivantes.
- Cette story doit préparer des points d'ancrage clairs pour `auth`, `members`, `activities`, `documents`, `announcements` et `audit`, sans sur-construire.
- Cette story doit rester portable et éviter tout verrouillage prématuré à un fournisseur hors préférences déjà documentées.

## Tasks / Subtasks

- [x] Initialiser le projet avec le starter officiel `create-next-app` aligné sur Next.js App Router, TypeScript, Tailwind, ESLint et arborescence `src/`. (AC: 1)
  - [x] Conserver une base server-first App Router et éviter tout starter alternatif (`create-t3-app`, Vite, React Router).
  - [x] Préparer les surfaces de navigation racines nécessaires au MVP sans implémenter les écrans métier complets.
- [x] Mettre en place la structure cible minimale du dépôt côté application. (AC: 1, 2)
  - [x] Créer les espaces `src/app`, `src/components`, `src/features`, `src/lib`, `src/server` selon les frontières d'architecture.
  - [x] Introduire les domaines prioritaires du MVP sous forme de squelettes sobres et documentés: `auth`, `members`, `activities`, `documents`, `announcements`, `audit`.
  - [x] Éviter tout dossier fourre-tout du type `src/lib/utils` sans responsabilité explicite.
- [x] Préparer le socle de configuration technique pour la suite. (AC: 2)
  - [x] Ajouter la base Prisma/PostgreSQL: dossier `prisma/`, configuration initiale, client partagé et point d'entrée dédié.
  - [x] Préparer la base Better Auth avec son emplacement cible côté serveur et les variables d'environnement nécessaires, sans livrer encore les parcours complets de connexion.
  - [x] Ajouter une validation d'environnement basée sur Zod pour les variables critiques.
  - [x] Fournir un `.env.example` documenté pour les secrets et URLs nécessaires.
- [x] Poser la fondation UI/design minimale utile aux prochaines stories. (AC: 1)
  - [x] Préparer les tokens sémantiques principaux et la plomberie typographique globale dans le layout/styles globaux.
  - [x] Garder les primitives UI accessibles compatibles avec `shadcn/ui` / `Radix UI`, sans construire encore les composants métier.
- [x] Mettre en place le pipeline qualité de démarrage. (AC: 3)
  - [x] Exposer des scripts de dépôt pour `lint`, `typecheck` et `build`.
  - [x] Créer un workflow GitHub Actions lançant au minimum ces trois vérifications sur le dépôt.
  - [x] Vérifier que le projet passe sur dépôt propre sans dépendre de données métier.
- [x] Documenter les conventions de base pour éviter les dérives d'implémentation dès la story 1.2. (AC: 1, 2, 3)
  - [x] Mettre à jour le `README.md` avec les commandes de démarrage et les choix structurants du socle.
  - [x] Ajouter une documentation locale légère dans les domaines réellement introduits, conformément à l'architecture.

### Review Findings

- [x] [Review][Patch] La validation Zod des variables critiques masque les erreurs de configuration avec des valeurs par défaut non sûres [`src/lib/env/server.ts:3`]
- [x] [Review][Patch] La configuration Prisma CLI ne suit pas la convention `.env.local` documentée et peut viser une mauvaise base [`prisma.config.ts:1`]
- [x] [Review][Patch] La fondation typographique demandée n'est pas réellement chargée, seules des polices de repli sont déclarées [`src/app/layout.tsx:1`]
- [x] [Review][Patch] La surface publique n'est pas segmentée sous `src/app/(public)` malgré la structure cible annoncée [`src/app/page.tsx:1`]

## Dev Notes

### Contexte utile

- Le dépôt applicatif est encore vide côté code produit: il contient surtout les artefacts BMAD et un `README.md` minimal.
- Il n'existe pas encore de story précédente ni de patterns d'implémentation locaux à réutiliser.
- L'intelligence Git disponible est limitée à des commits de bootstrap (`init`, installation BMAD, `V1`), donc l'architecture et les artefacts de planification sont les vraies sources de vérité pour cette story.

### Objectif réel de la story

Le but n'est pas "d'avancer vite sur l'auth". Le but est de créer une base propre qui empêche les stories suivantes de partir dans des directions incompatibles: mauvais starter, mauvaise structure, logique métier mal placée, dépendances superflues, variables d'environnement non validées, ou CI absente.

### Garde-fous d'architecture à respecter

- Utiliser `create-next-app` et rester sur Next.js App Router avec TypeScript et Tailwind comme base officielle.
- Respecter une architecture server-first:
  - Server Actions pour les mutations same-origin à venir.
  - Route Handlers uniquement pour les frontières HTTP explicites.
- Garder le métier dans `src/features/*`, pas dans `src/app/*`, pas dans `src/server`, pas dans les composants UI.
- Préparer les dossiers suivants comme structure cible, mais créer seulement les éléments nécessaires à cette story:
  - `src/app`
  - `src/components`
  - `src/features/<domain>`
  - `src/lib`
  - `src/server`
  - `prisma`
  - `.github/workflows`
- Les décisions critiques d'autorisation, d'éligibilité, de visibilité, d'audit et de gouvernance documentaire devront vivre plus tard dans `services` et `policies`, pas dans les pages ou composants.

### Structure cible minimale recommandée

```text
src/
  app/
    (public)/
    (member)/
    (admin)/
    api/
  components/
  features/
    auth/
    members/
    activities/
    documents/
    announcements/
    audit/
  lib/
    db/
    env/
    errors/
    http/
    logging/
  server/
    bootstrap/
prisma/
tests/
  e2e/
.github/
  workflows/
```

### Contraintes de conception importantes

- Ne pas créer tout le modèle Prisma métier upfront. Se limiter au strict nécessaire pour la fondation technique et l'auth future.
- Ne pas construire de pseudo-framework interne ni de couche abstraite inutile.
- Ne pas introduire Redis, state manager global ou couche RPC additionnelle: l'architecture les exclut pour la V1.
- Ne pas disperser les validations: toute entrée significative doit être validée avec Zod au plus près de la frontière.
- Ne pas laisser `src/server` devenir une seconde couche métier parallèle à `src/features`.
- Ne pas faire de composants métier UI à ce stade; seulement la fondation de surface et de thème.

### Guidance Prisma / Better Auth / env

- La base de données cible est PostgreSQL 16 managé.
- Prisma ORM et Prisma Migrate sont les outils attendus pour l'accès aux données et les migrations.
- Better Auth est le choix d'authentification retenu pour les comptes persistés et les sessions serveur.
- La story doit préparer le terrain pour un futur `src/app/api/auth/[...all]/route.ts`, mais sans forcer une implémentation prématurée si elle n'est pas nécessaire pour satisfaire les AC.
- Les variables d'environnement à préparer dans `.env.example` doivent au minimum couvrir:
  - URL d'application
  - URL de base de données
  - secret(s) d'authentification
  - configuration minimale liée aux futures intégrations email si un placeholder est utile

### Guidance UX de fondation

- Définir les tokens sémantiques avant les composants métier.
- Préparer la hiérarchie typographique avec:
  - `Barlow Condensed` pour les titres
  - `Source Sans 3` pour l'interface
  - `IBM Plex Mono` pour les références ponctuelles
- Garder une base mobile-first et accessible, même si cette story ne livre pas encore de parcours riche.
- Prévoir des primitives compatibles avec `shadcn/ui` et `Radix UI` pour éviter des divergences futures sur focus, overlays et accessibilité.

### Testing Requirements

- Le minimum obligatoire pour cette story est:
  - `lint`
  - `typecheck`
  - `build`
- Il n'est pas requis d'installer tout le dispositif de tests E2E dès maintenant si cela n'aide pas à satisfaire les AC.
- Si une logique non triviale est introduite pour l'environnement ou des helpers critiques, ajouter des tests ciblés seulement si le setup reste léger et utile.
- La story est considérée réussie seulement si les commandes de qualité tournent localement et dans GitHub Actions.

### Définition de done pratique

- Le dépôt contient un projet Next.js App Router TypeScript fonctionnel sous `src/`.
- La structure de domaines initiale est visible et cohérente avec l'architecture.
- Les points d'entrée pour Prisma, Better Auth, Zod et l'environnement sont préparés sans sur-implémentation métier.
- Les scripts `lint`, `typecheck` et `build` existent et passent.
- Le workflow GitHub Actions exécute ces contrôles.
- Le `README.md` explique comment lancer et vérifier le socle.

### Informations techniques vérifiées le 2026-04-14

- La documentation officielle Next.js confirme que `create-next-app` configure nativement TypeScript et installe les dépendances nécessaires; cela renforce le choix d'un bootstrap officiel plutôt qu'un assemblage manuel.
- La documentation Prisma confirme le positionnement de Prisma ORM comme ORM Node.js/TypeScript avec schéma, client typé et migrations automatisées; dans ce projet, la version à suivre reste celle épinglée par l'architecture.
- La documentation Better Auth confirme un modèle de session cookie-based avec persistance et expiration configurable; cela valide la préparation précoce des variables/env et du point d'ancrage auth, même si les parcours complets arrivent en story 1.2.

### Project Structure Notes

- Aucun conflit local détecté avec une base applicative existante: la story part d'un dépôt sans implémentation produit.
- L'architecture précise que sa structure est une cible de référence, pas une obligation de tout créer d'un coup. Il faut donc créer un squelette utile, pas une arborescence artificielle exhaustive.
- Les segments `(admin)` et `(member)` représentent des surfaces d'expérience, pas des domaines métier.

### Risques et pièges à éviter

- Confondre "préparer Better Auth" avec "implémenter déjà toute l'auth".
- Créer un schéma Prisma trop large ou spéculatif.
- Mettre la logique métier directement dans les pages App Router ou dans des composants.
- Ajouter des dépendances non justifiées par l'architecture simplement parce qu'elles sont populaires.
- Oublier les tokens UX de base, ce qui ferait diverger les stories UI suivantes.
- Laisser la CI pour plus tard: cette story doit justement verrouiller la qualité minimale dès le départ.

### Questions ouvertes sauvegardées pour la suite

- Aucune question bloquante pour créer cette story.
- Les arbitrages fins sur les permissions, le cycle d'adhésion exact et les flux d'auth détaillés restent pour les stories et décisions suivantes, comme déjà indiqué par le PRD et l'architecture.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1: Initialiser le socle applicatif du club]
- [Source: _bmad-output/planning-artifacts/epics.md#Additional Requirements]
- [Source: _bmad-output/planning-artifacts/architecture.md#Selected Starter: create-next-app]
- [Source: _bmad-output/planning-artifacts/architecture.md#Critical Technical Decisions]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns]
- [Source: _bmad-output/planning-artifacts/architecture.md#MVP Priority Domains]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#5. Fondation du design system]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#6. Fondation visuelle]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#11. Responsive et accessibilité]
- [Source: https://nextjs.org/docs/pages/api-reference/config/typescript]
- [Source: https://docs.prisma.io/docs/v6/orm]
- [Source: https://beta.better-auth.com/docs/concepts/session-management]

## Dev Agent Record

### Agent Model Used

gpt-5 Codex

### Debug Log References

- Story développée depuis un dépôt sans application produit préexistante.
- Bootstrap officiel Next.js généré puis intégré dans le repo.
- Prisma 7 a nécessité un ajustement de fondation via `prisma.config.ts` et adapter Postgres.
- Le build Next.js a été validé hors sandbox à cause d'un verrouillage Windows sur les fichiers de sortie.

### Completion Notes List

- Socle Next.js App Router + TypeScript + Tailwind installé et configuré avec `src/`.
- Surfaces racines `/`, `/espace`, `/pilotage` et endpoint `/api/health` ajoutés pour ancrer les futures stories.
- Fondations métier posées sous `src/features`, `src/lib`, `src/server` et `prisma/`.
- Validation d'environnement Zod, bootstrap Better Auth et client Prisma Postgres préparés sans implémentation métier avancée.
- CI GitHub Actions ajoutée avec `lint`, `typecheck`, `prisma:generate` et `build`.
- Vérifications exécutées avec succès: `npm run lint`, `npm run typecheck`, `npm run prisma:generate`, `npm run prisma:validate`, `npm run build`.

### File List

- .env.example
- .github/workflows/quality.yml
- .gitignore
- README.md
- _bmad-output/implementation-artifacts/1-1-initialiser-le-socle-applicatif-du-club.md
- eslint.config.mjs
- next.config.ts
- package-lock.json
- package.json
- postcss.config.mjs
- prisma.config.ts
- prisma/schema.prisma
- public/file.svg
- public/globe.svg
- public/next.svg
- public/vercel.svg
- public/window.svg
- src/app/(admin)/pilotage/page.tsx
- src/app/(member)/espace/page.tsx
- src/app/api/health/route.ts
- src/app/favicon.ico
- src/app/globals.css
- src/app/layout.tsx
- src/app/page.tsx
- src/components/layout/page-shell.tsx
- src/components/ui/link-card.tsx
- src/features/activities/README.md
- src/features/announcements/README.md
- src/features/audit/README.md
- src/features/auth/README.md
- src/features/documents/README.md
- src/features/members/README.md
- src/lib/db/client.ts
- src/lib/env/public.ts
- src/lib/env/server.ts
- src/lib/errors/app-error.ts
- src/lib/http/api-result.ts
- src/lib/logging/logger.ts
- src/server/bootstrap/auth.ts
- tsconfig.json

### Change Log

- 2026-04-15: Implémentation complète du socle applicatif Story 1.1, validation Prisma 7, ajout du pipeline qualité et passage en `review`.
