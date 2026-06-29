/**
 * Generador de páginas Astro desde el bundle HTML original.
 * - CSS verbatim -> src/styles/pages/<name>.css (con CloudFront -> WebP local)
 * - Meta (title/desc/canonical/og/theme/robots) -> props de BaseLayout
 * - JSON-LD -> slot "head"
 * - Body (announce+header+main+closing+footer+scripts) verbatim, scripts is:inline
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { basename } from 'node:path';

const SRC = process.env.SRC;
const PAGES = process.env.PAGES;
const STYLES = process.env.STYLES;
const imgMap = JSON.parse(readFileSync(process.env.MAP, 'utf8'));
const SITE = 'https://soullensstudios.live';

const files = readdirSync(SRC).filter((f) => f.endsWith('.html'));

function rewriteImages(s) {
  for (const [url, local] of Object.entries(imgMap)) {
    s = s.split(url).join(local);
  }
  return s;
}
function pick(re, html, def = '') {
  const m = html.match(re);
  return m ? m[1].trim() : def;
}

const report = [];
for (const file of files) {
  const name = basename(file, '.html');
  const html = readFileSync(`${SRC}/${file}`, 'utf8');

  // --- meta ---
  const title = pick(/<title>([\s\S]*?)<\/title>/, html, 'Soul Lens Studios');
  const description = pick(/<meta\s+name="description"\s+content="([^"]*)"/i, html,
    'Soul Lens Studios — sistemas que hacen que tu negocio sea elegido. Mérida · Yucatán · LATAM.');
  const themeColor = pick(/<meta\s+name="theme-color"\s+content="([^"]*)"/i, html, '#0A0A0B');
  const robots = pick(/<meta\s+name="robots"\s+content="([^"]*)"/i, html, 'index,follow,max-image-preview:large');
  const ogImage = pick(/<meta\s+property="og:image"\s+content="([^"]*)"/i, html, `${SITE}/og-image.webp`);
  let canonical = pick(/<link\s+rel="canonical"\s+href="([^"]*)"/i, html, '');
  if (!canonical) canonical = name === 'index' ? `${SITE}/` : `${SITE}/${name}.html`;
  const ogType = pick(/<meta\s+property="og:type"\s+content="([^"]*)"/i, html, 'website');

  // --- css ---
  let css = pick(/<style>([\s\S]*?)<\/style>/i, html, '');
  css = rewriteImages(css);
  writeFileSync(`${STYLES}/${name}.css`, css);

  // --- json-ld ---
  const schema = (html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [])
    .map((s) => rewriteImages(s))
    .join('\n');

  // --- body ---
  let body = html.slice(html.indexOf('<body>') + 6, html.lastIndexOf('</body>'));
  // quitar lo que ahora vive en BaseLayout
  body = body.replace(/<!-- Google Tag Manager \(noscript\) -->[\s\S]*?<!-- End Google Tag Manager \(noscript\) -->/i, '');
  body = body.replace(/<noscript><iframe src="https:\/\/www\.googletagmanager\.com\/ns\.html[\s\S]*?<\/iframe><\/noscript>/i, '');
  body = body.replace(/<a class="skip"[^>]*>[\s\S]*?<\/a>/i, '');
  body = body.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
  // rewrite imágenes
  body = rewriteImages(body);
  // limpiar texto de instrucciones de desarrollo (no debe verse en producción/SEO)
  body = body.replace(/\s*·\s*pega el ID de YouTube/gi, '');
  body = body.replace(/Caso\s*·\s*reemplazar imagen/gi, 'Caso');
  body = body.replace(/\s*·\s*reemplazar imagen/gi, '');
  body = body.replace(/reemplazar imagen/gi, '');
  // scripts -> is:inline (para que handlers globales y vanilla JS funcionen sin bundling)
  body = body.replace(/<script(?![^>]*\bis:inline\b)([^>]*)>/gi, '<script is:inline$1>');
  body = body.trim();

  // --- emit .astro ---
  const out = `---
import BaseLayout from '../layouts/BaseLayout.astro';
import '../styles/pages/${name}.css';
---
<BaseLayout
  title={${JSON.stringify(title)}}
  description={${JSON.stringify(description)}}
  canonical={${JSON.stringify(canonical)}}
  ogImage={${JSON.stringify(ogImage)}}
  ogType={${JSON.stringify(ogType)}}
  themeColor={${JSON.stringify(themeColor)}}
  robots={${JSON.stringify(robots)}}>
${schema ? `  <Fragment slot="head" set:html={${JSON.stringify(schema)}} />\n` : ''}${body}
</BaseLayout>
`;
  writeFileSync(`${PAGES}/${name}.astro`, out);
  report.push(`${name.padEnd(24)} css:${String(css.length).padStart(6)}  body:${String(body.length).padStart(6)}  schema:${schema ? 'sí' : 'no'}  | ${title.slice(0, 50)}`);
}
console.log(report.join('\n'));
console.log(`\n${files.length} páginas generadas.`);
