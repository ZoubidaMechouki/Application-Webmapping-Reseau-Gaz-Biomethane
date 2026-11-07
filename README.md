<h1 align="center">Application Webmapping : sites d'injection de biométhane<br>(Leaflet &amp; JavaScript)</h1>

🌐 **Démo en ligne** : [Voir la carte](https://zoubidamechouki.github.io/Application-Webmapping-Reseau-Gaz-Biomethane/)

Ce travail s'inscrit dans le cadre d'un projet personnel de développement d'une application webmapping, visant à visualiser les sites d'injection de biométhane en France sur une carte interactive, à partir de données ouvertes.

*Mots-clés : SIG, webmapping, JavaScript, Leaflet, GeoJSON, open data, API Géo, GitHub Actions, Docker*

Points clés :

- **Carte interactive des sites d'injection** : visualisation de 864 sites de biométhane sur un fond OpenStreetMap, avec popups (projet, commune, capacité) et regroupement des marqueurs.
- **Traitement des données géospatiales** : le fichier source ne contient pas de géométrie, donc les sites sont localisés par jointure sur le code INSEE avec le centre des communes (API Géo).
- **Interface dynamique** : filtre par région, compteur de sites affichés et recadrage automatique de la carte.

**Résumé :**

🚀 **Fonctionnalités**

- Visualisation de 864 sites d'injection de biométhane sur une carte interactive
- Popups avec le nom du projet, la commune et la capacité de production
- Regroupement dynamique des marqueurs selon le niveau de zoom
- Filtre par région avec compteur et recadrage automatique de la carte
- Localisation automatisée des sites par jointure avec les communes (code INSEE)
- Contrôles automatiques du code et des données, puis déploiement de la démo à chaque mise à jour
- Exécution de l'application dans un conteneur Docker (nginx)

🔧 **Technologies utilisées**

- JavaScript (traitement des données, filtre et interactions)
- Leaflet (affichage de la carte interactive)
- Leaflet.markercluster (regroupement des marqueurs)
- GeoJSON (format des données des sites d'injection)
- API Géo (centres des communes pour localiser les sites)
- OpenStreetMap (fond de carte)
- GitHub Actions et GitHub Pages (contrôles automatiques et déploiement de la démo)
- Docker et nginx (exécution de l'application dans un conteneur)

<p align="center">
  <img src="docs/carte-france.jpg" alt="Carte des sites d'injection de biométhane en France" width="80%">
  <br>
  <strong><em>Figure 1</em></strong><em> – Carte des sites d'injection de biométhane en France</em>
</p>

<p align="center">
  <img src="docs/carte-ile-de-france.jpg" alt="Filtre par région : Île-de-France" width="80%">
  <br>
  <strong><em>Figure 2</em></strong><em> – Filtre par région : Île-de-France</em>
</p>

📊 **Sources des données**

- Sites d'injection de biométhane en France : GRDF, NaTran, Terega, SPEGNN, data.gouv.fr, Licence Ouverte 2.0 (mise à jour du 7 octobre 2026)
- Centres des communes : API Géo (geo.api.gouv.fr)
- Fond de carte : © OpenStreetMap contributors

▶️ **Lancer avec Docker**

```bash
docker build -t webmap-biomethane .
docker run -d -p 8080:80 --name webmap webmap-biomethane
```

L'application est alors disponible sur http://localhost:8080.

⚠️ **Limite** : les sites sont placés au centre de leur commune, et non à l'emplacement exact de l'installation.

Cette application fait partie d'un travail plus large sur le développement et la mise en production d'applications webmapping. Cette première version, centrée sur la visualisation et le filtrage des données en JavaScript, est accompagnée d'une chaîne d'automatisation (contrôles du code et déploiement avec GitHub Actions) et d'une exécution en conteneur Docker. Elle pourra être étendue et optimisée, notamment par l'enrichissement des filtres (type de site, capacité de production) et la représentation de la capacité par la taille des symboles.