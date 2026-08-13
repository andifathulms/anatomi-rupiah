import { GLYPH_HEIGHT, GLYPH_WIDTH, glyphFor } from './glyphs'

/**
 * Builds the SPESIMEN wordmark as absolute SVG path data.
 *
 * Rotation and placement are baked into the coordinates rather than expressed
 * as a `transform` attribute. An attribute can be stripped; a number cannot.
 * The result is a single `d` string that draws the word wherever it was asked
 * to draw it, with no dependency on any other attribute, element, or stylesheet.
 */

export interface WordmarkOptions {
  /** Cap height of the letters, in the caller's user units. */
  readonly capHeight: number
  /** Centre of the wordmark, in the caller's user units. */
  readonly centerX: number
  readonly centerY: number
  /** Clockwise rotation in degrees. Baked into the coordinates. */
  readonly rotationDeg: number
  /** Gap between glyphs, as a fraction of cap height. */
  readonly tracking?: number
}

export interface Wordmark {
  /** Absolute SVG path data. Never empty for a non-empty word. */
  readonly d: string
  /** Unrotated width of the word in user units, for layout decisions. */
  readonly width: number
  readonly height: number
}

export const DEFAULT_TRACKING = 0.32
const PRECISION = 3

function round(n: number): number {
  const factor = 10 ** PRECISION
  // Normalising -0 keeps the emitted path data stable across platforms.
  return Object.is(Math.round(n * factor) / factor, -0) ? 0 : Math.round(n * factor) / factor
}

export function buildWordmark(word: string, options: WordmarkOptions): Wordmark {
  const tracking = options.tracking ?? DEFAULT_TRACKING
  const unit = options.capHeight / GLYPH_HEIGHT
  const glyphWidth = GLYPH_WIDTH * unit
  const gap = options.capHeight * tracking

  const letters = [...word]
  const width = letters.length === 0 ? 0 : letters.length * glyphWidth + (letters.length - 1) * gap
  const height = options.capHeight

  const theta = (options.rotationDeg * Math.PI) / 180
  const cos = Math.cos(theta)
  const sin = Math.sin(theta)

  // Lay the word out around its own centre, then rotate about that centre.
  const originX = -width / 2
  const originY = -height / 2

  const subpaths: string[] = []

  letters.forEach((letter, index) => {
    const glyph = glyphFor(letter)
    if (glyph === undefined) {
      throw new Error(
        `buildWordmark: no letterform for "${letter}". The marking may only use authored glyphs.`,
      )
    }
    const advance = index * (glyphWidth + gap)

    for (const stroke of glyph) {
      const commands: string[] = []
      stroke.forEach((point, pointIndex) => {
        const localX = originX + advance + point[0] * unit
        const localY = originY + point[1] * unit
        const x = options.centerX + localX * cos - localY * sin
        const y = options.centerY + localX * sin + localY * cos
        commands.push(`${pointIndex === 0 ? 'M' : 'L'}${round(x)} ${round(y)}`)
      })
      subpaths.push(commands.join(''))
    }
  })

  return { d: subpaths.join(''), width, height }
}
