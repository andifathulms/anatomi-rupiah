'use client'

import { useEffect, useState } from 'react'
import {
  TILT_MAX_DEG,
  TILT_MIN_DEG,
  clampTilt,
  colourAtAngle,
  skewForAngle,
} from '@/lib/optics/colour-shift'
import { ENGRAVING, ENGRAVING_FAINT } from '@/lib/tokens'
import type { DemoCopy } from '@/lib/i18n/demo'

/**
 * The one moment on this site that genuinely animates — PRD §9.
 *
 * The slider is the primary control and always works. Device orientation is an
 * enhancement, opt-in behind a button because iOS requires a user gesture, and
 * it changes nothing about what the demonstration teaches.
 *
 * The shape is an abstract rosette. It is not a note element and must not
 * become one.
 */

type OrientationState = 'off' | 'on' | 'unavailable'

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

  const colour = colourAtAngle(angle)
  const skew = skewForAngle(angle)
  const rounded = Math.round(angle)

  return (
    <section className="mt-10 border-t-4 border-dilihat bg-proof-deep/40 p-5" aria-labelledby="tilt">
      <h2 id="tilt" className="font-display text-xl">
        {copy.tiltHeading}
      </h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-engraving-soft">{copy.tiltBody}</p>

      <div className="mt-6 flex flex-wrap items-center gap-8">
        <svg viewBox="0 0 160 120" width="200" height="150" role="img" aria-label={copy.tiltHeading}>
          <g transform={`translate(80 60) skewX(${skew}) translate(-80 -60)`}>
            <path
              d="M80 22l30 18v40l-30 18-30-18V40z"
              fill={colour}
              stroke={ENGRAVING}
              strokeWidth="1.6"
            />
            <path d="M80 38l16 10v24l-16 10-16-10V48z" fill="none" stroke={ENGRAVING} strokeWidth="1" opacity="0.5" />
          </g>
          <path d="M20 104h120" stroke={ENGRAVING_FAINT} strokeWidth="1" strokeDasharray="2 3" />
        </svg>

        <div className="min-w-[16rem] flex-1">
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
