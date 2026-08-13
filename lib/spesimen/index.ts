import { GLYPH_HEIGHT, GLYPH_WIDTH } from './glyphs'
import { DEFAULT_TRACKING, buildWordmark, type Wordmark } from './wordmark'

export { buildWordmark } from './wordmark'
export type { Wordmark, WordmarkOptions } from './wordmark'
export { GLYPHS, GLYPH_HEIGHT, GLYPH_WIDTH } from './glyphs'

/**
 * The marking required by UU 7/2011 Pasal 24 ayat (1).
 *
 * The exemption that lets this project depict Rupiah at all is conditioned on
 * the word `spesimen` being applied. So the marking is not a decoration on top
 * of the artwork — it is part of the artwork, produced by the same call that
 * produces the note outline, in the same coordinate space, at the same scale.
 *
 * There is deliberately no exported way to obtain a note outline without a
 * mark. `bakeSpesimen` is the only entry point, it always returns both, and
 * the schematic components render both from the object it returns.
 *
 * Never reimplement this as a CSS pseudo-element, a positioned <div>, or a
 * layer that can be toggled. See CLAUDE.md invariant 1.
 */

export const SPESIMEN_WORD = 'SPESIMEN'

/** A rendered mark must be at least this fraction of the artwork's diagonal. */
export const MIN_MARK_COVERAGE = 0.5

export interface ArtworkBox {
  /** Artwork coordinate space — viewBox units, not millimetres, not pixels. */
  readonly width: number
  readonly height: number
}

export interface BakedArtwork {
  /** The note outline path data, exactly as authored. */
  readonly outlineD: string
  /** The primary marking: a large wordmark struck across the face. */
  readonly markD: string
  /** A second marking along the lower margin, so a crop still carries it. */
  readonly marginMarkD: string
  readonly markStrokeWidth: number
  readonly marginMarkStrokeWidth: number
  /** Word actually applied, for the accessible label. */
  readonly word: typeof SPESIMEN_WORD
}

function diagonalOf(box: ArtworkBox): number {
  return Math.hypot(box.width, box.height)
}

/**
 * Width of the wordmark as a multiple of its cap height, for the word being
 * applied. Derived from the layout in buildWordmark: each glyph advances by
 * 0.6 cap heights and each gap by the tracking fraction.
 */
const WORDMARK_ASPECT =
  SPESIMEN_WORD.length * (GLYPH_WIDTH / GLYPH_HEIGHT) + (SPESIMEN_WORD.length - 1) * DEFAULT_TRACKING

/**
 * The largest cap height whose rotated wordmark still fits inside the artwork.
 *
 * Sizing from the box height alone was wrong: on an elongated crop the mark
 * ran outside the artwork and only a fragment of it rendered. The marking has
 * to sit *within* the thing it marks, so both extents are solved here.
 */
function fittedCapHeight(box: ArtworkBox, rotationDeg: number): number {
  const theta = (rotationDeg * Math.PI) / 180
  const cos = Math.abs(Math.cos(theta))
  const sin = Math.abs(Math.sin(theta))
  return Math.min(
    box.width / (WORDMARK_ASPECT * cos + sin),
    box.height / (WORDMARK_ASPECT * sin + cos),
  )
}

/**
 * Angle of the box diagonal, so the mark lies along the longest available run
 * and reads at the largest possible size.
 */
function diagonalAngleDeg(box: ArtworkBox): number {
  return (Math.atan2(box.height, box.width) * 180) / Math.PI
}

export function bakeSpesimen(outlineD: string, box: ArtworkBox): BakedArtwork {
  if (outlineD.trim().length === 0) {
    throw new Error('bakeSpesimen: refusing to mark empty artwork.')
  }
  if (box.width <= 0 || box.height <= 0) {
    throw new Error('bakeSpesimen: artwork box must have positive extent.')
  }

  const diagonal = diagonalOf(box)
  const rotationDeg = diagonalAngleDeg(box)

  // As large as the artwork allows, struck along its longest run: unmistakable,
  // not incidental — and wholly inside the artwork, so none of it is clipped.
  const primary: Wordmark = buildWordmark(SPESIMEN_WORD, {
    capHeight: fittedCapHeight(box, rotationDeg) * 0.94,
    centerX: box.width / 2,
    centerY: box.height / 2,
    rotationDeg,
  })

  // The floor is not negotiable. An artwork shape too extreme to carry a
  // legible mark is an artwork shape this project does not draw.
  if (primary.width < diagonal * MIN_MARK_COVERAGE) {
    throw new Error(
      `bakeSpesimen: marking would span only ${((primary.width / diagonal) * 100).toFixed(0)}% ` +
        `of the ${box.width}×${box.height} artwork diagonal, below the ` +
        `${MIN_MARK_COVERAGE * 100}% floor required to satisfy Pasal 24 ayat (1). Refusing. ` +
        `Reshape the artwork rather than shrinking the mark.`,
    )
  }

  // The margin mark is fitted the same way, so it too stays inside the artwork.
  const marginCapHeight = Math.min(box.height * 0.055, (box.width * 0.86) / WORDMARK_ASPECT)
  const margin: Wordmark = buildWordmark(SPESIMEN_WORD, {
    capHeight: marginCapHeight,
    centerX: box.width / 2,
    centerY: box.height * 0.93,
    rotationDeg: 0,
  })

  return {
    outlineD,
    markD: primary.d,
    marginMarkD: margin.d,
    // Stroke follows cap height, so weight reads the same at any artwork size.
    markStrokeWidth: primary.height * 0.13,
    marginMarkStrokeWidth: marginCapHeight * 0.16,
    word: SPESIMEN_WORD,
  }
}

/**
 * Used by the compliance check against rendered output: does this SVG markup
 * actually carry baked mark geometry? Attribute presence alone is not enough —
 * the path data has to be there.
 */
export function hasBakedMark(svgMarkup: string): boolean {
  const marks = svgMarkup.match(/data-spesimen="baked"[^>]*/g)
  if (marks === null || marks.length === 0) return false
  return marks.every((tag) => {
    const d = tag.match(/\sd="([^"]+)"/)
    return d !== null && typeof d[1] === 'string' && d[1].length > 0
  })
}
