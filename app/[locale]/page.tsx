import Link from 'next/link'
import { CHANNEL_BLURB, CHANNEL_LABEL, LOCALES, href, isLocale } from '@/lib/i18n'
import { HOME } from '@/lib/i18n/copy'
import { CHANNEL_ORDER } from '@/lib/content'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

const CHANNEL_RULE: Record<(typeof CHANNEL_ORDER)[number], string> = {
  dilihat: 'border-dilihat',
  diraba: 'border-diraba',
  diterawang: 'border-diterawang',
  mesin: 'border-mesin',
}

export default function HomePage({ params }: { readonly params: { readonly locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const copy = HOME[locale]

  return (
    <div className="py-14">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-engraving-faint">
        {copy.kicker}
      </p>
      <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">{copy.title}</h1>
      <p className="mt-6 max-w-prose text-lg leading-relaxed text-engraving-soft">{copy.lede}</p>

      <section className="mt-16" aria-labelledby="kanal">
        <h2 id="kanal" className="font-display text-2xl">
          {copy.channelsHeading}
        </h2>
        <ul className="mt-6 grid gap-px bg-engraving/10 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNEL_ORDER.map((channel) => (
            <li key={channel} className={`border-t-4 bg-proof p-5 ${CHANNEL_RULE[channel]}`}>
              <h3 className="font-display text-lg">{CHANNEL_LABEL[channel][locale]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-engraving-soft">
                {CHANNEL_BLURB[channel][locale]}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 max-w-prose" aria-labelledby="jujur">
        <h2 id="jujur" className="font-display text-2xl">
          {copy.honestHeading}
        </h2>
        <p className="mt-4 leading-relaxed text-engraving-soft">{copy.honestBody}</p>
        <blockquote
          lang="id"
          className="mt-6 border-l-4 border-diraba pl-4 font-display text-xl leading-snug"
        >
          {copy.honestQuote}
        </blockquote>
      </section>

      <section className="mt-16 max-w-prose" aria-labelledby="mulai">
        <h2 id="mulai" className="font-display text-2xl">
          {copy.startHeading}
        </h2>
        <p className="mt-4 leading-relaxed text-engraving-soft">{copy.startBody}</p>
        <p className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link
            href={href(locale, 'ciri')}
            className="border border-engraving px-4 py-2 hover:bg-engraving hover:text-proof"
          >
            {copy.startCta}
          </Link>
          <Link href={href(locale, 'hukum')} className="px-4 py-2 underline underline-offset-4">
            {copy.legalCta}
          </Link>
        </p>
      </section>
    </div>
  )
}
