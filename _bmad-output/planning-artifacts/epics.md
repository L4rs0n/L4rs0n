---
title: "Epic Breakdown: L4rs0n"
status: "complete"
created: "2026-04-08T21:46:26.1074062+02:00"
updated: "2026-04-08T21:46:26.1074062+02:00"
workflowType: "epics-and-stories"
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
lastStep: 4
completedAt: "2026-04-08T21:46:26.1074062+02:00"
project_name: "L4rs0n"
user_name: "LUTCHANAH Kévin"
date: "2026-04-08T21:46:26.1074062+02:00"
---

# L4rs0n - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for L4rs0n, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories sized for sequential development.

## Requirements Inventory

### Functional Requirements

FR1: Un visiteur peut créer un compte utilisateur à partir d'une invitation ou d'un rattachement validé par le club.  
FR2: Un utilisateur peut se connecter avec une adresse email et un mot de passe.  
FR3: Un utilisateur peut réinitialiser son mot de passe.  
FR4: Un administrateur peut activer, désactiver, archiver et réactiver un compte.  
FR5: Un administrateur peut attribuer plusieurs rôles à un même utilisateur.  
FR6: Le système peut appliquer des permissions différentes selon le rôle actif de l'utilisateur.  
FR7: Un administrateur peut créer une fiche membre.  
FR8: Un administrateur peut modifier les informations principales d'une fiche membre.  
FR9: Un administrateur peut définir le statut d'adhésion d'un membre.  
FR10: Un administrateur peut associer un utilisateur applicatif à une fiche membre.  
FR11: Un administrateur peut archiver une fiche membre sans supprimer son historique utile.  
FR12: Un responsable autorisé peut consulter la liste des membres avec recherche et filtres.  
FR13: Un responsable autorisé peut enregistrer le statut de cotisation d'un membre.  
FR14: Le système peut distinguer un membre à jour, en attente ou non à jour de cotisation.  
FR15: Le système peut bloquer l'inscription d'un membre non éligible à un événement ou un entraînement.  
FR16: Le système peut afficher à l'adhérent la raison de son inéligibilité.  
FR17: Un responsable autorisé peut consulter les membres bloqués pour cause de cotisation ou document manquant.  
FR18: Un responsable autorisé peut déposer un document sur une fiche membre.  
FR19: Le système peut marquer un type de document comme obligatoire.  
FR20: Le système peut signaler l'absence d'un document obligatoire.  
FR21: Un utilisateur autorisé peut consulter un document selon ses permissions.  
FR22: Un administrateur peut publier des documents généraux du club dans un espace documentaire partagé.  
FR23: Un responsable autorisé peut créer un événement.  
FR24: Un responsable autorisé peut publier, modifier, reporter ou annuler un événement.  
FR25: Un événement peut comporter une date, une heure, un lieu, une description, une capacité et un statut.  
FR26: Un adhérent éligible peut s'inscrire à un événement publié.  
FR27: Un adhérent inscrit peut se désinscrire d'un événement selon les règles définies par le club.  
FR28: Le système peut suivre le nombre de places restantes.  
FR29: Un responsable autorisé peut consulter la liste des participants et leur statut.  
FR30: Le système peut notifier les personnes concernées lors d'une création, modification ou annulation d'événement.  
FR31: Un responsable autorisé peut créer une rencontre inter-clubs.  
FR32: Une rencontre inter-clubs peut contenir le club adverse, le type de rencontre, la date, l'horaire, le lieu et les informations pratiques.  
FR33: Un responsable autorisé peut associer des participants ou convoqués à une rencontre inter-clubs.  
FR34: Un responsable autorisé peut mettre à jour une rencontre inter-clubs jusqu'à sa clôture.  
FR35: Les utilisateurs concernés peuvent consulter les informations d'une rencontre inter-clubs les concernant.  
FR36: Un responsable autorisé peut créer un créneau de gymnase.  
FR37: Un responsable autorisé peut modifier, annuler ou republier un créneau.  
FR38: Un créneau peut être lié à un entraînement, un événement ou une activité du club.  
FR39: Le système peut détecter les conflits entre créneaux pour une même ressource planifiée.  
FR40: Les adhérents peuvent consulter les créneaux publiés qui les concernent.  
FR41: Le système peut notifier les changements significatifs sur les créneaux publiés.  
FR42: Un administrateur peut créer et gérer des canaux d'information.  
FR43: Un responsable autorisé peut publier une annonce dans un canal.  
FR44: Le système peut cibler la diffusion d'une annonce selon des rôles ou audiences définies.  
FR45: Un adhérent peut consulter les annonces qui lui sont destinées.  
FR46: Un administrateur peut consulter un tableau de bord synthétique des opérations courantes du club.  
FR47: Le système peut historiser les actions d'administration sensibles.  
FR48: Un administrateur peut consulter un journal des changements majeurs.  
FR49: Un administrateur peut configurer les informations générales du club utilisées dans l'application.

