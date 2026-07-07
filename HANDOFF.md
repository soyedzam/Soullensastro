# 🤝 PASE / HANDOFF — Soul Lens Studios Web (Astro)
_Última actualización: 2026-07-07 · commit `d4f5338` · 22 commits_

Documento de traspaso para otra sesión de Claude Code. Léelo completo antes de tocar nada.

---

## 1. QUÉ ES Y EN QUÉ VAMOS

Migración del sitio **Soul Lens Studios** (productora audiovisual + IA, Mérida/LATAM) de un bundle HTML estático (`v4.1`) a un **proyecto Astro** desplegado en **Cloudflare Pages vía GitHub**. El sitio ya está **EN VIVO** y funcional; estamos puliéndolo con contenido real del cliente (videos, fotos, reseñas) y a punto de **conectar el dominio propio**.

**Estado:** production-ready. 14 páginas. Se itera por feedback del cliente (Ed/Val, fundadores).

---

## 2. UBICACIONES (CRÍTICO)

| Qué | Dónde |
|---|---|
| **Proyecto (código)** | `/Users/soyedzam/Developer/sls-astro/` ← **carpeta LOCAL, no sincronizada** |
| **Repo GitHub** | https://github.com/soyedzam/Soullensastro (branch `main`, **PÚBLICO**) |
| **Sitio EN VIVO** | https://soullensastro.pages.dev |
| **Dominio destino** | `soullensstudios.live` (en Hostinger, migración a Cloudflare pendiente) |
| **Respaldo zip** | `/Users/soyedzam/Developer/SLS-Web-Astro-Backup-<hash>.zip` |
| **Bundle original v4.1** | `Documents/2026/SLS Soul Lens Studio/Web SLS Soul Lens/SLS-Ecosistema-Deploy-v4.1-FINAL.zip` |

> ⚠️ El proyecto **se movió** desde `Documents/…/Web SLS Soul Lens/sls-astro` a `~/Developer/` porque Google Drive sincronizaba `Documents/` y **corrompía el proyecto** (copias-conflicto `archivo 2.astro` + borrado de archivos a media escritura). NO regreses el proyecto a Documents ni a ninguna carpeta de Drive/CloudStorage.

---

## 3. STACK Y ARQUITECTURA

- **Astro** `output: 'static'`, `build.format: 'file'`, `compressHTML`, `site: 'https://soullensstudios.live'`. Sin adapter (estático puro).
- **Deploy:** Cloudflare Pages, auto en cada push a `main`. Config: preset **Astro**, build `npm run build`, output `dist`, env `NODE_VERSION=20`.
- **`src/layouts/BaseLayout.astro`** centraliza: `<head>` (SEO por props, GTM, fuentes, favicons, **Meta Pixel único**, script global de poster de video lite-YouTube), y el shell del `<body>` (GTM noscript, skip link, `<slot/>`).
- **Cada página es self-contained:** su CSS en `src/styles/pages/<page>.css` (importado en frontmatter), su cuerpo verbatim, su JSON-LD vía `<Fragment slot="head">`. El header/footer/announce viven en cada página (no componentizados aún — fase 2 opcional).
- **14 páginas:** `index, soul-caps, films-de-marca, spots-ia, smart-pass, soul-story-kids, nosotros, pulse, navegador, aniversario, hub, aviso-de-privacidad, terminos, 404`.
- **Imágenes:** todas WebP. `public/img/` (locales), `public/img/portfolio/` (31 webp q75). Optimizar nuevas con `sharp` (~1200-1600px, q75-82).
- **URLs LIMPIAS** (sin `.html`) en canonicals, sitemap y enlaces internos. Cloudflare sirve `/soul-caps` y **redirige 308** las `.html`.
- **`scripts/gen-pages.mjs`** fue la herramienta de migración one-time. **NO la re-corras** — la fuente de verdad ahora es el proyecto Astro directamente.

---

## 4. DATOS CLAVE / CREDENCIALES

