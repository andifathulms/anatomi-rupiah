import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LightTable } from '@/components/channel/LightTable'
import { ReliefLight } from '@/components/channel/ReliefLight'
import { TiltDemo } from '@/components/channel/TiltDemo'
import { UvToggle } from '@/components/channel/UvToggle'
import { Reveal } from '@/components/chrome/Reveal'
import { CitationList } from '@/components/mechanism/CitationList'
import { DEMO } from '@/lib/i18n/demo'
import { MechanismFigure } from '@/components/mechanism/MechanismFigure'
import Link from 'next/link'
import { featureDetail, featureIds } from '@/lib/content/views'
import { LOCALES, href, isLocale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'
import type { CheckChannel } from '@/lib/content/schema'

const CHANNEL_ACCENT: Record<CheckChannel, string> = {
  dilihat: 'border-dilihat',
  diraba: 'border-diraba',
  diterawang: 'border-diterawang',
  mesin: 'border-mesin',
}

const CHANNEL_TEXT: Record<CheckChannel, string> = {
  dilihat: 'text-dilihat-deep',
  diraba: 'text-diraba-deep',
  diterawang: 'text-diterawang-deep',
  mesin: 'text-mesin-deep',
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => featureIds().map((feature) => ({ locale, feature })))
}

export function generateMetadata({
  params,
}: {
  readonly params: { readonly locale: string; readonly feature: string }
}): Metadata {
  if (!isLocale(params.locale)) return {}
  const locale = params.locale
  const detail = featureDetail(locale, params.feature)
  if (detail === undefined) return {}
  return pageMetadata({
    locale,
    segment: `ciri/${params.feature}`,
    title: detail.name,
    description: detail.summary,
  })
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
      <Link
        href={href(locale, 'ciri')}
        className="text-sm text-engraving-faint underline underline-offset-4 hover:text-engraving"
      >
        ← {locale === 'id' ? 'Semua ciri' : 'All features'}
      </Link>

      <div className={`animate-lift-in mt-5 border-l-4 pl-5 sm:pl-7 ${CHANNEL_ACCENT[detail.channel]}`}>
        <p className={`font-mono text-label uppercase tracking-[0.24em] ${CHANNEL_TEXT[detail.channel]}`}>
          {detail.channelLabel}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-title">{detail.name}</h1>
        <p className="mt-5 max-w-prose text-lede text-engraving-soft">{detail.summary}</p>
      </div>

      <Reveal className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <MechanismFigure
          id={detail.illustration}
          channel={detail.channel}
          caption={detail.caption}
          steps={detail.steps}
          downloadLabel={locale === 'id' ? 'Unduh diagram (SVG)' : 'Download diagram (SVG)'}
        />

        <section aria-labelledby="periksa">
          <h2 id="periksa" className="font-display text-section">
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

          {detail.carriedBy.length > 0 && (
            <div className="mt-8 border-t border-engraving/15 pt-5">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-engraving-faint">
                {locale === 'id' ? 'Muncul pada' : 'Appears on'}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {detail.carriedBy.map((denomination) => (
                  <li key={denomination.id}>
                    <Link
                      href={denomination.url}
                      className="numeric border border-engraving/25 px-3 py-1.5 text-sm hover:border-engraving"
                    >
                      {denomination.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </Reveal>

      {detail.id === 'tanda-air' && (
        <Reveal>
          <LightTable copy={DEMO[locale]} />
        </Reveal>
      )}
      {detail.id === 'cetak-intaglio' && (
        <Reveal>
          <ReliefLight copy={DEMO[locale]} ridges={11} />
        </Reveal>
      )}
      {detail.id === 'kode-tuna-netra' && (
        <Reveal>
          <ReliefLight copy={DEMO[locale]} ridges={4} />
        </Reveal>
      )}
      {detail.id === 'tinta-berubah-warna' && (
        <Reveal>
          <TiltDemo copy={DEMO[locale]} />
        </Reveal>
      )}
      {detail.id === 'tinta-tampak-uv' && (
        <Reveal>
          <UvToggle copy={DEMO[locale]} />
        </Reveal>
      )}

      <Reveal>
        <CitationList citations={detail.citations} locale={locale} />
      </Reveal>
    </article>
  )
}
