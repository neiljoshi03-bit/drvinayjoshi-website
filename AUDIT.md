# Site Audit — drvinayjoshi.com

**Audited:** 2026-08-18 · **Branch:** `seo-ai-visibility` · **Pages crawled:** 8 HTML files
**Scope:** technical SEO, structured data, content architecture, AI-search readiness.

---

## Summary of sitewide defects

| # | Defect | Severity | Pages affected |
|---|--------|----------|----------------|
| S1 | `og:image` and `Physician.image` point to `https://drvinayjoshi.com/hero.png` — **this file does not exist in the repo** (404). Every social share and every schema image is broken. | **Critical** | all 8 |
| S2 | Hotlinked Unsplash images (stock photos on a medical site; third-party dependency; no licence record) | High | index, health-tips ×3, revision, testimonials, consultation |
| S3 | `Physician` schema present on only 2 of 8 pages (index, revision); no `sameAs`, no `alumniOf` for Topiwala/Nair, no `memberOf` | High | 6 pages missing entirely |
| S4 | Visible FAQ content with **no `FAQPage` schema** (index has 5 Q&As unmarked) | High | index |
| S5 | 3 embedded YouTube videos with **no `VideoObject` schema** | Medium | index |
| S6 | `© 2024` hard-coded in footer — site reads as 2 years stale to crawlers and patients | Medium | all 8 |
| S7 | `<meta name="keywords">` present — obsolete, signals template age | Low | all 8 |
| S8 | No `width`/`height` on any `<img>` — cumulative layout shift | Medium | all 8 |
| S9 | `loading="lazy"` missing except on index gallery; hero images lack `fetchpriority="high"`/preload | Medium | 7 pages |
| S10 | Asset filenames contain spaces, mixed case and parentheses (`Knee photo.jpg`, `Hip Image.jpg`, `Prof.jpeg`, `Frequently Asked Questions (FAQs) _compressed.pdf`) — percent-encoded URLs, zero keyword value | Medium | all |
| S11 | `robots.txt` is 3 lines; no explicit AI-crawler allowances (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended…) | High (AI search) | root |
| S12 | No `llms.txt` | High (AI search) | root |
| S13 | No `about.html` — no biography entity page for E-E-A-T | High | — |
| S14 | No article/blog layer — zero pages targeting cost, recovery, exercises, AVN, "how to choose a surgeon" queries | **Critical** (organic reach) | — |
| S15 | Footer NAP is **not** character-identical across pages: index carries full postal address; knee/hip/robotic/revision/testimonials/consultation carry only a one-line "Consultant Orthopaedic Surgeon · KDAH, Mumbai" with no street address or phone | High (local SEO) | 7 pages |
| S16 | `onerror=` fallbacks on `<img>` point to external hosts (`placehold.co`, `images.unsplash.com`) — an external request fires on any asset failure | Low | all |

---

## Content contradiction found (medical accuracy)

**`knee.html` contradicts `robotic.html` on pre-operative CT.**
- `knee.html` › *Robotic-Assisted TKR* › "How It Differs from Conventional Surgery": "**Before surgery, a CT scan creates a 3D model of the patient's knee.**"
- `robotic.html` › *No Pre-Operative Scan Required*: "**no pre-operative CT scan is needed** — unlike older robotic platforms. The system maps the patient's bone anatomy live during surgery."
- `index.html` FAQ agrees with `robotic.html`.

VELYS is CT-free (imageless); the `knee.html` text describes an older CT-based platform. **`knee.html` is wrong and must be corrected.** Logged for correction in Phase 1.

---

## Per-page audit

