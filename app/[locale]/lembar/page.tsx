import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Sheet } from '@/components/sheet/Sheet'
import { MECHANISM_IDS, mechanismSvg } from '@/lib/art/mechanisms'
import { sheetNotes } from '@/lib/schematic/sheet'
import { LOCALES, isLocale, routeLabel } from '@/lib/i18n'
import { LEMBAR } from '@/lib/i18n/lembar'
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
    segment: 'lembar',
    title: routeLabel('lembar', locale),
    description: LEMBAR[locale].lede,
  })
}

/** Artwork is read on the server at build time and handed over as markup. */
function mechanismMarkup(): Record<string, string> {
  return Object.fromEntries(MECHANISM_IDS.map((id) => [id, mechanismSvg(id)]))
}

export default function LembarPage({ params }: { readonly params: { readonly locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const copy = LEMBAR[locale]

  return (
    <div className="py-14">
      <h1 className="font-display text-4xl leading-tight">{copy.title}</h1>
      <p className="mt-6 max-w-prose text-lg leading-relaxed text-engraving-soft">{copy.lede}</p>
      <Sheet notes={sheetNotes(locale)} mechanisms={mechanismMarkup()} copy={copy} locale={locale} />
    </div>
  )
}
