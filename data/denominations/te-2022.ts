import type { Denomination, Placement } from '@/lib/content/schema'
import { biUang } from '../citations'
import { rightPanel, upperLeft } from './regions'

/**
 * Uang Rupiah Kertas Tahun Emisi 2022 — the current series.
 *
 * Each note carries only the features Bank Indonesia names on that note's own
 * page, cited to that page. Where BI's page does not name a feature, none is
 * claimed here: an uncited marker would be a guess wearing the clothes of a fact.
 *
 * §4 review — every note claim below says where to look and what appears. None
 * describes how any feature is produced.
 */

interface NoteSeed {
  readonly id: string
  readonly valueIdr: number
  readonly widthMm: number
  readonly pageId: number
  readonly label: string
  /** Whose portrait forms the watermark, per BI's own page. */
  readonly watermarkFigure: string
  /** BI's page shows an ultraviolet comparison for this note. */
  readonly hasUv: boolean
}

const SEEDS: readonly NoteSeed[] = [
  { id: 'seratus-ribu-2022', valueIdr: 100000, widthMm: 151, pageId: 1, label: 'Rp100.000 TE 2022', watermarkFigure: 'Dr. (H.C.) Ir. Soekarno dan Dr. (H.C.) Drs. Mohammad Hatta', hasUv: true },
  { id: 'lima-puluh-ribu-2022', valueIdr: 50000, widthMm: 146, pageId: 2, label: 'Rp50.000 TE 2022', watermarkFigure: 'Ir. H. Djuanda Kartawidjaja', hasUv: true },
  { id: 'dua-puluh-ribu-2022', valueIdr: 20000, widthMm: 141, pageId: 3, label: 'Rp20.000 TE 2022', watermarkFigure: 'Dr. G.S.S.J. Ratulangi', hasUv: true },
  { id: 'sepuluh-ribu-2022', valueIdr: 10000, widthMm: 136, pageId: 4, label: 'Rp10.000 TE 2022', watermarkFigure: 'Frans Kaisiepo', hasUv: false },
  { id: 'lima-ribu-2022', valueIdr: 5000, widthMm: 131, pageId: 5, label: 'Rp5.000 TE 2022', watermarkFigure: 'Dr. K.H. Idham Chalid', hasUv: false },
  { id: 'dua-ribu-2022', valueIdr: 2000, widthMm: 126, pageId: 6, label: 'Rp2.000 TE 2022', watermarkFigure: 'Mohammad Hoesni Thamrin', hasUv: false },
  { id: 'seribu-2022', valueIdr: 1000, widthMm: 121, pageId: 7, label: 'Rp1.000 TE 2022', watermarkFigure: 'Tjut Meutia', hasUv: false },
]

function placementsFor(seed: NoteSeed): Placement[] {
  const watermark: Placement = {
    featureId: 'tanda-air',
    face: 'depan',
    region: rightPanel(seed.widthMm),
    note: {
      text: {
        id: `Tanda air pada pecahan ini berupa gambar ${seed.watermarkFigure}. Terawangkan ke arah cahaya untuk melihatnya.`,
        en: `The watermark on this note is a portrait of ${seed.watermarkFigure}. Hold the note to the light to see it.`,
      },
      citations: [biUang(seed.pageId, seed.label, 'Tanda Air')],
    },
  }

  if (!seed.hasUv) return [watermark]

  return [
    watermark,
    {
      featureId: 'tinta-tampak-uv',
      face: 'depan',
      region: upperLeft(),
      note: {
        text: {
          id: 'Bank Indonesia menampilkan perbandingan pecahan ini di bawah sinar ultraviolet: sebagian bidang memendar yang dalam cahaya biasa tidak terlihat berbeda.',
          en: 'Bank Indonesia shows this note under ultraviolet light: areas glow that look no different in ordinary light.',
        },
        citations: [biUang(seed.pageId, seed.label, 'Ultra Violet')],
      },
    },
  ]
}

export const te2022: readonly Denomination[] = SEEDS.map((seed) => ({
  type: 'denomination' as const,
  id: seed.id,
  valueIdr: seed.valueIdr,
  emisi: 2022,
  dimensions: {
    widthMm: seed.widthMm,
    heightMm: 65,
    citations: [biUang(seed.pageId, seed.label, 'Ukuran')],
  },
  placements: placementsFor(seed),
}))
