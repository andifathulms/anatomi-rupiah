---
target: site-wide (all pages)
total_score: 27
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-14T04-03-50Z
slug: site-wide-all-pages
---
Method: dual-agent (A: a6fd2dfbbeacab15d · B: a7b7459339eac69b2)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Sheet's on-note numbered markers give no cue they're inert (see P1 below); everything else (aria-pressed, aria-current, aria-live) is solid. |
| 2 | Match System / Real World | 4 | BI's own vocabulary used untranslated even in English; engraver's-callout numbering; proof-sheet metaphor realized consistently. |
| 3 | User Control and Freedom | 3 | Locale toggle, note switcher, loupe deselect all work; no "back to top" on long pages, no obvious way to close an open loupe panel besides reselecting. |
| 4 | Consistency and Standards | 4 | Channel-color taxonomy and sharp-or-pill shape rule hold everywhere checked. |
| 5 | Error Prevention | 3 | `notFound()` guards on dynamic params; no forms exist, which is the strongest form of prevention by omission. |
| 6 | Recognition Rather Than Recall | 3 | Channel legend reinforced by border color throughout — but Lembar's 10 denomination pills are undifferentiated, forcing recall. |
| 7 | Flexibility and Efficiency | n/a | Read-mode explainer site, no accounts/saved state/power-user path to score. |
| 8 | Aesthetic and Minimalist Design | 4 | DESIGN.md's restraint followed faithfully; no decorative glass/gradient/glow found anywhere read. |
| 9 | Error Recovery | 3 | No error states are exercised (no forms/fetches); the one real edge case — unwritten Tokoh biographies — is handled as a stated, sourced gap rather than a broken card. |
| 10 | Help and Documentation | n/a | A static explainer's content *is* its documentation; no separate help system is needed or present. |
| **Total** | | **27/32** | **Good (84%)** |

## Design Specificity Verdict

**LLM assessment**: Unmistakably purpose-built, not a reskinned template. The "Engraving Proof Sheet" concept is enforced structurally, not decoratively — SPESIMEN is baked as sibling SVG paths in the same coordinate space as the note outline (not CSS), the four checking-channel colors are wired through a shared type in nearly every content-touching file, and the hand-rolled WebGL thin-film shader computes real interference rather than faking a color sweep. A generic template could not produce the engraver's-callout numbering or a component whose entire justification is a statutory citation. The one generic bone in the skeleton is the top-level IA shape itself (hero → 3-up value props → CTA cards is a conventional marketing layout), but everything poured into that shape is specific to this project.

**Deterministic scan**: `detect.mjs --json app components` — exit 2, 11 findings (9 warning, 2 advisory). All 9 warnings are the same `side-tab` pattern (`border-l-4`), flagged as "the most recognizable tell of AI-generated UIs," spread across `ciri/[feature]/page.tsx` (×2), `hukum/page.tsx`, `page.tsx` (home), `tigad/page.tsx` (×3), `tunanetra/page.tsx`, and `components/sheet/Sheet.tsx`. Assessment B verified every instance against source and confirmed all are genuine one-sided accent borders — no false detections. But cross-referencing against DESIGN.md shows this is **not** the decorative AI-slop pattern the rule is built to catch: DESIGN.md's Components section explicitly documents "a heavier 4px accent border (`border-t-4` / `border-l-4`) keyed to a channel colour when the card represents that channel" as an intentional taxonomy device, and one instance (`Sheet.tsx:109`) is load-bearing selected-state UI on a toggle button, not decoration at all. This is the clearest case in the run of the detector and the design system disagreeing, and the design system's own documentation wins — see "Detector vs. design review" below. The two advisory findings are non-issues on inspection: `globals.css:34`'s "off-scale radius" is the `:focus-visible` outline's corner rounding (an accessibility affordance, not a shape choice), and `globals.css:130`'s "undocumented `#000`" is scoped entirely inside `@media print` (`body { color: #000 }`), never part of the live visual system DESIGN.md governs.