### NonFunctional Requirements

NFR1: Les listes principales doivent répondre en moins de 2 secondes pour 95 % des requêtes sous charge nominale.  
NFR2: L'inscription et la désinscription à un événement doivent être confirmées en moins de 3 secondes pour 95 % des opérations.  
NFR3: La recherche membre doit répondre en moins de 2 secondes pour 95 % des requêtes sur 150 adhérents.  
NFR4: Les échanges authentifiés doivent être chiffrés via TLS.  
NFR5: Les mots de passe doivent être stockés avec un hachage conforme à l'état de l'art.  
NFR6: Les rôles et permissions doivent être appliqués sur 100 % des écrans et opérations protégés.  
NFR7: Les actions sensibles doivent être journalisées avec acteur, horodatage et type d'action.  
NFR8: Le système doit permettre suppression ou anonymisation des données d'un membre selon les règles applicables.  
NFR9: La disponibilité mensuelle visée est de 99,5 % hors maintenance planifiée.  
NFR10: Une sauvegarde complète quotidienne des données métier et documentaires doit exister.  
NFR11: La restauration après incident majeur doit pouvoir être réalisée en moins de 24 heures.  
NFR12: Le système doit supporter un club de 150 adhérents sans dégradation notable.  
NFR13: Le système doit absorber un pic de 100 connexions actives sur 15 minutes lors d'une ouverture d'inscription.  
NFR14: Les parcours critiques doivent respecter WCAG 2.1 niveau AA.  
NFR15: Les parcours critiques doivent être pleinement utilisables sur mobile sans zoom horizontal.  
NFR16: L'origine et la date des consentements ou validations requis doivent être traçables.  
NFR17: Une politique de confidentialité et les informations de traitement doivent être accessibles à tout utilisateur authentifié.  
NFR18: La visibilité des données financières et documentaires sensibles doit être limitée aux rôles autorisés.

### Additional Requirements

- Initialiser le projet avec `create-next-app`, TypeScript, App Router, `src/`, Tailwind CSS et linter.  
- Conserver une architecture de monolithe modulaire server-first cohérente avec Next.js App Router.  
- Utiliser PostgreSQL 16 comme base relationnelle principale.  
- Utiliser Prisma ORM et Prisma Migrate pour la persistance et les migrations.  
- Utiliser Better Auth avec flux email/mot de passe, reset password et sessions persistées.  
- Appliquer un RBAC côté serveur complété par des policies métier pour l'éligibilité, la visibilité et les actions sensibles.  
- Séparer clairement surfaces `app`, services métier, couche data et policies.  
- Stocker les métadonnées documentaires en base relationnelle et les binaires en stockage objet privé S3-compatible.  
- Distinguer audit métier, logs techniques et messages UX.  
- Prévoir notifications applicatives et fournisseur email encapsulé dans un adaptateur dédié.  
- Structurer l'application par domaines métier prioritaires : auth, members, activities, documents, announcements, audit.  
- Prévoir pipeline CI avec lint, typecheck, tests et build.  
- Déployer sur une plateforme simple compatible Next.js, avec portabilité d'hébergement préservée.  
- Créer les tables et entités uniquement au moment où une story en a besoin, jamais en lot global upfront.

