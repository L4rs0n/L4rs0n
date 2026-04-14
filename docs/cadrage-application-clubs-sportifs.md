# Document de Cadrage Produit

## Application de Gestion de Clubs Sportifs Amateurs

## 1. Objectif du document

Ce document ne remplace pas le plan de développement initial. Il sert à cadrer la demande de manière plus précise afin de :

- réduire les zones d'ambiguïté ;
- aligner les priorités métier ;
- préparer un MVP réaliste ;
- éviter les interprétations différentes entre produit, design et technique.

## 2. Problème à résoudre

Les clubs sportifs amateurs gèrent souvent leurs activités avec plusieurs outils dispersés : messagerie, tableurs, documents partagés, agendas, formulaires et paiements externes.

L'objectif du produit est de centraliser les opérations courantes d'un club dans une application unique, simple à utiliser et adaptée à une organisation associative.

## 3. Vision produit

Créer une plateforme web simple et évolutive permettant à un club sportif amateur de gérer :

- ses membres ;
- ses cotisations ;
- ses événements ;
- sa communication interne ;
- ses documents partagés ;
- une partie du suivi de vie du club.

## 4. Cible prioritaire

La vision long terme reste de couvrir plusieurs types de clubs sportifs amateurs.

En revanche, le MVP est désormais cadré sur :

- un club amateur de badminton ;
- une instance dédiée à un seul club ;
- un volume cible de 80 à 150 adhérents ;
- une première version pensée pour un usage concret et opérationnel ;
- une base fonctionnelle qui pourra ensuite être généralisée à d'autres disciplines.

Cette décision implique :

- un cadrage métier initial centré sur le badminton ;
- un modèle d'exploitation mono-club pour la V1 ;
- des choix de conception simples pour la V1 ;
- une architecture qui garde une possibilité d'extension future sans surcomplexifier le MVP.

## 5. Utilisateurs du système

Les profils suivants sont pressentis :

- administrateur du club ;
- trésorier ou responsable budget ;
- responsable événements ou coach ;
- adhérent ou joueur ;
- adhérent ou joueur.

Pour le MVP, l'hypothèse retenue est que tous les profils principaux utilisent l'application de manière régulière, potentiellement chaque semaine selon leur rôle.

## 6. Besoin principal

Le besoin principal à couvrir en premier est le suivant :

Permettre à un club amateur de badminton de gérer ses membres, ses cotisations, ses événements et ses documents dans un seul outil, avec une expérience claire pour les administrateurs et les adhérents.

À moyen terme, cette base pourra évoluer pour supporter d'autres sports avec des règles configurables.

## 7. Périmètre fonctionnel proposé pour le MVP

Le MVP recommandé ne doit pas couvrir tout le plan initial. Il devrait se concentrer sur les fonctionnalités les plus structurantes :

### 7.1 Gestion des événements

- création d'événements ;
- gestion du calendrier ;
- inscription et désinscription ;
- gestion du nombre de places ;
- suivi des participants ;
- notifications simples.

### 7.2 Gestion des rencontres inter-clubs

- planification des rencontres ;
- suivi des clubs adverses ;
- gestion des convocations ou participants ;
- centralisation des informations pratiques ;
- suivi des dates, horaires et lieux.

### 7.3 Gestion de la salle d'entraînement

- gestion des créneaux de gymnase ;
- affectation des entraînements aux créneaux ;
- visualisation de la disponibilité ;
- gestion des changements ou annulations ;
- centralisation des informations logistiques.

### 7.4 Fonctions support minimales

- gestion des membres nécessaire aux inscriptions ;
- gestion de rôles minimale ;
- espace documentaire simple ;
- informations club utiles au fonctionnement courant ;
- canaux de communication gérés par un administrateur.

## 8. Fonctionnalités hors MVP recommandées

Ces fonctionnalités peuvent être utiles, mais elles ne devraient pas être considérées comme prioritaires sans validation :

- gestion des mineurs et représentants légaux ;
- paiements en ligne ;
- discussion en direct entre utilisateurs ;
- gestion avancée des cotisations ;
- défis sportifs entre adhérents ;
- suivi détaillé de progression sportive ;
- indicateur ludique de type "niveau d'apéro" ;
- architecture cloud complexe ;
- orchestration Kubernetes ;
- GraphQL si aucun besoin fort ne le justifie.

## 9. Zones de flou à lever

Les points suivants ne sont pas encore assez précis pour lancer un cadrage complet.

### 9.1 Cible métier

Le MVP cible un club de badminton. Il faut maintenant préciser :

- l'organisation type du club ;
- les événements les plus fréquents ;
- le niveau de maturité numérique des utilisateurs.

### 9.2 Rôles et droits

Le tableau initial est utile mais insuffisant. Il faut préciser :

- si un utilisateur peut cumuler plusieurs rôles ;
- qui peut créer, modifier, supprimer, exporter, valider ;
- qui peut voir les données financières ;
- qui peut accéder aux documents sensibles ;
- qui peut administrer les événements.

### 9.3 Gestion des adhésions

Il faut définir :

- le cycle d'adhésion ;
- les statuts possibles ;
- les documents obligatoires ;
- les règles de relance ;
- les conditions de renouvellement.

Pour le MVP, le document obligatoire confirmé à ce stade est :

- règlement intérieur signé.

### 9.4 Gestion des cotisations

Il faut préciser :

- paiement unique ou échéancé ;
- moyens de paiement acceptés ;
- intégration d'un prestataire comme Stripe ou PayPal ;
- gestion des remises, exemptions ou remboursements ;
- besoins d'export comptable.

