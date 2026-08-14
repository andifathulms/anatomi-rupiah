import { OVI_FAR, OVI_NEAR } from '@/lib/tokens'

/**
 * The one orchestrated moment — PRD §9. A tilt control sweeps the viewing angle
 * and the hue moves with it.
 *
 * This is a *demonstration of the principle*, not a reproduction of any note's
 * ink. The two hues are a demonstration ramp, and the page says as much. What
 * is being taught is the relationship: the colour follows your angle.
 *
 * The mixing lives here rather than in the component, both because components
 * do not compute (invariant 12) and because this is the part worth testing.
 */

export const TILT_MIN_DEG = -60
export const TILT_MAX_DEG = 60

/** Refractive index used by the thin-film shader — kept here too so the
 * displayed path difference is computed the same way the pixels are. */
const FILM_REFRACTIVE_INDEX = 1.45

interface Rgb {
  readonly r: number
  readonly g: number
  readonly b: number
}

function parseHex(hex: string): Rgb {
  const value = Number.parseInt(hex.slice(1), 16)
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 }
}

function toHex(rgb: Rgb): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)))
  return `#${((1 << 24) | (clamp(rgb.r) << 16) | (clamp(rgb.g) << 8) | clamp(rgb.b))
    .toString(16)
    .slice(1)
    .toUpperCase()}`
}

const NEAR = parseHex(OVI_NEAR)
const FAR = parseHex(OVI_FAR)

export function clampTilt(deg: number): number {
  if (!Number.isFinite(deg)) return 0
  return Math.max(TILT_MIN_DEG, Math.min(TILT_MAX_DEG, deg))
}

/**
 * How far from head-on the viewer is, 0 to 1. The path difference through a
 * thin layer grows with the angle, so the mix follows |angle| rather than its
 * sign — tilting either way moves the colour the same distance.
 */
export function tiltFraction(deg: number): number {
  return Math.abs(clampTilt(deg)) / TILT_MAX_DEG
}

export function colourAtAngle(deg: number): string {
  const t = tiltFraction(deg)
  return toHex({
    r: NEAR.r + (FAR.r - NEAR.r) * t,
    g: NEAR.g + (FAR.g - NEAR.g) * t,
    b: NEAR.b + (FAR.b - NEAR.b) * t,
  })
}

/** Skew of the demonstration shape, so the plane visibly turns with the angle. */
export function skewForAngle(deg: number): number {
  return clampTilt(deg) * 0.35
}

/**
 * The optical path difference between the two reflections, at the centre of
 * the patch — the actual number the shader's per-pixel colour comes from
 * (THIN_FILM_FRAGMENT in lib/webgl/shaders.ts), not a separate estimate.
 * Same trig, same refractive index, same thickness; shown here as text
 * because the shader only ever draws it as a colour.
 */
export function pathDifferenceNm(deg: number, thicknessNm: number): number {
  const incidence = (clampTilt(deg) * Math.PI) / 180
  const sinT = Math.sin(incidence) / FILM_REFRACTIVE_INDEX
  const cosT = Math.sqrt(Math.max(0, 1 - sinT * sinT))
  return 2 * FILM_REFRACTIVE_INDEX * thicknessNm * cosT
}
