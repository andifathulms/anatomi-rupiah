import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LOCALES, isLocale } from '@/lib/i18n'
import { featureCards } from '@/lib/content/views'
import type { CheckChannel } from '@/lib/content/schema'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Ciri',
}

const CHANNEL_RULE: Record<CheckChannel, string> = {
  dilihat: 'border-dilihat',
  diraba: 'border-diraba',
  diterawang: 'border-diterawang',
  mesin: 'border-mesin',
}

export default function CiriIndexPage({ params }: { readonly params: { readonly locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const cards = featureCards(locale)

  return (
    <div className="py-14">
      <h1 className="font-display text-4xl leading-tight">
        {locale === 'id' ? 'Ciri dan mekanismenya' : 'The features and how they work'}
      </h1>
      <p className="mt-6 max-w-prose text-lg leading-relaxed text-engraving-soft">
        {locale === 'id'
          ? 'Tiap ciri digambar sebagai potongan melintang atau gambar terurai: apa yang terjadi pada bahannya, dan apa yang harus Anda amati. Tidak ada satu pun foto uang di sini.'
          : 'Each feature is drawn in cross-section or exploded view: what happens in the material, and what you should observe. There is not one photograph of a note here.'}
      </p>

      <ul className="mt-12 grid gap-px bg-engraving/10 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li key={card.id} className={`border-t-4 bg-proof ${CHANNEL_RULE[card.channel]}`}>
            <Link href={card.url} className="block h-full p-5 hover:bg-proof-deep">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-engraving-faint">
                {card.channelLabel}
              </p>
              <h2 className="mt-2 font-display text-xl">{card.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-engraving-soft">{card.summary}</p>
              {card.hasLimitation && (
                <p className="mt-3 font-mono text-xs uppercase tracking-wider text-diraba">
                  {locale === 'id' ? 'Ada batas layar' : 'Has a screen limit'}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
