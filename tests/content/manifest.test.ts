import { describe, expect, it } from 'vitest'
import { buildManifest } from '@/lib/brand/manifest'

/**
 * A manifest whose URLs miss the basePath fails silently: the browser simply
 * declines to offer installation, with nothing in the page to show for it.
 * That is exactly how it broke once, so it is asserted here.
 */
const BASE = '/anatomi-rupiah'

describe('the web app manifest', () => {
  const manifest = JSON.parse(buildManifest(BASE)) as {
    start_url: string
    scope: string
    icons: Array<{ src: string; sizes: string; type: string; purpose?: string }>
  }

  it('prefixes every URL with the basePath', () => {
    const urls = [manifest.start_url, manifest.scope, ...manifest.icons.map((i) => i.src)]
    expect(urls.length).toBeGreaterThan(3)
    for (const url of urls) {
      expect(url.startsWith(`${BASE}/`)).toBe(true)
      expect(url).not.toContain(`${BASE}${BASE}`)
    }
  })

  it('offers a maskable icon, so Android does not letterbox the mark', () => {
    expect(manifest.icons.some((icon) => icon.purpose === 'maskable')).toBe(true)
  })

  it('points only at brand assets, never at note artwork', () => {
    for (const icon of manifest.icons) {
      expect(icon.src.startsWith(`${BASE}/brand/`)).toBe(true)
    }
  })

  it('works with no basePath, for local development', () => {
    const local = JSON.parse(buildManifest('')) as { start_url: string }
    expect(local.start_url).toBe('/id/')
  })
})
