import type { CheckChannel } from '@/lib/content/schema'

/**
 * Tailwind-class lookup tables derived from the channel taxonomy in
 * lib/tokens.ts, shared so the same four values aren't hand-duplicated
 * across every page and component that needs them. Found drifting under
 * three different names (CHANNEL_TEXT, CHANNEL_ACCENT, CHANNEL_RULE,
 * BORDER_CHANNEL) for the same values in the 2026-08-14 polish pass.
 */

/** Deep-toned text color per channel, for text on the proof/proof-deep ground. */
export const CHANNEL_TEXT_DEEP: Record<CheckChannel, string> = {
  dilihat: 'text-dilihat-deep',
  diraba: 'text-diraba-deep',
  diterawang: 'text-diterawang-deep',
  mesin: 'text-mesin-deep',
}

/** Full-saturation border color per channel. Callers add the side/width
 * (border-l-4, border-t-4, …) their own layout needs. */
export const CHANNEL_BORDER: Record<CheckChannel, string> = {
  dilihat: 'border-dilihat',
  diraba: 'border-diraba',
  diterawang: 'border-diterawang',
  mesin: 'border-mesin',
}

/** Same four colors as a top-edge border utility, for callers whose accent
 * sits on the top rather than the side. */
export const CHANNEL_BORDER_TOP: Record<CheckChannel, string> = {
  dilihat: 'border-t-dilihat',
  diraba: 'border-t-diraba',
  diterawang: 'border-t-diterawang',
  mesin: 'border-t-mesin',
}
