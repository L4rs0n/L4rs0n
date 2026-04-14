---
title: "PRD: L4rs0n"
status: "complete"
created: "2026-04-08T20:28:47.1662298+02:00"
updated: "2026-04-14T00:00:00+02:00"
workflowType: "prd"
classification:
  domain: "general"
  projectType: "web_app"
stepsCompleted:
  - "step-01-init"
  - "step-02-discovery"
  - "step-02b-vision"
  - "step-02c-executive-summary"
  - "step-03-success"
  - "step-04-journeys"
  - "step-05-domain"
  - "step-06-innovation"
  - "step-07-project-type"
  - "step-08-scoping"
  - "step-09-functional"
  - "step-10-nonfunctional"
  - "step-11-polish"
  - "step-12-complete"
inputDocuments:
  - "docs/cadrage-application-clubs-sportifs.md"
  - "_bmad-output/planning-artifacts/product-brief-L4rs0n.md"
  - "_bmad-output/planning-artifacts/product-brief-L4rs0n-distillate.md"
---

# Product Requirements Document - L4rs0n

**Auteur:** LUTCHANAH Kévin  
**Date:** 2026-04-08  
**Langue du document:** Français

## Executive Summary

L4rs0n est une application web de gestion pour clubs sportifs amateurs. Le MVP cible un club de badminton unique, avec 80 à 150 adhérents, dans un modèle mono-club simple à exploiter.

Le produit répond à un problème opérationnel concret : les activités du club sont aujourd'hui réparties entre messagerie, tableurs, agendas partagés, formulaires et dépôts de documents. Cette dispersion crée des erreurs, de la ressaisie et une faible visibilité pour les responsables comme pour les adhérents.

Le MVP doit centraliser cinq besoins récurrents :

- gestion des membres et de leur statut d'éligibilité ;
- gestion des cotisations au niveau nécessaire au contrôle d'accès ;
- gestion des événements du club ;
- gestion des rencontres inter-clubs ;
- gestion des créneaux de salle, documents et communications descendantes.

Le différenciateur du produit n'est pas une sophistication technique. L4rs0n se distingue par une exécution simple, lisible et adaptée à une association sportive. La V1 privilégie l'utilité hebdomadaire réelle pour les bénévoles et les adhérents.

## Vision Produit

Créer la référence opérationnelle d'un club amateur de badminton : un outil unique où responsables et adhérents trouvent les informations à jour, gèrent les activités du club et appliquent les règles essentielles sans dépendre d'une constellation d'outils externes.

À moyen terme, le socle doit pouvoir s'étendre à d'autres clubs et à d'autres disciplines via des paramètres, rôles et règles configurables. Cette extensibilité ne doit pas complexifier le MVP.

## Problème et Opportunité

Les clubs amateurs perdent du temps sur des tâches administratives répétitives : maintien des listes de membres, vérification manuelle des cotisations, publication d'informations sur plusieurs canaux, gestion des changements de planning et recherche de documents.

Les effets métier actuels sont les suivants :

- informations incohérentes entre outils ;
- inscriptions incomplètes ou mal suivies ;
- faible traçabilité des décisions et changements ;
- communication descendante dispersée ;
- dépendance à des personnes clés qui détiennent l'information.

L'opportunité produit est forte parce que le besoin est fréquent, concret et sous-équipé. Un MVP mono-club bien cadré peut remplacer plusieurs usages externes dès les premières semaines d'adoption.

## Utilisateurs Cibles

### Utilisateurs principaux

- administrateur du club ;
- trésorier ou responsable budget ;
- responsable événements ;
- coach ou responsable d'activité ;
- adhérent ou joueur.

### Hypothèses d'usage

- les responsables utilisent l'application chaque semaine ;
- les adhérents l'utilisent pour consulter les informations, s'inscrire et suivre leurs activités ;
- un même utilisateur peut cumuler plusieurs rôles ;
- la maturité numérique attendue est intermédiaire : application simple, lisible et mobile-friendly.

