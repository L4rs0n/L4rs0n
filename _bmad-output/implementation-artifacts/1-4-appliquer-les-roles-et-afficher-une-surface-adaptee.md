# Story 1.4 — Appliquer les rôles et afficher une surface adaptée

Status: review

## Réalisation

- Catalogue des cinq profils du PRD et attributions multiples sur `User`.
- Rôle actif par session ; navigation et surfaces adaptées sans cumul implicite des permissions.
- Contrôles serveur centralisés sur les pages et opérations, avec refus explicite.
- Attribution des rôles réservée au rôle actif ADMIN, y compris en appel direct de l'action.
- Migration conservatrice : MEMBER uniquement pour les comptes existants et futurs.
- Tests unitaires et tests d'intégration PostgreSQL/HTTP/Server Actions ; exécution en CI.

La matrice, les décisions du MVP, le bootstrap administrateur et les commandes reproductibles figurent dans `docs/authorization.md`. Les permissions métier financières et documentaires devront être ajoutées avec les opérations correspondantes.

## Vérifications locales

- Lint, typage, génération et validation Prisma : réussis.
- 27 tests unitaires et 7 tests d'intégration : réussis.
- Build de production Next.js (Turbopack) : réussi.
- Intégration locale sur PostgreSQL embarqué PGlite, avec application des fichiers SQL et vérification de la reprise des comptes existants. Le runner restreint nécessite un contournement local de la mesure mémoire Node ; ce contournement n'est pas livré dans le dépôt.
- `prisma migrate deploy` ne peut pas exécuter son moteur natif dans ce runner ; la CI configurée utilise PostgreSQL 17 et la commande standard.
- Deux défauts préexistants de l'inscription corrigés : import navigateur de `node:crypto` et nom de champ Better Auth `member_id` au lieu de `memberId`.
