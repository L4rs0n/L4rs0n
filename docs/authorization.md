# Rôles et autorisation — story 1.4

Références : PRD FR5/FR6, NFR6/NFR18 ; architecture « Authentication & Security » ; critères de la story 1.4 dans `epics.md`.

## Modèle et matrice du MVP

Les cinq profils du PRD forment le catalogue fermé `Role`. `User.roles` est un tableau d'enum PostgreSQL : il permet plusieurs attributions sans confondre compte utilisateur et fiche membre. Le MVP n'a pas de catalogue éditable ni de permissions personnalisées. Les rôles supplémentaires passent par une migration et une politique explicite.

| Rôle actif | `/espace` | `/pilotage` | Lire et modifier les attributions |
| --- | --- | --- | --- |
| MEMBER — adhérent | Oui | Non | Non |
| ADMIN — administrateur | Non | Oui | Oui |
| TREASURER — trésorier | Non | Oui | Non |
| EVENT_MANAGER — responsable événements | Non | Oui | Non |
| COACH — responsable d'activité | Non | Oui | Non |

Les permissions dépendent du **rôle actif**, jamais de l'union des rôles attribués. Un administrateur également adhérent bascule explicitement entre ses deux surfaces. Le pilotage des autres responsables reste une surface sans données métier sensibles ; aucune permission financière, documentaire ou événementielle n'est déduite de son accès. Ces opérations nécessiteront leurs propres policies lors de leur introduction.

`Session.activeRole` conserve le choix par session, sans affecter les autres appareils. En l'absence de choix explicite, MEMBER est prioritaire, puis le premier rôle attribué selon l'ordre du catalogue. Un rôle explicitement sélectionné puis révoqué ne donne aucun droit ; la page de refus permet de sélectionner un autre rôle encore attribué.

## Frontières serveur

- `policies/roles.ts` définit catalogue, matrice et destination de chaque rôle.
- `services/authorization.ts` contrôle chaque opération et rejette les rôles non attribués ou inconnus.
- `services/authorization-repository.ts` relit la session non expirée, son propriétaire et les rôles actuels en base à chaque vérification. Le changement de rôle recontrôle aussi l'attribution dans l'écriture SQL.
- `services/access.ts` est l'entrée serveur pour les pages/actions : session absente → connexion avec callback conservé ; permission absente → `/acces-refuse`.
- `/espace` sert aussi de point d'entrée après connexion : le rôle actif responsable est redirigé vers `/pilotage`.
- `/pilotage/roles` vérifie `roles:manage` avant toute lecture de comptes. Son action d'attribution refait ce contrôle indépendamment de la page. L'écran affiche les 100 premiers comptes par email.
- `getSession()` désactive le cache cookie pour les lectures serveur afin qu'une session expirée ou supprimée ne provoque pas de boucle entre connexion et surface protégée. Les rôles et le rôle actif ne sont pas des champs d'entrée Better Auth.

Chaque nouvelle page protégée doit appeler `requireAccess(permission, callbackUrl)` avant sa lecture de données. Chaque mutation doit appeler `authorization.requirePermission(permission)` dans son service ; une vérification dans un layout ou dans la navigation ne suffit pas. Un futur route handler doit convertir `AuthorizationError.status` en réponse HTTP 401/403. Les guards actuels redirigent les pages et les formulaires vers une explication accessible.

## Compatibilité de l'authentification

Les tests HTTP ont révélé deux défauts déjà présents : l'import indirect de `node:crypto` par le formulaire d'inscription et le mapping Better Auth de `memberId` vers le nom SQL `member_id`. La constante du header est désormais dans un module compatible navigateur ; Better Auth utilise le nom du champ Prisma `memberId`, dont Prisma assure lui-même le mapping SQL. Les tokens, les contrôles d'invitation, le rattachement et les mots de passe restent identiques.

## Migration et premier administrateur

La migration ajoute uniquement MEMBER aux comptes existants et conserve utilisateurs, comptes, liens membres, invitations, mots de passe et sessions. Les futures inscriptions reçoivent le même défaut en base. Aucun rôle privilégié n'est accepté depuis le formulaire d'inscription.

Après sauvegarde et migration, un opérateur de confiance attribue le premier ADMIN à un compte précisément identifié, par exemple dans une console PostgreSQL :

```sql
UPDATE users
SET roles = ARRAY['MEMBER', 'ADMIN']::"Role"[]
WHERE email = 'administrateur-valide@example.com'
RETURNING id, email, roles;
```

L'utilisateur sélectionne ensuite Administrateur dans son espace. Les attributions suivantes se font depuis `/pilotage/roles`. Le formulaire remplace l'ensemble des rôles, exige au moins un rôle connu et élimine les doublons. Une suppression du rôle actif retire l'accès dès la prochaine vérification, même si la session reste ouverte.

## Validation

Node.js 24 ; variables de `.env.example` configurées avec un vrai secret local. La base indiquée ci-dessous doit être une **base de test dédiée**. Les tests créent et suppriment uniquement leurs propres comptes et un schéma temporaire de validation de migration.

```bash
npm ci
export DATABASE_URL='postgresql://postgres:postgres@127.0.0.1:5432/l4rs0n_test'
export TEST_DATABASE_URL="$DATABASE_URL"
npm run prisma:generate
npm run prisma:validate
npx prisma migrate deploy
npm run lint
npm run typecheck
npm test
npm run build
npm run test:integration
```

Le test d'intégration démarre et arrête lui-même `next start` sur le port 3100 (`TEST_PORT` permet de le modifier). Il vérifie l'inscription réelle par invitation, le rattachement et la consommation du lien, la tentative d'injection ADMIN, la connexion/déconnexion, les callbacks, les accès HTTP refusés, les Server Actions appelées directement, le changement de rôle, l'indépendance des sessions, la révocation immédiate et la reprise des données par la migration. Les tests unitaires couvrent la matrice entière, les rôles multiples, les valeurs invalides et le refus des opérations sans permission. La CI exécute ces étapes avec PostgreSQL 17.