## Success Criteria

### User Success

- Un administrateur peut créer, modifier, archiver et retrouver un membre sans tableur parallèle.
- Un responsable peut publier un événement complet en moins de 5 minutes.
- Un adhérent peut s'inscrire ou se désinscrire à un événement en moins de 1 minute depuis mobile.
- Un responsable peut planifier une rencontre inter-clubs avec toutes les informations logistiques dans un seul écran de travail.
- Un responsable peut publier ou modifier un créneau de gymnase sans créer de conflit non détecté.
- Un adhérent peut retrouver les informations utiles du club et les documents clés sans passer par une messagerie externe.

### Business Success

- Le club réduit d'au moins 50 % le nombre d'outils externes utilisés chaque semaine pour la gestion courante dans les 3 mois suivant le lancement, mesuré par inventaire des outils utilisés avant et après déploiement.
- Au moins 80 % des membres actifs se connectent au moins une fois par mois dans les 90 jours après mise en service, mesuré par les journaux de connexion.
- Au moins 90 % des inscriptions aux événements du club passent par L4rs0n dans les 3 mois, mesuré par comparaison entre inscriptions enregistrées dans L4rs0n et inscriptions traitées hors plateforme.
- 100 % des événements, rencontres inter-clubs et créneaux publiés par le club sont gérés dans L4rs0n après phase d'adoption, mesuré par revue mensuelle des publications officielles du club.

### Technical Success

- La plateforme supporte un club de 150 adhérents et les pics d'usage liés aux ouvertures d'inscription sans dépasser les seuils définis par NFR1, NFR2, NFR12 et NFR13, mesuré par test de charge avant mise en production.
- Les règles d'accès empêchent 100 % des membres non à jour de cotisation de s'inscrire à un événement ou de participer à un entraînement lors des tests d'autorisation précédant la mise en production.
- Les actions d'administration critiques sont historisées et traçables sur 100 % du périmètre couvert par NFR7, vérifié par audit fonctionnel avant mise en production.
- Les données personnelles et documents stockés sont gérés selon des règles RGPD explicites, vérifiées par revue de conformité documentaire avant ouverture du service.

### Measurable Outcomes

- Temps moyen de création d'un événement inférieur à 5 minutes.
- Temps moyen d'inscription à un événement inférieur à 60 secondes.
- Taux d'échec d'inscription inférieur à 2 % sur les 30 premiers jours d'usage.
- Diminution d'au moins 50 % des messages manuels de relance sur les événements et changements de planning.
- Diminution d'au moins 50 % des demandes récurrentes "où trouver l'information" après 2 mois.

## Product Scope

### MVP - Minimum Viable Product

- gestion des membres et de leur statut ;
- gestion minimale des cotisations pour contrôler l'éligibilité ;
- gestion des rôles et permissions principales ;
- calendrier des événements avec inscription, désinscription, capacité et notifications simples ;
- gestion des rencontres inter-clubs ;
- gestion des créneaux de gymnase et des changements logistiques ;
- espace documentaire simple ;
- communications descendantes administrées par le club ;
- application web responsive avec authentification email et mot de passe.

### Growth Features - Post-MVP

- listes d'attente paramétrables ;
- exports administratifs et comptables avancés ;
- PWA avec meilleure expérience hors ligne ;
- règles plus fines par type d'événement ou catégorie ;
- tableaux de bord plus riches pour responsables ;
- historique sportif ou participation enrichie.

### Vision - Future

- support multi-clubs ;
- extension à d'autres sports ;
- paramétrage avancé des rôles et workflows ;
- modèle d'adhésion configurable ;
- moteur de règles métier configurable ;
- intégrations de paiement en ligne et écosystème associatif.

## User Journeys

### Journey 1 - Administrer les membres