- **GTM:** `GTM-TLKNP8BJ` (contenedor único; configura GA4 DENTRO de GTM, no hardcodeado).
- **Meta Pixel:** `9289240721121438` (en BaseLayout: PageView + Contact en clics de WhatsApp). NO duplicar el pixel en GTM.
- **Webhook GHL (form Pulse, form-data):** `https://services.leadconnectorhq.com/hooks/Pk7lx6MEDetFV7K5y2nD/webhook-trigger/dcec687b-bd8c-4d16-884e-ebb4bf18b260`
- **Contacto:** WhatsApp `+52 1 56 4484 4928` · email **`hola@soullens.live`** (OJO: dominio del correo ≠ dominio del sitio `soullensstudios.live`).
- **Domicilio:** Calle 18 #298, Fracc. Monterreal, Mérida, Yucatán, C.P. 97133.
- **Redes:** `@soullensstudios` (Instagram/TikTok/Facebook/YouTube). **Google reseñas:** 5.0/22 · `https://share.google/QYAmgKn9vYrwC1oPn`.
- **Videos montados (YouTube IDs):**
  - Soul Caps: `tZB-48eSRhI` (Negocios con Marco), `slkz16cAsmA` (Propiedades Mérida)
  - Spots IA (6 shorts verticales): `nDiFW6rllyc` `V8x944uK_Zc` `zX94EHuRkDg` `LdDyfpuUoWI` `Suz2E1bF1ZM` `2Bm33zV8tvQ`
  - Soul Story Kids: `FSecJosrC8E` `zaNCdoc90c8` `J6hurTzODCQ`
  - Films: `w6RyfHWuCL8` (EAO), `RbhHfH2xbaY` (Sanado el Corazón)
  - Home "El trabajo habla": `tZB-48eSRhI`, `RbhHfH2xbaY`, `Bxk_HCdR40E`
  - Hub VSL: `tZB-48eSRhI` (STAND-IN, falta el VSL real)

---

## 5. LO HECHO (resumen)

- Migración 1:1 a Astro; imágenes CloudFront→WebP (269MB→~7MB).
- SEO: sitemap, robots pro-IA (GPTBot/ClaudeBot/etc.), JSON-LD por página con **rich snippets** de 3 reseñas reales, **URLs limpias**.
- Analítica GTM + Meta Pixel (deduplicado); form Pulse→GHL en form-data.
- Legal real (LFPDPPP + ARCO + RGPD), correo unificado a hola@soullens.live.
- Home rediseñado: servicios en grid (sin precio, "para qué es"), casos con métricas, 3 reseñas Google reales + rich snippets, WhatsApp con 3 testimonios inventados realistas (Andrea Cauich, Luis Fer Góngora, Mariana Peón), banda del **crew** completo, "El trabajo habla" con 3 portadas YouTube 16:9.
- Página **`/hub`** nueva (link-in-bio: VSL + servicios + redes + contacto).
- Videos de producto montados; ejemplos movidos ARRIBA de precios; cada video **dentro** de su tarjeta de ejemplo (no en fila aparte).
- Bugs de contraste/layout heredados corregidos (badge Google, burbujas WhatsApp, founder strip, variables CSS).
- Foto del crew en Nosotros + Home.

---

## 6. GOTCHAS CRÍTICOS (leer antes de tocar)

1. **Google Drive / copias-conflicto:** ya resuelto moviendo a `~/Developer`. Si aparecen archivos `* 2.astro` / `* 2.css`, son basura de sync → `find src -name "* 2.*" -delete`. NUNCA muevas el proyecto a Documents/Drive.
2. **`.html` → 308 → URL limpia** en Cloudflare. Para verificar en vivo usa `curl -sL` (con `-L`) o directo la URL limpia (`/soul-caps`, no `/soul-caps.html`). Canonicals/sitemap/enlaces YA usan limpias.
3. **WebFetch:** SÍ alcanza `soullensastro.pages.dev` (útil para verificar en vivo), pero **NO** alcanza `soullensstudios.live` ni Google/YouTube (red externa bloqueada en este entorno). Para YouTube usa los IDs directos.
4. **Preview local:** `npm run preview` sirve archivos `.html`; los enlaces internos limpios (`/soul-caps`) dan 404 en preview local pero funcionan en Cloudflare. **Verifica en vivo (pages.dev), no en local.** El `launch.json` del preview MCP se borraba (estaba en Drive); recréalo en la raíz de sesión si lo necesitas.
5. **Herramienta de screenshot** captura desde arriba y es poco fiable para secciones a media página; usa `preview_eval` / `curl` para verificar.
6. **Imágenes lazy** reportan `naturalWidth 0` en eval headless aunque estén bien; verifica con `fetch`/`new Image()` o curl.
7. **git es la red de seguridad** — todo commiteado/pusheado. Si algo local desaparece: `git restore <archivo>`.
8. **Video facade:** el poster lo pone el script global de BaseLayout (`.video-wrap[data-yt-id]` → `i.ytimg.com/.../hqdefault.jpg`), el click→iframe lo hace el facade por página. Las tarjetas de ejemplo usan `.caso-media.video-wrap` con `data-yt-id`. Para portadas 16:9 usa `maxresdefault` con fallback a `hqdefault` (algunos videos no tienen maxres → 404 o placeholder 120px).

