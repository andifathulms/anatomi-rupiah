# PRD — Anatomi Rupiah

**How a banknote is built, drawn as mechanisms rather than photographed as notes — and honest that one of the three checks can't be done on a screen.**

| | |
|---|---|
| **Status** | Draft — pre-implementation |
| **Owner** | Andi Fathul Mukminin Salahuddin |
| **Type** | Personal portfolio project, open source, educational |
| **Deployment** | GitHub Pages (static export, no server, no runtime network) |
| **Language** | Indonesian-first UI; English secondary |
| **Legal basis** | UU 7/2011 Pasal 24 ayat (1) — the educational exemption. See §2. |

*Name: explanatory, as asked. Alternatives: **Ciri Rupiah** (the statute's own word for a banknote's features) and **Rupiah Anatomy**.*

---

## 1. Why this

Bank Indonesia runs a continuous public campaign to teach people the **3D method** — *Dilihat, Diraba, Diterawang* — because cash handling still depends on ordinary people recognising a genuine note. Most Indonesians can recite the three words. Far fewer could say what a watermark physically *is*, why intaglio printing feels raised, or what the security thread is doing inside the paper.

The gap is that existing material shows you *what to look for* and never *why it works*. A photograph of a watermark is a grey patch. A cross-section drawing of how thickness variation in the substrate modulates transmitted light is an explanation — and it's the kind of thing that stays learned.

**And there's a fourth check nobody teaches: the *kode tuna netra*, the raised marks that let blind users identify a denomination by touch.** Almost no sighted Indonesian knows they exist.

## 2. The legal position — this shapes the whole build

**UU 7/2011 Pasal 24 ayat (1)** prohibits imitating Rupiah, *except for educational and/or promotional purposes with the word **spesimen** applied*. Violation carries up to one year and a fine up to Rp200 million.

This project sits squarely in that exemption, but the exemption has conditions and they become engineering requirements:

**Every note-like rendering carries SPESIMEN**, permanently, visibly, and baked into the artwork rather than layered over it — so it survives screenshot and cannot be removed by hiding an element.

**No downloadable full-note images.** Pasal 24 ayat (2) separately prohibits distributing or circulating *Rupiah Tiruan*. On-screen educational display is the carve-out; shipping a print-resolution PNG of a note edges toward manufacturing one. That feature is cut, not deferred.

**No authenticity verdicts.** The authority to determine whether Rupiah is genuine rests with Bank Indonesia. The app teaches features; it never says "your note is real". A scan-and-verify tool would be both legally presumptuous and genuinely harmful when wrong.

**Verify BI's own reproduction guidance before shipping.** The statute grants the exemption; Bank Indonesia may additionally specify size ratios and single-sided depiction, as most central banks do. A check at M0, not a formality.

## 3. The design consequence

**Illustrate the mechanisms; do not reproduce the notes.**

A cross-section of how intaglio ink sits proud of the substrate, a diagram of how a security thread is woven in, an explanation of why colour-shifting ink changes hue with viewing angle — **none of that is imitation in any meaningful sense.** It's physics, drawn. It also teaches far better than a photograph.

Where note-like layout is needed to show *where* a feature sits, use a **deliberately schematic outline** — not photorealistic, not at actual size, marked SPESIMEN. Enough to orient, never enough to pass for the thing.

**The repository contains no photographs of banknotes.** Every illustration is original vector work.

## 4. The line that must not be crossed

Explaining how a security feature **works, and how to check it**, is education.
Explaining how a feature is **manufactured in replicable detail, or how a counterfeit might approximate it**, is uplift.

Every explainer is written check-oriented: what the genuine feature does, what you should observe, what a failure looks like. **Never process parameters, ink chemistry, substrate composition, or defeat techniques.** If a sentence would help someone make a convincing fake rather than spot one, it does not ship.

## 5. Non-goals

- **No authenticity checker, scanner, or verdict of any kind.** §2.
- **No downloadable or print-resolution note images.** §2.
- **No photorealistic rendering and no actual-size rendering.**
- **No counterfeiting-relevant detail.** §4.
- **No exchange rates, no currency conversion, no redenomination commentary.**
- **No coin coverage in v1.** Different manufacturing, different features.
- **No accounts, no server, no runtime network.**
- **No ML.**

