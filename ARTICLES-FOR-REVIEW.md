# Articles for Review — Doctor Sign-Off Required

**Status: SIGNED OFF.** Dr. Joshi reviewed the pages and confirmed they read correctly
(relayed 21 September 2026). All seven outstanding questions were answered and applied, and
**zero `[DOCTOR TO CONFIRM]` boxes remain on the site.**

**Created:** 18 August 2026 · **Answers applied:** 28 August 2026 · **Signed off:** 21 September 2026
**Branch:** `seo-ai-visibility` · **Still not deployed** — nothing has been pushed.

What the sign-off changes: every article carries an author box reading *"Written & medically
reviewed by Dr. Vinay S. Joshi"* and a `reviewedBy` field in its structured data. Until now that
claim was aspirational. It is now true, so `lastReviewed` has been set to the sign-off date across
all 21 pages (and `dateModified`, the OG modified time, the visible author-box date and the sitemap
`lastmod` with it).

**One item he did not answer** — his own driving-clearance and return-to-work protocol (item 7
below). The page carries general, evidence-grounded guidance instead and says so plainly. That is
publishable as it stands; his own rule would simply be stronger. It is not a blocker.

---

## His answers, and what changed

### 1. Conference presentations — ANSWERED
> *"Regularly teach on cadaveric robotic course at Bangkok and Bangalore. I am a routine faculty at
> ROC conferences every year. Also participated in debates at WIROC conferences."*

The three presentations previously listed had been inferred from gallery photographs, and he did not
confirm them — so they were **replaced** with the roles he actually stated. The ROC 2023 hip
arthroplasty case presentations are retained, since he confirms he is ROC faculty annually and the
talk is independently verifiable on OrthoTV. The Singapore Orthopaedic Association meeting and the
robotic symposium were **dropped** rather than published unconfirmed.

Names verified before publishing: **ROC** is the Ranawat Orthopaedic Course, the annual Mumbai
meeting on joint replacement; **WIROC** is the Western India Regional Orthopaedic Conference, the
annual meeting of the Bombay Orthopaedic Society.

### 2. Publications — ANSWERED
> *"Remove the Bombay Hospital Journal, it's not my work. Also remove Trochlea fracture case report."*

Both removed from `about.html` and `index.html`. This leaves **one** peer-reviewed publication — the
*International Journal of Shoulder Surgery* paper, PMID 21660193, which is verified and linked.

Consequence worth noting: the homepage section previously read *"Advancing the science of joint
replacement through peer-reviewed research"* above three cards. One shoulder paper does not support
that claim, so the section was reframed to **"Training other surgeons, and contributing to the
literature"**, with the two vacated cards filled by his teaching roles from answer 1. That is both
accurate and a stronger credential than the two removed papers were.

### 3. Regrow therapy — ANSWERED
> *"No. Please quote the published data. I do not have my own data with Regrow."*

The 70–80% figure stays, now explicitly attributed to published series rather than to his practice,
with a sentence stating he does not hold separate outcome data and prefers to quote the evidence base.

### 4. Hip approach and precautions — ANSWERED, and this one was a real correction
> *"My routine approach is modified Hardinge's lateral approach, which has precautions like not to
> sit on the ground and not to cross legs for 6 weeks."*

**The page was giving the wrong precautions.** It carried the standard *posterior*-approach protocol
(no flexion beyond 90°, no internal rotation, pillow between the legs). His approach is the modified
Hardinge — a direct lateral, abductor-split exposure — and his precautions are two: **no floor
sitting and no crossing the legs, for six weeks.** Rewritten accordingly, along with three FAQ answers
that had been built around posterior-approach risk.

Two things were added that follow from the approach and are supported by the literature: the direct
lateral approach has a **lower dislocation rate** than the posterior (reported under 1%), and because
the abductor is divided and repaired, **abductor rehabilitation matters more and earlier** — which
now has a stated reason rather than being generic advice.

### 5 & 6. Floor sitting, squatting and deep flexion — ANSWERED (one answer, both questions)
> *"One can squat and sit cross-legged after high flex knees, but not advisable on a daily basis as
> it will decrease the life of the prosthesis."*

This resolves the contradiction that ran across the site. The published position is now consistent
everywhere: **possible after a high-flex knee, occasional rather than daily, because repeated deep
flexion shortens implant life** — and with a standard implant the question does not arise, since a
standard knee reaches around 110–120° against the 130–150° these postures require.

