import { describe, expect, it } from 'vitest'
import {
  TILT_MAX_DEG,
  TILT_MIN_DEG,
  clampTilt,
  colourAtAngle,
  skewForAngle,
  tiltFraction,
} from '@/lib/optics/colour-shift'
import { OVI_FAR, OVI_NEAR } from '@/lib/tokens'

describe('the colour-shift demonstration', () => {
  it('holds the angle inside the range it claims', () => {
    expect(clampTilt(200)).toBe(TILT_MAX_DEG)
    expect(clampTilt(-200)).toBe(TILT_MIN_DEG)
    expect(clampTilt(Number.NaN)).toBe(0)
  })

  it('treats tilting either way as the same distance from head-on', () => {
    expect(colourAtAngle(30)).toBe(colourAtAngle(-30))
    expect(tiltFraction(-45)).toBeCloseTo(tiltFraction(45))
  })

  it('reads head-on as the near colour and full tilt as the far one', () => {
    expect(colourAtAngle(0)).toBe(OVI_NEAR)
    expect(colourAtAngle(TILT_MAX_DEG)).toBe(OVI_FAR)
  })

  it('moves continuously between them', () => {
    const midway = colourAtAngle(TILT_MAX_DEG / 2)
    expect(midway).not.toBe(OVI_NEAR)
    expect(midway).not.toBe(OVI_FAR)
    expect(midway).toMatch(/^#[0-9A-F]{6}$/)
  })

  it('turns the plane with the angle, in the same direction', () => {
    expect(skewForAngle(40)).toBeGreaterThan(0)
    expect(skewForAngle(-40)).toBeLessThan(0)
    expect(skewForAngle(0)).toBe(0)
  })

  it('keeps the demonstration ramp out of the channel taxonomy', async () => {
    const tokens = await import('@/lib/tokens')
    for (const channelInk of Object.values(tokens.CHANNEL_INK)) {
      expect(channelInk).not.toBe(OVI_NEAR)
      expect(channelInk).not.toBe(OVI_FAR)
    }
    expect(tokens.SPESIMEN_INK).not.toBe(OVI_NEAR)
    expect(tokens.SPESIMEN_INK).not.toBe(OVI_FAR)
  })
})
