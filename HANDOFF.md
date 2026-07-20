# 🤝 PASE / HANDOFF — Soul Lens Studios Web (Astro)
_Última actualización: 2026-07-10 · dominio EN VIVO · commit `dd58d29` · 44 commits_

> **Nota caché (2026-07-09):** si alguien reporta "veo el sitio viejo" en `soullensstudios.live`, es **caché del navegador/DNS del cliente**, NO el servidor. Verificado: el origen devuelve el sitio nuevo en 16/16 peticiones; pestaña nueva y limpia carga el sitio nuevo (9 Offers MXN, og-image.png, 0 USD, 0 service workers). Solución para el cliente: recarga forzada (⌘⇧R), incógnito, o flush DNS (`sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`).

Documento de traspaso para otra sesión de Claude Code. Léelo completo antes de tocar nada.

---

## 1. QUÉ ES Y EN QUÉ VAMOS

Migración del sitio **Soul Lens Studios** (productora audiovisual + IA, Mérida/LATAM) de un bundle HTML estático (`v4.1`) a un **proyecto Astro** desplegado en **Cloudflare Pages vía GitHub**. El sitio está **EN VIVO en su dominio propio** desde el 2026-07-09: **https://soullensstudios.live**. Se sigue puliendo con contenido real del cliente (videos, fotos, reseñas).

**Estado:** production-ready. 14 páginas. Se itera por feedback del cliente (Ed/Val, fundadores).

---

## 2. UBICACIONES (CRÍTICO)

| Qué | Dónde |
|---|---|
| **Proyecto (código)** | `/Users/soyedzam/Developer/sls-astro/` ← **carpeta LOCAL, no sincronizada** |
| **Repo GitHub** | https://github.com/soyedzam/Soullensastro (branch `main`, **PÚBLICO**) |
| **Sitio EN VIVO** | **https://soullensstudios.live** ✅ (el `soullensastro.pages.dev` sigue activo como origen de Pages) |
| **Dominio** | `soullensstudios.live` — registro en Hostinger, **DNS en Cloudflare** (NS `poppy`/`rajeev`). ⚠️ `soullens.live` es OTRO dominio (el del correo): **no tocar** |
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

- **GTM:** `GTM-TLKNP8BJ` (contenedor único). ✅ **GA4 ya vive DENTRO de GTM: `G-Y0PV6X70P3`** — verificado disparando en vivo el 2026-07-10 (`google_tag_manager` registra contenedor + G- en la carga; dataLayer completa `gtm.js→dom→load` + `scrollDepth`). NO hardcodear GA4 en el sitio.
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
8. **"No me deja reproducir el video / me pide iniciar sesión":** primero **diagnostica el video**, no el sitio:
   ```
   curl -s "https://www.youtube.com/watch?v=<ID>" | grep -o '"playabilityStatus":{"status":"[A-Z_]*"' | head -1
   ```
   - Devuelve `OK` → el video está bien; si un visitante concreto ve el aviso, es la verificación anti-bot de YouTube (su red/navegador: VPN, datos móviles, Safari con bloqueo de rastreo). El sitio no puede detectarlo (iframe cross-origin); ya hay enlace de escape al reproducir.
   - Devuelve **`LOGIN_REQUIRED`** → el video tiene **restricción de edad** en YouTube y **NO se puede embeber en ningún sitio** (política de YouTube, ningún parámetro lo evita). Pasó con **Kids Ejemplo 2 (`zaNCdoc90c8`)** el 2026-07-17.
     - **Parche del sitio (ya aplicado):** marcar el contenedor con `data-yt-external` → el clic abre YouTube y aparece "Ver en YouTube ↗" desde la carga, en vez de un reproductor con error. Es global (BaseLayout), sirve en cualquier página.
     - **Cura real (la hace el cliente en YouTube Studio):** Contenido → el video → Editar → Restricciones/Público → quitar "Restricción de edad (+18)"; si la puso YouTube automáticamente, apelar. **Urgente también por alcance:** un video con esa marca no sale en recomendaciones ni lo ve nadie sin sesión.
     - Al levantarla: verificar que el curl dé `OK`, **quitar `data-yt-external`**, build + push → vuelve a reproducirse dentro del sitio.
   - Auditar TODOS los videos de golpe (14 hoy, 13 en OK): ver el comando en el commit `83d0686`.
   - (`curl` SÍ alcanza YouTube desde este entorno aunque WebFetch no.)
   YouTube muestra dentro del reproductor *"Accede a tu cuenta · Esto ayuda a proteger a la
   comunidad"* como verificación **anti-bot**, y depende de la red/navegador/IP del visitante
   (VPN, algunos datos móviles, Safari con bloqueo de rastreo, modo privado). El sitio no puede
   detectarlo: el iframe es de otro dominio. Antes de tocar nada, **verifica el video**:
   `curl -s "https://www.youtube.com/watch?v=<ID>" | grep -o '"playableInEmbed":[a-z]*\|"status":"[A-Z_]*"' | head -2`
   → si sale `OK` + `true`, el video está bien y no hay bug que arreglar. Mitigación ya activa:
   el **enlace de escape** (BaseLayout, MutationObserver global) le da salida al visitante hacia la app de YouTube, donde
   siempre trae sesión. (Nota: `curl` SÍ alcanza YouTube desde este entorno aunque WebFetch no.)
