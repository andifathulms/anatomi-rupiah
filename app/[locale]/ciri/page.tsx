import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Reveal } from '@/components/chrome/Reveal'
import { CHANNEL_LABEL, LOCALES, isLocale, routeLabel, type Locale } from '@/lib/i18n'
import { featureCards } from '@/lib/content/views'
import { mechanismSvg } from '@/lib/art/mechanisms'
import { CHANNEL_ORDER } from '@/lib/content'
import { CHANNEL_BORDER_TOP, CHANNEL_TEXT_DEEP } from '@/lib/channelClasses'
import { pageMetadata } from '@/lib/seo'
import type { CheckChannel } from '@/lib/content/schema'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

function ledeFor(locale: Locale): string {
  return locale === 'id'
    ? 'Tiap ciri digambar sebagai potongan melintang: apa yang terjadi pada bahannya, dan apa yang harus Anda amati. Tidak ada satu pun foto uang di sini.'
    : 'Each feature is drawn in cross-section: what happens in the material, and what you should observe. There is not one photograph of a note here.'
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
    segment: 'ciri',
    title: routeLabel('ciri', locale),
    description: ledeFor(locale),
  })
}

const CHANNEL_SWATCH: Record<CheckChannel, string> = {
  dilihat: 'bg-dilihat',
  diraba: 'bg-diraba',
  diterawang: 'bg-diterawang',
  mesin: 'bg-mesin',
}

const CHANNEL_WASH: Record<CheckChannel, string> = {
  dilihat: 'bg-dilihat-tint/50',
  diraba: 'bg-diraba-tint/50',
  diterawang: 'bg-diterawang-tint/50',
  mesin: 'bg-mesin-tint/50',
}

export default function CiriIndexPage({ params }: { readonly params: { readonly locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const cards = featureCards(locale)

  return (
    <div className="py-14">
      <div className="animate-lift-in">
        <p className="eyebrow">{locale === 'id' ? 'Delapan mekanisme' : 'Eight mechanisms'}</p>
        <h1 className="mt-4 font-display text-title">
          {locale === 'id' ? 'Ciri dan cara kerjanya' : 'The features and how they work'}
        </h1>
        <p className="mt-5 max-w-prose text-lede text-engraving-soft">{ledeFor(locale)}</p>

        {/* The legend, so the colour coding is learnable rather than guessable. */}
        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
          {CHANNEL_ORDER.map((channel) => (
            <li key={channel} className="flex items-center gap-2 text-sm text-engraving-soft">
              <span
                aria-hidden="true"
                className={`h-3 w-3 rounded-full ${CHANNEL_SWATCH[channel]}`}
              />
              <span className={CHANNEL_TEXT_DEEP[channel]}>{CHANNEL_LABEL[channel][locale]}</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li key={card.id} className="h-full">
            <Reveal className="h-full">
            <Link
              href={card.url}
              className={`card-interactive group flex h-full flex-col border-t-4 ${CHANNEL_BORDER_TOP[card.channel]}`}
            >
              <div
                className={`mech overflow-hidden border-b border-engraving/10 ${CHANNEL_WASH[card.channel]} [&>svg]:h-auto [&>svg]:w-full [&>svg]:transition-transform [&>svg]:duration-300 group-hover:[&>svg]:scale-[1.04]`}
                aria-hidden="true"
                // Authored artwork, read at build time and checked to be inert.
                dangerouslySetInnerHTML={{ __html: mechanismSvg(card.illustration) }}
              />
              <div className="flex flex-1 flex-col p-5">
                <p className={`font-mono text-label uppercase tracking-[0.24em] ${CHANNEL_TEXT_DEEP[card.channel]}`}>
                  {card.channelLabel}
                </p>
                <h2 className="mt-2 font-display text-xl group-hover:underline group-hover:underline-offset-4">
                  {card.name}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-engraving-soft">
                  {card.summary}
                </p>
                {card.hasLimitation && (
                  <p className="mt-4 inline-flex w-fit rounded-full bg-diraba-tint px-2.5 py-1 font-mono text-label uppercase tracking-wider text-diraba-deep">
                    {locale === 'id' ? 'Ada batas layar' : 'Has a screen limit'}
                  </p>
                )}
              </div>
            </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}
