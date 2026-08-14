import type { MetadataRoute } from 'next'
import { denominationIds, featureIds } from '@/lib/content/views'
import { LOCALES, ROUTES, href } from '@/lib/i18n'
import { assetPath } from '@/lib/paths'
import { absoluteUrl } from '@/lib/seo'

/**
 * Built from the exact same sources every route's own generateStaticParams
 * already uses (ROUTES, featureIds(), denominationIds()) — so a new feature
 * or denomination appears here automatically, never by hand-editing a
 * second list that can fall out of step with the real routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const segments = [
    ...ROUTES.map((route) => route.segment),
    ...featureIds().map((id) => `ciri/${id}`),
    ...denominationIds().map((id) => `lembar/${id}`),
  ]

  // next.config.js sets trailingSlash: true, so every real page is served at
  // a trailing-slash URL — the sitemap should list exactly that URL, not one
  // that 302s to it.
  return LOCALES.flatMap((locale) =>
    segments.map((segment) => ({
      url: `${absoluteUrl(assetPath(href(locale, segment)))}/`,
    })),
  )
}
