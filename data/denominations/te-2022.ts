import type { Denomination, Placement } from '@/lib/content/schema'
import { PERTUNI_BLIND_CODE, biUang, pbi2022 } from '../citations'
import { FIGURE_ID_BY_PAGE, MOTIF_IDS_BY_PAGE } from '../motifs'
import {
  centreRight,
  edgeCode,
  microLine,
  portrait,
  rightPanel,
  threadBand,
  upperLeft,
  upperRight,
} from './regions'

/**
 * Uang Rupiah Kertas Tahun Emisi 2022 — the current series.
 *
 * Grounded on the Peraturan Bank Indonesia issued for each denomination rather
 * than on the catalogue page. The PBI is primary law and enumerates each note's
 * ciri article by article, which is both a better source and a fuller one: it
 * names features the catalogue page omits.
 *
 * §4 review — every claim below says where to look and what appears. Note that
 * the PBIs state the exact microtext wording; that is deliberately *not*
 * repeated here. Reproducing the strings would describe a specification rather
 * than a check, and a reader checking a note needs only to know that the rule
 * resolves into letters under a loupe.
 */

interface NoteSeed {
  readonly id: string
  readonly valueIdr: number
  readonly widthMm: number
  /** Page id in BI's Gambar Uang catalogue. */
  readonly pageId: number
  /** The note's own PBI: Nomor 24/N/PBI/2022. */
  readonly pbi: number
  readonly label: string
  readonly denomination: string
  /** Whose portrait forms the watermark, per BI's own page. */
  readonly watermarkFigure: string
  /**
   * Colour shift is named only in the PBIs for the two largest notes, matching
   * Bank Indonesia's own statement about where the effect appears.
   */
  readonly hasColourShift: boolean
  /** Pairs of raised lines, per Pertuni. */
  readonly blindCodePairs: number
}

const SEEDS: readonly NoteSeed[] = [
  {
    id: 'seratus-ribu-2022',
    valueIdr: 100000,
    widthMm: 151,
    pageId: 1,
    pbi: 8,
    label: 'Rp100.000 TE 2022',
    denomination: '100.000 (seratus ribu)',
    watermarkFigure: 'Dr. (H.C.) Ir. Soekarno dan Dr. (H.C.) Drs. Mohammad Hatta',
    hasColourShift: true,
    blindCodePairs: 1,
  },
  {
    id: 'lima-puluh-ribu-2022',
    valueIdr: 50000,
    widthMm: 146,
    pageId: 2,
    pbi: 9,
    label: 'Rp50.000 TE 2022',
    denomination: '50.000 (lima puluh ribu)',
    watermarkFigure: 'Ir. H. Djuanda Kartawidjaja',
    hasColourShift: true,
    blindCodePairs: 2,
  },
  {
    id: 'dua-puluh-ribu-2022',
    valueIdr: 20000,
    widthMm: 141,
    pageId: 3,
    pbi: 10,
    label: 'Rp20.000 TE 2022',
    denomination: '20.000 (dua puluh ribu)',
    watermarkFigure: 'Dr. G.S.S.J. Ratulangi',
    hasColourShift: false,
    blindCodePairs: 3,
  },
  {
    id: 'sepuluh-ribu-2022',
    valueIdr: 10000,
    widthMm: 136,
    pageId: 4,
    pbi: 11,
    label: 'Rp10.000 TE 2022',
    denomination: '10.000 (sepuluh ribu)',
    watermarkFigure: 'Frans Kaisiepo',
    hasColourShift: false,
    blindCodePairs: 4,
  },
  {
    id: 'lima-ribu-2022',
    valueIdr: 5000,
    widthMm: 131,
    pageId: 5,
    pbi: 12,
    label: 'Rp5.000 TE 2022',
    denomination: '5.000 (lima ribu)',
    watermarkFigure: 'Dr. K.H. Idham Chalid',
    hasColourShift: false,
    blindCodePairs: 5,
  },
  {
    id: 'dua-ribu-2022',
    valueIdr: 2000,
    widthMm: 126,
    pageId: 6,
    pbi: 13,
    label: 'Rp2.000 TE 2022',
    denomination: '2.000 (dua ribu)',
    watermarkFigure: 'Mohammad Hoesni Thamrin',
    hasColourShift: false,
    blindCodePairs: 6,
  },
  {
    id: 'seribu-2022',
    valueIdr: 1000,
    widthMm: 121,
    pageId: 7,
    pbi: 14,
    label: 'Rp1.000 TE 2022',
    denomination: '1.000 (seribu)',
    watermarkFigure: 'Tjut Meutia',
    hasColourShift: false,
    blindCodePairs: 7,
  },
]

