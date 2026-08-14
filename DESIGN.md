---
name: Anatomi Rupiah
description: A banknote security-feature explainer drawn as an engraving proof sheet — mechanisms illustrated, notes never reproduced.
colors:
  proof: "#EFEBE1"
  proof-deep: "#E4DFD2"
  proof-edge: "#D6D0BF"
  engraving: "#1A1F26"
  engraving-soft: "#3D454F"
  engraving-faint: "#626870"
  dilihat: "#2C6E75"
  dilihat-tint: "#E8F0F0"
  dilihat-deep: "#1D4B50"
  diraba: "#9A6B45"
  diraba-tint: "#F4EBE3"
  diraba-deep: "#6B482E"
  diterawang: "#C08A2E"
  diterawang-tint: "#F7EFDC"
  diterawang-deep: "#8A6115"
  mesin: "#6B4FA8"
  mesin-tint: "#EEEAF7"
  mesin-deep: "#4A3577"
  spesimen: "#A8443A"
  inspect: "#14181E"
  inspect-soft: "#1F252E"
  inspect-edge: "#2C3540"
typography:
  display:
    fontFamily: "Brygada 1918, Georgia, serif"
    fontSize: "clamp(2.75rem, 1.6rem + 5.2vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Brygada 1918, Georgia, serif"
    fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.015em"
  section:
    fontFamily: "Brygada 1918, Georgia, serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1.2vw, 2.125rem)"
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Space Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.24em"
  numeric:
    fontFamily: "Space Mono, ui-monospace, monospace"
    fontSize: "1rem"
    fontWeight: 400
rounded:
  sharp: "0px"
  logo: "6px"
  focus-mark: "3px"
  pill: "9999px"
spacing:
  xs: "0.25rem"
  sm: "1.25rem"
  md: "1.5rem"
  lg: "1.75rem"
  xl: "2.5rem"
components:
  card:
    backgroundColor: "{colors.proof}"
    textColor: "{colors.engraving}"
    rounded: "{rounded.sharp}"
    padding: "24px"
  card-interactive-hover:
    backgroundColor: "{colors.proof}"
    textColor: "{colors.engraving}"
    rounded: "{rounded.sharp}"
  nav-pill:
    backgroundColor: "transparent"
    textColor: "{colors.engraving-soft}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  nav-pill-active:
    backgroundColor: "{colors.engraving}"
    textColor: "{colors.proof}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  locale-toggle:
    backgroundColor: "{colors.proof-deep}"
    textColor: "{colors.engraving}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
---

# Design System: Anatomi Rupiah

## Overview

**Creative North Star: "The Engraving Proof Sheet"**

The material world is a printer's proof sheet pulled fresh from an intaglio press: heavy off-white stock, dense black line-work, registration marks sitting in the margin, a loupe resting nearby waiting to be picked up. This is not a metaphor borrowed for flavour — banknote design *is* engraving, and the site's entire visual language (paper-toned ground, ink-coloured shadows, mechanical monospace lettering, a magnifying loupe as the primary interaction) commits to that fact rather than decorating around it.

Depth comes from ink and paper, never from glass and glow. There is no gradient-mesh hero, no frosted-glass card, no neon accent — the one texture in the entire system is a faint repeating line ruling standing in for laid paper, and a soft top-lit vignette standing in for light falling across a desk. Colour is never chosen for mood; it is chosen because it names one of Bank Indonesia's own checking methods (teal for *dilihat*, copper for *diraba*, amber for *diterawang*, violet for the machine/UV channel), plus one colour — spesimen red — reserved entirely for the Pasal 24 legal marking. A reader who never reads a word of copy still learns the taxonomy from the palette alone.

The one deliberate departure from the proof-sheet ground is the **inspection surface**: a near-black panel used only where the subject under discussion is light itself (the UV toggle, the light-table sections). It is not a dark theme — it never spreads beyond those specific panels — it is the physically correct setting for "look at what only shows up when the room goes dark."

