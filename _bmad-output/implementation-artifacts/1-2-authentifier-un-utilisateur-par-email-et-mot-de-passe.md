# Story 1.2: Authentifier un utilisateur par email et mot de passe

Status: review

## Story

As a adhérent ou responsable,  
I want me connecter, rester connecté et réinitialiser mon mot de passe,  
so that je puisse accéder simplement et de manière sécurisée à mon espace club.

## Acceptance Criteria

1. Étant donné qu’un utilisateur possède un compte actif, quand il saisit des identifiants valides, alors le système ouvre une session persistée côté serveur avec cookies sécurisés.
2. Étant donné qu’un utilisateur revient avec une session encore valide, quand il recharge l’application ou revisite une surface protégée, alors sa session est restaurée de manière fiable sans ressaisie inutile.
3. Étant donné qu’un utilisateur lance une réinitialisation de mot de passe, quand il fournit son email puis définit un nouveau mot de passe valide, alors le système permet la récupération de compte sans exposer d’informations sensibles ni de fuite d’énumération évitable.
4. Les écrans, messages et états critiques de connexion et de récupération de compte restent accessibles, mobile-first et conformes aux exigences de sécurité et d’ergonomie documentées.

## Scope et limites

- Cette story couvre le flux email/mot de passe, la persistance de session, le sign-out minimal utile et la récupération de mot de passe.
- Cette story prépare les bases de rôle et de guards de session, mais ne livre pas encore la surface adaptative complète par rôle: cela appartient à la story 1.4.
- Cette story ne couvre pas l’inscription par invitation ou rattachement: cela appartient à la story 1.3.
- Cette story ne doit pas introduire de policy métier d’éligibilité, de gestion membre ou d’administration de cycle de vie de compte.
- Cette story ne doit pas inventer un système auth maison alors que Better Auth est la solution retenue.

## Tasks / Subtasks

- [x] Mettre à niveau la fondation serveur Better Auth et la persistance Prisma pour les comptes et sessions. (AC: 1, 2, 3)
  - [x] Étendre `prisma/schema.prisma` avec les modèles strictement nécessaires au socle Better Auth (`User`, `Session`, `Account`, `Verification`) en respectant les conventions Prisma/SQL documentées.
  - [x] Générer et valider le client Prisma après mise à jour du schéma.
  - [x] Remplacer le simple bootstrap actuel par une instance Better Auth réellement configurée avec adapter Prisma, email/password activé, reset password et sessions persistées.
  - [x] Prévoir le callback d’envoi d’email de reset sous forme d’adaptateur local contrôlé, avec fallback de développement explicite tant qu’aucun fournisseur réel n’est branché.
- [x] Exposer les frontières auth attendues par l’architecture. (AC: 1, 2, 3)
  - [x] Créer `src/app/api/auth/[...all]/route.ts` via l’intégration Next.js officielle de Better Auth.
  - [x] Introduire un client auth réutilisable pour les composants interactifs et la lecture de session.
  - [x] Ajouter les helpers serveur minimums pour lire la session et exiger une authentification sur les futures surfaces protégées.
- [x] Implémenter les parcours UI de connexion et de récupération de compte. (AC: 1, 3, 4)
  - [x] Créer une page publique de connexion mobile-first avec formulaire accessible, validation Zod, messages inline et état pending.
  - [x] Créer une page publique de demande de réinitialisation de mot de passe avec message de confirmation non révélateur.
  - [x] Créer une page publique de définition du nouveau mot de passe à partir du token Better Auth.
  - [x] Ajouter un point de sortie de session utilisable depuis les surfaces existantes sans surcharger la navigation.
- [x] Assurer la restauration de session et la redirection cohérente des surfaces existantes. (AC: 2, 4)
  - [x] Faire lire la session côté serveur sur `/espace` et `/pilotage` pour afficher un état authentifié cohérent.
  - [x] Prévoir une redirection propre depuis la connexion vers la bonne surface par défaut sans figer encore la logique multi-rôle avancée.
  - [x] Protéger les accès évidents pour éviter qu’une surface présentée comme authentifiée reste entièrement publique.
