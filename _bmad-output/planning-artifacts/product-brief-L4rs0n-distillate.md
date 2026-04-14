---
title: "Product Brief Distillate: L4rs0n"
type: llm-distillate
source: "product-brief-L4rs0n.md"
created: "2026-04-08T00:00:00+02:00"
purpose: "Contexte synthétique et exploitable pour la création du PRD"
---

# Distillate

## Produit et contexte

- Produit ciblé: application de gestion pour clubs sportifs amateurs, avec MVP recentré sur un club amateur de badminton.
- Modèle de lancement: instance dédiée à un seul club en V1, pas de multi-tenant au démarrage.
- Taille cible du premier déploiement: environ 80 à 150 adhérents.
- Problème racine: opérations courantes dispersées entre messagerie, tableurs, agendas, formulaires et outils externes.
- Effet recherché: centraliser les opérations fréquentes du club dans un outil unique, simple et exploitable par des bénévoles.

## Utilisateurs

- Utilisateurs principaux côté gestion: administrateur du club, trésorier ou responsable budget, responsable événements, coach ou responsable d'activité.
- Utilisateurs finaux côté terrain: adhérents et joueurs.
- Hypothèse opérationnelle du MVP: les profils principaux utilisent l'application régulièrement, souvent chaque semaine selon le rôle.
- Point à confirmer dans le PRD: un utilisateur peut probablement cumuler plusieurs rôles, mais les règles exactes ne sont pas encore définies.

## Scope MVP confirmé

- Gestion des événements: création, calendrier, inscription, désinscription, jauge, suivi des participants, notifications simples.
- Rencontres inter-clubs: planification, suivi des clubs adverses, gestion des participants, informations pratiques, dates, horaires, lieux.
- Gestion du gymnase: créneaux, affectation des entraînements, visibilité sur la disponibilité, changements et annulations.
- Fonctions support minimales: gestion membres, rôles minimaux, espace documentaire simple, informations club utiles, communication descendante administrée.
- Exigence de simplicité: architecture et UX doivent rester alignées avec un MVP concret, pas avec une plateforme générique ambitieuse.

## Règles métier et décisions déjà prises

- Règle confirmée: un membre dont la cotisation n'est pas à jour ne peut pas participer aux événements ni aux entraînements.
- Document obligatoire confirmé à ce stade: règlement intérieur signé.
- Communication V1: canaux créés et administrés par le club, diffusion structurée descendante, pas de discussion libre en temps réel.
- Paiements en ligne: non retenus pour le MVP.
- Suivi de progression sportive: non retenu pour le MVP.

## Hors scope et idées rejetées pour V1

- Gestion des mineurs et représentants légaux: utile mais non prioritaire sans validation.
- Paiements en ligne Stripe/PayPal: hors MVP.
- Chat ou discussion temps réel: hors MVP.
- Gestion avancée des cotisations: hors MVP initial.
- Défis sportifs, gamification, suivi détaillé des performances: hors MVP.
- Architecture cloud complexe, orchestration Kubernetes, GraphQL sans besoin fort: explicitement déconseillés pour la V1.

## Hypothèses produit et positionnement

- Différenciation principale: exécution simple et adaptée au monde associatif, pas sophistication technique.
- Pari produit: mieux vaut un outil mono-club utile immédiatement qu'une plateforme générique trop large.
- Stratégie d'extension future: garder des points d'ouverture sans surcomplexifier le MVP.
- Extensions futures déjà envisagées: paramètres par club, catégories d'événements configurables, champs de profil extensibles, rôles adaptables, règles d'accès évolutives.

## Contraintes et préférences techniques

- Format cible V1: application web responsive.
- Option mobile: PWA si le besoin mobile est confirmé comme fort.
- Backend: API simple.
- Données: base relationnelle.
- Fichiers: stockage séparé.
- Authentification: email + mot de passe.
- Hébergement: simple et maintenable.
- Préférence implicite forte: éviter toute sur-ingénierie dans le MVP.

## Critères de réussite à traduire en exigences

- Administrateur capable de créer et gérer les membres.
- Responsable capable de publier des événements et suivre les inscriptions.
- Responsable capable de planifier une rencontre inter-clubs.
- Responsable capable de gérer les créneaux de gymnase.
- Adhérent capable de consulter ses événements et les informations utiles.
- Réduction du nombre d'outils externes utilisés au quotidien par le club.

## Questions ouvertes à traiter dans le PRD

- Organisation type du club cible et maturité numérique réelle des utilisateurs.
- Matrice détaillée des rôles et droits: création, modification, suppression, export, validation, visibilité financière, accès aux documents sensibles.
- Cycle d'adhésion: statuts, conditions de renouvellement, relances, documents obligatoires complémentaires.
- Cotisations: paiement unique ou échelonné, moyens acceptés, remises, exemptions, remboursements, exports comptables.
- Événements: typologie, liste d'attente, annulations, notifications, lien avec groupes ou catégories.
- Rencontres inter-clubs: amicales ou compétitives, validation, convocations individuelles, historique requis.
- Gymnase: nombre de créneaux, plusieurs salles ou zones, gestion des conflits, visibilité adhérents versus planification interne.
- Documents et conformité: types de documents stockés, conservation, sensibilité, RGPD.
- Exigences non fonctionnelles: sécurité des données, sauvegardes, traçabilité, disponibilité, performance, compatibilité mobile.