### UX Design Requirements

UX-DR1: Implémenter des design tokens sémantiques pour couleurs, typographie, rayons, ombres et espacements.  
UX-DR2: Mettre en place une navigation différenciée adhérent / responsable avec comportement responsive.  
UX-DR3: Créer un badge d'éligibilité réutilisable affichant état, libellé et variante visuelle.  
UX-DR4: Créer un panneau de conformité membre regroupant cotisation, documents manquants et actions correctives.  
UX-DR5: Créer une carte activité mobile-first avec date, lieu, capacité, statut personnel et CTA principal.  
UX-DR6: Créer une timeline ou vue planning de créneaux adaptée au desktop et lisible sur mobile.  
UX-DR7: Implémenter des formulaires segmentés avec validations inline et feedback contextualisé.  
UX-DR8: Implémenter des patterns de feedback cohérents : toast, message inline, bannière, état persistant.  
UX-DR9: Rendre l'éligibilité visible dès les listes et les fiches détail.  
UX-DR10: Garantir accessibilité clavier, focus visible, ARIA utiles, contrastes AA et cibles tactiles adaptées.  
UX-DR11: Créer un rail d'annonces et documents utiles avec hiérarchie par fraîcheur et importance.  
UX-DR12: Assurer des parcours critiques mobile-first sans perte de lisibilité ni surcharge d'information.

### FR Coverage Map

FR1: Epic 1 - Accès club et socle applicatif  
FR2: Epic 1 - Accès club et socle applicatif  
FR3: Epic 1 - Accès club et socle applicatif  
FR4: Epic 1 - Accès club et socle applicatif  
FR5: Epic 1 - Accès club et socle applicatif  
FR6: Epic 1 - Accès club et socle applicatif  
FR7: Epic 2 - Membres et conformité  
FR8: Epic 2 - Membres et conformité  
FR9: Epic 2 - Membres et conformité  
FR10: Epic 2 - Membres et conformité  
FR11: Epic 2 - Membres et conformité  
FR12: Epic 2 - Membres et conformité  
FR13: Epic 2 - Membres et conformité  
FR14: Epic 2 - Membres et conformité  
FR15: Epic 2 / Epic 3 - Membres et conformité / Événements et inscriptions  
FR16: Epic 2 / Epic 3 - Membres et conformité / Événements et inscriptions  
FR17: Epic 2 - Membres et conformité  
FR18: Epic 2 - Membres et conformité  
FR19: Epic 2 - Membres et conformité  
FR20: Epic 2 - Membres et conformité  
FR21: Epic 2 - Membres et conformité  
FR22: Epic 6 - Informations club et communication  
FR23: Epic 3 - Événements et inscriptions  
FR24: Epic 3 - Événements et inscriptions  
FR25: Epic 3 - Événements et inscriptions  
FR26: Epic 3 - Événements et inscriptions  
FR27: Epic 3 - Événements et inscriptions  
FR28: Epic 3 - Événements et inscriptions  
FR29: Epic 3 - Événements et inscriptions  
FR30: Epic 3 - Événements et inscriptions  
FR31: Epic 4 - Rencontres inter-clubs  
FR32: Epic 4 - Rencontres inter-clubs  
FR33: Epic 4 - Rencontres inter-clubs  
FR34: Epic 4 - Rencontres inter-clubs  
FR35: Epic 4 - Rencontres inter-clubs  
FR36: Epic 5 - Créneaux et planning  
FR37: Epic 5 - Créneaux et planning  
FR38: Epic 5 - Créneaux et planning  
FR39: Epic 5 - Créneaux et planning  
FR40: Epic 5 - Créneaux et planning  
FR41: Epic 5 - Créneaux et planning  
FR42: Epic 6 - Informations club et communication  
FR43: Epic 6 - Informations club et communication  
FR44: Epic 6 - Informations club et communication  
FR45: Epic 6 - Informations club et communication  
FR46: Epic 7 - Administration, audit et exploitation  
FR47: Epic 7 - Administration, audit et exploitation  
FR48: Epic 7 - Administration, audit et exploitation  
FR49: Epic 7 - Administration, audit et exploitation

