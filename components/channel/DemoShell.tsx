import type { ReactNode } from 'react'
import { CHANNEL_BORDER } from '@/lib/channelClasses'
import type { CheckChannel } from '@/lib/content/schema'

/**
 * The shared shell around each channel demonstration. All four demos
 * (ReliefLight, UvToggle, TiltDemo, LightTable) opened with the same
 * `border-t-4 border-{channel} bg-proof-deep/40 p-5` wrapper, heading, body
 * paragraph, and closing disclaimer — this pulls that wrapper out so the four
 * components differ only in the interactive content they actually differ on.
 */

export function DemoShell({
  channel,
  headingId,
  heading,
  body,
  disclaimer,
  children,
}: {
  readonly channel: CheckChannel
  readonly headingId: string
  readonly heading: string
  readonly body: string
  readonly disclaimer: ReactNode
  readonly children: ReactNode
}) {
  return (
    <section
      className={`mt-10 border-t-4 bg-proof-deep/40 p-5 ${CHANNEL_BORDER[channel]}`}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="font-display text-xl">
        {heading}
      </h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-engraving-soft">{body}</p>

      {children}

      <p className="mt-5 max-w-prose text-xs leading-relaxed text-engraving-faint">{disclaimer}</p>
    </section>
  )
}
