'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { AnatomyViewModel } from '@/lib/hero/anatomy'
import { ENGRAVING, PROOF, SPESIMEN_INK } from '@/lib/tokens'
import type { CheckChannel } from '@/lib/content/schema'

/**
 * The exploded anatomy, in CSS 3D.
 *
 * Depth is real transform depth rather than a drawn illusion, so the layers
 * separate as you move — which is the whole point: a banknote is a stack, and
 * the features live at different levels of it.
 *
 * No WebGL and no 3D library: PRD §11 sets a 200 KB JS budget and three.js
 * alone would eat most of it. Transforms cost nothing.
 *
 * Pointer drives the tilt; without a pointer the stack rests at a readable
 * angle. Under prefers-reduced-motion it does not move at all, and the labels
 * still say everything the motion says.
 */

export interface AnatomyStackProps {
  readonly model: AnatomyViewModel
  /** Label and destination per layer, resolved on the server. */
  readonly links: ReadonlyArray<{
    readonly featureId: string
    readonly label: string
    readonly url: string
  }>
  readonly caption: string
  readonly hint: string
}

const CHANNEL_TEXT: Record<CheckChannel, string> = {
  dilihat: 'text-dilihat-deep',
  diraba: 'text-diraba-deep',
  diterawang: 'text-diterawang-deep',
  mesin: 'text-mesin-deep',
}

const REST_TILT = { x: 14, y: -22 }

export function AnatomyStack({ model, links, caption, hint }: AnatomyStackProps) {
  const frame = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState(REST_TILT)
  const [still, setStill] = useState(false)
  const [active, setActive] = useState<string | undefined>(undefined)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setStill(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (still) return
    const box = frame.current?.getBoundingClientRect()
    if (box === undefined) return
    const dx = (event.clientX - box.left) / box.width - 0.5
    const dy = (event.clientY - box.top) / box.height - 0.5
    setTilt({ x: REST_TILT.x - dy * 22, y: REST_TILT.y + dx * 34 })
  }

  const linkFor = (featureId: string) => links.find((entry) => entry.featureId === featureId)
  const labelFor = (featureId: string) => linkFor(featureId)?.label ?? featureId
  const urlFor = (featureId: string) => linkFor(featureId)?.url ?? '#'

  return (
    <div className="relative">
      <div
        ref={frame}
        onPointerMove={handlePointer}
        onPointerLeave={() => setTilt(REST_TILT)}
        className="flex items-center justify-center py-10 sm:py-16"
        style={{ perspective: '1400px', perspectiveOrigin: '50% 45%' }}
      >
        <div
          data-anatomy="exploded"
          className="relative transition-transform duration-300 ease-out"
          style={{
            width: model.widthPx,
            height: model.heightPx,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          {model.layers.map((layer) => {
            const isActive = active === layer.featureId
            return (
              <Link
                key={layer.featureId}
                href={urlFor(layer.featureId)}
                onMouseEnter={() => setActive(layer.featureId)}
                onMouseLeave={() => setActive(undefined)}
                onFocus={() => setActive(layer.featureId)}
                onBlur={() => setActive(undefined)}
                aria-label={labelFor(layer.featureId)}
                className="absolute inset-0 block rounded-[3px] outline-offset-8"
                style={{
                  transform: `translateZ(${layer.depth}px)`,
                  transformStyle: 'preserve-3d',
                  filter: isActive
                    ? 'drop-shadow(0 18px 26px rgba(26,31,38,0.28))'
                    : 'drop-shadow(0 10px 18px rgba(26,31,38,0.14))',
                  transition: 'filter 200ms ease-out',
                }}
              >
                <svg
                  viewBox={model.viewBox}
                  width={model.widthPx}
                  height={model.heightPx}
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={layer.outlineD} fill={PROOF} fillOpacity={0.88} />
                  <path
                    d={layer.outlineD}
                    fill={layer.ink}
                    fillOpacity={isActive ? layer.fillOpacity * 2.2 : layer.fillOpacity}
                    stroke={ENGRAVING}
                    strokeWidth={0.4}
                    strokeOpacity={0.55}
                  />
                  <path
                    d={layer.detailD}
                    fill="none"
                    stroke={layer.ink}
                    strokeWidth={layer.detailWidth}
                    strokeLinecap="round"
                    strokeDasharray={layer.detailDashed ? '2 2' : undefined}
                    opacity={isActive ? 1 : 0.78}
                  />
                  {layer.markD !== undefined && (
                    <path
                      data-spesimen="baked"
                      d={layer.markD}
                      fill="none"
                      stroke={SPESIMEN_INK}
                      strokeWidth={layer.markStrokeWidth}
                      strokeLinecap="square"
                      opacity="0.8"
                    />
                  )}
                </svg>
              </Link>
            )
          })}
        </div>
      </div>

      {/* The labels carry the whole meaning, so the diagram works without motion. */}
      <ol className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {model.layers.map((layer, index) => (
          <li key={layer.featureId}>
            <Link
              href={urlFor(layer.featureId)}
              onMouseEnter={() => setActive(layer.featureId)}
              onMouseLeave={() => setActive(undefined)}
              className={`flex items-baseline gap-2 text-sm ${CHANNEL_TEXT[layer.channel]} ${
                active === layer.featureId ? 'underline underline-offset-4' : ''
              }`}
            >
              <span className="callout-number opacity-60">{index + 1}</span>
              {labelFor(layer.featureId)}
            </Link>
          </li>
        ))}
      </ol>

      <p className="numeric mt-5 text-center text-xs text-engraving-faint">
        {caption} · {model.scalePercent}%
      </p>
      <p className="mt-1 text-center text-xs text-engraving-faint">{hint}</p>
    </div>
  )
}
