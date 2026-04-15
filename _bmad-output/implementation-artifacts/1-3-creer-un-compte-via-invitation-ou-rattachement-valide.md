# Story 1.3: Creer un compte via invitation ou rattachement valide

Status: review

## Story

As a futur utilisateur du club,  
I want creer mon acces depuis une invitation ou un rattachement autorise,  
so that mon compte applicatif corresponde a ma presence reelle dans le club.

## Acceptance Criteria

1. Etant donne qu'une invitation club ou un rattachement valide existe deja cote club, quand le visiteur ouvre le lien de creation de compte et soumet un mot de passe conforme, alors le systeme cree un compte utilisateur lie a la bonne fiche membre sans exposer de signup public libre.
2. Etant donne qu'un lien d'inscription est invalide, expire, deja consomme ou non rattachable, quand le visiteur tente de finaliser son compte, alors la creation echoue proprement et aucune liaison incorrecte n'est creee.
3. Le parcours public de creation de compte reste mobile-first, accessible, avec feedback clair, email pre-rempli ou verrouille selon le contexte, et sans fuite d'information inutile sur l'etat interne du club.
4. Les garde-fous techniques sont automatises par des tests et par les validations de depot deja en place.

## Scope et limites

- Cette story couvre un flux de creation de compte strictement controle a partir d'un rattachement ou d'une invitation deja valide cote club.
- Cette story peut introduire un modele membre minimal et un modele de jeton d'acces a l'inscription, car le membre est le centre de gravite du produit et la liaison compte↔membre est requise tres tot.
- Cette story ne couvre pas encore l'interface d'administration permettant de creer ou gerer ces invitations/rattachements: la gestion riche des fiches membres et de leurs associations appartiendra aux stories Epic 2.
- Cette story ne couvre pas encore l'application des roles et des surfaces adaptees: cela appartient a la story 1.4.
- Cette story ne doit pas transformer l'inscription en signup public generaliste ni contourner Better Auth.

## Tasks / Subtasks

- [x] Introduire le modele de donnees minimal necessaire a une inscription rattachee. (AC: 1, 2)
  - [x] Etendre `prisma/schema.prisma` avec une fiche membre minimale et un modele de rattachement / invitation strictement necessaire au flux d'inscription controle.
  - [x] Modeliser une liaison explicite entre fiche membre et compte utilisateur sans figer prematurement tout le domaine `members`.
  - [x] Generer et valider le client Prisma puis versionner une migration SQL lisible.
- [x] Mettre en place les services serveur qui valident et consomment un rattachement autorise. (AC: 1, 2)
  - [x] Creer les services de lecture, validation et consommation atomique du jeton/lien d'inscription.
  - [x] Centraliser dans le serveur la decision "ce visiteur peut-il creer un compte et pour quelle fiche membre ?".
  - [x] Prevoir les etats invalides, expires, deja utilises et deja lies a un utilisateur existant.
- [x] Ouvrir un signup Better Auth strictement garde par le club. (AC: 1, 2)
  - [x] Reconfigurer Better Auth pour accepter le signup email/mot de passe uniquement quand un rattachement valide est presente.
  - [x] Utiliser le point d'extension officiel de Better Auth pour verifier le flux `/sign-up/email` plutot que de construire un endpoint auth parallele.
  - [x] Finaliser la creation de compte en reliant la nouvelle identite a la fiche membre attendue et en marquant le rattachement comme consomme.
- [x] Construire le parcours public de creation de compte. (AC: 1, 2, 3)
  - [x] Ajouter une page publique de creation de compte basee sur le lien/token d'invitation avec etat vide/erreur lisible.
  - [x] Valider les entrees avec Zod, afficher des messages inline et garder un formulaire mobile-first avec un seul CTA principal.
  - [x] Rediriger proprement apres succes sans exposer de navigation incoherente avec les stories suivantes.
