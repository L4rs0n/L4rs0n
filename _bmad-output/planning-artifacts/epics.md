---
title: "Epic Breakdown: L4rs0n"
status: "complete"
created: "2026-04-14T00:00:00+02:00"
updated: "2026-04-14T00:00:00+02:00"
completedAt: "2026-04-14T00:00:00+02:00"
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
project_name: "L4rs0n"
user_name: "LUTCHANAH Kévin"
date: "2026-04-14T00:00:00+02:00"
---

# L4rs0n - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for L4rs0n, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Un visiteur peut créer un compte utilisateur à partir d'une invitation ou d'un rattachement validé par le club.
FR2: Un utilisateur peut se connecter avec une adresse email et un mot de passe.
FR3: Un utilisateur peut réinitialiser son mot de passe.
FR4: Un administrateur peut activer, désactiver, archiver et réactiver un compte.
FR5: Un administrateur peut attribuer un ou plusieurs rôles configurés à un même utilisateur, dans la limite des rôles définis par le club.
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
FR41: Le système peut notifier les adhérents concernés lors d'une annulation, d'un changement d'horaire, d'un changement de lieu ou d'une modification de capacité sur un créneau publié.
FR42: Un administrateur peut créer et gérer des canaux d'information.
FR43: Un responsable autorisé peut publier une annonce dans un canal.
FR44: Le système peut cibler la diffusion d'une annonce selon des rôles ou audiences définies.
FR45: Un adhérent peut consulter les annonces qui lui sont destinées.
FR46: Un administrateur peut consulter un tableau de bord affichant au minimum les membres en attente d'action, les cotisations non à jour, les prochains événements, les changements récents de créneaux et les alertes documentaires.
FR47: Le système peut historiser les actions d'administration sensibles.
FR48: Un administrateur peut consulter un journal des changements majeurs.
FR49: Un administrateur peut configurer les informations générales du club utilisées dans l'application.

### NonFunctional Requirements

NFR1: Le système doit afficher une page de liste principale en moins de 2 secondes pour 95 % des requêtes sous charge nominale de 50 utilisateurs simultanés.
NFR2: Le système doit confirmer une inscription ou désinscription à un événement en moins de 3 secondes pour 95 % des opérations sous charge nominale.
NFR3: Le système doit rendre disponible une recherche membre en moins de 2 secondes pour 95 % des requêtes sur un volume de 150 adhérents.
NFR4: Le système doit chiffrer les données en transit via TLS sur 100 % des échanges authentifiés, vérifiés lors des tests de sécurité précédant chaque mise en production.
NFR5: Le système doit stocker 100 % des mots de passe avec un algorithme de hachage adaptatif validé par l'équipe technique et revu au moins une fois par an.
NFR6: Le système doit appliquer un contrôle d'accès basé sur les rôles pour 100 % des écrans et opérations protégés, vérifié par la matrice d'autorisation et les tests d'accès avant mise en production.
NFR7: Le système doit journaliser 100 % des actions d'administration sensibles avec horodatage, acteur et type d'action, vérifiés lors d'un audit fonctionnel avant mise en production.
NFR8: Le système doit permettre la suppression ou l'anonymisation des données d'un membre dans un délai maximum de 30 jours après validation d'une demande conforme aux règles de conservation du club et à la réglementation applicable.
NFR9: Le système doit atteindre 99,5 % de disponibilité mensuelle hors fenêtres de maintenance planifiées, mesurée par l'outil de supervision de production.
NFR10: Le système doit exécuter au moins une sauvegarde complète quotidienne des données métier et des métadonnées documentaires avec un journal de succès consultable par un administrateur autorisé.
NFR11: Le système doit permettre une restauration des données avec un objectif de reprise inférieur à 24 heures après incident majeur.
NFR12: Le système doit supporter le fonctionnement nominal d'un club de 150 adhérents sans dégradation supérieure à 10 % des temps de réponse définis.
NFR13: Le système doit supporter un pic de 100 connexions actives sur une fenêtre de 15 minutes lors d'une ouverture d'inscription sans indisponibilité du service.
NFR14: L'interface web doit respecter les critères WCAG 2.1 niveau AA sur les parcours critiques d'authentification, consultation d'informations et inscription à un événement.
NFR15: Le système doit permettre l'authentification, la consultation des événements, l'inscription ou désinscription à un événement et l'accès aux documents clés sans zoom horizontal sur une largeur d'écran de 360 px et plus.
NFR16: Le système doit tracer pour 100 % des consentements ou validations requis l'origine, la date et le type de preuve associée pour les documents obligatoires.
NFR17: Le système doit afficher la politique de confidentialité et les informations de traitement des données à tout utilisateur authentifié en 2 clics maximum depuis les parcours critiques.
NFR18: Le système doit empêcher 100 % des rôles non autorisés d'accéder aux données financières et documentaires sensibles lors des tests d'autorisation définis par le club.