9. **Video facade:** el poster lo pone el script global de BaseLayout (`.video-wrap[data-yt-id]` → `i.ytimg.com/.../hqdefault.jpg`), el click→iframe lo hace el facade por página. Las tarjetas de ejemplo usan `.caso-media.video-wrap` con `data-yt-id`. Para portadas 16:9 usa `maxresdefault` con fallback a `hqdefault` (algunos videos no tienen maxres → 404 o placeholder 120px).

---

## 7. FLUJO DE TRABAJO / DEPLOY

```bash
cd ~/Developer/sls-astro
npm run build                 # 14 páginas, debe salir limpio
# editar en src/pages/*.astro y src/styles/pages/*.css
npm run sitemap               # si tocaste páginas: regenera el lastmod del sitemap desde git
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
7. 🧾 **Legal:** RFC pendiente (opcional). ✅ **GA4:** ya configurado dentro de GTM (`G-Y0PV6X70P3`, verificado en vivo 2026-07-10).
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

### SEO / AEO — segunda pasada (2026-07-09, commit `70f7d4d`)
- **`Offer` en MXN por página de producto.** Las 5 páginas tenían `Service` **sin ninguna `Offer`**: Google y los LLMs no veían un solo precio al leer `/soul-caps`, `/spots-ia`, `/films-de-marca`, `/smart-pass` ni `/soul-story-kids`. Ahora cada una expone sus tiers como `Offer` (con `description`, `availability` y `url`). **26 ofertas** en total (17 en producto + 9 en el home), todas `MXN`.
- **`sameAs`** agregado al `Organization` del home (Instagram, TikTok, Facebook, YouTube) para que Google y los asistentes vinculen la entidad de marca. Antes solo `/hub` lo tenía.
- **`og:image` y `twitter:image`: `.webp` → `.png`** (`og-image.png`, 1200×630, 39 KB). LinkedIn no renderiza WebP y WhatsApp falla de forma intermitente. El `.webp` sigue en `public/` por si algo lo referencia.
- Verificado: los **8 schemas parsean sin error**, todas las ofertas en MXN, y **cero "USD"** en las 12 páginas + `llms.txt`.

> ⚠️ **Único resto de Hostinger:** el registro `A ftp → 213.190.5.244` (DNS only). Si se cancela el hosting de Hostinger, **borrarlo**. El correo vive en `soullens.live` y no se toca.

### 💰 PRICING UNIFICADO — 2026-07-09 (commit `a0a980f`)

**Fuente de verdad:** las KB en `Documents/2026/SLS Soul Lens Studio/Productos Servicios Pricing SLS v2.0/SLS_Bases_de_Conocimiento_Agente_v1.0/`. **Todo en MXN.** No inventar ni mover precios sin actualizar la KB primero.

Antes había **tres sistemas contradictorios**: JSON-LD en USD (otro modelo de negocio), HTML visible en MXN con charm `-800/-980/-380`, y `llms.txt` en MXN con cifras distintas a ambos. Ya está todo alineado a la KB y verificado en vivo (cero "USD" en el sitio).

| Producto | Canon (MXN) |
|---|---|
| Soul Caps | Voice desde $2,990 · Presence desde $4,590 · Authority desde $12,490 |
| Paquetes Authority | 3ep15 $34,990 · 6ep15 $67,590 · 3ep30 $39,390 · 6ep30 $76,390 |
| Films de Marca | $17,990 · $29,990 · $49,990 |
| Spots IA | $2,990 · $5,990 · $11,990 · Influencer IA $3,790 · Gemelo IA $7,790 |
| Smart Pass | $3,990+$399/m · $5,990+$599/m · $9,990+$999/m (anual = 10× mensual) |
| Soul Story Kids | $999 · $1,999 · $2,999 · Pass $799 y $1,749/mes · escuelas $799/$749/$599 |

**Bugs corregidos de paso:**
- Los paquetes Authority de Soul Caps estaban en **dólares legacy** (`$1,857→$1,749`, "ahorras $108"). Nunca se migraron.
- Los "Antes" de los packs (Soul Caps y Spots) no cuadraban con sus propios tiers. Recalculados.
- ✅ **La KB de Soul Caps tenía un error aritmético** (columna "Antes" = $37,140 = 3×$12,380, cuando el tier publicado es $12,490). **Ya se corrigió el archivo de la KB** (`SLS_KB_SoulCaps_v1.0.md`): Antes = $37,470 / $74,940 / $41,970 / $83,940 y Ahorras = $2,480 / $7,350 / $2,580 / $7,550. Los precios *finales* de paquete no cambiaron.
- ⚠️ **Observación de negocio (NO tocada):** el Campaign Pack de Spots da **22.1 % de descuento en Voice** contra **16.6 % en Presence y Authority** — el nivel de entrada regala más que los superiores, lo que desincentiva subir de tier. Igualarlo implicaría subir Voice de $6,990 a ~$7,490. **Decisión del cliente.**
- `llms.txt` afirmaba **"o devolución de inversión"** en la garantía. Las KB dicen explícitamente que es garantía de **calidad y correcciones, NO de resultados**. Corregido (era riesgo legal/comercial).
- `llms.txt` usaba URLs `.html` (que dan 308). Ahora limpias, y agregado `/hub`.
- `terminos`: los servicios se cotizan en **MXN**.

### ⚠️ Pendiente que necesita decisión del cliente
**Faltan KB (y por tanto precios) de:** **Soul Stage**, **Lanzamiento Total**, y los items legacy de Soul Caps (**Episodio Piloto**, **Plan Mensual**, **Series 20% off**) que estaban en el JSON-LD en USD. Se **retiraron sus cifras** del schema en vez de publicar precios sin respaldo (regla de oro de las KB: *nunca inventar precio*). Cuando el cliente dé los precios en MXN, se reponen en el JSON-LD del home y en `llms.txt`.

### Pendiente para pautar
- **Meta Business:** el meta-tag `facebook-domain-verification` **YA está en BaseLayout sirviendo en las 14 páginas** (código `96htqcrkc44ycomylza91jtm57nyfi`, heredado del bundle v4.1 en el commit inicial `c84a704`; verificado en vivo 2026-07-10). Falta solo que el cliente confirme en Business Manager → Seguridad de marca → Dominios que `soullensstudios.live` figura **Verificado** (botón "Verificar" si no lo está — Meta lee el tag al instante). ⚠️ Si su BM le muestra un código DISTINTO, es otro Business Manager: pedir ese código y **agregarlo como segundo meta-tag** en BaseLayout (pueden coexistir varios; NO borrar el existente). Se le pidió al cliente el 2026-07-10.
- ✅ **GA4 dentro de GTM: hecho** (`G-Y0PV6X70P3` en el contenedor publicado y disparando en vivo; verificado 2026-07-10 leyendo `gtm.js` y `window.google_tag_manager` en la página. El pixel de Meta NO está duplicado en GTM: 0 menciones en el contenedor).
- Dar de alta el sitio en **Google Search Console** + enviar `https://soullensstudios.live/sitemap.xml`.
- ✅ **Sitemap automatizado** (2026-07-10, commit `dd58d29`): `npm run sitemap` → `scripts/gen-sitemap.mjs` regenera `public/sitemap.xml` con `lastmod` **real por página desde git** (fuentes: su `.astro` + su `.css` + SiteHeader/SiteFooter en las 6 interiores; BaseLayout excluido a propósito). Descubre páginas nuevas solo (defaults + warning). Se **descartó** `@astrojs/sitemap` (solo admite lastmod global = fecha de build para todas, señal falsa) y se quitó de `package.json` (dependencia muerta, nada la importaba). **Correrlo al tocar páginas, antes de commitear.** De paso corrigió 5 lastmod que se habían quedado en 06-29.

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
