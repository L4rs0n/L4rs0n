---
title: "Sprint Change Proposal: L4rs0n"
status: "approved"
approvalStatus: "approved"
created: "2026-04-14T00:00:00+02:00"
updated: "2026-04-14T00:00:00+02:00"
workflowType: "correct-course"
project_name: "L4rs0n"
user_name: "LUTCHANAH Kévin"
date: "2026-04-14T00:00:00+02:00"
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/epics.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
  - "_bmad-output/planning-artifacts/implementation-readiness-report-2026-04-14.md"
---

# Sprint Change Proposal

## 1. Issue Summary

### Trigger

Le changement est déclenché par le contrôle `IR` du 14 avril 2026, qui a mis en évidence trois écarts de readiness dans les artefacts de planification :

1. `FR4` est cartographiée comme couverte dans `epics.md`, mais aucune story ne porte explicitement l'activation, la désactivation, l'archivage et la réactivation d'un compte.
2. `Story 7.4` est trop large, mélange plusieurs sujets d'exploitation et dépend d'un état avancé du MVP.
3. Plusieurs conventions d'implémentation frontend sont présentes dans l'UX spec, mais restent implicites dans l'architecture.

### Problem Statement

Le projet est globalement bien cadré, mais il existe un écart entre la couverture affichée au niveau epic et la readiness réelle au niveau story. Si ces écarts ne sont pas corrigés maintenant, l'équipe risque de démarrer l'implémentation avec :

- une exigence fonctionnelle non portée par une unité de travail claire ;
- une story d'exploitation difficile à estimer et à valider ;
- des choix frontend critiques laissés à interprétation.

### Evidence

- Rapport IR : `implementation-readiness-report-2026-04-14.md`
- Exigence concernée : `FR4` dans `prd.md` et `epics.md`
- Stories concernées : `Story 1.1`, `Story 1.4`, `Story 7.4` dans `epics.md`
- Alignement UX/architecture partiel : `ux-design-specification.md` versus `architecture.md`

## 2. Checklist Results

### Section 1 - Understand the Trigger and Context

- `1.1` [x] Done - Trigger identifié dans l'IR, avec focus principal sur `FR4` et `Story 7.4`
- `1.2` [x] Done - Problème catégorisé comme compréhension incomplète des exigences au niveau backlog et readiness story
- `1.3` [x] Done - Évidence collectée depuis les artefacts de planning et le rapport IR

### Section 2 - Epic Impact Assessment

- `2.1` [x] Done - Epic 1 et Epic 7 restent viables, mais nécessitent ajustements
- `2.2` [x] Done - Modifications de stories requises, sans création d'un nouvel epic
- `2.3` [x] Done - Aucun impact bloquant identifié sur les epics 2 à 6
- `2.4` [x] Done - Aucun epic futur invalidé ; pas de nouvel epic nécessaire
- `2.5` [!] Action-needed - L'ordre global des epics peut rester identique, mais certaines responsabilités de fondation doivent être clarifiées entre Epic 1 et Epic 7

### Section 3 - Artifact Conflict and Impact Analysis

- `3.1` [x] Done - Pas de conflit PRD bloquant ; le MVP reste atteignable sans réduction de périmètre
- `3.2` [x] Done - `architecture.md` nécessite un addendum frontend et une clarification setup versus exploitation
- `3.3` [x] Done - Pas de conflit UX de fond ; les exigences UX sont déjà correctes mais doivent mieux se refléter dans l'architecture
- `3.4` [!] Action-needed - Aucun `sprint-status.yaml` ni artefact d'implémentation n'est encore présent ; la mise à jour de statut ne pourra se faire qu'après validation et lancement du sprint

### Section 4 - Path Forward Evaluation

- `4.1` [x] Viable - Ajustement direct des artefacts
- `4.2` [x] Not viable - Aucun rollback utile à ce stade
- `4.3` [x] Not viable - Pas besoin de revoir le MVP du PRD pour traiter ces écarts
- `4.4` [x] Done - Approche retenue : `Option 1` avec addendum d'architecture

### Section 5 - Sprint Change Proposal Components

- `5.1` [x] Done
- `5.2` [x] Done
- `5.3` [x] Done
- `5.4` [x] Done
- `5.5` [x] Done

### Section 6 - Final Review and Handoff

- `6.1` [x] Done
- `6.2` [x] Done
- `6.3` [!] Action-needed - Approbation utilisateur en attente
- `6.4` [N/A] Skip - Aucun `sprint-status.yaml` à mettre à jour pour l'instant
- `6.5` [!] Action-needed - Handoff final à confirmer après approbation

## 3. Impact Analysis

### Epic Impact

#### Epic 1 - Accès au club et socle d'expérience