Applied to `health-tips.html` (the "Indian-style floor sitting" avoid-line that started it),
`knee.html` (text and procedure schema), `index.html` (FAQ answer and its FAQPage schema),
`exercises-after-knee-replacement.html` and `high-flex-knee-replacement.html`.

### 7. Driving clearance and return to work — NOT ANSWERED
He left this blank. Rather than attribute a protocol to him that he has not given, the page now
presents **general guidance grounded in the published evidence** and says so plainly: braking studies
after knee replacement find reaction time back to pre-operative levels at around four weeks, with
brake pedal force taking closer to six — which is where the four-to-six-week range comes from.

A callout states that clearance is judged case by case and confirmed by him at follow-up, that
desk work commonly resumes part-time from four to six weeks while standing and manual work commonly
takes around three months, and that patients should check their motor insurer's position.

**If he wants his own rule published here, it would replace this section.** That is the one remaining
thing on this page that would benefit from his word — everything else is settled.

---

## Content corrections already made (please confirm you agree)

| # | Page | Change |
|---|------|--------|
| A | `knee.html` | **Removed the claim that a pre-operative CT scan is required for robotic TKR.** It contradicted `robotic.html`, the homepage FAQ and the VELYS system's imageless workflow. Corrected to live intra-operative mapping. |
| B | `index.html` | Publication journal corrected (see item 9) and a PubMed link added. |
| C | `index.html` | **Video card 1** was labelled *"Patient Story — Inspiring Recovery After Knee Replacement"*. The video is actually *"Case Presentations Primary or Complex THA — Dr Vinay Joshi, ROC 2023"* on OrthoTV. Relabelled. |
| D | `index.html` | **Video cards 2 and 3 pointed at the same video** (`GflyAn-G17s` and `7TlaYuSl-AQ` are both *"Knee surgery — All questions answered (Part 2)"*). Card 3 now points at the Kokilaben Hospital film and is labelled accordingly. |
| E | `testimonials.html` | **`AggregateRating` (4.8) and three `Review` blocks removed from the structured data.** Self-serving reviews hosted on a business's own site are ineligible for rich results under Google's policy and can attract a manual action. The visible testimonials are unchanged. The route to star ratings in search is the Google Business Profile — see `MANUAL-TASKS.md`. |
| F | `index.html` | Meta title changed from *"Dr. Vinay Joshi - Best Joint Replacement Surgeon in Mumbai…"* to *"Dr. Vinay Joshi \| Joint Replacement Surgeon, Mumbai"*. Two reasons: the original was 79 characters and truncated in search results, and a self-superlative in a title tag sits awkwardly with NMC advertising standards. **That query is now targeted compliantly by article 12**, which is framed as the patient's question. Revert if you prefer. |
| G2 | `knee-replacement-cost-mumbai.html`, `hip-replacement-cost-mumbai.html` | **Both cost articles rewritten to carry no monetary figure of any kind.** Every `[DOCTOR TO CONFIRM]` price placeholder, every rupee amount, every city-wide band and the aggregator-sourced figures and their citation have been removed. Each page now opens by answering the query honestly — that any figure quoted before a clinical assessment would be a guess, which is why a written personalised estimate follows consultation — then explains qualitatively what determines cost, how insurance and cashless work, what a package includes, and the exact steps to obtain an estimate. The NPPA narrative is retained as **regulation, not pricing**: knee implants are under statutory price control, hip implants never were, which is why hip quotations vary more and implant sub-limits matter more on a hip. No amounts are stated. |
| G | `health-tips.html` | The recovery timeline and the knee/hip exercise sections were **moved** into articles 3, 4 and 11 — not deleted — and the page is now a hub linking to all twelve guides. **The URL is unchanged**, so the printed QR code still works. |

---

## Editorial approach used

- UK English throughout (orthopaedic, paediatric, specialise, practise as verb).
- No new first-person superlative claims. Article 12 is framed as the searcher's question and
  compares Dr. Joshi against objective criteria factually.
- No invented statistics. Every figure traces to existing site content, the KDAH profile, or a
  named published source. Where a number was needed and unavailable, a confirm box was used instead.
- Each article opens with a two-to-three sentence quotable entity statement naming Dr. Joshi,
  the procedure and the hospital — the passage most likely to be extracted by an AI answer engine.
- Every article ends with a 6-question FAQ carrying `FAQPage` schema that matches the visible text exactly.
