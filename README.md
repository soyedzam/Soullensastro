# Soul Lens Studios — Web (Astro)

Sitio estático en **Astro**, optimizado para **Cloudflare Pages**.
Migrado desde el bundle HTML v4.1 con: imágenes WebP optimizadas, head/SEO centralizado,
GTM + Meta Pixel único, JSON-LD por página y previews de video lite-YouTube.

## Desarrollo
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve dist/
```

## Deploy — Cloudflare Pages (vía GitHub)
- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 20+ (variable `NODE_VERSION=20`)

`public/_headers` aplica seguridad + caché. URLs con `.html` (build.format:'file'),
idénticas a los canonicals y enlaces internos.

## Analítica
- **GTM:** `GTM-TLKNP8BJ` (contenedor único). Configura GA4 dentro de GTM.
- **Meta Pixel:** `9289240721121438` (PageView + Contact en CTAs de WhatsApp).
  No dupliques el Pixel dentro de GTM.

## Pendiente de completar (datos del cliente)
- `[VALIDAR: …]` en `aviso-de-privacidad` y `terminos` (razón social, RFC, jurisdicción) — con abogado.
- `pulse.html`: `[VALIDAR_GOOGLE_CALENDAR_ID]` y `[VALIDAR_LOCATION_ID]` (link de cita + webhook).
- `data-yt-id=""` en tarjetas de caso: pega el ID de YouTube y el preview+play aparece solo.

## Scripts de migración (referencia)
- `scripts/convert-images.mjs` — descarga/convierte a WebP.
- `scripts/gen-pages.mjs` — genera páginas desde el bundle original.
