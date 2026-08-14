import { describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'
import { denominationIds, featureIds } from '@/lib/content/views'
import { ROUTES } from '@/lib/i18n'

describe('sitemap', () => {
  const urls = sitemap()

  it('lists every route, in both locales, and nothing else', () => {
    const expectedCount = 2 * (ROUTES.length + featureIds().length + denominationIds().length)
    expect(urls.length).toBe(expectedCount)
  })

  it('every url is absolute, locale-prefixed, and trailing-slashed', () => {
    // basePath itself is a Next.js build-time env substitution (see
    // lib/paths.ts) and not present when this runs under vitest directly —
    // asserted against the real production build in the audit instead.
    for (const { url } of urls) {
      expect(url.startsWith('https://andifathulms.github.io/')).toBe(true)
      expect(url.endsWith('/')).toBe(true)
      expect(url).toMatch(/\/(id|en)\//)
    }
  })

  it('has no duplicate urls', () => {
    const unique = new Set(urls.map((entry) => entry.url))
    expect(unique.size).toBe(urls.length)
  })
})
