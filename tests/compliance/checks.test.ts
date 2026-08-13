import { describe, expect, it } from 'vitest'
import {
  checkAssetPolicy,
  checkDependencies,
  checkMarkingImplementation,
  checkSizeConstraint,
  checkSourcePolicy,
  checkSpesimenPresence,
  renderAllSchematics,
  type RepoFile,
} from '@/lib/compliance/checks'

/**
 * A gate nobody has watched fail is not a gate. Each check is exercised against
 * something it must reject as well as something it must accept.
 */

function file(path: string, contents = ''): RepoFile {
  return { path, read: () => contents }
}

describe('asset policy', () => {
  it('rejects raster imagery anywhere in the repository', () => {
    for (const path of [
      'art/schematics/note.png',
      'public/og.jpg',
      'tests/fixtures/sample.webp',
      'docs/screenshot.PNG',
    ]) {
      expect(checkAssetPolicy([file(path)])).toHaveLength(1)
    }
  })

  it('accepts authored vector and source', () => {
    expect(
      checkAssetPolicy([file('art/mechanisms/tanda-air.svg'), file('components/sheet/Schematic.tsx')]),
    ).toEqual([])
  })
})

describe('spesimen presence, over actually rendered schematics', () => {
  const rendered = renderAllSchematics()

  it('renders a schematic for every denomination size in circulation', () => {
    expect(rendered.length).toBeGreaterThanOrEqual(6)
  })

  it('passes the real render', () => {
    expect(checkSpesimenPresence(rendered)).toEqual([])
  })

  it('every rendered schematic carries mark geometry and an inline stroke', () => {
    for (const schematic of rendered) {
      expect(schematic.markup).toContain('data-spesimen="baked"')
      expect(schematic.markup).toMatch(/data-spesimen="baked"[^>]*stroke="/)
    }
  })

  it('rejects a schematic with the marking removed', () => {
    const stripped = rendered.map((s) => ({
      ...s,
      markup: s.markup.replace(/data-spesimen="baked"/g, 'data-decoration="x"'),
    }))
    expect(checkSpesimenPresence(stripped).length).toBe(rendered.length)
  })

  it('rejects a marking that depends on a stylesheet', () => {
    const classStyled = [
      {
        caption: 'Rp100.000',
        markup: '<path data-spesimen="baked" d="M0 0L1 1" class="stroke-spesimen"/>',
        widthPx: 100,
        widthMm: 151,
      },
    ]
    expect(checkSpesimenPresence(classStyled).length).toBeGreaterThan(0)
  })
})

describe('size constraint, over actually rendered schematics', () => {
  it('passes the real render', () => {
    expect(checkSizeConstraint(renderAllSchematics())).toEqual([])
  })

  it('rejects a schematic inflated toward actual size', () => {
    const oversized = renderAllSchematics().map((s) => ({ ...s, widthPx: s.widthPx * 2 }))
    expect(checkSizeConstraint(oversized).length).toBe(oversized.length)
  })
})

describe('source policy', () => {
  it('rejects capture, camera, upload, and network paths in shipped source', () => {
    const cases = [
      'const url = canvas.toDataURL()',
      'navigator.mediaDevices.getUserMedia({ video: true })',
      'await fetch("/api/x")',
      'const s = new WebSocket("wss://x")',
      '<input type="file" accept="image/*" />',
      'href="https://fonts.googleapis.com/css2"',
    ]
    for (const source of cases) {
      expect(checkSourcePolicy([file('app/[locale]/page.tsx', source)]).length).toBeGreaterThan(0)
    }
  })

  it('leaves ordinary component source alone', () => {
    expect(
      checkSourcePolicy([file('components/sheet/Sheet.tsx', 'export function Sheet() { return null }')]),
    ).toEqual([])
  })

  it('ignores files that are not shipped', () => {
    expect(checkSourcePolicy([file('scripts/x.ts', 'await fetch("/x")')])).toEqual([])
  })
})

describe('marking implementation', () => {
  it('rejects the marking reimplemented as a pseudo-element or a positioned layer', () => {
    const cases = [
      file('components/sheet/mark.css', '.mark::after { content: "SPESIMEN" }'),
      file('components/sheet/Mark.tsx', '<div className="absolute inset-0">SPESIMEN</div>'),
      file('lib/spesimen/bad.ts', 'const style = "position: absolute"'),
    ]
    for (const candidate of cases) {
      expect(checkMarkingImplementation([candidate]).length).toBeGreaterThan(0)
    }
  })

  it('accepts the geometry implementation as written', () => {
    expect(
      checkMarkingImplementation([
        file('lib/spesimen/index.ts', 'export function bakeSpesimen() { return { markD: "M0 0" } }'),
      ]),
    ).toEqual([])
  })
})

describe('dependencies', () => {
  it('rejects imaging, camera, and ML packages', () => {
    expect(
      checkDependencies({
        dependencies: { sharp: '^0.33.0' },
        devDependencies: { '@tensorflow/tfjs': '^4.0.0' },
      }),
    ).toHaveLength(2)
  })

  it('accepts the manifest as it stands', () => {
    expect(
      checkDependencies({ dependencies: { next: '14.2.15', zod: '3.23.8' }, devDependencies: {} }),
    ).toEqual([])
  })
})