### Additional Requirements

- Epic 1 Story 1 doit initialiser le projet avec le starter officiel `create-next-app` aligné sur Next.js App Router et TypeScript.
- La fondation technique doit mettre en place PostgreSQL 16 managé, Prisma ORM 7.3.x et Prisma Migrate.
- L'authentification doit intégrer Better Auth 1.6.x avec email/mot de passe, reset password et sessions persistées.
- L'application doit adopter une architecture server-first avec Server Actions pour les mutations internes et Route Handlers pour les endpoints HTTP explicites.
- Toutes les frontières d'entrée significatives doivent être validées avec Zod 4.
- Les documents doivent être stockés avec métadonnées en base relationnelle et binaires en stockage objet privé S3-compatible à accès contrôlé.
- L'observabilité doit séparer logs structurés, suivi d'erreurs et audit métier.
- Le pipeline CI doit couvrir lint, typecheck, tests, migrations contrôlées et build via GitHub Actions.
- Le déploiement initial doit viser une plateforme compatible Next.js avec préférence pratique pour Vercel, sans verrouiller la portabilité.
- La V1 ne doit pas introduire Redis ni de state manager global ; l'état doit reposer sur les primitives Next.js, l'état local et l'URL state.
- Les domaines métiers prioritaires du MVP doivent être introduits en premier : `auth`, `members`, `activities`, `documents`, `announcements`, `audit`.
- Les règles critiques d'autorisation, d'éligibilité, de visibilité, d'audit et de gouvernance documentaire doivent être centralisées dans services et policies, pas dans les composants UI.

### UX Design Requirements

UX-DR1: Définir des tokens sémantiques de couleur, statut, espacement, rayon et ombres avant l'implémentation des composants.
UX-DR2: Mettre en place un design system thémable léger avec Tailwind CSS, primitives accessibles de type shadcn/ui ou Radix, et séparation entre composants transverses et composants métier.
UX-DR3: Implémenter la palette sémantique retenue avec règles d'usage garantissant que la couleur ne porte jamais seule l'information de statut.
UX-DR4: Implémenter la hiérarchie typographique avec `Barlow Condensed` pour les titres, `Source Sans 3` pour l'interface, `IBM Plex Mono` pour les références, et l'échelle H1/H2/H3/H4/Body/Small/Label définie dans l'UX spec.
UX-DR5: Créer un composant métier `Badge d'éligibilité` affichant les états à jour, en attente et bloqué avec libellé, icône et variante couleur.
UX-DR6: Créer un `Panneau conformité membre` regroupant cotisation, documents obligatoires, date de mise à jour, historique court et actions correctives.
UX-DR7: Créer une `Carte activité` mobile-first exposant date, lieu, type, capacité, statut personnel et CTA principal, avec version compacte et version riche.
UX-DR8: Créer une `Timeline de créneaux` hebdomadaire avec états confirmé, modifié, annulé et conflit, adaptée à une densité desktop.
UX-DR9: Créer un `Panneau participants / convocations` avec filtres rapides, badges de présence et base extensible pour actions par lot.
UX-DR10: Créer un `Rail annonces et infos club` hiérarchisant les contenus par fraîcheur et criticité et distinguant information simple et action attendue.
UX-DR11: Appliquer des patterns de feedback cohérents : toast plus état persistant pour le succès, erreur inline avec résumé si nécessaire, warning en bannière contextuelle.
UX-DR12: Appliquer des patterns de formulaires cohérents : sections logiques, labels visibles, aide avant erreur quand possible, validation inline, résumé d'erreur en tête sur mobile pour les formulaires longs.
UX-DR13: Implémenter une navigation responsive différenciée par surface : navigation basse ou onglets principaux pour l'adhérent sur mobile, sidebar desktop et navigation compacte mobile pour le responsable, breadcrumb seulement sur les surfaces administratives profondes.
UX-DR14: Définir des états vides, loading, erreur et succès pour tous les composants critiques, avec recherche et filtres toujours visibles sur les écrans de liste importants.
UX-DR15: Respecter la stratégie responsive mobile/tablette/desktop, avec priorité aux actions fréquentes, cartes verticales en mobile et vues de pilotage plus riches en desktop.
UX-DR16: Respecter l'accessibilité fonctionnelle : navigation clavier complète, ordre de tabulation cohérent, aria labels sur actions iconiques, alternatives textuelles de statut, focus management correct après modals et drawers.
UX-DR17: Respecter l'accessibilité métier : toujours expliquer les blocages d'inscription, rendre explicites les rôles et visibilités documentaires, éviter les abréviations club non expliquées, rendre date/lieu/type d'activité lisibles d'un coup d'oeil.

