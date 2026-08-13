import type { Placement } from '@/lib/content/schema'

/**
 * Indicative zones on a schematic, in millimetres of the real note.
 *
 * These are *approximate*, and the sheet says so on the page. Bank Indonesia
 * states which features a note carries and broadly where to look; it does not
 * publish coordinates, and this project does not measure notes to derive them —
 * measuring toward a precise layout is the wrong direction of travel entirely.
 * A marker exists to send the eye to the right part of a real note.
 */

export type Zone = Placement['region']

export function rightPanel(widthMm: number): Zone {
  return { xMm: widthMm - 44, yMm: 9, widthMm: 34, heightMm: 47 }
}

export function portrait(): Zone {
  return { xMm: 12, yMm: 11, widthMm: 48, heightMm: 44 }
}

export function threadBand(widthMm: number): Zone {
  // Short of the full height on purpose: the loupe refuses a region that spans
  // the note, and a marker is a pointer rather than a tracing.
  return { xMm: Math.round(widthMm * 0.38), yMm: 6, widthMm: 14, heightMm: 52 }
}

export function upperLeft(): Zone {
  return { xMm: 14, yMm: 6, widthMm: 40, heightMm: 20 }
}

export function centreRight(widthMm: number): Zone {
  return { xMm: widthMm - 66, yMm: 34, widthMm: 18, heightMm: 18 }
}

export function upperRight(widthMm: number): Zone {
  return { xMm: widthMm - 74, yMm: 8, widthMm: 22, heightMm: 22 }
}

/** Microtext reads as a fine rule until magnified. */
export function microLine(widthMm: number): Zone {
  return { xMm: Math.round(widthMm * 0.2), yMm: 44, widthMm: 30, heightMm: 15 }
}

/** The blind code sits at the outer edge, in the same place on every note. */
export function edgeCode(widthMm: number): Zone {
  return { xMm: widthMm - 18, yMm: 18, widthMm: 14, heightMm: 28 }
}
