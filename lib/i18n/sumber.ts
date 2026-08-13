import type { Locale } from './index'

export interface SumberCopy {
  readonly title: string
  readonly lede: string
  readonly citedForLabel: string
  readonly openLabel: string
}

export const SUMBER: Record<Locale, SumberCopy> = {
  id: {
    title: 'Sumber',
    lede:
      'Setiap klaim di situs ini dikutip ke salah satu sumber berikut. Daftar ini mengumpulkan semuanya di satu tempat; tidak ada klaim baru di halaman ini.',
    citedForLabel: 'Dikutip untuk',
    openLabel: 'buka sumber',
  },
  en: {
    title: 'Sources',
    lede:
      'Every claim on this site is cited to one of the sources below. This page collects them in one place; it adds no new claim of its own.',
    citedForLabel: 'Cited for',
    openLabel: 'open source',
  },
}
