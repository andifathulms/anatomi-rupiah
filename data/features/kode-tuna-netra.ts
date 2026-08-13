import type { Feature } from '@/lib/content/schema'
import { PERTUNI_BLIND_CODE, biUang } from '../citations'

/**
 * §4 review — check or make? Check, and something more: this is the one feature
 * on the note designed to be read without sight at all. Nothing here describes
 * production.
 *
 * PRD §6.4: almost no sighted Indonesian knows these marks exist.
 */
export const kodeTunaNetra: Feature = {
  type: 'feature',
  id: 'kode-tuna-netra',
  name: { id: 'Kode tuna netra', en: 'Kode tuna netra — the blind code' },
  channel: 'diraba',
  summary: {
    text: {
      id: 'Pasangan garis timbul di tepi kiri dan kanan uang, yang memungkinkan pecahan dikenali dengan meraba.',
      en: 'Pairs of raised lines at the left and right edges, letting a denomination be identified by touch.',
    },
    citations: [biUang(11, 'Rp100.000 TE 2016', 'Unsur Pengaman — Kode Tuna Netra (Blind Code)')],
  },
  observe: [
    {
      text: {
        id: 'Rabakan ujung jari pada tepi kiri atau kanan lembar uang. Garisnya pendek, miring, dan terasa kasar.',
        en: 'Run a fingertip along the left or right edge of the note. The lines are short, slanted, and feel rough.',
      },
      citations: [biUang(11, 'Rp100.000 TE 2016', 'Unsur Pengaman — Kode Tuna Netra (Blind Code)')],
    },
    {
      text: {
        id: 'Jumlah pasangannya menandai pecahan: Rp100.000 sepasang, Rp50.000 dua pasang, Rp20.000 tiga pasang, dan seterusnya bertambah satu pasang tiap turun satu pecahan hingga Rp1.000 dengan tujuh pasang.',
        en: 'The number of pairs marks the denomination: Rp100,000 has one pair, Rp50,000 two, Rp20,000 three, and one pair more with each step down to Rp1,000 with seven.',
      },
      citations: [PERTUNI_BLIND_CODE],
    },
    {
      text: {
        id: 'Panjang tiap pecahan juga berbeda 5 mm, sehingga ukuran lembar ikut membantu membedakannya.',
        en: 'The notes also differ in length by 5 mm per denomination, so the size of the sheet helps distinguish them too.',
      },
      citations: [PERTUNI_BLIND_CODE],
    },
  ],
  mechanism: {
    illustration: 'kode-tuna-netra',
    caption: {
      text: {
        id: 'Kodenya adalah relief, bukan gambar. Ia berada di tempat yang sama pada setiap pecahan, sehingga jari tahu ke mana harus pergi sebelum tahu jawabannya.',
        en: 'The code is relief, not image. It sits in the same place on every denomination, so a finger knows where to go before it knows the answer.',
      },
      citations: [PERTUNI_BLIND_CODE],
    },
    steps: [
      {
        text: {
          id: 'Letaknya tetap: tepi kiri dan kanan, dekat sisi luar lembar.',
          en: 'The position is fixed: the left and right edges, near the outer side of the sheet.',
        },
        citations: [biUang(11, 'Rp100.000 TE 2016', 'Unsur Pengaman — Kode Tuna Netra (Blind Code)')],
      },
      {
        text: {
          id: 'Jumlah pasangan garis bertambah seiring turunnya pecahan, sehingga hitungan jari langsung menjadi jawabannya.',
          en: 'The number of pairs increases as the denomination falls, so counting with a finger is itself the answer.',
        },
        citations: [PERTUNI_BLIND_CODE],
      },
      {
        text: {
          id: 'Garisnya timbul, bukan sekadar dicetak. Karena itu ciri ini termasuk kanal diraba — dan karena itu pula ia tidak dapat disampaikan lewat layar.',
          en: 'The lines are raised rather than merely printed. That places the feature on the diraba channel — and it is why a screen cannot convey it.',
        },
        citations: [biUang(11, 'Rp100.000 TE 2016', 'Unsur Pengaman — Kode Tuna Netra (Blind Code)')],
      },
    ],
  },
  limitation: {
    id: 'Kode ini dibuat untuk dibaca dengan jari. Situs ini hanya bisa menerangkannya. Ambil selembar uang, cari tepinya, dan hitung pasangan garisnya.',
    en: 'This code was made to be read with a finger. This site can only describe it. Take out a note, find the edge, and count the pairs.',
  },
}
