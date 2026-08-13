import type { Citation } from '@/lib/content/schema'

/**
 * Shared sources. Every claim in the corpus points at one of these.
 *
 * Bank Indonesia is preferred for anything about the Rupiah specifically.
 * Published reference works are used for the underlying optics and physics,
 * which BI states as fact without explaining — and which are the point here.
 */

const ACCESSED = '2026-08-13'

/** BI's own page for the Rp100.000 note, which names the unsur pengaman. */
export const BI_UANG_100K: Citation = {
  publisher: 'Bank Indonesia',
  title: 'Gambar Uang — Rp100.000 Tahun Emisi 2016',
  url: 'https://www.bi.go.id/id/rupiah/gambar-uang/Detail-Uang.aspx?Bahan=Kertas&ID=11',
  locator: 'Unsur Pengaman',
  accessed: ACCESSED,
}

export const BI_GAMBAR_UANG: Citation = {
  publisher: 'Bank Indonesia',
  title: 'Rupiah — Gambar Uang',
  url: 'https://www.bi.go.id/id/rupiah/gambar-uang/default.aspx',
  accessed: ACCESSED,
}

export const UU_7_2011: Citation = {
  publisher: 'Republik Indonesia',
  title: 'Undang-Undang Nomor 7 Tahun 2011 tentang Mata Uang (teks konsolidasi)',
  url: 'https://www.bi.go.id/id/tentang-bi/profil/uu-bi/UndangUndang%20BI/Konsolidasi-UU-No.7-Tahun-2011-Mata%20Uang.pdf',
  locator: 'Pasal 24 ayat (1)',
  accessed: ACCESSED,
}

/** The standard published reference on document security optics. */
export function vanRenesse(locator: string): Citation {
  return {
    publisher: 'Artech House',
    title: 'R. L. van Renesse, Optical Document Security, 3rd edition (2005)',
    locator,
    accessed: ACCESSED,
  }
}

/** For the optics proper. */
export function hecht(locator: string): Citation {
  return {
    publisher: 'Pearson',
    title: 'Eugene Hecht, Optics, 5th edition (2017)',
    locator,
    accessed: ACCESSED,
  }
}
