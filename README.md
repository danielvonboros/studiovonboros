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

- `public/hero.webp` — quer, mindestens 2400px breit
- `public/projects/project-1.jpg` … `project-4.jpg` — Seitenverhältnis 4:3
- `public/og.jpg` — 1200 × 630px, für Social-Vorschauen

## Inhalte pflegen

- Projekte: `src/data/projects.ts`
- Texte (Hero, Studio, Leistungen, Über mich): `src/locales/de.json` und `en.json`
- Impressum & Datenschutz: `src/legal/*.html`
- Structured Data (Schema.org für Google & KI): `src/components/StructuredData.vue`
- Für KI-Assistenten: `public/llms.txt`, Crawler-Regeln: `public/robots.txt`

## Prerendering (SEO & KI-Sichtbarkeit)

`npm run build` erzeugt für jede Seite fertiges HTML (`scripts/prerender.js`),
damit Suchmaschinen und KI-Crawler den Inhalt ohne JavaScript lesen können.
Im Browser übernimmt Vue dieses HTML (Hydration) und läuft danach wie gewohnt.

- Welche Seiten vorgerendert werden: `routes` in `src/entry-server.ts`
  (Projekte kommen automatisch aus `projects.ts`).
- Neue Seite? Route in `src/router/index.ts` **und** in `routes` eintragen.
- `sitemap.xml` und `404.html` entstehen dabei automatisch.
- Code, der `window`, `document` oder `localStorage` braucht, gehört in
  `onMounted()` — beim Prerendering gibt es keinen Browser.

## IndexNow (Bing & Co. sofort informieren)

Nach einem Deploy mit neuen oder geänderten Seiten:

```bash
npm run indexnow
```

Das meldet alle URLs aus der Live-Sitemap an IndexNow. Bing speist u. a. die
ChatGPT-Suche. Der Schlüssel ist die Datei `public/<32 Hex-Zeichen>.txt` — nicht
löschen oder umbenennen.

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
