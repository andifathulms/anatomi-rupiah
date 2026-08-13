import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { featureCards } from '@/lib/content/views'
import { LOCALES, isLocale } from '@/lib/i18n'
import { TIGAD } from '@/lib/i18n/tigad'
import type { CheckChannel } from '@/lib/content/schema'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: '3D',
}

const ORDER: readonly CheckChannel[] = ['dilihat', 'diraba', 'diterawang']

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

  return (
    <div className="py-14">
      <h1 className="font-display text-4xl leading-tight">{copy.title}</h1>
      <p className="mt-6 max-w-prose text-lg leading-relaxed text-engraving-soft">{copy.lede}</p>

      <ol className="mt-14 space-y-12">
        {ORDER.map((channel) => {
          const step = copy.steps[channel]
          const stepFeatures = cards.filter((card) => card.channel === channel)
          return (
            <li key={channel} className={`border-l-4 pl-6 ${CHANNEL_RULE[channel]}`}>
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

              {channel === 'diraba' && (
                <aside className="mt-8 max-w-prose border-l-4 border-diraba bg-proof-deep/60 p-5">
                  <h3 className="font-display text-xl">{copy.honestHeading}</h3>
                  <p className="mt-3 leading-relaxed text-engraving-soft">{copy.honestBody}</p>
                  <p lang="id" className="mt-4 font-display text-xl leading-snug">
                    {copy.honestQuote}
                  </p>
                </aside>
              )}
            </li>
          )
        })}
      </ol>

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
      </section>

      <section className="mt-16 max-w-prose" aria-labelledby="sesudah">
        <h2 id="sesudah" className="font-display text-2xl">
          {copy.verdictHeading}
        </h2>
        <p className="mt-3 leading-relaxed text-engraving-soft">{copy.verdictBody}</p>
      </section>
    </div>
  )
}
