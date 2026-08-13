import type { Motif } from '@/lib/content/schema'
import { biUang } from '../citations'

/**
 * The reverse of every note carries three subjects: a regional dance, a
 * landscape, and a flower. Most people carry these daily without knowing what
 * they depict — PRD §6.6.
 *
 * Every name below is quoted from the "Desain Utama — Belakang" row of that
 * note's own page in Bank Indonesia's catalogue. Where a subject's history or
 * region is not stated by BI, it is not asserted here.
 */

interface NoteSeed {
  readonly pageId: number
  readonly label: string
  readonly noteId: string
  readonly noteEn: string
  readonly tari: readonly [id: string, name: string]
  readonly pemandangan: readonly [id: string, name: string]
  readonly bunga: readonly [id: string, name: string]
}

const SEEDS: readonly NoteSeed[] = [
  {
    pageId: 1,
    label: 'Rp100.000 TE 2022',
    noteId: 'Rp100.000',
    noteEn: 'Rp100,000',
    tari: ['tari-topeng-betawi', 'Tari Topeng Betawi'],
    pemandangan: ['raja-ampat', 'Pemandangan Alam Raja Ampat'],
    bunga: ['anggrek-bulan', 'Bunga Anggrek Bulan'],
  },
  {
    pageId: 2,
    label: 'Rp50.000 TE 2022',
    noteId: 'Rp50.000',
    noteEn: 'Rp50,000',
    tari: ['tari-legong', 'Tari Legong'],
    pemandangan: ['taman-nasional-komodo', 'Pemandangan Alam Taman Nasional Komodo'],
    bunga: ['jepun-bali', 'Bunga Jepun Bali'],
  },
  {
    pageId: 3,
    label: 'Rp20.000 TE 2022',
    noteId: 'Rp20.000',
    noteEn: 'Rp20,000',
    tari: ['tari-gong', 'Tari Gong'],
    pemandangan: ['derawan', 'Pemandangan Alam Derawan'],
    bunga: ['anggrek-hitam', 'Bunga Anggrek Hitam'],
  },
  {
    pageId: 4,
    label: 'Rp10.000 TE 2022',
    noteId: 'Rp10.000',
    noteEn: 'Rp10,000',
    tari: ['tari-pakarena', 'Tari Pakarena'],
    pemandangan: ['taman-nasional-wakatobi', 'Pemandangan Alam Taman Nasional Wakatobi'],
    bunga: ['cempaka-hutan-kasar', 'Bunga Cempaka Hutan Kasar'],
  },
  {
    pageId: 5,
    label: 'Rp5.000 TE 2022',
    noteId: 'Rp5.000',
    noteEn: 'Rp5,000',
    tari: ['tari-gambyong', 'Tari Gambyong'],
    pemandangan: ['gunung-bromo', 'Pemandangan Alam Gunung Bromo'],
    bunga: ['sedap-malam', 'Bunga Sedap Malam'],
  },
  {
    pageId: 6,
    label: 'Rp2.000 TE 2022',
    noteId: 'Rp2.000',
    noteEn: 'Rp2,000',
    tari: ['tari-piring', 'Tari Piring'],
    pemandangan: ['ngarai-sianok', 'Pemandangan Alam Ngarai Sianok'],
    bunga: ['jeumpa', 'Bunga Jeumpa'],
  },
  {
    pageId: 7,
    label: 'Rp1.000 TE 2022',
    noteId: 'Rp1.000',
    noteEn: 'Rp1,000',
    tari: ['tari-tifa', 'Tari Tifa'],
    pemandangan: ['banda-neira', 'Pemandangan Alam Banda Neira'],
    bunga: ['anggrek-larat', 'Bunga Anggrek Larat'],
  },
]

function motif(
  seed: NoteSeed,
  kind: Motif['kind'],
  entry: readonly [id: string, name: string],
): Motif {
  const [id, name] = entry
  return {
    type: 'motif',
    id,
    name: { id: name, en: name },
    kind,
    origin: { id: seed.noteId, en: seed.noteEn },
    claims: [
      {
        text: {
          id: `Bank Indonesia mencantumkan ${name} sebagai bagian desain utama sisi belakang pecahan ${seed.noteId} Tahun Emisi 2022.`,
          en: `Bank Indonesia records ${name} as part of the principal design on the back of the ${seed.noteEn} note, emission year 2022.`,
        },
        citations: [biUang(seed.pageId, seed.label, 'Desain Utama — Belakang')],
      },
    ],
  }
}

export const motifs: readonly Motif[] = SEEDS.flatMap((seed) => [
  motif(seed, 'tari', seed.tari),
  motif(seed, 'pemandangan', seed.pemandangan),
  motif(seed, 'bunga', seed.bunga),
])

/** Which motifs belong to which note, for the denomination records. */
export const MOTIF_IDS_BY_PAGE: Readonly<Record<number, string[]>> = Object.fromEntries(
  SEEDS.map((seed) => [seed.pageId, [seed.tari[0], seed.pemandangan[0], seed.bunga[0]]]),
)

export const FIGURE_ID_BY_PAGE: Readonly<Record<number, string>> = {
  1: 'soekarno-hatta',
  2: 'djuanda-kartawidjaja',
  3: 'gssj-ratulangi',
  4: 'frans-kaisiepo',
  5: 'idham-chalid',
  6: 'mohammad-hoesni-thamrin',
  7: 'tjut-meutia',
}