- [x] Couvrir les garde-fous qualité et sécurité de la story. (AC: 1, 2, 3, 4)
  - [x] Ajouter des tests unitaires et/ou d’intégration ciblant les schémas auth, les helpers de redirection et les points sensibles du flux.
  - [x] Vérifier les cas d’erreur critiques: identifiants invalides, email absent, mot de passe trop faible, token de reset invalide ou expiré.
  - [x] Faire passer au minimum `lint`, `typecheck`, `prisma:generate`, `prisma:validate` et `build`, plus les tests ajoutés pour cette story.
- [x] Mettre à jour la documentation et l’artefact de story à la fin de l’implémentation. (AC: 4)
  - [x] Documenter dans `README.md` les prérequis auth locaux utiles à la story.
  - [x] Mettre à jour cette story uniquement dans les sections autorisées avec notes d’implémentation, fichiers touchés et validations réellement exécutées.

## Dev Notes

### Contexte utile

- La story 1.1 a déjà posé `src/lib/db/client.ts`, `src/lib/env/server.ts`, `src/server/bootstrap/auth.ts` et la structure de domaines.
- Aucun modèle Prisma métier n’existe encore: le premier vrai schéma introduit ici doit rester centré sur l’auth, sans embarquer prématurément `Member`, rôles club ou autres objets métier.
- Les surfaces actuelles sont `/`, `/espace` et `/pilotage`. Elles sont encore purement démonstratives et constituent de bons points d’ancrage pour commencer à restaurer/protéger une session.

### Objectif réel de la story

Le but n’est pas seulement d’afficher un formulaire. Il faut mettre en place la première authentification réellement exploitable du produit avec une vérité serveur sur la session, une persistance fiable, une récupération de mot de passe non naïve et une base réutilisable pour les stories 1.3, 1.4 et 1.5.

### Garde-fous d’architecture à respecter

- Better Auth 1.6.x est la solution retenue pour l’authentification email/mot de passe, les sessions persistées et le reset password.
- Les cookies et la lecture de session côté serveur sont la source de vérité; ne pas basculer sur un JWT purement client.
- `src/app/api/auth/[...all]/route.ts` est la frontière HTTP auth attendue par l’architecture.
- Les pages et composants orchestrent; les décisions auth et session doivent rester dans `src/features/auth`, `src/server/bootstrap` et helpers serveur dédiés.
- Toute entrée significative doit être validée avec Zod au plus près de la frontière: formulaires, callbacks token, paramètres de redirection.
- Éviter tout couplage prématuré avec la logique métier des rôles club. Pour cette story, une surface par défaut cohérente suffit.

### Structure cible recommandée pour cette story

```text
src/
  app/
    (public)/
      sign-in/page.tsx
      forgot-password/page.tsx
      reset-password/page.tsx
    api/
      auth/
        [...all]/route.ts
  features/
    auth/
      auth.ts
      auth-client.ts
      auth-schema.ts
      services/
        get-session.ts
        require-auth.ts
      components/
        sign-in-form.tsx
        forgot-password-form.tsx
        reset-password-form.tsx
      __tests__/
  lib/
    auth/
      session.ts
```

### Exigences techniques et de sécurité

- Conserver un schéma Prisma minimal et lisible, compatible avec Better Auth Prisma Adapter.
- Respecter les conventions de nommage documentées:
  - modèles Prisma en `PascalCase` singulier ;
  - propriétés TypeScript en `camelCase` ;
  - mapping SQL en `snake_case` via `@map` / `@@map` si nécessaire.
