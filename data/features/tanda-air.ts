import type { Feature } from '@/lib/content/schema'
import { BI_UANG_100K, vanRenesse } from '../citations'

/**
 * §4 review — does any sentence here help someone check a note, or make one?
 * Check. The text says where to look, what appears, and why light behaves that
 * way. It says nothing about how a substrate is formed.
 */
export const tandaAir: Feature = {
  type: 'feature',
  id: 'tanda-air',
  name: { id: 'Tanda air & electrotype', en: 'Watermark & electrotype' },
  channel: 'diterawang',
  summary: {
    text: {
      id: 'Gambar yang tampak pada bahan uang ketika uang diterawang ke arah cahaya.',
      en: 'An image in the substrate itself, visible when the note is held up to the light.',
    },
    citations: [BI_UANG_100K],
  },
  observe: [
    {
      text: {
        id: 'Terawangkan uang ke arah cahaya. Gambar pahlawan tampak dari kedua sisi lembar, bukan hanya dari satu sisi.',
        en: 'Hold the note up to the light. The hero portrait appears from either side of the sheet, not just one.',
      },
      citations: [BI_UANG_100K],
    },
    {
      text: {
        id: 'Pada pecahan Rp100.000, Rp50.000, Rp20.000, dan Rp10.000 terdapat electrotype — logo BI dan ornamen tertentu — yang juga baru tampak saat diterawang.',
        en: 'On the Rp100,000, Rp50,000, Rp20,000, and Rp10,000 notes there is an electrotype — the BI logo and certain ornaments — which likewise appears only when held to the light.',
      },
      citations: [BI_UANG_100K],
    },
    {
      text: {
        id: 'Gambarnya berada di dalam bahan, bukan di permukaannya. Digosok pun tidak berpindah dan tidak menghilang.',
        en: 'The image sits within the material rather than on its surface. Rubbing moves nothing and removes nothing.',
      },
      citations: [vanRenesse('Ch. 3, Watermarks')],
    },
  ],
  mechanism: {
    illustration: 'tanda-air',
    caption: {
      text: {
        id: 'Ketebalan bahan uang tidak rata. Bagian yang lebih tipis meneruskan lebih banyak cahaya, bagian yang lebih tebal menahannya — dan perbedaan terang itulah gambarnya.',
        en: 'The substrate is not of even thickness. Thinner areas pass more light and thicker areas hold it back, and that difference in brightness is the image.',
      },
      citations: [vanRenesse('Ch. 3, Watermarks')],
    },
    steps: [
      {
        text: {
          id: 'Cahaya datang dari belakang lembar uang. Inilah sebabnya ciri ini disebut diterawang dan bukan dilihat.',
          en: 'Light arrives from behind the sheet. This is why the check is diterawang and not dilihat.',
        },
        citations: [vanRenesse('Ch. 3, Watermarks')],
      },
      {
        text: {
          id: 'Bahan uang lebih tebal di sebagian tempat dan lebih tipis di tempat lain, dalam pola yang membentuk gambar.',
          en: 'The material is thicker in some places and thinner in others, in a pattern that forms the image.',
        },
        citations: [vanRenesse('Ch. 3, Watermarks')],
      },
      {
        text: {
          id: 'Mata menerima cahaya yang berbeda terangnya menurut ketebalan yang dilaluinya. Gambar itu tidak dicetak; ia adalah bahan uang itu sendiri.',
          en: 'The eye receives light of differing brightness according to the thickness it passed through. The image is not printed; it is the material.',
        },
        citations: [vanRenesse('Ch. 3, Watermarks')],
      },
    ],
  },
}
