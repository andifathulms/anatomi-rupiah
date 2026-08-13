import { describe, expect, it } from 'vitest'
import {
  MIN_MARK_COVERAGE,
  SPESIMEN_WORD,
  bakeSpesimen,
  buildWordmark,
  hasBakedMark,
} from '@/lib/spesimen'

/**
 * These assertions stand behind UU 7/2011 Pasal 24 ayat (1). Weakening any of
 * them is not a test change, it is a change to the project's legal position.
 */

interface Bounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

function pointsOf(d: string): Array<readonly [number, number]> {
  const matches = [...d.matchAll(/[ML](-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)]
  return matches.map((m) => [Number(m[1]), Number(m[2])] as const)
}

function boundsOf(d: string): Bounds {
  const points = pointsOf(d)
  expect(points.length).toBeGreaterThan(0)
  return points.reduce<Bounds>(
    (acc, [x, y]) => ({
      minX: Math.min(acc.minX, x),
      minY: Math.min(acc.minY, y),
      maxX: Math.max(acc.maxX, x),
      maxY: Math.max(acc.maxY, y),
    }),
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity },
  )
}

describe('the wordmark is geometry, not text', () => {
  it('emits only move and line commands', () => {
    const { d } = buildWordmark(SPESIMEN_WORD, {
      capHeight: 10,
      centerX: 0,
      centerY: 0,
      rotationDeg: 0,
    })
    expect(d).toMatch(/^[ML\-0-9. ]+$/)
  })

  it('produces finite coordinates for every point', () => {
    const { d } = buildWordmark(SPESIMEN_WORD, {
      capHeight: 7.5,
      centerX: 100,
      centerY: 40,
      rotationDeg: -23.4,
    })
    for (const [x, y] of pointsOf(d)) {
      expect(Number.isFinite(x)).toBe(true)
      expect(Number.isFinite(y)).toBe(true)
    }
  })

  it('bakes rotation into coordinates rather than a transform attribute', () => {
    const flat = buildWordmark(SPESIMEN_WORD, {
      capHeight: 10,
      centerX: 0,
      centerY: 0,
      rotationDeg: 0,
    })
    const turned = buildWordmark(SPESIMEN_WORD, {
      capHeight: 10,
      centerX: 0,
      centerY: 0,
      rotationDeg: 30,
    })
    expect(turned.d).not.toBe(flat.d)
    expect(turned.d).not.toContain('transform')
    expect(turned.d).not.toContain('rotate')
  })

  it('refuses letterforms it has not authored', () => {
    expect(() =>
      buildWordmark('CONTOH', { capHeight: 10, centerX: 0, centerY: 0, rotationDeg: 0 }),
    ).toThrow(/letterform/)
  })
})

describe('bakeSpesimen', () => {
  const box = { width: 300, height: 130 } as const
  const outline = 'M0 0H300V130H0Z'

  it('always returns a mark alongside the outline', () => {
    const baked = bakeSpesimen(outline, box)
    expect(baked.outlineD).toBe(outline)
    expect(baked.markD.length).toBeGreaterThan(0)
    expect(baked.marginMarkD.length).toBeGreaterThan(0)
    expect(baked.word).toBe('SPESIMEN')
  })

  it('strikes the mark across at least half the artwork diagonal', () => {
    const baked = bakeSpesimen(outline, box)
    const b = boundsOf(baked.markD)
    const span = Math.hypot(b.maxX - b.minX, b.maxY - b.minY)
    expect(span).toBeGreaterThanOrEqual(Math.hypot(box.width, box.height) * MIN_MARK_COVERAGE)
  })

  it('keeps the mark inside the artwork box, so a crop cannot lose it', () => {
    const baked = bakeSpesimen(outline, box)
    for (const d of [baked.markD, baked.marginMarkD]) {
      const b = boundsOf(d)
      expect(b.minX).toBeGreaterThanOrEqual(-1)
      expect(b.minY).toBeGreaterThanOrEqual(-1)
      expect(b.maxX).toBeLessThanOrEqual(box.width + 1)
      expect(b.maxY).toBeLessThanOrEqual(box.height + 1)
    }
  })

  it('keeps the mark inside the artwork at every shape it accepts', () => {
    const shapes = [
      { width: 300, height: 130 },
      { width: 151, height: 65 },
      { width: 34, height: 47 },
      { width: 14, height: 52 },
      { width: 30, height: 15 },
      { width: 40, height: 20 },
      { width: 50, height: 50 },
    ]
    for (const shape of shapes) {
      const baked = bakeSpesimen('M0 0H1V1H0Z', shape)
      for (const d of [baked.markD, baked.marginMarkD]) {
        const b = boundsOf(d)
        expect(b.minX).toBeGreaterThanOrEqual(-0.001)
        expect(b.minY).toBeGreaterThanOrEqual(-0.001)
        expect(b.maxX).toBeLessThanOrEqual(shape.width + 0.001)
        expect(b.maxY).toBeLessThanOrEqual(shape.height + 0.001)
      }
    }
  })

  it('refuses a sliver rather than shrinking the mark to fit it', () => {
    // A shape too extreme to carry a legible mark is one we do not draw.
    expect(() => bakeSpesimen('M0 0H1V1H0Z', { width: 5, height: 55 })).toThrow(/floor/)
    expect(() => bakeSpesimen('M0 0H1V1H0Z', { width: 5, height: 55 })).toThrow(/Reshape/)
  })

  it('refuses to mark empty or degenerate artwork', () => {
    expect(() => bakeSpesimen('', box)).toThrow(/empty artwork/)
    expect(() => bakeSpesimen(outline, { width: 0, height: 130 })).toThrow(/positive extent/)
    expect(() => bakeSpesimen(outline, { width: 300, height: -1 })).toThrow(/positive extent/)
  })
})

describe('hasBakedMark', () => {
  it('accepts markup whose marked paths carry geometry', () => {
    expect(hasBakedMark('<path data-spesimen="baked" d="M0 0L10 10" />')).toBe(true)
  })

  it('rejects markup with no mark at all', () => {
    expect(hasBakedMark('<path d="M0 0H300V130H0Z" />')).toBe(false)
  })

  it('rejects a mark that is present in name but empty in geometry', () => {
    expect(hasBakedMark('<path data-spesimen="baked" d="" />')).toBe(false)
    expect(hasBakedMark('<path data-spesimen="baked" />')).toBe(false)
  })
})
