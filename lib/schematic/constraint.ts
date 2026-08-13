/**
 * The size constraint.
 *
 * PRD §2 and docs/bi-reproduction-guidance.md: no published Bank Indonesia rule
 * on reproduction size was found, so this project adopts the stricter posture
 * comparable central banks specify — a reproduction must sit outside 75%–150%
 * of the note's actual linear dimensions. This project takes the low side and
 * caps full-note schematics well below it.
 *
 * The band is recorded here as an engineering threshold. It is not represented
 * anywhere in the product as Bank Indonesia's own rule.
 */

/** CSS reference pixel: 96 px per inch. The only defensible mm-to-screen ratio. */
export const PX_PER_MM = 96 / 25.4

/** Reproductions must not land inside this band, expressed as linear scale. */
export const FORBIDDEN_SCALE_BAND = { min: 0.75, max: 1.5 } as const

/** Hard ceiling for a full-note schematic. Below the band with margin to spare. */
export const MAX_SCHEMATIC_SCALE = 0.7

export interface PhysicalSize {
  readonly widthMm: number
  readonly heightMm: number
}

export class SizeConstraintError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SizeConstraintError'
  }
}

export function isInsideForbiddenBand(scale: number): boolean {
  return scale >= FORBIDDEN_SCALE_BAND.min && scale <= FORBIDDEN_SCALE_BAND.max
}

/** Linear scale at which a physical size would render at the given CSS width. */
export function scaleOf(renderedWidthPx: number, actual: PhysicalSize): number {
  return renderedWidthPx / (actual.widthMm * PX_PER_MM)
}

/**
 * The CSS width a full-note schematic is allowed to occupy. Callers must use
 * this rather than choosing their own width — it is the constraint, not a hint.
 */
export function schematicWidthPx(actual: PhysicalSize): number {
  return Math.floor(actual.widthMm * PX_PER_MM * MAX_SCHEMATIC_SCALE)
}

export function schematicHeightPx(actual: PhysicalSize): number {
  return Math.floor(actual.heightMm * PX_PER_MM * MAX_SCHEMATIC_SCALE)
}

/**
 * Throws unless the rendered width is safely away from actual size. Used by the
 * schematic component and asserted again over exported markup at build time.
 */
export function assertSchematicWidth(renderedWidthPx: number, actual: PhysicalSize): void {
  if (!Number.isFinite(renderedWidthPx) || renderedWidthPx <= 0) {
    throw new SizeConstraintError(`Schematic width must be a positive number, got ${renderedWidthPx}.`)
  }
  const scale = scaleOf(renderedWidthPx, actual)
  if (scale > MAX_SCHEMATIC_SCALE) {
    throw new SizeConstraintError(
      `Schematic would render at ${(scale * 100).toFixed(1)}% of actual size; ` +
        `the cap is ${MAX_SCHEMATIC_SCALE * 100}%. A full-note schematic is never drawn near 1:1.`,
    )
  }
}
