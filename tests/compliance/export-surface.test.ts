import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { checkExportSurface, type RepoFile } from '@/lib/compliance/checks'
import { MECHANISM_IDS } from '@/lib/art/mechanisms'

function file(path: string, contents = ''): RepoFile {
  return { path, read: () => contents }
}

describe('the export surface', () => {
  it('accepts a published mechanism diagram', () => {
    expect(checkExportSurface([file('public/mekanisme/tanda-air.svg', '<svg><path/></svg>')])).toEqual(
      [],
    )
  })

  it('rejects note artwork published as a file', () => {
    for (const marker of ['data-spesimen', 'data-schematic', 'data-loupe']) {
      const violations = checkExportSurface([
        file('public/mekanisme/leaked.svg', `<svg><path ${marker}="x" d="M0 0"/></svg>`),
      ])
      expect(violations.length).toBeGreaterThan(0)
    }
  })

  it('rejects artwork published outside the mechanism directory', () => {
    expect(checkExportSurface([file('public/note.svg', '<svg/>')]).length).toBeGreaterThan(0)
  })

  it('rejects an unexpected file type on the public surface', () => {
    expect(checkExportSurface([file('public/note.pdf')]).length).toBeGreaterThan(0)
    expect(checkExportSurface([file('public/note.png')]).length).toBeGreaterThan(0)
  })

  it('passes over what export:mechanisms actually wrote', () => {
    const dir = join(process.cwd(), 'public', 'mekanisme')
    if (!existsSync(dir)) return // export step has not run in this working tree

    const published = readdirSync(dir).map((name) =>
      file(`public/mekanisme/${name}`, readFileSync(join(dir, name), 'utf8')),
    )
    expect(checkExportSurface(published)).toEqual([])
    expect(published.filter((f) => f.path.endsWith('.svg'))).toHaveLength(MECHANISM_IDS.length)
  })
})