- [x] Couvrir les risques principaux par des tests et des validations de depot. (AC: 1, 2, 3, 4)
  - [x] Ajouter des tests unitaires et/ou d'integration sur la validation du token, les schemas de formulaire et la liaison membre↔compte.
  - [x] Verifier les cas limites critiques: token manquant, invalide, expire, deja consomme, fiche deja liee, tentative de signup sans rattachement valide.
  - [x] Faire passer au minimum `npm run test`, `npm run lint`, `npm run typecheck`, `npm run prisma:generate`, `npm run prisma:validate` et `npm run build`.
- [x] Mettre a jour la documentation et l'artefact de story en fin d'implementation. (AC: 4)
  - [x] Documenter dans le `README.md` le prerequis fonctionnel de creation d'un rattachement d'inscription cote club.
  - [x] Mettre a jour cette story uniquement dans les sections autorisees avec notes d'implementation, fichiers touches et validations reelles.

## Dev Notes

### Contexte utile

- La story 1.2 a deja mis en place Better Auth avec `emailAndPassword.enabled: true`, mais `disableSignUp: true`, plus la route `/api/auth/[...all]`, le client React, les pages publiques de connexion/reset et les helpers de session serveur.
- `src/features/auth/auth.ts` est donc le point canonique a faire evoluer pour ouvrir un signup controle, pas un nouveau systeme d'auth maison.
- Le domaine `members` existe comme priorite architecturale mais n'est pas encore implemente; cette story est le premier point legitime pour introduire une fiche membre minimale et sa liaison au compte auth.

### Objectif reel de la story

Le but n'est pas seulement d'ajouter une page "s'inscrire". Il faut prouver qu'un compte applicatif n'est creable que s'il correspond a une presence club deja reconnue, avec une verite serveur sur la liaison au membre et une prevention forte des creations parasites ou incorrectes.

### Garde-fous d'architecture a respecter

- Better Auth 1.6.x reste la solution auth retenue. Le flux d'inscription doit rester dans `/api/auth/[...all]`.
- Les decisions d'autorisation et de rattachement doivent rester cote serveur, dans `src/features/auth`, `src/features/members` et le bootstrap auth; jamais seulement dans l'UI.
- Le membre est le centre de gravite du produit. Introduire une fiche membre minimale ici est preferable a une logique auth isolee sans ancrage metier.
- Respecter la structure d'architecture:
  - `src/app/(public)` pour les pages publiques
  - `src/features/auth` pour le flux d'identite
  - `src/features/members` pour le modele et les services de rattachement
  - `src/app/api/auth/[...all]` comme seule frontiere HTTP auth
- Toute entree significative doit etre validee avec Zod: query param token, formulaire de creation, eventuales redirections.
- La story doit rester incrementale: pas de back-office complet de gestion membre, pas de roles club avances, pas de policy d'eligibilite complete ici.

### Structure cible recommandee pour cette story

```text
src/
  app/
    (public)/
      register/page.tsx
    api/
      auth/
        [...all]/route.ts
  features/
    auth/
      auth.ts
      auth-client.ts
      auth-schema.ts
      components/
        register-form.tsx
      services/
        registration-*.ts
    members/
      README.md
      data/
      services/
      __tests__/
```

### Exigences techniques et de securite

- Conserver un schema Prisma minimal et extensible:
  - une fiche membre minimale pour porter l'identite club
  - une relation explicite vers `User`
  - un artefact de rattachement / invitation controle, avec etat et expiration
- La consommation d'un lien/token doit etre atomique pour eviter un double usage concurrent.
- Le signup ne doit jamais etre libre: soit Better Auth reste `disableSignUp: true`, soit il est re-ouvert uniquement avec un hook serveur qui bloque toute creation sans rattachement valide. Vu la doc officielle, l'approche recommandee ici est de garder le signup dans Better Auth mais de le filtrer avec un hook officiel sur `/sign-up/email`.
- Les informations sensibles du rattachement ne doivent pas etre decidees par des donnees client libres. Le token doit pointer vers une autorisation serveur deja connue.
- Preferer un stockage hash du secret de rattachement si un jeton est genere en local, pour eviter de conserver un secret brut en base.
- Ne pas ecrire la logique de liaison membre↔compte dans la page React. La page orchestre; les services et hooks serveur decident.
- Garder `autoSignIn` explicite et coherent avec l'experience voulue. Une redirection vers la connexion peut rester acceptable si le flux complet reste simple et sur.

