import { describe, expect, it } from 'vitest'
import {
  FORBIDDEN_SCALE_BAND,
  MAX_SCHEMATIC_SCALE,
  PX_PER_MM,
  SizeConstraintError,
  assertSchematicWidth,
  buildSchematic,
  isInsideForbiddenBand,
  scaleOf,
  schematicWidthPx,
} from '@/lib/schematic'

/** Largest note in circulation — the worst case for the constraint. */
const RP_100000 = { widthMm: 151, heightMm: 65 } as const

describe('the size constraint', () => {
  it('caps schematics below the reproduction band', () => {
    expect(MAX_SCHEMATIC_SCALE).toBeLessThan(FORBIDDEN_SCALE_BAND.min)
  })

  it('never proposes a width that lands inside the band', () => {
    for (const widthMm of [141, 143, 145, 147, 149, 151]) {
      const size = { widthMm, heightMm: 65 }
      const scale = scaleOf(schematicWidthPx(size), size)
      expect(isInsideForbiddenBand(scale)).toBe(false)
      expect(scale).toBeLessThanOrEqual(MAX_SCHEMATIC_SCALE)
    }
  })

  it('rejects a schematic drawn at actual size', () => {
    const actualPx = RP_100000.widthMm * PX_PER_MM
    expect(() => assertSchematicWidth(actualPx, RP_100000)).toThrow(SizeConstraintError)
  })

  it('rejects a schematic anywhere inside the band, including its lower edge', () => {
    const bandFloorPx = RP_100000.widthMm * PX_PER_MM * FORBIDDEN_SCALE_BAND.min
    expect(() => assertSchematicWidth(bandFloorPx, RP_100000)).toThrow(SizeConstraintError)
  })

  it('rejects nonsense widths outright', () => {
    expect(() => assertSchematicWidth(0, RP_100000)).toThrow(SizeConstraintError)
    expect(() => assertSchematicWidth(-10, RP_100000)).toThrow(SizeConstraintError)
    expect(() => assertSchematicWidth(Number.NaN, RP_100000)).toThrow(SizeConstraintError)
  })

  it('accepts the width it computes for itself', () => {
    expect(() => assertSchematicWidth(schematicWidthPx(RP_100000), RP_100000)).not.toThrow()
  })
})

describe('schematic geometry', () => {
  it('carries a baked mark for every denomination it can draw', () => {
    for (const widthMm of [141, 143, 145, 147, 149, 151]) {
      const schematic = buildSchematic({ widthMm, heightMm: 65 })
      expect(schematic.artwork.markD.length).toBeGreaterThan(0)
      expect(schematic.artwork.marginMarkD.length).toBeGreaterThan(0)
      expect(schematic.artwork.outlineD).toContain('M')
    }
  })

  it('uses millimetres of the real note as artwork units', () => {
    const schematic = buildSchematic(RP_100000)
    expect(schematic.viewBox).toBe('0 0 151 65')
    expect(schematic.box).toEqual({ width: 151, height: 65 })
  })

  it('refuses degenerate note dimensions', () => {
    expect(() => buildSchematic({ widthMm: 0, heightMm: 65 })).toThrow(/positive/)
  })
})
