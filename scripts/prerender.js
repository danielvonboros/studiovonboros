// Läuft am Ende von `npm run build`: schreibt für jede Route fertiges HTML nach dist/,
// damit Suchmaschinen und KI-Crawler (die oft kein JavaScript ausführen) den Inhalt sehen.
// Erzeugt außerdem 404.html und sitemap.xml.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');

const { render, routes, notFoundRoute, SITE_URL } = await import(
  pathToFileURL(path.join(serverDir, 'entry-server.js')).href
);

const template = fs
  .readFileSync(path.join(dist, 'index.html'), 'utf-8')
  .replace('</head>', `${fontPreloads()}</head>`);

for (const route of routes) {
  // "/impressum" -> impressum.html (Netlify liefert /impressum ohne Umleitung aus)
  write(route === '/' ? 'index.html' : `${route.slice(1)}.html`, await render(route, template));
}
write('404.html', await render(notFoundRoute, template));
write('sitemap.xml', sitemap());

fs.rmSync(serverDir, { recursive: true, force: true });
console.log(`✓ prerendered ${routes.length} routes + 404.html + sitemap.xml`);

function write(file, content) {
  const target = path.join(dist, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

// Die zwei Schriften, die über dem Falz gebraucht werden, früh laden.
function fontPreloads() {
  const assets = fs.readdirSync(path.join(dist, 'assets'));
  return [/^archivo-latin-wght-normal-.*\.woff2$/, /^instrument-serif-latin-400-normal-.*\.woff2$/]
    .map((pattern) => assets.find((file) => pattern.test(file)))
    .filter(Boolean)
    .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`)
    .join('');
}

function sitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((route) => `  <url><loc>${SITE_URL}${route}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
