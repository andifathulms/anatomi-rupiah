import { INSPECT, PROOF } from '@/lib/tokens'

/**
 * The web app manifest, built from a basePath.
 *
 * Not `app/manifest.ts`: Next's file-based manifest emits its <link> without
 * the basePath, which 404s on GitHub Pages and silently breaks installation.
 * Generating the file at postbuild and pointing at it with an explicit path
 * keeps the link under our control, with one source of truth for the contents.
 *
 * Installable and offline by construction — the export makes no network
 * request at runtime, so there is nothing to be offline from.
 */
export function buildManifest(basePath: string): string {
  const at = (path: string) => `${basePath}${path}`

  return JSON.stringify(
    {
      name: 'Anatomi Rupiah',
      short_name: 'Anatomi Rupiah',
      description:
        'Cara kerja unsur pengaman uang Rupiah, dan cara memeriksanya. Skema bertanda SPESIMEN.',
      lang: 'id',
      start_url: at('/id/'),
      scope: at('/'),
      display: 'standalone',
      background_color: PROOF,
      theme_color: INSPECT,
      icons: [
        { src: at('/brand/mark-ink.svg'), sizes: 'any', type: 'image/svg+xml' },
        { src: at('/brand/icon-192.png'), sizes: '192x192', type: 'image/png' },
        { src: at('/brand/icon-512.png'), sizes: '512x512', type: 'image/png' },
        {
          src: at('/brand/icon-maskable-512.png'),
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    null,
    2,
  )
}
