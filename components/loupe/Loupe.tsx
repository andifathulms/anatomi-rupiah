import type { LoupeViewModel } from '@/lib/schematic/loupe'
import type { CheckChannel } from '@/lib/content/schema'
import { CHANNEL_INK, ENGRAVING, ENGRAVING_FAINT, SPESIMEN_INK } from '@/lib/tokens'

/**
 * The magnified detail. It shows a region of the schematic, never a note, and
 * carries its own baked SPESIMEN because a magnified view is artwork too.
 * Inline presentation attributes throughout, for the same reason as the sheet.
 */
export function Loupe({
  model,
  channel,
  label,
}: {
  readonly model: LoupeViewModel
  readonly channel: CheckChannel
  readonly label: string
}) {
  return (
    <svg
      viewBox={model.viewBox}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
      data-loupe={channel}
      className="h-full w-full"
    >
      <g>
        <path d={model.outlineD} fill="none" stroke={ENGRAVING} strokeWidth={model.strokeWidth} />
        <path
          d={model.crosshairD}
          fill="none"
          stroke={ENGRAVING_FAINT}
          strokeWidth={model.strokeWidth * 0.5}
          strokeDasharray="1 2"
        />
        <path
          d={model.outlineD}
          fill={CHANNEL_INK[channel]}
          opacity="0.08"
          stroke={CHANNEL_INK[channel]}
          strokeWidth={model.strokeWidth * 2}
        />
        <path
          data-spesimen="baked"
          d={model.markD}
          fill="none"
          stroke={SPESIMEN_INK}
          strokeWidth={model.markStrokeWidth}
          strokeLinecap="square"
          opacity="0.9"
        />
        <path
          data-spesimen="baked"
          d={model.marginMarkD}
          fill="none"
          stroke={SPESIMEN_INK}
          strokeWidth={model.marginMarkStrokeWidth}
          strokeLinecap="square"
        />
      </g>
    </svg>
  )
}
