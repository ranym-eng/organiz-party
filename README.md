# Organiz’ Party

A small **HTML / CSS / JavaScript** (beginner-level) site for everyday organization, with a playful UI.

## Live demo

**[https://ranym-eng.github.io/organiz-party/](https://ranym-eng.github.io/organiz-party/)**

Repository: [github.com/ranym-eng/organiz-party](https://github.com/ranym-eng/organiz-party)

## Features

- **Daily to-do** — add tasks, mark them done (strikethrough), or delete them (`createElement`, `appendChild`).
- **Countdown** — pick a date (holidays, exam, birthday…) and see the time left (`Date`, `setInterval`).
- **Monthly budget** — enter amounts per category (transport, leisure, groceries, other); the total updates live.

## Project structure

```
organiz-party/
├── index.html      — main page
├── css/
│   └── style.css   — layout and styling
├── js/
│   └── main.js     — interactions (menu, to-do, timer, budget)
└── README.md
```

## Run locally

1. Open **`index.html`** in your browser (double-click or drag into Chrome / Firefox / Edge).
2. **Internet** is required for hero **photos** (Unsplash) and the **Fredoka** font (Google Fonts).

## Git

```bash
git clone https://github.com/ranym-eng/organiz-party.git
cd organiz-party
```

To push updates:

```bash
git add .
git commit -m "Your message"
git push -u origin main
```

*(Use `master` instead of `main` if your remote uses that branch name.)*