### 1. `index.html` — Home
| Field | Value |
|---|---|
| Title | `Dr. Vinay Joshi - Best Joint Replacement Surgeon in Mumbai \| Kokilaben Hospital` (89 chars — truncates in SERP) |
| Meta description | 213 chars — **truncates** (target 140–160) |
| Canonical | `https://drvinayjoshi.com/` ✓ |
| **H1 count** | **2** ❌ — "Dr. Vinay S. Joshi" (hero, L381) + "Dr. Vinay Joshi — Mumbai's Leading Joint Replacement Surgeon" (L449) |
| Hierarchy | Broken: 2×H1, 1×H2 (gallery only), 7×H3 used as top-level section headings. Section headings should be H2. |
| Images | 44 `<img>`; 34 lazy (gallery); 0 with width/height; hero not preloaded |
| External images | `images.unsplash.com` ×2 — revision procedure card `src` (L609) + `Prof.jpeg` `onerror` fallback (L480) |
| JSON-LD | `Physician` (+`Hospital`,`PostalAddress`), `BreadcrumbList`. **Missing:** `FAQPage`, `VideoObject`×3, `sameAs`, `alumniOf` (Topiwala/Nair), `memberOf` |
| Word count | ~3,610 |
| Other | `meta keywords`; `© 2024`; schema `image` → missing hero.png |

### 2. `knee.html` — Knee Replacement
| Field | Value |
|---|---|
| Title | 72 chars — slightly long |
| Meta description | 189 chars — truncates |
| H1 | 1 ✓ |
| Hierarchy | 1×H1, 8×H2, 1×H3, **28×H4** — H4s sit directly under H2 (H3 skipped) ⚠ |
| Images | 2; 0 lazy; 0 width/height |
| External images | none in `src`; `placehold.co` in `onerror` |
| JSON-LD | `BreadcrumbList` only. **Missing:** `Physician`, `MedicalProcedure`, `FAQPage` |
| Word count | ~2,983 |
| Content flag | **CT-scan contradiction** (see above) |

### 3. `hip.html` — Hip Replacement
| Field | Value |
|---|---|
| Title | 74 chars |
| Meta description | 196 chars — truncates |
| H1 | 1 ✓ |
| Hierarchy | 1×H1, 6×H2, 1×H3, **20×H4** — H3 skipped ⚠ |
| Images | 1; 0 lazy; 0 width/height |
| JSON-LD | `BreadcrumbList` only. **Missing:** `Physician`, `MedicalProcedure` (AVN/Regrow content is strong and unmarked) |
| Word count | ~2,597 |

### 4. `robotic.html` — Robotic Surgery
| Field | Value |
|---|---|
| Title | 82 chars — truncates |
| Meta description | 191 chars — truncates |
| H1 | 1 ✓ |
| Hierarchy | 1×H1, 7×H2, 1×H3, **16×H4** — H3 skipped ⚠ |
| Images | 2 (`Robo.jpeg`); 0 lazy; 0 width/height |
| JSON-LD | `BreadcrumbList` only. **Missing:** `Physician`, `MedicalProcedure` |
| Word count | ~2,856 |
| Note | Strongest technical content on the site — VELYS, 500Hz tracking, no-CT workflow, registry evidence. Under-exploited: no article layer feeding it. |

### 5. `revision.html` — Revision Surgery
| Field | Value |
|---|---|
| Title | 62 chars ✓ |
| Meta description | 183 chars — truncates |
| H1 | 1 ✓ |
| Hierarchy | 1×H1, 7×H2, 2×H3, **22×H4** — H3 largely skipped ⚠ |
| Images | 1 — **hero `src` is Unsplash** (`photo-1516549655169`) |
| JSON-LD | `Physician`, `MedicalProcedure`, `BreadcrumbList` ✓ (best-equipped page) |
| Word count | ~3,014 |

### 6. `health-tips.html` — Health Tips (**QR-code destination — URL must not change**)
| Field | Value |
|---|---|
| Title | 55 chars ✓ |
| Meta description | 178 chars |
| H1 | 1 ✓ |
| Hierarchy | 1×H1, 6×H2, 4×H3 ✓ (cleanest on site) |
| Images | 3 — **all three are Unsplash** (hero + 2 section images); 0 lazy; 0 width/height |
| JSON-LD | `BreadcrumbList` only. **Missing:** `Physician`, `FAQPage`, `MedicalWebPage` |
| Word count | ~2,652 |
| Note | Contains the site's richest reusable content: 6 prep tips, 5-stage recovery timeline, danger signs, do's/don'ts, 5 knee + 5 hip exercises, long-term joint health, 4 PDF guides. This is the raw material for the `/articles/` layer. |
| Content flag | Long-term section lists "Indian-style floor sitting" under **Activities to Avoid**, while `knee.html` and the index FAQ promote High Flex knees *for* cross-legged sitting and prayer. Needs the doctor's reconciliation. |

