# Organiz’ Party

Petit site web **HTML / CSS / JavaScript** (niveau débutant) : organisation du quotidien avec une interface ludique.

## Contenu du site

- **To-do du jour** — ajouter des tâches, les cocher (barrées) ou les supprimer (`createElement`, `appendChild`).
- **Compte à rebours** — choisir une date (vacances, examen, anniversaire…) et afficher le temps restant (`Date`, `setInterval`).
- **Budget du mois** — saisir des montants par catégorie (transport, loisirs, courses, autres) ; le total se met à jour en direct.

## Structure du projet

```
tasnym js/
├── index.html      — page principale
├── css/
│   └── style.css   — mise en page et style
├── js/
│   └── main.js     — interactions (menu, to-do, timer, budget)
└── README.md
```

## Lancer le site

1. Ouvre **`index.html`** dans ton navigateur (double-clic ou glisser-déposer dans Chrome / Firefox / Edge).
2. Pour les **photos** du bandeau (Unsplash) et la **police Fredoka** (Google Fonts), une connexion **Internet** est nécessaire.

## Git

Dépôt initialisé avec `git init`. Pour lier un dépôt distant (GitHub, etc.) :

```bash
git remote add origin URL_DE_TON_REPO.git
git add .
git commit -m "Premier commit — site Organiz Party"
git push -u origin main
```

*(Remplace `main` par `master` si ton dépôt utilise ce nom.)*

## Auteur

Projet scolaire — HTML, CSS & JavaScript.
