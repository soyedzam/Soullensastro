# 🤝 PASE / HANDOFF — Soul Lens Studios Web (Astro)
_Última actualización: 2026-07-09 · dominio EN VIVO en soullensstudios.live_

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
- **Cada página es self-contained:** su CSS en `src/styles/pages/<page>.css` (importado en frontmatter), su cuerpo verbatim, su JSON-LD vía `<Fragment slot="head">`. El header/footer/announce de las **6 páginas interiores** (soul-caps, films-de-marca, spots-ia, smart-pass, soul-story-kids, nosotros) están componentizados en `src/components/SiteHeader.astro` (props `announce` HTML + `current` para `aria-current`) y `SiteFooter.astro` (sin props). **Index** mantiene header/footer propios (variante distinta: 8 enlaces, Pulse™, otra línea legal). Las páginas especiales (hub/aniversario/navegador/pulse/legales/404) tienen headers propios.
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
8. 🔗 ✅ **`/hub` enlazada** discretamente desde la barra legal del footer (`… Términos · Hub`) en las 7 páginas de contenido (commit `4b58a35`) — ya no está huérfana. Nota: la idea previa de enlazar el texto "Hub Intelligence" → `/hub` se **descartó** (mismatch: "Hub Intelligence" es una línea de servicio "Próximamente", no la landing link-in-bio). ✅ **Fase 2 hecha:** header/footer de las 6 interiores componentizados (`SiteHeader`/`SiteFooter`, commit `00e3ab9`). Verificado: `dist` byte-idéntico antes/después en las 14 páginas (cero cambio de output). Editar nav/footer interior = ahora 1 archivo.

> **Confirmado por el cliente (2026-07-07):** las reseñas del hub (**Marcela Ramírez**, **Jorge González**) y **todas** las marcas del carrusel del hub (Viceroy, Cipriani, Thompson, Wayil, Marena, Urbana, Grupo Copri, Etana) son **clientes reales** → NO volver a marcarlas como falsas ni removerlas. El único stand-in real del hub es el VSL (§8.5).

> **`/hub` — Guardar contacto (2026-07-07, commit `56fc7fa`):** botón primario que descarga `public/soul-lens.vcf` (vCard 3.0, logo embebido en base64, **SIN dirección** por decisión del cliente). Cloudflare lo sirve como `text/x-vcard` → iPhone (Safari) y Android (Chrome) lo agregan nativo. Datos: tel `+5215644844928`, email `hola@soullens.live`, URL `soullensstudios.live`, redes como X-SOCIALPROFILE. Si cambia algún dato, regenerar el `.vcf` (script en `git log` de ese commit). Pulse pasó a botón secundario (ghost). **Falta que el cliente lo pruebe en su teléfono.** Idea aprobada pero no ejecutada: reordenar redes arriba + versión "tarjeta corta" (quitar carrusel/reseñas) — se dejó completo para no borrar contenido confirmado.

---

## 9. CONEXIÓN DE DOMINIO (EN CURSO — procedimiento)

> 🚨 **CORRECCIÓN (2026-07-09): la premisa original de esta sección era FALSA.**
> `soullensstudios.live` **NO tiene correo**. Verificado con `dig` contra `1.1.1.1` y `8.8.8.8`, y confirmado dos veces por el propio Cloudflare: **cero MX, cero SPF, cero DKIM, cero DMARC**. Sin MX es imposible recibir correo ahí.
> El correo `hola@soullens.live` vive en **`soullens.live`**, que es **OTRO dominio** (también en Hostinger, con `MX mx1/mx2.hostinger.com`, SPF, DMARC y DKIM `hostingermail-a/b/c`).
> ⚠️ **Regla de oro: NUNCA tocar `soullens.live`.** Migrar `soullensstudios.live` **no tiene ningún riesgo para el correo.**

