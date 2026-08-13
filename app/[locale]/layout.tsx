import type { Metadata } from 'next'
import { Archivo, Brygada_1918, Space_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import { SiteFooter } from '@/components/chrome/SiteFooter'
import { SiteHeader } from '@/components/chrome/SiteHeader'
import { LOCALES, isLocale } from '@/lib/i18n'
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

export const metadata: Metadata = {
  title: {
    default: 'Anatomi Rupiah',
    template: '%s · Anatomi Rupiah',
  },
  description:
    'Penjelasan mekanisme unsur pengaman uang Rupiah. Skema, bertanda SPESIMEN, tidak menentukan keaslian.',
  robots: { index: true, follow: true },
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
        <main id="isi" className="mx-auto max-w-sheet px-5">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  )
}
