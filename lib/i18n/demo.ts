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
      'Ini peragaan prinsipnya, bukan tiruan tinta pada uang. Dua warna di sini dipilih untuk peragaan; yang diajarkan adalah hubungannya — warna mengikuti sudut pandang Anda.',
    uvHeading: 'Nyalakan lampunya',
    uvBody:
      'Peragaan dua keadaan: cahaya ruangan biasa, lalu di bawah sinar ultraviolet. Perubahannya adalah pergantian keadaan, bukan animasi.',
    uvOrdinary: 'Cahaya biasa',
    uvLamp: 'Sinar ultraviolet',
    uvDisclaimer:
      'Layar tidak memancarkan ultraviolet. Yang ditampilkan di sini adalah gambaran hasilnya, dan tidak bisa menggantikan lampu UV sungguhan.',
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
      'This demonstrates the principle, not any note’s ink. The two colours here were chosen for the demonstration; what is being taught is the relationship — the colour follows your angle.',
    uvHeading: 'Switch the lamp on',
    uvBody:
      'Two states, shown side by side: ordinary room light, then under ultraviolet. The change is a state change, not an animation.',
    uvOrdinary: 'Ordinary light',
    uvLamp: 'Ultraviolet',
    uvDisclaimer:
      'A screen emits no ultraviolet. What is shown here is a picture of the result, and cannot stand in for a real UV lamp.',
  },
}