### Guidance UX a appliquer

- Parcours public simple, mobile-first, avec un seul CTA primaire.
- Labels visibles, aide avant erreur quand possible, erreurs inline et message calme si le lien n'est plus valable.
- Si le lien est invalide ou expire, expliquer que la creation de compte n'est pas possible et inviter a contacter le club ou demander un nouveau lien, sans jargon technique.
- L'email attendu doit etre affiche de facon claire si le flux est tokenise par email; il peut etre non editable pour eviter toute ambiguite.
- Le formulaire doit rester utilisable sans zoom horizontal a `360px`.

### Tests attendus

- Priorite de couverture:
  - validation de schema du formulaire de creation
  - verification/normalisation du token d'inscription
  - liaison membre↔utilisateur et prevention des doublons
  - refus du signup si le rattachement est absent ou invalide
- Les tests peuvent etre principalement unitaires et d'integration locale, sans ajouter un dispositif E2E lourd a ce stade.
- Les validations depot existantes restent obligatoires: `test`, `lint`, `typecheck`, `prisma:generate`, `prisma:validate`, `build`.

### Intelligence de la story precedente

- La story 1.2 a deja etabli le pattern de formulaires auth dans `src/features/auth/components`, le bootstrap Better Auth dans `src/features/auth/auth.ts` et les helpers de session dans `src/features/auth/services`.
- Le build Next.js peut necessiter une execution hors sandbox sur Windows a cause des verrous `.next-app`; ce n'est pas un signal de bug fonctionnel.
- Les surfaces `/espace` et `/pilotage` existent deja comme zones protegees minimales; inutile d'en recreer d'autres pour cette story.

### Intelligence Git recente

- `4ce5e4e feat(story-1.2): implement email password authentication flows`
- `04b0a40 feat(story-1.1): initialize Next.js application foundation`

### Informations techniques verifiees le 2026-04-15

- La doc officielle Better Auth sur les hooks recommande `createAuthMiddleware` pour personnaliser un endpoint existant comme `/sign-up/email` au lieu de construire un endpoint auth parallele.
- La doc officielle Better Auth sur les options confirme `emailAndPassword.disableSignUp`, `autoSignIn`, `minPasswordLength` et `maxPasswordLength` comme leviers principaux du flux d'inscription.
- La doc officielle Better Auth indique aussi que la table `user` peut etre etendue via des `additionalFields`, mais dans ce projet il est plus propre d'ancrer la liaison club dans le domaine `members` plutot que dans un champ auth ad hoc.
- Les typings Better Auth installes localement confirment la presence de `signUpEmail` cote API et de `fetchOptions.headers` cote client, ce qui permet d'inferer proprement un passage de jeton d'inscription via en-tete dedie lors du signup.

### Pieges a eviter

- Transformer le signup en creation de compte publique ouverte a n'importe quel email.
- Introduire un modele membre trop riche ou un back-office complet qui deborde sur Epic 2.
- Stocker le rattachement uniquement cote client ou dans l'URL sans verification serveur robuste.
- Lier un mauvais membre a un utilisateur faute de verifications atomiques.
- Dupliquer la logique dans un route handler maison alors que Better Auth expose deja le bon endpoint.
- Coupler deja ce flux a la logique de roles de la story 1.4.

### Questions ouvertes sauvegardees pour la suite

