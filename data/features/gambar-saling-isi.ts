import type { Feature } from '@/lib/content/schema'
import { BI_UANG_100K, vanRenesse } from '../citations'

/**
 * §4 review — check or make? Check. Registration between two faces is described
 * as something to observe, with no account of how registration is achieved.
 */
export const gambarSalingIsi: Feature = {
  type: 'feature',
  id: 'gambar-saling-isi',
  name: { id: 'Gambar saling isi (rectoverso)', en: 'Rectoverso (gambar saling isi)' },
  channel: 'diterawang',
  summary: {
    text: {
      id: 'Dua bagian gambar yang saling melengkapi, dicetak di sisi depan dan sisi belakang pada posisi yang tepat bertumpuk.',
      en: 'Two complementary halves of one image, printed on the front and the back so that they lie exactly over one another.',
    },
    citations: [BI_UANG_100K],
  },
  observe: [
    {
      text: {
        id: 'Terawangkan uang: gambar saling isi berupa logo BI terlihat utuh menjadi satu bentuk.',
        en: 'Held to the light, the rectoverso of the BI logo closes into one complete shape.',
      },
      citations: [BI_UANG_100K],
    },
    {
      text: {
        id: 'Dilihat satu sisi saja, tiap bagian tampak sebagai potongan yang tidak berarti. Yang diperiksa adalah ketepatan keduanya bertemu.',
        en: 'Viewed from one side alone, each part reads as a meaningless fragment. What is being checked is the precision with which they meet.',
      },
      citations: [vanRenesse('Ch. 5, See-through register')],
    },
  ],
  mechanism: {
    illustration: 'gambar-saling-isi',
    caption: {
      text: {
        id: 'Satu gambar dibagi dua, lalu tiap bagian dicetak pada sisi yang berlawanan. Cahaya yang menembus lembar menumpuk keduanya menjadi satu bentuk di mata pembaca.',
        en: 'One image is split in two, and each part printed on an opposite face. Light passing through the sheet superimposes them into a single shape for the reader.',
      },
      citations: [vanRenesse('Ch. 5, See-through register')],
    },
    steps: [
      {
        text: {
          id: 'Sisi depan membawa sebagian bentuk. Sendirian, bagian itu tidak terbaca sebagai apa pun.',
          en: 'The front face carries part of the shape. On its own, that part reads as nothing in particular.',
        },
        citations: [vanRenesse('Ch. 5, See-through register')],
      },
      {
        text: {
          id: 'Sisi belakang membawa sisanya, tepat pada tempat yang kosong di sisi depan.',
          en: 'The back face carries the remainder, exactly where the front face left a gap.',
        },
        citations: [vanRenesse('Ch. 5, See-through register')],
      },
      {
        text: {
          id: 'Saat diterawang, kedua sisi tampak bersamaan dan bentuknya menutup. Ketepatan posisi antar-sisi inilah yang sulit dan yang Anda periksa.',
          en: 'Held to the light, both faces are seen at once and the shape closes. It is the accuracy of the front-to-back alignment that is hard, and that you are checking.',
        },
        citations: [vanRenesse('Ch. 5, See-through register')],
      },
    ],
  },
}