## Epic List

### Epic 1: Accès club et socle applicatif
Mettre en place le socle technique, l'authentification et les surfaces d'accès pour que les utilisateurs puissent entrer dans l'application, être reconnus selon leur rôle et naviguer dans une expérience cohérente.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6

### Epic 2: Gestion des membres et conformité
Permettre aux responsables de créer, maintenir et contrôler la base membres avec tous les signaux nécessaires à l'éligibilité et à la conformité documentaire.
**FRs covered:** FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR21

### Epic 3: Événements du club et inscriptions adhérents
Permettre au club de publier ses activités et aux adhérents de s'y inscrire ou se désinscrire rapidement en voyant immédiatement leur situation.
**FRs covered:** FR23, FR24, FR25, FR26, FR27, FR28, FR29, FR30

### Epic 4: Rencontres inter-clubs
Permettre de planifier, suivre et communiquer les rencontres inter-clubs avec toutes les informations logistiques et les participants concernés.
**FRs covered:** FR31, FR32, FR33, FR34, FR35

### Epic 5: Créneaux de gymnase et planning
Permettre au club de gérer ses créneaux, prévenir les conflits et publier une planification fiable à destination des adhérents.
**FRs covered:** FR36, FR37, FR38, FR39, FR40, FR41

### Epic 6: Informations club, documents partagés et communication
Centraliser les annonces, documents club et canaux d'information pour que les adhérents retrouvent enfin les bonnes informations au bon endroit.
**FRs covered:** FR22, FR42, FR43, FR44, FR45

### Epic 7: Administration, audit et exploitation
Donner au club les moyens de piloter l'application, tracer les actions sensibles, gérer ses paramètres et exploiter le produit dans des conditions sûres et maintenables.
**FRs covered:** FR46, FR47, FR48, FR49

## Epic 1: Accès club et socle applicatif

Poser un socle concret à partir du starter retenu puis livrer l'accès utilisateur et les surfaces d'expérience minimales.

### Story 1.1: Initialiser le projet à partir du starter retenu

As a équipe produit,  
I want initialiser l'application depuis le starter retenu et poser la structure de base,  
So that les stories suivantes s'appuient sur un socle cohérent avec l'architecture validée.

**Exigences couvertes :** Architecture starter template, PostgreSQL/Prisma readiness, App Router, Tailwind, monolithe modulaire.

**Acceptance Criteria:**

**Given** que le dépôt d'implémentation démarre vide,  
**When** la story est terminée,  
**Then** un projet Next.js App Router TypeScript avec `src/`, Tailwind CSS, lint et structure de domaines existe,  
**And** la base de configuration nécessaire pour Prisma, Better Auth, variables d'environnement et pipeline qualité est préparée sans créer encore tout le modèle métier.

### Story 1.2: Authentifier un utilisateur avec email et mot de passe

As a adhérent ou responsable,  
I want me connecter, rester connecté et réinitialiser mon mot de passe,  
So that je puisse accéder simplement à mon espace club.

**Exigences couvertes :** FR2, FR3, NFR4, NFR5, NFR14, NFR15.

**Acceptance Criteria:**

**Given** qu'un utilisateur dispose d'un compte actif,  
**When** il saisit ses identifiants valides ou déclenche un reset password,  
**Then** le système ouvre ou restaure sa session de manière sécurisée,  
**And** les écrans et messages associés restent accessibles et utilisables sur mobile.

### Story 1.3: Créer un compte par invitation ou rattachement validé

As a futur utilisateur du club,  
I want créer mon accès depuis une invitation ou un rattachement autorisé,  
So that mon compte applicatif corresponde bien à ma présence réelle dans le club.

