---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
inputDocuments:
  - "docs/cadrage-application-clubs-sportifs.md"
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/product-brief-L4rs0n.md"
  - "docs/Plan de Développement de l'Application de Gestion de Clubs Sportifs Amateurs.md"
workflowType: "architecture"
lastStep: 8
status: "complete"
completedAt: "2026-04-14T00:00:00+02:00"
project_name: "L4rs0n"
user_name: "LUTCHANAH Kévin"
date: "2026-04-08T20:34:14.1245963+02:00"
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
Le projet couvre 49 exigences fonctionnelles réparties sur 9 domaines métiers principaux : gestion des comptes et accès, gestion des membres, cotisations et éligibilité, documents et conformité, événements, rencontres inter-clubs, gestion du gymnase, communication club et administration.

Le centre de gravité architectural du système est la fiche membre. Elle ne constitue pas seulement un module fonctionnel, mais le pivot de plusieurs capacités transverses : rôles, statut d’adhésion, éligibilité, documents obligatoires, visibilité des informations et participation aux activités. Cette centralité impose une modélisation cohérente et stable du domaine membre.

Les événements, rencontres inter-clubs et créneaux de gymnase constituent un second ensemble métier cohérent autour de la planification et de la publication d’activités. Ces modules partagent des besoins communs de calendrier, de statut, de capacité, de diffusion d’informations et de notifications.

Le produit applique des règles métier actives, notamment le contrôle d’éligibilité selon le statut de cotisation et la complétude documentaire. Ces règles doivent être conçues comme des politiques métier centralisées et réutilisables, non comme des validations dispersées dans les écrans ou dupliquées dans plusieurs modules.

Le cadrage resserré du MVP et le PRD doivent être considérés comme les sources de vérité prioritaires. Le plan de développement initial, plus large, reste utile comme historique et source d’extensions futures, mais ne doit pas gouverner l’architecture de la V1.

**Non-Functional Requirements:**
Les NFR du projet imposent plusieurs contraintes structurantes :

- contrôle d’accès par rôles sur tous les écrans et opérations protégés ;
- journalisation des actions sensibles avec acteur, horodatage et type d’action ;
- conformité RGPD sur conservation, visibilité, suppression et anonymisation des données ;
- séparation claire entre données métier relationnelles et documents stockés ;
- sauvegarde quotidienne et capacité de restauration ;
- performance correcte sous charge nominale pour un club de 150 adhérents ;
- accessibilité WCAG 2.1 AA sur les parcours critiques ;
- usage mobile fluide sans application native dédiée.

Ces exigences orientent l’architecture vers une solution web sobre mais disciplinée, avec décisions serveur faisant foi pour les autorisations, les règles d’éligibilité et la traçabilité. La testabilité des règles critiques est une exigence implicite majeure du projet.

**Scale & Complexity:**
Le projet est limité en volume, en nombre d’utilisateurs et en complexité d’exploitation grâce au choix mono-club, mono-instance. Cette décision constitue un levier volontaire de simplification pour la V1.

En revanche, la complexité fonctionnelle reste intermédiaire à soutenue à cause de la densité des règles métier, des différences de visibilité selon les rôles, de la gouvernance documentaire et des exigences de traçabilité.

- Primary domain: application web full-stack de gestion associative
- Complexity level: medium
- Architectural profile: faible complexité d’infrastructure, complexité métier et gouvernance modérées à élevées
- Estimated architectural components: noyau identité et accès, domaine membres, domaine activités planifiées, domaine contenus et documents, notifications, audit, API applicative, interface web, stockage relationnel, stockage fichiers

### Technical Constraints & Dependencies

Les contraintes et dépendances identifiées à ce stade sont les suivantes :

- MVP mono-club, mono-instance ;
- discipline initiale : badminton ;
- volume cible : 80 à 150 adhérents ;
- application web responsive obligatoire ;
- authentification par email et mot de passe ;
- paiements en ligne hors périmètre ;
- pas de messagerie temps réel libre dans la V1 ;
- pas de gestion multi-tenant dans la V1 ;
- stockage de documents avec visibilité contrôlée par rôle ;
- journalisation obligatoire des opérations administratives sensibles ;
- architecture devant rester extensible vers d’autres sports et, à terme, d’autres clubs, sans introduire dès maintenant les coûts de conception du multi-tenant.

### Cross-Cutting Concerns Identified

Les préoccupations transverses qui affecteront plusieurs composants sont :

- authentification et cycle de vie des comptes ;
- gestion des rôles et permissions ;
- politiques d’éligibilité métier ;
- visibilité et publication selon les audiences ;
- traçabilité et audit ;
- gestion documentaire et conformité RGPD ;
- notifications liées aux événements, créneaux et annonces ;
- architecture mobile-first sur les parcours critiques ;
- préparation de points d’extension future sans complexifier la V1.

### Major Architectural Uncertainties

Les incertitudes les plus susceptibles d’impacter les décisions d’architecture sont :

- la matrice détaillée des droits par action et par rôle ;
- le cycle d’adhésion exact et les transitions de statut membre ;
- la liste finale des documents obligatoires et leur niveau de sensibilité ;
- les règles fines d’inscription, de blocage et d’exception ;
- le niveau exact de mutualisation entre événements, rencontres et créneaux dans le modèle métier.

### Operational Product Framing

L4rs0n doit être conçu comme la source unique d’information opérationnelle du club pour le périmètre MVP. La valeur du produit ne réside pas seulement dans la présence de modules fonctionnels, mais dans la centralisation d’un état fiable et exploitable des membres, activités, documents et annonces.

L’architecture doit donc favoriser la cohérence, la lisibilité et la suppression des ressaisies ou arbitrages manuels entre outils. Cette orientation est directement liée à l’objectif produit de réduction des outils externes utilisés au quotidien.

### Usage Surface Split

Le contexte produit fait apparaître deux surfaces d’usage distinctes :

- une surface de gestion et de coordination pour les administrateurs, trésoriers et responsables ;
- une surface de consultation et d’action rapide pour les adhérents.

Cette distinction a des implications architecturales importantes : modèle d’autorisation, structuration des écrans, hiérarchisation des API, priorisation mobile et séparation des cas d’usage à forte densité administrative des parcours courts à faible friction.

Le produit devra être pensé comme desktop-friendly pour les opérations d’administration plus riches, et mobile-first pour les parcours critiques des adhérents.

### Domain Structuring Watchpoint

Le périmètre actuel suggère une possible parenté forte entre les événements, les rencontres inter-clubs et les créneaux de gymnase. Ces éléments partagent plusieurs caractéristiques : planification temporelle, lieu, statut, audience, publication, notifications et parfois participants.

L’architecture devra donc arbitrer explicitement entre :

- un modèle unifié d’activité planifiée avec spécialisations ;
- ou des sous-domaines distincts partageant seulement certains services transverses.

Cette décision influencera directement la cohérence métier, la simplicité du modèle de données et la réutilisation des règles de publication et de notification.

### High-Level Domain Invariants

Plusieurs invariants métier apparaissent déjà dans les documents et devront être protégés par l’architecture :

- un membre non éligible ne peut pas contourner les restrictions de participation ;
- une donnée ou un contenu publié doit avoir une audience et une visibilité cohérentes ;
- une action administrative sensible doit être traçable ;
- un document doit être gouverné par des règles explicites de propriétaire, d’accès et, à terme, de conservation ;
- les règles de vérité métier doivent être décidées côté serveur et non implicitement déléguées à l’interface.

### Architectural Responsibility Framing

Le contexte du projet fait apparaître trois niveaux de responsabilités qu’il faudra garder distincts dans l’architecture :

- les sous-domaines métier, qui portent les entités, workflows et règles propres au club ;
- les politiques transverses, qui s’appliquent à plusieurs sous-domaines ;
- les capacités techniques de plateforme, qui soutiennent l’exécution du système sans porter directement le métier.

Dans L4rs0n, les sous-domaines métier incluent notamment les membres, les activités planifiées, les contenus club et l’administration opérationnelle. Les politiques transverses incluent l’autorisation, l’éligibilité, la visibilité, l’audit et la gouvernance documentaire. Les capacités techniques de plateforme incluent l’authentification, le stockage, les notifications, l’interface web et la persistance.

Cette distinction est importante pour éviter la duplication de logique métier et pour préparer un document d’architecture lisible, testable et directement exploitable en implémentation.

### CRUD vs Policy-Driven Depth

Toutes les capacités du système n’exigent pas le même niveau de profondeur architecturale. Certaines zones pourront être implémentées avec une logique majoritairement orientée CRUD et des validations simples. En revanche, les zones suivantes doivent être considérées comme pilotées par des politiques métier explicites :

- autorisation et contrôle d’accès ;
- éligibilité des membres ;
- visibilité des contenus et publications ;
- audit des actions sensibles ;
- gouvernance des documents.

Le contexte projet suggère donc une architecture hybride : simple sur les flux standard, mais rigoureuse et centralisée sur les décisions métier critiques.

### Foundational Capability Stack

Avant les enrichissements fonctionnels, plusieurs capacités fondationnelles apparaissent comme structurantes pour la suite de l’implémentation :

- identité et accès ;
- modèle membre et statuts ;
- politiques d’éligibilité ;
- audit et journalisation ;
- gouvernance documentaire ;
- gestion des activités planifiées ;
- notifications applicatives.

Cette lecture préparera plus naturellement les décisions d’architecture détaillées, puis le découpage en lots d’implémentation cohérents.

### Extension Strategy Guardrail