### FR Coverage Map

FR1: Epic 1 - Accès au club et socle d’expérience
FR2: Epic 1 - Accès au club et socle d’expérience
FR3: Epic 1 - Accès au club et socle d’expérience
FR4: Epic 1 - Accès au club et socle d’expérience
FR5: Epic 1 - Accès au club et socle d’expérience
FR6: Epic 1 - Accès au club et socle d’expérience
FR7: Epic 2 - Gestion des membres et conformité
FR8: Epic 2 - Gestion des membres et conformité
FR9: Epic 2 - Gestion des membres et conformité
FR10: Epic 2 - Gestion des membres et conformité
FR11: Epic 2 - Gestion des membres et conformité
FR12: Epic 2 - Gestion des membres et conformité
FR13: Epic 2 - Gestion des membres et conformité
FR14: Epic 2 - Gestion des membres et conformité
FR15: Epic 2 - Gestion des membres et conformité
FR16: Epic 2 - Gestion des membres et conformité
FR17: Epic 2 - Gestion des membres et conformité
FR18: Epic 2 - Gestion des membres et conformité
FR19: Epic 2 - Gestion des membres et conformité
FR20: Epic 2 - Gestion des membres et conformité
FR21: Epic 2 - Gestion des membres et conformité
FR22: Epic 6 - Informations club, documents partagés et communication
FR23: Epic 3 - Événements du club et inscriptions adhérents
FR24: Epic 3 - Événements du club et inscriptions adhérents
FR25: Epic 3 - Événements du club et inscriptions adhérents
FR26: Epic 3 - Événements du club et inscriptions adhérents
FR27: Epic 3 - Événements du club et inscriptions adhérents
FR28: Epic 3 - Événements du club et inscriptions adhérents
FR29: Epic 3 - Événements du club et inscriptions adhérents
FR30: Epic 3 - Événements du club et inscriptions adhérents
FR31: Epic 4 - Rencontres inter-clubs
FR32: Epic 4 - Rencontres inter-clubs
FR33: Epic 4 - Rencontres inter-clubs
FR34: Epic 4 - Rencontres inter-clubs
FR35: Epic 4 - Rencontres inter-clubs
FR36: Epic 5 - Créneaux de gymnase et planning
FR37: Epic 5 - Créneaux de gymnase et planning
FR38: Epic 5 - Créneaux de gymnase et planning
FR39: Epic 5 - Créneaux de gymnase et planning
FR40: Epic 5 - Créneaux de gymnase et planning
FR41: Epic 5 - Créneaux de gymnase et planning
FR42: Epic 6 - Informations club, documents partagés et communication
FR43: Epic 6 - Informations club, documents partagés et communication
FR44: Epic 6 - Informations club, documents partagés et communication
FR45: Epic 6 - Informations club, documents partagés et communication
FR46: Epic 7 - Administration, audit et exploitation
FR47: Epic 7 - Administration, audit et exploitation
FR48: Epic 7 - Administration, audit et exploitation
FR49: Epic 7 - Administration, audit et exploitation

## Epic List

### Epic 1: Accès au club et socle d’expérience
Permettre à un utilisateur d’entrer dans l’application, d’être authentifié, reconnu selon son rôle, et d’accéder à une surface cohérente.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6

### Epic 2: Gestion des membres et conformité
Permettre aux responsables de créer, maintenir et contrôler une base membres fiable avec statut d’adhésion, cotisation, éligibilité et conformité documentaire.
**FRs covered:** FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR21

