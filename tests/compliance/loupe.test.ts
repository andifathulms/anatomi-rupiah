import { describe, expect, it } from 'vitest'
import {
  LoupeRegionError,
  MAX_REGION_WIDTH_FRACTION,
  assertRegionIsADetail,
  loupeViewModel,
} from '@/lib/schematic/loupe'
import { checkLoupeRegions, checkSpesimenPresence, renderAllLoupes } from '@/lib/compliance/checks'

const NOTE = { widthMm: 151, heightMm: 65 } as const

describe('the loupe magnifies a detail, never a note', () => {
  it('rejects a region approaching the width of the note', () => {
    const tooWide = {
      xMm: 0,
      yMm: 0,
      widthMm: NOTE.widthMm * (MAX_REGION_WIDTH_FRACTION + 0.05),
      heightMm: 20,
    }
    expect(() => assertRegionIsADetail(tooWide, NOTE)).toThrow(LoupeRegionError)
  })

  it('rejects a region spanning the full height of the note', () => {
    expect(() =>
      assertRegionIsADetail({ xMm: 0, yMm: 0, widthMm: 10, heightMm: NOTE.heightMm }, NOTE),
    ).toThrow(LoupeRegionError)
  })

  it('accepts an ordinary detail', () => {
    expect(() =>
      assertRegionIsADetail({ xMm: 100, yMm: 10, widthMm: 34, heightMm: 47 }, NOTE),
    ).not.toThrow()
  })

  it('passes every region the corpus actually uses', () => {
    expect(checkLoupeRegions()).toEqual([])
  })
})

describe('a magnified view is artwork too', () => {
  it('carries its own baked marking', () => {
    const model = loupeViewModel({ xMm: 100, yMm: 10, widthMm: 34, heightMm: 47 }, NOTE)
    expect(model.markD.length).toBeGreaterThan(0)
    expect(model.marginMarkD.length).toBeGreaterThan(0)
  })

  it('holds for every loupe the sheet can open', () => {
    const rendered = renderAllLoupes()
    expect(rendered.length).toBeGreaterThan(0)
    expect(checkSpesimenPresence(rendered)).toEqual([])
    for (const view of rendered) {
      expect(view.markup).toMatch(/data-spesimen="baked"[^>]*stroke="/)
    }
  })
})