---

## 7. FLUJO DE TRABAJO / DEPLOY

```bash
cd ~/Developer/sls-astro
npm run build                 # 14 páginas, debe salir limpio
# editar en src/pages/*.astro y src/styles/pages/*.css
git add -A && git commit -m "..." && git push origin main   # auto-deploy Cloudflare (~1-2 min)
# verificar EN VIVO:
curl -sL "https://soullensastro.pages.dev/<pagina-limpia>"
```
Commits: terminar mensajes con `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

Recibir imágenes del cliente: pide que las guarde en `~/Downloads` o en `public/img/<carpeta>/`, luego optimiza con `sharp` a WebP. (Las imágenes pegadas en el chat NO quedan en disco.)

---

## 8. PENDIENTES (próximos pasos accionables)

1. 🌐 **Conectar dominio `soullensstudios.live`** (ver §9 — EN CURSO, prioridad).
2. 🎬 **Marena · Video Mapping**: falta URL de YouTube; montar (posible línea Live Experience o caso destacado).
3. 🏷️ **Nombres reales de clientes de Spots IA** (hoy códigos REV/PLI/GRE/PM/MB en `spots-ia.astro` `.shorts-grid`).
4. 📹 **Demos de Smart Pass**: se quitaron las tarjetas de video vacías; remontar cuando lleguen.
5. 🎥 **VSL propio para `/hub`**: hoy usa `tZB-48eSRhI` (podcast de Marco) como stand-in; cambiar el `data-yt-id`.
6. 🖼️ **Imágenes reales de casos** faltantes: tarjetas ◎ "Próximamente" en la 3ª tarjeta de soul-caps (Maova) y films (sin video). El cliente cambió las fotos "caricaturescas" de Kids (galería borrada) — puede mandar nuevas.
7. 🧾 **Legal:** RFC pendiente (opcional). **GA4:** configurar dentro de GTM.
8. 🔗 (Opcional) Enlazar textos "Hub Intelligence" del sitio → `/hub`; componentizar header/footer (fase 2).

---

## 9. CONEXIÓN DE DOMINIO (EN CURSO — procedimiento)

**Contexto:** `soullensstudios.live` está en **Hostinger** y **TIENE correos** que **NO se mueven** (se quedan en Hostinger). Método: **mover los nameservers a Cloudflare** (necesario para el apex sin www) **preservando los registros de correo**.

**El cliente estaba atorado buscando el botón "Add a site"** en Cloudflare (UI 2026). Rutas: `dash.cloudflare.com` → botón azul **`+ Add`** → "Existing/Connect a domain"; o **Workers & Pages → pestaña "Domains" → "Add existing domain"**; o **Websites → "Add a site"**.

**Pasos con red de seguridad para el correo:**
1. **Paso 0:** captura del DNS actual de Hostinger (anotar MX `mx1/mx2.hostinger.com`, SPF, DKIM, DMARC).
2. **Cloudflare → Add a site** `soullensstudios.live` (Free) → deja que **escanee/importe** el DNS.
3. **PARAR y verificar** que los registros de **correo (MX + SPF + DKIM + DMARC)** estén importados, en **"DNS only" (nube gris, no naranja)**. Si falta alguno, agregarlo manual con los valores de Hostinger.
4. **Hostinger** → cambiar nameservers a los 2 de Cloudflare. Esperar activación.
5. **Prueba de correo** (mandar mail a un buzón @soullensstudios.live y confirmar que llega).
6. **Cloudflare Pages → proyecto Soullensastro → Custom domains** → agregar `soullensstudios.live` **y** `www.soullensstudios.live` (SSL automático).

> Claude NO puede acceder a Hostinger/Cloudflare del cliente ni gestionar DNS por MCP (la MCP de Cloudflare solo tiene docs/Workers/D1/KV/R2). Es guiado por Claude, ejecutado por el cliente. Pídele que pegue los registros DNS importados para verificar el correo antes de cambiar nameservers.

---

_Fin del pase. Cualquier duda de contexto: revisar `git log`, la memoria del proyecto (`sls-web-astro.md`), y este archivo._
