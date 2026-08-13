'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES, href, type Locale } from '@/lib/i18n'
import { parsePathname } from '@/lib/i18n/path'
import { SITE } from '@/lib/i18n/copy'

export function SiteHeader({ locale }: { readonly locale: Locale }) {
  const copy = SITE[locale]
  const other: Locale = locale === 'id' ? 'en' : 'id'
  const { segment } = parsePathname(usePathname())

  return (
    <header className="border-b border-engraving/15">
      <div className="mx-auto flex max-w-sheet flex-wrap items-baseline gap-x-6 gap-y-3 px-5 py-4">
        <Link href={href(locale, '')} className="font-display text-lg tracking-tight">
          {copy.siteName}
        </Link>

        <nav aria-label={locale === 'id' ? 'Navigasi utama' : 'Main navigation'} className="flex-1">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {ROUTES.filter((route) => route.segment !== '').map((route) => (
              <li key={route.segment}>
                <Link
                  href={href(locale, route.segment)}
                  aria-current={route.segment === segment ? 'page' : undefined}
                  className={
                    route.segment === segment
                      ? 'text-engraving underline decoration-diterawang decoration-2 underline-offset-4'
                      : 'text-engraving-soft hover:text-engraving'
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
          className="font-mono text-xs uppercase tracking-widest text-engraving-soft hover:text-engraving"
          lang={other}
        >
          {other.toUpperCase()}
          <span className="sr-only"> — {copy.languageLabel}</span>
        </Link>
      </div>
    </header>
  )
}
