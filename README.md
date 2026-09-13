# Studio von Boros — Vue 3 + TypeScript + Tailwind v4 + Netlify

Editorialer, bildgeführter One-Pager im Blå-Station-Stil, in der CI
„Kalk und Espresso".

## Schnellstart

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # erzeugt dist/ — das deployed Netlify
npm run typecheck  # nur Typen prüfen, ohne Build
```

## Bilder ersetzen

In `public/` liegen Platzhalter. Ersetze sie durch echte Dateien
mit denselben Namen:

- `public/hero.jpg` — quer, mindestens 2400px breit
- `public/projects/project-1.jpg` … `project-4.jpg` — Seitenverhältnis 4:3
- `public/og.jpg` — 1200 × 630px, für Social-Vorschauen

## Inhalte pflegen

- Projekte: `src/data/projects.ts`
- Studio-Text: `src/App.vue`
- Hero-Text: Defaults in `src/components/HeroSection.vue`

## Farben

Alle Markenfarben stehen in `src/style.css` im `@theme`-Block.
Jeder Eintrag erzeugt automatisch Tailwind-Klassen:

| Token | Hex | Klassen |
|---|---|---|
| `--color-kalk` | `#EFE8DC` | `bg-kalk`, `text-kalk` |
| `--color-kalk-line` | `#DED5C8` | `border-kalk-line` |
| `--color-espresso` | `#2A2420` | `bg-espresso`, `text-espresso` |
| `--color-espresso-soft` | `#4A413A` | `text-espresso-soft` |
| `--color-messing` | `#B08D57` | `text-messing` |
| `--color-ton` | `#9E5E3C` | `text-ton` |
| `--color-olive` | `#6F6B52` | `text-olive` |
| `--color-oxblood` | `#5F3138` | `text-oxblood` |

Das ist **Tailwind v4** — es gibt kein `tailwind.config.js` mehr.
Die Konfiguration lebt im CSS.

## Schriften

Instrument Serif (Display) und Archivo (Fließtext) kommen als
npm-Pakete und werden mitgebaut. Es geht **kein** Request an
fonts.googleapis.com — DSGVO-seitig sauber und schneller.

## Deployment

**Empfohlen: Netlify baut selbst.**

1. Repo zu GitHub pushen.
2. Netlify → Add new site → Import an existing project → Repo wählen.
3. Netlify liest `netlify.toml` (Build `npm run build`, Ordner `dist`).

`.github/workflows/ci.yml` läuft dann parallel als reine Qualitätsprüfung
(Typecheck + Build) auf jeden Push und Pull Request.

**Alternative: GitHub Actions deployed.**

Nur wenn du die Netlify-Git-Integration abschaltest — sonst baut jeder
Commit doppelt. Dafür `.github/workflows/deploy.yml` aktivieren und in
GitHub unter Settings → Secrets and variables → Actions anlegen:

- `NETLIFY_AUTH_TOKEN` (Netlify → User settings → Applications → Personal access token)
- `NETLIFY_SITE_ID` (Netlify → Site configuration → Site ID)

## React → Vue Spickzettel

| React | Vue 3 (`<script setup>`) |
|---|---|
| `useState` | `ref()` — im Script mit `.value`, im Template direkt |
| `useMemo` | `computed()` |
| `useEffect(fn, [dep])` | `watch(dep, fn)` |
| `useEffect(fn, [])` | `onMounted()`, Cleanup → `onUnmounted()` |
| eigener Hook | Composable (`useX…`-Funktion) |
| `props` | `defineProps<{…}>()` |
| `onClick={…}` | `@click="…"` |
| `className={x}` / `src={x}` | `:class="x"` / `:src="x"` |
| `{list.map(…)}` | `v-for="item in list" :key="…"` |
| `{cond && <X/>}` | `v-if="cond"` |

Einstiegsreihenfolge zum Lesen: `SiteHeader.vue` (State, Klick, Liste,
Bedingung auf engem Raum), dann `FeatureBlock.vue` (Props), zuletzt
`useScrollReveal.ts` (Composable).
