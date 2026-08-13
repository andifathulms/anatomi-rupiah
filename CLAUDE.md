# CLAUDE.md — Anatomi Rupiah

Banknote security-feature explainer. Original mechanism illustrations, schematic note outlines marked SPESIMEN, and BI's 3D method taught honestly. Static site, GitHub Pages, no backend, no runtime network.

Read `PRD.md` before starting any task — **§2 and §4 are not optional context, they are the build constraints**.

**Four things shape everything:**

1. **UU 7/2011 Pasal 24 ayat (1) permits imitating Rupiah for education *with the word spesimen applied*.** Violation carries up to a year and a Rp200 million fine. Every note-like rendering carries the mark, baked into the artwork. This is the one risk in this repository with a criminal penalty attached.
2. **Explain how to *check* a feature, never how to *make* one.** If a sentence would help someone produce a convincing fake rather than spot one, it does not ship.
3. **Never render an authenticity verdict.** Authority to determine whether Rupiah is genuine rests with Bank Indonesia. No scanner, no camera input, no "is this real" path.
4. **Illustrate mechanisms; do not reproduce notes.** No photographs anywhere in the repository. Original vector only, schematic, never at actual size.

---

## Stack

- Next.js 14, App Router, `output: 'export'` — static only
- TypeScript, `strict: true`
- Tailwind CSS
- Zod for content schema validation
- Vitest
- pnpm
- **No image processing, no camera, no ML libraries.** None of those have a legitimate use here.
- Fonts via `next/font`, self-hosted.

## Commands

```bash
pnpm dev
pnpm build                  # static export to ./out; runs compliance:check first
pnpm preview                # serve ./out under the production basePath
pnpm test                   # vitest watch
pnpm test:run               # vitest once — before every commit
pnpm compliance:check       # SPESIMEN presence, asset policy, size constraint, export limits
pnpm content:validate       # citation completeness on every claim
pnpm typecheck
pnpm lint
```

`pnpm compliance:check` gates the build and CI. **Never bypass it, never add a flag to skip it, never weaken an assertion in it.**

## Layout

```
app/
  [locale]/                 # id (default), en
    lembar/                 # the sheet — schematic + loupe
    ciri/[feature]/         # mechanism explainers
    tigad/                  # the 3D walkthrough
    tunanetra/              # kode tuna netra
    tokoh/                  # figures and motifs
    hukum/                  # legal + method disclosure
components/
  sheet/                    # schematic, registration marks, margin callouts
  loupe/                    # magnified detail beside context
  mechanism/                # cross-section illustration frames
  channel/                  # 3D method channel indicators
lib/
  spesimen/                 # bakes the mark into schematic artwork. Not an overlay.
  schematic/                # outline geometry, size constraint enforcement
  content/                  # schema, loader, citation validator
art/
  mechanisms/               # authored SVG — cross-sections, exploded views
  schematics/               # authored SVG — note outlines, non-photorealistic
data/
  features/                 # feature definitions + citations
  denominations/            # per-note feature placement + citations
  figures/                  # hero biographies + citations
  motifs/                   # reverse-side subjects + citations
tests/
  compliance/
  content/
```

## Invariants

1. **SPESIMEN is baked into the artwork, never overlaid.** It is authored into the schematic SVG's own path structure so it renders with the note, appears in any screenshot, and cannot be removed by hiding an element or disabling a stylesheet. **Never implement it as a CSS pseudo-element, an absolutely-positioned div, or a separate layer.**

2. **Every schematic carries the mark.** Asserted by test on rendered output. A schematic without SPESIMEN fails the build — no exceptions for "work in progress" or "internal only".

3. **No raster banknote imagery in the repository.** No `.png`, `.jpg`, `.webp` of notes, not in `art/`, not in `public/`, not in tests, not in the README. The asset check enforces it. All note artwork is original authored SVG.

4. **Schematics are never photorealistic and never at actual size.** Render dimensions are constrained away from real banknote dimensions, asserted at build. Schematic is a legal requirement, not an aesthetic preference — do not "improve" it toward realism.

5. **No export path emits a full note.** Sharing and export produce **mechanism diagrams only**. No canvas capture of the schematic, no high-resolution note output, no print stylesheet that renders a full note at scale.

6. **No authenticity determination, anywhere.** No camera access, no image upload, no comparison tool, no scoring, no "looks genuine" language. If a feature request implies verifying a specific note, decline it and cite PRD §2.

7. **Check-oriented language only.** Explainers describe what a genuine feature does and what to observe. **Never ink chemistry, substrate composition, process parameters, printing tolerances, or how a counterfeit might approximate a feature.** This is a content invariant and it is reviewed before every release.

8. **Every claim carries a citation** — features, placements, biographies, motifs. Validator-enforced. If it cannot be cited to Bank Indonesia or a published source, it does not go in.

9. **The touch limitation is stated, never simulated.** *Diraba* cannot be conveyed through a screen. Do not add haptics, do not add a "feel the texture" animation, do not imply the app substitutes for handling a note. Say to go find one.

