'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES, href, type Locale } from '@/lib/i18n'
import { parsePathname } from '@/lib/i18n/path'
import { SITE } from '@/lib/i18n/copy'

/**
 * Sticky, and horizontally scrollable on narrow screens rather than collapsed
 * behind a menu button. Seven destinations is few enough to show, and a
 * visible row beats a hidden one — nothing here is worth a tap to discover.
 */
export function SiteHeader({ locale }: { readonly locale: Locale }) {
  const copy = SITE[locale]
  const other: Locale = locale === 'id' ? 'en' : 'id'
  const { segment } = parsePathname(usePathname())

  return (
    <header className="sticky top-0 z-30 border-b border-engraving/12 bg-proof/85 backdrop-blur-sm supports-[backdrop-filter]:bg-proof/70">
      <div className="mx-auto flex max-w-sheet items-center gap-4 px-5 py-3">
        <Link
          href={href(locale, '')}
          className="shrink-0 font-display text-lg tracking-tight"
          aria-label={copy.siteName}
        >
          {copy.siteName}
        </Link>

        <nav
          aria-label={locale === 'id' ? 'Navigasi utama' : 'Main navigation'}
          className="min-w-0 flex-1"
        >
          <ul className="-mx-1 flex gap-1 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ROUTES.filter((route) => route.segment !== '').map((route) => (
              <li key={route.segment} className="shrink-0">
                <Link
                  href={href(locale, route.segment)}
                  aria-current={route.segment === segment ? 'page' : undefined}
                  className={
                    route.segment === segment
                      ? 'block rounded-full bg-engraving px-3 py-1.5 text-sm text-proof'
                      : 'block rounded-full px-3 py-1.5 text-sm text-engraving-soft hover:bg-proof-deep hover:text-engraving'
                  }
                >
                  {route.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href={href(other, segment)}
          className="shrink-0 rounded-full border border-engraving/20 px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-engraving-soft hover:border-engraving hover:text-engraving"
          lang={other}
        >
          {other.toUpperCase()}
          <span className="sr-only"> — {copy.languageLabel}</span>
        </Link>
      </div>
    </header>
  )
}
