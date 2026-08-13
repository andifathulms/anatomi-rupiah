/**
 * Publishes the mechanism illustrations as downloadable files.
 *
 * PRD §2 and §6: sharing exports the *mechanism diagram*, never the note. This
 * script copies only art/mechanisms — the schematics in lib are never written
 * to a public path, and the compliance gate asserts that the entire public
 * surface stays free of note artwork.
 */
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { MECHANISM_IDS, mechanismSvg } from '@/lib/art/mechanisms'

const OUT_DIR = join(process.cwd(), 'public', 'mekanisme')

function main(): void {
  rmSync(OUT_DIR, { recursive: true, force: true })
  mkdirSync(OUT_DIR, { recursive: true })

  for (const id of MECHANISM_IDS) {
    // mechanismSvg re-checks that the artwork is inert before it is published.
    const markup = mechanismSvg(id)
    if (markup.includes('data-spesimen') || markup.includes('data-schematic')) {
      throw new Error(`export: "${id}" carries schematic artwork and must not be published.`)
    }
    const source = join(process.cwd(), 'art', 'mechanisms', `${id}.svg`)
    copyFileSync(source, join(OUT_DIR, `${id}.svg`))
  }

  writeFileSync(
    join(OUT_DIR, 'README.txt'),
    'Diagram mekanisme dari Anatomi Rupiah.\n' +
      'Hanya diagram mekanisme yang dibagikan di sini. Skema uang tidak pernah diekspor.\n\n' +
      'Mechanism diagrams from Anatomi Rupiah.\n' +
      'Only mechanism diagrams are shared here. Note schematics are never exported.\n',
  )

  const total = MECHANISM_IDS.map((id) => readFileSync(join(OUT_DIR, `${id}.svg`), 'utf8').length)
  console.log(
    `export:mechanisms — ${MECHANISM_IDS.length} diagrams published, ` +
      `${Math.round(total.reduce((a, b) => a + b, 0) / 1024)} KB total`,
  )
}

main()