- Impact direct : `FR4` n'est pas portée par une story explicite.
- Changement requis :
  - clarifier `Story 1.1` sur le périmètre exact du pipeline de qualité minimal ;
  - ajouter une story explicite pour le cycle de vie administratif des comptes.

#### Epic 7 - Administration, audit et exploitation

- Impact direct : `Story 7.4` est trop large et dépendante du reste du MVP.
- Changement requis :
  - retirer la responsabilité de pipeline qualité minimal de `Story 7.4` ;
  - découper la story en unités d'exploitation indépendantes.

#### Epics 2 à 6

- Aucun changement de périmètre requis.
- Pas de dépendance future invalidée.

### Artifact Conflicts

#### PRD

- Aucun conflit avec les objectifs, le MVP ou les FR/NFR.
- Aucune modification textuelle obligatoire proposée dans `prd.md`.

#### Architecture

- Ajout recommandé d'une section explicite de conventions frontend pour :
  - primitives UI accessibles ;
  - chargement des polices ;
  - composants métier UX prioritaires ;
  - conventions de navigation par surface ;
  - états UI critiques et patterns de feedback.

#### UX

- L'UX spec reste valide.
- Aucun changement de contenu produit n'est nécessaire.
- Le besoin est de mieux refléter cette spec dans l'architecture, pas de la réécrire.

#### Secondary Artifacts

- Aucun artefact d'implémentation n'existe encore dans `_bmad-output/implementation-artifacts`.
- La réorganisation du backlog devra être reflétée plus tard dans le sprint planning, pas maintenant.

## 4. Recommended Approach

### Chosen Path

`Option 1 - Direct Adjustment` avec clarification d'architecture.

### Rationale

Cette approche est la plus proportionnée parce que :

- l'écart porte sur la traduction backlog/architecture, pas sur la vision produit ;
- le PRD et l'UX sont solides et ne nécessitent pas de remise à plat ;
- le coût de correction est faible à modéré ;
- elle préserve l'élan du projet sans introduire de replanification lourde.

### Effort and Risk

- Effort estimate: `Medium`
- Risk level: `Low`
- Timeline impact: limité à un cycle court de mise à jour des artefacts de planification avant sprint planning

### Alternatives Considered

- `Option 2 - Rollback`: non pertinente, car aucun travail implémenté n'a besoin d'être annulé
- `Option 3 - PRD MVP Review`: disproportionnée, car le MVP n'est pas remis en cause

## 5. Detailed Change Proposals

### 5.1 Update Epic 1 Story 1.1

**Artifact:** `epics.md`  
**Story:** `Story 1.1`  
**Section:** `Acceptance Criteria`

**OLD**

```md
**Given** que le dépôt d’implémentation démarre vide
**When** la story est terminée
**Then** un projet Next.js App Router TypeScript avec `src/`, Tailwind, lint et structure de domaines existe
**And** la base de configuration pour Prisma, Better Auth, Zod, variables d’environnement et pipeline qualité est préparée sans créer tout le modèle métier upfront
```

**NEW**

```md
**Given** que le dépôt d’implémentation démarre vide
**When** la story est terminée
**Then** un projet Next.js App Router TypeScript avec `src/`, Tailwind, lint et structure de domaines existe
**And** la base de configuration pour Prisma, Better Auth, Zod et variables d’environnement est préparée sans créer tout le modèle métier upfront
**And** un pipeline qualité minimal de fondation exécute au moins `lint`, `typecheck` et `build` sur le dépôt dès le démarrage, prêt à être étendu par les stories d’exploitation
```

**Rationale**

Cette modification retire l'ambiguïté entre fondation greenfield et exploitation avancée. Le pipeline minimal de base appartient à l'initialisation du projet, pas à une story tardive d'exploitation.

### 5.2 Add Epic 1 Story 1.5

**Artifact:** `epics.md`  
**Epic:** `Epic 1 - Accès au club et socle d’expérience`

**OLD**

```md
Aucune story explicite ne couvre FR4.
```

**NEW**

```md
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
```

**Rationale**

Cette story ferme explicitement le trou de traçabilité entre `FR4` et le backlog d'implémentation.

### 5.3 Replace Epic 7 Story 7.4 and Split the Scope

**Artifact:** `epics.md`  
**Story:** `Story 7.4`

**OLD**

```md
### Story 7.4: Préparer l’exploitation avec qualité, sauvegarde et observabilité

As a équipe produit ou administrateur technique,
I want disposer des garde-fous d’exploitation du MVP,
So that l’application reste déployable, surveillable et récupérable en conditions réelles.

**Acceptance Criteria:**

**Given** que les capacités métier principales du MVP existent
**When** la story est terminée
**Then** le produit dispose d’un pipeline de qualité, d’un mécanisme de sauvegarde quotidienne, d’un cadre de restauration et d’une supervision adaptée aux NFR d’exploitation
**And** les logs structurés, le suivi d’erreurs et les contrôles associés sont en place sans mélanger exploitation technique et audit métier
```

