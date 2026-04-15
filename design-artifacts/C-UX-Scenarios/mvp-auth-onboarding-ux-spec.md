---
title: "UX Scenario Specification - MVP Auth and Onboarding"
status: "draft"
created: "2026-04-15T19:35:00+02:00"
updated: "2026-04-15T19:52:00+02:00"
owner: "Codex"
sources:
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/implementation-artifacts/1-2-authentifier-un-utilisateur-par-email-et-mot-de-passe.md"
  - "_bmad-output/implementation-artifacts/1-3-creer-un-compte-via-invitation-ou-rattachement-valide.md"
  - "src/app/(public)/sign-in/page.tsx"
  - "src/app/(public)/register/page.tsx"
  - "src/app/(member)/espace/page.tsx"
  - "src/app/(admin)/pilotage/page.tsx"
---

# Specification UX de scenario

## 1. Objectif

Cet artefact traduit la direction UX globale deja definie en une tranche MVP concrete pour les parcours deja engages dans le produit :

- connexion
- activation controlee de compte
- recuperation de mot de passe
- surface d'arrivee adherent
- surface d'arrivee responsable

Le but est de garder l'implementation actuelle coherente, mobile-first et simple a prolonger dans les prochaines stories sans refaire les fondations.

## 2. Perimetre

Cette specification couvre :

- la connexion d'un compte deja actif
- l'activation d'un compte prive depuis un lien club
- la demande de reinitialisation de mot de passe
- la definition d'un nouveau mot de passe
- la surface d'arrivee authentifiee cote adherent
- la surface d'arrivee authentifiee cote responsable

Cette specification ne couvre pas encore :

- la gestion des roles fine et la resolution du role actif
- les workflows metier complets membres, activites, annonces ou documents
- la creation d'invitations cote back-office
- la navigation profonde post-authentification

## 3. Utilisateurs et contexte

### 3.1 Profils principaux

**Adherent**

- utilise surtout le mobile
- veut acceder vite a son espace et comprendre sa situation
- n'a pas envie d'apprendre un outil administratif

**Responsable ou benevole**

- navigue sur mobile et desktop
- a besoin d'une sensation de fiabilite et de controle
- veut savoir si l'acces administratif est bien protege

**Utilisateur en premiere activation**

- vient d'un email ou d'un lien transmis par le club
- peut etre peu sur de la marche a suivre
- doit etre rassure sur le fait qu'il active le bon acces

### 3.2 Situations d'arrivee

- un membre revient se connecter apres une precedente session
- un futur utilisateur active son acces a partir d'un lien d'invitation ou de rattachement
- un utilisateur a oublie son mot de passe
- un utilisateur authentifie verifie qu'il est bien arrive dans la bonne surface

## 4. Effet recherche

L'utilisateur doit ressentir trois choses dans l'ordre :

1. "Cet acces est serieux et fiable."
2. "Je comprends exactement ce que je peux faire maintenant."
3. "J'arrive au bon endroit sans friction."

Sur cette tranche, le produit doit paraitre calme, guide et explicite plutot que dense.

## 5. Regles UX transverses

### 5.1 Mode d'interaction

- Un seul CTA primaire par page.
- Un bloc d'explication court apparait avant le formulaire.
- Les erreurs restent au plus pres du champ quand c'est possible, avec un resume calme si necessaire.
- Les succes confirment la suite, pas seulement un statut "ok".
- Les flux sensibles n'exposent jamais plus d'etat interne du club que necessaire.

### 5.2 Hierarchie visuelle

- Le shell de page introduit le contexte avant l'action.
- Le titre reste grand et directionnel.
- Le conteneur de formulaire doit paraitre plus leger que la carte d'introduction.
- Les messages importants utilisent des surfaces teintees, pas une interruption modale.
- Les donnees verrouillees ou en lecture seule doivent sembler intentionnelles, pas cassees.

### 5.3 Comportement responsive

- Le mobile est la reference.
- Sur petit ecran, l'introduction se place au-dessus du formulaire.
- Sur grand ecran, introduction et formulaire se partagent l'espace en deux colonnes pour accelerer la lecture.
- Tous les controles principaux gardent une hauteur tactile confortable.

### 5.4 Accessibilite de base