Le projet doit rester extensible vers d’autres sports et, à terme, vers d’autres clubs, mais cette extensibilité ne doit pas modeler prématurément l’architecture de la V1.

Le principe directeur est donc le suivant : architecture future-ready sans architecture future-shaped. L’objectif est de préparer des points d’extension explicites, sans introduire dès maintenant les coûts du multi-tenant, d’un moteur de règles générique ou d’une configurabilité profonde qui ne sont pas requis pour le MVP.

### Document Sensitivity Segmentation

Le contexte suggère au moins deux grandes classes documentaires distinctes :

- les documents club, orientés diffusion et information collective ;
- les documents membres, potentiellement liés à des obligations, à des justificatifs ou à des données personnelles plus sensibles.

Cette distinction est importante pour les futures décisions d’architecture, car elle impacte les modèles d’accès, la traçabilité, la rétention, les parcours de consultation et les opérations de suppression ou d’anonymisation.

### Controlled Coupling Principle

Même si l’architecture cible probablement une base de déploiement simple, le projet devra maintenir un couplage maîtrisé entre ses grands ensembles fonctionnels.

L’objectif n’est pas de distribuer prématurément le système, mais de permettre une composition progressive de modules cohérents au sein d’une architecture applicative simple. Cette orientation réduira le risque de duplication de logique, de régressions transverses et de blocage de l’implémentation par dépendances trop fortes entre domaines.

### Asymmetric Risk Reminder

Malgré un périmètre d’exploitation modeste, certaines erreurs ont un impact métier et de confiance disproportionné :

- accès inapproprié à un document sensible ;
- participation autorisée malgré une inéligibilité ;
- action administrative sensible non tracée ;
- contenu ou information publiée à une audience incorrecte.

Ces risques doivent influencer les décisions d’architecture plus fortement que la seule volumétrie du système.

### Light Configuration Watchpoints

Même si la V1 doit rester simple et éviter une configurabilité profonde, certains éléments du domaine présentent une probabilité élevée d’évolution opérationnelle à court ou moyen terme :

- statuts membres ;
- types d’activités ;
- audiences de diffusion ;
- catégories documentaires ;
- certaines règles d’exception liées à l’éligibilité ou à la publication.

L’architecture n’a pas à transformer ces besoins en moteur de règles générique dès le MVP, mais elle doit éviter de figer inutilement des zones du domaine qui auront vraisemblablement besoin d’un paramétrage léger ou d’une évolution administrative contrôlée.

### Coexistence With Existing Club Channels

L4rs0n vise à devenir la source de vérité opérationnelle du club, sans supposer qu’il remplacera immédiatement tous les canaux historiques de communication.

Dans le MVP, les notifications et annonces doivent donc être pensées comme une capacité de coordination pouvant coexister avec l’email et d’autres usages existants du club. Cette orientation réduit le risque d’un design trop fermé et soutient une adoption plus réaliste.

### Silent Failure Risk

Au-delà des erreurs visibles, l’architecture devra limiter les défaillances silencieuses sur les flux critiques, notamment :

- notification non envoyée ou non tracée ;
- contenu publié avec une audience incorrecte ;
- document rendu inaccessible ou trop visible par erreur ;
- incohérence de statut membre après une opération d’administration.

Ces situations doivent être considérées comme des risques de confiance produit, même lorsqu’elles n’entraînent pas d’indisponibilité technique manifeste.

## Starter Template Evaluation

### Primary Technology Domain

Application web full-stack basée sur React, avec interface responsive, back-office, espace adhérent, authentification, API serveur et base de données relationnelle.

En l’absence de préférences techniques explicites documentées, les hypothèses de travail retenues pour évaluer les starters sont :

- TypeScript comme langage principal ;
- framework web full-stack React plutôt qu’un frontend-only starter ;
- base relationnelle PostgreSQL ;
- déploiement simple et portable ;
- architecture modulaire monolithique pour la V1.

### Starter Options Considered

**1. create-next-app**
Starter officiel Next.js, actuellement aligné sur l’App Router, TypeScript, Tailwind CSS, linter et conventions de structure modernes. C’est l’option la plus sobre et la plus maintenue pour une application web full-stack React avec routes serveur, rendu hybride et interface admin + adhérent.

Forces pour L4rs0n :

- starter officiel, très maintenu ;
- excellent fit pour un monolithe modulaire full-stack ;
- permet de garder les décisions auth, ORM et notifications ouvertes pour les prochaines étapes ;
- bon compromis entre simplicité initiale et extensibilité ;
- réduit le risque de sur-construction du MVP.

Limites :

- ne fournit pas d’emblée la couche base de données, auth ou conventions backend plus poussées ;
- demande de compléter ensuite explicitement les choix de persistance, auth et politique métier.

**2. create-t3-app**
Starter orienté full-stack typesafe construit autour de Next.js et TypeScript, avec options pour Tailwind, tRPC, Prisma ou Drizzle, NextAuth.js et base PostgreSQL.

Forces pour L4rs0n :

- très bon si l’on veut une base full-stack TypeScript plus “batteries included” ;
- structure serveur plus explicite dès le départ ;
- validation d’environnement et conventions utiles pour une équipe intermédiaire.

Limites :

- introduit plus de décisions techniques d’un coup ;
- plus opinionated ;
- risque de figer trop tôt certains choix avant l’étape des décisions d’architecture détaillées.

**3. create-react-router**
Starter officiel React Router framework. Il fournit une base moderne avec conventions framework, routes, entrée client/serveur et templates prêts à déployer.

Forces :

- bon framework moderne React ;
- conventions claires ;
- SSR et route modules bien pensés.

Limites pour L4rs0n :

- moins naturel que Next.js pour ce type de produit full-stack orienté back-office, espace adhérent et BFF léger ;
- demanderait plus d’assemblage autour de la stratégie serveur, de l’écosystème et de certains patterns d’équipe.

**4. create-vite**
Excellent starter frontend, rapide et simple, avec templates React/TypeScript officiels.

Forces :

- très léger ;
- excellente expérience de développement frontend.

Limites pour L4rs0n :

- trop frontend-centric pour le besoin actuel ;
- nécessiterait de reconstruire séparément une partie importante de l’architecture serveur ;
- moins adapté comme fondation principale pour ce projet.

### Selected Starter: create-next-app

**Rationale for Selection:**
create-next-app est le meilleur point de départ pour L4rs0n parce qu’il offre une base officielle, stable et suffisamment complète pour une application web full-stack mono-club, tout en évitant d’imposer trop tôt des choix d’ORM, de RPC ou d’authentification qui doivent encore être arbitrés dans les décisions d’architecture.

Il correspond bien au profil du projet :

- MVP à complexité métier réelle mais infrastructure sobre ;
- besoin de rendu web full-stack et d’API côté application ;
- nécessité de garder une architecture modulaire, testable et maintenable par petite équipe ;
- volonté d’éviter l’architecture spéculative.

### Decision Posture

Le choix de `create-next-app` ne signifie pas que `create-t3-app` est moins pertinent techniquement. Il signifie que, à ce stade du workflow, L4rs0n bénéficie davantage d’un starter officiel, maintenu et moins engageant sur les décisions d’architecture interne.

L’objectif est de préserver l’espace de décision sur trois sujets encore à arbitrer proprement :

- la stratégie d’authentification ;
- la stratégie d’accès aux données et l’ORM ;
- le style d’API applicative et de services métier.

### Strong Alternative: create-t3-app

`create-t3-app` reste l’alternative la plus crédible si le projet décide rapidement de converger vers une base full-stack TypeScript plus opinionated, avec conventions plus fortes sur la base de données, l’authentification et la communication entre client et serveur.

Il doit donc être présenté comme un second choix fort, non comme une option écartée pour des raisons de qualité.

### Revisit Trigger

Le choix du starter devra être reconsidéré si, dans les décisions d’architecture suivantes, les arbitrages convergent explicitement vers :

- un besoin de typesafety full-stack plus prescriptive ;
- une stratégie ORM décidée très tôt ;
- une intégration auth structurée dès l’initialisation ;
- une volonté de réduire davantage les décisions d’assemblage au démarrage.

Dans ce cas, `create-t3-app` pourrait devenir le meilleur socle de départ.

### Why This Choice Fits The MVP Stage

Le choix de `create-next-app` optimise non seulement la sobriété technique, mais aussi la vitesse d’apprentissage du produit. Il permet de construire rapidement la première version utile sans confondre validation du besoin et verrouillage prématuré de choix techniques plus profonds.

Ce positionnement réduit également le risque de rework architectural précoce, en laissant la complexité se concentrer d’abord sur les règles métier, les accès, les documents et les flux critiques du MVP.

### Decisions Deferred By Starter

Le starter retenu fournit une base full-stack web solide, mais laisse volontairement ouverts plusieurs choix structurants qui seront traités dans les décisions d’architecture suivantes :

- stratégie d’authentification détaillée ;
- ORM et stratégie d’accès aux données ;
- organisation des services métier ;
- stratégie de tests ;
- orchestration des notifications ;
- conventions précises de modularisation métier.

Cette ouverture est considérée comme un avantage à ce stade du projet, car elle évite de confondre starter technique et architecture complète.

### Follow-On Responsibility

Le choix d’un starter plus ouvert implique en contrepartie une discipline explicite sur les étapes suivantes. Les décisions sur l’authentification, la persistance, l’organisation métier et la qualité logicielle devront être prises rapidement et documentées clairement pour conserver les bénéfices de simplicité obtenus au démarrage.

**Initialization Command:**

