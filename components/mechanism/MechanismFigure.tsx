import { mechanismSvg, type MechanismId } from '@/lib/art/mechanisms'
import { CHANNEL_BORDER } from '@/lib/channelClasses'
import type { CheckChannel } from '@/lib/content/schema'
import { mechanismDownloadPath } from '@/lib/paths'

/**
 * A mechanism illustration with its numbered steps beside it — the engraver's
 * callout convention from PRD §9. The drawing carries numbers only; the words
 * are localized HTML, so the artwork never has to be re-authored per language.
 */

export interface MechanismFigureProps {
  readonly id: MechanismId
  readonly channel: CheckChannel
  readonly caption: string
  readonly steps: readonly string[]
  /** Label for the diagram download. Sharing emits diagrams only — PRD §2. */
  readonly downloadLabel: string
}

export function MechanismFigure({
  id,
  channel,
  caption,
  steps,
  downloadLabel,
}: MechanismFigureProps) {
  return (
    <figure className={`border-t-4 bg-proof-deep/40 ${CHANNEL_BORDER[channel]}`}>
      <div
        // Decorative: the figcaption right below states the same thing as
        // real, readable text, and the numbered steps carry the actual
        // detail. Labelling this as its own image would announce the same
        // sentence to screen reader users twice in a row.
        aria-hidden="true"
        // "mech" opts this render into app/globals.css's .mech .rays path
        // rule — previously only the Ciri-index thumbnail carried it, so the
        // tanda-air rays animated as a small teaser but sat static on its own
        // full-size explainer page, where the moving light communicates the
        // transmitted-light mechanism best (critique 2026-08-14, P2). Inert
        // for every other mechanism: only tanda-air's artwork defines a
        // "rays" group for the rule to match.
        className="mech [&>svg]:h-auto [&>svg]:w-full"
        // Authored artwork from art/mechanisms, read at build time and checked
        // to be inert. No user input reaches this.
        dangerouslySetInnerHTML={{ __html: mechanismSvg(id) }}
      />
      <figcaption className="border-t border-engraving/10 px-5 py-4">
        <p className="text-sm leading-relaxed text-engraving-soft">{caption}</p>
        <ol className="mt-4 space-y-2">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm leading-relaxed">
              <span aria-hidden="true" className="callout-number mt-0.5 shrink-0 text-engraving-faint">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 border-t border-engraving/10 pt-4">
          <a
            href={mechanismDownloadPath(id)}
            download={`${id}.svg`}
            className="font-mono text-xs uppercase tracking-wider text-engraving-soft underline underline-offset-4 hover:text-engraving"
          >
            {downloadLabel}
          </a>
        </p>
      </figcaption>
    </figure>
  )
}
