import type { Feature } from '@/lib/content/schema'
import { hecht, vanRenesse } from '../citations'

/**
 * §4 review — check or make? Check. The text explains why a lamp reveals
 * something a room does not. It names no material and no emitting compound.
 *
 * This is the fourth channel: not part of Bank Indonesia's 3D campaign, which
 * is deliberately built around checks needing no equipment at all.
 */
export const tintaTampakUv: Feature = {
  type: 'feature',
  id: 'tinta-tampak-uv',
  name: { id: 'Unsur kasat UV', en: 'UV-visible elements' },
  channel: 'mesin',
  summary: {
    text: {
      id: 'Bagian yang tidak tampak dalam cahaya biasa, tetapi memendarkan cahaya bila disinari lampu ultraviolet.',
      en: 'Areas invisible in ordinary light that emit visible light under an ultraviolet lamp.',
    },
    citations: [vanRenesse('Ch. 7, Luminescent features')],
  },
  observe: [
    {
      text: {
        id: 'Di bawah lampu ultraviolet, bagian tertentu memendar sementara sisa lembar tetap gelap.',
        en: 'Under an ultraviolet lamp, certain areas glow while the rest of the sheet stays dark.',
      },
      citations: [vanRenesse('Ch. 7, Luminescent features')],
    },
    {
      text: {
        id: 'Ciri ini memerlukan alat, karena itu ia berada di luar tiga langkah 3D. Bank Indonesia menyusun 3D justru dari pemeriksaan yang tidak memerlukan alat apa pun.',
        en: 'This check needs equipment, which is why it sits outside the three 3D steps. Bank Indonesia built 3D precisely from checks that need no equipment at all.',
      },
      citations: [vanRenesse('Ch. 7, Luminescent features')],
    },
  ],
  mechanism: {
    illustration: 'tinta-tampak-uv',
    caption: {
      text: {
        id: 'Cahaya ultraviolet berada di luar jangkauan penglihatan manusia. Bagian tertentu pada uang menyerap cahaya itu lalu memancarkannya kembali pada panjang gelombang yang bisa dilihat mata — karena itu ia muncul hanya ketika lampunya menyala.',
        en: 'Ultraviolet light lies outside the range of human vision. Certain areas of the note absorb it and emit it again at a wavelength the eye can see — which is why they appear only while the lamp is on.',
      },
      citations: [hecht('§3.7, The electromagnetic spectrum'), vanRenesse('Ch. 7, Luminescent features')],
    },
    steps: [
      {
        text: {
          id: 'Dalam cahaya ruangan biasa, bagian itu tidak terlihat berbeda dari sekitarnya.',
          en: 'In ordinary room light, the area looks no different from its surroundings.',
        },
        citations: [vanRenesse('Ch. 7, Luminescent features')],
      },
      {
        text: {
          id: 'Lampu ultraviolet memancarkan cahaya yang tidak dapat dilihat mata, lalu bagian tersebut memancarkan kembali cahaya pada panjang gelombang yang terlihat.',
          en: 'An ultraviolet lamp emits light the eye cannot see, and the area re-emits light at a wavelength that it can.',
        },
        citations: [hecht('§3.7, The electromagnetic spectrum')],
      },
    ],
  },
  limitation: {
    id: 'Pemeriksaan ini memerlukan lampu ultraviolet. Situs ini menggambarkan hasilnya, tetapi layar tidak memancarkan ultraviolet dan tidak bisa menggantikan lampunya. Situs ini juga tidak menyebut bahan yang memendar itu — itu berguna bagi pemalsu, bukan bagi pemeriksa.',
    en: 'This check needs an ultraviolet lamp. This site illustrates the result, but a screen emits no ultraviolet and cannot stand in for the lamp. Nor does this site name what glows — that would help a forger, not a checker.',
  },
}
