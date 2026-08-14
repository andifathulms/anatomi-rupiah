import Link from 'next/link'
import { href, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/i18n/copy'
import { MakerSignature } from './MakerSignature'

/**
 * The disclosure is linked from every view, not buried — PRD §6.7.
 * The marking notice and the statement about who determines authenticity both
 * appear on every page for the same reason.
 *
 * The maker's mark sits below, past one seam. It is a personal credit, not a
 * legal notice, and the two are kept apart so neither is read as the other.
 */
export function SiteFooter({ locale }: { readonly locale: Locale }) {
  const copy = SITE[locale]

  return (
    <footer className="mt-24 border-t border-engraving/15 bg-proof-deep">
      <div className="mx-auto max-w-sheet px-5 py-10">
        <div className="grid gap-6 text-sm text-engraving-soft md:grid-cols-3">
          <p className="border-l-2 border-spesimen pl-3 text-engraving">{copy.markingNotice}</p>
          <p>{copy.footerDisclaimer}</p>
          <div className="space-y-3">
            <p>{copy.footerAuthority}</p>
            <p>
              <Link href={href(locale, 'hukum')} className="underline underline-offset-4">
                {locale === 'id' ? 'Dasar hukum & metode' : 'Legal basis & method'}
              </Link>
            </p>
          </div>
        </div>

        {/* Its own landmark, not just a border-t inside the legal footer: a
            screen-reader user tabbing landmarks should be able to tell "the
            legal notice" and "the maker's personal credit" apart as two
            regions, not hear one continuous footer (critique 2026-08-14, P3). */}
        <section
          aria-label={locale === 'id' ? 'Kredit pembuat' : 'Maker credit'}
          className="mt-8 border-t border-engraving/12 pt-5"
        >
          <MakerSignature locale={locale} />
        </section>
      </div>
    </footer>
  )
}