- Labels visibles sur tous les champs.
- Etats de focus forts et coherents.
- Messages d'erreur textuels, jamais portes par la couleur seule.
- Aucun flux critique ne doit imposer de scroll horizontal a 360 px de large.
- Les etats email verrouille ou token manquant doivent rester comprehensibles pour les lecteurs d'ecran.

### 5.5 Regles de langage

- Expliquer la raison avant l'instruction.
- Favoriser "ce qui se passe ensuite" plutot qu'un simple label de statut.
- Utiliser le vocabulaire club sans glisser vers le jargon interne.
- Garder le langage securite comprehensible pour des benevoles non techniques.

### 5.6 Regles de feedback

- Succes : confirmer l'action et la prochaine etape.
- Erreur recuperable : expliquer quoi corriger maintenant.
- Erreur bloquante : expliquer pourquoi et qui contacter ou quoi demander.
- Etat de garde ou redirection : etre silencieux si la redirection est immediate, explicite si l'utilisateur reste sur place.

## 6. Matrice des parcours

| Parcours | Point d'entree | Decision cle | Sortie attendue | Risque UX principal |
|----------|----------------|--------------|-----------------|---------------------|
| Connexion | `/sign-in` ou redirection d'une surface protegee | Identifiants valides ou non | Session ouverte puis redirection vers la bonne surface | Doute sur la destination post-login |
| Activation privee | `/register?token=...` | Token valide, expire, consomme ou invalide | Compte cree puis session ouverte | Sentiment d'echec incomprehensible |
| Recuperation | `/forgot-password` | Email valide ou non | Message generique de confirmation | Enumeration de compte |
| Nouveau mot de passe | `/reset-password?token=...` | Token exploitable ou non | Retour vers `/sign-in?reset=success` | Impasse apres erreur |
| Surface adherent | `/espace` | Session valide ou non | Acces confirme ou redirection | Page trop vide ou trop abstraite |
| Surface responsable | `/pilotage` | Session valide ou non | Acces protege confirme ou redirection | Sur-promesse admin |

## 7. Specifications par page

### 7.1 Connexion `/sign-in`

**But utilisateur**  
Ouvrir une session club existante rapidement et en confiance.

**Message principal**  
Il s'agit du point d'entree normal pour les membres et responsables qui ont deja un acces actif.

**Points d'entree**

- acces direct depuis un favori ou un lien du club
- redirection depuis une surface protegee
- retour depuis un reset de mot de passe reussi
- retour apres creation de compte

**Critere de succes**

- l'utilisateur comprend immediatement qu'il est au bon endroit
- le formulaire peut etre complete sans doute sur les champs
- en cas de succes, la destination post-login est claire

**Structure**

1. Carte de contexte avec titre, reassurance et bannieres de succes eventuelles.
2. Formulaire avec email, mot de passe, case "rester connecte" et un bouton primaire.
3. Sorties secondaires :
   mot de passe oublie, et rappel discret sur le lien d'activation quand c'est pertinent.

**Objets principaux**

- carte d'introduction auth
- banniere succes reset
- banniere succes activation
- champ email
- champ mot de passe
- case "rester connecte"
- lien "mot de passe oublie"
- bouton primaire de connexion

**Etats critiques**

- Par defaut : reassurance neutre et explication courte sur la session persistante.
- Apres creation de compte : confirmation que l'acces est pret et que la prochaine action est la connexion.
- Apres reset de mot de passe : confirmation que le nouveau mot de passe peut etre utilise.
- Identifiants invalides : resume inline sans vocabulaire technique.
- Callback present : note explicite sur le retour vers la surface demandee.
- Pending : bouton desactive, libelle de progression visible.

**Notes UX**

- "Rester connecte" doit sembler pratique, pas risque.
- Le lien "mot de passe oublie" doit rester visible sans concurrencer le CTA principal.
- Si une URL de retour existe, la page doit reduire toute ambiguite sur l'apres-connexion.

### 7.2 Activation controlee `/register?token=...`

**But utilisateur**  
Activer un compte prive du club depuis une invitation ou un rattachement deja valide.

**Message principal**  
La creation de compte n'est pas publique. Le club a deja valide ce chemin d'acces.

**Points d'entree**

- lien d'activation transmis par le club
- ouverture differee d'un lien recu par email

**Critere de succes**

- l'utilisateur comprend que l'email est deja rattache au club
- il peut definir un mot de passe sans douter de l'identite cible
- en cas de succes, il arrive directement dans son espace