- La creation et l'administration des invitations/rattachements auront besoin d'une UI club, probablement lors des stories Epic 2.
- Le choix final entre auto-connexion post-inscription ou redirection vers la connexion pourra etre ajuste si la story 1.4 introduit une surface post-onboarding plus evidente.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3: Créer un compte via invitation ou rattachement validé]
- [Source: _bmad-output/planning-artifacts/epics.md#FR Coverage Map]
- [Source: _bmad-output/planning-artifacts/architecture.md#First Implementation Priority]
- [Source: _bmad-output/planning-artifacts/architecture.md#Requirements to Structure Mapping]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/architecture.md#MVP Priority Domains]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#10. Patterns de cohérence UX]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#11. Responsive et accessibilité]
- [Source: _bmad-output/implementation-artifacts/1-2-authentifier-un-utilisateur-par-email-et-mot-de-passe.md]
- [Source: https://www.better-auth.com/docs/concepts/hooks]
- [Source: https://better-auth.com/docs/reference/options]
- [Source: https://better-auth.com/docs/concepts/users-accounts]

## Dev Agent Record

### Agent Model Used

gpt-5 Codex

### Debug Log References

- 2026-04-15: Story 1.3 creee a partir des artefacts BMAD, de la story 1.2 deja livree et de la configuration auth actuellement presente dans le depot.
- 2026-04-15: Le flux `/register` a d'abord fait echouer le build car un composant client importait indirectement Prisma via un service serveur `members`; la constante partagee de header a ete isolee dans un module pur pour retablir la frontiere client/serveur.
- 2026-04-15: `prisma migrate diff` n'a pas pu produire automatiquement le SQL a partir du dossier `prisma/migrations` sans `migration_lock.toml`, puis sans shadow database configuree. La migration SQL de la story 1.3 a donc ete versionnee manuellement de facon coherente avec le schema Prisma final, apres validation `prisma:generate` et `prisma:validate`.
- 2026-04-15: Le build Next.js a ete verifie hors sandbox a cause des verrous de fichiers Windows sur `.next-app`.

### Completion Notes List

- Ajout d'un modele `Member` minimal et d'un modele `RegistrationGrant` tokenise pour representer un rattachement club valide avant creation de compte.
- Ouverture d'un signup Better Auth garde par hooks officiels sur `/sign-up/email`, avec injection serveur du `memberId` valide et auto-connexion apres creation reussie.
- Ajout de la page publique `/register`, du formulaire associe, des etats invalides/expire/deja utilise et de la redirection vers `/espace` apres succes.
- Ajout de helpers partages et de tests unitaires pour les schemas auth, la normalisation du token de rattachement et la protection des callbacks auth publics.
- Verifications executees avec succes: `npm run test`, `npm run lint`, `npm run typecheck`, `npm run prisma:generate`, `npm run prisma:validate`, `npm run build`.

### File List

- _bmad-output/implementation-artifacts/1-3-creer-un-compte-via-invitation-ou-rattachement-valide.md
- README.md
- prisma/schema.prisma
- prisma/migrations/migration_lock.toml
- prisma/migrations/20260415143000_story_1_3_registration_grants/migration.sql
- src/app/(public)/register/page.tsx
- src/app/(public)/sign-in/page.tsx
- src/features/auth/auth-schema.spec.ts
- src/features/auth/auth-schema.ts
- src/features/auth/auth.ts
- src/features/auth/components/register-form.tsx
- src/features/auth/components/sign-in-form.tsx
- src/features/members/README.md
- src/features/members/services/registration-grants.shared.ts
- src/features/members/services/registration-grants.spec.ts
- src/features/members/services/registration-grants.ts
- src/lib/auth/session.ts

### Change Log

- 2026-04-15: Creation de la story 1.3 avec contexte complet pour implementer un flux d'inscription prive lie a une fiche membre.
- 2026-04-15: Implementation complete du flux d'inscription prive par invitation/rattachement valide, ajout du modele membre minimal, des grants d'inscription, des hooks Better Auth, de la page `/register`, des tests associes et passage en `review`.