## 6. Features

### 6.1 The loupe — signature view
The whole subject is *look closer*, so magnification is the interface. A schematic note with feature markers; selecting one pulls that region out under a loupe at high magnification, with the mechanism diagram alongside.

Microtext, fine guilloche line-work, and rectoverso registration are all things you cannot see until you magnify — and the loupe makes that the experience rather than a caption.

### 6.2 Mechanism explainers
One per feature, drawn in cross-section or exploded view:

- **Watermark and electrotype** — thickness variation modulating transmitted light
- **Security thread** — embedded in the substrate, not printed on it
- **Intaglio** — ink standing proud of the surface, and why it feels raised
- **Colour-shifting ink** — thin-film interference and viewing angle
- **Rectoverso** (*gambar saling isi*) — two half-images on opposite faces registering into one when held to light
- **Microtext** — below the resolution of ordinary reproduction
- **UV-reactive elements** — invisible until excited

### 6.3 The 3D walkthrough
*Dilihat, Diraba, Diterawang*, in BI's own framing, with each feature mapped to its channel — and an honest ending.

**Diraba cannot be done on a screen.** The app says so plainly and tells you to go find a real note and feel the intaglio ridges. A web app admitting the limits of its medium is rare, and it teaches better than a simulation would.

### 6.4 Kode tuna netra
The raised marks that let blind users identify denominations by touch, per note, with their meaning. Under-taught and worth its own section — and it makes the accessibility of the currency itself a subject rather than an afterthought.

### 6.5 The figures
Each denomination carries a national hero. Their stories, cited. Historical facts about public figures — no legal complication, and it's the content layer that gives the project warmth.

### 6.6 Motifs
The regional dance, landscape, and textile motifs on the reverse of each denomination, identified and sourced. Most people carry these daily without knowing what they depict.

### 6.7 Method and legal disclosure
The exemption relied on, the marking applied, what the app deliberately does not do, and BI as the authority on authenticity. Linked from every view, not buried.

## 7. Architecture

Static Next.js 14 App Router export. No backend, no runtime network.

```
feature data (cited)  → mechanism illustration (authored SVG)
denomination data     → schematic outline + feature markers + SPESIMEN (baked)
                      → loupe | 3D walkthrough | figures | motifs
```

**All artwork is original authored SVG.** No raster assets of notes exist in the repository, and a build check enforces it.

**SPESIMEN is part of the artwork, not an overlay.** It is authored into the schematic's own path structure, so it renders with the note, exports with any capture, and cannot be removed by hiding a layer.

**Schematics are never at actual dimensions.** Rendered size is constrained away from 1:1, asserted at build time.

**Feature and denomination data is cited.** Each entry records what it claims and the BI publication or statute behind it. The build fails on an uncited claim.

**No capture or export path produces a full-note image** above a defined resolution. Sharing exports the *mechanism diagram*, never the note.

## 8. Testing

Unusually, most of this suite is legal compliance — which is appropriate, because that is where the real risk sits.

**SPESIMEN presence.** Every rendered schematic is asserted to contain the mark, in the artwork itself. A schematic without it fails the build.

**No note photography.** A repository asset check asserts no raster image files under the note-artwork paths. Original vector only.

**Size constraint.** Schematic render dimensions asserted away from actual banknote dimensions.

**No full-note export.** Every export path asserted to emit a mechanism diagram, never a complete note above the resolution threshold.

**Citation integrity.** Every feature claim, denomination fact, and figure biography carries a source. Build-gated.

**Content review checklist** — a documented pass, run before each release, checking every explainer against §4: does any sentence describe manufacture rather than verification?

## 9. Design direction

The material world is the **engraving proof sheet** — heavy off-white stock, dense black line-work, registration marks in the margin, a printer's loupe resting on it. Authentic, because banknote design *is* engraving: guilloche rosettes, fine parallel hatching, lathe work.

**Palette, mapped to BI's own taxonomy** rather than chosen for looks:

