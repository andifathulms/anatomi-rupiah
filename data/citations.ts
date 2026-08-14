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

/** Any note's own page in BI's Gambar Uang catalogue. */
export function biUang(pageId: number, title: string, locator?: string): Citation {
  return {
    publisher: 'Bank Indonesia',
    title: `Gambar Uang — ${title}`,
    url: `https://www.bi.go.id/id/rupiah/gambar-uang/Detail-Uang.aspx?Bahan=Kertas&ID=${pageId}`,
    locator,
    accessed: ACCESSED,
  }
}

/**
 * The Peraturan Bank Indonesia issued for each Tahun Emisi 2022 denomination.
 *
 * These are primary law, not a catalogue entry: each one enumerates the note's
 * ciri umum and ciri khusus article by article, and states its dimensions. Where
 * a PBI and the Gambar Uang page both cover a fact, the PBI is cited.
 */
export function pbi2022(number: number, denomination: string, locator: string): Citation {
  const padded = String(number).padStart(2, '0')
  return {
    publisher: 'Bank Indonesia',
    title:
      `Peraturan Bank Indonesia Nomor 24/${number}/PBI/2022 tentang Pengeluaran dan Pengedaran ` +
      `Uang Rupiah Kertas Pecahan ${denomination} Tahun Emisi 2022`,
    url: `https://www.bi.go.id/id/publikasi/peraturan/Documents/PBI_24${padded}22.pdf`,
    locator,
    accessed: ACCESSED,
  }
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

/**
 * Persatuan Tunanetra Indonesia, the national blind persons' association, which
 * Bank Indonesia consulted on the code. The right source for what the marks
 * mean and how many there are per denomination.
 */
export const PERTUNI_BLIND_CODE: Citation = {
  publisher: 'Persatuan Tunanetra Indonesia (Pertuni)',
  title: 'Aksesibilitas untuk Tunanetra pada Uang Baru NKRI (25 Desember 2016)',
  url: 'https://pertuni.or.id/aksesibilitas-untuk-tunanetra-pada-uang-baru-nkri/',
  accessed: ACCESSED,
}

/**
 * The official national-hero encyclopedia: ninety biographies published by the
 * Directorate of History and Traditional Values, Directorate General of Culture.
 * Used for the figures on the notes, and the only biography source cited here.
 */
export function ensiklopediaPahlawan(entry: string): Citation {
  return {
    publisher: 'Direktorat Sejarah dan Nilai Tradisional, Direktorat Jenderal Kebudayaan',
    title: 'Julinar Said dan Triana Wulandari, Ensiklopedi Pahlawan Nasional (1995)',
    url: 'https://repositori.kemendikdasmen.go.id/8315/1/ENSIKLOPEDIA%20PAHLAWAN%20NASIONAL.pdf',
    locator: entry,
    accessed: ACCESSED,
  }
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