**Exigences couvertes :** FR1, FR4, FR10, NFR6.

**Acceptance Criteria:**

**Given** qu'une invitation ou un rattachement validé existe pour un membre,  
**When** le visiteur finalise la création de son compte,  
**Then** le système crée ou associe le compte à la bonne fiche membre sans ambiguïté,  
**And** seuls les comptes actifs et autorisés peuvent ensuite accéder aux surfaces protégées.

### Story 1.4: Appliquer les rôles et afficher une surface adaptée

As a utilisateur authentifié,  
I want voir une navigation et des permissions adaptées à mon rôle,  
So that je n'accède qu'aux écrans utiles à mes responsabilités.

**Exigences couvertes :** FR5, FR6, UX-DR1, UX-DR2, UX-DR8, UX-DR10, UX-DR12, NFR6.

**Acceptance Criteria:**

**Given** qu'un utilisateur possède un ou plusieurs rôles,  
**When** il accède à l'application après authentification,  
**Then** le système affiche une surface publique, adhérent ou administration cohérente avec ses droits,  
**And** la navigation, les états de focus, les feedbacks et les protections serveur empêchent tout contournement par l'interface.

## Epic 2: Gestion des membres et conformité

Permettre au club de maintenir sa base membres et d'appliquer les règles d'éligibilité et de conformité sans tableur parallèle.

### Story 2.1: Créer, modifier et archiver une fiche membre

As a administrateur du club,  
I want créer, modifier, archiver et réactiver une fiche membre,  
So that la base membres reste fiable au fil des saisons.

**Exigences couvertes :** FR7, FR8, FR9, FR11, NFR7.

**Acceptance Criteria:**

**Given** qu'un administrateur autorisé travaille dans l'espace membres,  
**When** il crée, modifie, archive ou réactive une fiche,  
**Then** les informations principales et le statut d'adhésion sont persistés de manière cohérente,  
**And** l'action sensible est auditée avec acteur, date et type d'opération.

### Story 2.2: Consulter la liste des membres et relier une fiche à un utilisateur

As a responsable autorisé,  
I want rechercher, filtrer et ouvrir rapidement les fiches membres puis relier un compte applicatif,  
So that je puisse retrouver et administrer la bonne personne sans friction.

**Exigences couvertes :** FR10, FR12, NFR3, UX-DR10, UX-DR12.

**Acceptance Criteria:**

**Given** qu'un responsable consulte la liste des membres,  
**When** il utilise la recherche, les filtres et l'action de rattachement à un utilisateur applicatif,  
**Then** les résultats reviennent dans le budget de performance défini et la bonne fiche peut être associée au bon compte,  
**And** l'écran reste utilisable au clavier et sur mobile pour les parcours critiques.

### Story 2.3: Gérer les statuts de cotisation et calculer l'éligibilité

As a responsable autorisé,  
I want enregistrer le statut de cotisation et voir l'état d'éligibilité résultant,  
So that le club applique ses règles sans vérification manuelle.

**Exigences couvertes :** FR13, FR14, FR15, FR16, UX-DR3, UX-DR9.

**Acceptance Criteria:**

**Given** qu'un membre possède un statut financier et documentaire,  
**When** un responsable met à jour sa cotisation ou consulte sa fiche,  
**Then** le système calcule et affiche un état clair `à jour`, `en attente` ou `bloqué` avec la raison,  
**And** cet état devient réutilisable dans les listes, fiches et parcours d'inscription.

### Story 2.4: Gérer les documents obligatoires et la conformité membre

As a responsable autorisé,  
I want déposer des documents, marquer des types obligatoires et voir les manques,  
So that la conformité du membre soit centralisée dans un seul écran d'action.

**Exigences couvertes :** FR17, FR18, FR19, FR20, FR21, UX-DR4, NFR16, NFR18.

**Acceptance Criteria:**

**Given** qu'un membre a des documents requis ou déposés,  
**When** un responsable gère ses documents ou ouvre son panneau de conformité,  
**Then** le système montre les pièces présentes, manquantes et obligatoires avec les permissions adéquates,  
**And** la traçabilité des validations et la visibilité des documents sensibles respectent les contraintes de conformité.

