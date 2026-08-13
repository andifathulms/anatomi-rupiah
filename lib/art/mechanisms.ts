import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Loads authored mechanism illustrations from art/mechanisms at build time.
 *
 * The drawings live as .svg files rather than as JSX so they stay editable in a
 * vector editor — this is artwork, and PRD §3 asks that when an illustration is
 * hard we make the drawing better rather than reach for a photograph.
 *
 * Nothing is fetched: the file is read during static generation and inlined.
 */

export const MECHANISM_IDS = [
  'tanda-air',
  'benang-pengaman',
  'cetak-intaglio',
  'tinta-berubah-warna',
  'gambar-saling-isi',
  'mikroteks',
  'tinta-tampak-uv',
  'kode-tuna-netra',
] as const

export type MechanismId = (typeof MECHANISM_IDS)[number]

export function isMechanismId(value: string): value is MechanismId {
  return (MECHANISM_IDS as readonly string[]).includes(value)
}

const cache = new Map<MechanismId, string>()

/**
 * Guards against artwork that would reach outside the page: a drawing has no
 * business carrying script, a remote reference, or an embedded raster.
 */
function assertInert(id: MechanismId, markup: string): void {
  if (!markup.includes('<svg')) {
    throw new Error(`mechanism "${id}": not an SVG document.`)
  }
  if (/<script|<foreignObject|xlink:href\s*=\s*"http|href\s*=\s*"http/i.test(markup)) {
    throw new Error(`mechanism "${id}": artwork must be inert and self-contained.`)
  }
  if (/data:image\/(png|jpe?g|webp|gif)/i.test(markup)) {
    throw new Error(`mechanism "${id}": embedded raster imagery is not permitted.`)
  }
}

export function mechanismSvg(id: MechanismId): string {
  const cached = cache.get(id)
  if (cached !== undefined) return cached

  const markup = readFileSync(join(process.cwd(), 'art', 'mechanisms', `${id}.svg`), 'utf8')
  assertInert(id, markup)
  cache.set(id, markup)
  return markup
}
