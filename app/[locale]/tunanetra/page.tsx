import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ReliefLight } from '@/components/channel/ReliefLight'
import { CitationList } from '@/components/mechanism/CitationList'
import { MechanismFigure } from '@/components/mechanism/MechanismFigure'
import { blindCodeGaps, blindCodeRows } from '@/lib/content/tunanetra'
import { featureDetail } from '@/lib/content/views'
import { LOCALES, href, isLocale } from '@/lib/i18n'
import { DEMO } from '@/lib/i18n/demo'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Kode tuna netra',
}

export default function TunanetraPage({ params }: { readonly params: { readonly locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const detail = featureDetail(locale, 'kode-tuna-netra')
  if (detail === undefined) notFound()

  const rows = blindCodeRows(locale)
  const gaps = blindCodeGaps()

  const seen = new Map<string, (typeof detail.citations)[number]>()
  for (const citation of [...detail.citations, ...rows.flatMap((row) => row.citations)]) {
    const key = `${citation.publisher}·${citation.title}·${citation.locator ?? ''}`
    if (!seen.has(key)) seen.set(key, citation)
  }
  const pageCitations = [...seen.values()]

  return (
    <div className="py-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-diraba-deep">
        {detail.channelLabel}
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight">{detail.name}</h1>
      <p className="mt-6 max-w-prose text-lg leading-relaxed text-engraving-soft">
        {locale === 'id'
          ? 'Uang Rupiah membawa tanda yang dirancang untuk dibaca tanpa penglihatan. Hampir tidak ada orang awas di Indonesia yang tahu tanda itu ada.'
          : 'Rupiah notes carry marks designed to be read without sight. Almost no sighted person in Indonesia knows they are there.'}
      </p>
      <p className="mt-4 max-w-prose leading-relaxed text-engraving-soft">{detail.summary}</p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <MechanismFigure
          id={detail.illustration}
          channel={detail.channel}
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
        </section>
      </div>

      <ReliefLight copy={DEMO[locale]} ridges={4} />

      <section className="mt-16" aria-labelledby="tabel">
        <h2 id="tabel" className="font-display text-2xl">
          {locale === 'id' ? 'Jumlah pasangan garis' : 'Number of line pairs'}
        </h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              {locale === 'id'
                ? 'Jumlah pasangan garis timbul per pecahan'
                : 'Raised line pairs per denomination'}
            </caption>
            <thead>
              <tr className="border-b border-engraving/25">
                <th scope="col" className="py-2 pr-4 font-mono text-xs uppercase tracking-wider">
                  {locale === 'id' ? 'Pecahan' : 'Denomination'}
                </th>
                <th scope="col" className="py-2 pr-4 font-mono text-xs uppercase tracking-wider">
                  {locale === 'id' ? 'Emisi' : 'Emission'}
                </th>
                <th scope="col" className="py-2 pr-4 font-mono text-xs uppercase tracking-wider">
                  {locale === 'id' ? 'Pasang garis' : 'Line pairs'}
                </th>
                <th scope="col" className="py-2 font-mono text-xs uppercase tracking-wider">
                  {locale === 'id' ? 'Panjang' : 'Length'}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-engraving/10">
                  <th scope="row" className="numeric py-3 pr-4 font-normal">
                    {row.caption}
                  </th>
                  <td className="numeric py-3 pr-4 text-engraving-soft">TE {row.emisi}</td>
                  <td className="numeric py-3 pr-4">
                    <span className="mr-2">{row.marks}</span>
                    <span aria-hidden="true" className="text-diraba">
                      {'▮▮ '.repeat(row.marks).trim()}
                    </span>
                  </td>
                  <td className="numeric py-3 text-engraving-soft">{row.widthMm} mm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {gaps.length > 0 && (
          <p className="mt-5 max-w-prose border-l-2 border-engraving/20 pl-3 text-sm leading-relaxed text-engraving-faint">
            {locale === 'id'
              ? `Belum tercantum di sini: ${gaps.join(', ')}. Halaman Bank Indonesia untuk pecahan tersebut tidak menyebut kode tuna netra, dan proyek ini tidak mencantumkan klaim tanpa sumber.`
              : `Not listed here: ${gaps.join(', ')}. Bank Indonesia's pages for those notes do not name the blind code, and this project does not record a claim without a source.`}
          </p>
        )}
      </section>

      <p className="mt-10 max-w-prose text-sm text-engraving-faint">
        {locale === 'id' ? 'Lihat juga ' : 'See also '}
        <Link href={href(locale, 'tigad')} className="underline underline-offset-4">
          {locale === 'id' ? 'langkah 3D' : 'the 3D steps'}
        </Link>
        .
      </p>

      {/* Feature sources plus the per-note sources behind the table above. */}
      <CitationList citations={pageCitations} locale={locale} />
    </div>
  )
}
