/**
 * Static-export finishing touches.
 *
 * `.nojekyll` so GitHub Pages serves the export verbatim, and a root document
 * that sends visitors to the Indonesian entry point. The redirect is a meta
 * refresh plus a plain link — no script, no network, works with JS disabled.
 */
import { existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { DEFAULT_LOCALE } from '@/lib/i18n'
import { buildManifest } from '@/lib/brand/manifest'

const OUT = join(process.cwd(), 'out')
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/anatomi-rupiah'

function main(): void {
  if (!existsSync(OUT)) {
    console.error('postbuild: ./out does not exist. Run the export first.')
    process.exit(1)
  }

  writeFileSync(join(OUT, '.nojekyll'), '')
  writeFileSync(join(OUT, 'site.webmanifest'), buildManifest(BASE_PATH))

  const target = `${BASE_PATH}/${DEFAULT_LOCALE}/`
  writeFileSync(
    join(OUT, 'index.html'),
    `<!doctype html>
<html lang="${DEFAULT_LOCALE}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${target}" />
    <title>Anatomi Rupiah</title>
  </head>
  <body>
    <p><a href="${target}">Anatomi Rupiah</a></p>
  </body>
</html>
`,
  )

  console.log(`postbuild — .nojekyll and site.webmanifest written, / redirects to ${target}`)
}

main()