**Structure**

1. Carte de contexte expliquant que le flux est prive et approuve par le club.
2. Formulaire avec nom, email verrouille, mot de passe, confirmation.
3. Petit lien secondaire vers la connexion pour les utilisateurs deja actives.

**Objets principaux**

- carte de contexte activation
- message d'etat de lien invalide ou expire
- champ nom complet
- champ email verrouille
- champ mot de passe
- champ confirmation
- bouton primaire d'activation
- lien secondaire vers la connexion

**Etats critiques**

- Token valide : formulaire disponible et email visible mais verrouille.
- Token manquant : expliquer que l'activation doit commencer depuis un lien emis par le club.
- Token invalide : demander un nouveau lien sans exposer de details internes.
- Token expire : expliquer que le club doit emettre une nouvelle activation.
- Token consomme : reorienter le modele mental vers la connexion ou le support club.
- Fiche deja liee : expliquer qu'un compte actif existe deja pour cette fiche membre.

**Notes UX**

- L'email verrouille est important car il retire tout doute sur l'identite en cours d'activation.
- Les erreurs doivent preserver la dignite de l'utilisateur : un lien expire ne doit pas donner l'impression d'une faute de sa part.
- Apres succes, l'ouverture directe de l'espace adherent cree de l'elan.

### 7.3 Recuperation `/forgot-password`

**But utilisateur**  
Recuperer l'acces sans reveler si un email existe ou non.

**Message principal**  
Si un compte actif correspondant existe, un chemin de reinitialisation sera prepare.

**Points d'entree**

- oubli de mot de passe depuis `/sign-in`
- besoin ponctuel de reinitialiser l'acces

**Critere de succes**

- l'utilisateur n'hesite pas sur l'action a realiser
- le formulaire se remplit en une seule etape
- le message de confirmation parait volontaire et rassurant

**Structure**

1. Carte de contexte qui explique le flux et pose les attentes.
2. Formulaire a un seul champ email avec un CTA primaire.
3. Bouton secondaire de retour a la connexion.

**Objets principaux**

- carte de contexte recuperation
- champ email
- message generique de confirmation
- bouton primaire de demande
- bouton secondaire de retour

**Etats critiques**

- Par defaut : explication neutre, sans tonalite d'alerte.
- Format email invalide : validation locale inline.
- Soumission reussie : confirmation generique qui evite l'enumeration de compte.
- Incident temporaire : message de retry calme.
- Pending : message de progression discret, sans changement brutal de mise en page.

**Notes UX**

- Cette page doit sembler plus legere que la connexion et l'activation car elle ne demande qu'une seule decision.
- Le succes generique est une mesure de securite et doit paraitre intentionnel, pas vague.

### 7.4 Nouveau mot de passe `/reset-password?token=...`

**But utilisateur**  
Definir un nouveau mot de passe puis revenir a la connexion en confiance.

**Message principal**  
L'utilisateur termine un parcours de recuperation, il ne cree pas un nouveau compte.

**Points d'entree**

- lien de reinitialisation ouvert depuis email ou environnement de dev

**Critere de succes**

- l'utilisateur comprend qu'il finalise une recuperation
- les deux champs mot de passe sont sans ambiguite
- la sortie vers la connexion parait naturelle

**Structure**

1. Carte de contexte courte.
2. Formulaire avec nouveau mot de passe, confirmation et un CTA primaire.

**Objets principaux**

- carte de contexte reset
- message bloquant si token absent
- champ nouveau mot de passe
- champ confirmation
- bouton primaire de mise a jour

**Etats critiques**

- Token valide : formulaire normal.
- Token manquant : message bloquant avec prochaine etape claire.
- Token invalide ou expire : echec inline avec invitation a demander un nouveau lien.
- Succes : retour vers la connexion avec banniere de succes visible.
- Pending : CTA desactive et libelle de progression court.

**Notes UX**

- Eviter une page de succes sans suite utile.
- Revenir vers la connexion garde un modele mental simple.

### 7.5 Surface adherent `/espace`

**But utilisateur**  
Verifier que l'acces a fonctionne et comprendre ce qui arrive ensuite cote membre.

**Message principal**  
La session est active, fiable et prete pour les prochains parcours adherent.

**Points d'entree**

