# L4rs0n

Socle applicatif de L4rs0n, une application web de gestion pour club sportif amateur construite sur Next.js App Router.

## Stack de fondation

- Next.js App Router avec TypeScript et `src/`
- Tailwind CSS v4
- Prisma ORM avec PostgreSQL
- Better Auth préparé pour les futures stories d'authentification
- Zod pour la validation des variables d'environnement et des futures frontières d'entrée

## Démarrage local

1. Installer les dépendances avec `npm install`
2. Copier `.env.example` vers `.env.local`
3. Générer le client Prisma avec `npm run prisma:generate`
4. Lancer l'application avec `npm run dev`

## Commandes utiles

- `npm run lint`
- `npm run test`
- `npm run typecheck`
- `npm run build`
- `npm run prisma:generate`
- `npm run prisma:validate`

## Structure de référence

```text
src/
  app/          # routes, layouts, pages et route handlers
  components/   # UI transverse et shells de composition
  features/     # domaines métier
  lib/          # briques techniques partagées
  server/       # bootstrap serveur transversal
prisma/         # schéma Prisma et migrations
.github/        # CI
```

## Domaines préparés

- `auth`
- `members`
- `activities`
- `documents`
- `announcements`
- `audit`

## Remarques

- La story 1.1 prépare le terrain, elle n'implémente pas encore les workflows métier.
- Les décisions d'autorisation, d'éligibilité, d'audit et de visibilité doivent rester dans les services et policies de domaine, pas dans les composants UI.
- La story 1.2 branche Better Auth pour la connexion email / mot de passe, la restauration de session et le reset password.
- En environnement local sans fournisseur email réel, les URLs de reset password sont journalisées côté serveur pour faciliter le test manuel du flux.
