# Application Web de Gestion des Animaux d'une Clinique Vétérinaire

## Projet Libre S10

<em>Auteurs : Dylan MOTARD & Florian GIGOT </em>

## Installation

* Installer Node.js 10
```shell
npm install
npm start
```
* Accéder à l'URL depuis http://localhost:4200/pages
* Se connecter avec l'identifiant "Admin" et le mot de passe "password"

## Technologies

Pour ce projet, nous allons utiliser les technologies suivantes :
* Le framework Angular pour la partie front-end du projet
* Le framework Spring pour la partie back-end du projet réalisée en Java
* MySQL pour la base de données


## Description

Cette application se base sur 2 grands axes : 
* La gestion générale des flux des animaux dans une clinique vétérinaire.
* La visualisation de statistiques générales pour la prise de décision.

Gestion des flux :
* Gestion des fiches d’animaux (identifiant, nom, date de naissance, propriétaire, type, race)
* Gestion des visites (identifiant, date d’entrée, date de sortie, animal, vétérinaire)

Visualisation des statistiques :
* Nombre d’animaux en fonction du type d’animal (Diagramme circulaire)
* Nombre d’animaux en fonction du type d’animal (Histogramme)