```bash
pnpm create next-app l4rs0n --ts --eslint --tailwind --app --src-dir --use-pnpm --import-alias "@/*"
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**

- TypeScript activé dès le départ ;
- framework React full-stack via Next.js App Router ;
- base adaptée à un monolithe modulaire web.

**Styling Solution:**

- Tailwind CSS inclus par défaut ;
- pratique pour un back-office, une UI responsive et un design system léger.

**Build Tooling:**

- outillage officiel Next.js ;
- Turbopack activé par défaut dans le flux actuel du starter.

**Testing Framework:**

- non préconfiguré par le starter ;
- à ajouter explicitement ensuite selon la stratégie de test retenue.

**Code Organization:**

- App Router ;
- structure `src/` ;
- conventions de routes, layouts, pages et handlers côté application.

**Development Experience:**

- starter officiel maintenu ;
- linter configuré ;
- conventions claires et très compatibles avec un travail assisté par agents.

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

- base de données principale : PostgreSQL relationnel managé, avec cible initiale PostgreSQL 16 ;
- ORM et migrations : Prisma ORM 7.3.x avec Prisma Migrate ;
- authentification : Better Auth 1.6.x avec authentification email/mot de passe et sessions persistées ;
- autorisation : RBAC côté serveur complété par une couche de policies métier pour l’éligibilité, la visibilité et les actions sensibles ;
- style d’API applicative : architecture server-first avec Next.js Server Actions pour les mutations internes et Route Handlers pour les endpoints HTTP explicites.

**Important Decisions (Shape Architecture):**

- validation : Zod 4 aux frontières d’entrée, côté serveur et côté formulaires ;
- frontend : App Router + React Server Components par défaut, Client Components uniquement pour les zones interactives ;
- stockage documentaire : métadonnées en base relationnelle + fichiers binaires en stockage objet privé S3-compatible ;
- déploiement : plateforme de déploiement simple et compatible Next.js, avec pipeline CI GitHub Actions ;
- observabilité : logs structurés applicatifs + suivi d’erreurs centralisé + audit métier séparé.

**Deferred Decisions (Post-MVP):**

- cache distribué type Redis ;
- GraphQL ou tRPC ;
- event bus ou file asynchrone dédiée ;
- moteur de règles configurable ;
- documentation OpenAPI générée automatiquement ;
- TanStack Query par défaut sur toute l’application.

### Data Architecture

**Primary Database**

- Décision : PostgreSQL managé, cible initiale PostgreSQL 16.
- Rationale : excellent fit pour un domaine relationnel structuré, contraintes d’intégrité, audit, rôles et requêtes administratives.
- Affects : membres, cotisations, rôles, activités, annonces, documents, audit.

**ORM**

- Décision : Prisma ORM 7.3.x.
- Rationale : bon compromis entre lisibilité, productivité, typage et migrations pour une petite équipe TypeScript.
- Affects : couche d’accès aux données, migrations, seed, testabilité.

**Data Modeling Approach**

- Décision : modèle relationnel normalisé, organisé par sous-domaines métier avec services applicatifs au-dessus du modèle.
- Rationale : éviter un CRUD trop couplé tout en gardant une base simple à faire évoluer.
- Affects : membres, activités planifiées, contenus, audit, documents.

**Validation Strategy**

- Décision : Zod 4 pour valider DTO, payloads de formulaires, paramètres d’URL, uploads et contrats internes.
- Rationale : alignement TypeScript fort sans multiplier les schémas.
- Affects : Server Actions, Route Handlers, formulaires, sécurité d’entrée.

**Migration Approach**

- Décision : Prisma Migrate comme mécanisme officiel de migration.
- Rationale : cohérent avec Prisma, simple pour CI/CD et environnements multiples.
- Affects : setup développement, CI, déploiements.

**Caching Strategy**

- Décision : cache applicatif minimal au départ, basé sur les primitives Next.js, sans Redis en V1.
- Rationale : volumétrie faible, priorité à la cohérence métier plutôt qu’à l’optimisation précoce.
- Affects : listes, tableaux de bord, vues adhérent, annonces.

### Authentication & Security

**Authentication Method**

- Décision : Better Auth 1.6.x, flux principal email/mot de passe, reset password, email verification activable.
- Rationale : adapté à un produit à comptes persistés et rôles internes ; meilleure dynamique actuelle de maintenance pour nouveaux projets.
- Affects : inscription, connexion, récupération de compte, sessions.

**Session Strategy**

- Décision : sessions persistées côté serveur avec cookies sécurisés.
- Rationale : meilleur contrôle opérationnel et meilleure invalidation que du JWT pur pour ce contexte.
- Affects : sécurité, administration, révocation de sessions.

**Authorization Pattern**

- Décision : RBAC serveur + policies métier dédiées pour éligibilité, visibilité et opérations sensibles.
- Rationale : les rôles seuls ne suffisent pas à exprimer les invariants métier de L4rs0n.
- Affects : accès aux écrans, mutations, documents, inscriptions.

**API Security**

- Décision : enforcement systématique côté serveur ; protection coarse-grained possible au niveau `proxy.ts`, mais vérité métier dans les handlers, actions et services.
- Rationale : éviter les contournements par UI ou middleware trop optimiste.
- Affects : toute surface protégée.

**Encryption & Sensitive Data Handling**

- Décision : hachage de mot de passe via la bibliothèque d’auth ; chiffrement en transit TLS ; stockage privé pour documents sensibles ; chiffrement au repos délégué aux services managés choisis.
- Rationale : pragmatique et suffisant pour le MVP sous réserve de bons fournisseurs managés.
- Affects : auth, documents, conformité RGPD.

### API & Communication Patterns

**Application API Pattern**

- Décision : Server Actions pour mutations same-origin, Route Handlers pour endpoints HTTP explicites, uploads, webhooks et cas d’intégration.
- Rationale : exploite bien Next.js sans créer une couche API séparée inutile.
- Affects : frontend, services métier, uploads, auth.

**External Contract Style**

- Décision : JSON/REST pour toute frontière explicitement HTTP.
- Rationale : plus simple, plus lisible, meilleur fit MVP que GraphQL ou tRPC.
- Affects : endpoints de fichiers, endpoints d’admin, intégrations futures.

**Error Handling Standard**

- Décision : erreurs métier typées, mappées vers réponses HTTP cohérentes et messages UI contrôlés.
- Rationale : éviter les erreurs techniques brutes et rendre testables les cas métier.
- Affects : UI, logs, audit, DX.

**Rate Limiting**

- Décision : limiter prioritairement auth, reset password, uploads et endpoints d’écriture exposés.
- Rationale : protection ciblée sans complexifier toute l’application.
- Affects : sécurité, prévention d’abus.

### Frontend Architecture

**Rendering Strategy**

- Décision : React Server Components par défaut, Client Components seulement là où l’interaction l’exige.
- Rationale : cohérent avec un produit data-heavy et back-office friendly.
- Affects : performance, bundle, lisibilité.

**State Management**

- Décision : pas de state manager global en V1 ; état local, URL state, données serveur et invalidation via primitives Next.js.
- Rationale : éviter la complexité prématurée.
- Affects : UI adhérent, back-office, formulaires.

**TanStack Query**

- Décision : différé par défaut ; adoption ciblée possible plus tard sur écrans très interactifs.
- Rationale : utile, mais pas nécessaire comme fondation initiale dans une architecture server-first.
- Affects : calendrier riche, dashboards live, interactions avancées.

**Component Architecture**

- Décision : organisation par domaines fonctionnels, avec couche UI partagée et composants métier distincts.
- Rationale : alignement direct avec les sous-domaines déjà identifiés.
- Affects : maintenabilité, découpage stories, lisibilité.

### Infrastructure & Deployment

**Hosting Strategy**

- Décision : déploiement initial sur plateforme compatible Next.js à faible friction, avec préférence pratique pour Vercel.
- Rationale : très bon fit avec Next.js, faible coût d’exploitation cognitive pour la V1.
- Affects : build, preview, déploiement, DX.

**Database Hosting**

- Décision : PostgreSQL managé.
- Rationale : réduire l’ops et garder une base fiable pour le MVP.
- Affects : persistance, sauvegardes, reprise.

**Object Storage**

- Décision : stockage objet privé S3-compatible pour les binaires, avec URLs signées ou accès serveur contrôlé.
- Rationale : séparation propre entre métadonnées et fichiers.
- Affects : documents club, documents membres.

**CI/CD**

- Décision : GitHub Actions pour lint, typecheck, tests, migrations contrôlées et déploiement.
- Rationale : simple, standard, bien adapté au repo.
- Affects : qualité, cadence, revues.

**Monitoring & Logging**

- Décision : logs structurés centralisés + suivi d’erreurs + audit métier en base.
- Rationale : distinguer exploitation technique et traçabilité fonctionnelle.
- Affects : support, sécurité, conformité.

### Decision Impact Analysis

**Implementation Sequence:**

1. Initialisation du projet Next.js
2. Mise en place PostgreSQL + Prisma
3. Mise en place Better Auth
4. Modèle membre, rôles et policies métier
5. Audit et journalisation
6. Stockage documentaire privé
7. Activités planifiées
8. Notifications et annonces

**Cross-Component Dependencies:**

- l’authentification conditionne les rôles, qui conditionnent l’autorisation ;
- le modèle membre conditionne l’éligibilité, les activités et les documents ;
- les documents conditionnent une partie des règles d’éligibilité ;
- les annonces, événements et créneaux partagent les policies de visibilité et de notification ;
- l’audit traverse toutes les opérations sensibles et doit être pensé dès les premières implémentations.

### Decision Stability Framing

Toutes les décisions prises dans cette section n’ont pas le même niveau de stabilité architecturale.

Les décisions les plus structurantes à ce stade sont :

- PostgreSQL comme base relationnelle principale ;
- RBAC complété par des policies métier serveur ;
- architecture server-first ;
- séparation entre métadonnées documentaires et stockage binaire ;
- audit métier distinct des logs techniques.

D’autres choix sont davantage des préférences pragmatiques de démarrage et restent plus facilement réversibles :

- plateforme de déploiement initiale ;
- fournisseur précis de stockage objet ;
- outillage exact d’observabilité ;
- niveau d’adoption initial de certains outils frontend complémentaires.

### Better Auth Decision Note

Le choix de Better Auth est retenu pour son bon alignement avec un produit à comptes persistés, rôles internes et sessions serveur. Ce choix devra toutefois être revalidé si les contraintes d’intégration, la maturité de l’équipe, ou les exigences de compatibilité à l’écosystème évoluent significativement pendant la phase de mise en œuvre.

### Application Layering Rule

Le choix `Server Actions + Route Handlers` implique une règle de structuration importante :

- les Server Actions et Route Handlers orchestrent les cas d’usage ;
- les services métier portent les décisions fonctionnelles et les policies ;
- les couches d’accès aux données et aux services externes restent séparées des règles métier.

Cette règle vise à éviter la dérive vers une logique métier dispersée dans les points d’entrée applicatifs.

### Test Strategy Clarification

La stratégie de qualité doit refléter la nature des risques du projet :

- tests unitaires prioritaires sur les policies métier, règles d’éligibilité et décisions de visibilité ;
- tests d’intégration sur auth, permissions, mutations critiques et accès documentaire ;
- tests end-to-end limités aux parcours critiques de confiance, notamment connexion, gestion membre, inscription à une activité et accès documentaire.

Cette hiérarchie de test est considérée comme plus adaptée au MVP qu’une dépendance excessive aux tests E2E.

### MVP Learning Bias

Les décisions d’architecture retenues privilégient non seulement la robustesse du MVP, mais aussi la vitesse d’ajustement du produit après retour terrain. L’objectif est de permettre des corrections rapides de règles métier, d’autorisations ou de workflows sans refonte structurelle disproportionnée.

### Anti-Overengineering Rule

La mise en œuvre devra suivre une règle explicite de sobriété :

- introduire une abstraction seulement lorsqu’elle protège une règle métier, une dépendance externe ou une variabilité réelle ;
- éviter les couches génériques sans cas d’usage concret ;
- privilégier les appels directs entre composants applicatifs tant qu’un découplage plus fort n’apporte pas de bénéfice clair.

Cette règle vise à préserver un monolithe modulaire simple plutôt qu’un pseudo-framework interne.

### Decision Type Separation

Les éléments de cette section relèvent de trois natures différentes qu’il faudra garder lisibles dans la suite du document :

- choix technologiques, comme PostgreSQL, Prisma ou Better Auth ;
- règles de structuration du code, comme la séparation entre actions, services métier et accès aux données ;
- contraintes de gouvernance, comme l’audit, la portabilité d’hébergement ou la protection des documents sensibles.

### Intentional Non-Choices

Certains éléments sont volontairement non retenus à ce stade, non par oubli, mais par discipline architecturale :

- cache distribué ;
- bus événementiel interne ;
- state manager global ;
- GraphQL ou tRPC ;
- moteur de règles configurable ;
- sur-optimisation frontend prématurée.

Leur absence doit être interprétée comme un choix de phase, réévaluable plus tard selon les besoins réels du produit.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
Les zones les plus susceptibles de produire des divergences entre agents sont :

- nommage des modèles de données, tables, colonnes et relations ;
- structuration des dossiers métier et de l’App Router ;
- emplacement de la logique métier par rapport aux Server Actions et Route Handlers ;
- formats de réponse et d’erreur ;
- conventions de validation et de parsing ;
- hiérarchie des tests ;
- gouvernance des documents et des policies d’accès.

### Naming Patterns

**Database Naming Conventions:**

- tables en `snake_case` pluriel : `members`, `club_documents`, `audit_logs` ;
- colonnes en `snake_case` : `member_id`, `created_at`, `is_active` ;
- clés étrangères en `snake_case` avec suffixe `_id` ;
- tables de jointure nommées explicitement : `member_roles` ;
- index nommés `idx_<table>_<columns>` : `idx_members_email`.

**Prisma Naming Conventions:**

- modèles Prisma en `PascalCase` singulier : `Member`, `ClubDocument`, `AuditLog` ;
- propriétés Prisma côté TypeScript en `camelCase` ;
- mapping SQL explicite via `@@map` et `@map` si nécessaire pour garder SQL en `snake_case`.

**API Naming Conventions:**

- endpoints HTTP explicites en pluriel : `/api/members`, `/api/events`, `/api/documents` ;
- paramètres de route nommés en `camelCase` côté code Next.js : `params.memberId` ;
- paramètres JSON exposés au frontend en `camelCase` ;
- pas de wrapper verbeux inutile pour les réponses same-origin internes.

**Code Naming Conventions:**

- composants React en `PascalCase` ;
- fichiers de composants en `PascalCase.tsx` pour composants exportés ;
- fichiers non composants en `kebab-case.ts` ou `kebab-case.tsx` ;
- fonctions et variables en `camelCase` ;
- constantes globales en `SCREAMING_SNAKE_CASE` ;
- types et interfaces en `PascalCase`.

### Fine-Grained Naming Conventions

En complément des conventions générales :

- policies booléennes : préfixe `can` ou `is`, par exemple `canRegisterToActivity`, `isDocumentVisibleToMember` ;
- services métier de lecture : `get`, `list`, `find` ;
- services métier d’écriture : `create`, `update`, `archive`, `publish`, `record` ;
- schémas Zod : suffixe `Schema`, fichier `*-schema.ts` ;
- fichiers de policies : `can-*.ts`, `is-*.ts` ;
- fichiers de services : `verb-noun.ts` en `kebab-case` ;
- fichier `actions.ts` réservé aux actions liées à une route ou un segment App Router précis.

### Structure Patterns

**Project Organization:**

- organisation prioritairement par domaine métier, pas par type technique global ;
- couche App Router limitée à l’orchestration UI et aux points d’entrée HTTP ;
- services métier regroupés par domaine ;
- accès aux données regroupé sous une couche `repositories` ou `data-access` uniquement là où cela apporte une vraie valeur ;
- policies explicites regroupées par domaine ou sous-domaine transverse.

**Suggested High-Level Structure:**

- `src/app` pour routes, layouts, pages, Server Actions et Route Handlers ;
- `src/features` pour capacités métier par domaine ;
- `src/features/<domain>/services` pour cas d’usage et logique métier ;
- `src/features/<domain>/policies` pour autorisation métier, visibilité, éligibilité ;
- `src/features/<domain>/data` pour accès Prisma ou adaptateurs de persistance ;
- `src/components` pour UI réutilisable transverse ;
- `src/lib` pour utilitaires techniques partagés, bootstrap, clients externes ;
- `src/server` pour bootstrap serveur transversal si nécessaire ;
- `src/test` ou co-location selon type de test, avec règles explicites ci-dessous.

**File Structure Patterns:**

- fichiers de schémas Zod proches de leur domaine ;
- fichiers `actions.ts` proches de la route ou de la feature concernée ;
- pas de dossier `utils` fourre-tout par domaine ;
- documentation d’architecture et ADR conservées dans `docs` ou artefacts BMAD, pas dispersées dans `src`.

### Frontend Implementation Conventions

- les primitives UI accessibles retenues pour le MVP s’appuient sur `shadcn/ui` avec `Radix UI` lorsque pertinent, afin de limiter les divergences d’implémentation sur accessibilité, focus et overlays ;
- les polices `Barlow Condensed`, `Source Sans 3` et `IBM Plex Mono` sont chargées via `next/font` et exposées via des tokens ou variables CSS partagées ;
- les premiers composants métier frontend à traiter comme références du design system produit sont :
  - `Badge d’éligibilité` ;
  - `Panneau conformité membre` ;
  - `Carte activité` ;
  - `Timeline de créneaux` ;
  - `Panneau participants / convocations` ;
  - `Rail annonces et infos club` ;
- les surfaces `(member)` et `(admin)` suivent des conventions de navigation distinctes : mobile-first orienté action rapide côté adhérent, sidebar et vues denses côté administration, breadcrumb limité aux parcours administratifs profonds ;
- tout composant métier critique doit définir explicitement ses états `empty`, `loading`, `error` et `success` ;
- les patterns de feedback frontend sont normalisés : succès par `toast` plus état persistant, erreurs inline près du problème avec résumé si nécessaire, warning en bannière contextuelle.

### Format Patterns

**API Response Formats:**

- Server Actions same-origin : retour direct de données typées ou objet résultat métier simple ;
- Route Handlers HTTP : JSON cohérent avec structure explicite ;
- succès standard HTTP : `{ data, meta? }` ;
- erreur standard HTTP : `{ error: { code, message, details? } }`.

**Error Format Rules:**

- `code` stable et lisible machine : `MEMBER_NOT_ELIGIBLE`, `DOCUMENT_ACCESS_DENIED` ;
- `message` lisible utilisateur ou transformable côté UI ;
- `details` optionnel pour contexte technique ou validation ;
- ne jamais exposer de stack trace brute au client.

**Data Exchange Formats:**

- JSON en `camelCase` ;
- dates et heures en ISO 8601 côté API ;
- stockage temporel normalisé en UTC ;
- booléens natifs `true/false` ;
- `null` utilisé explicitement quand absence de valeur significative ;
- pas de sentinelles type `""`, `0` ou `"N/A"` pour représenter l’absence.

### Communication Patterns

**Application Layering Communication Rules:**

- les pages, layouts, Server Actions et Route Handlers orchestrent ;
- les services métier décident ;
- les policies valident permissions, visibilité et éligibilité ;
- les couches d’accès aux données lisent et écrivent sans porter les règles métier ;
- les intégrations externes passent par adaptateurs dédiés.

**Internal Event Pattern:**

- pas de bus événementiel interne en V1 ;
- préférer appel direct et explicite entre services tant que le découplage asynchrone n’apporte pas de bénéfice démontré ;
- si événement interne nécessaire plus tard, convention en passé métier : `memberEligibilityUpdated`, `documentUploaded`.

**State Management Patterns:**

- état serveur privilégié par défaut ;
- état local React pour interactions locales d’interface ;
- état d’URL pour filtres, pagination et vues partageables ;
- pas de state manager global tant qu’un besoin transverse réel n’émerge pas.

### Process Patterns

**Validation Patterns:**

- toute entrée externe est validée par Zod au plus près de la frontière ;
- les schémas de formulaire et les schémas serveur partagent la même source quand c’est réaliste ;
- aucune décision métier critique ne repose uniquement sur la validation client.

**Error Handling Patterns:**

- distinction stricte entre erreur métier, erreur de validation et erreur technique ;
- erreurs métier attendues gérées explicitement ;
- erreurs techniques journalisées et masquées côté UI ;
- audit métier séparé des logs techniques.

**Loading State Patterns:**

- loading local par action utilisateur, pas de spinner global par défaut ;
- états `idle | pending | success | error` quand un flux interactif le justifie ;
- feedback de succès et d’erreur toujours contextualisé à l’action ;
- éviter les loaders bloquants pour des lectures secondaires.

**Testing Patterns:**

- tests unitaires co-localisés pour policies, utilitaires métier et règles de domaine ;
- tests d’intégration proches des services ou dans un dossier d’intégration dédié par domaine ;
- tests E2E centralisés sous `tests/e2e` ;
- priorité de couverture : policies métier, auth, permissions, mutations critiques, documents, inscription activité.

### Repository Usage Rule

Une couche `repository` ou `data-access` n’est pas obligatoire partout. Elle doit être introduite lorsqu’au moins une des conditions suivantes est vraie :

- l’accès aux données est partagé par plusieurs services ;
- la requête est complexe ou fortement spécifique ;
- plusieurs opérations doivent être coordonnées dans une transaction ;
- l’accès encapsule une dépendance externe ou une stratégie de lecture ou d’écriture particulière.

À défaut, un service métier peut utiliser Prisma directement de manière locale et lisible.

### Transaction Boundary Rule

Les transactions doivent être ouvertes au niveau du service métier qui protège un invariant impliquant plusieurs écritures cohérentes. Elles ne doivent pas être cachées dans les composants UI, les Server Actions, ni dispersées dans plusieurs helpers sans orchestration centrale.

### Test File Conventions

- tests unitaires et d’intégration : suffixe `*.spec.ts` ou `*.spec.tsx` ;
- tests E2E : suffixe `*.e2e.ts` ;
- tests unitaires co-localisés près du domaine ou du service concerné ;
- tests E2E centralisés dans `tests/e2e` ;
- fixtures et données de test séparées des seeds de développement ;
- les codes d’erreur métier testés doivent être traités comme des contrats stables.

### Domain Boundary Rule

Chaque domaine métier doit exposer des points d’entrée clairs via ses services, policies ou contrats explicitement partagés. Un domaine ne doit pas dépendre directement des détails internes d’un autre domaine sans passer par une interface ou un service prévu à cet effet.

Cette règle vise à préserver le découplage fonctionnel, à réduire les collisions entre agents et à garder les stories implémentables par zones de responsabilité nettes.

### Allowed Dependency Direction

Les dépendances doivent rester lisibles et orientées dans le même sens :

- `app` peut dépendre des services et contrats des features ;
- une feature peut dépendre de bibliothèques partagées et de ses propres couches internes ;
- la couche UI ne doit pas lire directement les détails de persistance d’un autre domaine ;
- une feature ne doit pas accéder directement aux fichiers internes d’une autre feature sans passer par un point d’entrée explicite.

### User Message Pattern

Les messages visibles par l’utilisateur doivent suivre une convention cohérente :

- langage simple, non technique ;
- formulation contextualisée à l’action en cours ;
- message orienté compréhension ou prochaine action ;
- aucun détail interne, stack trace ou jargon d’infrastructure.

Les codes d’erreur restent des contrats techniques stables ; les messages affichés sont des formulations UX dérivées de ces codes.

### Import Convention

- utiliser l’alias `@/*` pour les imports transverses et stables ;
- réserver les imports relatifs courts aux fichiers proches dans le même dossier ou sous-dossier immédiat ;
- éviter les chaînes d’imports relatifs profonds du type `../../../..` lorsqu’un alias rend la dépendance plus lisible.

### Shared Invariant Rule

Toute règle métier critique partagée entre plusieurs domaines ou parcours doit avoir une source de vérité unique, portée par une policy, un service métier ou un contrat explicitement identifié.

Aucune duplication parallèle d’une même règle critique ne doit être introduite dans plusieurs composants, actions ou services sans point de centralisation clair.

### Empty, Blocked, And Degraded State Pattern

Les écrans doivent traiter explicitement les états où une donnée est absente, une action est bloquée ou une capacité est temporairement indisponible :

- expliquer la situation en langage simple ;
- indiquer la prochaine action utile quand elle existe ;
- éviter les écrans silencieux ou ambigus ;
- distinguer un état vide normal d’un blocage métier ou d’une erreur technique.

### Technical Logs vs Audit vs UX Messages

Trois canaux distincts doivent rester séparés :

- logs techniques pour l’observabilité et le diagnostic ;
- audit métier pour les actions sensibles et la traçabilité fonctionnelle ;
- messages UX pour informer l’utilisateur de manière claire et contextualisée.

Une même situation peut produire plusieurs de ces sorties, mais elles ne doivent pas être confondues ni pilotées par les mêmes formats.

### Interaction Consistency Rule

À fonctionnalité comparable, les écrans doivent réutiliser des patterns d’interaction comparables.

Par exemple, les listes administratives, fiches détaillées, formulaires d’édition, confirmations de suppression ou messages de blocage ne doivent pas varier arbitrairement d’un domaine à l’autre sans raison métier ou UX explicite.

Cette règle vise à réduire la friction cognitive pour les utilisateurs et à éviter des divergences de surface entre agents implémentant des zones différentes du produit.

### Pattern Exception Rule

Toute exception durable à un pattern défini dans cette architecture doit être documentée explicitement avec :

- la règle concernée ;
- la raison de l’exception ;
- la portée de l’exception ;
- la date et le contexte de décision.

Les exceptions implicites ou temporaires non tracées doivent être évitées.

### Feature Public Surface Rule

Chaque feature ou domaine doit exposer une surface publique limitée et identifiable. Les fichiers et modules non explicitement exposés doivent être considérés comme internes par défaut.

Cela permet :

- de rendre les dépendances lisibles ;
- de limiter les accès transverses non maîtrisés ;
- de faciliter le travail parallèle entre agents.

### Lightweight Domain Documentation

Les domaines métier significatifs peuvent inclure une documentation légère locale, par exemple un `README.md`, pour décrire :

- les responsabilités du domaine ;
- ses points d’entrée publics ;
- ses invariants principaux ;
- ses dépendances autorisées ;
- les zones explicitement internes.

L’objectif n’est pas d’alourdir le codebase, mais de réduire les ambiguïtés pour l’implémentation et la maintenance.

### Cross-Cutting Change Rule

Toute modification touchant :

- une policy partagée ;
- un invariant métier central ;
- un format d’erreur ou de réponse ;
- une convention de nommage ou de structure

doit être traitée comme un changement transverse nécessitant une vérification d’impact au-delà du fichier ou du domaine immédiatement modifié.

### Shared Schema Canon Rule

Tout schéma représentant un contrat partagé entre plusieurs points d’entrée, services ou écrans doit avoir une définition canonique dans son domaine. Les variantes locales ne doivent être introduites que lorsqu’elles représentent réellement un sous-ensemble, une projection ou une adaptation spécifique.

### Domain Enum Rule

Les statuts, types et catégories métier partagés doivent avoir une source unique par concept. Les agents ne doivent pas redéclarer librement des listes de valeurs équivalentes dans plusieurs couches.

Cette règle s’applique notamment aux statuts membre, catégories documentaires, états de publication et types d’activité.

### Business Vocabulary Consistency

Chaque concept métier important doit conserver un vocabulaire stable à travers :

- la base de code ;
- les APIs ;
- les messages utilisateur ;
- la documentation locale du domaine.

Les synonymes concurrents doivent être évités sauf si une distinction métier réelle existe.

### Presentation Formatter Rule

Les transformations de présentation réutilisables, comme les labels lisibles, badges de statut, dates formatées ou résumés d’affichage, doivent être séparées des services métier et des policies.

Les formatters de présentation ne doivent pas devenir un lieu de décision métier implicite.

### Enforcement Guidelines

**All AI Agents MUST:**

- garder la logique métier hors des composants UI et hors des Route Handlers autant que possible ;
- appliquer `snake_case` en persistance et `camelCase` en TypeScript et JSON ;
- faire des décisions serveur la source de vérité pour auth, permissions, visibilité et éligibilité ;
- utiliser Zod pour toutes les frontières d’entrée significatives ;
- écrire les tests au niveau le plus bas pertinent avant d’ajouter de l’E2E ;
- respecter l’organisation par domaine plutôt que créer des dossiers transverses vagues.

**Pattern Enforcement:**

- revue systématique des PR sur nommage, layering et formats d’erreur ;
- lint et typecheck obligatoires ;
- tests obligatoires sur policies et mutations critiques ;
- toute exception durable à un pattern doit être documentée dans l’architecture ou un ADR court.

### Pattern Examples

**Good Examples:**

- `src/features/members/services/update-member-status.ts`
- `src/features/members/policies/can-register-to-activity.ts`
- `src/features/documents/data/document-repository.ts`
- `src/app/(admin)/members/[memberId]/actions.ts`
- réponse erreur HTTP :
  `{ "error": { "code": "MEMBER_NOT_ELIGIBLE", "message": "Le membre ne peut pas s'inscrire à cette activité." } }`

**Anti-Patterns:**

- logique d’éligibilité directement dans un composant React ;
- vérification de rôle uniquement dans l’interface ;
- accès Prisma direct depuis plusieurs pages sans service métier commun ;
- mélange `snake_case` et `camelCase` dans les payloads JSON ;
- dossier `utils/` contenant indistinctement policies, formatters, accès données et helpers UI ;
- E2E utilisé comme seul filet de sécurité pour les règles métier.

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
l4rs0n/
├── README.md
├── package.json
├── pnpm-lock.yaml
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── components.json
├── .gitignore
├── .env.example
├── .env.local
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── docs/
│   ├── architecture-decisions/
│   └── domain-glossary.md
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── public/
│   ├── icons/
│   ├── images/
│   └── manifests/
├── tests/
│   ├── e2e/
│   │   ├── auth/
│   │   ├── members/
│   │   ├── activities/
│   │   └── documents/
│   ├── fixtures/
│   └── helpers/
└── src/
    ├── app/
    │   ├── (public)/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── sign-in/
    │   │   │   └── page.tsx
    │   │   ├── forgot-password/
    │   │   │   └── page.tsx
    │   │   └── legal/
    │   │       ├── privacy/page.tsx
    │   │       └── terms/page.tsx
    │   ├── (member)/
    │   │   ├── layout.tsx
    │   │   ├── dashboard/page.tsx
    │   │   ├── activities/
    │   │   │   ├── page.tsx
    │   │   │   └── [activityId]/page.tsx
    │   │   ├── documents/page.tsx
    │   │   ├── announcements/page.tsx
    │   │   └── profile/page.tsx
    │   ├── (admin)/
    │   │   ├── layout.tsx
    │   │   ├── dashboard/page.tsx
    │   │   ├── members/
    │   │   │   ├── page.tsx
    │   │   │   ├── new/page.tsx
    │   │   │   └── [memberId]/
    │   │   │       ├── page.tsx
    │   │   │       ├── edit/page.tsx
    │   │   │       └── actions.ts
    │   │   ├── activities/
    │   │   │   ├── page.tsx
    │   │   │   ├── new/page.tsx
    │   │   │   └── [activityId]/
    │   │   │       ├── page.tsx
    │   │   │       ├── edit/page.tsx
    │   │   │       └── actions.ts
    │   │   ├── documents/
    │   │   │   ├── page.tsx
    │   │   │   ├── club/page.tsx
    │   │   │   └── member/page.tsx
    │   │   ├── announcements/
    │   │   │   ├── page.tsx
    │   │   │   └── [announcementId]/actions.ts
    │   │   ├── gym-slots/
    │   │   │   ├── page.tsx
    │   │   │   └── [slotId]/actions.ts
    │   │   └── settings/
    │   │       ├── page.tsx
    │   │       ├── roles/page.tsx
    │   │       └── club/page.tsx
    │   ├── api/
    │   │   ├── auth/
    │   │   │   └── [...all]/route.ts
    │   │   ├── health/route.ts
    │   │   ├── uploads/route.ts
    │   │   ├── documents/[documentId]/download/route.ts
    │   │   └── webhooks/
    │   │       └── notifications/route.ts
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── not-found.tsx
    │   └── error.tsx
    ├── components/
    │   ├── ui/
    │   ├── layout/
    │   ├── feedback/
    │   ├── forms/
    │   └── data-display/
    ├── features/
    │   ├── auth/
    │   │   ├── README.md
    │   │   ├── auth-schema.ts
    │   │   ├── auth-client.ts
    │   │   ├── auth.ts
    │   │   ├── services/
    │   │   │   ├── get-session.ts
    │   │   │   └── require-auth.ts
    │   │   ├── policies/
    │   │   │   └── can-access-admin.ts
    │   │   └── components/
    │   ├── members/
    │   │   ├── README.md
    │   │   ├── member-schema.ts
    │   │   ├── member-types.ts
    │   │   ├── member-enums.ts
    │   │   ├── services/
    │   │   │   ├── get-member.ts
    │   │   │   ├── list-members.ts
    │   │   │   ├── create-member.ts
    │   │   │   ├── update-member.ts
    │   │   │   ├── archive-member.ts
    │   │   │   └── update-member-status.ts
    │   │   ├── policies/
    │   │   │   ├── can-manage-member.ts
    │   │   │   ├── can-view-member-financials.ts
    │   │   │   └── is-member-eligible.ts
    │   │   ├── data/
    │   │   │   ├── member-repository.ts
    │   │   │   └── member-query-filters.ts
    │   │   ├── formatters/
    │   │   │   ├── format-member-status.ts
    │   │   │   └── format-member-display-name.ts
    │   │   ├── components/
    │   │   └── __tests__/
    │   ├── activities/
    │   │   ├── README.md
    │   │   ├── activity-schema.ts
    │   │   ├── activity-enums.ts
    │   │   ├── services/
    │   │   │   ├── get-activity.ts
    │   │   │   ├── list-activities.ts
    │   │   │   ├── create-activity.ts
    │   │   │   ├── update-activity.ts
    │   │   │   ├── publish-activity.ts
    │   │   │   ├── cancel-activity.ts
    │   │   │   ├── register-to-activity.ts
    │   │   │   └── unregister-from-activity.ts
    │   │   ├── policies/
    │   │   │   ├── can-manage-activity.ts
    │   │   │   ├── can-register-to-activity.ts
    │   │   │   └── is-activity-visible.ts
    │   │   ├── data/
    │   │   │   ├── activity-repository.ts
    │   │   │   └── registration-repository.ts
    │   │   ├── formatters/
    │   │   │   └── format-activity-status.ts
    │   │   ├── components/
    │   │   └── __tests__/
    │   ├── documents/
    │   │   ├── README.md
    │   │   ├── document-schema.ts
    │   │   ├── document-enums.ts
    │   │   ├── services/
    │   │   │   ├── upload-club-document.ts
    │   │   │   ├── upload-member-document.ts
    │   │   │   ├── get-document.ts
    │   │   │   ├── list-club-documents.ts
    │   │   │   ├── list-member-documents.ts
    │   │   │   └── delete-document.ts
    │   │   ├── policies/
    │   │   │   ├── can-view-document.ts
    │   │   │   ├── can-manage-document.ts
    │   │   │   └── is-document-visible-to-member.ts
    │   │   ├── data/
    │   │   │   ├── document-repository.ts
    │   │   │   └── document-metadata-repository.ts
    │   │   ├── formatters/
    │   │   │   └── format-document-label.ts
    │   │   ├── components/
    │   │   └── __tests__/
    │   ├── announcements/
    │   │   ├── README.md
    │   │   ├── announcement-schema.ts
    │   │   ├── announcement-enums.ts
    │   │   ├── services/
    │   │   │   ├── list-announcements.ts
    │   │   │   ├── create-announcement.ts
    │   │   │   ├── publish-announcement.ts
    │   │   │   └── archive-announcement.ts
    │   │   ├── policies/
    │   │   │   ├── can-manage-announcement.ts
    │   │   │   └── is-announcement-visible.ts
    │   │   ├── data/
    │   │   │   └── announcement-repository.ts
    │   │   ├── components/
    │   │   └── __tests__/
    │   ├── gym-slots/
    │   │   ├── README.md
    │   │   ├── gym-slot-schema.ts
    │   │   ├── services/
    │   │   │   ├── list-gym-slots.ts
    │   │   │   ├── create-gym-slot.ts
    │   │   │   ├── update-gym-slot.ts
    │   │   │   └── cancel-gym-slot.ts
    │   │   ├── policies/
    │   │   │   └── can-manage-gym-slot.ts
    │   │   ├── data/
    │   │   │   └── gym-slot-repository.ts
    │   │   ├── components/
    │   │   └── __tests__/
    │   ├── club-admin/
    │   │   ├── README.md
    │   │   ├── services/
    │   │   │   ├── get-club-settings.ts
    │   │   │   ├── update-club-settings.ts
    │   │   │   ├── assign-role.ts
    │   │   │   └── revoke-role.ts
    │   │   ├── policies/
    │   │   │   └── can-manage-club-settings.ts
    │   │   ├── data/
    │   │   │   └── club-settings-repository.ts
    │   │   └── __tests__/
    │   ├── audit/
    │   │   ├── README.md
    │   │   ├── services/
    │   │   │   ├── record-audit-log.ts
    │   │   │   └── list-audit-logs.ts
    │   │   ├── data/
    │   │   │   └── audit-log-repository.ts
    │   │   └── __tests__/
    │   └── notifications/
    │       ├── README.md
    │       ├── services/
    │       │   ├── send-email-notification.ts
    │       │   ├── notify-activity-published.ts
    │       │   ├── notify-activity-cancelled.ts
    │       │   └── notify-gym-slot-changed.ts
    │       ├── adapters/
    │       │   └── email-provider.ts
    │       └── __tests__/
    ├── lib/
    │   ├── env/
    │   │   ├── client.ts
    │   │   └── server.ts
    │   ├── db/
    │   │   ├── client.ts
    │   │   └── transactions.ts
    │   ├── storage/
    │   │   ├── storage-client.ts
    │   │   └── signed-url.ts
    │   ├── errors/
    │   │   ├── app-error.ts
    │   │   ├── error-codes.ts
    │   │   └── to-http-error-response.ts
    │   ├── auth/
    │   │   └── session.ts
    │   ├── dates/
    │   │   ├── to-iso-date.ts
    │   │   └── format-date-time.ts
    │   ├── http/
    │   │   ├── api-response.ts
    │   │   └── route-handler.ts
    │   ├── logging/
    │   │   ├── logger.ts
    │   │   └── request-context.ts
    │   └── utils/
    ├── server/
    │   ├── bootstrap/
    │   │   ├── auth.ts
    │   │   ├── database.ts
    │   │   └── observability.ts
    │   └── guards/
    │       ├── require-admin.ts
    │       └── require-authenticated-member.ts
    ├── middleware/
    │   └── request-context.ts
    └── types/
        ├── api.ts
        └── global.d.ts
```

### Architectural Boundaries

**API Boundaries:**

- `src/app/api/auth/[...all]/route.ts` expose la frontière auth Better Auth ;
- `src/app/api/uploads/route.ts` gère les uploads contrôlés côté serveur ;
- `src/app/api/documents/[documentId]/download/route.ts` sert de frontière sécurisée pour l’accès aux fichiers ;
- les endpoints HTTP restent limités aux cas nécessitant une vraie frontière réseau ou un contrat explicite ;
- les mutations same-origin du produit passent d’abord par Server Actions.

**Component Boundaries:**

- `src/app` orchestre routes, layouts, pages et actions ;
- `src/components` contient uniquement UI transverse et patterns de surface réutilisables ;
- `src/features/*/components` contient les composants métier propres à un domaine ;
- les composants UI ne portent pas les règles d’autorisation, d’éligibilité ni de visibilité.

**Service Boundaries:**

- `src/features/<domain>/services` porte les cas d’usage ;
- `src/features/<domain>/policies` centralise les décisions booléennes et invariants partagés ;
- `src/features/<domain>/data` encapsule persistance et requêtes spécifiques ;
- `src/features/notifications/adapters` encapsule les fournisseurs externes ;
- `src/features/audit` reste séparé des logs techniques.

**Data Boundaries:**

- Prisma et PostgreSQL sont la source de vérité pour les données métier ;
- le stockage objet ne contient que des binaires et métadonnées techniques minimales ;
- les métadonnées documentaires restent en base relationnelle ;
- les enums et statuts métier partagés ont une source canonique par domaine ;
- les schémas partagés vivent au niveau canonique de leur domaine.

### Requirements to Structure Mapping

**Feature Mapping:**

- `FR1-FR6 Gestion des comptes et accès` → `src/features/auth`, `src/app/(public)`, `src/app/api/auth`
- `FR7-FR17 Gestion des membres, cotisations et éligibilité` → `src/features/members`, `src/app/(admin)/members`, `src/app/(member)/profile`
- `FR18-FR22 Documents et conformité membre` → `src/features/documents`, `src/app/(admin)/documents`, `src/app/(member)/documents`
- `FR23-FR30 Gestion des événements` → `src/features/activities`, `src/app/(admin)/activities`, `src/app/(member)/activities`
- `FR31-FR35 Rencontres inter-clubs` → `src/features/activities` avec spécialisation de type d’activité
- `FR36-FR41 Gestion du gymnase et des créneaux` → `src/features/gym-slots`, `src/app/(admin)/gym-slots`
- `FR42-FR45 Communication et information club` → `src/features/announcements`, `src/features/notifications`, `src/app/(member)/announcements`
- `FR46-FR49 Administration et traçabilité` → `src/features/club-admin`, `src/features/audit`, `src/app/(admin)/settings`, `src/app/(admin)/dashboard`

**Cross-Cutting Concerns:**

- Authentification → `src/features/auth`, `src/server/bootstrap/auth.ts`, `src/server/guards`
- Autorisation et policies → `src/features/*/policies`
- Audit métier → `src/features/audit`
- Notifications → `src/features/notifications`
- Formats d’erreur et contrats HTTP → `src/lib/errors`, `src/lib/http`
- Environnement et bootstrap → `src/lib/env`, `src/server/bootstrap`
- Dates, logging, request context → `src/lib/dates`, `src/lib/logging`, `src/middleware`

### Integration Points

**Internal Communication:**

- `app` appelle des services de domaine ;
- les services utilisent policies + data layer ;
- les services déclenchent audit et notifications via appels explicites ;
- les domaines n’accèdent pas directement aux détails internes d’un autre domaine sans point d’entrée public identifié.

**External Integrations:**

- Better Auth via `src/features/auth`
- PostgreSQL via Prisma dans `src/lib/db` et `src/features/*/data`
- stockage objet via `src/lib/storage`
- fournisseur email via `src/features/notifications/adapters`

**Data Flow:**

1. UI ou page admin déclenche une Server Action ou un Route Handler
2. Le point d’entrée valide avec Zod
3. Le service métier orchestre
4. Les policies décident permissions, éligibilité et visibilité
5. La couche data persiste
6. Audit et notifications sont déclenchés si nécessaire
7. La réponse est formatée pour UI ou HTTP

### File Organization Patterns

**Configuration Files:**

- config racine pour Next.js, TypeScript, ESLint, PostCSS ;
- secrets et variables via `.env.local` et `.env.example` ;
- CI/CD sous `.github/workflows`.

**Source Organization:**

- `app` pour delivery layer ;
- `features` pour domaines métier ;
- `components` pour UI transverse ;
- `lib` pour briques techniques partagées ;
- `server` pour bootstrap et guards transverses.

**Test Organization:**

- `__tests__` co-localisés dans les domaines pour unitaires/intégration locale ;
- `tests/e2e` pour parcours transverses ;
- `tests/fixtures` pour données de test partagées ;
- pas de mélange entre seeds de dev et fixtures de test.

**Asset Organization:**

- `public/` pour assets statiques publics ;
- stockage objet pour documents utilisateurs et club ;
- aucune donnée sensible stockée dans `public/`.

### Development Workflow Integration

**Development Server Structure:**

- App Router et pages segmentées par surface `(public)`, `(member)`, `(admin)` ;
- développement par domaine possible sans collision forte ;
- points d’entrée publics de feature lisibles pour travail parallèle.

**Build Process Structure:**

- Next.js build pour app ;
- Prisma generate/migrate pour base ;
- Better Auth branché via route auth dédiée ;
- lint, typecheck, tests et build pilotés par GitHub Actions.

**Deployment Structure:**

- application Next.js déployable sur plateforme compatible ;
- base PostgreSQL managée ;
- stockage objet privé séparé ;
- architecture portable malgré une préférence opérationnelle initiale pour Vercel.

### Structural Decision Note: Activities vs Gym Slots

La structure proposée distingue `activities` et `gym-slots` comme deux domaines voisins mais séparés. Cette décision reflète un choix de lisibilité MVP, et non l’absence de parenté métier entre les deux.

Les règles communes de planification, de publication ou de temporalité ne doivent pas être dupliquées librement. Si des primitives communes émergent rapidement, elles devront être factorisées dans une zone partagée explicitement nommée, plutôt que recopiées entre domaines.

### Shared Planning Subspace

Si la mise en œuvre confirme des besoins communs entre activités, rencontres inter-clubs et créneaux, une zone partagée explicite pourra être introduite, par exemple :

- `src/features/planning/`
- ou `src/lib/planning/` si le contenu reste technique et transversal

Cette factorisation ne doit pas être anticipée sans besoin concret, mais elle doit rester lisible comme point d’évolution prévu.

### Target Structure vs Incremental Creation

L’arborescence décrite dans cette section représente une structure cible de référence. Elle n’implique pas que tous les dossiers et fichiers doivent être créés immédiatement dès l’initialisation du projet.

Les agents doivent créer les éléments de structure de manière incrémentale, au moment où une capacité réelle est introduite, tout en respectant les frontières et conventions définies ici.

### Generic Utils Guardrail

Le dossier `src/lib/utils/` ne doit pas devenir un réceptacle générique pour du code mal classé. Les helpers transverses doivent être rangés dans des sous-espaces nommés selon leur responsabilité réelle, par exemple `errors`, `dates`, `http`, `logging` ou `storage`.

Si `src/lib/utils/` est conservé, son usage doit rester exceptionnel et strictement borné.

### Optional Public Entry Points

Quand cela améliore la lisibilité des frontières d’un domaine, une feature peut exposer un point d’entrée public explicite, par exemple `src/features/members/index.ts`, pour rendre visibles les surfaces autorisées à l’import.

### Surface vs Domain Rule

Les segments `src/app/(admin)` et `src/app/(member)` représentent des surfaces d’expérience et de navigation. Ils ne constituent pas des domaines métier autonomes.

Le métier doit rester porté par `src/features/*`, afin d’éviter des variantes de logique entre surface administrateur et surface adhérent.

### Surface Components vs Domain Components

La structure distingue implicitement deux types de composants qu’il est utile de garder séparés :

- composants de surface, liés à une page, un layout ou un parcours spécifique ;
- composants de domaine, liés à un concept métier réutilisable dans plusieurs surfaces.

Les composants de surface vivent près des routes ou segments concernés. Les composants de domaine vivent dans leur feature métier ou dans une zone partagée explicitement nommée si leur réutilisation dépasse un seul domaine.

### Priority Domain Documentation

Les domaines suivants doivent disposer d’une documentation locale légère dès qu’ils sont introduits :

- `auth`
- `members`
- `activities`
- `documents`
- `audit`

Cette documentation locale est particulièrement importante parce que ces domaines portent les invariants, les permissions ou les responsabilités les plus sensibles du système.

### Feature Test Boundary Rule

Les dossiers `__tests__` co-localisés dans les features sont réservés aux tests unitaires et d’intégration locale du domaine concerné.

Ils ne doivent pas devenir :

- un réceptacle de fixtures transverses ;
- un lieu pour les tests E2E ;
- un stockage implicite de snapshots ou helpers sans lien clair avec le domaine.

### Server Folder Guardrail

Le dossier `src/server` est réservé au bootstrap transversal, aux garde-fous serveur et aux mécanismes de soutien communs.

Il ne doit pas devenir une seconde couche de services métier parallèle à `src/features`, au risque de fragmenter les responsabilités du codebase.

### MVP Priority Domains

Les domaines suivants constituent le noyau opérationnel prioritaire du MVP :

- `auth`
- `members`
- `activities`
- `documents`
- `announcements`
- `audit`

La structure doit permettre de les introduire en premier sans dépendre de domaines secondaires ou d’extensions futures.

### Global Docs vs Local Docs

La documentation globale d’architecture, de décisions et de gouvernance vit dans `docs/` et les artefacts d’architecture.

La documentation locale d’un domaine vit dans `src/features/<domain>/README.md` et décrit uniquement ses responsabilités, invariants, points d’entrée publics et limites internes.

### API Route Boundary Rule

Le dossier `src/app/api/*` représente uniquement les frontières HTTP explicites :

- auth ;
- uploads ;
- download sécurisé ;
- healthcheck ;
- webhooks ou intégrations.

Il ne doit pas devenir un lieu de logique métier autonome. Toute logique réutilisable doit rester dans les services, policies et couches de données des domaines concernés.

### Dashboard Composition Rule

Les dashboards admin et member sont des surfaces de composition. Ils agrègent des données provenant de plusieurs domaines mais ne constituent pas des domaines métier autonomes.

Ils ne doivent donc pas dériver vers une feature `dashboard` contenant des règles métier propres sans justification explicite.

### Global Types Guardrail

Le dossier `src/types/` est réservé aux types globaux, techniques ou transverses au projet.

Les types métier, enums métier et contrats de domaine doivent rester au plus près de leur feature pour éviter une centralisation floue du modèle fonctionnel.

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
Les décisions technologiques et structurelles sont compatibles entre elles. Le socle `Next.js App Router + TypeScript + PostgreSQL + Prisma + Better Auth` est cohérent avec le choix d’un monolithe modulaire server-first. Les patterns d’implémentation renforcent cette direction au lieu de l’introduire en contradiction.

Les choix plus réversibles, comme la préférence initiale pour Vercel ou un fournisseur exact de stockage objet, sont explicitement distingués des décisions plus structurantes. Cela réduit le risque de confusion entre fondation d’architecture et préférence opérationnelle.

**Pattern Consistency:**
Les patterns définis soutiennent les décisions :

- séparation claire entre surfaces `app`, services métier, policies et accès aux données ;
- conventions de nommage cohérentes entre SQL, Prisma, TypeScript et JSON ;
- règles explicites pour auth, visibilité, éligibilité, erreurs, tests et frontières de domaine ;
- garde-fous suffisants contre la duplication de logique métier et la dérive vers un pseudo-framework interne.

**Structure Alignment:**
La structure projet proposée reflète correctement les choix d’architecture :

- `src/app` porte les surfaces et points d’entrée ;
- `src/features` porte le métier ;
- `src/lib` porte les briques techniques transverses ;
- `src/server` reste limité au bootstrap et aux garde-fous transverses ;
- les dossiers de test, documentation et intégration sont alignés avec les patterns décidés.

### Requirements Coverage Validation ✅

**Feature Coverage:**
Les grandes catégories fonctionnelles du PRD sont couvertes par des domaines ou sous-espaces identifiés :

- auth et accès ;
- membres et éligibilité ;
- activités ;
- documents ;
- annonces ;
- créneaux ;
- administration club ;
- audit ;
- notifications.

Les rencontres inter-clubs sont couvertes par spécialisation au sein du domaine `activities`, ce qui est compatible avec la décision de MVP actuelle.

**Functional Requirements Coverage:**
L’ensemble des FR identifiés dans le PRD dispose d’un support architectural :

- gestion des comptes et accès → `auth`, guards, policies ;
- gestion des membres → `members` ;
- cotisations et éligibilité → `members` + policies ;
- documents et conformité → `documents` + stockage privé ;
- événements et inscriptions → `activities` ;
- rencontres inter-clubs → `activities` avec typologie dédiée ;
- gymnase et créneaux → `gym-slots` ;
- communication club → `announcements` + `notifications` ;
- administration et traçabilité → `club-admin` + `audit`.

**Non-Functional Requirements Coverage:**
Les NFR sont couverts de manière satisfaisante au niveau architectural :

- sécurité : auth serveur, RBAC, policies métier, stockage privé ;
- RGPD : séparation documents/données, audit, contrôle de visibilité, suppression future possible ;
- performance : server-first, cache limité mais cohérent avec la volumétrie ;
- accessibilité et mobile : surfaces `(member)` et `(admin)` adaptées à des usages distincts ;
- fiabilité : audit, logs structurés, CI, séparation des responsabilités ;
- évolutivité : architecture future-ready sans surcoût de multi-tenant en V1.

### Implementation Readiness Validation ✅

**Decision Completeness:**
Les décisions critiques sont documentées avec un niveau de précision suffisant pour démarrer :

- starter ;
- base et ORM ;
- auth ;
- style d’API ;
- patterns d’erreur ;
- stratégie de validation ;
- stratégie de tests ;
- stockage et déploiement.

**Structure Completeness:**
La structure projet est suffisamment détaillée pour guider une implémentation incrémentale sans ambiguïté forte. Les frontières de domaine, les surfaces d’expérience, les points d’entrée HTTP et les zones techniques partagées sont explicitement posés.

**Pattern Completeness:**
Les principaux points de divergence potentielle entre agents sont couverts :

- nommage ;
- structure ;
- boundaries ;
- transactions ;
- schémas partagés ;
- enums métier ;
- erreurs ;
- messages UX ;
- tests ;
- imports ;
- évolutions transverses ;
- exceptions aux patterns.

### Gap Analysis Results

**Critical Gaps:**
Aucun gap critique bloquant n’a été identifié à ce stade.

**Important Gaps:**

- la matrice détaillée des permissions par action n’est pas encore formalisée au niveau opérationnel fin ;
- la liste exacte des statuts membre et de certains types documentaires reste à stabiliser ;
- la factorisation future entre `activities` et `gym-slots` devra être surveillée à l’implémentation.

**Nice-to-Have Gaps:**

- formalisation d’ADR courts pour les choix les plus sensibles ;
- ajout futur d’un glossaire métier plus complet ;
- ajout futur d’exemples de payloads API et d’objets métier canoniques.

### Validation Issues Addressed

Les principaux points de vigilance ont été explicitement cadrés dans l’architecture :

- distinction entre décisions structurantes et préférences réversibles ;
- note de revalidation sur Better Auth ;
- séparation entre surfaces, métier et technique ;
- gestion des invariants partagés ;
- séparation entre audit, logs techniques et messages UX ;
- garde-fous contre la sur-ingénierie et les dossiers fourre-tout.

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**

- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**

- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**

- très bonne cohérence entre produit, architecture, patterns et structure ;
- architecture suffisamment stricte pour protéger les invariants, mais assez simple pour un MVP ;
- excellent niveau de guidage pour une implémentation multi-agents cohérente ;
- séparation nette entre domaines métier, surfaces UX et capacités techniques.

**Areas for Future Enhancement:**

- matrice fine des permissions ;
- glossaire métier plus formel ;
- ADR ciblés sur auth, documents et planning partagé ;
- exemples canoniques de payloads et de contrats internes.

### Implementation Handoff

**AI Agent Guidelines:**

- suivre strictement les décisions d’architecture documentées ;
- implémenter d’abord les domaines MVP prioritaires ;
- centraliser les règles métier critiques dans services et policies ;
- respecter les frontières de domaine et les patterns de nommage ;
- traiter toute variation transverse comme un changement d’architecture locale.

**First Implementation Priority:**
Initialiser le projet avec le starter retenu, puis mettre en place dans l’ordre :

1. PostgreSQL + Prisma
2. Better Auth
3. modèle membre et policies d’éligibilité
4. audit et documents
5. activités et inscriptions
