# Application Web de Gestion des Animaux d'une Clinique Vétérinaire

## Projet Libre S10

<em>Auteurs : Dylan MOTARD & Florian GIGOT </em>

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
* Gestion des fiches de propriétaires d’animaux (identifiant, prénom, nom, adresse, ville, téléphone, courriel)
* Gestion des fiches de vétérinaires (identifiant, prénom, nom, adresse, ville, téléphone, courriel, salaire, temps de travail, type de contrat)
* Gestion des types d’animaux (identifiant, nom, races)
* Gestion des races d’animaux (identifiant, nom)
* Gestion des visites (identifiant, date d’entrée, date de sortie, animal, vétérinaire)

Visualisation des statistiques :
* Nombre de visites en fonction du temps (Courbe)
* Nombre d’animaux en fonction du type d’animal (Histogramme)
* Temps moyen par visite (Nombre)
* Nombre moyen d’animaux par propriétaire (Nombre)
* Age moyen des animaux (Nombre)
* Heures supplémentaires des vétérinaires (Pourcentage)

Gestion des utilisateurs :
* Gestion des utilisateurs par l’administrateur
