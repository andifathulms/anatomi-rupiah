import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { Schematic } from '@/components/sheet/Schematic'
import { hasBakedMark } from '@/lib/spesimen'
import {
  FORBIDDEN_SCALE_BAND,
  MAX_SCHEMATIC_SCALE,
  PX_PER_MM,
  isInsideForbiddenBand,
} from '@/lib/schematic'
import { schematicViewModel } from '@/lib/schematic/view-model'
import { denominations } from '@/data/denominations'

/**
 * The compliance checks, as a library so tests and the build script run exactly
 * the same assertions. These gate the build. They are never bypassed, never
 * given a skip flag, and never weakened. CLAUDE.md, working style.
 */

export interface Violation {
  readonly check: string
  readonly where: string
  readonly message: string
}

export interface RepoFile {
  /** Repository-relative path, forward slashes. */
  readonly path: string
  readonly read: () => string
}

/* ------------------------------------------------------------------ *
 * 1. No raster banknote imagery, anywhere in the repository.
 * ------------------------------------------------------------------ */

const RASTER_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.bmp', '.tif', '.tiff']

export function checkAssetPolicy(files: readonly RepoFile[]): Violation[] {
  const violations: Violation[] = []
  for (const file of files) {
    const lower = file.path.toLowerCase()
    if (RASTER_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
      violations.push({
        check: 'asset-policy',
        where: file.path,
        message:
          'raster image in the repository. All note artwork is original authored SVG, and a ' +
          'photograph of a note must never exist here. Draw it better instead.',
      })
    }
  }
  return violations
}

/* ------------------------------------------------------------------ *
 * 2. Every schematic renders with the marking baked into the artwork.
 * ------------------------------------------------------------------ */

/**
 * Sizes exercised even when the corpus is empty, so the marking is asserted
 * from M0 onward rather than from the first denomination authored.
 */
const REFERENCE_SIZES: ReadonlyArray<{ readonly caption: string; readonly widthMm: number }> = [
  { caption: 'Rp1.000', widthMm: 141 },
  { caption: 'Rp5.000', widthMm: 143 },
  { caption: 'Rp10.000', widthMm: 145 },
  { caption: 'Rp20.000', widthMm: 147 },
  { caption: 'Rp50.000', widthMm: 149 },
  { caption: 'Rp100.000', widthMm: 151 },
]

interface RenderedSchematic {
  readonly caption: string
  readonly markup: string
  readonly widthPx: number
  readonly widthMm: number
}

export function renderAllSchematics(): RenderedSchematic[] {
  const fromCorpus = denominations.map((note) => ({
    caption: `Rp${note.valueIdr.toLocaleString('id-ID')}`,
    size: { widthMm: note.dimensions.widthMm, heightMm: note.dimensions.heightMm },
  }))

  const fromReference = REFERENCE_SIZES.map((entry) => ({
    caption: entry.caption,
    size: { widthMm: entry.widthMm, heightMm: 65 },
  }))

  return [...fromCorpus, ...fromReference].map((entry) => {
    const model = schematicViewModel({ size: entry.size, caption: entry.caption })
    return {
      caption: entry.caption,
      markup: renderToStaticMarkup(createElement(Schematic, { model })),
      widthPx: model.widthPx,
      widthMm: entry.size.widthMm,
    }
  })
}

export function checkSpesimenPresence(rendered: readonly RenderedSchematic[]): Violation[] {
  const violations: Violation[] = []
  for (const schematic of rendered) {
    if (!hasBakedMark(schematic.markup)) {
      violations.push({
        check: 'spesimen-presence',
        where: schematic.caption,
        message:
          'schematic rendered without baked SPESIMEN geometry. UU 7/2011 Pasal 24 ayat (1) ' +
          'conditions the educational exemption on the marking being applied.',
      })
      continue
    }
    // A mark drawn with a stylesheet is a mark that disappears without one.
    if (/data-spesimen="baked"[^>]*class=/.test(schematic.markup)) {
      violations.push({
        check: 'spesimen-presence',
        where: schematic.caption,
        message: 'the marking is styled by class; it must carry inline presentation attributes.',
      })
    }
    if (!/data-spesimen="baked"[^>]*stroke="/.test(schematic.markup)) {
      violations.push({
        check: 'spesimen-presence',
        where: schematic.caption,
        message: 'the marking has no inline stroke and would vanish with the stylesheet disabled.',
      })
    }
  }
  return violations
}

/* ------------------------------------------------------------------ *
 * 3. No schematic renders at, or near, actual banknote dimensions.
 * ------------------------------------------------------------------ */

export function checkSizeConstraint(rendered: readonly RenderedSchematic[]): Violation[] {
  const violations: Violation[] = []
  for (const schematic of rendered) {
    const scale = schematic.widthPx / (schematic.widthMm * PX_PER_MM)
    if (isInsideForbiddenBand(scale) || scale > MAX_SCHEMATIC_SCALE) {
      violations.push({
        check: 'size-constraint',
        where: schematic.caption,
        message:
          `renders at ${(scale * 100).toFixed(1)}% of actual size. The cap is ` +
          `${MAX_SCHEMATIC_SCALE * 100}%, below the ${FORBIDDEN_SCALE_BAND.min * 100}–` +
          `${FORBIDDEN_SCALE_BAND.max * 100}% reproduction band.`,
      })
    }
  }
  return violations
}