**Key Characteristics:**
- Off-white proof stock as the constant ground; near-black ink as the constant figure.
- Four checking-method colours, used as taxonomy, never as decoration; spesimen red used for nothing but the legal mark.
- Flat by default — shadows read as ink pooling under stock, not glass elevation, and appear only as a response to hover/focus.
- Sharp corners everywhere except two exceptions: circular pills (nav, tags, the locale toggle) and a handful of small brand/focus marks.
- A serif display face with genuine engraved-historical character; a plain grotesque for reading; a monospace for anything that reads like it was struck on the note itself (denominations, dimensions, citations, labels).
- One and only one orchestrated motion moment (the colour-shift tilt demonstration); everything else is a quiet fade/lift on arrival, and motion is stripped entirely under `prefers-reduced-motion`.

## Colors

The palette is BI's own 3D-method taxonomy given hex values, plus the two structural neutrals (proof stock, engraving ink) that hold everything else in place.

### Primary
- **Engraving Ink** (`#1A1F26`): the site's real "brand colour" — every headline, every rule, every default shadow tint is this near-black, not an accent hue. Two supporting readings exist: **Engraving Soft** (`#3D454F`, secondary text, default nav-pill text) and **Engraving Faint** (`#626870`, captions/hints/citations — deliberately darkened from an earlier `#7A828C` that failed WCAG AA at 3.27:1; this reads at 4.73:1).

### Secondary — the four checking channels
- **Dilihat Teal** (`#2C6E75`): features checked in ordinary light. Tint `#E8F0F0` for panel fills and text-on-tint; deep `#1D4B50` for text on a tinted panel. Also the site's focus-ring colour — the one channel colour allowed outside its taxonomy role, because "look here" is what *dilihat* already means.
- **Diraba Copper** (`#9A6B45`): relief, substrate, anything tactile. Tint `#F4EBE3`, deep `#6B482E`.
- **Diterawang Amber** (`#C08A2E`): features revealed by transmitted light. Tint `#F7EFDC`, deep `#8A6115`. Also the site's text-selection colour (`diterawang/25`) — transmitted light is the closest physical analogue to "light passing through what you've selected."
- **Mesin Violet** (`#6B4FA8`): the fourth channel — machine-readable and UV-only. Tint `#EEEAF7`, deep `#4A3577`.

### Tertiary — reserved, not decorative
- **Spesimen Red** (`#A8443A`): used for nothing except the Pasal 24 ayat (1) marking baked into schematic artwork. It never appears as a UI accent, error colour, or CTA colour — a reader who sees this red anywhere on the site is looking at a legal mark, always.

### Neutral
- **Proof Stock** (`#EFEBE1`): the constant page background and the default surface for cards, header, nav pills at rest.
- **Proof Deep** (`#E4DFD2`): a step darker — hover backgrounds, the locale-toggle chip, secondary surfaces that need to sit visibly on top of proof stock without leaving the paper family.
- **Proof Edge** (`#D6D0BF`): borders and dividers on paper surfaces where `engraving/10` opacity borders aren't in play.
- **Inspect** (`#14181E`), **Inspect Soft** (`#1F252E`), **Inspect Edge** (`#2C3540`): the near-black inspection-surface family, used only on the UV/light-table panels — never as a general dark theme.

### Named Rules
**The Taxonomy Rule.** Dilihat teal, diraba copper, diterawang amber, and mesin violet mean one thing each — a checking method — everywhere on the site. Never repurpose one of these four hues for an unrelated UI state (success/error/warning, a random highlight, a decorative accent).

**The One Red Rule.** Spesimen red is reserved entirely for the Pasal 24 marking baked into schematic artwork. It is never a button colour, an error colour, or a UI accent — its rarity and its single meaning are the point, and it must never be diluted into general use.

**The Ink Shadow Rule.** Every shadow in the system is a tint of engraving ink (`rgba(26,31,38,…)`), never black-on-white glass elevation and never a colour-tinted "glow." Depth reads as ink pooling under paper.

## Typography

**Display Font:** Brygada 1918 (with Georgia, serif fallback)
**Body Font:** Archivo (with system-ui, sans-serif fallback)
**Label/Mono Font:** Space Mono (with ui-monospace, monospace fallback)

