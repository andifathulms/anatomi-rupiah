import type { Citation } from '@/lib/content/schema'
import type { Locale } from '@/lib/i18n'

/**
 * Every claim on this site carries a source, so every page that makes claims
 * shows them. Build-enforced by the citation validator; shown here because a
 * citation nobody can read is not a citation.
 */
export function CitationList({
  citations,
  locale,
}: {
  readonly citations: readonly Citation[]
  readonly locale: Locale
}) {
  return (
    <section className="rule mt-14 pt-6" aria-labelledby="sumber">
      <h2 id="sumber" className="font-mono text-xs uppercase tracking-[0.2em] text-engraving-faint">
        {locale === 'id' ? 'Sumber' : 'Sources'}
      </h2>
      <ul className="mt-4 space-y-2 text-sm text-engraving-soft">
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
                  className="underline underline-offset-4"
                >
                  ↗
                  <span className="sr-only">{locale === 'id' ? 'buka sumber' : 'open source'}</span>
                </a>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
