import { describe, expect, it } from 'vitest'
import { MECHANISM_IDS, isMechanismId, mechanismSvg } from '@/lib/art/mechanisms'
import { features } from '@/data/features'

describe('mechanism artwork', () => {
  it('exists for every feature that names one', () => {
    for (const feature of features) {
      expect(isMechanismId(feature.mechanism.illustration)).toBe(true)
    }
  })

  it('loads as inert, self-contained SVG', () => {
    for (const id of MECHANISM_IDS) {
      const markup = mechanismSvg(id)
      expect(markup).toContain('<svg')
      expect(markup).not.toMatch(/<script/i)
      expect(markup).not.toMatch(/href\s*=\s*"http/i)
    }
  })

  it('embeds no raster imagery, not even inline', () => {
    for (const id of MECHANISM_IDS) {
      expect(mechanismSvg(id)).not.toMatch(/data:image\/(png|jpe?g|webp|gif)/i)
    }
  })

  it('leaves wording to the localized captions rather than baking it in', () => {
    // Callout numerals are the only glyphs artwork is allowed to carry, so the
    // same drawing serves both languages.
    for (const id of MECHANISM_IDS) {
      const texts = [...mechanismSvg(id).matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1] ?? '')
      for (const text of texts) {
        expect(text.trim()).toMatch(/^\d+$/)
      }
    }
  })
})

describe('the corpus', () => {
  it('covers every mechanism PRD §6.2 lists', () => {
    const covered = new Set(features.map((feature) => feature.mechanism.illustration))
    for (const id of MECHANISM_IDS) {
      expect(covered.has(id)).toBe(true)
    }
  })

  it('states the touch limitation rather than simulating it', () => {
    const intaglio = features.find((feature) => feature.id === 'cetak-intaglio')
    expect(intaglio?.limitation?.id).toMatch(/tidak bisa lewat layar/)
  })
})