Pour le MVP, l'intégration de paiements en ligne n'est pas retenue.

### 9.5 Gestion des événements

Il faut préciser :

- types d'événements gérés ;
- règles d'inscription ;
- présence d'une liste d'attente ;
- gestion des annulations ;
- notifications attendues ;
- lien éventuel avec des catégories, équipes ou groupes.

### 9.6 Rencontres inter-clubs

Il faut préciser :

- s'il s'agit de rencontres amicales, compétitives ou les deux ;
- qui peut créer et valider une rencontre ;
- comment sont gérés les participants ;
- si les convocations sont individuelles ;
- quelles informations doivent être suivies ;
- si un historique des rencontres est nécessaire.

### 9.7 Gestion du gymnase

Il faut préciser :

- le nombre de créneaux à gérer ;
- si plusieurs salles ou zones existent ;
- qui peut réserver ou modifier un créneau ;
- si des conflits de réservation doivent être bloqués ;
- comment gérer les annulations ;
- si les adhérents voient seulement les créneaux publiés ou toute la planification.

### 9.8 Communication

Il faut décider si la communication interne doit être :

- un tableau d'annonces ;
- un système de notifications ;
- une messagerie complète ;
- ou une simple intégration email au départ.

Pour le MVP, l'orientation retenue est :

- des canaux de communication administrés par le club ;
- création et gestion des canaux par un administrateur ;
- diffusion d'informations descendantes ou structurées ;
- pas de discussion libre en temps réel entre utilisateurs dans la V1.

### 9.9 Documents et conformité

Il faut préciser :

- quels documents sont stockés ;
- qui peut les consulter ;
- combien de temps ils sont conservés ;
- si des documents sensibles sont présents ;
- quelles obligations RGPD s'appliquent.

### 9.10 Profil joueur

Le concept est encore trop vague. Il faut décider si ce module sert à :

- gérer une simple fiche membre enrichie ;
- suivre la participation aux événements ;
- suivre les performances sportives ;
- créer des interactions communautaires ;
- ou gamifier l'expérience.

Pour le MVP, le suivi de progression sportive n'est pas retenu.

## 10. Règles métier à formaliser

Avant développement, les règles suivantes doivent être écrites explicitement :

- un membre peut-il s'inscrire à un événement sans cotisation à jour ;
- un administrateur d'événement peut-il voir toutes les données membres ;
- un parent peut-il gérer plusieurs enfants ;
- un document médical expiré bloque-t-il certaines actions ;
- un événement complet ouvre-t-il une liste d'attente ;
- un remboursement modifie-t-il automatiquement le statut financier du membre.

Il faut aussi identifier quelles règles sont :

- propres au badminton ;
- communes à la plupart des clubs amateurs ;
- potentiellement configurables dans une version future.

Règle confirmée pour le MVP :

- un membre dont la cotisation n'est pas à jour ne peut pas participer aux événements ni aux entraînements.

## 11. Exigences non fonctionnelles à définir

Le document initial n'est pas assez précis sur les attentes de qualité. Il faut cadrer :

- sécurité des données personnelles ;
- conformité RGPD ;
- gestion des sauvegardes ;
- traçabilité des actions d'administration ;
- disponibilité minimale du service ;
- compatibilité mobile ;
- performance attendue ;
- volume cible d'utilisateurs et de documents.

## 12. Proposition technique réaliste pour une V1

À confirmer selon l'équipe et le budget, mais une base réaliste pour une première version serait :

- application web responsive ;
- PWA si le besoin mobile est fort ;
- backend API simple ;
- base de données relationnelle ;
- stockage fichiers séparé ;
- authentification par email et mot de passe ;
- gestion de rôles applicative ;
- une instance dédiée à un club unique ;
- hébergement simple et maintenable.

Le choix de technologies précises doit être fait après validation du périmètre MVP.

Comme le MVP vise d'abord un club de badminton, la conception doit privilégier la simplicité.

Il est néanmoins utile de garder à l'esprit quelques points d'extension future :

- paramètres par club ;
- catégories d'événements configurables ;
- champs de profil extensibles ;
- rôles adaptables ;
- règles d'accès et de validation pouvant évoluer.

## 13. Questions de cadrage à trancher

Les réponses à ces questions permettront de transformer ce cadrage en demande exploitable.

## 14. Critères de réussite du MVP

Le MVP peut être considéré comme réussi si :

- un administrateur peut créer et gérer les membres ;
- un responsable peut publier un événement et suivre les inscriptions ;
- un responsable peut planifier une rencontre inter-clubs ;
- un responsable peut gérer les créneaux de gymnase ;
- un adhérent peut consulter ses événements et les informations utiles du club ;
- les rôles et accès évitent les erreurs de manipulation ;
- le club réduit le nombre d'outils externes utilisés au quotidien.

## 15. Décisions à enregistrer dans la suite du cadrage

Pour éviter de nouveaux flous, chaque décision importante devra être consignée avec :

- la décision prise ;
- la raison ;
- l'impact ;
- la date ;
- le responsable de validation.

## 16. Conclusion

Le plan initial fournit une bonne vision générale. En revanche, il reste trop large pour lancer directement une conception détaillée ou un développement sans risque de dérive.

Le présent document pose une base de cadrage plus exploitable, mais il doit maintenant être complété par des réponses métier précises, notamment sur la cible, le périmètre MVP, les rôles, les règles de gestion et les priorités réelles du club.