- redirection post-login
- redirection post-activation
- retour direct d'un utilisateur deja authentifie

**Critere de succes**

- l'utilisateur identifie tout de suite qu'il est connecte
- il comprend ce qui sera disponible ensuite
- il peut se deconnecter sans chercher

**Structure**

1. Carte de bienvenue avec identite et marqueurs de confiance sur la session.
2. Aside de soutien avec capacites MVP a venir et deconnexion.

**Objets principaux**

- carte bienvenue
- bloc email utilisateur
- bloc expiration session
- liste des prochaines capacites membre
- bouton deconnexion

**Etats critiques**

- Authentifie : bienvenue, expiration de session et prochaines etapes.
- Non authentifie : redirection par garde serveur.

**Notes UX**

- Cette page est encore transitoire. Elle doit signaler "pret pour la suite" plutot que pretendre que le produit est deja complet.
- La liste des prochaines etapes transforme utilement un placeholder en surface de projection.

### 7.6 Surface responsable `/pilotage`

**But utilisateur**  
Verifier que l'acces administratif protege est deja actif avant l'arrivee des workflows riches.

**Message principal**  
L'acces responsable est deja protege, meme si le detail RBAC n'est pas encore la.

**Points d'entree**

- redirection post-login
- acces direct d'un utilisateur deja authentifie

**Critere de succes**

- l'utilisateur comprend qu'il se trouve dans une surface plus sensible
- il voit ce qui est deja verrouille et ce qui ne l'est pas encore
- il n'imagine pas des capacites non disponibles

**Structure**

1. Carte expliquant ce qui est deja securise.
2. Carte expliquant ce qui reste volontairement hors perimetre.
3. Action de deconnexion disponible mais visuellement secondaire.

**Objets principaux**

- carte "deja verrouille"
- carte "reste ouvert"
- bloc email utilisateur
- bloc expiration session
- bouton deconnexion

**Etats critiques**

- Authentifie : reassurance admin et clarte sur la frontiere actuelle.
- Non authentifie : redirection par garde serveur.

**Notes UX**

- Cette page ne doit pas sur-promettre un pouvoir admin qui n'existe pas encore.
- Nommer explicitement ce qui manque aide a conserver la confiance.

## 8. Matrice des redirections

| Situation | Destination | Intention UX |
|-----------|-------------|--------------|
| Utilisateur deja authentifie qui ouvre `/sign-in` | callback valide ou surface par defaut | Eviter une etape inutile |
| Activation reussie | `/espace` | Creer un sentiment d'aboutissement immediat |
| Reset de mot de passe reussi | `/sign-in?reset=success` | Revenir vers l'action logique suivante |
| Acces non authentifie a `/espace` | `/sign-in` avec callback | Preserver le contexte sans surprise |
| Acces non authentifie a `/pilotage` | `/sign-in` avec callback | Garder la sensation de protection |
| Utilisateur authentifie qui ouvre `/register` | `/espace` | Eviter la confusion sur un flux deja consomme |

## 9. Matrice des messages et etats

| Type de message | Ton attendu | Exemple d'intention |
|-----------------|-------------|---------------------|
| Succes | Rassurant et court | confirmer l'etape suivante |
| Erreur de saisie | Direct et local | indiquer quoi corriger |
| Erreur d'identifiants | Sobre | eviter toute fuite d'information |
| Token invalide ou expire | Empathique et oriente solution | demander un nouveau lien |
| Etat pending | Calme | montrer que le systeme travaille |
| Etat protege | Silencieux ou sobre | ne pas dramatiser la securite |

## 10. Inventaire de composants a stabiliser

- `auth-page-shell`
  bloc hero reutilisable pour tous les parcours publics d'acces
- `form-status-banner`
  succes, erreur bloquante, information contextuelle
- `locked-field`
  champ en lecture seule visiblement intentionnel
- `auth-primary-button`
  CTA principal avec etat pending et libelle de progression
- `guarded-session-card`
  carte de confiance pour surfaces authentifiees
- `next-steps-list`
  liste de capacites a venir sur les surfaces transitoires

## 11. Regles de validation des formulaires

### 11.1 Connexion

- email requis et au bon format
- mot de passe requis
- erreurs inline sur le champ
- resume d'erreur possible si au moins un champ est invalide

### 11.2 Activation

