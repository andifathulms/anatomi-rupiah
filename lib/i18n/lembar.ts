import type { Locale } from './index'

export interface LembarCopy {
  readonly title: string
  readonly lede: string
  readonly chooseNote: string
  readonly calloutsHeading: string
  readonly loupeHeading: string
  readonly loupeIdle: string
  readonly regionLabel: string
  readonly scaleNote: string
  readonly indicativeNote: string
  readonly readMore: string
  readonly sourcesLabel: string
  readonly emisiCurrent: string
  readonly emisi2016: string
}

export const LEMBAR: Record<Locale, LembarCopy> = {
  id: {
    title: 'Lembar',
    lede:
      'Skema uang dengan penanda ciri di margin, seperti keterangan pada lembar cetak percobaan. Pilih satu penanda untuk melihat bagian itu diperbesar, berikut diagram mekanismenya.',
    chooseNote: 'Pilih pecahan',
    calloutsHeading: 'Penanda',
    loupeHeading: 'Diperbesar',
    loupeIdle: 'Pilih salah satu penanda di sebelah kiri.',
    regionLabel: 'Bidang',
    scaleNote: 'Skema digambar pada',
    indicativeNote:
      'Letak penanda bersifat perkiraan. Bank Indonesia menyebutkan ciri apa yang ada pada tiap pecahan; koordinatnya tidak dipublikasikan dan tidak diukur di sini. Penanda hanya mengarahkan mata ke bagian yang tepat pada uang sungguhan.',
    readMore: 'Baca mekanismenya',
    sourcesLabel: 'Sumber penanda ini',
    emisiCurrent: 'Tahun Emisi 2022',
    emisi2016: 'Tahun Emisi 2016 — masih berlaku',
  },
  en: {
    title: 'The sheet',
    lede:
      'A schematic note with feature markers in the margin, in the manner of an engraver’s proof sheet. Choose a marker to see that region magnified, with its mechanism diagram alongside.',
    chooseNote: 'Choose a denomination',
    calloutsHeading: 'Markers',
    loupeHeading: 'Magnified',
    loupeIdle: 'Choose one of the markers on the left.',
    regionLabel: 'Region',
    scaleNote: 'Schematic drawn at',
    indicativeNote:
      'Marker positions are approximate. Bank Indonesia states which features each denomination carries; it does not publish coordinates, and none were measured here. A marker exists to send your eye to the right part of a real note.',
    readMore: 'Read the mechanism',
    sourcesLabel: 'Sources for this marker',
    emisiCurrent: 'Emission year 2022',
    emisi2016: 'Emission year 2016 — still legal tender',
  },
}