10. **Colour maps to the checking method, not to decoration.** Teal is *Dilihat*, copper is *Diraba*, amber is *Diterawang*, violet is machine-readable and UV. Spesimen red is the marking and nothing else. A reader learns the taxonomy from the palette — do not reuse these hues for unrelated UI states. See PRD §9.

11. **Zero network requests at runtime.** No font CDN, no analytics, no remote assets.

12. **Nothing is computed in a component.**

## Working style

- **Build the compliance layer first.** M0 exists because the marking, the asset policy, and the size constraint are cheap to build and expensive to retrofit — and getting them wrong is the only failure here that is a criminal matter.
- **Verify BI's own reproduction guidance before shipping any schematic.** The statute grants the exemption; the central bank may specify size ratios and single-sided depiction as most central banks do. M0 blocker.
- **When writing an explainer, ask the §4 question explicitly:** does this sentence help someone check a note, or help someone make one? Write the answer down in the review checklist.
- **When a feature request implies verification, decline and explain.** "Can it tell me if my note is fake" is the most likely request this project will receive, and the answer is no, permanently, with Bank Indonesia named.
- **Draw, don't photograph.** If an illustration is hard, make the drawing better — never reach for a photo of a note.
- **Small increments.** One mechanism, fully illustrated and cited, beats seven sketched.
- **Don't touch `next.config.js`, the Actions workflow, `compliance:check`, or `lib/spesimen` without saying so explicitly.**
- **Never weaken a test to make something pass**, and never a compliance test under any circumstances.

## Conventions

- Named exports; defaults only where Next requires them.
- Discriminated unions for features, channels, and content kinds, keyed on `type`. Exhaustive `switch` with a `never` default.
- No `any`. No non-null `!` in `lib/spesimen` or `lib/schematic`.
- BI's vocabulary in identifiers and UI: `dilihat`, `diraba`, `diterawang`, `benangPengaman`, `tandaAir`, `gambarSalingIsi`, `kodeTunaNetra`, `tintaBerubahWarna`. Do not substitute English approximations.
- Feature ids stable and readable: `tanda-air`, `benang-pengaman`, `gambar-saling-isi`, `kode-tuna-netra`. They appear in URLs.
- Comments cite the BI publication or statute article behind any claim.
- Dimensions in millimetres named `*Mm`, always with the constraint check applied.
- Tabular numerals on denominations and dimensions.
- Tailwind utilities inline; semantic tokens in `tailwind.config.ts` — `proof`, `engraving`, `dilihat`, `diraba`, `diterawang`, `mesin`, `spesimen`. Never raw hex in components.

## Testing rules

- `pnpm test:run` before every commit; `pnpm compliance:check` and `pnpm content:validate` before any commit touching artwork, schematics, or content.
- SPESIMEN presence asserted on every rendered schematic.
- Asset policy asserted: no raster note imagery anywhere in the repository.
- Size constraint asserted: no schematic renders at actual banknote dimensions.
- Export paths asserted: no route emits a full-note image above the resolution threshold.
- Citation completeness asserted on every feature, placement, biography, and motif.
- New explainer → the §4 review question answered in writing in the PR, and a citation for every claim.
- Bug fix → failing test first.

## Deployment

`main` builds and deploys via Actions; compliance and content checks gate it. `basePath` must match the repository name; `.nojekyll` must exist in `out/`. Verify with `pnpm preview` before pushing.

## Framing

The site states that it is a personal educational project relying on the exemption in UU 7/2011 Pasal 24 ayat (1), that all note depictions are schematic and marked spesimen, that it does not and cannot determine whether any particular note is genuine, and that Bank Indonesia holds that authority. Bank Indonesia's own public education material is linked. No OIKN or government branding, and nothing that could read as official issuance or endorsement.

## Current state

M0–M6 built. `pnpm compliance:check`, `pnpm content:validate`, `pnpm test:run`, `pnpm typecheck`, `pnpm lint`, and `pnpm build` all pass; CI gates the Pages deploy on every one of them.

- **M0** — BI reproduction guidance checked and recorded in `docs/bi-reproduction-guidance.md`; baked-SPESIMEN renderer; size constraint; citation schema and validator; eight-check compliance gate.
- **M1** — seven mechanism cross-sections, authored SVG, every claim cited.
- **M2** — the sheet: ten denominations (TE 2022 and the three largest of TE 2016), markers, and the loupe.
- **M3** — the 3D walkthrough with the honest *diraba* ending, and kode tuna netra.
- **M4** — figures and motifs, cited to BI's own Desain Utama record.
- **M5** — the tilt demonstration and the UV toggle.
- **M6** — mechanism-diagram sharing with an export-surface gate, print stylesheet, reduced-motion, and the Actions deploy.

**Open, and deliberately so:**

- Hero biographies are unwritten. The authoritative national-hero sources refuse automated retrieval; an uncited biography does not ship, so the `/tokoh` page states the gap instead of filling it.
- Kode tuna netra is recorded for TE 2016 only. BI's TE 2022 pages do not name it, and `/tunanetra` says so.
- No written confirmation has been sought from Bank Indonesia directly. Worth doing before the project is promoted rather than merely published.

Before any release, work through `docs/content-review-checklist.md` — the §4 pass is a person's job, not the validator's.