## Epic 3: Événements du club et inscriptions adhérents

Publier des activités et rendre l'inscription adhérent claire, rapide et contrôlée par les règles métier.

### Story 3.1: Créer un brouillon d'événement dans un formulaire segmenté

As a responsable événements,  
I want créer un événement avec un formulaire découpé en sections courtes,  
So that je prépare rapidement une activité complète sans oublier d'information essentielle.

**Exigences couvertes :** FR23, FR25, UX-DR5, UX-DR7, UX-DR8, NFR14, NFR15.

**Acceptance Criteria:**

**Given** qu'un responsable ouvre la création d'événement,  
**When** il renseigne type, date, heure, lieu, capacité, description et statut dans un formulaire segmenté,  
**Then** un brouillon d'événement cohérent est enregistré avec validations inline et feedbacks explicites,  
**And** l'expérience reste lisible et accessible sur desktop comme sur mobile.

### Story 3.2: Publier, modifier, reporter ou annuler un événement avec notification

As a responsable événements,  
I want piloter le cycle de vie d'un événement et notifier les personnes concernées,  
So that les changements de planning soient fiables et visibles.

**Exigences couvertes :** FR24, FR30, UX-DR8, NFR7.

**Acceptance Criteria:**

**Given** qu'un événement existe au statut brouillon ou publié,  
**When** le responsable le publie, le modifie, le reporte ou l'annule,  
**Then** le nouveau statut et les changements sont enregistrés et visibles dans l'interface,  
**And** les notifications et traces d'audit correspondantes sont déclenchées pour les personnes concernées.

### Story 3.3: Parcourir les événements et ouvrir une fiche activité claire

As a adhérent,  
I want consulter une liste d'activités puis ouvrir une fiche détaillée,  
So that je sache rapidement si une activité m'intéresse et me concerne.

**Exigences couvertes :** FR25, UX-DR5, UX-DR9, UX-DR10, UX-DR12.

**Acceptance Criteria:**

**Given** qu'un adhérent consulte les activités publiées,  
**When** il parcourt la liste puis ouvre le détail d'une activité,  
**Then** la carte et la fiche affichent date, lieu, capacité, statut personnel et action principale de manière immédiatement compréhensible,  
**And** l'état d'éligibilité est visible avant toute tentative d'inscription.

### Story 3.4: S'inscrire, se désinscrire et suivre les participants

As a adhérent ou responsable,  
I want gérer les inscriptions à un événement et en suivre l'état,  
So that le remplissage de l'activité soit fiable pour tous.

**Exigences couvertes :** FR26, FR27, FR28, FR29, FR15, FR16, NFR1, NFR2.

**Acceptance Criteria:**

**Given** qu'un événement publié accepte des participants,  
**When** un adhérent éligible s'inscrit ou se désinscrit et qu'un responsable consulte la liste des participants,  
**Then** le système met à jour les places restantes, le statut de participation et les messages de confirmation dans le budget de performance défini,  
**And** une personne non éligible voit clairement la raison du blocage sans pouvoir contourner la règle.

## Epic 4: Rencontres inter-clubs

Permettre au club de préparer et diffuser ses rencontres inter-clubs dans un flux simple et centralisé.

### Story 4.1: Créer et mettre à jour une rencontre inter-clubs

As a responsable du club,  
I want créer puis ajuster une rencontre inter-clubs avec ses informations logistiques,  
So that la rencontre soit pilotée depuis un écran unique.

**Exigences couvertes :** FR31, FR32, FR34, UX-DR7, UX-DR8.

**Acceptance Criteria:**

**Given** qu'un responsable ouvre le module rencontres,  
**When** il crée ou met à jour une rencontre avec club adverse, type, date, horaire, lieu et informations pratiques,  
**Then** la rencontre est enregistrée avec son historique de statut et ses informations logistiques complètes,  
**And** les messages et écrans associés restent cohérents avec les patterns UX globaux du produit.

