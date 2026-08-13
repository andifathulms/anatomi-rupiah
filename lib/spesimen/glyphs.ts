/**
 * Monoline stroke letterforms for the word SPESIMEN.
 *
 * These exist so the marking required by UU 7/2011 Pasal 24 ayat (1) is real
 * path geometry rather than an <text> node. Text depends on a font resolving;
 * geometry does not. The mark must render even if every font, stylesheet, and
 * script on the page fails.
 *
 * Coordinates are on a 6 x 10 unit grid, y increasing downward, matching SVG.
 */

export type GlyphPoint = readonly [x: number, y: number]
export type GlyphStroke = ReadonlyArray<GlyphPoint>
export type Glyph = ReadonlyArray<GlyphStroke>

export const GLYPH_WIDTH = 6
export const GLYPH_HEIGHT = 10

/** Only the six distinct letters in S-P-E-S-I-M-E-N are needed. */
export const GLYPHS: Readonly<Record<string, Glyph>> = {
  S: [
    [
      [6, 0],
      [0, 0],
      [0, 5],
      [6, 5],
      [6, 10],
      [0, 10],
    ],
  ],
  P: [
    [
      [0, 10],
      [0, 0],
      [6, 0],
      [6, 5],
      [0, 5],
    ],
  ],
  E: [
    [
      [6, 0],
      [0, 0],
      [0, 10],
      [6, 10],
    ],
    [
      [0, 5],
      [4, 5],
    ],
  ],
  I: [
    [
      [1, 0],
      [5, 0],
    ],
    [
      [3, 0],
      [3, 10],
    ],
    [
      [1, 10],
      [5, 10],
    ],
  ],
  M: [
    [
      [0, 10],
      [0, 0],
      [3, 5],
      [6, 0],
      [6, 10],
    ],
  ],
  N: [
    [
      [0, 10],
      [0, 0],
      [6, 10],
      [6, 0],
    ],
  ],
}

export function glyphFor(letter: string): Glyph | undefined {
  return GLYPHS[letter]
}
