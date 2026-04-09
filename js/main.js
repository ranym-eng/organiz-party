// ----- Menu mobile (CSS + JS) -----
var menuBtn = document.getElementById("menuBtn");
var siteNav = document.getElementById("siteNav");

if (menuBtn && siteNav) {
  menuBtn.addEventListener("click", function () {
    siteNav.classList.toggle("is-open");
  });

  var liensNav = siteNav.querySelectorAll("a");
  for (var n = 0; n < liensNav.length; n++) {
    liensNav[n].addEventListener("click", function () {
      siteNav.classList.remove("is-open");
    });
  }
}

// ----- To-do : createElement, appendChild, removeChild -----
var texteTache = document.getElementById("texteTache");
var btnAjouter = document.getElementById("btnAjouter");
var listeTaches = document.getElementById("listeTaches");

function ajouterTache() {
  var texte = texteTache.value.trim();
  if (texte === "") return;

  var li = document.createElement("li");

  var caseCoche = document.createElement("input");
  caseCoche.type = "checkbox";

  var span = document.createElement("span");
  span.className = "task-text";
  span.textContent = texte;

  var btnSuppr = document.createElement("button");
  btnSuppr.type = "button";
  btnSuppr.className = "btn-small";
  btnSuppr.textContent = "Supprimer";

  caseCoche.addEventListener("change", function () {
    if (caseCoche.checked) {
      span.classList.add("tache-faite");
    } else {
      span.classList.remove("tache-faite");
    }
  });

  btnSuppr.addEventListener("click", function () {
    listeTaches.removeChild(li);
  });

  li.appendChild(caseCoche);
  li.appendChild(span);
  li.appendChild(btnSuppr);
  listeTaches.appendChild(li);

  texteTache.value = "";
}

btnAjouter.addEventListener("click", ajouterTache);

if (texteTache) {
  texteTache.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      ajouterTache();
    }
  });
}

// ----- Compte à rebours : Date, setInterval -----
var dateCible = document.getElementById("dateCible");
var afficheCompte = document.getElementById("afficheCompte");
var timerId = null;

function mettreAJourCompte() {
  if (!dateCible.value) {
    afficheCompte.textContent = "Choisis une date.";
    return;
  }

  var fin = new Date(dateCible.value + "T23:59:59");
  var maintenant = new Date();
  var reste = fin.getTime() - maintenant.getTime();

  if (reste <= 0) {
    afficheCompte.textContent = "C'est le jour J !";
    return;
  }

  var secondes = Math.floor(reste / 1000);
  var j = Math.floor(secondes / 86400);
  secondes = secondes % 86400;
  var h = Math.floor(secondes / 3600);
  secondes = secondes % 3600;
  var m = Math.floor(secondes / 60);
  var s = secondes % 60;

  afficheCompte.textContent =
    j + " j · " + h + " h · " + m + " min · " + s + " s";
}

function demarrerCompte() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
  if (!dateCible.value) {
    afficheCompte.textContent = "Choisis une date.";
    return;
  }
  mettreAJourCompte();
  timerId = setInterval(mettreAJourCompte, 1000);
}

if (dateCible) {
  dateCible.addEventListener("change", demarrerCompte);
}

// ----- Budget : total en direct -----
var budgetTransport = document.getElementById("budgetTransport");
var budgetLoisirs = document.getElementById("budgetLoisirs");
var budgetCourses = document.getElementById("budgetCourses");
var budgetAutres = document.getElementById("budgetAutres");
var totalBudget = document.getElementById("totalBudget");

function calculerTotal() {
  var t = parseFloat(budgetTransport.value) || 0;
  var l = parseFloat(budgetLoisirs.value) || 0;
  var c = parseFloat(budgetCourses.value) || 0;
  var a = parseFloat(budgetAutres.value) || 0;
  var somme = t + l + c + a;
  totalBudget.textContent = somme.toFixed(2).replace(".", ",");
}

if (budgetTransport) {
  budgetTransport.addEventListener("input", calculerTotal);
  budgetLoisirs.addEventListener("input", calculerTotal);
  budgetCourses.addEventListener("input", calculerTotal);
  budgetAutres.addEventListener("input", calculerTotal);
}
