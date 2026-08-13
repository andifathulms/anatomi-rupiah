import type { Locale } from './index'

/**
 * The legal and method disclosure — PRD §6.7 and §14 framing.
 *
 * Four things are stated plainly: the exemption relied on, the marking applied,
 * what the site deliberately does not do, and who actually determines whether
 * Rupiah is genuine.
 */

export interface HukumSection {
  readonly id: string
  readonly heading: string
  readonly paragraphs: readonly string[]
  readonly bullets?: readonly string[]
}

export interface HukumLink {
  readonly label: string
  readonly url: string
}

export interface HukumCopy {
  readonly title: string
  readonly lede: string
  readonly sections: readonly HukumSection[]
  readonly linksHeading: string
  readonly links: readonly HukumLink[]
  readonly notAffiliated: string
}

const LINKS: readonly HukumLink[] = [
  {
    label: 'UU No. 7 Tahun 2011 tentang Mata Uang (teks konsolidasi, Bank Indonesia)',
    url: 'https://www.bi.go.id/id/tentang-bi/profil/uu-bi/UndangUndang%20BI/Konsolidasi-UU-No.7-Tahun-2011-Mata%20Uang.pdf',
  },
  {
    label: 'Bank Indonesia — Ciri Keaslian Rupiah',
    url: 'https://www.bi.go.id/id/rupiah/ciri-keaslian/default.aspx',
  },
  {
    label: 'Bank Indonesia — Gambar Uang',
    url: 'https://www.bi.go.id/id/rupiah/gambar-uang/default.aspx',
  },
]