- Proof stock `#EFEBE1`, engraving ink `#1A1F26`.
- **Teal `#2C6E75` — *Dilihat*.** Features visible in ordinary light.
- **Copper `#9A6B45` — *Diraba*.** Relief, substrate, anything tactile.
- **Amber `#C08A2E` — *Diterawang*.** Features revealed by transmitted light.
- **Violet `#6B4FA8` — machine-readable and UV-only.** The fourth channel, beyond the three.
- **Spesimen red `#A8443A`**, reserved for the marking and nothing else.

Four channels, four colours, each meaning one method of checking. A reader learns the taxonomy from the palette without being taught it.

**Type.** **Brygada 1918** for display — a face with genuine engraved-historical character, right for a proof sheet. **Archivo** for controls and prose. **Space Mono** for denominations, serial-style strings, and dimensions, which reads as the mechanical lettering on the notes themselves.

**Structure.** The schematic sits on the sheet with registration marks in the margin. Feature markers are numbered in the margin like an engraver's callouts, and the loupe detail opens beside rather than over — so context and magnification are visible at once.

**Motion.** One orchestrated moment: the colour-shifting ink demonstration, where a tilt control — device orientation on mobile, a slider elsewhere — sweeps the viewing angle and the hue shifts with it. It is the one feature that genuinely animates, and it is the most delightful thing on the notes. The UV toggle is a state change, not a transition.

**Copy.** Indonesian first, in BI's own vocabulary — *Dilihat, Diraba, Diterawang*, *benang pengaman*, *tanda air*, *gambar saling isi*, *kode tuna netra*. The limits are stated in the same plain voice: *"Diraba tidak bisa lewat layar. Ambil uangnya, rasakan cetakan timbulnya."*

## 10. Milestones

| | | |
|---|---|---|
| **M0** | Compliance | Scaffold; baked SPESIMEN render; asset policy check; size constraint; citation schema and validator; BI reproduction guidance verified. **No content yet.** |
| **M1** | Mechanisms | The cross-section illustrations — watermark, thread, intaglio, colour-shift, rectoverso, microtext, UV. |
| **M2** | The sheet | Schematic outlines, feature markers, the loupe. **Ship publicly here.** |
| **M3** | 3D + tuna netra | The walkthrough, the honest touch ending, the blind-code section. |
| **M4** | People and places | Figures and motifs, cited. |
| **M5** | Light | UV toggle, tilt demonstration, device orientation with slider fallback. |
| **M6** | Polish | Sharing of mechanism diagrams, a11y, print stylesheet for the explainers. |

M0 being pure compliance is deliberate. The marking, the asset policy, and the size constraint are cheaper to build first than to retrofit, and getting them wrong is the only failure here with a criminal penalty attached.

## 11. Success criteria

- Every schematic renders with SPESIMEN baked into the artwork, asserted by test.
- No raster banknote imagery anywhere in the repository, asserted by test.
- No export path emits a full note above the resolution threshold.
- Every feature, denomination, and biography claim carries a citation.
- Content review confirms no explainer describes manufacture rather than verification.
- The app renders no authenticity verdict, and says who does.
- The touch limitation is stated plainly rather than simulated.
- Fully offline after first load. JS ≤ 200 KB gzipped.

## 12. Deployment

`output: 'export'`, `basePath` matching the repository name, `.nojekyll` in the output root. Compliance checks gate the deploy. Fonts self-hosted via `next/font`. Verify under the production `basePath` with `pnpm preview` before pushing.

## 13. Risks

| Risk | Mitigation |
|---|---|
| **Reproduction without the required marking.** | SPESIMEN baked into artwork, asserted by test, gated at build. Cheapest possible insurance against the one criminal risk here. |
| **A feature drifting into counterfeiting uplift.** | §4 is binding, with a documented content review before each release. Check-oriented language only. |
| **Drifting into an authenticity verdict.** | No scanner, no camera input, no "is this real" path anywhere. BI named as the authority. |
| **BI reproduction guidance not checked.** | M0 blocker. The statute grants the exemption; the central bank may set additional conditions. |
| **ASN publishing about currency law under their own name.** | Plainly educational framing, marking done properly and prominently, no government branding. Worth a word with someone at OIKN before launch. |
| **Photorealism creeping in for "quality".** | Original vector only, enforced by asset check. Schematic is a requirement, not a style. |
