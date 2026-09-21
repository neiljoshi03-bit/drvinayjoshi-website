#!/usr/bin/env node
/**
 * build-webp.mjs — generate a WebP sibling for every raster image the site serves.
 *
 * Rerun whenever new photographs are added:  npm run build:webp
 *
 * Rules:
 *  - quality 80, effort 6.
 *  - a WebP is kept only if it is genuinely SMALLER than its source. If WebP loses
 *    (common for small, already-well-compressed JPEGs) the sibling is deleted and the
 *    original serves alone; wrap-picture.mjs then skips it automatically.
 *  - images referenced only from og:image / meta tags are ignored on purpose:
 *    social scrapers handle WebP inconsistently, so those stay JPEG.
 *  - idempotent: a .webp newer than its source is left untouched.
 */
import { readFileSync, readdirSync, statSync, existsSync, unlinkSync } from "node:fs";
import { join, dirname, normalize } from "node:path";
import sharp from "sharp";

const QUALITY = 80;
const ROOT = process.cwd();

function htmlFiles() {
  const out = [];
  for (const f of readdirSync(ROOT)) if (f.endsWith(".html")) out.push(f);
  const art = join(ROOT, "articles");
  if (existsSync(art)) for (const f of readdirSync(art)) if (f.endsWith(".html")) out.push(join("articles", f));
  return out;
}

const referenced = new Set();
for (const f of htmlFiles()) {
  const base = dirname(f);
  const src = readFileSync(join(ROOT, f), "utf8");
  const patterns = [
    /<img[^>]+src="([^"]+)"/g,
    /<source[^>]+srcset="([^"]+)"/g,
    /poster="([^"]+)"/g,
    /<link rel="preload"[^>]+href="([^"]+)"/g,
  ];
  for (const re of patterns) {
    for (const m of src.matchAll(re)) {
      const p = decodeURIComponent(m[1]);
      if (/^https?:/.test(p) || !p) continue;
      if (!/\.(jpe?g|png)$/i.test(p)) continue;
      referenced.add(normalize(join(base, p)));
    }
  }
}

const sources = [...referenced].filter((p) => existsSync(join(ROOT, p))).sort();
console.log(`${sources.length} raster image(s) referenced by the site\n`);

let made = 0, skipped = 0, rejected = 0, before = 0, after = 0;
const losers = [];

for (const rel of sources) {
  const abs = join(ROOT, rel);
  const out = abs.replace(/\.(jpe?g|png)$/i, ".webp");
  const outRel = rel.replace(/\.(jpe?g|png)$/i, ".webp");
  const srcSize = statSync(abs).size;
  before += srcSize;

  if (existsSync(out) && statSync(out).mtimeMs >= statSync(abs).mtimeMs) {
    after += statSync(out).size;
    skipped++;
    console.log(`  = ${outRel.padEnd(48)} up to date`);
    continue;
  }

  await sharp(abs).webp({ quality: QUALITY, effort: 6 }).toFile(out);
  const webpSize = statSync(out).size;

  if (webpSize >= srcSize) {
    unlinkSync(out);
    rejected++;
    after += srcSize;
    losers.push({ rel, srcSize, webpSize });
    console.log(`  x ${outRel.padEnd(48)} ${(webpSize / 1024).toFixed(1)} KB >= ${(srcSize / 1024).toFixed(1)} KB - discarded`);
  } else {
    made++;
    after += webpSize;
    const pct = (100 * (1 - webpSize / srcSize)).toFixed(0);
    console.log(`  + ${outRel.padEnd(48)} ${(srcSize / 1024).toFixed(1)} -> ${(webpSize / 1024).toFixed(1)} KB  (-${pct}%)`);
  }
}

console.log(`\ncreated ${made}, up-to-date ${skipped}, discarded-as-larger ${rejected}`);
console.log(`payload: ${(before / 1048576).toFixed(2)} MB -> ${(after / 1048576).toFixed(2)} MB  (-${(100 * (1 - after / before)).toFixed(1)}%)`);
if (losers.length) {
  console.log(`\nWebP was larger for these - originals left to serve alone:`);
  for (const l of losers) console.log(`  ${l.rel}  src ${(l.srcSize / 1024).toFixed(1)} KB vs webp ${(l.webpSize / 1024).toFixed(1)} KB`);
}
