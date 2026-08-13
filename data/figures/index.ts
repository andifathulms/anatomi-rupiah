import type { Figure } from '@/lib/content/schema'
import { biUang } from '../citations'

/**
 * The figures on the front of each note.
 *
 * Deliberately narrow. Every claim here is one Bank Indonesia makes on the
 * note's own page — the name as BI writes it, and which note carries it.
 *
 * Fuller biographies are not written yet, because the sources checked for them
 * (the IKPNI national-hero pages) refuse automated retrieval and nothing else
 * consulted was both authoritative and followable. Invariant 8 is not a
 * formality: an uncited biography would not ship, so it is not written. The
 * page says so openly rather than padding the gap.
 */

interface Seed {
  readonly id: string
  readonly name: string
  readonly pageId: number
  readonly label: string
  readonly noteId: string
  readonly noteEn: string
}

const SEEDS: readonly Seed[] = [
  {
    id: 'soekarno-hatta',
    name: 'Dr. (H.C.) Ir. Soekarno dan Dr. (H.C.) Drs. Mohammad Hatta',
    pageId: 1,
    label: 'Rp100.000 TE 2022',
    noteId: 'Rp100.000',
    noteEn: 'Rp100,000',
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
  },
  {
    id: 'frans-kaisiepo',
    name: 'Frans Kaisiepo',
    pageId: 4,
    label: 'Rp10.000 TE 2022',
    noteId: 'Rp10.000',
    noteEn: 'Rp10,000',
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
  },
  {
    id: 'tjut-meutia',
    name: 'Tjut Meutia',
    pageId: 7,
    label: 'Rp1.000 TE 2022',
    noteId: 'Rp1.000',
    noteEn: 'Rp1,000',
  },
]

export const figures: readonly Figure[] = SEEDS.map((seed) => ({
  type: 'figure' as const,
  id: seed.id,
  name: seed.name,
  claims: [
      {
        text: {
          id: `Bank Indonesia mencantumkan ${seed.name} sebagai desain utama sisi depan pecahan ${seed.noteId} Tahun Emisi 2022.`,
          en: `Bank Indonesia records ${seed.name} as the principal design on the front of the ${seed.noteEn} note, emission year 2022.`,
        },
        citations: [biUang(seed.pageId, seed.label, 'Desain Utama — Depan')],
      },
      {
        text: {
          id: `Gambar ${seed.name} juga menjadi tanda air pada pecahan ini, sehingga tampak saat uang diterawang.`,
          en: `The portrait of ${seed.name} is also the watermark on this note, so it appears when the note is held to the light.`,
        },
        citations: [biUang(seed.pageId, seed.label, 'Tanda Air')],
      },
    ],
}))
