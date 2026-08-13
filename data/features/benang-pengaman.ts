import type { Feature } from '@/lib/content/schema'
import { BI_UANG_100K, vanRenesse } from '../citations'

/**
 * §4 review — check or make? Check. The text describes where the thread sits
 * and what a reader should see; it does not describe how one is introduced.
 */
export const benangPengaman: Feature = {
  type: 'feature',
  id: 'benang-pengaman',
  name: { id: 'Benang pengaman', en: 'Security thread' },
  channel: 'diterawang',
  summary: {
    text: {
      id: 'Benang yang berada di dalam bahan uang, bukan dicetak di atas permukaannya.',
      en: 'A thread that sits inside the substrate rather than printed on its surface.',
    },
    citations: [BI_UANG_100K],
  },
  observe: [
    {
      text: {
        id: 'Terdapat benang pengaman pada pecahan Rp100.000, Rp50.000, dan Rp20.000. Pada Rp100.000 dan Rp50.000, benang berubah warna bila dilihat dari sudut pandang berbeda.',
        en: 'A security thread is present on the Rp100,000, Rp50,000, and Rp20,000 notes. On the Rp100,000 and Rp50,000 it changes colour when viewed from a different angle.',
      },
      citations: [BI_UANG_100K],
    },
    {
      text: {
        id: 'Terawangkan uang: benang terbaca sebagai satu garis utuh yang menerus dari tepi atas ke tepi bawah, tanpa terputus.',
        en: 'Held to the light, the thread reads as one continuous line running edge to edge, unbroken.',
      },
      citations: [vanRenesse('Ch. 4, Security threads')],
    },
    {
      text: {
        id: 'Dilihat biasa, yang tampak hanya potongan-potongan pendek di permukaan. Perbedaan antara potongan dan garis utuh itulah yang diperiksa.',
        en: 'In ordinary light only short segments show at the surface. The difference between segments and one whole line is what is being checked.',
      },
      citations: [vanRenesse('Ch. 4, Security threads')],
    },
  ],
  mechanism: {
    illustration: 'benang-pengaman',
    caption: {
      text: {
        id: 'Benang berada di antara lapisan bahan uang dan muncul ke permukaan hanya pada jarak tertentu. Karena itu ia terlihat terputus dari luar, tetapi utuh bila cahaya menembus lembar.',
        en: 'The thread lies between the layers of the substrate and surfaces only at intervals. So it looks interrupted from outside, and whole once light passes through the sheet.',
      },
      citations: [vanRenesse('Ch. 4, Security threads')],
    },
    steps: [
      {
        text: {
          id: 'Benang tertanam di dalam bahan, sehingga tidak bisa dikelupas atau digosok lepas dari permukaan.',
          en: 'The thread is embedded within the material, so it cannot be peeled or rubbed off the surface.',
        },
        citations: [vanRenesse('Ch. 4, Security threads')],
      },
      {
        text: {
          id: 'Pada jarak tertentu benang naik ke permukaan. Bagian inilah yang terlihat sebagai potongan-potongan pendek dalam cahaya biasa.',
          en: 'At intervals the thread rises to the surface. These are the short segments visible in ordinary light.',
        },
        citations: [vanRenesse('Ch. 4, Security threads')],
      },
      {
        text: {
          id: 'Saat diterawang, cahaya menembus bahan tetapi tertahan oleh benang, sehingga seluruh panjangnya terbaca sebagai satu garis gelap yang menerus.',
          en: 'Held to the light, light passes through the substrate but is stopped by the thread, so its full length reads as one continuous dark line.',
        },
        citations: [vanRenesse('Ch. 4, Security threads')],
      },
    ],
  },
}
