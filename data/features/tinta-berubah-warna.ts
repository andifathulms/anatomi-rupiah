import type { Feature } from '@/lib/content/schema'
import { BI_UANG_100K, hecht, vanRenesse } from '../citations'

/**
 * §4 review — check or make? Check. The text explains why an angle changes what
 * the eye receives. It names no material and no layer specification.
 */
export const tintaBerubahWarna: Feature = {
  type: 'feature',
  id: 'tinta-berubah-warna',
  name: { id: 'Tinta berubah warna', en: 'Colour-shifting ink' },
  channel: 'dilihat',
  summary: {
    text: {
      id: 'Warna cetakan bergeser ketika uang dilihat dari sudut pandang yang berbeda.',
      en: 'The printed colour shifts as the note is viewed from a different angle.',
    },
    citations: [BI_UANG_100K],
  },
  observe: [
    {
      text: {
        id: 'Miringkan uang perlahan sambil memperhatikan satu bagian saja. Warnanya bergeser, bukan sekadar menjadi lebih terang atau lebih gelap.',
        en: 'Tilt the note slowly while watching a single area. The colour shifts hue — it does not merely brighten or darken.',
      },
      citations: [BI_UANG_100K],
    },
    {
      text: {
        id: 'Perubahannya berlangsung mulus saat uang dimiringkan, dan kembali ke warna semula saat dikembalikan ke posisi tegak.',
        en: 'The change is continuous as the note tilts, and returns to the original hue as it comes back upright.',
      },
      citations: [vanRenesse('Ch. 6, Optically variable devices')],
    },
    {
      text: {
        id: 'Warna yang bergeser mengikuti sudut pandang, bukan mengikuti arah lampu. Menggeser sumber cahaya saja tidak menghasilkan pergeseran yang sama.',
        en: 'The shift follows the viewing angle, not the direction of the lamp. Moving the light source alone does not produce the same shift.',
      },
      citations: [hecht('§9.7, Thin-film interference')],
    },
  ],
  mechanism: {
    illustration: 'tinta-berubah-warna',
    caption: {
      text: {
        id: 'Cahaya memantul dua kali: dari permukaan atas lapisan tipis dan dari permukaan bawahnya. Kedua pantulan itu bertemu kembali di mata, dan selisih jarak tempuhnya menentukan warna mana yang saling menguatkan.',
        en: 'Light reflects twice: from the top surface of a thin layer and from its underside. The two reflections meet again at the eye, and the difference in the distance they travelled decides which colour reinforces.',
      },
      citations: [hecht('§9.7, Thin-film interference')],
    },
    steps: [
      {
        text: {
          id: 'Sebagian cahaya memantul di permukaan atas lapisan. Sisanya masuk, memantul di bawah, lalu keluar lagi.',
          en: 'Part of the light reflects at the top surface of the layer. The rest enters, reflects underneath, and comes back out.',
        },
        citations: [hecht('§9.7, Thin-film interference')],
      },
      {
        text: {
          id: 'Berkas yang menembus lapisan menempuh jarak sedikit lebih panjang. Panjang tambahan itu berubah ketika sudut pandang berubah.',
          en: 'The beam that crossed the layer travelled slightly farther. That extra distance changes as the viewing angle changes.',
        },
        citations: [hecht('§9.7, Thin-film interference')],
      },
      {
        text: {
          id: 'Pada tiap sudut, sebagian panjang gelombang saling menguatkan dan sebagian saling meniadakan. Itulah sebabnya warna yang Anda lihat berpindah saat uang dimiringkan — bukan tintanya yang berubah, melainkan sudut pandang Anda.',
          en: 'At each angle some wavelengths reinforce and others cancel. That is why the colour you see moves as the note tilts — the ink has not changed, your angle has.',
        },
        citations: [hecht('§9.7, Thin-film interference'), vanRenesse('Ch. 6, Optically variable devices')],
      },
    ],
  },
}
