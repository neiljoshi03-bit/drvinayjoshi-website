#!/usr/bin/env node
/**
 * wrap-picture.mjs — wrap every <img> that has a .webp sibling in a <picture>
 * element, and point the hero preload at the WebP.
 *
 * Rerun after build-webp.mjs:  npm run build:webp && npm run build:picture
 *
 * Guarantees:
 *  - idempotent: an <img> already inside a <picture> is left alone.
 *  - every original attribute (width, height, loading, fetchpriority, decoding,
 *    alt, class, style, onerror) is preserved verbatim on the <img>; only the
 *    wrapper and the <source> are added.
 *  - images with no .webp sibling (WebP lost on size) are skipped untouched.
 *  - external images (YouTube thumbnails) are skipped.
 *  - og:image / twitter:image meta tags are never touched — social scrapers
 *    handle WebP inconsistently, so those stay on the JPEG.
 *
 * NOTE: <picture> generates a box by default, which would break any <img> sized
 * with height:100% against its parent (the site's hero and gallery images all
 * are). `picture { display: contents }` in src/tw-input.css removes that box so
 * the layout tree is unchanged. Do not drop that rule.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, normalize } from "node:path";

const ROOT = process.cwd();

function htmlFiles() {
  const out = [];
  for (const f of readdirSync(ROOT)) if (f.endsWith(".html")) out.push(f);
  const art = join(ROOT, "articles");
  if (existsSync(art)) for (const f of readdirSync(art)) if (f.endsWith(".html")) out.push(join("articles", f));
  return out.sort();
}

const IMG = /<img\b[^>]*?>/gs;
let wrapped = 0, already = 0, noWebp = 0, external = 0, preloads = 0;
const touched = [];

for (const file of htmlFiles()) {
  const base = dirname(file);
  let src = readFileSync(join(ROOT, file), "utf8");
  const original = src;

  // ── wrap <img> in <picture> ──────────────────────────────────────────────
  const out = [];
  let last = 0;
  for (const m of src.matchAll(IMG)) {
    out.push(src.slice(last, m.index));
    const tag = m[0];
    last = m.index + tag.length;

    const srcAttr = tag.match(/\ssrc="([^"]*)"/);
    const before = src.slice(Math.max(0, m.index - 400), m.index);

    if (!srcAttr || !srcAttr[1]) { out.push(tag); continue; }
    const url = srcAttr[1];

    if (/^https?:/.test(url)) { external++; out.push(tag); continue; }
    // already wrapped? look back for an unclosed <picture>
    if (before.lastIndexOf("<picture") > before.lastIndexOf("</picture>")) { already++; out.push(tag); continue; }
    if (!/\.(jpe?g|png)$/i.test(url)) { out.push(tag); continue; }

    const webpUrl = url.replace(/\.(jpe?g|png)$/i, ".webp");
    const onDisk = normalize(join(base, decodeURIComponent(webpUrl)));
    if (!existsSync(join(ROOT, onDisk))) { noWebp++; out.push(tag); continue; }

    out.push(`<picture><source srcset="${webpUrl}" type="image/webp">${tag}</picture>`);
    wrapped++;
  }
  out.push(src.slice(last));
  src = out.join("");

  // ── hero preload -> WebP (keeps fetchpriority; type lets non-supporting UAs skip) ──
  src = src.replace(
    /<link rel="preload" as="image" href="([^"]+)\.(jpe?g|png)"([^>]*)>/g,
    (whole, stem, ext, rest) => {
      const webpRel = normalize(join(base, decodeURIComponent(`${stem}.webp`)));
      if (!existsSync(join(ROOT, webpRel))) return whole;
      preloads++;
      const attrs = rest.includes("type=") ? rest : ` type="image/webp"${rest}`;
      return `<link rel="preload" as="image" href="${stem}.webp"${attrs}>`;
    }
  );

  if (src !== original) { writeFileSync(join(ROOT, file), src); touched.push(file); }
}

console.log(`wrapped ${wrapped} <img> in <picture>`);
console.log(`preloads repointed to WebP: ${preloads}`);
console.log(`skipped — already wrapped ${already}, external ${external}, no webp sibling ${noWebp}`);
console.log(`\n${touched.length} file(s) changed:`);
for (const f of touched) console.log(`  ${f}`);