### Epic 3: Événements du club et inscriptions adhérents
Permettre au club de publier ses événements et aux adhérents de s’y inscrire ou se désinscrire rapidement avec visibilité immédiate sur leur situation.
**FRs covered:** FR23, FR24, FR25, FR26, FR27, FR28, FR29, FR30

### Epic 4: Rencontres inter-clubs
Permettre d’organiser et de suivre les rencontres inter-clubs avec leurs participants, leurs informations logistiques et leurs mises à jour.
**FRs covered:** FR31, FR32, FR33, FR34, FR35

### Epic 5: Créneaux de gymnase et planning
Permettre au club de gérer ses créneaux, prévenir les conflits et diffuser un planning fiable aux adhérents.
**FRs covered:** FR36, FR37, FR38, FR39, FR40, FR41

### Epic 6: Informations club, documents partagés et communication
Permettre au club de centraliser documents, annonces et canaux d’information pour que les adhérents retrouvent les bonnes informations au bon endroit.
**FRs covered:** FR22, FR42, FR43, FR44, FR45

### Epic 7: Administration, audit et exploitation
Permettre au club de piloter l’application, tracer les actions sensibles, gérer les paramètres du club et exploiter le produit en conditions sûres.
**FRs covered:** FR46, FR47, FR48, FR49

## Epic 1: Accès au club et socle d’expérience

Permettre à un utilisateur d’entrer dans l’application, d’être authentifié, reconnu selon son rôle, et d’accéder à une surface cohérente.

### Story 1.1: Initialiser le socle applicatif du club

As a équipe produit,
I want initialiser l’application avec le starter retenu et la structure cible,
So that les stories suivantes s’appuient sur une base cohérente avec l’architecture validée.

**Acceptance Criteria:**

**Given** que le dépôt d’implémentation démarre vide
**When** la story est terminée
**Then** un projet Next.js App Router TypeScript avec `src/`, Tailwind, lint et structure de domaines existe
**And** la base de configuration pour Prisma, Better Auth, Zod et variables d’environnement est préparée sans créer tout le modèle métier upfront
**And** un pipeline qualité minimal de fondation exécute au moins `lint`, `typecheck` et `build` sur le dépôt dès le démarrage, prêt à être étendu par les stories d’exploitation

### Story 1.2: Authentifier un utilisateur par email et mot de passe

As a adhérent ou responsable,
I want me connecter, rester connecté et réinitialiser mon mot de passe,
So that je puisse accéder simplement et de manière sécurisée à mon espace club.

**Acceptance Criteria:**

**Given** qu’un utilisateur possède un compte actif
**When** il saisit des identifiants valides ou lance une réinitialisation de mot de passe
**Then** le système ouvre ou restaure sa session de manière sécurisée
**And** les écrans et messages associés sont accessibles, mobile-first et conformes aux exigences critiques de sécurité

### Story 1.3: Créer un compte via invitation ou rattachement validé

As a futur utilisateur du club,
I want créer mon accès depuis une invitation ou un rattachement autorisé,
So that mon compte applicatif corresponde à ma présence réelle dans le club.

**Acceptance Criteria:**

**Given** qu’un rattachement ou une invitation valide existe côté club
**When** le visiteur complète la création de compte
**Then** le système crée un accès lié au bon utilisateur ou à la bonne fiche membre
**And** un compte non validé ou non rattachable ne peut pas finaliser la création

### Story 1.4: Appliquer les rôles et afficher une surface adaptée

As a utilisateur authentifié,
I want accéder à une expérience cohérente selon mon rôle actif,
So that je voie immédiatement les actions et informations pertinentes pour moi.

**Acceptance Criteria:**

**Given** qu’un utilisateur possède un ou plusieurs rôles configurés
**When** il accède à l’application après authentification
**Then** le système applique les permissions correspondant à son rôle actif
**And** l’interface affiche une navigation et une surface adaptées au profil adhérent ou responsable, sans exposer d’actions non autorisées

### Story 1.5: Gérer le cycle de vie administratif d’un compte

As a administrateur du club,
I want activer, désactiver, archiver et réactiver un compte utilisateur,
So that seuls les comptes autorisés conservent l’accès actif à l’application sans perdre la traçabilité utile.

**Acceptance Criteria:**

**Given** qu’un administrateur autorisé consulte un compte utilisateur existant
**When** il active, désactive, archive ou réactive ce compte
**Then** le système applique le nouvel état du compte de manière cohérente avec les règles d’accès prévues
**And** un compte désactivé ou archivé ne peut plus ouvrir de nouvelle session tant qu’il n’est pas réactivé
**And** l’opération reste traçable sans casser le rattachement du compte à la fiche membre associée

