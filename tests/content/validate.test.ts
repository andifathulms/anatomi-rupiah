import { describe, expect, it } from 'vitest'
import { validateContent } from '@/lib/content/validate'
import type { Citation, Claim, Feature } from '@/lib/content/schema'

const CITATION: Citation = {
  publisher: 'Bank Indonesia',
  title: 'Ciri Keaslian Uang Rupiah',
  url: 'https://www.bi.go.id/id/rupiah/ciri-keaslian/default.aspx',
  accessed: '2026-08-13',
}

function claim(id: string, en: string, citations: Citation[] = [CITATION]): Claim {
  return { text: { id, en }, citations }
}

function feature(overrides: Partial<Feature> = {}): Feature {
  return {
    type: 'feature',
    id: 'tanda-air',
    name: { id: 'Tanda air', en: 'Watermark' },
    channel: 'diterawang',
    summary: claim('Gambar yang muncul saat diterawang.', 'An image that appears when held to light.'),
    observe: [claim('Terawangkan ke arah cahaya.', 'Hold the note up to the light.')],
    mechanism: {
      illustration: 'tanda-air',
      caption: claim('Ketebalan bahan berubah.', 'Substrate thickness varies.'),
      steps: [claim('Cahaya menembus bagian tipis.', 'Light passes through the thin areas.')],
    },
    ...overrides,
  }
}

describe('citation completeness', () => {
  it('accepts a fully cited feature', () => {
    expect(validateContent([feature()])).toEqual([])
  })

  it('rejects a claim with no citation', () => {
    const issues = validateContent([
      feature({ summary: claim('Klaim tanpa sumber.', 'A claim with no source.', []) }),
    ])
    expect(issues.length).toBeGreaterThan(0)
    expect(issues.every((i) => i.kind === 'shape')).toBe(true)
  })

  it('rejects a citation that cannot be followed', () => {
    const unfollowable: Citation = {
      publisher: 'Bank Indonesia',
      title: 'Somewhere',
      accessed: '2026-08-13',
    }
    const issues = validateContent([
      feature({ summary: claim('Ada sumber.', 'Has a source.', [unfollowable]) }),
    ])
    expect(issues.some((i) => i.message.includes('url or a locator'))).toBe(true)
  })
})

describe('the §4 register screen', () => {
  it('rejects prose that describes how a feature is made', () => {
    const issues = validateContent([
      feature({
        summary: claim(
          'Berikut cara membuat tanda air pada kertas.',
          'Here is how to make a watermark in paper.',
        ),
      }),
    ])
    expect(issues.some((i) => i.kind === 'register')).toBe(true)
  })

  it('rejects prose disclosing material composition', () => {
    const issues = validateContent([
      feature({
        summary: claim('Komposisi tinta yang dipakai.', 'The ink formulation used.'),
      }),
    ])
    expect(issues.some((i) => i.kind === 'register')).toBe(true)
  })

  it('rejects prose that renders an authenticity verdict', () => {
    const issues = validateContent([
      feature({
        summary: claim('Uang ini asli.', 'Your note looks genuine.'),
      }),
    ])
    expect(issues.some((i) => i.kind === 'verdict')).toBe(true)
  })

  it('leaves check-oriented prose alone', () => {
    const issues = validateContent([
      feature({
        observe: [
          claim(
            'Terawangkan uang ke arah cahaya; gambar pahlawan akan tampak dari kedua sisi.',
            'Hold the note to the light; the hero portrait appears from either side.',
          ),
        ],
      }),
    ])
    expect(issues).toEqual([])
  })
})

describe('reference integrity', () => {
  const note = {
    type: 'denomination' as const,
    id: 'seratus-ribu',
    valueIdr: 100000,
    emisi: 2016,
    dimensions: { widthMm: 151, heightMm: 65, citations: [CITATION] },
    figureId: 'soekarno-hatta',
    motifId: 'tari-topeng-betawi',
    placements: [
      {
        featureId: 'tanda-air',
        face: 'depan' as const,
        region: { xMm: 110, yMm: 12, widthMm: 30, heightMm: 40 },
        note: claim('Di sisi kanan.', 'On the right-hand side.'),
      },
    ],
    kodeTunaNetra: {
      marks: 1,
      description: claim('Satu pasang garis timbul.', 'One pair of raised lines.'),
    },
  }

  it('rejects a placement pointing at a feature nobody wrote', () => {
    const issues = validateContent([note])
    expect(issues.some((i) => i.kind === 'reference' && i.message.includes('tanda-air'))).toBe(true)
  })

  it('rejects a region that falls outside the note', () => {
    const issues = validateContent([
      {
        ...note,
        placements: [
          {
            ...note.placements[0],
            region: { xMm: 140, yMm: 12, widthMm: 30, heightMm: 40 },
          },
        ],
      },
    ])
    expect(issues.some((i) => i.message.includes('outside the note'))).toBe(true)
  })
})
