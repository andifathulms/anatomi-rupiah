import type { Motif, Photo } from '@/lib/content/schema'
import { biUang } from '../citations'

/**
 * Motif photographs — CLAUDE.md invariant 13. Sourced from Wikimedia
 * Commons, license quoted verbatim from each file's own page, resized to a
 * 1200px longest edge. Hashes pinned in lib/compliance/photo-assets.ts.
 *
 * cempaka-hutan-kasar has none: no photograph of Magnolia vrieseana
 * (Elmerrillia ovalis) exists on Commons — it is a Sulawesi/Maluku-endemic
 * species with no free-licensed photo found anywhere searched. Not
 * substituted with a different cempaka species; left unillustrated instead.
 *
 * banda-neira's photo is taken from Pulau Pisang looking over the wider
 * Banda Islands, not a shot specifically of Banda Neira town — the closest
 * openly-licensed photograph found of the place this motif names.
 */
const PHOTOS: Readonly<Record<string, Photo>> = {
  'tari-topeng-betawi': {
    path: 'motif/tari-topeng-betawi.jpg',
    license: 'CC BY-SA 4.0',
    credit: 'Erwin Saleh Kurniawan',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:ErwinKurniawan_TopengBetawi.jpg',
  },
  'tari-legong': {
    path: 'motif/tari-legong.jpg',
    license: 'CC BY-SA 4.0',
    credit: 'Gede Agunata Wiryatama',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tari_Legong.jpg',
  },
  'tari-gong': {
    path: 'motif/tari-gong.jpg',
    license: 'CC BY-SA 4.0',
    credit: 'Arman Askari',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Penari_tua.jpg',
  },
  'tari-pakarena': {
    path: 'motif/tari-pakarena.jpg',
    license: 'CC BY-SA 4.0',
    credit: 'Ali Froghi',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Performing_pakarena_dance.jpg',
  },
  'tari-gambyong': {
    path: 'motif/tari-gambyong.jpg',
    license: 'CC BY-SA 4.0',
    credit: 'Herusutimbul',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tari_Gambyong_Kolosal.jpg',
  },
  'tari-piring': {
    path: 'motif/tari-piring.jpg',
    license: 'Public domain',
    credit: 'Malekhanif',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tari_Piring,_Bukittinggi.jpg',
  },
  'tari-tifa': {
    path: 'motif/tari-tifa.jpg',
    license: 'CC BY-SA 4.0',
    credit: 'Michael Tanur',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Penari_tifa_papua.jpg',
  },
  'raja-ampat': {
    path: 'motif/raja-ampat.jpg',
    license: 'CC BY-SA 4.0',
    credit: 'Rolandandika',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:The_Beauty_of_Piaynemo.jpg',
  },
  'taman-nasional-komodo': {
    path: 'motif/taman-nasional-komodo.jpg',
    license: 'CC BY-SA 4.0',
    credit: 'Devagonal',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pink_Beach,_Padar_Island,_Komodo_National_Park.jpg',
  },
  derawan: {
    path: 'motif/derawan.jpg',
    license: 'CC BY-SA 4.0',
    credit: 'Iwandimas84',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Derawan_islands.jpg',
  },
  'taman-nasional-wakatobi': {
    path: 'motif/taman-nasional-wakatobi.jpg',
    license: 'CC BY 2.0',
    credit: 'Jenny (Flickr: JennyHuang)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Flickr_-_JennyHuang_-_Wakatobi_Sunset_(1).jpg',
  },
  'gunung-bromo': {
    path: 'motif/gunung-bromo.jpg',
    license: 'CC BY-SA 3.0',
    credit: 'Thomas Hirsch',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Mount_Bromo_at_sunrise,_showing_its_volcanoes_and_Mount_Semeru_(background).jpg',
  },
  'ngarai-sianok': {
    path: 'motif/ngarai-sianok.jpg',
    license: 'CC BY 2.0',
    credit: 'Kars Alfrink',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Panorama_Ngarai_Sianok.jpg',
  },
  'banda-neira': {
    path: 'motif/banda-neira.jpg',
    license: 'CC BY-SA 4.0',
    credit: 'WiDi',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Banda_Pisang.jpg',
  },
  'anggrek-bulan': {
    path: 'motif/anggrek-bulan.jpg',
    license: 'CC BY-SA 4.0',
    credit: 'Lany pirna',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Anggrek_Bulan_(Phalaenopsis_amabilis).jpg',
  },
  'jepun-bali': {
    path: 'motif/jepun-bali.jpg',
    license: 'CC BY-SA 3.0',
    credit: 'Ariefrahman',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bunga_Kamboja_(Plumeria_sp).JPG',
  },
  'anggrek-hitam': {
    path: 'motif/anggrek-hitam.jpg',
    license: 'CC BY-SA 4.0',
    credit: 'Si Gam',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Coelogyne_pandurata.jpg',
  },
  'sedap-malam': {
    path: 'motif/sedap-malam.jpg',
    license: 'CC BY 2.0',
    credit: 'Swaminathan (Flickr: Swami Stream)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tuberose_-_Flickr_-_Swami_Stream.jpg',
  },
  jeumpa: {
    path: 'motif/jeumpa.jpg',
    license: 'CC BY-SA 3.0',
    credit: 'Mokkie',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cempaka_(Magnolia_champaca).jpg',
  },
  'anggrek-larat': {
    path: 'motif/anggrek-larat.jpg',
    license: 'CC BY-SA 4.0',
    credit: 'Koepo Aja Loeh',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Anggrek_larat.jpg',
  },
}

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
    ...(PHOTOS[id] === undefined ? {} : { photo: PHOTOS[id] }),
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
