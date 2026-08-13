import { bakeSpesimen } from '@/lib/spesimen'
import type { PhysicalSize } from './constraint'

/**
 * The loupe — a magnified detail shown *beside* the schematic rather than over
 * it, so context and magnification are visible at once (PRD §6.1, §9).
 *
 * Two rules hold here as firmly as on the sheet itself:
 *
 *  · The loupe never shows a whole note. It renders a region strictly smaller
 *    than the note, so magnifying a detail can never assemble into one.
 *  · The magnified view is artwork too, so it carries its own baked SPESIMEN.
 */

export interface LoupeRegion {
  readonly xMm: number
  readonly yMm: number
  readonly widthMm: number
  readonly heightMm: number
}

/** A region wider than this fraction of the note is no longer a detail. */
export const MAX_REGION_WIDTH_FRACTION = 0.45
export const MAX_REGION_HEIGHT_FRACTION = 0.9

export class LoupeRegionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LoupeRegionError'
  }
}

export interface LoupeViewModel {
  readonly viewBox: string
  readonly outlineD: string
  readonly markD: string
  readonly marginMarkD: string
  readonly markStrokeWidth: number
  readonly marginMarkStrokeWidth: number
  readonly crosshairD: string
  readonly strokeWidth: number
  /** Region size in millimetres of the real note, stated openly in the UI. */
  readonly regionWidthMm: number
  readonly regionHeightMm: number
}

function n(value: number): string {
  return Number(value.toFixed(3)).toString()
}

export function assertRegionIsADetail(region: LoupeRegion, note: PhysicalSize): void {
  if (region.widthMm > note.widthMm * MAX_REGION_WIDTH_FRACTION) {
    throw new LoupeRegionError(
      `Loupe region spans ${((region.widthMm / note.widthMm) * 100).toFixed(0)}% of the note width. ` +
        `The loupe magnifies a detail, never a note.`,
    )
  }
  if (region.heightMm > note.heightMm * MAX_REGION_HEIGHT_FRACTION) {
    throw new LoupeRegionError('Loupe region spans nearly the full height of the note.')
  }
}

export function loupeViewModel(region: LoupeRegion, note: PhysicalSize): LoupeViewModel {
  assertRegionIsADetail(region, note)

  const w = region.widthMm
  const h = region.heightMm
  // Geometry is emitted in the region's own coordinates, so the mark produced
  // by bakeSpesimen lands where it was asked to land.
  const outlineD = `M0 0H${n(w)}V${n(h)}H0Z`
  const artwork = bakeSpesimen(outlineD, { width: w, height: h })

  return {
    viewBox: `0 0 ${n(w)} ${n(h)}`,
    outlineD,
    markD: artwork.markD,
    marginMarkD: artwork.marginMarkD,
    markStrokeWidth: artwork.markStrokeWidth,
    marginMarkStrokeWidth: artwork.marginMarkStrokeWidth,
    crosshairD: `M${n(w / 2)} 0V${n(h)}M0 ${n(h / 2)}H${n(w)}`,
    strokeWidth: Math.max(w, h) * 0.012,
    regionWidthMm: w,
    regionHeightMm: h,
  }
}
