# OSRS Dry Calculator

Simple dry streak calculator. Rate is always **1 in X**, one roll per kill.

```
chance = 1 - ((rate - 1) / rate) ^ kills
```

## Dev

```bash
npm install
npm run dev
```

## GitHub Pages

```bash
npm run deploy
```

Then enable Pages from the `gh-pages` branch.
