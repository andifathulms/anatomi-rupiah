'use client'

import { useState } from 'react'
import { ENGRAVING, MESIN, PROOF_DEEP } from '@/lib/tokens'
import { DemoShell } from './DemoShell'
import type { DemoCopy } from '@/lib/i18n/demo'

/**
 * The UV toggle is a state change, not a transition — PRD §9.
 *
 * The pattern shown is an abstract lattice, not a note design, and the page
 * says plainly that a screen emits no ultraviolet and does not replace a lamp.
 */
export function UvToggle({ copy }: { readonly copy: DemoCopy }) {
  const [lampOn, setLampOn] = useState(false)

  return (
    <DemoShell
      channel="mesin"
      headingId="uv"
      heading={copy.uvHeading}
      body={copy.uvBody}
      disclaimer={copy.uvDisclaimer}
    >
      <div className="mt-6 flex flex-wrap items-center gap-8">
        <svg
          viewBox="0 0 200 120"
          className="h-auto w-full max-w-xs shrink"
          role="img"
          aria-label={lampOn ? copy.uvLamp : copy.uvOrdinary}
        >
          <rect
            x="6"
            y="6"
            width="188"
            height="108"
            fill={lampOn ? ENGRAVING : PROOF_DEEP}
            stroke={ENGRAVING}
            strokeWidth="1.6"
          />
          <g
            stroke={MESIN}
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity={lampOn ? 1 : 0.06}
          >
            <path d="M24 40h152M24 62h104M24 84h130" />
            <circle cx="164" cy="84" r="9" fill="none" />
          </g>
        </svg>

        <div>
          <button
            type="button"
            onClick={() => setLampOn((on) => !on)}
            aria-pressed={lampOn}
            className={
              lampOn
                ? 'inline-flex min-h-11 items-center border border-mesin bg-mesin px-4 py-2 text-sm text-proof'
                : 'inline-flex min-h-11 items-center border border-engraving/30 px-4 py-2 text-sm hover:border-engraving'
            }
          >
            {lampOn ? copy.uvLamp : copy.uvOrdinary}
          </button>
        </div>
      </div>
    </DemoShell>
  )
}
