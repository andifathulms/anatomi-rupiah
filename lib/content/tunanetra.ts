import { denominations } from '@/data/denominations'
import type { Citation } from './schema'
import type { Locale } from '@/lib/i18n'

/**
 * The blind code, per denomination. PRD §6.4 — under-taught, and it makes the
 * accessibility of the currency itself a subject rather than an afterthought.
 *
 * Only notes whose blind code is cited appear here. Bank Indonesia's pages for
 * Tahun Emisi 2022 do not name the code, so those notes are absent rather than
 * assumed: the honest gap is better than the confident guess.
 */

export interface BlindCodeRow {
  readonly id: string
  readonly caption: string
  readonly valueIdr: number
  readonly emisi: number
  readonly marks: number
  readonly widthMm: number
  readonly description: string
  readonly citations: readonly Citation[]
}

export function blindCodeRows(locale: Locale): readonly BlindCodeRow[] {
  return denominations
    .flatMap((note) => {
      const kode = note.kodeTunaNetra
      if (kode === undefined) return []
      return [
        {
          id: note.id,
          caption: `Rp${note.valueIdr.toLocaleString('id-ID')}`,
          valueIdr: note.valueIdr,
          emisi: note.emisi,
          marks: kode.marks,
          widthMm: note.dimensions.widthMm,
          description: kode.description.text[locale],
          citations: kode.description.citations,
        },
      ]
    })
    .sort((a, b) => b.valueIdr - a.valueIdr)
}

/** Denominations whose blind code has not been cited yet, named openly. */
export function blindCodeGaps(): readonly string[] {
  return denominations
    .filter((note) => note.kodeTunaNetra === undefined)
    .map((note) => `Rp${note.valueIdr.toLocaleString('id-ID')} TE ${note.emisi}`)
}