## Epic 2: Gestion des membres et conformité

Permettre aux responsables de créer, maintenir et contrôler une base membres fiable avec statut d’adhésion, cotisation, éligibilité et conformité documentaire.

### Story 2.1: Créer, modifier et archiver une fiche membre

As a administrateur du club,
I want créer, mettre à jour et archiver une fiche membre,
So that la base membres reste fiable et exploitable par tous les autres modules.

**Acceptance Criteria:**

**Given** qu’un administrateur autorisé accède à la gestion des membres
**When** il crée, modifie ou archive une fiche membre
**Then** le système enregistre les informations principales, le statut d’adhésion et l’état d’archivage
**And** l’historique utile du membre reste préservé après archivage

### Story 2.2: Lister les membres et relier une fiche à un utilisateur

As a responsable autorisé,
I want rechercher et consulter les fiches membres puis les relier à des comptes applicatifs,
So that l’administration du club puisse retrouver rapidement les bonnes personnes et leurs accès.

**Acceptance Criteria:**

**Given** qu’il existe des fiches membres dans le système
**When** un responsable autorisé consulte la liste avec recherche et filtres
**Then** il peut retrouver un membre selon les critères disponibles
**And** un administrateur peut associer une fiche membre à un utilisateur applicatif existant ou nouvellement créé

### Story 2.3: Gérer cotisation, statut et éligibilité

As a responsable du club,
I want enregistrer le statut de cotisation et voir immédiatement l’éligibilité d’un membre,
So that les inscriptions et participations respectent les règles du club.

**Acceptance Criteria:**

**Given** qu’un membre possède un statut de cotisation et un état documentaire
**When** un responsable met à jour son statut financier ou consulte sa situation
**Then** le système distingue les états à jour, en attente et non à jour
**And** l’éligibilité calculée est disponible pour les modules d’inscription avec la raison d’un éventuel blocage

### Story 2.4: Gérer les documents obligatoires et la conformité membre

As a responsable autorisé,
I want déposer, contrôler et consulter les documents obligatoires d’un membre,
So that la conformité documentaire soit visible et actionnable dans un seul flux.

**Acceptance Criteria:**

**Given** qu’un type de document peut être obligatoire pour un membre
**When** un responsable autorisé dépose un document, marque un type comme obligatoire ou consulte la conformité
**Then** le système signale les documents manquants et permet la consultation selon les permissions
**And** le panneau de conformité membre regroupe cotisation, documents requis, date de mise à jour et actions correctives

## Epic 3: Événements du club et inscriptions adhérents

Permettre au club de publier ses événements et aux adhérents de s’y inscrire ou se désinscrire rapidement avec visibilité immédiate sur leur situation.

### Story 3.1: Créer un brouillon d’événement

As a responsable autorisé,
I want créer un événement dans un formulaire structuré,
So that je puisse préparer une activité complète avant sa publication.

**Acceptance Criteria:**

**Given** qu’un responsable autorisé accède à la gestion des événements
**When** il crée un brouillon d’événement
**Then** il peut renseigner type, date, heure, lieu, description, capacité et statut
**And** le formulaire reste structuré, accessible et exploitable sur desktop comme sur mobile

### Story 3.2: Publier, modifier, reporter ou annuler un événement

As a responsable autorisé,
I want gérer le cycle de vie d’un événement publié,
So that les adhérents disposent toujours d’une information fiable et à jour.

**Acceptance Criteria:**

**Given** qu’un événement existe dans le système
**When** un responsable le publie, le modifie, le reporte ou l’annule
**Then** son statut et ses informations sont mis à jour de manière cohérente
**And** les personnes concernées reçoivent la notification adaptée au changement effectué

### Story 3.3: Consulter une activité et sa situation personnelle

As a adhérent,
I want parcourir les événements publiés et ouvrir une fiche activité claire,
So that je comprenne immédiatement si l’activité me concerne et si je peux y participer.

**Acceptance Criteria:**

**Given** qu’il existe des événements publiés
**When** un adhérent consulte la liste puis la fiche d’un événement
**Then** il voit au minimum la date, le lieu, le type, la capacité, son statut personnel et la raison d’un éventuel blocage
**And** la carte activité et les états de feedback restent lisibles sur mobile