function placementsFor(seed: NoteSeed): Placement[] {
  const pbi = (locator: string) => [pbi2022(seed.pbi, seed.denomination, locator)]

  const placements: Placement[] = [
    {
      featureId: 'tanda-air',
      face: 'depan',
      region: rightPanel(seed.widthMm),
      note: {
        text: {
          id: `Peraturan untuk pecahan ini menyebut adanya tanda air berupa gambar ${seed.watermarkFigure}, disertai electrotype. Terawangkan ke arah cahaya untuk melihat keduanya.`,
          en: `The regulation for this note states a watermark portrait of ${seed.watermarkFigure}, together with an electrotype. Hold the note to the light to see both.`,
        },
        citations: [
          pbi2022(seed.pbi, seed.denomination, 'Pasal 7 — tanda air (watermark) dan electrotype'),
          biUang(seed.pageId, seed.label, 'Tanda Air'),
        ],
      },
    },
    {
      featureId: 'benang-pengaman',
      face: 'depan',
      region: threadBand(seed.widthMm),
      note: {
        text: {
          id: 'Peraturan menyebut benang pengaman berbentuk anyaman pada pecahan ini. Diterawang, benang terbaca sebagai satu garis yang menerus.',
          en: 'The regulation states a woven security thread on this note. Held to the light, it reads as one continuous line.',
        },
        citations: pbi('Pasal 7 — benang pengaman berbentuk anyaman'),
      },
    },
    {
      featureId: 'gambar-saling-isi',
      face: 'depan',
      region: centreRight(seed.widthMm),
      note: {
        text: {
          id: 'Gambar saling isi (rectoverso) dari logo Bank Indonesia, yang dapat dilihat secara utuh jika diterawangkan ke arah cahaya.',
          en: 'A rectoverso of the Bank Indonesia logo, which can be seen whole when the note is held up to the light.',
        },
        citations: pbi('Pasal 5 ayat (2) — gambar saling isi (rectoverso)'),
      },
    },
    {
      featureId: 'cetak-intaglio',
      face: 'depan',
      region: portrait(),
      note: {
        text: {
          id: 'Hasil cetak yang terasa kasar jika diraba, antara lain pada gambar utama pahlawan nasional dan angka nominalnya.',
          en: 'Printing that feels rough to the touch, including on the hero portrait and the denomination numerals.',
        },
        citations: pbi('Pasal 5 ayat (2) — hasil cetak yang terasa kasar jika diraba'),
      },
    },
    {
      featureId: 'kode-tuna-netra',
      face: 'depan',
      region: edgeCode(seed.widthMm),
      note: {
        text: {
          id: `Kode tuna netra (blind code) berupa efek rabaan. Pada pecahan ini terdapat ${seed.blindCodePairs} pasang garis di tiap sisi.`,
          en: `A blind code, present as a tactile effect. This note carries ${seed.blindCodePairs} pair(s) of lines on each side.`,
        },
        citations: [
          pbi2022(seed.pbi, seed.denomination, 'Pasal 5 ayat (2) — kode tuna netra (blind code)'),
          PERTUNI_BLIND_CODE,
        ],
      },
    },
    {
      featureId: 'mikroteks',
      face: 'depan',
      region: microLine(seed.widthMm),
      note: {
        text: {
          id: 'Mikro teks yang hanya dapat dibaca dengan bantuan kaca pembesar. Tanpa alat, bagian ini terbaca sebagai garis halus biasa.',
          en: 'Microtext legible only with the help of a magnifier. Unaided, it reads as an ordinary fine rule.',
        },
        citations: pbi('Pasal 5 ayat (2) — mikro teks'),
      },
    },
    {
      featureId: 'tinta-tampak-uv',
      face: 'depan',
      region: upperLeft(),
      note: {
        text: {
          id: 'Hasil cetak yang akan memendar dalam beberapa warna jika dilihat dengan sinar ultraviolet.',
          en: 'Printing that fluoresces in several colours when viewed under ultraviolet light.',
        },
        citations: pbi('Pasal 5 ayat (2) — memendar dengan sinar ultraviolet'),
      },
    },
  ]

  if (seed.hasColourShift) {
    placements.push({
      featureId: 'tinta-berubah-warna',
      face: 'depan',
      region: upperRight(seed.widthMm),
      note: {
        text: {
          id: 'Gambar bunga khas daerah yang di dalamnya berisi logo Bank Indonesia, yang akan berubah warna dan memiliki efek gerak dinamis jika dilihat dari sudut pandang berbeda.',
          en: 'A regional flower containing the Bank Indonesia logo, which changes colour and shows a dynamic movement effect when viewed from a different angle.',
        },
        citations: pbi('Pasal 5 ayat (2) — berubah warna dan efek gerak dinamis'),
      },
    })
  }

  return placements
}

export const te2022: readonly Denomination[] = SEEDS.map((seed) => ({
  type: 'denomination' as const,
  id: seed.id,
  valueIdr: seed.valueIdr,
  emisi: 2022,
  dimensions: {
    widthMm: seed.widthMm,
    heightMm: 65,
    citations: [
      pbi2022(seed.pbi, seed.denomination, 'Pasal 7 — ukuran panjang dan lebar'),
      biUang(seed.pageId, seed.label, 'Ukuran'),
    ],
  },
  figureId: FIGURE_ID_BY_PAGE[seed.pageId],
  motifIds: MOTIF_IDS_BY_PAGE[seed.pageId],
  placements: placementsFor(seed),
  kodeTunaNetra: {
    marks: seed.blindCodePairs,
    description: {
      text: {
        id: `Peraturan untuk pecahan ini menyebut kode tuna netra berupa efek rabaan. Terdapat ${seed.blindCodePairs} pasang garis timbul di tiap sisi; jumlahnya bertambah satu pasang setiap turun satu pecahan.`,
        en: `The regulation for this note states a blind code present as a tactile effect. It carries ${seed.blindCodePairs} pair(s) of raised lines on each side; the count rises by one pair with each step down in denomination.`,
      },
      citations: [
        pbi2022(seed.pbi, seed.denomination, 'Pasal 5 ayat (2) — kode tuna netra (blind code)'),
        PERTUNI_BLIND_CODE,
      ],
    },
  },
}))
