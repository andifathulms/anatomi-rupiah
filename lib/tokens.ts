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
export const ENGRAVING_FAINT = '#7A828C'

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
