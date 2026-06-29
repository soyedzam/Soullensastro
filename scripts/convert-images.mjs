import sharp from 'sharp';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { basename } from 'node:path';

const RAW = process.env.RAW;
const OUT = process.env.OUT;
const urls = readFileSync(process.env.URLS, 'utf8').split('\n').map(s=>s.trim()).filter(Boolean);

const map = {};
let i = 0;
for (const url of urls) {
  i++;
  const src = `${RAW}/${basename(url)}`;
  const num = String(i).padStart(2,'0');
  const outName = `portfolio-${num}.webp`;
  const meta = await sharp(src).metadata();
  await sharp(src)
    .resize({ width: Math.min(meta.width, 1920), withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(`${OUT}/${outName}`);
  map[url] = `/img/portfolio/${outName}`;
  console.log(`[${num}] ${meta.width}x${meta.height} -> ${outName}`);
}
writeFileSync(process.env.MAP, JSON.stringify(map, null, 2));
console.log(`\nMapa escrito: ${Object.keys(map).length} imágenes`);