### Story 4.2: Gérer les participants concernés et leur consultation

As a responsable ou utilisateur concerné,  
I want associer des participants à une rencontre puis consulter les informations qui me concernent,  
So that l'information inter-clubs soit ciblée et utile.

**Exigences couvertes :** FR33, FR35, FR44.

**Acceptance Criteria:**

**Given** qu'une rencontre inter-clubs existe,  
**When** un responsable y associe des participants ou convoqués et qu'un utilisateur concerné consulte sa vue,  
**Then** seuls les utilisateurs concernés voient les bonnes informations de rencontre,  
**And** la liste des personnes associées reste modifiable jusqu'à la clôture selon les droits prévus.

## Epic 5: Créneaux de gymnase et planning

Donner au club une gestion fiable des créneaux et une visibilité claire des changements de planning.

### Story 5.1: Créer et republier un créneau lié à une activité

As a responsable planning,  
I want créer, modifier, annuler ou republier un créneau de gymnase lié à une activité,  
So that le planning opérationnel du club soit maintenu dans un seul outil.

**Exigences couvertes :** FR36, FR37, FR38, UX-DR7, UX-DR8.

**Acceptance Criteria:**

**Given** qu'un responsable gère les créneaux,  
**When** il crée ou modifie un créneau avec sa liaison à une activité, un entraînement ou un événement,  
**Then** le créneau est enregistré avec son statut de publication et son rattachement métier,  
**And** les actions de changement importantes renvoient un feedback explicite et cohérent.

### Story 5.2: Détecter les conflits et visualiser le planning

As a responsable planning,  
I want voir les conflits potentiels et les créneaux dans une vue de planning claire,  
So that je corrige les problèmes avant publication.

**Exigences couvertes :** FR39, UX-DR6, NFR1.

**Acceptance Criteria:**

**Given** que plusieurs créneaux utilisent les mêmes ressources planifiées,  
**When** un responsable consulte la vue planning ou enregistre un changement,  
**Then** le système détecte et signale les conflits de manière visible dans une vue adaptée au desktop comme au mobile,  
**And** la consultation du planning reste performante pour le volume cible du MVP.

### Story 5.3: Publier les créneaux aux adhérents et notifier les changements

As a adhérent,  
I want consulter les créneaux publiés qui me concernent et être prévenu des changements,  
So that je sache où et quand venir sans incertitude.

**Exigences couvertes :** FR40, FR41, UX-DR12.

**Acceptance Criteria:**

**Given** que des créneaux ont été publiés,  
**When** un adhérent consulte son planning ou qu'un changement significatif intervient,  
**Then** seuls les créneaux pertinents et publiés lui sont visibles dans une interface mobile-first,  
**And** les modifications importantes déclenchent une notification compréhensible.

## Epic 6: Informations club, documents partagés et communication

Faire de L4rs0n la source unique pour les annonces et documents utiles du club.

### Story 6.1: Publier un document club dans l'espace partagé

As a administrateur du club,  
I want déposer un document général et définir sa visibilité,  
So that les adhérents retrouvent la bonne version au bon endroit.

**Exigences couvertes :** FR22, NFR18.

**Acceptance Criteria:**

**Given** qu'un administrateur ajoute un document club,  
**When** il le publie avec ses métadonnées et sa visibilité,  
**Then** le document devient disponible dans l'espace partagé selon les permissions prévues,  
**And** le fichier binaire et ses métadonnées restent stockés selon la séparation architecture base relationnelle / stockage privé.

### Story 6.2: Créer des canaux d'information et publier des annonces ciblées

As a administrateur ou responsable autorisé,  
I want gérer des canaux et publier des annonces par audience,  
So that les bonnes informations arrivent aux bonnes personnes.

**Exigences couvertes :** FR42, FR43, FR44, UX-DR11.

**Acceptance Criteria:**