- Les surfaces protégées ne doivent pas prendre de décision d’accès uniquement côté client.
- Les messages de récupération de mot de passe ne doivent pas révéler de façon explicite si un email est connu.
- Les erreurs UI doivent être contrôlées, contextualisées et sans stack trace brute.
- Prévoir des cookies sécurisés et une base URL cohérente avec `APP_BASE_URL` / `BETTER_AUTH_URL`.
- Le reset password doit utiliser les points d’entrée Better Auth officiels (`requestPasswordReset`, `resetPassword`) plutôt qu’un flux ad hoc.

### Guidance UX à appliquer

- Mobile-first sur les formulaires d’authentification.
- Labels visibles, aide avant erreur quand possible, validation inline sur les champs critiques.
- Un seul CTA primaire par écran.
- Succès: feedback visible et calme.
- Erreurs: message inline près du problème et résumé seulement si nécessaire.
- Taille de cible tactile suffisante, ordre de tabulation cohérent, focus visible et alternatives textuelles si une icône est utilisée.
- L’authentification doit rester utilisable sans zoom horizontal à `360px` de large.

### Tests attendus

- Priorité de couverture: auth, validations, helpers de session, redirections et erreurs critiques.
- Les tests peuvent être unitaires et d’intégration légers, co-localisés dans le domaine `auth`.
- Ne pas ajouter un dispositif E2E lourd si cela retarde inutilement la story; en revanche, ne pas livrer le flux sans garde-fous automatisés.
- Les validations minimales de dépôt déjà en place restent obligatoires: `lint`, `typecheck`, `prisma:generate`, `prisma:validate`, `build`.

### Intelligence de la story précédente

- La story 1.1 a déjà validé la structure `src/app`, `src/features`, `src/lib`, `src/server`, le client Prisma partagé et la validation d’environnement.
- Le build Next.js a pu nécessiter une exécution hors sandbox sur Windows à cause de verrous de fichiers `.next-app`; ne pas confondre ce problème d’environnement avec un problème de code.
- Les dépendances déjà installées sont cohérentes avec la suite: `better-auth`, `@better-auth/prisma-adapter` via le package principal, `@prisma/client`, `prisma`, `zod`, `pg`.

### Intelligence Git récente

- `04b0a40 feat(story-1.1): initialize Next.js application foundation`
- Les patterns déjà introduits doivent être prolongés, pas remplacés: `src/server/bootstrap/auth.ts`, `src/lib/db/client.ts`, validation Zod et surfaces `/espace` / `/pilotage`.

### Informations techniques vérifiées le 2026-04-15

- La documentation Better Auth confirme l’activation du flux email/password via `emailAndPassword.enabled`, avec `sendResetPassword`, expiration du token et options de sécurité associées.
- Les typings Better Auth installés dans le repo confirment les endpoints clés attendus: `signInEmail`, `getSession`, `requestPasswordReset`, `resetPassword`, ainsi que l’intégration Next.js `toNextJsHandler`.
- La documentation Prisma confirme qu’en Prisma 7 la configuration datasource passe par `prisma.config.ts`, ce qui est déjà aligné avec le socle posé en 1.1.

### Pièges à éviter

- Créer un faux système de session parallèle à Better Auth.
- Déduire trop tôt les rôles et redirections finales alors que la story 1.4 n’est pas encore implémentée.
- Mélanger le futur parcours d’inscription avec cette story de connexion/récupération.
- Laisser des surfaces dites protégées accessibles sans contrôle serveur.
- Faire du reset password une simple page cosmétique sans intégration réelle au backend auth.
- Introduire des messages de sécurité trop bavards côté UI.

### Questions ouvertes sauvegardées pour la suite

