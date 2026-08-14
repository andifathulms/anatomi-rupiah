import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Reveal } from '@/components/chrome/Reveal'
import { LOCALES, isLocale, routeLabel } from '@/lib/i18n'
import { HUKUM } from '@/lib/i18n/hukum'
import { pageMetadata } from '@/lib/seo'

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
    segment: 'hukum',
    title: routeLabel('hukum', locale),
    description: HUKUM[locale].lede,
  })
}

export default function HukumPage({ params }: { readonly params: { readonly locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const copy = HUKUM[params.locale]

  return (
    <article className="max-w-prose py-14">
      <div className="animate-lift-in">
        <h1 className="font-display text-4xl leading-tight">{copy.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-engraving-soft">{copy.lede}</p>
      </div>

      {copy.sections.map((section) => (
        <Reveal key={section.id}>
        <section className="mt-12" aria-labelledby={section.id}>
          <h2 id={section.id} className="font-display text-2xl">
            {section.heading}
          </h2>
          {section.id === 'dasar' ? (
            <>
              {section.paragraphs[0] !== undefined && (
                <blockquote className="mt-5 border-l-4 border-engraving bg-proof-deep/40 p-6 font-display text-lede leading-snug text-engraving">
                  {section.paragraphs[0]}
                </blockquote>
              )}
              {section.paragraphs.slice(1).map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-engraving-soft">
                  {paragraph}
                </p>
              ))}
            </>
          ) : (
            section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-relaxed text-engraving-soft">
                {paragraph}
              </p>
            ))
          )}
          {section.bullets !== undefined && (
            <ul className="mt-4 space-y-2">
              {section.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="border-l-2 border-engraving/20 pl-3 leading-relaxed text-engraving-soft"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </section>
        </Reveal>
      ))}

      <Reveal>
      <section className="mt-12" aria-labelledby="sumber">
        <h2 id="sumber" className="font-display text-2xl">
          {copy.linksHeading}
        </h2>
        <ul className="mt-4 space-y-2">
          {copy.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                rel="noreferrer noopener"
                target="_blank"
                className="underline underline-offset-4 hover:text-engraving"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
      </Reveal>

      <p className="rule mt-12 pt-6 text-sm text-engraving-faint">{copy.notAffiliated}</p>
    </article>
  )
}