export const HUKUM: Record<Locale, HukumCopy> = {
  id: {
    title: 'Dasar hukum & metode',
    lede:
      'Situs ini menggambarkan uang Rupiah. Halaman ini menjelaskan atas dasar apa hal itu boleh dilakukan, apa yang kami lakukan untuk mematuhinya, dan apa yang sengaja tidak kami lakukan.',
    sections: [
      {
        id: 'dasar',
        heading: 'Pengecualian yang kami jadikan sandaran',
        paragraphs: [
          'UU 7/2011 Pasal 24 ayat (1) melarang setiap orang meniru Rupiah, kecuali untuk tujuan pendidikan dan/atau promosi dengan memberi kata spesimen. Pelanggarannya diancam pidana kurungan paling lama 1 tahun dan denda paling banyak Rp200.000.000.',
          'Proyek ini bersifat pendidikan dan menerapkan kata SPESIMEN pada setiap gambar uang yang ditampilkan.',
        ],
      },
      {
        id: 'penandaan',
        heading: 'Bagaimana penandaan diterapkan',
        paragraphs: [
          'Kata SPESIMEN bukan lapisan yang ditumpuk di atas gambar. Kata itu adalah bagian dari gambarnya sendiri — bentuk hurufnya digambar sebagai garis vektor, dalam ruang koordinat yang sama dengan skema uang, dihasilkan oleh pemanggilan fungsi yang sama.',
        ],
        bullets: [
          'Penandaan ikut terbawa dalam tangkapan layar.',
          'Penandaan tidak hilang bila sebuah elemen disembunyikan atau lembar gaya dimatikan.',
          'Tidak ada jalur kode yang bisa menghasilkan skema tanpa penandaan; pemeriksaan build gagal bila hal itu terjadi.',
        ],
      },
      {
        id: 'skema',
        heading: 'Mengapa gambarnya sengaja dibuat sederhana',
        paragraphs: [
          'Yang dijelaskan di sini adalah mekanisme, bukan tampilan uangnya. Potongan melintang cetakan intaglio atau diagram benang pengaman di dalam kertas menjelaskan fisika, dan itu mengajarkan jauh lebih baik daripada sebuah foto.',
          'Karena itu tidak ada satu pun foto uang di repositori ini. Semua gambar adalah karya vektor asli. Skema uang digambar seadanya untuk menunjukkan letak sebuah ciri, tidak pernah realistis, dan tidak pernah pada ukuran sebenarnya — lebar tampilnya dibatasi di bawah 70% ukuran asli dan diperiksa saat build.',
        ],
      },
      {
        id: 'tidak',
        heading: 'Yang sengaja tidak kami lakukan',
        paragraphs: [],
        bullets: [
          'Tidak ada pemindai, kamera, unggah gambar, atau alat pembanding.',
          'Tidak ada penilaian asli atau palsu terhadap uang mana pun.',
          'Tidak ada berkas gambar uang utuh yang bisa diunduh. Yang bisa dibagikan hanya diagram mekanisme.',
          'Tidak ada penjelasan tentang komposisi bahan, kimia tinta, atau parameter proses cetak. Penjelasan ditulis untuk memeriksa uang, bukan untuk membuatnya.',
          'Tidak ada permintaan jaringan saat situs dijalankan, tidak ada analitik, tidak ada akun.',
        ],
      },
      {
        id: 'kewenangan',
        heading: 'Siapa yang menentukan keaslian',
        paragraphs: [
          'Bank Indonesia. Bukan situs ini, dan bukan aplikasi mana pun. Bila Anda ragu terhadap selembar uang, bawa ke bank atau ke kantor Bank Indonesia untuk diperiksa.',
          'Situs ini mengajarkan ciri-ciri uang. Situs ini tidak dapat, dan tidak akan, menyatakan bahwa uang Anda asli.',
        ],
      },
    ],
    linksHeading: 'Sumber',
    links: LINKS,
    notAffiliated:
      'Proyek pribadi. Tidak berafiliasi dengan Bank Indonesia atau instansi pemerintah mana pun, dan tidak menggunakan identitas visual lembaga mana pun.',
  },
  en: {
    title: 'Legal basis & method',
    lede:
      'This site depicts Rupiah banknotes. This page sets out the basis on which that is permitted, what we do to comply, and what we deliberately do not do.',
    sections: [
      {
        id: 'dasar',
        heading: 'The exemption we rely on',
        paragraphs: [
          'UU 7/2011 Pasal 24 ayat (1) prohibits imitating Rupiah, except for educational and/or promotional purposes by applying the word spesimen. Violation carries imprisonment of up to one year and a fine of up to Rp200,000,000.',
          'This project is educational and applies the word SPESIMEN to every note depiction it shows.',
        ],
      },
      {
        id: 'penandaan',
        heading: 'How the marking is applied',
        paragraphs: [
          'SPESIMEN is not a layer placed over the artwork. It is part of the artwork — the letterforms are drawn as vector strokes, in the same coordinate space as the schematic, produced by the same function call.',
        ],
        bullets: [
          'The marking is carried into any screenshot.',
          'It does not disappear if an element is hidden or the stylesheet is disabled.',
          'No code path can produce a schematic without it, and the build check fails if one ever does.',
        ],
      },
      {
        id: 'skema',
        heading: 'Why the drawings are deliberately plain',
        paragraphs: [
          'What is explained here is the mechanism, not the appearance of the note. A cross-section of intaglio printing, or a diagram of a security thread inside the paper, explains the physics — and that teaches far better than a photograph.',
          'So there is no photograph of a banknote anywhere in this repository. All artwork is original vector work. Note schematics are drawn only as far as needed to show where a feature sits: never photorealistic, and never at actual size — rendered width is capped below 70% of the real note and asserted at build time.',
        ],
      },
      {
        id: 'tidak',
        heading: 'What we deliberately do not do',
        paragraphs: [],
        bullets: [
          'No scanner, no camera, no image upload, no comparison tool.',
          'No judgement of any note as genuine or counterfeit.',
          'No downloadable full-note image at any resolution. Only mechanism diagrams can be shared.',
          'No account of material composition, ink chemistry, or printing process parameters. Explainers are written to check a note, never to make one.',
          'No network requests at runtime, no analytics, no accounts.',
        ],
      },
      {
        id: 'kewenangan',
        heading: 'Who determines authenticity',
        paragraphs: [
          'Bank Indonesia. Not this site, and not any app. If you have doubts about a note, take it to a bank or to a Bank Indonesia office to be examined.',
          'This site teaches the features of the currency. It cannot, and will not, tell you that your note is genuine.',
        ],
      },
    ],
    linksHeading: 'Sources',
    links: LINKS,
    notAffiliated:
      'A personal project. Not affiliated with Bank Indonesia or any government body, and it uses no institutional branding.',
  },
}
