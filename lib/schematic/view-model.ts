import type { CheckChannel } from '@/lib/content/schema'
import { assertSchematicWidth, schematicHeightPx, schematicWidthPx, type PhysicalSize } from './constraint'
import { buildSchematic } from './outline'

/**
 * Everything the schematic component renders, computed here.
 *
 * Components map, they do not derive (CLAUDE.md invariant 12). That matters
 * more than usual here: the size constraint and the marking are both decided
 * in this function, where they can be tested directly, rather than in JSX.
 */

export interface SchematicMarkerInput {
  readonly featureId: string
  readonly channel: CheckChannel
  readonly label: string
  readonly region: {
    readonly xMm: number
    readonly yMm: number
    readonly widthMm: number
    readonly heightMm: number
  }
}

export interface SchematicMarker {
  readonly featureId: string
  readonly channel: CheckChannel
  readonly label: string
  /** Callout number, in the engraver's margin sense — PRD §9. */
  readonly index: number
  readonly regionD: string
  readonly anchorX: number
  readonly anchorY: number
}

export interface SchematicInput {
  readonly size: PhysicalSize
  /** Denomination caption, e.g. "Rp100.000". Never rendered as note lettering. */
  readonly caption: string
  readonly markers?: readonly SchematicMarkerInput[]
}

export interface SchematicViewModel {
  readonly viewBox: string
  readonly outlineD: string
  readonly markD: string
  readonly marginMarkD: string
  readonly markStrokeWidth: number
  readonly marginMarkStrokeWidth: number
  readonly registrationD: string
  readonly marginRuleD: string
  readonly strokeWidth: number
  readonly widthPx: number
  readonly heightPx: number
  /** Rendered scale, stated openly in the UI rather than left implicit. */
  readonly scalePercent: number
  readonly caption: string
  readonly markers: readonly SchematicMarker[]
}

function n(value: number): string {
  return Number(value.toFixed(3)).toString()
}

function regionPath(region: SchematicMarkerInput['region']): string {
  const { xMm: x, yMm: y, widthMm: w, heightMm: h } = region
  return `M${n(x)} ${n(y)}H${n(x + w)}V${n(y + h)}H${n(x)}Z`
}

export function schematicViewModel(input: SchematicInput): SchematicViewModel {
  const geometry = buildSchematic(input.size)
  const widthPx = schematicWidthPx(input.size)

  // Belt and braces: the width this module chose is checked before it is used.
  assertSchematicWidth(widthPx, input.size)

  const markers = (input.markers ?? []).map((marker, index) => ({
    featureId: marker.featureId,
    channel: marker.channel,
    label: marker.label,
    index: index + 1,
    regionD: regionPath(marker.region),
    anchorX: marker.region.xMm + marker.region.widthMm / 2,
    anchorY: marker.region.yMm + marker.region.heightMm / 2,
  }))

  return {
    viewBox: geometry.viewBox,
    outlineD: geometry.artwork.outlineD,
    markD: geometry.artwork.markD,
    marginMarkD: geometry.artwork.marginMarkD,
    markStrokeWidth: geometry.artwork.markStrokeWidth,
    marginMarkStrokeWidth: geometry.artwork.marginMarkStrokeWidth,
    registrationD: geometry.registrationD,
    marginRuleD: geometry.marginRuleD,
    strokeWidth: geometry.strokeWidth,
    widthPx,
    heightPx: schematicHeightPx(input.size),
    scalePercent: Math.round((widthPx / (input.size.widthMm * (96 / 25.4))) * 100),
    caption: input.caption,
    markers,
  }
}
