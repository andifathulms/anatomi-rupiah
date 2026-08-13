import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { checkAssetPolicy, checkExportSurface, type RepoFile } from '@/lib/compliance/checks'
import { BRAND_RASTER_ALLOWLIST } from '@/lib/compliance/brand-assets'
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

describe('the raster allow-list', () => {
  const pinnedPath = 'public/brand/icon-192.png'
  const pinnedHash = BRAND_RASTER_ALLOWLIST[pinnedPath]

  it('pins every allowed raster to a full sha-256', () => {
    const entries = Object.entries(BRAND_RASTER_ALLOWLIST)
    expect(entries.length).toBeGreaterThan(0)
    for (const [path, hash] of entries) {
      expect(path.startsWith('public/brand/')).toBe(true)
      expect(hash).toMatch(/^[a-f0-9]{64}$/)
    }
  })

  it('accepts an allow-listed raster whose bytes still match', () => {
    expect(
      checkAssetPolicy([{ path: pinnedPath, read: () => '', hash: () => pinnedHash ?? '' }]),
    ).toEqual([])
  })

  it('rejects an allow-listed path whose bytes have changed', () => {
    const swapped = checkAssetPolicy([
      { path: pinnedPath, read: () => '', hash: () => 'f'.repeat(64) },
    ])
    expect(swapped.length).toBe(1)
    expect(swapped[0]?.message).toMatch(/pinned hash/)
  })

  it('refuses an allow-listed raster it cannot hash', () => {
    expect(checkAssetPolicy([{ path: pinnedPath, read: () => '' }]).length).toBe(1)
  })

  it('still rejects a raster at any other path, brand folder included', () => {
    for (const path of ['public/brand/sneaky.png', 'art/note.png', 'docs/shot.jpg']) {
      expect(checkAssetPolicy([{ path, read: () => '', hash: () => 'a'.repeat(64) }]).length).toBe(1)
    }
  })

  it('matches the files actually on disk', () => {
    for (const [path, hash] of Object.entries(BRAND_RASTER_ALLOWLIST)) {
      const full = join(process.cwd(), path)
      expect(existsSync(full)).toBe(true)
      expect(createHash('sha256').update(readFileSync(full)).digest('hex')).toBe(hash)
    }
  })
})
