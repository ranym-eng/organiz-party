/**
 * Organiz' Party — 4 classes, un fichier ; chaque page n'active que les modules présents dans le HTML.
 */

// --- Classe 1 : menu burger (mobile) ---
class MenuMobile {
  // idBouton / idMenu = attributs id dans le HTML (ex. "menuBtn", "siteNav")
  constructor(idBouton, idMenu) {
    // Récupère le bouton ☰
    this.bouton = document.getElementById(idBouton);
    // Récupère le <nav> du menu
    this.menu = document.getElementById(idMenu);
    // Si un des deux manque, on quitte (pas d'erreur sur une page sans menu)
    if (!this.bouton || !this.menu) return;

    // Clic sur le bouton → ouvre ou ferme le menu (toggle CSS "is-open")
    this.bouton.addEventListener("click", () => this.basculer());
    // Pour chaque lien du menu : au clic, on ferme le menu (flèche => garde le bon "this")
    this.menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => this.fermer()));
  }

  // Ajoute/enlève la classe "is-open" sur le nav
  basculer() {
    this.menu.classList.toggle("is-open");
  }

  // Ferme toujours le menu
  fermer() {
    this.menu.classList.remove("is-open");
  }
}

// --- Classe 2 : liste de tâches ---
class AppliTodo {
  constructor() {
    // Liens avec les id du fichier todo.html
    this.champTexte = document.getElementById("texteTache");
    this.boutonAjouter = document.getElementById("btnAjouter");
    this.liste = document.getElementById("listeTaches");
    // Pas les trois ? On n'enregistre aucun événement
    if (!this.champTexte || !this.boutonAjouter || !this.liste) return;

    // Clic sur "Zou ✨"
    this.boutonAjouter.addEventListener("click", () => this.ajouterUneTache());
    // Touche enfoncée dans le champ texte
    this.champTexte.addEventListener("keydown", (e) => {
      // Entrée = même action que le bouton
      if (e.key === "Enter") this.ajouterUneTache();
    });
  }

  ajouterUneTache() {
    // Texte saisi, sans espaces inutiles aux bords
    var texte = this.champTexte.value.trim();
    // Chaîne vide → on ne fait rien
    if (!texte) return;

    // Nouvelle ligne de liste (encore vide)
    var ligne = document.createElement("li");
    // Case à cocher
    var caseACocher = document.createElement("input");
    caseACocher.type = "checkbox";
    // Texte de la tâche
    var libelle = document.createElement("span");
    libelle.className = "task-text";
    libelle.textContent = texte;
    // Bouton supprimer
    var boutonSupprimer = document.createElement("button");
    boutonSupprimer.type = "button";
    boutonSupprimer.className = "btn-small";
    boutonSupprimer.textContent = "Supprimer";

    // Coché → ajoute la classe "tache-faite" ; décoché → l'enlève (2e arg = forcé)
    caseACocher.addEventListener("change", () => libelle.classList.toggle("tache-faite", caseACocher.checked));
    // Enlève cette <li> de la liste
    boutonSupprimer.addEventListener("click", () => this.liste.removeChild(ligne));

    // Place case, texte et bouton dans la ligne (ordre d'affichage)
    ligne.append(caseACocher, libelle, boutonSupprimer);
    // Affiche la ligne dans le <ul>
    this.liste.appendChild(ligne);
    // Réinitialise le champ pour la prochaine tâche
    this.champTexte.value = "";
  }
}

// --- Classe 3 : compte à rebours jusqu'à une date ---
class AppliCompteARebours {
  constructor() {
    // Input type="date" et la div qui affiche le texte
    this.champDate = document.getElementById("dateCible");
    this.zoneAffichage = document.getElementById("afficheCompte");
    // Plus tard : numéro retourné par setInterval (pour clearInterval)
    this.idTimer = null;
    if (!this.champDate || !this.zoneAffichage) return;

    // L'utilisateur change la date → on (re)lance le compteur
    this.champDate.addEventListener("change", () => this.demarrer());
  }

  mettreAJourLaffichage() {
    // Aucune date choisie
    if (!this.champDate.value) {
      this.zoneAffichage.textContent = "Choisis une date.";
      return;
    }
    // Fin de la journée cible (23:59:59)
    var fin = new Date(this.champDate.value + "T23:59:59");
    // Temps restant en millisecondes (Date.now() = maintenant)
    var resteMs = fin.getTime() - Date.now();
    // Date passée ou égalée
    if (resteMs <= 0) {
      this.zoneAffichage.textContent = "C'est le jour J !";
      return;
    }
    // Passage ms → secondes entières
    var s = Math.floor(resteMs / 1000);
    // Découpage j / h / min / s (86400 = 24×3600)
    var j = Math.floor(s / 86400);
    s %= 86400;
    var h = Math.floor(s / 3600);
    s %= 3600;
    var m = Math.floor(s / 60);
    var sec = s % 60;
    // Une seule chaîne affichée
    this.zoneAffichage.textContent = j + " j · " + h + " h · " + m + " min · " + sec + " s";
  }

  demarrer() {
    // Stoppe l'ancien intervalle s'il existait (évite plusieurs timers)
    clearInterval(this.idTimer);
    this.idTimer = null;
    if (!this.champDate.value) {
      this.zoneAffichage.textContent = "Choisis une date.";
      return;
    }
    // Affichage immédiat
    this.mettreAJourLaffichage();
    // Puis rappel toutes les 1000 ms = 1 seconde
    this.idTimer = setInterval(() => this.mettreAJourLaffichage(), 1000);
  }
}

// --- Classe 4 : somme des montants budget ---
class AppliBudget {
  constructor() {
    // Élément qui affiche le total
    this.total = document.getElementById("totalBudget");
    // On vérifie qu'on est bien sur la page budget (transport + total obligatoires)
    if (!document.getElementById("budgetTransport") || !this.total) return;

    // Tableau des 4 id → tableau des vrais éléments DOM ; filter(Boolean) enlève les null
    this.champs = ["budgetTransport", "budgetLoisirs", "budgetCourses", "budgetAutres"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    // Chaque champ : dès qu'on tape (input), on recalcule le total
    this.champs.forEach((el) => el.addEventListener("input", () => this.calculerLeTotal()));
  }

  calculerLeTotal() {
    // reduce : parcourt chaque input, acc = cumul, el = champ courant ; départ 0
    var somme = this.champs.reduce((acc, el) => {
      var n = parseFloat(el.value);
      // Si pas un nombre (vide, etc.) → on ajoute 0
      return acc + (isNaN(n) ? 0 : n);
    }, 0);
    // 2 décimales, virgule française
    this.total.textContent = somme.toFixed(2).replace(".", ",");
  }
}

// Lance les bons objets selon ce qui est dans la page HTML
function demarrerLesModules() {
  // Présent sur toutes les pages avec header
  new MenuMobile("menuBtn", "siteNav");
  // Si le <ul> des tâches existe → page todo
  if (document.getElementById("listeTaches")) new AppliTodo();
  // Si le champ date existe → page compte
  if (document.getElementById("dateCible")) new AppliCompteARebours();
  // Si le budget transport existe → page budget
  if (document.getElementById("budgetTransport")) new AppliBudget();
}

// Si le HTML n'est pas fini de charger, on attend ; sinon on exécute tout de suite
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", demarrerLesModules);
} else {
  demarrerLesModules();
}