1. L'administrateur se connecte.
2. Il consulte la liste des membres, leurs statuts et documents reçus.
3. Il crée un nouveau membre ou met à jour une fiche existante.
4. Il affecte un ou plusieurs rôles.
5. Il vérifie le statut de cotisation et la présence du règlement intérieur signé.
6. Il archive ou réactive le membre selon le cycle du club.

Résultat attendu : le club dispose d'une base membres fiable et exploitable par les autres modules.

### Journey 2 - Publier un événement

1. Le responsable crée un événement.
2. Il renseigne type, date, lieu, capacité, description et règles d'inscription.
3. Il publie l'événement.
4. Les adhérents éligibles reçoivent une notification.
5. Le responsable suit les inscrits, désistements et places restantes.
6. Il modifie ou annule l'événement si nécessaire.

Résultat attendu : le cycle complet de publication et suivi d'un événement s'effectue dans un seul outil.

### Journey 3 - S'inscrire à une activité

1. L'adhérent se connecte depuis mobile ou desktop.
2. Il consulte les événements et créneaux publiés.
3. Il ouvre une fiche activité.
4. Le système affiche son éligibilité.
5. Il s'inscrit ou se désinscrit.
6. Il reçoit une confirmation et voit son statut mis à jour.

Résultat attendu : l'adhérent comprend immédiatement s'il peut participer et quelle est sa situation.

### Journey 4 - Planifier une rencontre inter-clubs

1. Le responsable crée une rencontre inter-clubs.
2. Il renseigne club adverse, type, date, lieu et informations pratiques.
3. Il prépare la liste des participants ou convoqués.
4. Il publie l'information aux personnes concernées.
5. Il met à jour les changements de dernière minute.

Résultat attendu : une rencontre inter-clubs est gérée avec un historique clair et des informations centralisées.

### Journey 5 - Gérer les créneaux de gymnase

1. Le responsable crée ou modifie un créneau.
2. Il associe le créneau à un entraînement ou une activité.
3. Le système contrôle les conflits de planning.
4. Le responsable publie le créneau.
5. Les adhérents consultent uniquement les créneaux publiés.
6. En cas d'annulation, une notification est envoyée.

Résultat attendu : la planification des salles est fiable, visible et mise à jour.

### Journey 6 - Consulter documents et informations club

1. Un responsable publie un document ou une information club.
2. Il choisit la visibilité selon le rôle.
3. L'adhérent consulte l'espace documentaire ou le canal d'information.
4. Il retrouve la dernière version disponible.

Résultat attendu : les informations descendantes et documents de référence sont centralisés.

### Journey 7 - Superviser l'administration et la conformité

1. L'administrateur ouvre le tableau de bord du club.
2. Il consulte les membres en attente d'action, les cotisations non à jour et les alertes documentaires.
3. Il ouvre le journal des changements récents pour vérifier une action d'administration sensible.
4. Il contrôle les informations générales du club utilisées dans l'application.
5. Il lance, si nécessaire, une action corrective sur un membre, un document ou un paramètre club.

Résultat attendu : les besoins d'administration, d'audit et de conformité courante sont traités dans un flux unique et traçable.

## Domain Requirements

### Règles métier confirmées

- Un membre dont la cotisation n'est pas à jour ne peut pas participer aux événements ni aux entraînements.
- Le règlement intérieur signé est un document obligatoire confirmé pour le MVP.
- Les canaux de communication de la V1 sont administrés par le club et orientés diffusion structurée.
- Les paiements en ligne ne font pas partie du MVP.
- Le suivi détaillé de progression sportive ne fait pas partie du MVP.

### Décisions produit structurantes

- V1 mono-club, mono-instance.
- Discipline initiale : badminton.
- Volume cible : 80 à 150 adhérents.
- L'expérience doit fonctionner sur mobile sans application native dédiée.

### Questions métier encore ouvertes

- cycle d'adhésion exact et statuts membres ;
- cumul précis des rôles ;
- droits détaillés par action ;
- règles de liste d'attente ;
- typologie exacte des rencontres inter-clubs ;
- règles de conservation documentaire ;
- niveau de sensibilité des documents stockés ;
- besoins d'exports comptables et administratifs.

