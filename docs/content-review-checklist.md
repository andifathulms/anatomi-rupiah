# Content review checklist

Run before every release, and in the PR for every new or edited explainer.
PRD §8 asks for a documented pass; this is it. The automated register screen in
`lib/content/validate.ts` runs first and catches the obvious cases — this pass
catches the rest, which is the reason it is done by a person.

## 1. The §4 question, written down

For **every sentence** added or changed, answer in the PR:

> Does this sentence help someone **check** a note, or help someone **make** one?

A sentence survives only if the answer is *check*. If the answer is "both", it
does not ship in that form.

Reject on sight:

- [ ] Any material composition — substrate, fibre, ink, coating.
- [ ] Any process parameter — temperature, pressure, tolerance, sequence, tooling.
- [ ] Any dimension, resolution figure, or threshold that a reproduction would
      need to hit. "Too small to read unaided" teaches the check; a number in
      microns teaches the target.
- [ ] Any account of how a counterfeit approximates a feature, however framed —
      including "counterfeits usually get X wrong" stated with enough precision
      to be a specification.
- [ ] Any supplier, equipment, or technique name that functions as a pointer.

## 2. No authenticity verdict

- [ ] No sentence judges a specific note. The site describes what a genuine
      feature does; it never says a note is real or fake.
- [ ] Bank Indonesia is named as the authority wherever the question arises.
- [ ] No comparison, scoring, checklist-with-a-result, or "if three of these
      pass then…" construction.

## 3. Citations

- [ ] Every claim carries at least one citation that a reader can follow.
- [ ] Rupiah-specific claims cite Bank Indonesia, not a news summary of BI.
- [ ] Where a source could not be found, the gap is stated on the page rather
      than filled in. Check that any previously stated gap is still accurate.
- [ ] Citation `accessed` dates refreshed if the source was re-checked.

## 4. The honest limits

- [ ] *Diraba* is stated as impossible through a screen, and nowhere simulated —
      no haptics, no texture animation, no "feel this" affordance.
- [ ] Any check requiring equipment says so, and does not imply the screen
      substitutes for the equipment.
- [ ] Demonstrations are labelled as demonstrations of a principle, not as
      reproductions of a note's behaviour.

## 5. Artwork

- [ ] No photograph, and no raster asset of any kind.
- [ ] No schematic drawn toward realism. Reductive is the requirement.
- [ ] Every schematic and every loupe view carries the baked mark — confirm the
      gate ran, do not confirm by eye alone.
- [ ] Any new artwork carries callout numerals only, so one drawing serves both
      languages.

## 6. Gates

- [ ] `pnpm test:run`
- [ ] `pnpm compliance:check`
- [ ] `pnpm content:validate`
- [ ] `pnpm typecheck` and `pnpm lint`
- [ ] `pnpm build` then `pnpm preview`, checked under the production basePath.

## 7. Legal posture

- [ ] `docs/bi-reproduction-guidance.md` re-checked if any PBI touching
      Pengelolaan Uang Rupiah has been issued since the last release.
- [ ] `/hukum` still describes accurately what the site does and does not do.
- [ ] No government branding, and nothing that could read as official issuance
      or endorsement.
