import { describe, expect, it } from 'vitest'
import { thicknessAt, transmissionAt } from '@/lib/optics/transmission'

describe('the light-table transmission field', () => {
  it('is thinner at the lens centre than on the bare sheet', () => {
    expect(thicknessAt(0.38, 0.5)).toBeLessThan(thicknessAt(0.05, 0.05))
  })

  it('transmits more light where the material is thinner', () => {
    const atLens = transmissionAt(0.38, 0.5)
    const onBareSheet = transmissionAt(0.05, 0.05)
    expect(atLens).toBeGreaterThan(onBareSheet)
  })

  it('stays a fraction between 0 and 1', () => {
    for (const [x, y] of [[0.38, 0.5], [0.68, 0.5], [0, 0], [1, 1], [0.5, 0.5]] as const) {
      const value = transmissionAt(x, y)
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThanOrEqual(1)
    }
  })
})
