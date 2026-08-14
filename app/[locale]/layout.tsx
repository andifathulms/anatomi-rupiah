import type { Metadata } from 'next'
import { Archivo, Brygada_1918, Space_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import { SiteFooter } from '@/components/chrome/SiteFooter'
import { SiteHeader } from '@/components/chrome/SiteHeader'
import { LOCALES, isLocale } from '@/lib/i18n'
import { assetPath } from '@/lib/paths'
import { SITE_ORIGIN } from '@/lib/seo'
import { SITE } from '@/lib/i18n/copy'

/**
 * Root layout, in a dynamic segment so the document language is real rather
 * than assumed. Fonts are self-hosted by next/font at build time: the site
 * makes no network request at runtime (CLAUDE.md invariant 11).
 */

const display = Brygada_1918({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

/**
 * The site-wide fallback — used as-is by routes that don't set their own
 * (chiefly /_not-found) and merged under whatever a page overrides. Locale-
 * aware, unlike the static object this replaces: that one was Indonesian
 * text shown even on /en pages, because a plain `metadata` export can't vary
 * by the very locale param it's named after.
 *
 * The description is SITE.tagline, not a separate hand-written sentence —
 * previously this and the openGraph description were two different
 * hand-written strings for the same claim, and only one of them was ever
 * shown.
 */
export function generateMetadata({
  params,
}: {
  readonly params: { readonly locale: string }
}): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'id'
  const copy = SITE[locale]

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: {
      default: copy.siteName,
      template: `%s · ${copy.siteName}`,
    },
    description: copy.tagline,
    robots: { index: true, follow: true },
    manifest: assetPath('/site.webmanifest'),
    icons: {
      icon: [{ url: assetPath('/brand/favicon.svg'), type: 'image/svg+xml' }],
      apple: [{ url: assetPath('/brand/apple-touch-icon-180.png'), sizes: '180x180' }],
    },
    openGraph: {
      type: 'website',
      siteName: copy.siteName,
      title: copy.siteName,
      description: copy.tagline,
      images: [{ url: assetPath('/brand/og-1200x630.png'), width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [assetPath('/brand/og-1200x630.png')],
    },
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode
  readonly params: { readonly locale: string }
}) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const copy = SITE[locale]

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen">
        <a
          href="#isi"
          className="sr-only focus:not-sr-only focus:m-3 focus:inline-block focus:rounded focus:bg-engraving focus:px-3 focus:py-2 focus:text-proof"
        >
          {copy.skipToContent}
        </a>
        <SiteHeader locale={locale} />
        <main id="isi" tabIndex={-1} className="mx-auto max-w-sheet px-5">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  )
}
