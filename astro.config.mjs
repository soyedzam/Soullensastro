// @ts-check
import { defineConfig } from 'astro/config';

// Soul Lens Studios — static build, 100% Cloudflare Pages compatible.
// build.format:'file' => emite soul-caps.html (no /soul-caps/), conserva todos
// los enlaces internos y canonicals existentes sin reescribir nada.
export default defineConfig({
  site: 'https://soullensstudios.live',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'file', inlineStylesheets: 'auto' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