**Visual overlays**: Not available this run — no browser-automation tool is exposed in this session and `puppeteer` is not installed (`detect.mjs`'s URL-scan mode failed with `Error: puppeteer is required for URL scanning`), so no rendered screenshot or in-page overlay exists to show you. Assessment B substituted `curl`-based structural HTML inspection (heading order, ARIA landmarks, alt text, inline styles) across four representative routes as a fallback signal — see Run Notes.

### Detector vs. design review

Where they agree: neither flagged the same false positive — Assessment A never mentioned `border-l-4` as a problem, because in context every instance reads as intentional (channel accents, honest-limitation asides, a blockquote, selected state), matching DESIGN.md verbatim. Where the detector adds signal the design review didn't: the sheer count (9 instances, 8 files) is worth a second look even if each is individually justified — it's approaching "reach for `border-l-4` by default" territory, and Assessment A's own read of `Sheet.tsx:109` (the selected-state marker button) independently flagged that this one specific usage overloads a taxonomy-accent visual language with a *different* meaning (interactive state) than the other 8 (static channel identity). That's a real, if minor, "Consistency and Standards" nuance neither assessment alone stated as sharply as the two combined: the same 4px-left-border grammar is currently doing two jobs (channel taxonomy *and* selection state) with no visual distinction between them.

## Overall Impression

This is a disciplined, legally-literate, genuinely well-crafted educational site — the compliance engineering (baked SPESIMEN, ink-only shadows, the taxonomy palette) is followed all the way into component code, not just documented. The gap is that its most distinctive interaction — the loupe on Lembar, the "signature view" per PRD §6.1 — is also its weakest onboarding moment: a 10-way undifferentiated denomination choice and a set of on-note markers that look clickable but aren't. The biggest opportunity is bringing Lembar's opening state up to the same care evident everywhere else on the site.

## What's Working

- **SPESIMEN as structural fact, not styling.** `components/sheet/Schematic.tsx` and `components/loupe/Loupe.tsx` author the legal mark as a sibling `<path>` in the same coordinate space as the note outline, using inline presentation attributes specifically so it survives even a failed stylesheet — a legal requirement turned into careful engineering rather than a passing test.
- **Edge cases as content, not gaps.** `app/[locale]/tokoh/page.tsx` states the two unwritten hero biographies as a sourced editorial decision rather than papering over them — the site's citation discipline extends to what it deliberately doesn't say.
- **Motion spent on exactly one thing.** `components/channel/TiltDemo.tsx` computes real thin-film interference per pixel (not a faked CSS gradient sweep) with a graceful SVG fallback — the single feature PRD designates as worth animating is the only place real animation happens.

## Priority Issues

- **[P1] Schematic markers look interactive but aren't.** `components/sheet/Schematic.tsx` draws numbered circles directly on the note SVG with no click handler or cursor affordance, while the visually identical numbered-badge motif (`callout-number`, filled circle, index digit) is a real, working control everywhere else on the site (the margin marker list in `Sheet.tsx`, step numbers in `MechanismFigure.tsx`). A first-time visitor's most natural move — tapping the numbered dot on the drawing itself — does nothing, and the markers already carry `data-marker={marker.featureId}`, so the plumbing to wire them up is nearly in place. **Why it matters**: this is the site's signature interaction; a dead-feeling tap on first contact reads as broken, not restrained. **Fix**: wire the on-note markers to the same selection handler as the margin list, or visually differentiate them (no fill, thinner stroke) so they read as reference marks rather than buttons. **Suggested command**: `$impeccable clarify` (affordance/labeling) or `$impeccable layout` (if the fix is wiring interaction, `$impeccable shape` first).

- **[P1] Ten-way undifferentiated choice opens the signature screen.** `components/sheet/Sheet.tsx` (lines 59-78) renders all 10 denominations as one flat row of identical pills before the reader has any orientation, on the exact page PRD §6.1 calls the site's signature view. **Why it matters**: the general-public audience PRODUCT.md names (people who recite the 3D words but don't know the physics) is asked to make the highest-cardinality unstructured decision on the site before being taught anything — backwards for an entry point. **Fix**: group by emission year (TE 2022 vs. TE 2016, which the data model already distinguishes), or default-select the richest note (already named elsewhere in the codebase — `tigad/page.tsx` calls out `seratus-ribu-2022`) and demote the switcher to a secondary control. **Suggested command**: `$impeccable layout`.

- **[P2] The site's emotional peak is misplaced.** The *diraba* admission — PRD §9's own proudest claim ("a web app admitting the limits of its medium is rare") — sits as an inline aside mid-walkthrough (`app/[locale]/tigad/page.tsx` lines 120-128), while the page's actual closing section is a legal-authority disclaimer already repeated in the footer on every page. **Why it matters**: peak-end rule — the session's most distinctive, human moment is currently subordinated to a legally-necessary but emotionally flat disclaimer. **Fix**: reorder so the honest-limitation beat closes the page, or at minimum give it equal visual weight to the verdict card. **Suggested command**: `$impeccable layout`.

