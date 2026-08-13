import type { Feature } from '@/lib/content/schema'
import { BI_UANG_100K, vanRenesse } from '../citations'

/**
 * §4 review — check or make? Check. The text says what a fingertip meets and
 * where to run it. It gives no press, no plate, and no process parameter.
 *
 * This is also the feature that carries the honest limitation: diraba cannot
 * be done through a screen, and the app says so instead of simulating it.
 */
export const cetakIntaglio: Feature = {
  type: 'feature',
  id: 'cetak-intaglio',
  name: { id: 'Cetak timbul (intaglio)', en: 'Raised printing (intaglio)' },
  channel: 'diraba',
  summary: {
    text: {
      id: 'Hasil cetak yang terasa kasar apabila diraba, karena tintanya berdiri di atas permukaan bahan.',
      en: 'Printing that feels rough to the touch, because the ink stands above the surface of the material.',
    },
    citations: [BI_UANG_100K],
  },
  observe: [
    {
      text: {
        id: 'Rabakan ujung jari pada gambar utama, gambar pahlawan, angka nominal, dan lambang negara. Bagian itu terasa kasar, tidak rata seperti kertas biasa.',
        en: 'Run a fingertip over the main image, the hero portrait, the denomination numerals, and the state emblem. They feel rough, not flat like ordinary paper.',
      },
      citations: [BI_UANG_100K],
    },
    {
      text: {
        id: 'Rabaan mendatar biasanya lebih jelas daripada tekanan tegak lurus: ujung jari membaca tepi timbulnya, bukan tingginya.',
        en: 'Moving a fingertip sideways usually reads more clearly than pressing straight down: the fingertip reads the edge of the relief, not its height.',
      },
      citations: [vanRenesse('Ch. 2, Intaglio printing')],
    },
  ],
  mechanism: {
    illustration: 'cetak-intaglio',
    caption: {
      text: {
        id: 'Tintanya tidak meresap rata ke dalam bahan. Ia tertinggal sebagai punggungan yang menonjol di atas permukaan — dan punggungan itulah yang dibaca ujung jari.',
        en: 'The ink does not sink flat into the material. It remains as a ridge standing above the surface — and that ridge is what a fingertip reads.',
      },
      citations: [vanRenesse('Ch. 2, Intaglio printing')],
    },
    steps: [
      {
        text: {
          id: 'Tinta berdiri di atas bidang permukaan, bukan sejajar dengannya. Selisih tinggi inilah seluruh cirinya.',
          en: 'The ink stands above the plane of the surface rather than level with it. That difference in height is the entire feature.',
        },
        citations: [vanRenesse('Ch. 2, Intaglio printing')],
      },
      {
        text: {
          id: 'Ujung jari sangat peka terhadap perubahan tinggi yang tajam. Karena itu Bank Indonesia menaruh ciri ini pada kanal diraba, bukan dilihat.',
          en: 'A fingertip is highly sensitive to abrupt changes in height. That is why Bank Indonesia places this feature on the diraba channel rather than dilihat.',
        },
        citations: [vanRenesse('Ch. 2, Intaglio printing')],
      },
    ],
  },
  limitation: {
    id: 'Diraba tidak bisa lewat layar. Layar tidak punya tekstur, dan getaran tidak menirukan cetakan timbul. Ambil uangnya, rasakan cetakan timbulnya.',
    en: 'Diraba cannot be done on a screen. A screen has no texture, and a vibration does not imitate raised printing. Take out a note and feel it.',
  },
}
