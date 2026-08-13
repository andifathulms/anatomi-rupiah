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

export interface PlainPoint {
  readonly title: string
  readonly body: string
}

export interface StartPath {
  readonly segment: string
  readonly title: string
  readonly body: string
  readonly minutes: string
}

export interface CtaHints {
  readonly primary: string
  readonly secondary: string
}

export interface HomeCopy {
  readonly kicker: string
  readonly kickerGloss: string
  readonly title: string
  readonly lede: string
  readonly answer: string
  readonly anatomyCaption: string
  readonly anatomyHint: string
  readonly plainHeading: string
  readonly plainPoints: readonly PlainPoint[]
  readonly channelsHeading: string
  readonly channelsLede: string
  readonly honestHeading: string
  readonly honestBody: string
  readonly honestQuote: string
  readonly startHeading: string
  readonly startBody: string
  readonly startPaths: readonly StartPath[]
  readonly startCta: string
  readonly ctaHints: CtaHints
  readonly legalCta: string
}

export const HOME: Record<Locale, HomeCopy> = {
  id: {
    kicker: 'Dilihat · Diraba · Diterawang',
    kickerGloss: 'tiga cara memeriksa ciri pengaman uang',
    title: 'Anatomi Rupiah',
    answer:
      'Situs ini menunjukkan cara kerja pengaman pada uang Rupiah — dan cara memeriksanya sendiri.',
    lede:
      'Hampir semua orang Indonesia hafal tiga kata itu. Jauh lebih sedikit yang bisa menjelaskan apa sebenarnya tanda air itu, mengapa cetakannya terasa timbul, atau apa yang dikerjakan benang pengaman di dalam kertas. Di sini semuanya dibongkar lapis demi lapis.',
    anatomyCaption: 'Skema terurai, bertanda SPESIMEN, digambar pada',
    anatomyHint: 'Gerakkan kursor untuk memutar. Pilih satu lapisan untuk membacanya.',
    plainHeading: 'Singkatnya',
    plainPoints: [
      {
        title: 'Yang dilakukan situs ini',
        body: 'Menjelaskan setiap unsur pengaman pada uang Rupiah: apa yang terjadi di dalam bahannya, dan apa yang harus Anda lihat, raba, atau terawangkan.',
      },
      {
        title: 'Yang tidak dilakukan',
        body: 'Tidak memindai uang, tidak memakai kamera, dan tidak pernah menyatakan selembar uang asli atau palsu.',
      },
      {
        title: 'Siapa yang berwenang',
        body: 'Bank Indonesia. Kalau Anda ragu terhadap selembar uang, bawa ke bank atau kantor Bank Indonesia.',
      },
    ],
    channelsHeading: 'Empat kanal pemeriksaan',
    channelsLede:
      'Warna di situs ini bukan hiasan. Tiap warna berarti satu cara memeriksa, dan dipakai konsisten di setiap halaman.',
    honestHeading: 'Satu dari tiga tidak bisa lewat layar',
    honestBody:
      'Diraba adalah pemeriksaan dengan ujung jari. Layar tidak punya tekstur, dan getaran tidak menirukan cetakan timbul. Kami tidak akan berpura-pura sebaliknya.',
    honestQuote: 'Diraba tidak bisa lewat layar. Ambil uangnya, rasakan cetakan timbulnya.',
    startHeading: 'Mulai dari mana',
    startBody: 'Tiga jalan masuk, tergantung waktu yang Anda punya.',
    startPaths: [
      {
        segment: 'tigad',
        title: 'Ikuti tiga langkah',
        body: 'Dilihat, diraba, diterawang — berurutan, dengan alasan fisik di balik masing-masing.',
        minutes: '5 menit',
      },
      {
        segment: 'lembar',
        title: 'Lihat letaknya',
        body: 'Skema tiap pecahan dengan penanda ciri, lengkap dengan tampilan diperbesar.',
        minutes: '3 menit',
      },
      {
        segment: 'ciri',
        title: 'Pelajari mekanismenya',
        body: 'Delapan penjelasan, tiap satu digambar sebagai potongan melintang.',
        minutes: '15 menit',
      },
    ],
    startCta: 'Lihat ciri-ciri',
    ctaHints: {
      primary: 'Diagram 3D interaktif, sekitar 5 menit',
      secondary: 'Delapan mekanisme, telusuri sesuai minat Anda',
    },
    legalCta: 'Dasar hukum & metode',
  },
  en: {
    kicker: 'Dilihat · Diraba · Diterawang',
    kickerGloss: "the three ways Indonesians check a note's security features",
    title: 'Anatomi Rupiah',
    answer:
      'This site shows how the security features of Rupiah banknotes work — and how to check them yourself.',
    lede:
      'Almost every Indonesian can recite those three words. Far fewer could say what a watermark actually is, why the printing feels raised, or what the security thread is doing inside the paper. Here it is taken apart, layer by layer.',
    anatomyCaption: 'Exploded schematic, marked SPESIMEN, drawn at',
    anatomyHint: 'Move the pointer to turn it. Choose a layer to read about it.',
    plainHeading: 'In short',
    plainPoints: [
      {
        title: 'What this site does',
        body: 'Explains each security feature on Rupiah banknotes: what happens inside the material, and what you should look at, feel for, or hold to the light.',
      },
      {
        title: 'What it does not do',
        body: 'It does not scan notes, use a camera, or ever tell you whether a note is genuine or counterfeit.',
      },
      {
        title: 'Who decides',
        body: 'Bank Indonesia. If a note troubles you, take it to a bank or a Bank Indonesia office.',
      },
    ],
    channelsHeading: 'Four checking channels',
    channelsLede:
      'Colour here is not decoration. Each hue means one way of checking, used consistently on every page.',
    honestHeading: 'One of the three cannot be done on a screen',
    honestBody:
      'Diraba is a check made with a fingertip. A screen has no texture, and a vibration does not imitate raised printing. We will not pretend otherwise.',
    honestQuote: 'Diraba tidak bisa lewat layar. Ambil uangnya, rasakan cetakan timbulnya.',
    startHeading: 'Where to start',
    startBody: 'Three ways in, depending on the time you have.',
    startPaths: [
      {
        segment: 'tigad',
        title: 'Follow the three steps',
        body: 'Dilihat, diraba, diterawang — in order, with the physical reason behind each.',
        minutes: '5 min',
      },
      {
        segment: 'lembar',
        title: 'See where they sit',
        body: 'A schematic of each denomination with feature markers, and a magnified view.',
        minutes: '3 min',
      },
      {
        segment: 'ciri',
        title: 'Learn the mechanisms',
        body: 'Eight explainers, each drawn in cross-section.',
        minutes: '15 min',
      },
    ],
    startCta: 'See the features',
    ctaHints: {
      primary: 'Interactive 3D walkthrough, about 5 minutes',
      secondary: 'Eight mechanisms, browse at your own pace',
    },
    legalCta: 'Legal basis & method',
  },
}
