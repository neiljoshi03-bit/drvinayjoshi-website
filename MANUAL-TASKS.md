# Manual Tasks — Human Action Required Outside the Repo

**Created:** 18 August 2026 · **Branch:** `seo-ai-visibility` · **Nothing here has been done for you.**

Ordered by impact. Items 1–5 are the ones that actually determine whether this work pays off.

---

## 1. Submit the sitemap in Google Search Console — **do this first**

- Verify `drvinayjoshi.com` if it is not already (DNS TXT record via your domain registrar, or the
  HTML-file method).
- Submit `https://drvinayjoshi.com/sitemap.xml`.
- Use **URL Inspection → Request Indexing** on the twelve new `/articles/` pages and `/about.html`.
  Without this they may take weeks to be discovered.
- Check **Indexing → Pages** a week later for anything excluded.

## 2. Register in Bing Webmaster Tools — **this is how ChatGPT sees you**

ChatGPT's search grounding uses Bing's index. A site absent from Bing is invisible to it regardless
of how well it ranks on Google.

- Sign up at `bing.com/webmasters`, verify the domain, submit the same sitemap.
- You can import the property directly from Google Search Console once step 1 is done.

## 3. Check Vercel is not blocking AI crawlers — **silent failure risk**

`robots.txt` now explicitly welcomes GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User,
PerplexityBot, Google-Extended, Applebot-Extended, CCBot and others. **A firewall rule overrides
robots.txt.** If Vercel's bot protection is challenging them, the invitation is meaningless.

- Vercel dashboard → your project → **Firewall**. Confirm Bot Protection / Attack Challenge Mode is
  **off**, or that AI crawlers are allow-listed.
- Verify from outside afterwards:
  ```
  curl -A "GPTBot" -I https://drvinayjoshi.com/articles/robotic-knee-replacement-mumbai.html
  curl -A "PerplexityBot" -I https://drvinayjoshi.com/
  ```
  Both must return `HTTP/2 200`. A `403` means the firewall is blocking them.

## 4. Claim directory profiles, then add them to the schema

`sameAs` in the structured data currently contains **one** verified URL — the Kokilaben profile.
Each additional claimed, consistent profile strengthens entity recognition for both Google and
AI answer engines.

| Directory | Action | Status |
|---|---|---|
| Google Business Profile | Claim/verify the practitioner listing | ☐ |
| Practo | Claim the profile, match NAP exactly | ☐ |
| Credihealth | Claim the profile | ☐ |
| Justdial | Claim the profile | ☐ |
| Lybrate / 1mg | Listings already exist — claim and correct them | ☐ |
| Vaidam, Medsurge, SafeMedTrip, Healmed, Rihlatmed, Ortil, Niruja | Third-party listings exist; correct any wrong details | ☐ |

**NAP must be character-identical everywhere:**
```
Dr. Vinay S. Joshi
Kokilaben Dhirubhai Ambani Hospital, Rao Saheb Achutrao Patwardhan Marg,
Four Bungalows, Andheri West, Mumbai 400053, Maharashtra
+91 22 4269 6969
```

Once claimed, add the URLs to the `sameAs` array. It appears in **every** page's JSON-LD, generated
from one place — `schema_lib.py`, `PHYSICIAN["sameAs"]` — so add them there and regenerate, or
find-and-replace the array across all 21 pages.

## 5. Request a backlink from the Kokilaben hospital profile

`https://www.kokilabenhospital.com/professionals/vinaysjoshi.html` currently does **not** link to
drvinayjoshi.com. A link from the hospital's own domain would be the single most authoritative
backlink available to this site, and would confirm the entity relationship the schema asserts.

Ask KDAH's marketing/digital team to add the website URL to the profile page.

---

## 6. Social profiles — schema placeholders pending

The site links to an Instagram reel and three YouTube videos. **None are on Dr. Joshi's own
accounts** — the reel belongs to `@kokilabenhospital`, and the videos to the Kokilaben channel,
OrthoTV and Bhagyashree Dassani respectively.

