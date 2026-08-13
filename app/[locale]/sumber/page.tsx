import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allSources } from '@/lib/content/views'
import { LOCALES, isLocale } from '@/lib/i18n'
import { SUMBER } from '@/lib/i18n/sumber'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Sumber',
}

export default function SumberPage({ params }: { readonly params: { readonly locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const copy = SUMBER[locale]
  const sources = allSources()

  return (
    <div className="py-14">
      <h1 className="font-display text-title">{copy.title}</h1>
      <p className="mt-5 max-w-prose text-lede text-engraving-soft">{copy.lede}</p>

      <ul className="mt-10 space-y-6">
        {sources.map((source) => (
          <li key={`${source.publisher}-${source.title}-${source.url ?? ''}`} className="card p-5">
            <p className="font-mono text-label uppercase tracking-[0.24em] text-engraving-faint">
              {source.publisher}
            </p>
            <p className="mt-1.5 leading-relaxed">
              {source.title}
              {source.url !== undefined && (
                <>
                  {' '}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline underline-offset-4"
                  >
                    ↗<span className="sr-only">{copy.openLabel}</span>
                  </a>
                </>
              )}
            </p>
            {source.locators.length > 0 && (
              <p className="mt-2 text-sm leading-relaxed text-engraving-soft">
                {copy.citedForLabel}: {source.locators.join(' · ')}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