### Story 3.4: S’inscrire, se désinscrire et suivre les participants

As a adhérent ou responsable,
I want gérer l’inscription à un événement et suivre les participants,
So that la capacité, les statuts et la participation restent maîtrisés par le club.

**Acceptance Criteria:**

**Given** qu’un événement publié accepte des inscriptions
**When** un adhérent éligible s’inscrit ou se désinscrit
**Then** le système met à jour son statut et le nombre de places restantes en moins de 3 secondes pour la charge nominale
**And** un responsable autorisé peut consulter la liste des participants et leur statut à jour

## Epic 4: Rencontres inter-clubs

Permettre d’organiser et de suivre les rencontres inter-clubs avec leurs participants, leurs informations logistiques et leurs mises à jour.

### Story 4.1: Créer et mettre à jour une rencontre inter-clubs

As a responsable autorisé,
I want créer puis mettre à jour une rencontre inter-clubs,
So that le club puisse centraliser ses informations logistiques et sportives dans un seul flux.

**Acceptance Criteria:**

**Given** qu’un responsable autorisé accède au module des rencontres inter-clubs
**When** il crée ou met à jour une rencontre
**Then** il peut renseigner le club adverse, le type de rencontre, la date, l’horaire, le lieu et les informations pratiques
**And** la rencontre reste modifiable jusqu’à sa clôture selon les permissions prévues

### Story 4.2: Gérer les participants concernés et leur consultation

As a responsable ou utilisateur concerné,
I want gérer les participants ou convoqués puis consulter la rencontre associée,
So that chacun dispose d’une information à jour sur sa participation.

**Acceptance Criteria:**

**Given** qu’une rencontre inter-clubs existe
**When** un responsable associe des participants ou convoqués et publie l’information
**Then** les utilisateurs concernés peuvent consulter les informations qui les concernent
**And** le panneau participants / convocations permet une lecture rapide des statuts et de la diffusion aux bonnes personnes

## Epic 5: Créneaux de gymnase et planning

Permettre au club de gérer ses créneaux, prévenir les conflits et diffuser un planning fiable aux adhérents.

### Story 5.1: Créer et republier un créneau de gymnase

As a responsable autorisé,
I want créer, modifier, annuler ou republier un créneau,
So that le club puisse maintenir une planification de salle fiable dans le temps.

**Acceptance Criteria:**

**Given** qu’un responsable autorisé gère les créneaux
**When** il crée, modifie, annule ou republie un créneau
**Then** le système enregistre l’activité liée, le statut du créneau et ses informations de planification
**And** seuls les créneaux publiés sont destinés à la consultation adhérent

### Story 5.2: Détecter les conflits et visualiser le planning

As a responsable du club,
I want détecter les conflits de planning et visualiser les créneaux dans une timeline lisible,
So that les erreurs de réservation ou de diffusion soient repérées avant publication.

**Acceptance Criteria:**

**Given** qu’il existe plusieurs créneaux pour une même ressource planifiée
**When** un responsable consulte ou modifie le planning
**Then** le système signale les conflits détectés pour la même ressource
**And** la timeline de créneaux affiche clairement les états confirmé, modifié, annulé et conflit

### Story 5.3: Publier les créneaux aux adhérents et notifier les changements

As a adhérent ou responsable,
I want consulter les créneaux publiés et être informé des changements importants,
So that chacun dispose d’un planning à jour sans ambiguïté.

**Acceptance Criteria:**

**Given** qu’un créneau est publié ou modifié après publication
**When** un adhérent consulte le planning ou qu’un changement majeur survient
**Then** il ne voit que les créneaux qui le concernent
**And** les adhérents concernés sont notifiés en cas d’annulation, changement d’horaire, changement de lieu ou modification de capacité

## Epic 6: Informations club, documents partagés et communication

Permettre au club de centraliser documents, annonces et canaux d’information pour que les adhérents retrouvent les bonnes informations au bon endroit.

### Story 6.1: Publier un document club dans l’espace partagé

As a administrateur du club,
I want publier un document général dans l’espace documentaire partagé,
So that les adhérents puissent retrouver les documents utiles du club dans un référentiel unique.

**Acceptance Criteria:**

**Given** qu’un administrateur gère les documents club
**When** il publie un document général dans l’espace partagé
**Then** le document est stocké avec les bonnes règles de visibilité et rendu consultable aux rôles autorisés
**And** l’espace documentaire présente la dernière version disponible de manière claire

