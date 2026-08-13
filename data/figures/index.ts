import type { Claim, Figure } from '@/lib/content/schema'
import { ENSIKLOPEDIA_PAHLAWAN, biUang } from '../citations'

/**
 * The figures on the front of each note.
 *
 * Two kinds of claim only. What Bank Indonesia records about the note, cited to
 * BI; and what the Ensiklopedi Pahlawan Nasional records about the person,
 * cited to that entry. The encyclopedia is a 1995 Directorate of Culture
 * publication covering ninety heroes — an official source, and a followable one.
 *
 * It does not cover all seven notes' figures. Ir. H. Djuanda Kartawidjaja and
 * Dr. K.H. Idham Chalid are absent from it, so no biography is written for them
 * and the page names the omission. Invariant 8 does not bend for tidiness.
 *
 * §4 review — nothing here concerns a security feature at all.
 */

interface Seed {
  readonly id: string
  readonly name: string
  readonly pageId: number
  readonly label: string
  readonly noteId: string
  readonly noteEn: string
  readonly lifespan?: string
  /** Entry heading in the encyclopedia, for the citation locator. */
  readonly entry?: string
  readonly bio?: { readonly id: string; readonly en: string }
  readonly honour?: { readonly id: string; readonly en: string }
}

const SEEDS: readonly Seed[] = [
  {
    id: 'soekarno-hatta',
    name: 'Dr. (H.C.) Ir. Soekarno dan Dr. (H.C.) Drs. Mohammad Hatta',
    pageId: 1,
    label: 'Rp100.000 TE 2022',
    noteId: 'Rp100.000',
    noteEn: 'Rp100,000',
    lifespan: '1901–1970 · 1902–1980',
    entry: 'Dr. Ir. Soekarno (1901–1970); Drs. Mohammad Hatta (1902–1980)',
    bio: {
      id: 'Pada 17 Agustus 1945 keduanya memproklamasikan kemerdekaan Indonesia. Soekarno mendirikan Partai Nasional Indonesia pada 1927 dan menjalani penahanan serta pembuangan ke Ende dan Bengkulu; Hatta memimpin Perhimpunan Indonesia di Negeri Belanda dan dibuang ke Boven Digoel, lalu ke Banda Neira. Hatta menjadi Wakil Presiden pertama Republik Indonesia.',
      en: 'On 17 August 1945 the two proclaimed Indonesian independence. Soekarno founded the Partai Nasional Indonesia in 1927 and was imprisoned and exiled to Ende and Bengkulu; Hatta led the Perhimpunan Indonesia in the Netherlands and was exiled to Boven Digoel, then Banda Neira. Hatta became the Republic’s first Vice-President.',
    },
    honour: {
      id: 'Keduanya ditetapkan sebagai Pahlawan Proklamator melalui Surat Keputusan Presiden RI No. 081/TK/Tahun 1986 tanggal 23 Oktober 1986.',
      en: 'Both were named Pahlawan Proklamator by Presidential Decree No. 081/TK/1986, dated 23 October 1986.',
    },
  },
  {
    id: 'djuanda-kartawidjaja',
    name: 'Ir. H. Djuanda Kartawidjaja',
    pageId: 2,
    label: 'Rp50.000 TE 2022',
    noteId: 'Rp50.000',
    noteEn: 'Rp50,000',
  },
  {
    id: 'gssj-ratulangi',
    name: 'Dr. G.S.S.J. Ratulangi',
    pageId: 3,
    label: 'Rp20.000 TE 2022',
    noteId: 'Rp20.000',
    noteEn: 'Rp20,000',
    lifespan: '1890–1949',
    entry: 'Dr. G.S.S.J. Ratulangi (1890–1949)',
    bio: {
      id: 'Dikenal sebagai Sam Ratulangi, lahir 5 November 1890 di Tondano, Sulawesi Utara. Ia menamatkan Hoofden School di Tondano, melanjutkan ke sekolah teknik di Jakarta, dan pada 1915 memperoleh ijazah guru ilmu pasti untuk sekolah menengah dari Negeri Belanda.',
      en: 'Known as Sam Ratulangi, born 5 November 1890 in Tondano, North Sulawesi. He completed the Hoofden School in Tondano, went on to technical school in Jakarta, and in 1915 obtained a Dutch qualification to teach mathematics at secondary level.',
    },
    honour: {
      id: 'Ditetapkan sebagai Pahlawan Nasional melalui Surat Keputusan Presiden RI No. 590/Tahun 1961 tanggal 9 November 1961.',
      en: 'Named a national hero by Presidential Decree No. 590/1961, dated 9 November 1961.',
    },
  },
  {
    id: 'frans-kaisiepo',
    name: 'Frans Kaisiepo',
    pageId: 4,
    label: 'Rp10.000 TE 2022',
    noteId: 'Rp10.000',
    noteEn: 'Rp10,000',
    lifespan: '1921–1979',
    entry: 'Frans Kaisiepo (1921–1979)',
    bio: {
      id: 'Pencetus perlawanan rakyat Biak terhadap pemerintah kolonial Belanda pada 1948, dan pada tahun itu pula ia menolak memimpin delegasi Nederlands Nieuw Guinea ke Konferensi Meja Bundar. Ia menjalani hukuman pada 1954–1962, lalu mendirikan Partai Politik Irian yang menuntut penyatuan kembali wilayah itu dengan Republik Indonesia.',
      en: 'He instigated the Biak resistance against Dutch colonial rule in 1948, and in the same year refused to lead the Netherlands New Guinea delegation to the Round Table Conference. Imprisoned from 1954 to 1962, he then founded the Partai Politik Irian, which demanded the territory’s reunification with Indonesia.',
    },
    honour: {
      id: 'Ditetapkan sebagai Pahlawan Nasional melalui Surat Keputusan Presiden RI No. 077/TK/Tahun 1993 tanggal 14 September 1993.',
      en: 'Named a national hero by Presidential Decree No. 077/TK/1993, dated 14 September 1993.',
    },
  },
  {
    id: 'idham-chalid',
    name: 'Dr. K.H. Idham Chalid',
    pageId: 5,
    label: 'Rp5.000 TE 2022',
    noteId: 'Rp5.000',
    noteEn: 'Rp5,000',
  },
  {
    id: 'mohammad-hoesni-thamrin',
    name: 'Mohammad Hoesni Thamrin',
    pageId: 6,
    label: 'Rp2.000 TE 2022',
    noteId: 'Rp2.000',
    noteEn: 'Rp2,000',
    lifespan: '1894–1941',
    entry: 'Mohammad Husni Thamrin (1894–1941)',
    bio: {
      id: 'Tokoh pergerakan dari Betawi. Pada masa akhir hidupnya ia dikenai tahanan rumah dan dilarang menerima kunjungan kawan-kawannya. Ia wafat pada 11 Januari 1941 dan dimakamkan di pekuburan Karet, Jakarta.',
      en: 'A Betawi figure of the nationalist movement. In his final period he was placed under house arrest and forbidden visits from his associates. He died on 11 January 1941 and was buried at the Karet cemetery in Jakarta.',
    },
    honour: {
      id: 'Ditetapkan sebagai Pahlawan Nasional melalui Surat Keputusan Presiden RI No. 175/Tahun 1960 tanggal 28 Juli 1960.',
      en: 'Named a national hero by Presidential Decree No. 175/1960, dated 28 July 1960.',
    },
  },
  {
    id: 'tjut-meutia',
    name: 'Tjut Meutia',
    pageId: 7,
    label: 'Rp1.000 TE 2022',
    noteId: 'Rp1.000',
    noteEn: 'Rp1,000',
    lifespan: '1870–1910',
    entry: 'Cut Meutia (1870–1910)',
    bio: {
      id: 'Pejuang Aceh, dieja Cut Meutia dalam sumber sejarah. Setelah suaminya Teuku Cik Tunong ditangkap dan dihukum mati Belanda pada 1905, ia meneruskan perlawanan. Pada pertempuran Paya Ciciem, 26 September 1910, ia meloloskan diri dan kemudian memimpin pasukan yang tinggal berkekuatan 45 orang dengan 13 pucuk senjata, disertai anaknya Raja Sabil yang berumur sebelas tahun.',
      en: 'An Acehnese fighter, spelled Cut Meutia in the historical sources. After her husband Teuku Cik Tunong was captured and executed by the Dutch in 1905, she carried the resistance on. At the battle of Paya Ciciem on 26 September 1910 she escaped, and went on to lead a force reduced to 45 people with 13 weapons, accompanied by her eleven-year-old son Raja Sabil.',
    },
    honour: {
      id: 'Ditetapkan sebagai Pahlawan Nasional melalui Surat Keputusan Presiden RI No. 107/Tahun 1964 tanggal 2 Mei 1964.',
      en: 'Named a national hero by Presidential Decree No. 107/1964, dated 2 May 1964.',
    },
  },
]

