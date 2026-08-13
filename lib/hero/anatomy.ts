import type { CheckChannel } from '@/lib/content/schema'
import { schematicWidthPx, schematicHeightPx, assertSchematicWidth } from '@/lib/schematic'
import { bakeSpesimen } from '@/lib/spesimen'
import { CHANNEL_INK } from '@/lib/tokens'

/**
 * The exploded anatomy — the hero.
 *
 * This is an *exploded view of the mechanisms*, which PRD §6.2 asks for by
 * name, not a picture of a banknote. The layers are what a note is made of:
 * substrate with thickness variation, a thread inside it, two half-images in
 * register, relief printing, and the optical layer on top.
 *
 * It is still note-shaped, so every rule that governs a schematic governs it:
 * the size cap applies, and the marking is baked in — on the back layer and
 * the front one, so the stack carries it from any angle it can be seen from.
 * The compliance gate renders this alongside the sheet schematics.
 */

/** Note-shaped, at the dimensions of the largest note in circulation. */
const NOTE = { widthMm: 151, heightMm: 65 } as const
const RADIUS = 3

/**
 * 3D perspective, shared with the component so there is one source of truth.
 *
 * This matters for compliance, not just for looks. A layer translated toward
 * the viewer is *magnified* by perspective / (perspective - z). The size cap
 * governs what a reader actually sees, so the base width is divided by that
 * magnification before it is used — otherwise a stack drawn at 70% would
 * present its front layer at around 76%, inside the reproduction band.
 */
export const PERSPECTIVE_PX = 1800
export const LAYER_DEPTH_PX = 46
const LAYER_COUNT = 5
const MAX_DEPTH_PX = LAYER_DEPTH_PX * (LAYER_COUNT - 1)

/** How much the frontmost layer is enlarged by perspective. */
export const MAX_MAGNIFICATION = PERSPECTIVE_PX / (PERSPECTIVE_PX - MAX_DEPTH_PX)

export interface AnatomyLayer {
  /** Feature this layer belongs to; the layer links to its explainer. */
  readonly featureId: string
  readonly channel: CheckChannel
  readonly ink: string
  /** Stacking depth in px along Z, back to front. */
  readonly depth: number
  readonly outlineD: string
  readonly detailD: string
  readonly detailWidth: number
  readonly detailDashed: boolean
  readonly fillOpacity: number
  /** Present on the back and front layers only. */
  readonly markD?: string
  readonly markStrokeWidth?: number
}

export interface AnatomyViewModel {
  readonly viewBox: string
  readonly widthPx: number
  readonly heightPx: number
  readonly scalePercent: number
  readonly layers: readonly AnatomyLayer[]
}

function n(value: number): string {
  return Number(value.toFixed(2)).toString()
}

function roundedRect(w: number, h: number, r: number): string {
  return (
    `M${n(r)} 0H${n(w - r)}A${n(r)} ${n(r)} 0 0 1 ${n(w)} ${n(r)}V${n(h - r)}` +
    `A${n(r)} ${n(r)} 0 0 1 ${n(w - r)} ${n(h)}H${n(r)}` +
    `A${n(r)} ${n(r)} 0 0 1 0 ${n(h - r)}V${n(r)}A${n(r)} ${n(r)} 0 0 1 ${n(r)} 0Z`
  )
}

const OUTLINE = roundedRect(NOTE.widthMm, NOTE.heightMm, RADIUS)

/** Thickness variation in the substrate: the watermark, seen edge-on. */
const WATERMARK_DETAIL =
  'M108 14C120 14 128 24 128 33S120 52 108 52 89 42 89 33 96 14 108 14Z' +
  'M96 33C96 26 101 21 108 21M120 33C120 40 115 45 108 45'

/** The thread, surfacing at intervals. */
const THREAD_DETAIL =
  'M58 0v9M58 13v10M58 27v11M58 42v10M58 56v9' +
  'M62 0v65'

/** Two half-images that close into one when light passes through. */
const RECTOVERSO_DETAIL =
  'M30 24v18M21 33h18M24 26l12 14M36 26L24 40' +
  'M30 33m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0'

/** Relief printing: hatching that stands above the surface. */
const INTAGLIO_DETAIL =
  'M14 46h34M14 50h28M14 54h34M14 58h22' +
  'M74 12h22M74 16h16M74 20h22'

/** The optical layer: colour-shift patch and the UV lattice above it. */
const OPTICAL_DETAIL =
  'M132 10h14v14h-14zM135 13h8v8h-8z' +
  'M14 8h30M14 12h20M14 16h26'

export function anatomyViewModel(): AnatomyViewModel {
  // Divide out the perspective magnification, so the *apparent* width of the
  // frontmost layer — the thing a reader sees — stays under the cap.
  const widthPx = Math.floor(schematicWidthPx(NOTE) / MAX_MAGNIFICATION)

  // Checked twice: the drawn width, and the largest width it can present at.
  assertSchematicWidth(widthPx, NOTE)
  assertSchematicWidth(widthPx * MAX_MAGNIFICATION, NOTE)

  const artwork = bakeSpesimen(OUTLINE, { width: NOTE.widthMm, height: NOTE.heightMm })

  const base = {
    outlineD: OUTLINE,
    detailWidth: 1.1,
    detailDashed: false,
    fillOpacity: 0.06,
  }

  const layers: readonly AnatomyLayer[] = [
    {
      ...base,
      featureId: 'tanda-air',
      channel: 'diterawang',
      ink: CHANNEL_INK.diterawang,
      depth: LAYER_DEPTH_PX * 0,
      detailD: WATERMARK_DETAIL,
      fillOpacity: 0.14,
      // Back layer carries the smaller marking.
      markD: artwork.marginMarkD,
      markStrokeWidth: artwork.marginMarkStrokeWidth,
    },
    {
      ...base,
      featureId: 'benang-pengaman',
      channel: 'diterawang',
      ink: CHANNEL_INK.diterawang,
      depth: LAYER_DEPTH_PX * 1,
      detailD: THREAD_DETAIL,
      detailWidth: 1.8,
    },
    {
      ...base,
      featureId: 'gambar-saling-isi',
      channel: 'diterawang',
      ink: CHANNEL_INK.diterawang,
      depth: LAYER_DEPTH_PX * 2,
      detailD: RECTOVERSO_DETAIL,
      detailDashed: true,
    },
    {
      ...base,
      featureId: 'cetak-intaglio',
      channel: 'diraba',
      ink: CHANNEL_INK.diraba,
      depth: LAYER_DEPTH_PX * 3,
      detailD: INTAGLIO_DETAIL,
      detailWidth: 1.6,
    },
    {
      ...base,
      featureId: 'tinta-berubah-warna',
      channel: 'dilihat',
      ink: CHANNEL_INK.dilihat,
      depth: LAYER_DEPTH_PX * 4,
      detailD: OPTICAL_DETAIL,
      detailWidth: 1.4,
      // The large marking goes in front, where no layer can occlude it.
      markD: artwork.markD,
      markStrokeWidth: artwork.markStrokeWidth,
    },
  ]

  return {
    viewBox: `0 0 ${NOTE.widthMm} ${NOTE.heightMm}`,
    widthPx,
    heightPx: Math.floor(schematicHeightPx(NOTE) / MAX_MAGNIFICATION),
    /** Stated openly in the UI as the largest scale the stack can present at. */
    scalePercent: Math.round(
      ((widthPx * MAX_MAGNIFICATION) / (NOTE.widthMm * (96 / 25.4))) * 100,
    ),
    layers,
  }
}
