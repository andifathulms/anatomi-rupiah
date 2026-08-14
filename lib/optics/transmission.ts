/**
 * Transmitted-light brightness through a substrate of varying thickness —
 * the watermark mechanism, computed the same way LIGHT_TABLE_FRAGMENT draws
 * it (lib/webgl/shaders.ts: thickness() and the Beer-Lambert exp(-2.6 * t)
 * term), so the percentage shown next to the demo is the same arithmetic
 * producing the pixels, not a separate estimate.
 */

const LENS_CENTRE = { x: 0.38, y: 0.5 }
const RING_CENTRE = { x: 0.68, y: 0.5 }
const RING_RADIUS = 0.13

/** Substrate thickness at a point: base sheet, a soft lens, and a ring. */
export function thicknessAt(x: number, y: number): number {
  const base = 1.0
  const lensDistSquared = (x - LENS_CENTRE.x) ** 2 + (y - LENS_CENTRE.y) ** 2
  const lens = 0.85 * Math.exp(-14.0 * lensDistSquared)
  const ringR = Math.hypot(x - RING_CENTRE.x, y - RING_CENTRE.y)
  const ring = 0.55 * Math.exp(-500.0 * (ringR - RING_RADIUS) ** 2)
  const grain = 0.04 * Math.sin(x * 90.0) * Math.sin(y * 70.0)
  return base - lens - ring + grain
}

/** Beer-Lambert: transmission falls exponentially with thickness. */
export function transmissionAt(x: number, y: number): number {
  const t = Math.min(2.0, Math.max(0.0, thicknessAt(x, y)))
  return Math.exp(-2.6 * t)
}
