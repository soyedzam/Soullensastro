// Genera public/sitemap.xml con <lastmod> REAL por página, sacado de git
// (fecha del último commit que tocó las fuentes de cada página).
//
// Uso: npm run sitemap   (correr cuando cambien páginas, antes de commitear;
//                         el sitemap generado se commitea como siempre)
//
// Por qué no @astrojs/sitemap: esa integración solo admite un lastmod global
// (= fecha de build para TODAS las páginas). Un lastmod que cambia sin que
// cambie el contenido hace que Google ignore la señal. Aquí cada página
// declara sus archivos fuente y el lastmod sale del historial real.
//
// BaseLayout.astro queda EXCLUIDO a propósito: es infraestructura compartida
// (GTM, pixel, fuentes); un cambio ahí no es "contenido nuevo" de las 14 páginas.

import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://soullensstudios.live';
const OUTPUT_FILE = join(ROOT, 'public', 'sitemap.xml');

// Header/footer componetizados de las 6 páginas interiores: son contenido
// visible de esas páginas, así que cuentan para su lastmod.
const INTERIOR_SHARED = ['src/components/SiteHeader.astro', 'src/components/SiteFooter.astro'];

// Orden de salida = orden de esta lista. `slug: ''` es el home.
// Páginas nuevas en src/pages/ que falten aquí entran al final con defaults.
const PAGES = [
  { slug: '', file: 'index', priority: '1.0', changefreq: 'weekly' },
  { slug: 'hub', priority: '0.9', changefreq: 'weekly' },
  { slug: 'soul-caps', priority: '0.9', changefreq: 'monthly', shared: INTERIOR_SHARED },
  { slug: 'films-de-marca', priority: '0.9', changefreq: 'monthly', shared: INTERIOR_SHARED },
  { slug: 'spots-ia', priority: '0.9', changefreq: 'monthly', shared: INTERIOR_SHARED },
  { slug: 'smart-pass', priority: '0.9', changefreq: 'monthly', shared: INTERIOR_SHARED },
  { slug: 'soul-story-kids', priority: '0.9', changefreq: 'monthly', shared: INTERIOR_SHARED },
  { slug: 'pulse', priority: '0.8', changefreq: 'monthly' },
  { slug: 'nosotros', priority: '0.7', changefreq: 'monthly', shared: INTERIOR_SHARED },
  { slug: 'navegador', priority: '0.6', changefreq: 'monthly' },
  { slug: 'aniversario', priority: '0.5', changefreq: 'yearly' },
  { slug: 'aviso-de-privacidad', priority: '0.3', changefreq: 'yearly' },
  { slug: 'terminos', priority: '0.3', changefreq: 'yearly' },
];

const EXCLUDED_PAGES = ['404'];
const DEFAULT_PRIORITY = '0.5';
const DEFAULT_CHANGEFREQ = 'monthly';

const git = (...args) =>
  execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();

const todayIso = () => new Date().toISOString().slice(0, 10);

// La fecha solo es confiable con historial completo (un clone shallow de CI
// daría la fecha del único commit visible para todo).
const assertFullGitHistory = () => {
  if (git('rev-parse', '--is-shallow-repository') === 'true') {
    throw new Error('Repo shallow: corre esto en el clone local completo, no en CI.');
  }
};

const sourcesFor = (page) => {
  const base = page.file ?? page.slug;
  return [`src/pages/${base}.astro`, `src/styles/pages/${base}.css`, ...(page.shared ?? [])];
};

const lastmodFor = (page) => {
  const sources = sourcesFor(page);
  // Cambios aún sin commitear cuentan como "hoy" (flujo: editar → sitemap → commit).
  if (git('status', '--porcelain', '--', ...sources) !== '') return todayIso();
  const committed = git('log', '-1', '--format=%cs', '--', ...sources);
  if (committed === '') {
    console.warn(`⚠️  Sin historial para /${page.slug || ''} — usando hoy.`);
    return todayIso();
  }
  return committed;
};

const discoverMissingPages = () => {
  const known = new Set(PAGES.map((p) => p.file ?? p.slug));
  return readdirSync(join(ROOT, 'src', 'pages'))
    .filter((f) => f.endsWith('.astro'))
    .map((f) => f.replace(/\.astro$/, ''))
    .filter((name) => !known.has(name) && !EXCLUDED_PAGES.includes(name))
    .map((slug) => {
      console.warn(`⚠️  Página nueva sin config: /${slug} — entra con defaults; asígnale priority/changefreq en PAGES.`);
      return { slug, priority: DEFAULT_PRIORITY, changefreq: DEFAULT_CHANGEFREQ };
    });
};

const urlEntry = (page) => `  <url>
    <loc>${SITE}/${page.slug}</loc>
    <lastmod>${lastmodFor(page)}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;

assertFullGitHistory();
const allPages = [...PAGES, ...discoverMissingPages()];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(urlEntry).join('\n')}
</urlset>
`;

writeFileSync(OUTPUT_FILE, xml);
console.log(`✅ sitemap.xml — ${allPages.length} URLs con lastmod real de git.`);
