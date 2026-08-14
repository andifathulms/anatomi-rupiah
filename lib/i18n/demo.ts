import type { Locale } from './index'

export interface DemoCopy {
  readonly tiltHeading: string
  readonly tiltBody: string
  readonly tiltLabel: string
  readonly tiltAngle: string
  readonly tiltHeadOn: string
  readonly tiltUseDevice: string
  readonly tiltUsingDevice: string
  readonly tiltDeviceUnavailable: string
  readonly tiltDisclaimer: string
  readonly uvHeading: string
  readonly uvBody: string
  readonly uvOrdinary: string
  readonly uvLamp: string
  readonly uvDisclaimer: string
  readonly lightHeading: string
  readonly lightBody: string
  readonly lightMove: string
  readonly lightDisclaimer: string
  readonly glUnavailable: string
  readonly reliefHeading: string
  readonly reliefBody: string
  readonly reliefLightLabel: string
  readonly reliefDisclaimer: string
}

export const DEMO: Record<Locale, DemoCopy> = {
  id: {
    tiltHeading: 'Coba miringkan',
    tiltBody:
      'Geser kendali di bawah untuk mengubah sudut pandang. Warnanya bergeser karena sudutnya berubah, bukan karena tintanya berubah.',
    tiltLabel: 'Sudut pandang',
    tiltAngle: 'Sudut',
    tiltHeadOn: 'Tegak lurus',
    tiltUseDevice: 'Gunakan kemiringan perangkat',
    tiltUsingDevice: 'Mengikuti kemiringan perangkat',
    tiltDeviceUnavailable: 'Perangkat ini tidak melaporkan kemiringan. Gunakan penggeser.',
    tiltDisclaimer:
      'Warna yang mata lihat adalah cara otak membaca panjang gelombang cahaya — merah panjang gelombangnya panjang, biru pendek. Peragaan ini menghitung interferensi lapisan tipis untuk tiga panjang gelombang itu, jadi warnanya benar-benar mengikuti sudut pandang, bukan gambar yang diputar. Tebal lapisannya dipilih agar efeknya jelas di layar — ini bukan tiruan tinta pada uang mana pun.',
    uvHeading: 'Nyalakan lampunya',
    uvBody:
      'Peragaan dua keadaan: cahaya ruangan biasa, lalu di bawah sinar ultraviolet. Perubahannya adalah pergantian keadaan, bukan animasi.',
    uvOrdinary: 'Cahaya biasa',
    uvLamp: 'Sinar ultraviolet',
    uvDisclaimer:
      'Layar tidak memancarkan ultraviolet. Yang ditampilkan di sini adalah gambaran hasilnya, dan tidak bisa menggantikan lampu UV sungguhan.',
    lightHeading: 'Meja cahaya',
    lightBody:
      'Gerakkan sumber cahaya di belakang lembar. Terangnya mengikuti ketebalan bahan: makin tebal bagian yang dilewati, makin sedikit cahaya yang sampai ke mata.',
    lightMove: 'Geser cahaya',
    lightDisclaimer:
      'Bentuk pada peragaan ini sengaja dibuat abstrak — sebuah lensa dan satu cincin ornamen — bukan gambar pahlawan dan bukan tanda air pada uang mana pun. Yang diperagakan adalah hubungannya: terang mengikuti ketebalan.',
    glUnavailable:
      'Peragaan ini memerlukan WebGL, yang tidak tersedia di peramban ini. Penjelasan dan diagramnya tetap lengkap di atas.',
    reliefHeading: 'Sapukan cahaya',
    reliefBody:
      'Layar tidak bisa menyampaikan rabaan, tetapi bisa menunjukkan akibat lain dari cetakan timbul: tinta yang berdiri di atas permukaan menangkap cahaya dari sudut rendah dan menaungi sisi seberangnya. Geser arah cahayanya.',
    reliefLightLabel: 'Arah cahaya',
    reliefDisclaimer:
      'Permukaan pada peragaan ini adalah deretan punggungan biasa, bukan ukiran pada uang mana pun. Ini menunjukkan bagaimana relief menangkap cahaya — bukan pengganti merabanya. Untuk itu tetap ambil uangnya.',
  },
  en: {
    tiltHeading: 'Try tilting it',
    tiltBody:
      'Move the control below to change the viewing angle. The colour shifts because the angle changed, not because the ink did.',
    tiltLabel: 'Viewing angle',
    tiltAngle: 'Angle',
    tiltHeadOn: 'Head-on',
    tiltUseDevice: 'Use device tilt',
    tiltUsingDevice: 'Following device tilt',
    tiltDeviceUnavailable: 'This device reports no tilt. Use the slider.',
    tiltDisclaimer:
      'The colour the eye sees is how the brain reads a wavelength of light — red is a long wavelength, blue a short one. This computes thin-film interference for three such wavelengths, so the colour genuinely follows your viewing angle, not a rotated picture. The layer thickness is chosen to make the effect legible on a screen — it is not a copy of any note’s ink.',
    uvHeading: 'Switch the lamp on',
    uvBody:
      'Two states, shown side by side: ordinary room light, then under ultraviolet. The change is a state change, not an animation.',
    uvOrdinary: 'Ordinary light',
    uvLamp: 'Ultraviolet',
    uvDisclaimer:
      'A screen emits no ultraviolet. What is shown here is a picture of the result, and cannot stand in for a real UV lamp.',
    lightHeading: 'Light table',
    lightBody:
      'Move the light source behind the sheet. Brightness follows thickness: the more material the light crossed, the less of it reaches your eye.',
    lightMove: 'Move the light',
    lightDisclaimer:
      'The shape here is deliberately abstract — a lens and an ornament ring — not a portrait and not the watermark of any note. What is demonstrated is the relationship: brightness follows thickness.',
    glUnavailable:
      'This demonstration needs WebGL, which this browser does not provide. The explanation and diagram above are complete without it.',
    reliefHeading: 'Sweep the light',
    reliefBody:
      'A screen cannot convey touch, but it can show the other consequence of raised printing: ink standing above the surface catches light from a low angle and shadows the far side. Move the light around.',
    reliefLightLabel: 'Light direction',
    reliefDisclaimer:
      'The surface here is a run of plain ridges, not the engraving on any note. It shows how relief catches light — it is not a substitute for feeling it. For that, still take out a note.',
  },
}
