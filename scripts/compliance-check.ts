/**
 * pnpm compliance:check — the build gate.
 *
 * This is the cheapest insurance against the only failure in this repository
 * with a criminal penalty attached. It is never bypassed, never given a skip
 * flag, and no assertion in it is ever weakened to make something pass.
 */
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import {
  checkAnatomyMarking,
  checkAssetPolicy,
  checkDependencies,
  checkExportSurface,
  checkLoupeRegions,
  checkMarkingImplementation,
  checkSizeConstraint,
  checkSourcePolicy,
  checkSpesimenPresence,
  renderAllLoupes,
  renderAllSchematics,
  type RepoFile,
  type Violation,
} from '@/lib/compliance/checks'

const ROOT = process.cwd()
const SKIP_DIRS = new Set(['node_modules', '.next', 'out', '.git', '.vercel'])

/**
 * The invariant is about what is *in the repository*, so the scan follows git
 * rather than the filesystem. Untracked working files — a brand asset kit, a
 * scratch directory — are not in the repository and are not the subject.
 *
 * Generated output under public/ is added back explicitly: it is not tracked,
 * but it is published, so the export-surface check has to see it.
 */
function trackedFiles(): RepoFile[] | null {
  try {
    const listing = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8' })
    const paths = listing.split('\0').filter((entry) => entry.length > 0)
    if (paths.length === 0) return null
    return paths
      .filter((path) => existsSync(join(ROOT, path)))
      .map((path) => ({
        path,
        read: () => readFileSync(join(ROOT, path), 'utf8'),
        hash: () => sha256(join(ROOT, path)),
      }))
  } catch {
    return null
  }
}

function sha256(full: string): string {
  return createHash('sha256').update(readFileSync(full)).digest('hex')
}

function walk(dir: string, collected: RepoFile[] = []): RepoFile[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      walk(full, collected)
    } else {
      collected.push({
        path: relative(ROOT, full).split(sep).join('/'),
        read: () => readFileSync(full, 'utf8'),
        hash: () => sha256(full),
      })
    }
  }
  return collected
}

function main(): void {
  // Tracked files where git can tell us, the whole tree otherwise, plus the
  // generated publish surface either way.
  const tracked = trackedFiles()
  const published = existsSync(join(ROOT, 'public')) ? walk(join(ROOT, 'public')) : []
  const byPath = new Map<string, RepoFile>()
  for (const file of [...(tracked ?? walk(ROOT)), ...published]) byPath.set(file.path, file)
  const files = [...byPath.values()]
  const manifest = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
  }
  const rendered = renderAllSchematics()
  const loupes = renderAllLoupes()

  const groups: ReadonlyArray<readonly [string, Violation[]]> = [
    ['asset policy — no raster note imagery', checkAssetPolicy(files)],
    [
      'spesimen presence — marking baked into every schematic and loupe',
      [...checkSpesimenPresence(rendered), ...checkSpesimenPresence(loupes)],
    ],
    ['size constraint — never near actual banknote size', checkSizeConstraint(rendered)],
    ['loupe regions — a detail, never a whole note', checkLoupeRegions()],
    ['hero anatomy — marked and under the size cap', checkAnatomyMarking()],
    ['export surface — mechanism diagrams only, never a note', checkExportSurface(files)],
    ['source policy — no capture, no camera, no runtime network', checkSourcePolicy(files)],
    ['marking implementation — geometry, never an overlay', checkMarkingImplementation(files)],
    ['dependencies — no imaging, camera, or ML packages', checkDependencies(manifest)],
  ]

  let failed = 0
  for (const [label, violations] of groups) {
    if (violations.length === 0) {
      console.log(`  ok   ${label}`)
      continue
    }
    failed += violations.length
    console.error(`  FAIL ${label}`)
    for (const violation of violations) {
      console.error(`       ✗ ${violation.where}\n         ${violation.message}`)
    }
  }

  console.log(
    `\ncompliance:check — ${rendered.length} schematics and ${loupes.length} loupe details rendered, ` +
      `${files.length} files scanned`,
  )

  if (failed > 0) {
    console.error(`compliance:check FAILED with ${failed} violation(s). The build does not proceed.\n`)
    process.exit(1)
  }
  console.log('compliance:check — ok\n')
}

main()
