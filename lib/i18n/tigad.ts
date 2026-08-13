import type { CheckChannel } from '@/lib/content/schema'
import type { Locale } from './index'

/**
 * The 3D walkthrough, in Bank Indonesia's own framing — and with an honest
 * ending. PRD §6.3: diraba cannot be done on a screen, and the app says so
 * plainly rather than simulating it.
 */

export interface StepCopy {
  readonly ordinal: string
  readonly title: string
  readonly instruction: string
}

export interface TigadCopy {
  readonly title: string
  readonly lede: string
  readonly steps: Record<CheckChannel, StepCopy>
  readonly fourthHeading: string
  readonly fourthBody: string
  readonly honestHeading: string
  readonly honestBody: string
  readonly honestQuote: string
  readonly verdictHeading: string
  readonly verdictBody: string
  readonly featuresLabel: string
}

export const TIGAD: Record<Locale, TigadCopy> = {
  id: {
    title: '3D — Dilihat, Diraba, Diterawang',
    lede:
      'Tiga langkah yang diajarkan Bank Indonesia, dan alasan fisik di balik masing-masing. Urutannya disusun agar tidak memerlukan alat apa pun: mata, jari, lalu cahaya jendela.',
    steps: {
      dilihat: {
        ordinal: 'Langkah satu',
        title: 'Dilihat',
        instruction:
          'Pegang uang dalam cahaya biasa dan miringkan perlahan. Perhatikan bagian yang warnanya bergeser mengikuti sudut pandang Anda.',
      },
      diraba: {
        ordinal: 'Langkah dua',
        title: 'Diraba',
        instruction:
          'Rabakan ujung jari pada gambar utama, angka nominal, dan tepi lembar. Yang dicari adalah permukaan yang terasa kasar dan timbul.',
      },
      diterawang: {
        ordinal: 'Langkah tiga',
        title: 'Diterawang',
        instruction:
          'Angkat uang ke arah cahaya. Yang muncul hanya muncul karena cahaya menembus bahan uang, bukan memantul darinya.',
      },
      mesin: {
        ordinal: 'Di luar tiga langkah',
        title: 'Mesin & ultraviolet',
        instruction:
          'Ciri yang memerlukan lampu atau mesin. Berguna, tetapi bukan bagian dari 3D justru karena memerlukan alat.',
      },
    },
    fourthHeading: 'Kanal keempat',
    fourthBody:
      'Ada ciri yang tidak masuk 3D karena memerlukan alat: unsur yang hanya tampak di bawah sinar ultraviolet, dan ciri yang dibaca mesin penghitung. Bank Indonesia menyusun 3D dari pemeriksaan yang bisa dilakukan siapa saja, di mana saja, tanpa membawa apa pun.',
    honestHeading: 'Satu langkah tidak bisa dilakukan di sini',
    honestBody:
      'Diraba adalah pemeriksaan dengan ujung jari. Layar tidak punya tekstur; getaran ponsel tidak menirukan cetakan timbul, dan animasi hanya akan mengajarkan hal yang salah. Situs ini menerangkan apa yang harus dirasakan, lalu berhenti di situ.',
    honestQuote: 'Diraba tidak bisa lewat layar. Ambil uangnya, rasakan cetakan timbulnya.',
    verdictHeading: 'Setelah tiga langkah',
    verdictBody:
      'Situs ini tidak menyimpulkan apa pun tentang selembar uang tertentu, dan tidak akan pernah melakukannya. Bila ada yang meragukan, bawa uang itu ke bank atau ke kantor Bank Indonesia. Kewenangan menentukan keaslian Rupiah ada pada Bank Indonesia.',
    featuresLabel: 'Ciri pada langkah ini',
  },
  en: {
    title: '3D — Dilihat, Diraba, Diterawang',
    lede:
      'The three steps Bank Indonesia teaches, and the physical reason behind each. The order is arranged to need no equipment at all: eyes, then fingers, then a window.',
    steps: {
      dilihat: {
        ordinal: 'Step one',
        title: 'Dilihat — look',
        instruction:
          'Hold the note in ordinary light and tilt it slowly. Watch for areas whose colour moves with your angle.',
      },
      diraba: {
        ordinal: 'Step two',
        title: 'Diraba — feel',
        instruction:
          'Run a fingertip over the main image, the numerals, and the edges of the sheet. You are looking for surfaces that feel rough and raised.',
      },
      diterawang: {
        ordinal: 'Step three',
        title: 'Diterawang — hold to light',
        instruction:
          'Lift the note towards the light. What appears, appears because light passes through the material rather than bouncing off it.',
      },
      mesin: {
        ordinal: 'Beyond the three',
        title: 'Machine & ultraviolet',
        instruction:
          'Features needing a lamp or a machine. Useful, but outside 3D precisely because they need equipment.',
      },
    },
    fourthHeading: 'The fourth channel',
    fourthBody:
      'Some features sit outside 3D because they need equipment: elements visible only under ultraviolet light, and features read by counting machines. Bank Indonesia built 3D from checks anyone can make, anywhere, carrying nothing.',
    honestHeading: 'One step cannot be done here',
    honestBody:
      'Diraba is a check made with a fingertip. A screen has no texture; a phone’s vibration does not imitate raised printing, and an animation would only teach the wrong thing. This site describes what to feel for, and then stops.',
    honestQuote: 'Diraba tidak bisa lewat layar. Ambil uangnya, rasakan cetakan timbulnya.',
    verdictHeading: 'After the three steps',
    verdictBody:
      'This site draws no conclusion about any particular note, and never will. If something troubles you, take the note to a bank or to a Bank Indonesia office. The authority to determine whether Rupiah is genuine rests with Bank Indonesia.',
    featuresLabel: 'Features checked at this step',
  },
}
