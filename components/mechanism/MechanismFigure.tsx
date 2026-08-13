import { mechanismSvg, type MechanismId } from '@/lib/art/mechanisms'
import type { CheckChannel } from '@/lib/content/schema'

/**
 * A mechanism illustration with its numbered steps beside it — the engraver's
 * callout convention from PRD §9. The drawing carries numbers only; the words
 * are localized HTML, so the artwork never has to be re-authored per language.
 */

export interface MechanismFigureProps {
  readonly id: MechanismId
  readonly channel: CheckChannel
  /** Localized description of the drawing, for readers who cannot see it. */
  readonly alt: string
  readonly caption: string
  readonly steps: readonly string[]
}

const CHANNEL_RULE: Record<CheckChannel, string> = {
  dilihat: 'border-dilihat',
  diraba: 'border-diraba',
  diterawang: 'border-diterawang',
  mesin: 'border-mesin',
}

export function MechanismFigure({ id, channel, alt, caption, steps }: MechanismFigureProps) {
  return (
    <figure className={`border-t-4 bg-proof-deep/40 ${CHANNEL_RULE[channel]}`}>
      <div
        role="img"
        aria-label={alt}
        className="[&>svg]:h-auto [&>svg]:w-full"
        // Authored artwork from art/mechanisms, read at build time and checked
        // to be inert. No user input reaches this.
        dangerouslySetInnerHTML={{ __html: mechanismSvg(id) }}
      />
      <figcaption className="border-t border-engraving/10 px-5 py-4">
        <p className="text-sm leading-relaxed text-engraving-soft">{caption}</p>
        <ol className="mt-4 space-y-2">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm leading-relaxed">
              <span className="callout-number mt-0.5 shrink-0 text-engraving-faint">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  )
}
