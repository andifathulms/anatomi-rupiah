import { bakeSpesimen, type BakedArtwork } from '@/lib/spesimen'
import type { PhysicalSize } from './constraint'

/**
 * Schematic note outline geometry.
 *
 * Deliberately reductive: a bordered field, a margin rule, and corner
 * registration ticks. It orients the reader to where a feature sits and does
 * nothing else. It is not a drawing of a note and must never be improved
 * toward one — see PRD §3 and CLAUDE.md invariant 4.
 *
 * Artwork coordinates are millimetres of the real note, which keeps feature
 * placement data honest. Rendered CSS size is governed separately, and always,
 * by the size constraint.
 */

export interface SchematicGeometry {
  /** viewBox units are millimetres of the actual note. */
  readonly viewBox: string
  readonly box: { readonly width: number; readonly height: number }
  readonly artwork: BakedArtwork
  /** Engraver's registration ticks in the margin — PRD §9. */
  readonly registrationD: string
  /** Inset rule that reads as the printed border of the field. */
  readonly marginRuleD: string
  readonly strokeWidth: number
}

const CORNER_RADIUS_MM = 3
const MARGIN_MM = 4
const TICK_MM = 3.5

function n(value: number): string {
  return Number(value.toFixed(3)).toString()
}

function roundedRect(x: number, y: number, w: number, h: number, r: number): string {
  return (
    `M${n(x + r)} ${n(y)}H${n(x + w - r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + w)} ${n(y + r)}` +
    `V${n(y + h - r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + w - r)} ${n(y + h)}` +
    `H${n(x + r)}A${n(r)} ${n(r)} 0 0 1 ${n(x)} ${n(y + h - r)}` +
    `V${n(y + r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + r)} ${n(y)}Z`
  )
}

function registrationTicks(w: number, h: number): string {
  const t = TICK_MM
  return [
    // Top-left, top-right, bottom-left, bottom-right crosses, drawn in the margin.
    `M0 0H${n(t)}M0 0V${n(t)}`,
    `M${n(w)} 0H${n(w - t)}M${n(w)} 0V${n(t)}`,
    `M0 ${n(h)}H${n(t)}M0 ${n(h)}V${n(h - t)}`,
    `M${n(w)} ${n(h)}H${n(w - t)}M${n(w)} ${n(h)}V${n(h - t)}`,
  ].join('')
}

export function buildSchematic(size: PhysicalSize): SchematicGeometry {
  const { widthMm: width, heightMm: height } = size
  if (width <= 0 || height <= 0) {
    throw new Error('buildSchematic: note dimensions must be positive.')
  }

  const outlineD = roundedRect(0, 0, width, height, CORNER_RADIUS_MM)

  return {
    viewBox: `0 0 ${n(width)} ${n(height)}`,
    box: { width, height },
    // The mark is produced by the same call that produces the outline. There is
    // no code path here that yields one without the other.
    artwork: bakeSpesimen(outlineD, { width, height }),
    registrationD: registrationTicks(width, height),
    marginRuleD: roundedRect(
      MARGIN_MM,
      MARGIN_MM,
      width - MARGIN_MM * 2,
      height - MARGIN_MM * 2,
      CORNER_RADIUS_MM / 2,
    ),
    strokeWidth: 0.45,
  }
}
