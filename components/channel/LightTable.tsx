'use client'

import { useMemo, useRef, useState } from 'react'
import { DITERAWANG, INSPECT, PROOF_DEEP, rgbTriplet } from '@/lib/tokens'
import { LIGHT_TABLE_FRAGMENT } from '@/lib/webgl/shaders'
import { GlPanel } from './GlPanel'
import type { DemoCopy } from '@/lib/i18n/demo'

/**
 * Diterawang, as a light table.
 *
 * Move the lamp behind the sheet and watch brightness follow thickness: the
 * shader computes transmission falling exponentially with the material it
 * passed through, which is the watermark mechanism stated as arithmetic.
 *
 * The thickness field is an abstract lens and ring — deliberately not a
 * portrait and not any device from a note. What is on show is the
 * relationship, not a picture of a watermark.
 */
export function LightTable({ copy }: { readonly copy: DemoCopy }) {
  const frame = useRef<HTMLDivElement>(null)
  const [light, setLight] = useState<readonly [number, number]>([0.38, 0.5])

  const move = (clientX: number, clientY: number) => {
    const box = frame.current?.getBoundingClientRect()
    if (box === undefined) return
    const x = Math.min(1, Math.max(0, (clientX - box.left) / box.width))
    // uv origin is bottom-left in GL, top-left on screen.
    const y = Math.min(1, Math.max(0, 1 - (clientY - box.top) / box.height))
    setLight([x, y])
  }

  const uniforms = useMemo(
    () => ({
      uLight: light,
      uStrength: 1.0,
      uWarm: rgbTriplet(DITERAWANG),
      uStock: rgbTriplet(PROOF_DEEP),
    }),
    [light],
  )

  const nudge = (dx: number, dy: number) =>
    setLight(([x, y]) => [
      Math.min(1, Math.max(0, x + dx)),
      Math.min(1, Math.max(0, y + dy)),
    ])

  return (
    <section
      className="mt-10 border-t-4 border-diterawang bg-proof-deep/40 p-5"
      aria-labelledby="terawang"
    >
      <h2 id="terawang" className="font-display text-xl">
        {copy.lightHeading}
      </h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-engraving-soft">
        {copy.lightBody}
      </p>

      <div
        ref={frame}
        onPointerMove={(event) => {
          if (event.pointerType === 'mouse' && event.buttons === 0) move(event.clientX, event.clientY)
          else if (event.pointerType !== 'mouse') move(event.clientX, event.clientY)
        }}
        onPointerDown={(event) => move(event.clientX, event.clientY)}
        className="mt-6 aspect-[2/1] w-full max-w-lg overflow-hidden rounded-sm"
        style={{ backgroundColor: INSPECT }}
      >
        <GlPanel
          fragment={LIGHT_TABLE_FRAGMENT}
          uniforms={uniforms}
          label={copy.lightHeading}
          className="h-full w-full touch-none"
          fallback={
            <div className="flex h-full items-center justify-center p-4 text-center text-sm text-proof/70">
              {copy.glUnavailable}
            </div>
          }
        />
      </div>

      {/* Keyboard control, so the demonstration is not pointer-only. */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-engraving-faint">{copy.lightMove}</span>
        {(
          [
            ['←', -0.06, 0],
            ['→', 0.06, 0],
            ['↑', 0, 0.06],
            ['↓', 0, -0.06],
          ] as const
        ).map(([glyph, dx, dy]) => (
          <button
            key={glyph}
            type="button"
            onClick={() => nudge(dx, dy)}
            aria-label={`${copy.lightMove} ${glyph}`}
            className="h-7 w-7 border border-engraving/25 text-sm hover:border-engraving"
          >
            {glyph}
          </button>
        ))}
      </div>

      <p className="mt-5 max-w-prose text-xs leading-relaxed text-engraving-faint">
        {copy.lightDisclaimer}
      </p>
    </section>
  )
}
