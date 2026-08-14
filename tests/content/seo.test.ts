import { describe, expect, it } from 'vitest'
import { pageMetadata } from '@/lib/seo'

describe('pageMetadata', () => {
  it('omits title for the homepage so the template does not double it', () => {
    const meta = pageMetadata({ locale: 'id', segment: '', description: 'x' })
    expect(meta.title).toBeUndefined()
    expect(meta.openGraph?.title).toBe('Anatomi Rupiah')
  })

  it('brands the title for every other page', () => {
    const meta = pageMetadata({ locale: 'id', segment: 'ciri', title: 'Ciri', description: 'x' })
    expect(meta.title).toBe('Ciri')
    expect(meta.openGraph?.title).toBe('Ciri · Anatomi Rupiah')
  })

  it('points canonical at the current locale and hreflang at both', () => {
    const meta = pageMetadata({ locale: 'en', segment: 'hukum', title: 'Legal', description: 'x' })
    expect(meta.alternates?.canonical).toContain('/en/hukum')
    const languages = meta.alternates?.languages as Record<string, string>
    expect(languages.id).toContain('/id/hukum')
    expect(languages.en).toContain('/en/hukum')
  })

  it('carries the same title and description into openGraph and twitter', () => {
    const meta = pageMetadata({ locale: 'id', segment: 'sumber', title: 'Sumber', description: 'desc' })
    expect(meta.openGraph?.description).toBe('desc')
    expect(meta.twitter?.description).toBe('desc')
  })
})