**Given** qu'un canal d'information existe ou doit être créé,  
**When** un utilisateur autorisé configure le canal puis publie une annonce ciblée,  
**Then** l'annonce est visible uniquement par l'audience prévue avec sa hiérarchie d'importance,  
**And** l'expérience de publication reste cohérente avec les patterns de feedback et de visibilité du produit.

### Story 6.3: Consulter les annonces et documents utiles côté adhérent

As a adhérent,  
I want retrouver rapidement les annonces et documents qui me concernent,  
So that je n'aie plus à chercher l'information dans des outils externes.

**Exigences couvertes :** FR45, UX-DR11, NFR14, NFR15.

**Acceptance Criteria:**

**Given** qu'un adhérent ouvre son espace d'information,  
**When** il consulte le rail d'annonces et de documents utiles,  
**Then** les contenus sont triés par fraîcheur, importance et visibilité dans une interface claire,  
**And** la consultation reste accessible, responsive et compréhensible sans jargon administratif.

## Epic 7: Administration, audit et exploitation

Compléter le MVP avec les outils de pilotage, de traçabilité et d'exploitation qui sécurisent l'usage réel du produit.

### Story 7.1: Afficher un tableau de bord admin et gérer les paramètres du club

As a administrateur du club,  
I want voir un tableau de bord synthétique et configurer les informations générales du club,  
So that je puisse piloter les opérations courantes depuis une vue unique.

**Exigences couvertes :** FR46, FR49, UX-DR2.

**Acceptance Criteria:**

**Given** qu'un administrateur accède à son espace,  
**When** il ouvre le tableau de bord puis la page de paramètres du club,  
**Then** il voit les indicateurs essentiels et peut modifier les informations générales utilisées par l'application,  
**And** la structure de navigation et les composants restent cohérents avec la surface administration définie en UX.

### Story 7.2: Consulter le journal d'audit des actions sensibles

As a administrateur du club,  
I want consulter un journal des actions sensibles et des changements majeurs,  
So that je puisse tracer ce qui s'est passé en cas de doute ou d'incident.

**Exigences couvertes :** FR47, FR48, NFR7.

**Acceptance Criteria:**

**Given** que des actions sensibles ont eu lieu dans le système,  
**When** un administrateur ouvre le journal d'audit,  
**Then** il peut filtrer et consulter les enregistrements utiles avec acteur, horodatage et type d'action,  
**And** les logs techniques restent séparés des événements métier affichés à l'utilisateur.

### Story 7.3: Gérer confidentialité, consentements et suppression de données

As a administrateur ou membre concerné,  
I want disposer des informations de confidentialité et des mécanismes de suppression ou anonymisation adaptés,  
So that l'application respecte les obligations RGPD du club.

**Exigences couvertes :** NFR8, NFR16, NFR17, NFR18.

**Acceptance Criteria:**

**Given** qu'un utilisateur authentifié consulte les informations de traitement ou qu'un administrateur traite une demande liée aux données,  
**When** la politique de confidentialité, les consentements requis ou une suppression/anonymisation sont sollicités,  
**Then** le système permet la consultation des informations réglementaires et l'exécution traçable des actions prévues,  
**And** les droits d'accès aux données sensibles restent strictement limités aux rôles autorisés.

### Story 7.4: Préparer l'exploitation avec qualité, sauvegarde et observabilité

As a équipe produit,  
I want disposer d'un pipeline qualité, de sauvegardes et d'une observabilité minimale,  
So that le MVP soit exploitable et récupérable en conditions réelles.

**Exigences couvertes :** NFR1, NFR2, NFR9, NFR10, NFR11, NFR12, NFR13, Additional Requirements CI/observability/deployment.

**Acceptance Criteria:**

**Given** que le socle applicatif et les premiers domaines métier existent,  
**When** la story est terminée,  
**Then** l'application dispose d'un pipeline lint/typecheck/tests/build, de sauvegardes et d'un plan de restauration documenté,  
**And** des logs structurés, un suivi d'erreurs et des vérifications de performance minimales sont en place pour le volume cible du MVP.