### Contraintes réglementaires et associatives

- conformité RGPD sur les données personnelles et documents ;
- contrôle de visibilité des données financières ;
- conservation limitée aux besoins légitimes du club ;
- capacité à informer les membres sur les données détenues ;
- journalisation des actions d'administration sensibles.

## Innovation Analysis

L4rs0n n'innove pas par effet de nouveauté technique. Son innovation est d'orchestrer un périmètre métier ciblé, cohérent et directement exploitable par une association sportive.

Les leviers de différenciation retenus sont :

- périmètre resserré sur les activités qui reviennent chaque semaine ;
- application des règles d'éligibilité dans les flux, pas dans des vérifications manuelles ;
- centralisation des événements, rencontres, salle, documents et annonces dans une seule interface ;
- architecture simple qui reste extensible sans suringénierie.

## Project-Type Requirements

### Type de produit

Application web SaaS privée en mode mono-club pour la V1, accessible depuis navigateur desktop et mobile.

### Contraintes de conception

- navigation simple pour profils peu techniques ;
- responsive design obligatoire ;
- pas de dépendance à une application native ;
- architecture maintenable par une petite équipe ;
- séparation claire entre données métier et documents stockés.

### Support navigateurs

- navigateurs desktop supportés en version courante et une version majeure précédente pour Chrome, Edge, Firefox et Safari ;
- navigateurs mobiles supportés sur iOS Safari et Chrome Android en version courante ;
- aucun support garanti pour Internet Explorer ;
- toute régression sur les parcours critiques doit être vérifiée sur ce périmètre avant mise en production.

### Stratégie SEO

- l'application métier authentifiée ne dépend pas du SEO pour son acquisition ou son usage courant ;
- les pages publiques éventuelles du projet, comme présentation, aide et mentions légales, doivent rester indexables avec métadonnées de base ;
- aucune optimisation SEO avancée n'est requise pour le MVP côté espace connecté.

### Contraintes d'exploitation

- déploiement simple ;
- hébergement maintenable ;
- administration possible sans équipe IT dédiée dans le club ;
- coût d'exploitation compatible avec une structure associative.

## Functional Requirements

### Gestion des comptes et accès

- FR1: Un visiteur peut créer un compte utilisateur à partir d'une invitation ou d'un rattachement validé par le club.
- FR2: Un utilisateur peut se connecter avec une adresse email et un mot de passe.
- FR3: Un utilisateur peut réinitialiser son mot de passe.
- FR4: Un administrateur peut activer, désactiver, archiver et réactiver un compte.
- FR5: Un administrateur peut attribuer un ou plusieurs rôles configurés à un même utilisateur, dans la limite des rôles définis par le club.
- FR6: Le système peut appliquer des permissions différentes selon le rôle actif de l'utilisateur.

### Gestion des membres

- FR7: Un administrateur peut créer une fiche membre.
- FR8: Un administrateur peut modifier les informations principales d'une fiche membre.
- FR9: Un administrateur peut définir le statut d'adhésion d'un membre.
- FR10: Un administrateur peut associer un utilisateur applicatif à une fiche membre.
- FR11: Un administrateur peut archiver une fiche membre sans supprimer son historique utile.
- FR12: Un responsable autorisé peut consulter la liste des membres avec recherche et filtres.

### Cotisations et éligibilité

- FR13: Un responsable autorisé peut enregistrer le statut de cotisation d'un membre.
- FR14: Le système peut distinguer un membre à jour, en attente ou non à jour de cotisation.
- FR15: Le système peut bloquer l'inscription d'un membre non éligible à un événement ou un entraînement.
- FR16: Le système peut afficher à l'adhérent la raison de son inéligibilité.
- FR17: Un responsable autorisé peut consulter les membres bloqués pour cause de cotisation ou document manquant.

