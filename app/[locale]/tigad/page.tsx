import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Reveal } from '@/components/chrome/Reveal'
import { CitationLines } from '@/components/mechanism/CitationList'
import { denominationChecklist, featureCards } from '@/lib/content/views'
import { LOCALES, isLocale, routeLabel } from '@/lib/i18n'
import { TIGAD } from '@/lib/i18n/tigad'
import { pageMetadata } from '@/lib/seo'
import type { CheckChannel } from '@/lib/content/schema'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export function generateMetadata({
  params,
}: {
  readonly params: { readonly locale: string }
}): Metadata {
  if (!isLocale(params.locale)) return {}
  const locale = params.locale
  return pageMetadata({
    locale,
    segment: 'tigad',
    title: routeLabel('tigad', locale),
    description: TIGAD[locale].lede,
  })
}

const ORDER: readonly CheckChannel[] = ['dilihat', 'diraba', 'diterawang']

/** The one note this page walks through concretely, start to finish — the
 * richest TE2022 denomination, so all four channels have something to show. */
const EXAMPLE_DENOMINATION_ID = 'seratus-ribu-2022'

const CHANNEL_RULE: Record<CheckChannel, string> = {
  dilihat: 'border-dilihat',
  diraba: 'border-diraba',
  diterawang: 'border-diterawang',
  mesin: 'border-mesin',
}

export default function TigadPage({ params }: { readonly params: { readonly locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const copy = TIGAD[locale]
  const cards = featureCards(locale)
  const example =
    denominationChecklist(locale, EXAMPLE_DENOMINATION_ID) ??
    (() => {
      throw new Error(`tigad page names a denomination that does not exist: ${EXAMPLE_DENOMINATION_ID}`)
    })()

  return (
    <div className="py-14">
      <div className="animate-lift-in">
        <h1 className="font-display text-4xl leading-tight">{copy.title}</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-engraving-soft">{copy.lede}</p>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-engraving-soft">
          {copy.exampleIntro}
        </p>
      </div>

      <ol className="mt-14 space-y-12">
        {ORDER.map((channel) => {
          const step = copy.steps[channel]
          const stepFeatures = cards.filter((card) => card.channel === channel)
          const exampleGroup = example.byChannel.find((group) => group.channel === channel)
          return (
            <li key={channel}>
            <Reveal className={`border-l-4 pl-6 ${CHANNEL_RULE[channel]}`}>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-engraving-faint">
                {step.ordinal}
              </p>
              <h2 className="mt-2 font-display text-3xl">{step.title}</h2>
              <p className="mt-3 max-w-prose leading-relaxed text-engraving-soft">
                {step.instruction}
              </p>

              <h3 className="mt-6 font-mono text-xs uppercase tracking-wider text-engraving-faint">
                {copy.featuresLabel}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {stepFeatures.map((card) => (
                  <li key={card.id}>
                    <Link
                      href={card.url}
                      className="inline-block border border-engraving/25 px-3 py-1.5 text-sm hover:border-engraving"
                    >
                      {card.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {exampleGroup !== undefined && exampleGroup.items.length > 0 && (
                <div className="mt-6 border-l-2 border-engraving/15 pl-4">
                  <h3 className="font-mono text-label uppercase tracking-wider text-engraving-faint">
                    {copy.exampleHeading}
                  </h3>
                  <ul className="mt-2 space-y-4">
                    {exampleGroup.items.map((item) => (
                      <li key={item.featureId}>
                        <p className="text-sm leading-relaxed">{item.note}</p>
                        <p className="mt-1 font-mono text-label uppercase tracking-wider text-engraving-faint">
                          {copy.exampleSourcesLabel}
                        </p>
                        <CitationLines
                          citations={item.citations}
                          locale={locale}
                          className="mt-1 space-y-1 text-xs text-engraving-faint"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </Reveal>
            </li>
          )
        })}
      </ol>

      <Reveal>
      <section className="mt-16 max-w-prose border-l-4 border-mesin pl-6" aria-labelledby="keempat">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-engraving-faint">
          {copy.steps.mesin.ordinal}
        </p>
        <h2 id="keempat" className="mt-2 font-display text-3xl">
          {copy.fourthHeading}
        </h2>
        <p className="mt-3 leading-relaxed text-engraving-soft">{copy.fourthBody}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {cards
            .filter((card) => card.channel === 'mesin')
            .map((card) => (
              <li key={card.id}>
                <Link
                  href={card.url}
                  className="inline-block border border-engraving/25 px-3 py-1.5 text-sm hover:border-engraving"
                >
                  {card.name}
                </Link>
              </li>
            ))}
        </ul>

        {(() => {
          const exampleGroup = example.byChannel.find((group) => group.channel === 'mesin')
          if (exampleGroup === undefined || exampleGroup.items.length === 0) return null
          return (
            <div className="mt-6 border-l-2 border-engraving/15 pl-4">
              <h3 className="font-mono text-label uppercase tracking-wider text-engraving-faint">
                {copy.exampleHeading}
              </h3>
              <ul className="mt-2 space-y-4">
                {exampleGroup.items.map((item) => (
                  <li key={item.featureId}>
                    <p className="text-sm leading-relaxed">{item.note}</p>
                    <p className="mt-1 font-mono text-label uppercase tracking-wider text-engraving-faint">
                      {copy.exampleSourcesLabel}
                    </p>
                    <CitationLines
                      citations={item.citations}
                      locale={locale}
                      className="mt-1 space-y-1 text-xs text-engraving-faint"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )
        })()}
      </section>
      </Reveal>

      <Reveal>
      <section className="mt-16 card max-w-prose p-7 sm:p-10" aria-labelledby="sesudah">
        <h2 id="sesudah" className="font-display text-section">
          {copy.verdictHeading}
        </h2>
        <p className="mt-4 max-w-prose text-lede leading-relaxed text-engraving-soft">
          {copy.verdictBody}
        </p>
      </section>
      </Reveal>

      {/* Closes the walkthrough, not buried mid-step: PRD §9 calls this the
          site's proudest claim ("a web app admitting the limits of its
          medium is rare"), and the peak-end rule means the last thing read
          should be it, not the verdict-authority disclaimer above, which is
          already repeated in the footer on every page (critique 2026-08-14,
          P2). Same border-diraba/card language as the walkthrough steps,
          scaled up to the verdict section's own weight rather than a
          subordinate aside. */}
      <Reveal>
      <section
        className="mt-10 card max-w-prose border-l-4 border-diraba p-7 sm:p-10"
        aria-labelledby="jujur"
      >
        <h2 id="jujur" className="font-display text-section">
          {copy.honestHeading}
        </h2>
        <p className="mt-4 max-w-prose text-lede leading-relaxed text-engraving-soft">
          {copy.honestBody}
        </p>
        <p lang="id" className="mt-5 font-display text-2xl leading-snug">
          {copy.honestQuote}
        </p>
      </section>
      </Reveal>
    </div>
  )
}
