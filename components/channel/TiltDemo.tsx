'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  TILT_MAX_DEG,
  TILT_MIN_DEG,
  clampTilt,
  colourAtAngle,
  pathDifferenceNm,
  skewForAngle,
} from '@/lib/optics/colour-shift'
import { ENGRAVING, ENGRAVING_FAINT, PROOF, rgbTriplet } from '@/lib/tokens'
import { THIN_FILM_FRAGMENT } from '@/lib/webgl/shaders'
import { GlPanel } from './GlPanel'
import type { DemoCopy } from '@/lib/i18n/demo'

/**
 * The colour-shift demonstration — PRD §9's one orchestrated moment.
 *
 * The panel is a fragment shader computing thin-film interference per pixel
 * for three wavelengths, so moving the control changes the *angle* and the
 * colour follows from the optics. That is the claim the explainer makes, and
 * here it is the mechanism rather than an illustration of one.
 *
 * The slider is the primary control and always works. Device orientation is
 * opt-in behind a button because iOS requires a gesture. Where WebGL is
 * unavailable the SVG version below takes over, and teaches the same
 * relationship with a flat interpolation.
 */

type OrientationState = 'off' | 'on' | 'unavailable'

/** Optical thickness in nanometre-ish units: chosen to read well on a screen. */
const FILM_THICKNESS = 385

export function TiltDemo({ copy }: { readonly copy: DemoCopy }) {
  const [angle, setAngle] = useState(0)
  const [orientation, setOrientation] = useState<OrientationState>('off')

  useEffect(() => {
    if (orientation !== 'on') return undefined
    const handle = (event: DeviceOrientationEvent) => {
      if (event.gamma === null) return
      setAngle(clampTilt(event.gamma))
    }
    window.addEventListener('deviceorientation', handle)
    return () => window.removeEventListener('deviceorientation', handle)
  }, [orientation])

  const enableOrientation = () => {
    const api = window.DeviceOrientationEvent as
      | (typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> })
      | undefined

    if (api === undefined) {
      setOrientation('unavailable')
      return
    }
    if (typeof api.requestPermission === 'function') {
      void api
        .requestPermission()
        .then((result) => setOrientation(result === 'granted' ? 'on' : 'unavailable'))
        .catch(() => setOrientation('unavailable'))
      return
    }
    setOrientation('on')
  }

  const rounded = Math.round(angle)

  const uniforms = useMemo(
    () => ({
      uTilt: (angle * Math.PI) / 180,
      uThickness: FILM_THICKNESS,
      uPaper: rgbTriplet(PROOF),
    }),
    [angle],
  )

  const flatColour = colourAtAngle(angle)
  const skew = skewForAngle(angle)
  const opd = Math.round(pathDifferenceNm(angle, FILM_THICKNESS))

  return (
    <section className="mt-10 border-t-4 border-dilihat bg-proof-deep/40 p-5" aria-labelledby="tilt">
      <h2 id="tilt" className="font-display text-xl">
        {copy.tiltHeading}
      </h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-engraving-soft">{copy.tiltBody}</p>

      <div className="mt-6 flex flex-wrap items-center gap-8">
        <div className="aspect-[4/3] w-full max-w-xs">
          <GlPanel
            fragment={THIN_FILM_FRAGMENT}
            uniforms={uniforms}
            label={copy.tiltHeading}
            className="h-full w-full"
            fallback={
              <svg viewBox="0 0 160 120" className="h-full w-full" role="img" aria-label={copy.tiltHeading}>
                <g transform={`translate(80 60) skewX(${skew}) translate(-80 -60)`}>
                  <path
                    d="M80 22l30 18v40l-30 18-30-18V40z"
                    fill={flatColour}
                    stroke={ENGRAVING}
                    strokeWidth="1.6"
                  />
                </g>
                <path d="M20 104h120" stroke={ENGRAVING_FAINT} strokeWidth="1" strokeDasharray="2 3" />
              </svg>
            }
          />
        </div>

        <div className="min-w-0 flex-1">
          <label htmlFor="tilt-angle" className="block text-sm">
            {copy.tiltLabel}
          </label>
          <input
            id="tilt-angle"
            type="range"
            min={TILT_MIN_DEG}
            max={TILT_MAX_DEG}
            step={1}
            value={rounded}
            onChange={(event) => {
              setOrientation('off')
              setAngle(clampTilt(Number(event.target.value)))
            }}
            className="mt-2 w-full accent-dilihat"
          />
          <p className="numeric mt-2 text-sm text-engraving-soft">
            {copy.tiltAngle}: {rounded}°{rounded === 0 ? ` · ${copy.tiltHeadOn}` : ''}
          </p>
          <p className="numeric mt-1 text-sm text-engraving-faint">
            {copy.tiltPathDifference}: ≈{opd} nm
          </p>

          {orientation === 'off' && (
            <button
              type="button"
              onClick={enableOrientation}
              className="mt-4 border border-engraving/30 px-3 py-1.5 text-sm hover:border-engraving"
            >
              {copy.tiltUseDevice}
            </button>
          )}
          {orientation === 'on' && (
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-dilihat">
              {copy.tiltUsingDevice}
            </p>
          )}
          {orientation === 'unavailable' && (
            <p className="mt-4 text-sm text-engraving-faint">{copy.tiltDeviceUnavailable}</p>
          )}
        </div>
      </div>

      <p className="mt-6 max-w-prose text-xs leading-relaxed text-engraving-faint">
        {copy.tiltDisclaimer}
      </p>
    </section>
  )
}