### Story 6.2: Créer des canaux d’information et publier des annonces ciblées

As a administrateur ou responsable autorisé,
I want créer des canaux et publier des annonces ciblées,
So that les bonnes informations soient diffusées à la bonne audience sans canal externe parallèle.

**Acceptance Criteria:**

**Given** qu’un administrateur peut gérer les canaux d’information
**When** un responsable autorisé publie une annonce dans un canal
**Then** le système associe l’annonce à une audience définie selon les rôles ou segments disponibles
**And** la publication distingue clairement information simple et action attendue

### Story 6.3: Consulter annonces et documents utiles côté adhérent

As a adhérent,
I want consulter mes annonces et documents utiles dans une interface claire,
So that je retrouve rapidement les informations importantes du club sans passer par une messagerie externe.

**Acceptance Criteria:**

**Given** qu’un adhérent possède des annonces et documents visibles pour son rôle
**When** il consulte l’espace d’information du club
**Then** il voit uniquement les contenus qui lui sont destinés
**And** le rail annonces et infos club hiérarchise les contenus par fraîcheur et criticité

## Epic 7: Administration, audit et exploitation

Permettre au club de piloter l’application, tracer les actions sensibles, gérer les paramètres du club et exploiter le produit en conditions sûres.

### Story 7.1: Afficher un tableau de bord admin et gérer les paramètres du club

As a administrateur du club,
I want consulter un tableau de bord opérationnel et gérer les informations générales du club,
So that je puisse piloter l’application avec une vision claire des actions en attente et des paramètres actifs.

**Acceptance Criteria:**

**Given** qu’un administrateur authentifié accède à l’espace de pilotage
**When** il ouvre le tableau de bord ou les paramètres du club
**Then** il voit au minimum les membres en attente d’action, les cotisations non à jour, les alertes documentaires, les prochains événements et les changements récents de créneaux
**And** il peut mettre à jour les informations générales du club utilisées dans l’application

### Story 7.2: Consulter le journal d’audit des actions sensibles

As a administrateur du club,
I want consulter le journal des actions d’administration sensibles,
So that je puisse vérifier qui a fait quoi et quand sur les opérations critiques.

**Acceptance Criteria:**

**Given** que des actions d’administration sensibles sont exécutées dans l’application
**When** un administrateur consulte le journal d’audit
**Then** il retrouve l’acteur, l’horodatage et le type d’action pour les opérations concernées
**And** le journal reste distinct des logs techniques et lisible pour un usage métier

### Story 7.3: Gérer confidentialité, consentements et suppression de données

As a administrateur du club,
I want contrôler les informations de confidentialité, les preuves de consentement et les demandes de suppression ou anonymisation,
So that l’application reste exploitable dans un cadre conforme aux règles du club et aux obligations de données.

**Acceptance Criteria:**

**Given** qu’un membre possède des documents obligatoires et des données personnelles dans le système
**When** un administrateur consulte les informations de traitement, les consentements ou une demande de suppression
**Then** l’origine, la date et le type de preuve requis sont traçables
**And** la suppression ou l’anonymisation peut être engagée dans le cadre prévu par les règles de conservation applicables

### Story 7.4: Mettre en place l’observabilité opérationnelle du MVP

As a administrateur technique ou équipe produit,
I want superviser l’état de l’application et diagnostiquer rapidement les incidents,
So that le MVP reste exploitable sans confondre exploitation technique et audit métier.

**Acceptance Criteria:**

**Given** qu’une version exploitable du MVP existe
**When** la story est terminée
**Then** le produit dispose de logs structurés, d’un suivi d’erreurs et d’un mécanisme de supervision cohérent avec les NFR d’exploitation
**And** les signaux d’exploitation restent distincts du journal d’audit métier

### Story 7.5: Sécuriser sauvegarde et restauration des données métier

As a administrateur technique ou administrateur autorisé,
I want disposer d’une sauvegarde quotidienne et d’un cadre de restauration vérifiable,
So that les données du club restent récupérables après incident majeur.

**Acceptance Criteria:**

**Given** que l’application gère des données métier et documentaires du club
**When** la story est terminée
**Then** une sauvegarde complète quotidienne est exécutée avec un journal de succès consultable par un administrateur autorisé
**And** un cadre de restauration documenté permet de viser un objectif de reprise inférieur à 24 heures conformément aux NFR
