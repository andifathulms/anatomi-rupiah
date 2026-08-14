import type { KeyboardEvent } from 'react'
import type { SchematicViewModel } from '@/lib/schematic/view-model'
import { CHANNEL_INK, ENGRAVING, ENGRAVING_FAINT, PROOF, SPESIMEN_INK } from '@/lib/tokens'

/**
 * The schematic note outline.
 *
 * Every stroke here is an inline presentation attribute rather than a class,
 * because the SPESIMEN marking required by UU 7/2011 Pasal 24 ayat (1) has to
 * render with the artwork even if the stylesheet never loads. The mark is a
 * <path> in the same <g> as the outline, in the same coordinate space, drawn
 * from geometry produced by the same call — never an overlay, a pseudo-element,
 * or a layer that something else can hide. See CLAUDE.md invariant 1.
 */

export interface SchematicProps {
  readonly model: SchematicViewModel
  readonly activeFeatureId?: string
  /**
   * When provided, the on-note markers become real controls rather than
   * lookalikes of the clickable badges used everywhere else on the sheet
   * (the margin list, MechanismFigure). Without it they stay presentational —
   * critique 2026-08-14 (P1) found the drawing's own numbered dots had no
   * click handler while sharing the exact visual grammar of ones that did.
   */
  readonly onSelectFeature?: (featureId: string) => void
}

export function Schematic({ model, activeFeatureId, onSelectFeature }: SchematicProps) {
  return (
    <svg
      viewBox={model.viewBox}
      width={model.widthPx}
      height={model.heightPx}
      role="img"
      aria-label={`Skema ${model.caption}, ditandai SPESIMEN, digambar pada ${model.scalePercent}% ukuran sebenarnya`}
      data-schematic={model.caption}
      data-scale-percent={model.scalePercent}
    >
      <g>
        <path
          d={model.outlineD}
          fill="none"
          stroke={ENGRAVING}
          strokeWidth={model.strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={model.marginRuleD}
          fill="none"
          stroke={ENGRAVING_FAINT}
          strokeWidth={model.strokeWidth * 0.6}
          strokeDasharray="1.5 1.5"
        />
        <path
          d={model.registrationD}
          fill="none"
          stroke={ENGRAVING_FAINT}
          strokeWidth={model.strokeWidth}
        />

        {model.markers.map((marker) => (
          <g
            key={marker.featureId}
            data-marker={marker.featureId}
            {...(onSelectFeature === undefined
              ? {}
              : {
                  role: 'button' as const,
                  tabIndex: 0,
                  cursor: 'pointer',
                  'aria-pressed': marker.featureId === activeFeatureId,
                  'aria-label': marker.label,
                  onClick: () => onSelectFeature(marker.featureId),
                  onKeyDown: (event: KeyboardEvent<SVGGElement>) => {
                    if (event.key !== 'Enter' && event.key !== ' ') return
                    event.preventDefault()
                    onSelectFeature(marker.featureId)
                  },
                })}
          >
            <path
              d={marker.regionD}
              fill="none"
              stroke={CHANNEL_INK[marker.channel]}
              strokeWidth={model.strokeWidth * (marker.featureId === activeFeatureId ? 2.2 : 1.2)}
            />
            <circle
              cx={marker.anchorX}
              cy={marker.anchorY}
              r={3.2}
              fill={CHANNEL_INK[marker.channel]}
            />
            <text
              x={marker.anchorX}
              y={marker.anchorY + 1.3}
              textAnchor="middle"
              fontSize={4}
              fill={PROOF}
              aria-hidden="true"
            >
              {marker.index}
            </text>
          </g>
        ))}

        {/* The marking. Geometry, not text; artwork, not overlay. */}
        <path
          data-spesimen="baked"
          d={model.markD}
          fill="none"
          stroke={SPESIMEN_INK}
          strokeWidth={model.markStrokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
          opacity="0.85"
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
