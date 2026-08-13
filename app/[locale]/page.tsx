import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AnatomyStack } from '@/components/hero/AnatomyStack'
import { CHANNEL_BLURB, CHANNEL_LABEL, LOCALES, href, isLocale } from '@/lib/i18n'
import { HOME } from '@/lib/i18n/copy'
import { CHANNEL_ORDER, featuresById } from '@/lib/content'
import { anatomyViewModel } from '@/lib/hero/anatomy'
import type { CheckChannel } from '@/lib/content/schema'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

const CHANNEL_CARD: Record<CheckChannel, string> = {
  dilihat: 'border-t-dilihat bg-dilihat-tint/40',
  diraba: 'border-t-diraba bg-diraba-tint/40',
  diterawang: 'border-t-diterawang bg-diterawang-tint/40',
  mesin: 'border-t-mesin bg-mesin-tint/40',
}

const CHANNEL_TEXT: Record<CheckChannel, string> = {
  dilihat: 'text-dilihat-deep',
  diraba: 'text-diraba-deep',
  diterawang: 'text-diterawang-deep',
  mesin: 'text-mesin-deep',
}

export default function HomePage({ params }: { readonly params: { readonly locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const copy = HOME[locale]
  const anatomy = anatomyViewModel()

  const layerLinks = anatomy.layers.map((layer) => ({
    featureId: layer.featureId,
    label: featuresById.get(layer.featureId)?.name[locale] ?? layer.featureId,
    url: href(locale, `ciri/${layer.featureId}`),
  }))

  return (
    <div>
      <section className="grid items-center gap-6 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
        <div>
        <p className="eyebrow">
          {copy.kicker}
          <span className="ml-2 font-sans normal-case tracking-normal text-engraving-soft">
            — {copy.kickerGloss}
          </span>
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-hero">{copy.title}</h1>
        <p className="mt-4 max-w-2xl font-display text-title text-engraving">{copy.answer}</p>
        <p className="mt-4 max-w-prose leading-relaxed text-engraving-soft">{copy.lede}</p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={href(locale, 'tigad')}
            className="border border-engraving bg-engraving px-5 py-2.5 text-sm text-proof shadow-sheet hover:bg-engraving-soft"
          >
            {copy.startPaths[0]?.title}
          </Link>
          <Link
            href={href(locale, 'ciri')}
            className="border border-engraving/30 px-5 py-2.5 text-sm hover:border-engraving"
          >
            {copy.startCta}
          </Link>
        </div>
        </div>

        <AnatomyStack
          model={anatomy}
          links={layerLinks}
          caption={copy.anatomyCaption}
          hint={copy.anatomyHint}
        />
      </section>

      <section className="mt-8 sm:mt-12" aria-labelledby="singkat">
        <h2 id="singkat" className="eyebrow">
          {copy.plainHeading}
        </h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {copy.plainPoints.map((point) => (
            <li key={point.title} className="card p-6">
              <h3 className="font-display text-lg">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-engraving-soft">{point.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20" aria-labelledby="kanal">
        <h2 id="kanal" className="font-display text-section">
          {copy.channelsHeading}
        </h2>
        <p className="mt-3 max-w-prose leading-relaxed text-engraving-soft">{copy.channelsLede}</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNEL_ORDER.map((channel) => (
            <li key={channel} className={`card border-t-4 p-6 ${CHANNEL_CARD[channel]}`}>
              <h3 className={`font-display text-lg ${CHANNEL_TEXT[channel]}`}>
                {CHANNEL_LABEL[channel][locale]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-engraving-soft">
                {CHANNEL_BLURB[channel][locale]}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20" aria-labelledby="jujur">
        <div className="card border-l-4 border-l-diraba bg-diraba-tint/50 p-7 sm:p-10">
          <h2 id="jujur" className="font-display text-section">
            {copy.honestHeading}
          </h2>
          <p className="mt-4 max-w-prose leading-relaxed text-engraving-soft">{copy.honestBody}</p>
          <blockquote
            lang="id"
            className="mt-6 max-w-prose font-display text-title text-diraba-deep"
          >
            {copy.honestQuote}
          </blockquote>
        </div>
      </section>

      <section className="mt-20 mb-4" aria-labelledby="mulai">
        <h2 id="mulai" className="font-display text-section">
          {copy.startHeading}
        </h2>
        <p className="mt-3 max-w-prose leading-relaxed text-engraving-soft">{copy.startBody}</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {copy.startPaths.map((path, index) => (
            <li key={path.segment}>
              <Link href={href(locale, path.segment)} className="card-interactive block h-full p-6">
                <div className="flex items-baseline justify-between">
                  <span className="callout-number text-engraving-faint">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="numeric text-xs text-engraving-faint">{path.minutes}</span>
                </div>
                <h3 className="mt-3 font-display text-xl">{path.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-engraving-soft">{path.body}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href={href(locale, 'hukum')} className="text-sm underline underline-offset-4">
            {copy.legalCta}
          </Link>
        </p>
      </section>
    </div>
  )
}
