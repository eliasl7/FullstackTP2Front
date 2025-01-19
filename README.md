# TP2 Full Stack

Une application web Angular permettant la gestion d'événements et d'artistes, avec la possibilité de les lier entre eux.

## Fonctionnalités

### Gestion des Événements

- Liste paginée des événements
- Détail d'un événement
- Modification des informations d'un événement (nom, dates)
- Association/Dissociation d'artistes à un événement

### Gestion des Artistes

- Liste paginée des artistes avec recherche
- Détail d'un artiste
- Modification des informations d'un artiste
- Vue des événements associés

### Fonctionnalités Techniques

- Validation des formulaires côté client
- Gestion globale des erreurs avec notifications
- Interface responsive
- Pagination des listes
- Transitions et animations pour une meilleure expérience utilisateur

## Prérequis

- Node.js (version 14 ou supérieure)
- Angular CLI (version 16)
- Java 17 (pour l'API)

## Installation

1. Cloner le projet

```bash
git clone https://github.com/eliasl7/FullstackTP2Front.git
```

2. Installer les dépendances

```bash
npm install
```

3. Lancer l'API (dans un terminal séparé, pas présente non plus sur le dépôt)

```bash
java -jar event-0.0.1-SNAPSHOT.jar
```

4. Lancer l'application Angular

```bash
ng serve
```

L'application sera accessible à l'adresse `http://localhost:4200`

## Données de test

Pour générer des données de test, utilisez le script PowerShell fourni :

```powershell
.\scripts\create-test-data.ps1
```

## Gestion des Erreurs

L'application gère les erreurs suivantes :

- 400: Requête invalide
- 401: Non authentifié
- 403: Non autorisé
- 404: Ressource non trouvée
- 500: Erreur serveur

## Validation des Formulaires

- Nom (événement/artiste) : minimum 3 caractères
- Dates d'événement : la date de fin doit être postérieure à la date de début
- Tous les champs obligatoires sont marqués visuellement

## Auteurs

- Elias Larbi
- Zine-Eddine Toubal