- If Dr. Joshi has a personal professional Instagram or YouTube channel, supply the URLs and they
  will be added to `sameAs`.
- If he does not, consider whether one is wanted. It is not essential, but a first-party video
  presence is a strong asset for AI answer engines.
- **Do not** add the hospital's social accounts to his `sameAs` — `sameAs` must describe the same
  entity, and a hospital account is a different entity.

## 7. Star ratings in search results

`AggregateRating` was removed from `testimonials.html`. Self-serving reviews on a business's own
website are ineligible for rich results and can attract a manual action.

The legitimate route is the **Google Business Profile**: claim it (item 4), then encourage patients
to review there. Those ratings surface in search and Maps without any markup on your site.

## 8. Photography needed

No stock imagery remains — every image is now a genuine photograph from the practice. Some are
doing work they were not shot for, and would benefit from purpose-shot replacements:

| Where | Currently using | Ideally |
|---|---|---|
| `health-tips.html` hero, recovery + hip exercise articles | `gallery/gallery-33.jpg` (Dr Joshi with a patient, reused 3×) | A dedicated physiotherapy / rehabilitation photograph |
| `signs-you-need-knee-replacement.html` | `gallery/gallery-12.jpg` (consultation) | A consultation or X-ray review photograph |
| `avn-hip-treatment-mumbai.html` | `hip-replacement-mumbai.jpg` | An MRI or hip imaging photograph |
| Article author boxes | `dr-vinay-joshi-orthopaedic-surgeon.jpg` | Fine as is — the white-coat portrait (`gallery/gallery-02.jpg`) is an alternative |

**Patient consent:** several gallery images show identifiable patients. Please confirm written
consent is on file for each image used on the public site.

## 9. WebP conversion — deferred, not done

Requested in the brief but **not completed**: this machine has no `cwebp`, no Python Pillow, and
this version of `sips` cannot write WebP. Adding a Node toolchain to a repo with no build step
seemed the wrong trade to make unasked.

Total image weight is currently ~6.1 MB across 40+ files, with no single file above 190 KB, so this
is an optimisation rather than a problem. Options:

- `brew install webp`, then generate `.webp` alongside each JPEG and add `<picture>` elements; or
- run the images through Squoosh or TinyPNG manually; or
- leave as is — with `Cache-Control: immutable` now set on all assets (in `vercel.json`),
  repeat visitors re-download nothing.

## 10. Housekeeping

- **Orphan files:** `Gallery 1.jpeg` … `Gallery 8.jpeg` sit at the repo root, are referenced by
  nothing, and duplicate images in `/gallery/`. Left in place deliberately in case anything external
  links to them. Safe to delete once you are satisfied nothing does.
- **Old asset URLs:** every renamed image and PDF has a permanent redirect in `vercel.json`, so
  existing links and bookmarks continue to work.
- **Consultation form:** `consultation.html` exposes EmailJS public keys in client JavaScript. That
  is by design for EmailJS and is not a leak. The form has **no spam protection** — consider adding
  EmailJS's built-in captcha if you start receiving junk.
- **Analytics:** the site has no analytics. Vercel Web Analytics is one line in the dashboard and
  would let you see whether these articles are actually landing.

---

## Verification after deployment

Once merged and live, confirm:

```
curl -I https://drvinayjoshi.com/health-tips.html     # 200 — the QR-code URL still works
curl -I https://drvinayjoshi.com/articles/knee-replacement-cost-mumbai.html
curl -I "https://drvinayjoshi.com/presentations/Patients Guide to Knee Replacements_compressed.pdf"   # 308 redirect
curl -s https://drvinayjoshi.com/robots.txt | head -5
curl -s https://drvinayjoshi.com/llms.txt | head -5
```

Then run the **Google Rich Results Test** on `/`, `/health-tips.html`, `/consultation.html` and one
article, and the **Schema.org validator** on `/about.html`.
