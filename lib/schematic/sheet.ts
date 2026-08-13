import { denominations } from '@/data/denominations'
import { featuresById } from '@/lib/content'
import type { CheckChannel } from '@/lib/content/schema'
import { CHANNEL_LABEL, href, type Locale } from '@/lib/i18n'
import { loupeViewModel, type LoupeViewModel } from './loupe'
import { schematicViewModel, type SchematicViewModel } from './view-model'

/**
 * The sheet view model — every schematic, every marker, and every loupe detail,
 * computed here so the interactive component only selects and maps.
 */

export interface SheetMarkerView {
  readonly featureId: string
  /** Which authored drawing explains this feature. */
  readonly illustration: string
  readonly index: number
  readonly channel: CheckChannel
  readonly channelLabel: string
  readonly featureName: string
  readonly note: string
  readonly featureUrl: string
  readonly loupe: LoupeViewModel
}

export interface SheetNoteView {
  readonly id: string
  readonly caption: string
  readonly emisi: number
  readonly widthMm: number
  readonly heightMm: number
  readonly schematic: SchematicViewModel
  readonly markers: readonly SheetMarkerView[]
}

function captionFor(valueIdr: number, emisi: number): string {
  return `Rp${valueIdr.toLocaleString('id-ID')} · TE ${emisi}`
}

export function sheetNotes(locale: Locale): readonly SheetNoteView[] {
  return denominations.map((note) => {
    const size = { widthMm: note.dimensions.widthMm, heightMm: note.dimensions.heightMm }
    const caption = captionFor(note.valueIdr, note.emisi)

    const markerInputs = note.placements.map((placement) => {
      const feature = featuresById.get(placement.featureId)
      if (feature === undefined) {
        throw new Error(`denomination "${note.id}" places an unknown feature "${placement.featureId}"`)
      }
      return { placement, feature }
    })

    const schematic = schematicViewModel({
      size,
      caption,
      markers: markerInputs.map(({ placement, feature }) => ({
        featureId: placement.featureId,
        channel: feature.channel,
        label: feature.name[locale],
        region: placement.region,
      })),
    })

    return {
      id: note.id,
      caption,
      emisi: note.emisi,
      widthMm: note.dimensions.widthMm,
      heightMm: note.dimensions.heightMm,
      schematic,
      markers: markerInputs.map(({ placement, feature }, index) => ({
        featureId: placement.featureId,
        illustration: feature.mechanism.illustration,
        index: index + 1,
        channel: feature.channel,
        channelLabel: CHANNEL_LABEL[feature.channel][locale],
        featureName: feature.name[locale],
        note: placement.note.text[locale],
        featureUrl: href(locale, `ciri/${feature.id}`),
        loupe: loupeViewModel(placement.region, size),
      })),
    }
  })
}
