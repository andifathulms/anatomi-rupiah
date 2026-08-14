import type { Citation } from '@/lib/content/schema'
import type { Locale } from '@/lib/i18n'

/**
 * Every claim on this site carries a source, so every page that makes claims
 * shows them. Build-enforced by the citation validator; shown here because a
 * citation nobody can read is not a citation.
 */
/** The list on its own, for places that already have a heading of their own. */
export function CitationLines({
  citations,
  locale,
  className = 'mt-4 space-y-2 text-sm text-engraving-soft',
}: {
  readonly citations: readonly Citation[]
  readonly locale: Locale
  readonly className?: string
}) {
  return (
    <ul className={className}>
      {citations.map((citation) => (
        <li key={`${citation.publisher}-${citation.title}-${citation.locator ?? ''}`}>
          <span className="text-engraving">{citation.publisher}</span> — {citation.title}
          {citation.locator !== undefined && <span>, {citation.locator}</span>}
          {citation.url !== undefined && (
            <>
              {' '}
              <a
                href={citation.url}
                target="_blank"
                rel="noreferrer noopener"
                // The visible glyph is one character; the hit area is
                // widened well past it with an invisible pseudo-element
                // rather than padding, so the inline text flow doesn't
                // shift (critique 2026-08-14, P1 — this is the
                // highest-frequency small tap target on the site).
                className="relative inline-block underline underline-offset-4 before:absolute before:-inset-2.5 before:content-['']"
              >
                ↗
                <span className="sr-only">
                  {locale === 'id' ? 'buka sumber: ' : 'open source: '}
                  {citation.title}
                </span>
              </a>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export function CitationList({
  citations,
  locale,
}: {
  readonly citations: readonly Citation[]
  readonly locale: Locale
}) {
  return (
    <section className="rule mt-14 pt-6" aria-labelledby="sumber">
      <h2 id="sumber" className="font-mono text-xs uppercase tracking-[0.24em] text-engraving-faint">
        {locale === 'id' ? 'Sumber' : 'Sources'}
      </h2>
      <CitationLines citations={citations} locale={locale} />
    </section>
  )
}