- **[P2] Loupe result has no scroll or focus management.** Selecting a marker in `Sheet.tsx`'s margin list reveals new content via `aria-live="polite"`, but nothing scrolls it into view or moves focus. **Why it matters**: on the full note-plus-marker-list layout, sighted users scrolled past the loupe section get no visible change ("I clicked, nothing happened"), and screen-reader users are announced content they can't see — an incomplete live-region pattern for the site's primary interaction. Compounded on mobile, where the loupe's 3-column grid collapses to a long single stack. **Fix**: scroll the loupe region into view (respecting `prefers-reduced-motion`) or move focus to its heading on selection. **Suggested command**: `$impeccable audit` (to confirm the a11y contract) then `$impeccable harden`.

- **[P3] Maker credit and legal notice share one footer landmark despite a comment saying they must not.** `components/chrome/SiteFooter.tsx:33` separates `MakerSignature` from the legal marking notice with only a `border-t` inside the same `<footer>` element — a screen-reader user hears one continuous footer region, thinner separation than the code comment's stated intent. **Fix**: give the maker credit its own labelled region, or move it outside the `<footer>` landmark. **Suggested command**: `$impeccable harden`.

- **[P3] `border-l-4` is one grammar doing two jobs.** Across 8 static channel-accent usages and 1 interactive selected-state usage (`Sheet.tsx:109`), the same 4px-left-border visual carries two different meanings with no distinction — see "Detector vs. design review" above. **Fix**: give the selected-state button a visually distinct treatment (e.g. background fill in addition to the border) so channel-identity and selection-state don't collide. **Suggested command**: `$impeccable layout`.

## Persona Red Flags

**Jordan (first-timer)**: Fails at the Lembar 10-denomination wall (nothing on first paint indicates which note to pick or why) and at the schematic-marker affordance mismatch (tapping the drawing itself produces no feedback — reads as broken, not restrained).

**Sam (accessibility-dependent)**: Mostly well-served — skip link present, `aria-live` regions, `aria-pressed` states, `sr-only` locale label preserved rather than `hidden`, and the WCAG-AA recontrast of `engraving-faint` documented in `lib/tokens.ts`. The real miss is the loupe focus-management gap (P2): an `aria-live="polite"` announcement fires for a region that isn't brought into view or focus — a functionally incomplete live-region pattern for the primary interaction.

**Casey (mobile)**: `AnatomyStack.tsx` explicitly scales for narrow viewports and the nav stays visible and horizontally-scrollable rather than hiding behind a hamburger — deliberate mobile-aware decisions, not afterthoughts. Risk area: the Lembar denomination row and the loupe's 3-column grid collapsing to a long single-column stack on mobile compound the P2 focus-management gap exactly where scroll-and-lose-context is most likely.

**General cash-handling adult (project-specific, from PRODUCT.md)**: The audience PRODUCT.md names — recites the 3D words, doesn't know the physics, no special training — is served unusually well by the content layer (cross-sections, plain "what to observe" language, the honest diraba admission) but underserved by Lembar's entry state specifically: someone who doesn't already know which denomination they're holding is asked to make a 10-way recall decision before the site has taught them anything. Home's anatomy-stack hero and Ciri's channel legend both onboard this persona better than the page PRD calls the signature view.

## Minor Observations

- `SiteHeader.tsx`: `aria-label` duplicates the visible `title` tooltip text on every nav link — verbose across 7 consecutive links, not incorrect.
- Two coexisting arrival-motion mechanisms (`animate-lift-in` CSS class vs. the `Reveal` IntersectionObserver component) with no obvious rule for which is used where.
- `tokoh/page.tsx` mixes real photographs (hero portraits, motif credits) into an otherwise all-illustration site — correctly scoped as a different asset class under CLAUDE.md (not note artwork), but visually the one place the site's "no photograph" impression could be misread without reading the fine print.
- `lembar/[denomination]/page.tsx` has disciplined `print:hidden` on nav/back-link/hints, consistent with the compliance requirement that print output never approach a full note.
- Nav label for `tunanetra` stays untranslated in English (correct per CLAUDE.md's BI-vocabulary rule) but is the one nav item with no plain-English clue at all without hovering the `title` hint — worth knowing, not necessarily worth changing.

## Questions to Consider

- Lembar is named the "signature view" in the PRD, yet its entry state is the single highest-cognitive-load moment on the site — was it tested against Ciri's index, which solves "many items, channel-coded" more gracefully?
- The schematic's numbered dots share the exact visual grammar as every actually-clickable badge elsewhere on the site — was that collision noticed and accepted, or is it simply untested by clicking the drawing itself?
- Was closing Tigad on the legal-authority disclaimer (already stated in every page's footer) a deliberate legal-safety call, or an artifact of building the three steps sequentially without revisiting the ending?
- Does the site assume a Home → Ciri/Tigad → Lembar reading order anywhere, given how much better-onboarded that path leaves a first-time visitor than landing on Lembar directly — and if so, should the nav or IA make that order more explicit?
