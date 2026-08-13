import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CitationLines } from '@/components/mechanism/CitationList'
import { denominationChecklist, denominationIds } from '@/lib/content/views'
import { LOCALES, href, isLocale } from '@/lib/i18n'
import { PERIKSA } from '@/lib/i18n/periksa'
import type { CheckChannel } from '@/lib/content/schema'

const CHANNEL_ACCENT: Record<CheckChannel, string> = {
  dilihat: 'border-t-dilihat',
  diraba: 'border-t-diraba',
  diterawang: 'border-t-diterawang',
  mesin: 'border-t-mesin',
}

const CHANNEL_TEXT: Record<CheckChannel, string> = {
  dilihat: 'text-dilihat-deep',
  diraba: 'text-diraba-deep',
  diterawang: 'text-diterawang-deep',
  mesin: 'text-mesin-deep',
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => denominationIds().map((denomination) => ({ locale, denomination })))
}

export function generateMetadata({
  params,
}: {
  readonly params: { readonly locale: string; readonly denomination: string }
}): Metadata {
  if (!isLocale(params.locale)) return {}
  const checklist = denominationChecklist(params.locale, params.denomination)
  return { title: checklist?.label ?? 'Periksa' }
}

export default function DenominationChecklistPage({
  params,
}: {
  readonly params: { readonly locale: string; readonly denomination: string }
}) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const copy = PERIKSA[locale]
  const checklist = denominationChecklist(locale, params.denomination)
  if (checklist === undefined) notFound()

  return (
    <article className="py-14">
      <Link
        href={href(locale, 'lembar')}
        className="text-sm text-engraving-faint underline underline-offset-4 hover:text-engraving print:hidden"
      >
        ← {copy.backToSheet}
      </Link>

      <p className="eyebrow mt-5">{copy.kicker}</p>
      <h1 className="mt-3 font-display text-title">{checklist.label}</h1>
      <p className="mt-5 max-w-prose text-lede text-engraving-soft">{copy.lede}</p>
      <p className="mt-2 text-xs text-engraving-faint print:hidden">{copy.printHint}</p>

      <div className="mt-10 space-y-10">
        {checklist.byChannel.map((group) => (
          <section key={group.channel} className={`border-t-4 pt-4 ${CHANNEL_ACCENT[group.channel]}`}>
            <h2 className={`font-mono text-xs uppercase tracking-[0.24em] ${CHANNEL_TEXT[group.channel]}`}>
              {group.channelLabel}
            </h2>
            <ul className="mt-4 space-y-5">
              {group.items.map((item) => (
                <li key={item.featureId} className="border-l-2 border-engraving/20 pl-4">
                  <p className="font-display text-lg">{item.featureName}</p>
                  <p className="mt-1 leading-relaxed text-engraving-soft">{item.note}</p>
                  <p className="mt-2 font-mono text-label uppercase tracking-wider text-engraving-faint">
                    {copy.sourcesLabel}
                  </p>
                  <CitationLines
                    citations={item.citations}
                    locale={locale}
                    className="mt-1 space-y-1 text-xs text-engraving-faint"
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}

        {checklist.kodeTunaNetra !== undefined && (
          <section className="border-t-4 border-t-engraving/40 pt-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.24em] text-engraving-faint">
              {copy.kodeTunaNetraHeading}
            </h2>
            <p className="mt-4 leading-relaxed text-engraving-soft">{checklist.kodeTunaNetra.description}</p>
            <p className="mt-2 font-mono text-label uppercase tracking-wider text-engraving-faint">
              {copy.sourcesLabel}
            </p>
            <CitationLines
              citations={checklist.kodeTunaNetra.citations}
              locale={locale}
              className="mt-1 space-y-1 text-xs text-engraving-faint"
            />
          </section>
        )}
      </div>

      {checklist.comparison !== undefined && (
        <section className="mt-14 border-t border-engraving/15 pt-6 print:hidden" aria-labelledby="banding">
          <h2 id="banding" className="font-display text-section">
            {copy.comparisonHeading}
          </h2>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-engraving-soft">{copy.comparisonNote}</p>

          {checklist.comparison.onlyHere.length > 0 && (
            <p className="mt-4 text-sm leading-relaxed">
              <span className="text-engraving-faint">{copy.onlyHereLabel}:</span>{' '}
              {checklist.comparison.onlyHere.join(', ')}
            </p>
          )}
          {checklist.comparison.onlyThere.length > 0 && (
            <p className="mt-2 text-sm leading-relaxed">
              <span className="text-engraving-faint">
                {copy.onlyThereLabel} {checklist.comparison.label}:
              </span>{' '}
              {checklist.comparison.onlyThere.join(', ')}
            </p>
          )}
          <p className="mt-4">
            <Link href={checklist.comparison.url} className="text-sm underline underline-offset-4">
              {checklist.comparison.label} →
            </Link>
          </p>
        </section>
      )}
    </article>
  )
}
