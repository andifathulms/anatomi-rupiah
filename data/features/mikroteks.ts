import type { Feature } from '@/lib/content/schema'
import { vanRenesse } from '../citations'

/**
 * §4 review — check or make? Check. The text says to magnify and read. It
 * states no dimension, resolution figure, or reproduction threshold: those
 * numbers would be useful to the wrong reader and useless to the right one.
 */
export const mikroteks: Feature = {
  type: 'feature',
  id: 'mikroteks',
  name: { id: 'Mikroteks', en: 'Microtext' },
  channel: 'dilihat',
  summary: {
    text: {
      id: 'Tulisan yang terlalu kecil untuk dibaca mata telanjang, dan baru terbaca dengan kaca pembesar.',
      en: 'Lettering too small to read with the unaided eye, legible only under magnification.',
    },
    citations: [vanRenesse('Ch. 2, Microprinting')],
  },
  observe: [
    {
      text: {
        id: 'Tanpa alat, bagian itu tampak seperti garis atau arsiran biasa. Dengan kaca pembesar, garis itu ternyata deretan huruf.',
        en: 'Unaided, the area looks like an ordinary rule or hatching. Under a loupe, the rule turns out to be a row of letters.',
      },
      citations: [vanRenesse('Ch. 2, Microprinting')],
    },
    {
      text: {
        id: 'Yang diperiksa adalah ketajaman hurufnya. Huruf yang utuh dan tegas berbeda jelas dari garis yang pecah atau kabur.',
        en: 'What is checked is the sharpness of the letters. Letters that stay whole and crisp differ plainly from a rule that has broken up or blurred.',
      },
      citations: [vanRenesse('Ch. 2, Microprinting')],
    },
  ],
  mechanism: {
    illustration: 'mikroteks',
    caption: {
      text: {
        id: 'Cirinya bukan tulisannya, melainkan ukurannya. Huruf sekecil itu berada di bawah kemampuan alat penyalin biasa, sehingga yang tersisa pada tiruan umumnya hanya garis kabur.',
        en: 'The feature is not the wording but the scale. Lettering this small sits below what ordinary copying equipment can hold, so what usually survives in an imitation is a blur.',
      },
      citations: [vanRenesse('Ch. 2, Microprinting')],
    },
    steps: [
      {
        text: {
          id: 'Pada jarak baca biasa, mata menggabungkan huruf-huruf itu menjadi satu garis lurus.',
          en: 'At ordinary reading distance the eye merges the letters into a single straight rule.',
        },
        citations: [vanRenesse('Ch. 2, Microprinting')],
      },
      {
        text: {
          id: 'Kaca pembesar memisahkan kembali apa yang digabungkan mata, dan huruf-hurufnya muncul.',
          en: 'A loupe separates again what the eye merged, and the letters appear.',
        },
        citations: [vanRenesse('Ch. 2, Microprinting')],
      },
    ],
  },
}
