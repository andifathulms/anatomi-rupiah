import type { Metadata } from 'next'
import { LOCALES, href, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/i18n/copy'
import { assetPath } from '@/lib/paths'

/**
 * Per-page metadata plumbing — canonical, hreflang, OG, Twitter — built once
 * here so every route gets it identically, instead of nine near-copies of
 * the same object. Callers pass the title and description; both must come
 * from copy already rendered on the page, never re-typed here.
 */

/**
 * The one place the production origin is written down. metadataBase (root
 * layout) resolves every relative canonical/OG URL against this already;
 * sitemap.ts and robots.ts need it directly, since MetadataRoute entries
 * must be fully qualified.
 */
export const SITE_ORIGIN = 'https://andifathulms.github.io/'

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_ORIGIN).toString()
}

const OG_IMAGE = {
  url: assetPath('/brand/og-1200x630.png'),
  width: 1200,
  height: 630,
} as const

export function pageMetadata({
  locale,
  segment,
  title,
  description,
}: {
  readonly locale: Locale
  readonly segment: string
  /** Omit for the homepage — the root layout's default title applies
   * untemplated, so it doesn't come out as "Anatomi Rupiah · Anatomi Rupiah". */
  readonly title?: string
  readonly description: string
}): Metadata {
  const pathFor = (l: Locale) => assetPath(href(l, segment))
  const languages = Object.fromEntries(LOCALES.map((l) => [l, pathFor(l)]))
  const siteName = SITE[locale].siteName
  const brandedTitle = title === undefined ? siteName : `${title} · ${siteName}`

  return {
    ...(title === undefined ? {} : { title }),
    description,
    alternates: {
      canonical: pathFor(locale),
      languages,
    },
    openGraph: {
      title: brandedTitle,
      description,
      url: pathFor(locale),
      images: [OG_IMAGE],
    },
    twitter: {
      title: brandedTitle,
      description,
      images: [OG_IMAGE.url],
    },
  }
}
