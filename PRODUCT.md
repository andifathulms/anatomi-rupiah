# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

General Indonesian adults who handle cash but were never taught the mechanisms behind Bank Indonesia's 3D method (*Dilihat, Diraba, Diterawang*) — not a specialist audience (not cashiers-only, not students-only, not collectors-only). Confirmed: almost every Indonesian can recite the three words; far fewer can say what a watermark physically is, why intaglio feels raised, or what the security thread does inside the paper. Reads Indonesian first; English is secondary (`/en`).

## Product Purpose

Teaches *why* Rupiah's security features work, not just *what* to look for — cross-section and exploded-view illustration in place of the grey-patch photograph that existing public material relies on. Success is a reader who retains the mechanism (why a watermark modulates light, why intaglio ink sits proud of the substrate) rather than a memorized checklist. Site: https://andifathulms.github.io/anatomi-rupiah/.

## Positioning

Illustrates banknote security mechanisms as original drawn cross-sections rather than photographing or reproducing notes. No competing public material explains the physics behind the 3D method; existing material shows *what* to check, this shows *why it works*. Also the only material teaching *kode tuna netra* (the blind-touch code) to a sighted audience — under-taught even though almost every Indonesian carries it daily.

## Operating Context

- Bank Indonesia's public 3D-method campaign (*Dilihat, Diraba, Diterawang*) is the frame the whole product sits inside; BI is named throughout as the sole authority on note authenticity.
- Static site, GitHub Pages, `output: 'export'`, no backend, no runtime network, self-hosted fonts.
- Legal basis: UU 7/2011 Pasal 24 ayat (1) — the educational exemption permitting Rupiah imitation with the word *spesimen* applied. Violation carries up to one year and a Rp200 million fine; this is the one risk in the repository with a criminal penalty attached. Pasal 24 ayat (2) separately bars distributing *Rupiah Tiruan* — the reason no export path ever emits a full note.
- No published BI rule on reproduction size was found; the project adopts the stricter size/marking conditions other central banks specify rather than assume none apply (`docs/bi-reproduction-guidance.md`). A drafted enquiry to BI exists but has not been sent (`docs/surat-bank-indonesia.md`).
- Ten denominations covered (TE 2022, plus the three largest of TE 2016). Eight mechanisms: watermark, security thread, rectoverso, intaglio, colour-shift, microtext, UV, blind code.
- Licensing is intentionally asymmetric: code MIT, artwork/written content CC BY-NC-SA 4.0 — the schematics exist under a purpose-bound legal exemption, so a permissive artwork licence would invite reuse the project cannot vouch for.

## Capabilities and Constraints

- **Explains checking, never manufacturing.** Explainers describe what a genuine feature does and what to observe — never ink chemistry, substrate composition, process parameters, or how a counterfeit might approximate a feature. If a sentence would help someone produce a convincing fake rather than spot one, it does not ship.
- **No authenticity verdict of any kind.** No scanner, no camera, no upload, no comparison tool, no score, no "is this real" path anywhere. Bank Indonesia is named as the authority.
- **No photographs of banknotes anywhere in the repository.** All note artwork is original authored SVG; a build-time asset check enforces this (raster imagery permitted only for brand assets pinned by SHA-256).
- **SPESIMEN is baked into schematic artwork's own path geometry**, never an overlay, pseudo-element, or positioned layer — survives screenshots, cannot be hidden. Every rendered schematic is asserted to carry it, build-gated.
- **Schematics are never photorealistic and never near actual size** — capped below 70% of real banknote dimensions, asserted every build.
- **No export path emits a full note at any resolution.** Sharing/export produces mechanism diagrams only.
- **The touch check (*diraba*) is stated as a screen limitation, never simulated.** No haptics, no texture animation; the copy tells the reader to go find a real note.
- **Zero runtime network requests** — no font CDN, no analytics, no remote assets, no fetch/socket/camera in shipped source (enforced by `source-policy` compliance check).
- **Every factual claim (feature, denomination, biography, motif) carries a citation** to Bank Indonesia or a published source; build fails without one. Where no citable source exists, the gap is stated on the page rather than filled in — two hero biographies (Djuanda Kartawidjaja, Idham Chalid) are deliberately left unwritten because the *Ensiklopedi Pahlawan Nasional* (1995) omits them.
- JS budget: first load ≤ 200 KB gzipped (currently ~87 KB, including a hand-written WebGL quad runner rather than three.js, specifically to stay inside budget).
- No coin coverage, no exchange rates/conversion, no accounts, no ML, no image-processing libraries — none have a legitimate use here.

## Brand Commitments

- Name: **Anatomi Rupiah**.
- Not affiliated with Bank Indonesia; no government branding; nothing should read as official issuance or endorsement. (Noted risk: an ASN — civil servant — publishing about currency law under their own name; mitigated by plainly educational framing and prominent marking.)
- BI's own vocabulary used throughout, in identifiers and UI, untranslated: *dilihat, diraba, diterawang, benang pengaman, tanda air, gambar saling isi, kode tuna netra*.
- Owner/builder: Andi Fathul Mukminin Salahuddin, credited in the README footer.

## Evidence on Hand

- `PRD.md` — full product/legal/design rationale, already comprehensive.
- `docs/bi-reproduction-guidance.md` — the size/marking research and reasoning.
- `docs/surat-bank-indonesia.md` — drafted (unsent) enquiry to BI.
- `docs/content-review-checklist.md` — the §4 "check vs. manufacture" review pass, required before release.
- Rupiah-specific claims cite Bank Indonesia: per-denomination *Peraturan Bank Indonesia* for Tahun Emisi 2022 (24/8–24/14/PBI/2022) and BI's *Gambar Uang* catalogue. Optics claims cite Hecht's *Optics* and van Renesse's *Optical Document Security*. Blind-code counts cite Pertuni (the association BI consulted). Biographies cite the *Ensiklopedi Pahlawan Nasional* (1995).
- No testimonials, customer logos, or usage analytics exist or should be fabricated — this is a personal open-source educational project, not a product with customers.

## Product Principles

1. **Check-oriented, never manufacture-oriented.** Every explainer answers "how do you verify this" and never "how is this made" — reviewed by hand before each release, not just by the validator.
2. **Illustrate mechanisms; never reproduce notes.** Drawing beats photography here both legally and pedagogically — a cross-section explains what a photograph can't.
3. **BI is the only authority on authenticity.** The product's role is durably limited to teaching features, never to rendering a verdict.
4. **Admit what the medium can't do.** *Diraba* cannot be conveyed through a screen; the product says so plainly rather than faking it with haptics or animation.
5. **No claim without a citation, and no gap silently filled.** An absent source is stated on the page, not papered over.

## Accessibility & Inclusion

No formal WCAG target is committed to; the project follows reasonable accessibility practice (semantic HTML, contrast, keyboard navigation, reduced-motion support). Note: *kode tuna netra* (the blind-touch identification code) is covered as educational *content* for a sighted audience — this is a subject the product teaches, not an accessibility feature of the product's own UI, and the two should not be conflated.
