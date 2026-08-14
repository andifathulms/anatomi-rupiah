'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES, href, type Locale } from '@/lib/i18n'
import { parsePathname } from '@/lib/i18n/path'
import { SITE } from '@/lib/i18n/copy'
import { assetPath } from '@/lib/paths'

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
        <Link href={href(locale, '')} className="flex shrink-0 items-center gap-2.5">
          {/* The tile variant, not the ink-only one: at this size the ink-only
              mark collapses into a blob, exactly as the asset kit warns.
              A plain <img> on purpose — next/image cannot optimise an SVG, and
              a static export has no image server to optimise it with. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath('/brand/favicon.svg')}
            alt=""
            width={26}
            height={26}
            className="h-[26px] w-[26px] rounded-[6px]"
          />
          <span className="font-display text-lg tracking-tight">{copy.siteName}</span>
        </Link>

        <nav
          aria-label={locale === 'id' ? 'Navigasi utama' : 'Main navigation'}
          className="min-w-0 flex-1"
        >
          {/* Scrollbar left visible on purpose: at widths where not every
              item fits, it's the only cue that more of the nav exists
              off to the side. */}
          <ul className="-mx-1 flex gap-1 overflow-x-auto px-1 py-1">
            {ROUTES.filter((route) => route.segment !== '').map((route) => (
              <li key={route.segment} className="shrink-0">
                <Link
                  href={href(locale, route.segment)}
                  aria-current={route.segment === segment ? 'page' : undefined}
                  title={route.hint[locale]}
                  aria-label={`${route.label[locale]} — ${route.hint[locale]}`}
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
          className="shrink-0 rounded-full border border-engraving/30 bg-proof-deep px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-engraving hover:border-engraving hover:bg-engraving hover:text-proof"
          lang={other}
        >
          {other.toUpperCase()}
          {/* sr-only rather than `hidden`: `hidden` removes text from the
              accessibility tree too, so below `sm` the link's accessible
              name collapsed to just "EN"/"ID". This stays visually hidden
              on narrow viewports but always reaches a screen reader. */}
          <span className="ml-1 sr-only font-sans normal-case tracking-normal sm:not-sr-only sm:inline">
            · {copy.languageLabel}
          </span>
        </Link>
      </div>
    </header>
  )
}
