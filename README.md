# OSRS Dry Calculator

Calculates the chance of getting a drop in OSRS based on drop rate and kill count.

```
chance = 1 - ((rate - 1) / rate) ^ kills
```

## Run

```bash
npm install
npm run dev
```

Or use **Run dev server** in the Run and Debug panel.

## Deploy

```bash
npm run deploy
```

Run this from `master`. It builds the site and pushes it to the `gh-pages` branch, which is what GitHub Pages serves. You never need to check out `gh-pages` yourself.

First time only: in the repo's **Settings → Pages**, set the branch to `gh-pages`.
