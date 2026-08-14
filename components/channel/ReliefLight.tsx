'use client'

import { useMemo, useState } from 'react'
import { DIRABA, PROOF, rgbTriplet } from '@/lib/tokens'
import { RELIEF_FRAGMENT } from '@/lib/webgl/shaders'
import { DemoShell } from './DemoShell'
import { GlPanel } from './GlPanel'
import type { DemoCopy } from '@/lib/i18n/demo'

/**
 * Diraba, shown the only way a screen honestly can: as light.
 *
 * A screen has no texture, so this does not pretend to reproduce touch — that
 * limit is stated on the page and is not negotiable. What it does show is the
 * other consequence of relief: ink standing above the surface catches a raking
 * light and shadows on the far side. Sweep the lamp and the ridges appear.
 *
 * The height field is a run of plain ridges, not any note's engraving.
 */
export function ReliefLight({
  copy,
  ridges = 9,
}: {
  readonly copy: DemoCopy
  /** Blind-code marks are sparse; intaglio hatching is dense. */
  readonly ridges?: number
}) {
  const [azimuth, setAzimuth] = useState(20)

  const uniforms = useMemo(
    () => ({
      uLightAngle: (azimuth * Math.PI) / 180,
      uRidgeCount: ridges,
      uInk: rgbTriplet(DIRABA),
      uStock: rgbTriplet(PROOF),
    }),
    [azimuth, ridges],
  )

  return (
    <DemoShell
      channel="diraba"
      headingId="relief"
      heading={copy.reliefHeading}
      body={copy.reliefBody}
      disclaimer={copy.reliefDisclaimer}
    >
      <div className="mt-6 aspect-[5/2] w-full max-w-lg overflow-hidden rounded-sm border border-engraving/12">
        <GlPanel
          fragment={RELIEF_FRAGMENT}
          uniforms={uniforms}
          label={copy.reliefHeading}
          className="h-full w-full"
          fallback={
            <div className="flex h-full items-center justify-center bg-proof p-4 text-center text-sm text-engraving-faint">
              {copy.glUnavailable}
            </div>
          }
        />
      </div>

      <label htmlFor="relief-light" className="mt-4 block text-sm">
        {copy.reliefLightLabel}
      </label>
      <input
        id="relief-light"
        type="range"
        min={0}
        max={360}
        step={1}
        value={azimuth}
        onChange={(event) => setAzimuth(Number(event.target.value))}
        className="mt-2 w-full max-w-lg accent-diraba"
      />
      <p className="numeric mt-1 text-sm text-engraving-soft">{azimuth}°</p>
    </DemoShell>
  )
}