**Character:** Brygada 1918 carries genuine engraved-historical weight — it is the one typeface on the site allowed to feel like it belongs on paper stock rather than a screen. Archivo stays completely out of its way for reading and controls: grotesque, even, unremarkable on purpose. Space Mono is reserved for anything that should read as struck lettering on the note itself — denominations, dimensions, serial-style strings, citation headings, eyebrows — never used for ordinary prose.

### Hierarchy
- **Hero/Display** (400, `clamp(2.75rem, 1.6rem + 5.2vw, 5.5rem)`, line-height 0.98, tracking −0.02em): the one-per-page hero headline.
- **Title** (400, `clamp(2rem, 1.4rem + 2.6vw, 3.25rem)`, line-height 1.06, tracking −0.015em): page/section titles below the hero.
- **Section** (400, `clamp(1.5rem, 1.2rem + 1.2vw, 2.125rem)`, line-height 1.15): sub-section headings.
- **Lede** (400, `clamp(1.0625rem, 1rem + 0.5vw, 1.375rem)`, line-height 1.6): the opening paragraph under a headline, sized up from body.
- **Body** (400, `1rem`, line-height 1.6): all prose. `text-wrap: pretty` on paragraphs, `text-wrap: balance` on headings.
- **Label/Eyebrow** (700, `0.6875rem`, line-height 1.4, tracking 0.24em, uppercase, mono): channel labels, citation headings, every eyebrow on the site — one token, not the two near-duplicate arbitrary sizes it replaced.
- **Numeric** (mono, tabular-nums): denominations and dimensions specifically, so figures align in a column the way they would on a printed sheet.

### Named Rules
**The Struck-Lettering Rule.** Space Mono is for things that were "struck," not written: numbers, codes, citations, labels. If a string is conversational prose, it is never mono, regardless of how short it is.

## Layout

Content sits in a `max-w-sheet` (80rem) container for the sheet/anatomy views and a narrower `max-w-prose` (38rem) measure for explainer reading — the proof-sheet metaphor extends to reading width: a sheet is wide, a paragraph on it is not. The header is sticky with a translucent proof-stock backdrop-blur so the nav stays legible over scrolling content without breaking the paper illusion into glass. Density is generous rather than compact — this is an explainer site, not a dashboard; spacing steps run from a 0.25rem micro-gap up through 2.5rem section rhythm, with `sm:`-scaled padding roughly doubling on wider viewports (e.g. card padding `p-7 sm:p-10`).

## Elevation & Depth

Flat by default; shadows exist only as a response to interaction (hover, focus-within), never as resting-state decoration. Every shadow is ink-tinted (`rgba(26,31,38,…)`), never neutral black or colour-tinted, so elevation reads as physical ink pooling under stock rather than glass floating above a surface.

### Shadow Vocabulary
- **Sheet** (`0 1px 2px rgba(26,31,38,0.05), 0 8px 24px -12px rgba(26,31,38,0.18)`): resting elevation for `.card`.
- **Lift** (`0 2px 4px rgba(26,31,38,0.06), 0 18px 40px -18px rgba(26,31,38,0.28)`): hover/focus-within state for `.card-interactive`.
- **Plate** (`0 24px 60px -28px rgba(26,31,38,0.45)`): the heaviest lift, reserved for the most prominent single element on a view (the hero anatomy stack).

### Named Rules
**The Ink-Not-Glass Rule.** See Colors — restated here because it governs this section directly: no neutral-black or colour-tinted shadows, ever.

## Shapes

Sharp corners are the default and the statement: proof stock doesn't get die-cut edges. The only rounding in the system is functional, not decorative — a `rounded-full` pill for anything that behaves like a chip or a toggle (nav items, the locale switch, channel tags), and two small fixed radii (`6px` on the header logo tile, `3px` on the anatomy-hero focus mark) sized to specific small assets rather than a general card radius. No card, panel, image frame, or button in the system uses a mid-size border-radius (8–16px) — that middle ground doesn't exist here; a shape is either sharp stock or a full pill, nothing in between.

### Named Rules
**The Sharp-or-Pill Rule.** Every shape resolves to one of exactly two corner treatments: 0px (paper) or `rounded-full` (a token/chip/toggle). Reaching for an 8–16px "soft card" radius breaks the system.

## Components

