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
  return { xMm: Math.round(widthMm * 0.42), yMm: 5, widthMm: 5, heightMm: 55 }
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

export function lowerEdge(widthMm: number): Zone {
  return { xMm: widthMm - 30, yMm: 55, widthMm: 22, heightMm: 8 }
}
