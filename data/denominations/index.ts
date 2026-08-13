import type { Denomination } from '@/lib/content/schema'
import { te2016 } from './te-2016'
import { te2022 } from './te-2022'

/** Current series first, then the 2016 series, which is still legal tender. */
export const denominations: readonly Denomination[] = [...te2022, ...te2016]
