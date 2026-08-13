import type { Denomination, Placement } from '@/lib/content/schema'
import { PERTUNI_BLIND_CODE, biUang } from '../citations'
import { centreRight, edgeCode, portrait, rightPanel, threadBand, upperRight } from './regions'

/**
 * Uang Rupiah Kertas Tahun Emisi 2016 — still legal tender, still in wallets.
 *
 * Bank Indonesia's pages for these notes enumerate the unsur pengaman in full,
 * which is why the three largest denominations carry the richest marker sets on
 * the sheet. Every marker below is cited to the note's own BI page.
 *
 * §4 review — each note claim states what to observe. None describes production.
 */

interface NoteSeed {
  readonly id: string
  readonly valueIdr: number
  readonly widthMm: number
  readonly pageId: number
  readonly label: string
}

const SEEDS: readonly NoteSeed[] = [
  { id: 'seratus-ribu-2016', valueIdr: 100000, widthMm: 151, pageId: 11, label: 'Rp100.000 TE 2016' },
  { id: 'lima-puluh-ribu-2016', valueIdr: 50000, widthMm: 149, pageId: 12, label: 'Rp50.000 TE 2016' },
  { id: 'dua-puluh-ribu-2016', valueIdr: 20000, widthMm: 147, pageId: 13, label: 'Rp20.000 TE 2016' },
]

function placementsFor(seed: NoteSeed): Placement[] {
  const cite = (locator: string) => [biUang(seed.pageId, seed.label, locator)]

  return [
    {
      featureId: 'tanda-air',
      face: 'depan',
      region: rightPanel(seed.widthMm),
      note: {
        text: {
          id: 'Bank Indonesia menyebut tanda air berupa gambar pahlawan nasional, disertai electrotype berupa ornamen tertentu. Keduanya baru tampak saat diterawang.',
          en: 'Bank Indonesia names a watermark of the national hero, together with an electrotype of certain ornaments. Both appear only when the note is held to the light.',
        },
        citations: cite('Unsur Pengaman — Tanda Air, Electrotype'),
      },
    },
    {
      featureId: 'benang-pengaman',
      face: 'depan',
      region: threadBand(seed.widthMm),
      note: {
        text: {
          id: 'Benang pengaman dianyam pada bahan uang, membentang dari tepi atas ke tepi bawah.',
          en: 'The security thread is woven into the substrate, running from the top edge to the bottom edge.',
        },
        citations: cite('Unsur Pengaman — Benang Pengaman'),
      },
    },
    {
      featureId: 'gambar-saling-isi',
      face: 'depan',
      region: centreRight(seed.widthMm),
      note: {
        text: {
          id: 'Gambar saling isi berupa logo Bank Indonesia, terlihat utuh apabila diterawang.',
          en: 'The rectoverso is the Bank Indonesia logo, which reads as one whole shape when held to the light.',
        },
        citations: cite('Unsur Pengaman — Gambar Saling Isi (Rectoverso)'),
      },
    },
    {
      featureId: 'cetak-intaglio',
      face: 'depan',
      region: portrait(),
      note: {
        text: {
          id: 'Hasil cetak yang terasa kasar apabila diraba, antara lain pada gambar utama dan angka nominal.',
          en: 'Printing that feels rough to the touch, including on the main image and the denomination numerals.',
        },
        citations: cite('Unsur Pengaman — Hasil cetak terasa kasar'),
      },
    },
    {
      featureId: 'tinta-berubah-warna',
      face: 'depan',
      region: upperRight(seed.widthMm),
      note: {
        text: {
          id: 'Colour shifting berupa gambar perisai yang memuat logo Bank Indonesia; warnanya bergeser saat uang dimiringkan.',
          en: 'A colour-shifting shield carrying the Bank Indonesia logo; its colour moves as the note is tilted.',
        },
        citations: cite('Unsur Pengaman — Colour Shifting'),
      },
    },
    {
      featureId: 'kode-tuna-netra',
      face: 'depan',
      region: edgeCode(seed.widthMm),
      note: {
        text: {
          id: 'Kode tuna netra berupa pasangan garis di sisi kiri dan kanan, yang terasa kasar apabila diraba.',
          en: 'The blind code is a set of paired lines at the left and right sides, which feel rough to the touch.',
        },
        citations: cite('Unsur Pengaman — Kode Tuna Netra (Blind Code)'),
      },
    },
  ]
}

/** One pair on the largest note, one more with every step down — Pertuni. */
const PAIRS_BY_VALUE: Readonly<Record<number, number>> = {
  100000: 1,
  50000: 2,
  20000: 3,
  10000: 4,
  5000: 5,
  2000: 6,
  1000: 7,
}

export const te2016: readonly Denomination[] = SEEDS.map((seed) => ({
  type: 'denomination' as const,
  id: seed.id,
  valueIdr: seed.valueIdr,
  emisi: 2016,
  dimensions: {
    widthMm: seed.widthMm,
    heightMm: 65,
    citations: [biUang(seed.pageId, seed.label, 'Ukuran')],
  },
  placements: placementsFor(seed),
  kodeTunaNetra: {
    marks: PAIRS_BY_VALUE[seed.valueIdr] ?? 0,
    description: {
      text: {
        id: `Pada pecahan ini terdapat ${PAIRS_BY_VALUE[seed.valueIdr] ?? 0} pasang garis timbul di tiap sisi. Jumlahnya bertambah satu pasang setiap turun satu pecahan.`,
        en: `This denomination carries ${PAIRS_BY_VALUE[seed.valueIdr] ?? 0} pair(s) of raised lines on each side. The count rises by one pair with each step down in denomination.`,
      },
      citations: [PERTUNI_BLIND_CODE, biUang(seed.pageId, seed.label, 'Unsur Pengaman — Kode Tuna Netra (Blind Code)')],
    },
  },
}))
