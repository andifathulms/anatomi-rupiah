import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { notePeople } from '@/lib/content/tokoh'
import { LOCALES, isLocale } from '@/lib/i18n'
import type { Motif } from '@/lib/content/schema'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Tokoh & motif',
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

  return (
    <div className="py-14">
      <h1 className="font-display text-4xl leading-tight">
        {locale === 'id' ? 'Tokoh & motif' : 'Figures & motifs'}
      </h1>
      <p className="mt-6 max-w-prose text-lg leading-relaxed text-engraving-soft">
        {locale === 'id'
          ? 'Di sisi depan seorang pahlawan nasional; di sisi belakang sebuah tarian daerah, satu pemandangan alam, dan satu bunga. Kebanyakan orang membawanya setiap hari tanpa tahu apa yang digambarkan.'
          : 'A national hero on the front; a regional dance, a landscape, and a flower on the back. Most people carry these daily without knowing what they depict.'}
      </p>

      <p className="mt-6 max-w-prose border-l-2 border-engraving/20 pl-3 text-sm leading-relaxed text-engraving-faint">
        {locale === 'id'
          ? 'Riwayat hidup para tokoh belum ditulis di sini. Sumber resmi yang diperiksa untuk itu menolak pengambilan otomatis, dan proyek ini tidak memuat klaim tanpa sumber yang bisa ditelusuri. Yang tercantum di bawah adalah keterangan Bank Indonesia sendiri tentang tiap pecahan.'
          : 'Biographies of the figures are not written here yet. The authoritative sources checked for them refuse automated retrieval, and this project does not carry a claim without a source a reader can follow. What appears below is Bank Indonesia’s own record for each note.'}
      </p>

      <div className="mt-14 space-y-14">
        {notes.map((note) => (
          <section key={note.id} aria-labelledby={note.id} className="rule pt-8">
            <h2 id={note.id} className="numeric font-mono text-sm tracking-wider text-engraving-faint">
              {note.caption}
            </h2>

            {note.figureName !== undefined && (
              <div className="mt-4">
                <h3 className="font-display text-2xl">{note.figureName}</h3>
                <ul className="mt-3 max-w-prose space-y-2 leading-relaxed text-engraving-soft">
                  {note.figureClaims.map((claim) => (
                    <li key={claim}>{claim}</li>
                  ))}
                </ul>
              </div>
            )}

            {note.motifs.length > 0 && (
              <ul className="mt-8 grid gap-px bg-engraving/10 sm:grid-cols-3">
                {note.motifs.map((motif) => (
                  <li key={motif.id} className="bg-proof p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-engraving-faint">
                      {KIND_LABEL[motif.kind][locale]}
                    </p>
                    <h4 className="mt-2 font-display text-lg">{motif.name}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-engraving-soft">{motif.claim}</p>
                  </li>
                ))}
              </ul>
            )}

            <ul className="mt-5 space-y-1 text-xs text-engraving-faint">
              {note.citations.map((citation) => (
                <li key={`${citation.title}-${citation.locator ?? ''}`}>
                  {citation.publisher} — {citation.title}
                  {citation.locator !== undefined && `, ${citation.locator}`}
                  {citation.url !== undefined && (
                    <>
                      {' '}
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline underline-offset-2"
                      >
                        ↗<span className="sr-only">{locale === 'id' ? 'sumber' : 'source'}</span>
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
