/**
 * pnpm compliance:check — the build gate.
 *
 * This is the cheapest insurance against the only failure in this repository
 * with a criminal penalty attached. It is never bypassed, never given a skip
 * flag, and no assertion in it is ever weakened to make something pass.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
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
      })
    }
  }
  return collected
}

function main(): void {
  const files = walk(ROOT)
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