/* ------------------------------------------------------------------ *
 * 4. No capture, no verdict, no runtime network.
 * ------------------------------------------------------------------ */

interface SourceRule {
  readonly pattern: RegExp
  readonly message: string
}

/** PRD §2 and §5: nothing that could emit a note file or judge a note. */
const FORBIDDEN_SOURCE: readonly SourceRule[] = [
  { pattern: /\btoDataURL\b/, message: 'canvas capture could emit a full-note image (PRD §2)' },
  { pattern: /\btoBlob\b/, message: 'canvas capture could emit a full-note image (PRD §2)' },
  { pattern: /\bhtml2canvas\b/, message: 'DOM capture could emit a full-note image (PRD §2)' },
  { pattern: /getContext\(\s*['"]2d['"]/, message: 'no raster canvas path exists here (PRD §2)' },
  { pattern: /\bgetUserMedia\b/, message: 'no camera input, ever (PRD §2, invariant 6)' },
  { pattern: /\bMediaDevices\b/, message: 'no camera input, ever (PRD §2, invariant 6)' },
  { pattern: /<input[^>]+type=["']file["']/, message: 'no image upload path (invariant 6)' },
  { pattern: /\bnavigator\.sendBeacon\b/, message: 'no runtime network (invariant 11)' },
  { pattern: /\bnew\s+WebSocket\b/, message: 'no runtime network (invariant 11)' },
  { pattern: /\bnew\s+XMLHttpRequest\b/, message: 'no runtime network (invariant 11)' },
  { pattern: /\bfetch\s*\(/, message: 'no runtime network (invariant 11)' },
  {
    pattern: /https?:\/\/fonts\.(googleapis|gstatic)\.com/,
    message: 'fonts are self-hosted via next/font; no font CDN (invariant 11)',
  },
]

/** Directories whose source is shipped to the browser or renders the artwork. */
const SHIPPED_PREFIXES = ['app/', 'components/', 'lib/']

export function checkSourcePolicy(files: readonly RepoFile[]): Violation[] {
  const violations: Violation[] = []
  for (const file of files) {
    if (!SHIPPED_PREFIXES.some((prefix) => file.path.startsWith(prefix))) continue
    if (!/\.(ts|tsx)$/.test(file.path)) continue
    // The rule table itself contains the strings it bans.
    if (file.path === 'lib/compliance/checks.ts') continue

    const source = file.read()
    for (const rule of FORBIDDEN_SOURCE) {
      if (rule.pattern.test(source)) {
        violations.push({ check: 'source-policy', where: file.path, message: rule.message })
      }
    }
  }
  return violations
}

/* ------------------------------------------------------------------ *
 * 5. The marking is never reimplemented as an overlay.
 * ------------------------------------------------------------------ */

const OVERLAY_PATTERNS: readonly SourceRule[] = [
  { pattern: /::(before|after)/, message: 'the marking must not be a pseudo-element' },
  { pattern: /position\s*:\s*absolute/, message: 'the marking must not be a positioned layer' },
  {
    pattern: /className=["'][^"']*\babsolute\b/,
    message: 'the marking must not be a positioned layer',
  },
  { pattern: /\bcontent:\s*['"]SPESIMEN/i, message: 'the marking must be geometry, not CSS content' },
]

export function checkMarkingImplementation(files: readonly RepoFile[]): Violation[] {
  const violations: Violation[] = []
  for (const file of files) {
    if (!file.path.startsWith('lib/spesimen/') && !file.path.startsWith('components/sheet/')) continue
    if (!/\.(ts|tsx|css)$/.test(file.path)) continue

    const source = file.read()
    for (const rule of OVERLAY_PATTERNS) {
      if (rule.pattern.test(source)) {
        violations.push({
          check: 'marking-implementation',
          where: file.path,
          message: `${rule.message} (invariant 1)`,
        })
      }
    }
  }
  return violations
}

/* ------------------------------------------------------------------ *
 * 6. No dependency that only makes sense for imaging, camera, or ML.
 * ------------------------------------------------------------------ */

const FORBIDDEN_DEPENDENCIES = [
  'sharp',
  'jimp',
  'canvas',
  'node-canvas',
  'html2canvas',
  'dom-to-image',
  'tesseract.js',
  'opencv',
  'opencv4nodejs',
  '@tensorflow/tfjs',
  'onnxruntime-web',
  'react-webcam',
  'quagga',
  'zxing',
]

export function checkDependencies(manifest: {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}): Violation[] {
  const declared = Object.keys({ ...manifest.dependencies, ...manifest.devDependencies })
  return declared
    .filter((name) => FORBIDDEN_DEPENDENCIES.some((banned) => name === banned || name.startsWith(`${banned}/`)))
    .map((name) => ({
      check: 'dependencies',
      where: 'package.json',
      message: `"${name}" is an imaging, camera, or ML dependency. None has a legitimate use here.`,
    }))
}
