import type { Locale } from './index'

/** Page copy. Kept out of components — nothing is computed in a component. */

export interface SiteCopy {
  readonly siteName: string
  readonly tagline: string
  readonly skipToContent: string
  readonly markingNotice: string
  readonly footerDisclaimer: string
  readonly footerAuthority: string
  readonly languageLabel: string
}

export const SITE: Record<Locale, SiteCopy> = {
  id: {
    siteName: 'Anatomi Rupiah',
    tagline: 'Bagaimana uang kertas dibangun — digambar sebagai mekanisme, bukan difoto sebagai uang.',
    skipToContent: 'Lompat ke isi',
    markingNotice:
      'Semua gambar uang di situs ini adalah skema, tidak sesuai ukuran aslinya, dan ditandai SPESIMEN.',
    footerDisclaimer:
      'Proyek edukasi pribadi. Bersandar pada pengecualian dalam UU 7/2011 Pasal 24 ayat (1), yang mengizinkan peniruan Rupiah untuk tujuan pendidikan dengan memberi kata spesimen.',
    footerAuthority:
      'Situs ini tidak dapat dan tidak akan menyatakan apakah selembar uang asli atau palsu. Kewenangan itu ada pada Bank Indonesia.',
    languageLabel: 'Bahasa',
  },
  en: {
    siteName: 'Anatomi Rupiah',
    tagline: 'How a banknote is built — drawn as mechanisms rather than photographed as notes.',
    skipToContent: 'Skip to content',
    markingNotice:
      'Every note depiction here is schematic, not at actual size, and marked SPESIMEN.',
    footerDisclaimer:
      'A personal educational project. It relies on the exemption in UU 7/2011 Pasal 24 ayat (1), which permits imitating Rupiah for educational purposes with the word spesimen applied.',
    footerAuthority:
      'This site cannot and will not say whether a particular note is genuine. That authority rests with Bank Indonesia.',
    languageLabel: 'Language',
  },
}

export interface HomeCopy {
  readonly kicker: string
  readonly title: string
  readonly lede: string
  readonly channelsHeading: string
  readonly honestHeading: string
  readonly honestBody: string
  readonly honestQuote: string
  readonly startHeading: string
  readonly startBody: string
  readonly startCta: string
  readonly legalCta: string
}

export const HOME: Record<Locale, HomeCopy> = {
  id: {
    kicker: 'Dilihat · Diraba · Diterawang',
    title: 'Anatomi Rupiah',
    lede:
      'Hampir semua orang Indonesia hafal tiga kata itu. Jauh lebih sedikit yang bisa menjelaskan apa sebenarnya tanda air itu secara fisik, mengapa cetakan intaglio terasa timbul, atau apa yang dikerjakan benang pengaman di dalam kertas. Situs ini menjelaskan mekanismenya.',
    channelsHeading: 'Empat kanal pemeriksaan',
    honestHeading: 'Satu dari tiga tidak bisa lewat layar',
    honestBody:
      'Diraba adalah pemeriksaan dengan ujung jari. Layar tidak punya tekstur, dan getaran tidak menirukan cetakan timbul. Kami tidak akan berpura-pura sebaliknya.',
    honestQuote: 'Diraba tidak bisa lewat layar. Ambil uangnya, rasakan cetakan timbulnya.',
    startHeading: 'Mulai dari mekanismenya',
    startBody:
      'Setiap ciri digambar sebagai potongan melintang atau gambar terurai: apa yang terjadi pada bahan, dan apa yang harus Anda amati.',
    startCta: 'Lihat ciri-ciri',
    legalCta: 'Dasar hukum & metode',
  },
  en: {
    kicker: 'Dilihat · Diraba · Diterawang',
    title: 'Anatomi Rupiah',
    lede:
      'Almost every Indonesian can recite those three words. Far fewer could say what a watermark physically is, why intaglio printing feels raised, or what the security thread is doing inside the paper. This site explains the mechanisms.',
    channelsHeading: 'Four checking channels',
    honestHeading: 'One of the three cannot be done on a screen',
    honestBody:
      'Diraba is a check made with a fingertip. A screen has no texture, and a vibration does not imitate raised printing. We will not pretend otherwise.',
    honestQuote: 'Diraba tidak bisa lewat layar. Ambil uangnya, rasakan cetakan timbulnya.',
    startHeading: 'Start with the mechanism',
    startBody:
      'Each feature is drawn in cross-section or exploded view: what happens in the material, and what you should observe.',
    startCta: 'See the features',
    legalCta: 'Legal basis & method',
  },
}
