import type { Locale } from './index'

export interface PeriksaCopy {
  readonly kicker: string
  readonly lede: string
  readonly printHint: string
  readonly kodeTunaNetraHeading: string
  readonly sourcesLabel: string
  readonly comparisonHeading: string
  readonly comparisonNote: string
  readonly onlyHereLabel: string
  readonly onlyThereLabel: string
  readonly backToSheet: string
  readonly openLabel: string
}

export const PERIKSA: Record<Locale, PeriksaCopy> = {
  id: {
    kicker: 'Daftar periksa',
    lede:
      'Ciri pengaman pecahan ini, disusun per kanal pemeriksaan. Ambil uangnya, lalu periksa satu per satu — halaman ini bisa dicetak sebagai referensi ringkas.',
    printHint: 'Cetak (Ctrl/Cmd+P) untuk membawa daftar ini.',
    kodeTunaNetraHeading: 'Kode tuna netra',
    sourcesLabel: 'Sumber',
    comparisonHeading: 'Dibandingkan dengan tahun emisi lain',
    comparisonNote:
      'Daftar ini mengikuti sumber yang dikutip di tiap pecahan. Pecahan Tahun Emisi 2016 dirujuk ke halaman katalog Bank Indonesia; Tahun Emisi 2022 dirujuk ke Peraturan Bank Indonesia yang lebih rinci. Perbedaan jumlah ciri di bawah dapat mencerminkan kedalaman sumber, bukan berarti ciri itu tidak ada pada pecahan yang lain.',
    onlyHereLabel: 'Hanya terdokumentasi di sini',
    onlyThereLabel: 'Hanya terdokumentasi pada',
    backToSheet: 'Kembali ke lembar',
    openLabel: 'buka sumber',
  },
  en: {
    kicker: 'Field checklist',
    lede:
      'This denomination’s security features, ordered by checking channel. Get the note, then check them one by one — this page is print-friendly.',
    printHint: 'Print (Ctrl/Cmd+P) to take this list with you.',
    kodeTunaNetraHeading: 'Kode tuna netra',
    sourcesLabel: 'Sources',
    comparisonHeading: 'Compared with the other emission year',
    comparisonNote:
      'This list follows the sources cited for each denomination. The 2016 emission is sourced to Bank Indonesia’s catalogue page; the 2022 emission is sourced to the more detailed Peraturan Bank Indonesia. A difference in feature count below can reflect source depth rather than a claim that the feature is absent from the other note.',
    onlyHereLabel: 'Only documented here',
    onlyThereLabel: 'Only documented on',
    backToSheet: 'Back to the sheet',
    openLabel: 'open source',
  },
}
