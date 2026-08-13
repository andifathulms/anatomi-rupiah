import {
  contentSchema,
  type Claim,
  type Content,
  type Denomination,
  type Feature,
  type Figure,
  type Motif,
} from './schema'

/**
 * Content validation, in three passes.
 *
 *  1. Shape — the Zod schema. An uncited claim has no representable form.
 *  2. Register — PRD §4. Prose that describes manufacture rather than checking
 *     is rejected here, ahead of the documented human review, not instead of it.
 *  3. References — a placement pointing at a feature that does not exist, or a
 *     denomination naming a figure nobody wrote, is a broken claim.
 */

export interface ContentIssue {
  readonly kind: 'shape' | 'register' | 'verdict' | 'reference'
  readonly where: string
  readonly message: string
}

/**
 * PRD §4: explaining how a feature works and how to check it is education;
 * explaining how it is made, or how a counterfeit might approximate it, is
 * uplift. These patterns catch the manufacturing register in either language.
 */
const MANUFACTURE_PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bcara\s+(mem)?buat\b/i, 'describes how to make something'],
  [/\bcara\s+memalsukan\b/i, 'describes how to counterfeit'],
  [/\bhow\s+to\s+(make|produce|manufacture|replicate|forge|counterfeit)\b/i, 'describes production'],
  [/\bkomposisi\s+(tinta|kertas|bahan|serat)\b/i, 'discloses material composition'],
  [/\b(ink|pigment|dye|substrate|paper)\s+(formulation|recipe|composition|chemistry)\b/i, 'discloses material composition'],
  [/\bresep\b/i, 'reads as a recipe'],
  [/\b(suhu|tekanan|toleransi)\s+(cetak|pencetakan)\b/i, 'discloses process parameters'],
  [/\b(print|press)(ing)?\s+(temperature|pressure|tolerance)s?\b/i, 'discloses process parameters'],
  [/\bsolvent|pelarut\b/i, 'discloses ink chemistry'],
  [/\bdapat\s+ditiru\s+dengan\b/i, 'describes how the feature could be approximated'],
  [/\b(replicate|reproduce|approximate)\s+(this|the)\s+(feature|effect)\b/i, 'describes how the feature could be approximated'],
]

/** CLAUDE.md invariant 6: the app never renders an authenticity verdict. */
const VERDICT_PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\buang\s+(ini|anda|kamu)\s+(asli|palsu)\b/i, 'renders a verdict on a specific note'],
  [/\bis\s+(this|your)\s+note\s+(real|genuine|fake)\b/i, 'renders a verdict on a specific note'],
  [/\b(looks|appears)\s+genuine\b/i, 'renders a verdict on a specific note'],
  [/\b(terbukti|dipastikan)\s+asli\b/i, 'renders a verdict on a specific note'],
]

function screen(text: string, where: string, issues: ContentIssue[]): void {
  for (const [pattern, message] of MANUFACTURE_PATTERNS) {
    if (pattern.test(text)) issues.push({ kind: 'register', where, message: `PRD §4: ${message}` })
  }
  for (const [pattern, message] of VERDICT_PATTERNS) {
    if (pattern.test(text)) issues.push({ kind: 'verdict', where, message: `PRD §2: ${message}` })
  }
}

function checkClaim(claim: Claim, where: string, issues: ContentIssue[]): void {
  if (claim.citations.length === 0) {
    issues.push({ kind: 'shape', where, message: 'claim carries no citation' })
  }
  claim.citations.forEach((citation, index) => {
    if (citation.url === undefined && citation.locator === undefined) {
      issues.push({
        kind: 'shape',
        where: `${where}.citations[${index}]`,
        message: 'a citation needs a url or a locator, otherwise it cannot be followed',
      })
    }
  })
  screen(claim.text.id, `${where}.id`, issues)
  screen(claim.text.en, `${where}.en`, issues)
}

function claimsOf(item: Content): ReadonlyArray<readonly [string, Claim]> {
  switch (item.type) {
    case 'feature': {
      const feature: Feature = item
      return [
        [`feature:${feature.id}.summary`, feature.summary],
        ...feature.observe.map((c, i) => [`feature:${feature.id}.observe[${i}]`, c] as const),
        [`feature:${feature.id}.mechanism.caption`, feature.mechanism.caption],
        ...feature.mechanism.steps.map(
          (c, i) => [`feature:${feature.id}.mechanism.steps[${i}]`, c] as const,
        ),
      ]
    }
    case 'denomination': {
      const note: Denomination = item
      return [
        ...note.placements.map(
          (p, i) => [`denomination:${note.id}.placements[${i}].note`, p.note] as const,
        ),
        [`denomination:${note.id}.kodeTunaNetra`, note.kodeTunaNetra.description],
      ]
    }
    case 'figure': {
      const figure: Figure = item
      return figure.claims.map((c, i) => [`figure:${figure.id}.claims[${i}]`, c] as const)
    }
    case 'motif': {
      const motif: Motif = item
      return motif.claims.map((c, i) => [`motif:${motif.id}.claims[${i}]`, c] as const)
    }
    default: {
      const exhaustive: never = item
      return exhaustive
    }
  }
}

export function validateContent(items: readonly unknown[]): ContentIssue[] {
  const issues: ContentIssue[] = []
  const parsed: Content[] = []

  items.forEach((raw, index) => {
    const result = contentSchema.safeParse(raw)
    if (!result.success) {
      for (const issue of result.error.issues) {
        issues.push({
          kind: 'shape',
          where: `item[${index}].${issue.path.join('.')}`,
          message: issue.message,
        })
      }
      return
    }
    parsed.push(result.data)
  })

  for (const item of parsed) {
    for (const [where, claim] of claimsOf(item)) checkClaim(claim, where, issues)
  }

  // Dimensions are a claim about the world too, and get cited like any other.
  for (const item of parsed) {
    if (item.type === 'denomination' && item.dimensions.citations.length === 0) {
      issues.push({
        kind: 'shape',
        where: `denomination:${item.id}.dimensions`,
        message: 'note dimensions carry no citation',
      })
    }
  }

  const featureIds = new Set(parsed.filter((i) => i.type === 'feature').map((i) => i.id))
  const figureIds = new Set(parsed.filter((i) => i.type === 'figure').map((i) => i.id))
  const motifIds = new Set(parsed.filter((i) => i.type === 'motif').map((i) => i.id))

  for (const item of parsed) {
    if (item.type !== 'denomination') continue
    if (!figureIds.has(item.figureId)) {
      issues.push({
        kind: 'reference',
        where: `denomination:${item.id}.figureId`,
        message: `no figure "${item.figureId}"`,
      })
    }
    if (!motifIds.has(item.motifId)) {
      issues.push({
        kind: 'reference',
        where: `denomination:${item.id}.motifId`,
        message: `no motif "${item.motifId}"`,
      })
    }
    item.placements.forEach((placement, index) => {
      if (!featureIds.has(placement.featureId)) {
        issues.push({
          kind: 'reference',
          where: `denomination:${item.id}.placements[${index}]`,
          message: `no feature "${placement.featureId}"`,
        })
      }
      const { region } = placement
      if (
        region.xMm + region.widthMm > item.dimensions.widthMm + 0.001 ||
        region.yMm + region.heightMm > item.dimensions.heightMm + 0.001
      ) {
        issues.push({
          kind: 'reference',
          where: `denomination:${item.id}.placements[${index}].region`,
          message: 'region falls outside the note',
        })
      }
    })
  }

  return issues
}
