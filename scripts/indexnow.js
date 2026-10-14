import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = 'https://studiovonboros.com'

// Der Schlüssel ist der Dateiname der Key-Datei in public/ (32 Hex-Zeichen + .txt).
const publicDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    'public'
)
const keyFile = fs
    .readdirSync(publicDir)
    .find((file) => /^[0-9a-f]{32}\.txt$/.test(file))
if (!keyFile) throw new Error('Keine IndexNow-Key-Datei in public/ gefunden.')
const key = keyFile.replace('.txt', '')
const keyLocation = `${SITE}/${keyFile}`

const liveKey = await fetch(keyLocation).then((res) =>
    res.ok ? res.text() : ''
)
if (liveKey.trim() !== key) {
    console.error(
        `Key-Datei ist noch nicht live (${keyLocation}). Erst deployen, dann erneut ausführen.`
    )
    process.exit(1)
}

const sitemap = await fetch(`${SITE}/sitemap.xml`).then((res) => res.text())
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1]
)

const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
        host: new URL(SITE).host,
        key,
        keyLocation,
        urlList,
    }),
})

console.log(
    `IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URLs gemeldet`
)
if (!res.ok) process.exit(1)
