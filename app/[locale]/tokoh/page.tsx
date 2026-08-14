import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Reveal } from '@/components/chrome/Reveal'
import { CitationLines } from '@/components/mechanism/CitationList'
import { figuresWithoutBiography, notePeople } from '@/lib/content/tokoh'
import { LOCALES, isLocale, routeLabel, type Locale } from '@/lib/i18n'
import { assetPath } from '@/lib/paths'
import { pageMetadata } from '@/lib/seo'
import type { Motif, Photo } from '@/lib/content/schema'

/** Credit line for a photograph — CLAUDE.md invariant 13: licence and
 * source stay visible at the point of use, not just recorded in data/. */
function PhotoCredit({ photo, locale }: { readonly photo: Photo; readonly locale: Locale }) {
  return (
    <p className="mt-2 font-mono text-label leading-snug text-engraving-faint">
      {photo.credit} · {photo.license}{' '}
      <a
        href={photo.sourceUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="relative inline-block underline underline-offset-2 before:absolute before:-inset-2.5 before:content-['']"
      >
        ↗<span className="sr-only">{locale === 'id' ? `sumber foto ${photo.credit}` : `photo source: ${photo.credit}`}</span>
      </a>
    </p>
  )
}

/** Shown where no licensed photograph was found — honest about the gap
 * instead of silently leaving a blank space in the grid. */
function PhotoPlaceholder({ locale, className }: { readonly locale: Locale; readonly className: string }) {
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-engraving/25 bg-proof-deep/40 p-3 text-center font-mono text-label leading-snug text-engraving-faint ${className}`}
    >
      {locale === 'id' ? 'Belum ada foto berlisensi' : 'No licensed photograph yet'}
    </div>
  )
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

function ledeFor(locale: Locale): string {
  return locale === 'id'
    ? 'Di sisi depan seorang pahlawan nasional; di sisi belakang sebuah tarian daerah, satu pemandangan alam, dan satu bunga. Kebanyakan orang membawanya setiap hari tanpa tahu apa yang digambarkan.'
    : 'A national hero on the front; a regional dance, a landscape, and a flower on the back. Most people carry these daily without knowing what they depict.'
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
    segment: 'tokoh',
    title: routeLabel('tokoh', locale),
    description: ledeFor(locale),
  })
}

const KIND_LABEL: Record<Motif['kind'], { readonly id: string; readonly en: string }> = {
  tari: { id: 'Tari', en: 'Dance' },
  pemandangan: { id: 'Pemandangan alam', en: 'Landscape' },
  bunga: { id: 'Bunga', en: 'Flower' },
  tenun: { id: 'Tenun', en: 'Textile' },
}

export default function TokohPage({ params }: { readonly params: { readonly locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const notes = notePeople(locale)
  const missing = figuresWithoutBiography()

  return (
    <div className="py-14">
      <div className="animate-lift-in">
        <h1 className="font-display text-4xl leading-tight">
          {locale === 'id' ? 'Tokoh & motif' : 'Figures & motifs'}
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-engraving-soft">
          {ledeFor(locale)}
        </p>

        <p className="mt-6 max-w-prose border-l-2 border-engraving/20 pl-3 text-sm leading-relaxed text-engraving-faint">
          {locale === 'id'
            ? `Riwayat hidup bersumber dari Ensiklopedi Pahlawan Nasional (1995) terbitan Direktorat Jenderal Kebudayaan. Ensiklopedia itu memuat sembilan puluh tokoh dan tidak mencakup ${missing.join(' dan ')}; riwayat keduanya karena itu belum ditulis di sini, bukan diringkas dari sumber yang tidak dapat ditelusuri.`
            : `Biographies come from the Ensiklopedi Pahlawan Nasional (1995), published by the Directorate General of Culture. It covers ninety figures and does not include ${missing.join(' or ')}, so their biographies are left unwritten here rather than summarised from a source a reader could not follow.`}
        </p>
      </div>

      <div className="mt-14 space-y-14">
        {notes.map((note) => (
          <Reveal key={note.id}>
          <section aria-labelledby={note.id} className="rule pt-8">
            <h2 id={note.id} className="numeric font-mono text-sm tracking-wider text-engraving-faint">
              {note.caption}
            </h2>

            {note.figureName !== undefined && (
              <div className="mt-4 sm:grid sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-start sm:gap-6">
                <div className="w-40 shrink-0">
                  {note.figurePhoto === undefined ? (
                    <PhotoPlaceholder locale={locale} className="aspect-square w-40" />
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={assetPath(`/${note.figurePhoto.path}`)}
                        alt={note.figureName}
                        className="h-40 w-40 border border-engraving/15 object-cover"
                      />
                      <PhotoCredit photo={note.figurePhoto} locale={locale} />
                    </>
                  )}
                </div>
                <div className="mt-4 min-w-0 sm:mt-0">
                  <h3 className="font-display text-2xl">{note.figureName}</h3>
                  {note.figureLifespan !== undefined && (
                    <p className="numeric mt-1 text-sm text-engraving-faint">{note.figureLifespan}</p>
                  )}
                  <ul className="mt-3 max-w-prose space-y-2 leading-relaxed text-engraving-soft">
                    {note.figureClaims.map((claim) => (
                      <li key={claim}>{claim}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {note.motifs.length > 0 && (
              <ul className="mt-8 grid gap-px bg-engraving/10 sm:grid-cols-3">
                {note.motifs.map((motif) => (
                  <li key={motif.id} className="bg-proof p-5">
                    {motif.photo === undefined ? (
                      <PhotoPlaceholder locale={locale} className="mb-3 aspect-[4/3] w-full" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={assetPath(`/${motif.photo.path}`)}
                        alt={motif.name}
                        className="mb-3 aspect-[4/3] w-full border border-engraving/15 object-cover"
                      />
                    )}
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-engraving-faint">
                      {KIND_LABEL[motif.kind][locale]}
                    </p>
                    {/* min-h reserves two lines' worth of title regardless of
                        whether this particular name wraps, so the claim and
                        credit below it start at the same row across every
                        card in the grid rather than trailing whichever
                        sibling had the longer name. */}
                    <h4 className="mt-2 min-h-[3.5rem] font-display text-lg leading-snug">
                      {motif.name}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-engraving-soft">{motif.claim}</p>
                    {motif.photo !== undefined && <PhotoCredit photo={motif.photo} locale={locale} />}
                  </li>
                ))}
              </ul>
            )}

            <CitationLines
              citations={note.citations}
              locale={locale}
              className="mt-5 space-y-1 text-xs text-engraving-faint"
            />
          </section>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
