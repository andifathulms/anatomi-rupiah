import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TiltDemo } from '@/components/channel/TiltDemo'
import { UvToggle } from '@/components/channel/UvToggle'
import { CitationList } from '@/components/mechanism/CitationList'
import { DEMO } from '@/lib/i18n/demo'
import { MechanismFigure } from '@/components/mechanism/MechanismFigure'
import { featureDetail, featureIds } from '@/lib/content/views'
import { LOCALES, isLocale } from '@/lib/i18n'

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => featureIds().map((feature) => ({ locale, feature })))
}

export function generateMetadata({
  params,
}: {
  readonly params: { readonly locale: string; readonly feature: string }
}): Metadata {
  if (!isLocale(params.locale)) return {}
  const detail = featureDetail(params.locale, params.feature)
  return { title: detail?.name ?? 'Ciri' }
}

export default function FeaturePage({
  params,
}: {
  readonly params: { readonly locale: string; readonly feature: string }
}) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const detail = featureDetail(locale, params.feature)
  if (detail === undefined) notFound()

  return (
    <article className="py-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-engraving-faint">
        {detail.channelLabel}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight">{detail.name}</h1>
      <p className="mt-5 max-w-prose text-lg leading-relaxed text-engraving-soft">{detail.summary}</p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <MechanismFigure
          id={detail.illustration}
          channel={detail.channel}
          alt={detail.illustrationAlt}
          caption={detail.caption}
          steps={detail.steps}
          downloadLabel={locale === 'id' ? 'Unduh diagram (SVG)' : 'Download diagram (SVG)'}
        />

        <section aria-labelledby="periksa">
          <h2 id="periksa" className="font-display text-2xl">
            {locale === 'id' ? 'Apa yang diamati' : 'What to observe'}
          </h2>
          <ul className="mt-5 space-y-4">
            {detail.observe.map((line) => (
              <li key={line} className="border-l-2 border-engraving/20 pl-4 leading-relaxed">
                {line}
              </li>
            ))}
          </ul>

          {detail.limitation !== undefined && (
            <aside className="mt-8 border-l-4 border-diraba bg-proof-deep/60 p-5">
              <h3 className="font-display text-lg">
                {locale === 'id' ? 'Batas yang jujur' : 'An honest limit'}
              </h3>
              <p className="mt-2 leading-relaxed text-engraving-soft">{detail.limitation}</p>
            </aside>
          )}

          <p className="mt-8 border-t border-engraving/15 pt-5 text-sm text-engraving-faint">
            {locale === 'id'
              ? 'Halaman ini menjelaskan cara memeriksa ciri, bukan cara membuatnya. Situs ini juga tidak menyatakan apakah selembar uang asli — kewenangan itu ada pada Bank Indonesia.'
              : 'This page explains how to check a feature, not how one is produced. Nor does this site say whether any note is genuine — that authority rests with Bank Indonesia.'}
          </p>
        </section>
      </div>

      {detail.id === 'tinta-berubah-warna' && <TiltDemo copy={DEMO[locale]} />}
      {detail.id === 'tinta-tampak-uv' && <UvToggle copy={DEMO[locale]} />}

      <CitationList citations={detail.citations} locale={locale} />
    </article>
  )
}
