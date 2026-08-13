/**
 * The palette, in one place, consumed by both Tailwind and the SVG artwork.
 *
 * PRD §9: colour here is taxonomy, not decoration — each channel hue means one
 * method of checking a note, and spesimen red means the marking and nothing else.
 *
 * Artwork uses these as *inline presentation attributes* rather than classes.
 * That is deliberate. A stylesheet can be disabled; the marking required by
 * UU 7/2011 Pasal 24 ayat (1) must render anyway. Components still never write
 * a raw hex literal — they import the named token from here.
 */

export const PROOF = '#EFEBE1'
export const PROOF_DEEP = '#E4DFD2'
export const PROOF_EDGE = '#D6D0BF'

export const ENGRAVING = '#1A1F26'
export const ENGRAVING_SOFT = '#3D454F'
/** Darkened from the original #7A828C (2026-08-14): that value read at 3.27:1
 * against proof stock, below WCAG AA for the small text it's used for
 * sitewide (captions, hints, citations). This reads at 4.73:1. */
export const ENGRAVING_FAINT = '#626870'

/** Dilihat — visible in ordinary light. */
export const DILIHAT = '#2C6E75'
/** Diraba — relief, substrate, anything tactile. */
export const DIRABA = '#9A6B45'
/** Diterawang — revealed by transmitted light. */
export const DITERAWANG = '#C08A2E'
/** The fourth channel: machine-readable and UV-only. */
export const MESIN = '#6B4FA8'
/** Reserved for the Pasal 24 marking. Never used for anything else. */
export const SPESIMEN_INK = '#A8443A'

/**
 * Demonstration ramp for the colour-shift illustration only.
 *
 * Deliberately outside the channel taxonomy: these two hues mean "the colour
 * moved", not "this is how you check a note". Reusing a channel colour here
 * would teach the palette wrongly. Never use these for UI state.
 */
export const OVI_NEAR = '#1F6F5C'
export const OVI_FAR = '#7A3C6B'

export const CHANNEL_INK = {
  dilihat: DILIHAT,
  diraba: DIRABA,
  diterawang: DITERAWANG,
  mesin: MESIN,
} as const

export type ChannelInk = keyof typeof CHANNEL_INK

/**
 * Lighter and darker readings of each channel hue, for fills, tinted panels,
 * and text on tinted panels. These are the *same* four meanings — a tint of
 * teal still means dilihat. The taxonomy is not diluted by having a range.
 */
export const CHANNEL_TINT = {
  dilihat: '#E8F0F0',
  diraba: '#F4EBE3',
  diterawang: '#F7EFDC',
  mesin: '#EEEAF7',
} as const

export const CHANNEL_DEEP = {
  dilihat: '#1D4B50',
  diraba: '#6B482E',
  diterawang: '#8A6115',
  mesin: '#4A3577',
} as const

/**
 * The inspection surface: the dark ground used where the subject is light
 * itself — the UV panel, the light-table sections. Not a "dark theme"; a
 * different physical situation, which is why it appears only in those places.
 */
export const INSPECT = '#14181E'
export const INSPECT_SOFT = '#1F252E'
export const INSPECT_EDGE = '#2C3540'

/**
 * Hex to a 0..1 RGB triplet, for shader uniforms. Keeps the WebGL panels on
 * the same palette as everything else rather than inventing colours in GLSL.
 */
export function rgbTriplet(hex: string): readonly [number, number, number] {
  const value = Number.parseInt(hex.slice(1), 16)
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255]
}