### Documents et conformité membre

- FR18: Un responsable autorisé peut déposer un document sur une fiche membre.
- FR19: Le système peut marquer un type de document comme obligatoire.
- FR20: Le système peut signaler l'absence d'un document obligatoire.
- FR21: Un utilisateur autorisé peut consulter un document selon ses permissions.
- FR22: Un administrateur peut publier des documents généraux du club dans un espace documentaire partagé.

### Gestion des événements

- FR23: Un responsable autorisé peut créer un événement.
- FR24: Un responsable autorisé peut publier, modifier, reporter ou annuler un événement.
- FR25: Un événement peut comporter une date, une heure, un lieu, une description, une capacité et un statut.
- FR26: Un adhérent éligible peut s'inscrire à un événement publié.
- FR27: Un adhérent inscrit peut se désinscrire d'un événement selon les règles définies par le club.
- FR28: Le système peut suivre le nombre de places restantes.
- FR29: Un responsable autorisé peut consulter la liste des participants et leur statut.
- FR30: Le système peut notifier les personnes concernées lors d'une création, modification ou annulation d'événement.

### Rencontres inter-clubs

- FR31: Un responsable autorisé peut créer une rencontre inter-clubs.
- FR32: Une rencontre inter-clubs peut contenir le club adverse, le type de rencontre, la date, l'horaire, le lieu et les informations pratiques.
- FR33: Un responsable autorisé peut associer des participants ou convoqués à une rencontre inter-clubs.
- FR34: Un responsable autorisé peut mettre à jour une rencontre inter-clubs jusqu'à sa clôture.
- FR35: Les utilisateurs concernés peuvent consulter les informations d'une rencontre inter-clubs les concernant.

### Gestion du gymnase et des créneaux

- FR36: Un responsable autorisé peut créer un créneau de gymnase.
- FR37: Un responsable autorisé peut modifier, annuler ou republier un créneau.
- FR38: Un créneau peut être lié à un entraînement, un événement ou une activité du club.
- FR39: Le système peut détecter les conflits entre créneaux pour une même ressource planifiée.
- FR40: Les adhérents peuvent consulter les créneaux publiés qui les concernent.
- FR41: Le système peut notifier les adhérents concernés lors d'une annulation, d'un changement d'horaire, d'un changement de lieu ou d'une modification de capacité sur un créneau publié.

### Communication et information club

- FR42: Un administrateur peut créer et gérer des canaux d'information.
- FR43: Un responsable autorisé peut publier une annonce dans un canal.
- FR44: Le système peut cibler la diffusion d'une annonce selon des rôles ou audiences définies.
- FR45: Un adhérent peut consulter les annonces qui lui sont destinées.

### Administration et traçabilité

- FR46: Un administrateur peut consulter un tableau de bord affichant au minimum les membres en attente d'action, les cotisations non à jour, les prochains événements, les changements récents de créneaux et les alertes documentaires.
- FR47: Le système peut historiser les actions d'administration sensibles.
- FR48: Un administrateur peut consulter un journal des changements majeurs.
- FR49: Un administrateur peut configurer les informations générales du club utilisées dans l'application.

## Non-Functional Requirements

### Performance

- NFR1: Le système doit afficher une page de liste principale en moins de 2 secondes pour 95 % des requêtes sous charge nominale de 50 utilisateurs simultanés.
- NFR2: Le système doit confirmer une inscription ou désinscription à un événement en moins de 3 secondes pour 95 % des opérations sous charge nominale.
- NFR3: Le système doit rendre disponible une recherche membre en moins de 2 secondes pour 95 % des requêtes sur un volume de 150 adhérents.

### Security

