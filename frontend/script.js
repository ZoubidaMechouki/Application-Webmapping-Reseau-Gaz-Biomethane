/* 1. Créer la carte, centrée sur la France */
const map = L.map("map").setView([46.603354, 2.588334], 6);

/* 2. Ajouter le fond de carte OpenStreetMap */
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
  maxZoom: 19
}).addTo(map);

/* 3. Groupe de marqueurs (regroupement) */
const groupe = L.markerClusterGroup();
map.addLayer(groupe);

/* 4. Liste des sites placés sur la carte */
const sitesPlaces = [];

/* 5. Formater la capacité pour les popups */
function formaterCapacite(valeur) {
  if (typeof valeur !== "number") {
    return "capacité non renseignée";
  }
  return valeur.toFixed(1) + " GWh/an";
}

/* 6. Afficher les sites d'une région (tous si region est vide) */
function afficherSites(region) {
  groupe.clearLayers();

  let sitesAffiches = sitesPlaces;
  if (region !== "") {
    sitesAffiches = sitesPlaces.filter(site => site.proprietes.region === region);
  }

  for (const site of sitesAffiches) {
    const proprietes = site.proprietes;
    const marqueur = L.marker(site.position).bindPopup(
      `<b>${proprietes.nom_du_projet}</b><br>` +
      `${proprietes.commune} (${proprietes.departement})<br>` +
      `${formaterCapacite(proprietes.capacite_de_production_gwh_an)}`
    );
    groupe.addLayer(marqueur);
  }

  console.log("Sites affichés :", sitesAffiches.length);
}

/* 7. Charger les données et préparer la page */
async function chargerSites() {
  /* Charger les deux fichiers */
  const reponseSites = await fetch("data/sites-injection-biomethane.geojson");
  const donneesSites = await reponseSites.json();

  const reponseCommunes = await fetch("data/communes-centres.json");
  const communes = await reponseCommunes.json();

  /* Remplir la liste déroulante des régions */
  const regions = [...new Set(donneesSites.features.map(site => site.properties.region))]
    .filter(region => region)
    .sort((a, b) => a.localeCompare(b, "fr"));

  const liste = document.getElementById("filtre-region");
  for (const region of regions) {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    liste.appendChild(option);
  }

  /* Dictionnaire : code INSEE -> [latitude, longitude] */
  const centres = {};
  for (const commune of communes) {
    if (commune.centre) {
      const longitude = commune.centre.coordinates[0];
      const latitude = commune.centre.coordinates[1];
      centres[commune.code] = [latitude, longitude];
    }
  }

  /* Corrections : sites dont le code commune est absent du fichier */
  const corrections = {
    "STEP DE SORMIOU - MARSEILLE -13": "13055"
  };

  /* Associer chaque site à sa position */
  const sitesNonPlaces = [];

  for (const site of donneesSites.features) {
    const proprietes = site.properties;
    const code = proprietes.code_commune || corrections[proprietes.nom_du_projet];
    const position = centres[code];

    if (position) {
      sitesPlaces.push({ proprietes: proprietes, position: position });
    } else {
      sitesNonPlaces.push(proprietes);
    }
  }

  console.log("Sites placés :", sitesPlaces.length);
  console.log("Sites non placés :", sitesNonPlaces);

  /* Afficher tous les sites, puis réagir au choix de la liste */
  afficherSites("");

  liste.addEventListener("change", () => {
    afficherSites(liste.value);
  });
}

chargerSites();