### 7. `testimonials.html` — Testimonials
| Field | Value |
|---|---|
| Title | 63 chars ✓ |
| Meta description | 156 chars ✓ (only compliant description on the site) |
| H1 | 1 ✓ |
| Hierarchy | 1×H1, 1×H2, 1×H3 — thin for 9 reviews |
| Images | 2 — **hero `src` is Unsplash** |
| JSON-LD | `LocalBusiness` + `AggregateRating` (4.8) + 3×`Review`. ⚠ Page displays **9** reviews but only 3 are marked up; `AggregateRating` on a self-hosted page is ignored/penalised by Google for `LocalBusiness` self-serving reviews |
| Word count | ~1,800 |

### 8. `consultation.html` — Consultation
| Field | Value |
|---|---|
| Title | 71 chars |
| Meta description | 158 chars ✓ |
| H1 | 1 ✓ |
| Hierarchy | 1×H1, 2×H2 ✓ |
| Images | 1 — **hero `src` is Unsplash** |
| JSON-LD | `FAQPage` (5 Q&As) + `BreadcrumbList` ✓. **Missing:** `Physician`, `MedicalBusiness`/`OpeningHoursSpecification` (OPD hours Mon–Sat 9–5 are on-page but unmarked) |
| Word count | ~2,054 |
| Note | EmailJS public key + service/template IDs are exposed in client JS. This is normal for EmailJS (public key is designed to be public) but the form has no spam protection. |

---

## Link & asset integrity

- **Internal HTML links:** all resolve. 7 targets referenced (`knee`, `hip`, `robotic`, `revision`, `health-tips`, `testimonials`, `consultation`) — all exist. No 404s.
- **Local assets:** all 48 referenced local paths resolve on disk (gallery 01–34, 4 PDFs, 8 images, favicon, 1 video). ✓
- **The one broken reference is `hero.png`** — referenced from `<meta property="og:image">` on all 8 pages and from `Physician.image` on index. Not in repo.
- **Alt text:** every `<img>` has an `alt` attribute ✓ (quality varies — several are 1–2 words: "Knee Replacement", "Health Tips", "Consultation")
- **Orphan pages:** none. **Orphan assets:** `Hip .jpg` (note trailing space in filename) is referenced; `Profile picture.png` is in the repo but unreferenced.

## Files present at root but not deployed-relevant
`Dancing patient video.mp4` (4.1 MB) and `WhatsApp Video…mp4` are served from root; the 4.1 MB video is referenced by testimonials.html without `preload="none"`.

---

## Existing infrastructure

**`robots.txt`** (3 lines) — `User-agent: * / Allow: / / Sitemap:`. No AI-crawler declarations.
**`sitemap.xml`** — 8 URLs, all `lastmod 2026-03-24`. Valid, but will be stale the moment articles ship.
**`vercel.json`** — one redirect: `www.` → apex. No asset redirects.
**`CNAME`** — `drvinayjoshi.com`.
**Missing:** `llms.txt`, `about.html`, `/articles/`, `ARTICLES-FOR-REVIEW.md`, `MANUAL-TASKS.md`.

---

## Verdict

The site is **well-built and content-rich but structurally invisible to AI search and absent from the entire mid-funnel of organic search.** The four service pages contain genuinely authoritative clinical detail (VELYS no-CT workflow, Oxinium, Paprosky/AORI classifications, two-stage PJI revision, Regrow for early AVN) that no competitor page in Mumbai matches — but none of it is marked up as structured data, none of it is reachable via a query-shaped URL, and the doctor's own entity (`Physician`) appears on only a quarter of the site with no `sameAs` graph linking it to his Instagram, YouTube, or hospital profile.

Priorities, in order: **S1** (broken image on every page), **S11/S12** (AI-crawler access), **S3/S4** (entity + FAQ schema), **S14** (article layer), **S13** (about page).

---
---

# Post-Work Verification (18 August 2026)

Re-crawled after all four phases. **21 pages** now on the site (was 8).

## Sitewide defects — resolution