- NFR4: Le système doit chiffrer les données en transit via TLS sur 100 % des échanges authentifiés, vérifiés lors des tests de sécurité précédant chaque mise en production.
- NFR5: Le système doit stocker 100 % des mots de passe avec un algorithme de hachage adaptatif validé par l'équipe technique et revu au moins une fois par an.
- NFR6: Le système doit appliquer un contrôle d'accès basé sur les rôles pour 100 % des écrans et opérations protégés, vérifié par la matrice d'autorisation et les tests d'accès avant mise en production.
- NFR7: Le système doit journaliser 100 % des actions d'administration sensibles avec horodatage, acteur et type d'action, vérifiés lors d'un audit fonctionnel avant mise en production.
- NFR8: Le système doit permettre la suppression ou l'anonymisation des données d'un membre dans un délai maximum de 30 jours après validation d'une demande conforme aux règles de conservation du club et à la réglementation applicable.

### Reliability

- NFR9: Le système doit atteindre 99,5 % de disponibilité mensuelle hors fenêtres de maintenance planifiées, mesurée par l'outil de supervision de production.
- NFR10: Le système doit exécuter au moins une sauvegarde complète quotidienne des données métier et des métadonnées documentaires avec un journal de succès consultable par un administrateur autorisé.
- NFR11: Le système doit permettre une restauration des données avec un objectif de reprise inférieur à 24 heures après incident majeur.

### Scalability

- NFR12: Le système doit supporter le fonctionnement nominal d'un club de 150 adhérents sans dégradation supérieure à 10 % des temps de réponse définis.
- NFR13: Le système doit supporter un pic de 100 connexions actives sur une fenêtre de 15 minutes lors d'une ouverture d'inscription sans indisponibilité du service.

### Accessibility

- NFR14: L'interface web doit respecter les critères WCAG 2.1 niveau AA sur les parcours critiques d'authentification, consultation d'informations et inscription à un événement.
- NFR15: Le système doit permettre l'authentification, la consultation des événements, l'inscription ou désinscription à un événement et l'accès aux documents clés sans zoom horizontal sur une largeur d'écran de 360 px et plus.

### Compliance et gouvernance des données

- NFR16: Le système doit tracer pour 100 % des consentements ou validations requis l'origine, la date et le type de preuve associée pour les documents obligatoires.
- NFR17: Le système doit afficher la politique de confidentialité et les informations de traitement des données à tout utilisateur authentifié en 2 clics maximum depuis les parcours critiques.
- NFR18: Le système doit empêcher 100 % des rôles non autorisés d'accéder aux données financières et documentaires sensibles lors des tests d'autorisation définis par le club.

## Hypothèses et Décisions de Travail

- Le MVP est conçu pour un seul club de badminton.
- Les paiements en ligne restent hors périmètre.
- Les mineurs et représentants légaux restent hors MVP.
- La communication en temps réel entre adhérents reste hors MVP.
- Les utilisateurs du club disposent d'une adresse email.

## Risques et Points de Vigilance

- La matrice de droits détaillée n'est pas encore arbitrée ; elle peut impacter plusieurs modules.
- Le cycle d'adhésion exact reste à formaliser ; il peut modifier la logique de statut membre.
- Les exigences documentaires RGPD doivent être validées avant stockage de documents sensibles.
- Les règles de rencontres inter-clubs doivent être précisées pour éviter un module trop générique ou trop limité.

## Questions Ouvertes

- Un événement complet ouvre-t-il une liste d'attente en V1 ?
- Quelles actions exactes sont réservées au trésorier par rapport à l'administrateur ?
- Quels documents autres que le règlement intérieur signé sont obligatoires ?
- Faut-il gérer plusieurs espaces ou ressources dans le gymnase dès le MVP ?
- Les rencontres inter-clubs doivent-elles distinguer amical et compétitif dans les règles métier ?
- Quels exports sont indispensables dès la V1 ?

## Validation et Suite

Ce PRD est prêt à servir de base pour la conception UX, l'architecture et le découpage en epics. Toute décision complémentaire sur les rôles, le cycle d'adhésion et la conformité documentaire devra être répercutée dans ce document pour préserver la traçabilité.