- nom requis
- email verrouille et non editable
- mot de passe conforme a la politique definie
- confirmation strictement identique
- token toujours decide cote serveur, jamais editable par l'utilisateur

### 11.3 Recuperation

- email requis et au bon format
- succes generique meme si aucun compte n'est trouve

### 11.4 Reset

- token present
- nouveau mot de passe conforme
- confirmation identique
- en cas d'echec token, proposer clairement de relancer le parcours precedent

## 12. Responsive detaille

### 12.1 Mobile

- shell en colonne unique
- formulaire immediatement visible apres le contexte
- actions secondaires sous le CTA principal
- messages d'etat sur toute la largeur

### 12.2 Tablette

- grille possible en deux colonnes si la lisibilite reste forte
- informations de contexte visibles sans voler l'action

### 12.3 Desktop

- repartition intro / formulaire plus marquee
- cartes authentifiees avec zones d'information juxtaposees
- ne pas etirer les formulaires sur des largeurs trop grandes

## 13. Instrumentation et mesure recommandees

| Evenement | Quand | Utilite |
|-----------|-------|---------|
| `auth_sign_in_submitted` | soumission du formulaire de connexion | mesurer la friction d'entree |
| `auth_sign_in_failed` | identifiants refuses | suivre le taux d'echec |
| `auth_sign_in_succeeded` | session ouverte | mesurer la completion |
| `auth_register_started` | affichage d'un token valide | mesurer l'usage des liens |
| `auth_register_failed` | erreur d'activation | identifier les causes de blocage |
| `auth_register_succeeded` | compte cree | mesurer l'onboarding reussi |
| `auth_password_reset_requested` | soumission reussie du formulaire de demande | suivre le besoin de recuperation |
| `auth_password_reset_completed` | reset final reussi | mesurer la completion du flux |

## 14. Checklist UX et QA

- [ ] Un utilisateur comprend en moins de 5 secondes s'il est sur connexion, activation ou recuperation
- [ ] Un seul CTA primaire apparait par page
- [ ] Les etats pending evitent le double clic
- [ ] Les messages de succes indiquent la prochaine etape
- [ ] Les erreurs de token renvoient toujours vers une solution claire
- [ ] Les pages restent lisibles et utilisables a 360 px de large
- [ ] Les champs verrouilles paraissent volontaires et explicites
- [ ] Les surfaces authentifiees affichent un signe clair de session active
- [ ] Les surfaces transitoires n'annoncent pas de fonctionnalites inexistantes
- [ ] Les redirections post-authentification sont coherentes avec le contexte d'entree

## 15. Notes de handoff frontend

- Garder le shell d'auth reutilisable pour toutes les pages publiques d'acces.
- Conserver la fondation visuelle actuelle portee par `globals.css`.
- Eviter de multiplier les CTA concurrents dans les formulaires.
- Garder les succes dans le flux de page, pas uniquement via toast.
- Traiter l'email en lecture seule sur l'activation comme une regle produit, pas comme un detail cosmetique.
- Quand la story 1.4 commencera, utiliser ces pages comme base du routage par role plutot que les redesigner completement.
- Si un composant d'etat est extrait, le partager entre `sign-in`, `register`, `forgot-password` et `reset-password`.
- Ne pas remplacer les messages inline par des seuls toasts.
- Garder les surfaces `/espace` et `/pilotage` honnetes sur leur statut de pages transitoires.

## 16. Questions UX ouvertes

- La surface adherent doit-elle devenir un vrai dashboard des la story 1.4, ou rester une page de transition courte ?
- Les surfaces adherent et responsable doivent-elles diverger plus franchement en densite et navigation des l'arrivee des roles ?
- Le club a-t-il besoin d'un bloc de reassurance plus fort autour des liens expires et du support ?
- "Rester connecte" aura-t-il besoin d'un texte d'aide pour les utilisateurs moins a l'aise ?
- Le premier ecran authentifie devra-t-il mettre en avant les annonces urgentes avant les raccourcis ?

## 17. Livrables UX recommandes ensuite

1. Une spec de page pour le vrai tableau de bord adherent apres resolution des roles.
2. Une spec de page pour le premier cockpit admin reel.
3. Un langage de statuts reutilisable pour eligibilite, conformite et invitations.
4. Un inventaire simple de composants pour bannieres auth, cartes protegees et blocs de statut.