function claimsFor(seed: Seed): Claim[] {
  const claims: Claim[] = [
    {
      text: {
        id: `Bank Indonesia mencantumkan ${seed.name} sebagai desain utama sisi depan pecahan ${seed.noteId} Tahun Emisi 2022, dan gambar yang sama menjadi tanda airnya.`,
        en: `Bank Indonesia records ${seed.name} as the principal design on the front of the ${seed.noteEn} note, emission year 2022, and the same portrait forms its watermark.`,
      },
      citations: [biUang(seed.pageId, seed.label, 'Desain Utama — Depan; Tanda Air')],
    },
  ]

  if (seed.bio !== undefined && seed.entry !== undefined) {
    claims.push({ text: seed.bio, citations: [ENSIKLOPEDIA_PAHLAWAN(seed.entry)] })
  }
  if (seed.honour !== undefined && seed.entry !== undefined) {
    claims.push({ text: seed.honour, citations: [ENSIKLOPEDIA_PAHLAWAN(seed.entry)] })
  }

  return claims
}

export const figures: readonly Figure[] = SEEDS.map((seed) => ({
  type: 'figure' as const,
  id: seed.id,
  name: seed.name,
  ...(seed.lifespan === undefined ? {} : { lifespan: seed.lifespan }),
  claims: claimsFor(seed),
}))

/** Figures whose biography is still unwritten, named openly on the page. */
export const FIGURES_WITHOUT_BIOGRAPHY: readonly string[] = SEEDS.filter(
  (seed) => seed.bio === undefined,
).map((seed) => seed.name)