- La stratégie précise de choix de surface par rôle actif sera stabilisée avec la story 1.4.
- Le fournisseur email réel reste à brancher plus tard; pour cette story, un adaptateur de développement contrôlé est acceptable s’il garde l’API de sortie claire.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2: Authentifier un utilisateur par email et mot de passe]
- [Source: _bmad-output/planning-artifacts/prd.md#Gestion des comptes et accès]
- [Source: _bmad-output/planning-artifacts/prd.md#Security]
- [Source: _bmad-output/planning-artifacts/prd.md#Accessibility]
- [Source: _bmad-output/planning-artifacts/architecture.md#Authentication & Security]
- [Source: _bmad-output/planning-artifacts/architecture.md#API & Communication Patterns]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#10. Patterns de cohérence UX]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#11. Responsive et accessibilité]
- [Source: _bmad-output/implementation-artifacts/1-1-initialiser-le-socle-applicatif-du-club.md]
- [Source: https://better-auth.com/docs/reference/options]
- [Source: https://www.better-auth.com/docs/concepts/client]
- [Source: https://docs.prisma.io/docs/v6/orm/reference/prisma-cli-reference]

## Dev Agent Record

### Agent Model Used

gpt-5 Codex

### Debug Log References

- Story créée à partir des artefacts BMAD complets, de la story 1.1 et des dépendances effectivement présentes dans le dépôt.
- Les pages existantes `/espace` et `/pilotage` ont été converties en surfaces protégées avec lecture de session côté serveur.
- Prisma 7 a nécessité un passage par exécution hors sandbox pour `generate`, `validate` et la génération de migration SQL à cause du téléchargement des moteurs.
- Le `build` Next.js a de nouveau dû être validé hors sandbox sur Windows à cause des verrous de `.next-app`.

### Completion Notes List

- Better Auth est maintenant branché avec adapter Prisma, sessions persistées et reset password activé.
- La frontière `/api/auth/[...all]` est en place avec pages publiques `/sign-in`, `/forgot-password` et `/reset-password`.
- Les surfaces `/espace` et `/pilotage` exigent désormais une session valide lue côté serveur et exposent un point de déconnexion minimal.
- Des tests unitaires couvrent les schémas auth et la sanitisation des redirections pour éviter les erreurs de flux et les open redirects naïfs.
- Une migration SQL initiale des tables auth a été générée dans `prisma/migrations/20260415130000_story_1_2_auth_foundation/migration.sql`.
- Vérifications exécutées avec succès: `npm run test`, `npm run lint`, `npm run typecheck`, `npm run prisma:generate`, `npm run prisma:validate`, `npm run build`.

### File List

- _bmad-output/implementation-artifacts/1-2-authentifier-un-utilisateur-par-email-et-mot-de-passe.md
- README.md
- package.json
- prisma/schema.prisma
- prisma/migrations/20260415130000_story_1_2_auth_foundation/migration.sql
- src/app/(admin)/pilotage/page.tsx
- src/app/(member)/espace/page.tsx
- src/app/(public)/forgot-password/page.tsx
- src/app/(public)/reset-password/page.tsx
- src/app/(public)/sign-in/page.tsx
- src/app/api/auth/[...all]/route.ts
- src/features/auth/auth-client.ts
- src/features/auth/auth-schema.spec.ts
- src/features/auth/auth-schema.ts
- src/features/auth/auth.ts
- src/features/auth/components/auth-page-shell.tsx
- src/features/auth/components/forgot-password-form.tsx
- src/features/auth/components/reset-password-form.tsx
- src/features/auth/components/sign-in-form.tsx
- src/features/auth/components/sign-out-button.tsx
- src/features/auth/services/get-session.ts
- src/features/auth/services/require-auth.ts
- src/features/auth/services/send-reset-password-email.ts
- src/lib/auth/session.spec.ts
- src/lib/auth/session.ts
- src/server/bootstrap/auth.ts
- tsconfig.json

### Change Log

- 2026-04-15: Création de la story 1.2 avec contexte de mise en œuvre Better Auth, Prisma, sécurité, UX et continuité depuis la story 1.1.
- 2026-04-15: Implémentation complète de l’authentification email / mot de passe, protection des surfaces existantes, ajout des tests auth et passage en `review`.
