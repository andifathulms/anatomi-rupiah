/**
 * Indonesian first, English secondary — PRD §9.
 *
 * Copy uses Bank Indonesia's own vocabulary rather than English approximations:
 * dilihat, diraba, diterawang, benang pengaman, tanda air, gambar saling isi,
 * kode tuna netra. Those words are kept untranslated in the English copy too,
 * because they are the terms a reader will meet on BI's own material.
 */

export const LOCALES = ['id', 'en'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'id'

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

export interface Route {
  readonly segment: string
  readonly label: Record<Locale, string>
  /** One-line gloss shown as a hover title — the nav label alone doesn't say what's there. */
  readonly hint: Record<Locale, string>
}

export const ROUTES: readonly Route[] = [
  { segment: '', label: { id: 'Beranda', en: 'Home' }, hint: { id: 'Kembali ke beranda', en: 'Back to the homepage' } },
  {
    segment: 'lembar',
    label: { id: 'Lembar', en: 'The sheet' },
    hint: {
      id: 'Skema tiap pecahan, dengan penanda ciri dan tampilan diperbesar',
      en: 'A schematic of each denomination, with feature markers and a magnified view',
    },
  },
  {
    segment: 'ciri',
    label: { id: 'Ciri', en: 'Features' },
    hint: {
      id: 'Delapan ciri pengaman, tiap satu dijelaskan sebagai mekanisme',
      en: 'Eight security features, each explained as a mechanism',
    },
  },
  {
    segment: 'tigad',
    label: { id: '3D', en: '3D' },
    hint: {
      id: 'Jalan tiga langkah: dilihat, diraba, diterawang',
      en: 'The three-step walkthrough: dilihat, diraba, diterawang',
    },
  },
  {
    segment: 'tunanetra',
    label: { id: 'Kode tuna netra', en: 'Kode tuna netra' },
    hint: {
      id: 'Kode raba untuk mengenali pecahan tanpa melihat',
      en: 'The tactile code for identifying a denomination by touch',
    },
  },
  {
    segment: 'tokoh',
    label: { id: 'Tokoh & motif', en: 'Figures & motifs' },
    hint: {
      id: 'Tokoh dan gambar di balik tiap pecahan',
      en: 'The figures and motifs behind each denomination',
    },
  },
  {
    segment: 'hukum',
    label: { id: 'Hukum & metode', en: 'Legal & method' },
    hint: {
      id: 'Dasar hukum dan metode di balik situs ini',
      en: 'The legal basis and method behind this site',
    },
  },
  {
    segment: 'sumber',
    label: { id: 'Sumber', en: 'Sources' },
    hint: {
      id: 'Setiap sumber yang dikutip di situs ini, di satu tempat',
      en: 'Every source cited on this site, in one place',
    },
  },
]

export function href(locale: Locale, segment: string): string {
  return segment === '' ? `/${locale}` : `/${locale}/${segment}`
}

export const CHANNEL_LABEL: Record<'dilihat' | 'diraba' | 'diterawang' | 'mesin', Record<Locale, string>> = {
  dilihat: { id: 'Dilihat', en: 'Dilihat — seen' },
  diraba: { id: 'Diraba', en: 'Diraba — felt' },
  diterawang: { id: 'Diterawang', en: 'Diterawang — held to light' },
  mesin: { id: 'Mesin & UV', en: 'Machine & UV' },
}

export const CHANNEL_BLURB: Record<'dilihat' | 'diraba' | 'diterawang' | 'mesin', Record<Locale, string>> = {
  dilihat: {
    id: 'Ciri yang tampak dalam cahaya biasa.',
    en: 'Features visible in ordinary light.',
  },
  diraba: {
    id: 'Ciri yang dirasakan dengan ujung jari. Tidak bisa lewat layar.',
    en: 'Features felt with a fingertip. Not possible through a screen.',
  },
  diterawang: {
    id: 'Ciri yang muncul saat uang diterawang ke arah cahaya.',
    en: 'Features that appear when the note is held up to the light.',
  },
  mesin: {
    id: 'Ciri untuk mesin dan sinar ultraviolet — kanal keempat, di luar 3D.',
    en: 'Features for machines and ultraviolet light — the fourth channel, beyond the three.',
  },
}