**Contexto:** `soullensstudios.live` está en **Hostinger** (registro) y servía el **sitio viejo** desde ahí. Método: **mover los nameservers a Cloudflare** (necesario para el apex sin www).

### Estado al 2026-07-09 (ejecutado por Claude vía navegador)

| Paso | Estado |
|---|---|
| Zona `soullensstudios.live` en Cloudflare | ✅ Creada, plan **Free** |
| Políticas IA (Search/Agent/Training) | ✅ Las 3 en **Allow** |
| "Block training in robots.txt" | ✅ **OFF** (respeta el `robots.txt` pro-IA del sitio) |
| DNS importado | ✅ 6 registros: A apex `148.135.128.243` + `147.79.120.148`, 2× AAAA, CNAME `www`→`cdn.hstgr.net`, A `ftp`→`213.190.5.244` |
| `ftp` | ✅ Cambiado a **DNS only** (venía Proxied; el proxy es HTTP-only y habría roto FTP) |
| Nameservers en Hostinger | ✅ Cambiados a `poppy.ns.cloudflare.com` / `rajeev.ns.cloudflare.com` |
| Propagación en el registro `.live` | ✅ Propagó |
| Custom domains en Pages (`soullensastro`) | ✅ apex + `www` activos; Cloudflare borró sola los A/AAAA/CNAME viejos |
| Registros finales en la zona | ✅ 3: `CNAME @`→`soullensastro.pages.dev` (Proxied), `CNAME www`→ idem (Proxied), `A ftp`→`213.190.5.244` (DNS only) |
| SSL | ✅ Emitido (Google Trust Services, hasta 2026-10-07) |
| Redirect `www` → apex | ✅ Regla 301 con **preserve query string** (los UTM sobreviven → atribución de pauta intacta) |
| `http://` → `https://` | ✅ 301 en apex y www |
| Renovación automática en Hostinger | ✅ **Activada** |

**🎉 EL SITIO ESTÁ EN VIVO EN https://soullensstudios.live** (13 páginas 200, URLs limpias, `.html`→limpia, 404 correcto, `/soul-lens.vcf` OK).

### SEO / GEO / LLMO — hecho el 2026-07-09 (commit `e07a71b`)
- `robots.txt`: agregado **ClaudeBot** (el crawler actual de Anthropic; `Claude-Web`/`anthropic-ai` son legacy), **OAI-SearchBot** (ChatGPT Search), **Google-Extended** (Gemini), **Applebot-Extended**, `Claude-SearchBot`, `Claude-User`, `Perplexity-User`, `DuckAssistBot`, `MistralAI-User`, `meta-externalfetcher`, `Bingbot`.
- Quitado `Sitemap: /llms.txt` (llms.txt **no es un sitemap**; Search Console lo marcaría como error). Quitado `Crawl-delay: 1` (solo frenaba a Bing).
- `sitemap.xml`: `lastmod` real en las 8 páginas modificadas.
- Headers de seguridad ya venían en `public/_headers`: HSTS(preload), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- `/llms.txt` ya existía y es muy bueno (servicios, precios, clientes, diferenciadores).

### ⚠️ Pendiente que necesita decisión del cliente
**Inconsistencia de precios:** `/llms.txt` publica precios en **MXN** (Soul Caps Voice $2,990–3,990 MXN) mientras el **JSON-LD** de las páginas publica **USD** (Voice $249 USD). Google y los LLMs leen ambos y se contradicen. Hay que unificar.

### Pendiente para pautar
- Verificar el dominio en **Meta Business** (pedir el código y meterlo como meta-tag en `BaseLayout.astro` → aplica a las 14 páginas).
- Configurar **GA4 dentro de GTM** (`GTM-TLKNP8BJ` ya está puesto).
- Dar de alta el sitio en **Google Search Console** + enviar `https://soullensstudios.live/sitemap.xml`.
- (Opcional) Migrar a `@astrojs/sitemap` para que `lastmod` se genere solo y no se vuelva a quedar viejo.

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