Precise and restrained: nothing on this site is trying to look tappable or exciting on its own terms. Interactive elements state their affordance through a border, a background swap, or an ink-tinted shadow lift — never through scale, glow, or colour saturation spikes.

### Buttons / Links-as-Actions
The site has no dedicated `<button>` component in the visual sense — actions are links styled per-context (nav pills, the interactive card itself, the locale toggle). Treat these three as the button family:
- **Nav pill (default):** transparent background, `engraving-soft` text, `rounded-full`, `hover:bg-proof-deep hover:text-engraving`.
- **Nav pill (active):** `engraving` background, `proof` text, `rounded-full`, no hover state (it's the current page).
- **Locale toggle:** `proof-deep` background, `engraving` text, bordered (`engraving/30`), mono uppercase label, `rounded-full`, hover inverts to solid `engraving` background with `proof` text.

### Cards / Containers
- **Corner Style:** sharp, 0px — no exceptions for cards.
- **Background:** `proof` stock, occasionally a channel tint (e.g. `diraba-tint/50`) for a callout card, or a wash keyed to a feature's channel.
- **Shadow Strategy:** `.card` rests at Sheet elevation; `.card-interactive` lifts to Lift elevation on hover/focus-within, with the transition on `shadow` only (200ms).
- **Border:** hairline, `engraving/10`, or a heavier 4px accent border (`border-t-4` / `border-l-4`) keyed to a channel colour when the card represents that channel.
- **Internal Padding:** `p-6` as the default, stepping to `p-7 sm:p-10` for the most prominent single-card callouts.

### Navigation
Sticky header, translucent proof-stock backdrop (`bg-proof/85 backdrop-blur-sm`), horizontally scrollable rather than collapsed behind a hamburger — the deliberate choice for a seven-item nav that fits a visible row. Active state is a solid engraving-ink pill; inactive items are text-only until hover, when they pick up a `proof-deep` background. The locale switch sits at the far end as its own bordered pill, distinct in treatment from the route items so it never reads as an eighth destination.

### The Loupe (signature component)
The magnification interaction that gives the sheet view its name: selecting a feature marker opens that region under a loupe **beside** the schematic rather than over it, so context and magnified detail stay visible at once. This is the one place the site's restraint yields to its central idea — the loupe is the interface, not a modal escape hatch from it.

### Mechanism Diagrams
Authored SVG cross-sections that carry their own opt-in animation class (`.mech .rays path`) rather than animating by matching a shared stroke colour — a security thread and a light ray can share a hue without accidentally sharing motion. Every mechanism figure that touches note geometry carries the SPESIMEN mark baked into its own path structure, never as an overlay.

## Do's and Don'ts

### Do:
- **Do** treat the four channel colours (teal/copper/amber/violet) as a fixed vocabulary — reuse them only to mean *dilihat/diraba/diterawang/mesin*, never for generic UI state.
- **Do** keep every shadow an ink tint of `rgba(26,31,38,…)` at the documented Sheet/Lift/Plate stops.
- **Do** resolve every new shape to 0px or `rounded-full` — nothing in between.
- **Do** reserve Space Mono for struck lettering (numbers, codes, citations, labels), and Brygada 1918 for headline-scale display only.
- **Do** author the SPESIMEN mark into a schematic's own path geometry when adding new note-like artwork — never as a CSS layer or overlay (CLAUDE.md invariant 1; this is a legal requirement, not a style choice).

### Don't:
- **Don't** introduce spesimen red anywhere except the baked legal mark — not as a button, not as an error state, not as an accent.
- **Don't** add a glass/frosted/glow treatment anywhere outside the header's translucent backdrop-blur, which exists for legibility over scroll, not for aesthetic glass.
- **Don't** add a mid-size border-radius (8–16px) to any card, panel, or image frame; it breaks the Sharp-or-Pill rule.
- **Don't** use the inspection surface (near-black `#14181E` family) as a general dark theme — it belongs only to panels where the subject is literally light (UV, light-table).
- **Don't** animate anything beyond the one orchestrated colour-shift tilt moment and quiet arrival fades; `prefers-reduced-motion` must strip all of it, and no simulated-touch/haptic animation may ever be added for *diraba* (CLAUDE.md invariant 9).
