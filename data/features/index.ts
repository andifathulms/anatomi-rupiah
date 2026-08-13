import type { Feature } from '@/lib/content/schema'
import { benangPengaman } from './benang-pengaman'
import { cetakIntaglio } from './cetak-intaglio'
import { gambarSalingIsi } from './gambar-saling-isi'
import { mikroteks } from './mikroteks'
import { tandaAir } from './tanda-air'
import { tintaBerubahWarna } from './tinta-berubah-warna'
import { tintaTampakUv } from './tinta-tampak-uv'

/**
 * Ordered as a reader meets them: the checks needing nothing but hands and a
 * window first, then the ones needing a loupe or a lamp.
 */
export const features: readonly Feature[] = [
  tandaAir,
  benangPengaman,
  gambarSalingIsi,
  cetakIntaglio,
  tintaBerubahWarna,
  mikroteks,
  tintaTampakUv,
]
