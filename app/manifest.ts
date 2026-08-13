import type { MetadataRoute } from 'next'
import { assetPath } from '@/lib/paths'
import { PROOF, INSPECT } from '@/lib/tokens'

/**
 * Installable, and offline by construction: the site is a static export that
 * makes no network request at runtime, so there is nothing to be offline from.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Anatomi Rupiah',
    short_name: 'Anatomi Rupiah',
    description:
      'Cara kerja unsur pengaman uang Rupiah, dan cara memeriksanya. Skema bertanda SPESIMEN.',
    lang: 'id',
    start_url: assetPath('/id/'),
    scope: assetPath('/'),
    display: 'standalone',
    background_color: PROOF,
    theme_color: INSPECT,
    icons: [
      { src: assetPath('/brand/mark-ink.svg'), sizes: 'any', type: 'image/svg+xml' },
      { src: assetPath('/brand/icon-192.png'), sizes: '192x192', type: 'image/png' },
      { src: assetPath('/brand/icon-512.png'), sizes: '512x512', type: 'image/png' },
      {
        src: assetPath('/brand/icon-maskable-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