**NEW**

```md
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
```

**Rationale**

Le découpage rend les stories estimables, testables et indépendantes. Il retire aussi la dépendance inutile au reste du MVP pour des éléments de fondation ou de durcissement d'exploitation.

### 5.4 Add Architecture Frontend Implementation Conventions

**Artifact:** `architecture.md`  
**Section:** nouvelle sous-section à ajouter après les conventions structurelles frontend/backend

**OLD**

```md
Aucune section explicite ne rassemble les conventions frontend dérivées de l’UX spec.
```

**NEW**

```md
### Frontend Implementation Conventions

- Les primitives UI accessibles retenues pour le MVP s’appuient sur `shadcn/ui` avec `Radix UI` lorsque pertinent, afin de limiter les divergences d’implémentation sur accessibilité, focus et overlays.
- Les polices `Barlow Condensed`, `Source Sans 3` et `IBM Plex Mono` sont chargées via `next/font` et exposées via des tokens ou variables CSS partagées.
- Les premiers composants métier frontend à traiter comme références du design system produit sont :
  - `Badge d’éligibilité`
  - `Panneau conformité membre`
  - `Carte activité`
  - `Timeline de créneaux`
  - `Panneau participants / convocations`
  - `Rail annonces et infos club`
- Les surfaces `(member)` et `(admin)` suivent des conventions de navigation distinctes : mobile-first orienté action rapide côté adhérent, sidebar et vues denses côté administration, breadcrumb limité aux parcours administratifs profonds.
- Tout composant métier critique doit définir explicitement ses états `empty`, `loading`, `error` et `success`.
- Les patterns de feedback frontend sont normalisés : succès par `toast` plus état persistant, erreurs inline près du problème avec résumé si nécessaire, warning en bannière contextuelle.
```

**Rationale**

L'UX spec est déjà assez précise. Le manque porte sur sa traduction en règles d'implémentation. Cet addendum réduit le risque de divergence entre agents et futurs développeurs.

### 5.5 PRD and UX Handling

**Artifact:** `prd.md`  
**Proposal:** `No textual change`

**Rationale**

Le PRD reste cohérent avec le changement proposé. Le problème est de readiness backlog/architecture, pas de périmètre produit.

**Artifact:** `ux-design-specification.md`  
**Proposal:** `No textual change`

**Rationale**

L'UX spec contient déjà les exigences nécessaires. Le bon correctif consiste à les refléter plus explicitement dans l'architecture et le backlog, pas à modifier l'intention UX.

## 6. PRD MVP Impact and High-Level Action Plan

### MVP Impact

- MVP affecté: `Non`
- Changement de scope: `Non`
- Réduction de périmètre: `Non`

### Action Plan

1. Mettre à jour `epics.md` avec la clarification de `Story 1.1`
2. Ajouter `Story 1.5` pour couvrir `FR4`
3. Remplacer `Story 7.4` par une version recentrée et ajouter `Story 7.5`
4. Mettre à jour `architecture.md` avec l'addendum frontend
5. Repasser un contrôle léger de readiness sur les artefacts modifiés
6. Enchaîner vers `Sprint Planning`

### Dependencies and Sequencing

- Dépendance 1: validation du Sprint Change Proposal
- Dépendance 2: mise à jour des artefacts de planning
- Dépendance 3: création du sprint/backlog d'implémentation à partir de la nouvelle version

## 7. Implementation Handoff

### Scope Classification

`Moderate`

### Handoff Recipients

- `Product Owner / Scrum Master`
  - mettre à jour le backlog de stories et leur ordre logique
  - garantir la couverture explicite de `FR4`
  - clarifier les responsabilités de fondation versus exploitation

- `Architect`
  - ajouter les conventions frontend manquantes à `architecture.md`
  - vérifier que l'addendum reste cohérent avec les sections existantes

- `Implementation team`
  - ne pas démarrer le sprint sur l'ancienne version des stories concernées
  - utiliser les stories corrigées comme nouvelle base de préparation

### Success Criteria

- `FR4` est explicitement portée par une story
- l'ambiguïté entre fondation CI minimale et exploitation avancée est supprimée
- l'ancienne `Story 7.4` n'existe plus sous forme monolithique
- les conventions frontend critiques sont explicites dans l'architecture

## 8. Approval Gate

Cette proposition a été validée par l'utilisateur et appliquée aux artefacts de planification.

Statut actuel :

- Proposition générée : `Oui`
- Approbation utilisateur : `Oui`
- Mise à jour des artefacts source : `Effectuée`
- Handoff final : `Prêt`