| # | Defect | Status |
|---|--------|--------|
| S1 | Broken `hero.png` on all 8 pages | **Fixed** — new 1200×630 `dr-vinay-joshi-joint-replacement-surgeon-mumbai.jpg`; 0 references remain |
| S2 | Hotlinked Unsplash images | **Fixed** — 0 external image hosts sitewide; replaced with real practice photographs |
| S3 | `Physician` schema on 2 of 8 pages | **Fixed** — unified `@graph` with `Physician` + `Hospital` + `WebSite` on **21/21** pages |
| S4 | Visible FAQ with no `FAQPage` schema | **Fixed** — 14 pages carry `FAQPage` matching visible text exactly |
| S5 | No `VideoObject` | **Fixed** — 3 `VideoObject` nodes on the homepage |
| S6 | `© 2024` | **Fixed** — 0 remaining; auto-updating via `.cyear` |
| S7 | `meta keywords` | **Fixed** — 0 remaining |
| S8 | No image dimensions | **Fixed** — every `<img>` except the empty lightbox target carries width/height |
| S9 | Lazy-loading / hero priority | **Fixed** — below-fold images lazy, heroes `fetchpriority="high"` + preloaded |
| S10 | Filenames with spaces/case | **Fixed** — 13 assets renamed to kebab-case keyword names, 14 redirects added |
| S11 | No AI-crawler declarations | **Fixed** — 23 user-agent groups incl. GPTBot, ClaudeBot, PerplexityBot, Google-Extended |
| S12 | No `llms.txt` | **Fixed** — 94-line entity summary at root |
| S13 | No `about.html` | **Fixed** — full biography with verified PubMed-linked publication |
| S14 | No article layer | **Fixed** — 12 articles under `/articles/`, ~1,150–1,600 words each |
| S15 | Footer NAP inconsistent | **Fixed** — full street address + phone on **21/21** pages |
| S16 | External `onerror` fallbacks | **Fixed** — all removed |

## Content contradiction

**Resolved.** `knee.html` no longer claims a pre-operative CT scan is required for robotic TKR;
corrected to the VELYS imageless workflow, consistent with `robotic.html` and the homepage FAQ.

## Additional issues found and fixed during the work

| Issue | Detail |
|---|---|
| Two homepage video cards pointed at the same video | `GflyAn-G17s` and `7TlaYuSl-AQ` are the same film. Card 3 repointed and relabelled. |
| A conference lecture was labelled a patient story | `WuDiSgkgWxQ` is *"Case Presentations Primary or Complex THA — ROC 2023"* on OrthoTV, not a patient testimonial. Relabelled. |
| Publication misattributed | The shoulder paper was credited to the *Journal of Shoulder & Elbow Surgery*; the indexed record (PMID 21660193) shows *International Journal of Shoulder Surgery* 2011;5(1):17–20. Corrected and linked. |
| `consultation.html` had invisible FAQ schema | 5 Q&As were marked up but not shown on the page — a Google policy breach. A matching visible FAQ accordion was added. |
| Self-serving `AggregateRating` | Removed from `testimonials.html`; ineligible for rich results and a manual-action risk. |
| 4.1 MB video auto-loading | `testimonials.html` video now `preload="none"` with a poster image. |

## Final structural state

```
Pages                     21   (8 existing + 12 articles + about.html)
H1 per page              1/1   on all 21
Heading hierarchy          ok   no skipped levels anywhere (86 H4s promoted to H3)
Internal links            804   all resolve, 0 broken
JSON-LD blocks           21/21  all parse, 0 trailing commas
Sitemap                    21   matches pages on disk exactly
Titles                  ≤62ch   all 21
Descriptions        135–168ch   all 21
Canonicals               21/21
External image hosts        0
```

## Known gaps

- **WebP not generated** — no tooling available on this machine without adding a build dependency.
  Logged in `MANUAL-TASKS.md` item 9.
- **`sameAs` has one URL** — only the KDAH profile is verified. Practo/Credihealth/Justdial and any
  personal social accounts are pending claim; logged as `MANUAL-TASKS.md` item 4.
- **Cost figures unpublished** — no figures were invented. Nine `[DOCTOR TO CONFIRM]` boxes are
  visible on the affected pages and listed in `ARTICLES-FOR-REVIEW.md`.
