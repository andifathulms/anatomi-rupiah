import { isMechanismId, type MechanismId } from '@/lib/art/mechanisms'
import { CHANNEL_LABEL, href, type Locale } from '@/lib/i18n'
import { features } from '@/data/features'
import { denominations } from '@/data/denominations'
import { denominationLabel } from './format'
import { allContent, CHANNEL_ORDER, featuresById } from './index'
import { claimsOf as claimsOfContent } from './validate'
import type { CheckChannel, Citation, Claim, Denomination, Feature } from './schema'

/**
 * View models for the feature pages. Components map over what is here and
 * derive nothing themselves (CLAUDE.md invariant 12).
 */

function say(claim: Claim, locale: Locale): string {
  return claim.text[locale]
}

function citationKey(citation: Citation): string {
  return `${citation.publisher}·${citation.title}·${citation.locator ?? ''}`
}

export interface FeatureCardView {
  readonly id: string
  readonly name: string
  /** Which authored drawing previews this feature on the index. */
  readonly illustration: MechanismId
  readonly channel: CheckChannel
  readonly channelLabel: string
  readonly summary: string
  readonly url: string
  readonly hasLimitation: boolean
}

export function featureCards(locale: Locale): readonly FeatureCardView[] {
  return features.map((feature) => ({
    id: feature.id,
    name: feature.name[locale],
    illustration: isMechanismId(feature.mechanism.illustration)
      ? feature.mechanism.illustration
      : (() => {
          throw new Error(`feature "${feature.id}" names a drawing that does not exist`)
        })(),
    channel: feature.channel,
    channelLabel: CHANNEL_LABEL[feature.channel][locale],
    summary: say(feature.summary, locale),
    url: href(locale, `ciri/${feature.id}`),
    hasLimitation: feature.limitation !== undefined,
  }))
}

export interface FeatureDetailView {
  readonly id: string
  readonly name: string
  readonly channel: CheckChannel
  readonly channelLabel: string
  readonly summary: string
  readonly observe: readonly string[]
  readonly illustration: MechanismId
  readonly caption: string
  readonly steps: readonly string[]
  readonly limitation?: string
  readonly citations: readonly Citation[]
  /** Which denominations this app documents the feature on — PRD §6.1's join,
   * surfaced on the feature side instead of only the denomination side. */
  readonly carriedBy: readonly { readonly id: string; readonly label: string; readonly url: string }[]
}

function claimsOf(feature: Feature): readonly Claim[] {
  return [feature.summary, ...feature.observe, feature.mechanism.caption, ...feature.mechanism.steps]
}

export function featureDetail(locale: Locale, id: string): FeatureDetailView | undefined {
  const feature = features.find((candidate) => candidate.id === id)
  if (feature === undefined) return undefined

  const illustration = feature.mechanism.illustration
  if (!isMechanismId(illustration)) {
    throw new Error(`feature "${feature.id}" names an illustration that does not exist: ${illustration}`)
  }

  const seen = new Map<string, Citation>()
  for (const claim of claimsOf(feature)) {
    for (const citation of claim.citations) {
      if (!seen.has(citationKey(citation))) seen.set(citationKey(citation), citation)
    }
  }

  return {
    id: feature.id,
    name: feature.name[locale],
    channel: feature.channel,
    channelLabel: CHANNEL_LABEL[feature.channel][locale],
    summary: say(feature.summary, locale),
    observe: feature.observe.map((claim) => say(claim, locale)),
    illustration,
    caption: say(feature.mechanism.caption, locale),
    steps: feature.mechanism.steps.map((claim) => say(claim, locale)),
    limitation: feature.limitation?.[locale],
    citations: [...seen.values()],
    carriedBy: denominations
      .filter((denomination) => denomination.placements.some((p) => p.featureId === feature.id))
      .map((denomination) => ({
        id: denomination.id,
        label: denominationLabel(denomination.valueIdr, denomination.emisi),
        url: href(locale, `lembar/${denomination.id}`),
      })),
  }
}

export function featureIds(): readonly string[] {
  return features.map((feature) => feature.id)
}

export interface DenominationChecklistItem {
  readonly featureId: string
  readonly featureName: string
  readonly note: string
  readonly citations: readonly Citation[]
}

export interface DenominationChecklistChannel {
  readonly channel: CheckChannel
  readonly channelLabel: string
  readonly items: readonly DenominationChecklistItem[]
}

export interface DenominationComparisonView {
  readonly label: string
  readonly url: string
  /** Feature names this app documents here but not on the compared emission. */
  readonly onlyHere: readonly string[]
  /** Feature names this app documents there but not on this one. */
  readonly onlyThere: readonly string[]
}

export interface DenominationChecklistView {
  readonly id: string
  readonly label: string
  readonly widthMm: number
  readonly heightMm: number
  readonly byChannel: readonly DenominationChecklistChannel[]
  readonly kodeTunaNetra?: { readonly description: string; readonly citations: readonly Citation[] }
  readonly comparison?: DenominationComparisonView
}

/** The other emission of the same face value, if this app documents one. */
function counterpartOf(denomination: Denomination): Denomination | undefined {
  return denominations.find(
    (candidate) =>
      candidate.id !== denomination.id &&
      candidate.valueIdr === denomination.valueIdr &&
      candidate.emisi !== denomination.emisi,
  )
}

function comparisonFor(locale: Locale, denomination: Denomination): DenominationComparisonView | undefined {
  const counterpart = counterpartOf(denomination)
  if (counterpart === undefined) return undefined

  const here = new Set(denomination.placements.map((p) => p.featureId))
  const there = new Set(counterpart.placements.map((p) => p.featureId))
  const name = (featureId: string) => featuresById.get(featureId)?.name[locale] ?? featureId

  return {
    label: denominationLabel(counterpart.valueIdr, counterpart.emisi),
    url: href(locale, `lembar/${counterpart.id}`),
    onlyHere: [...here].filter((id) => !there.has(id)).map(name),
    onlyThere: [...there].filter((id) => !here.has(id)).map(name),
  }
}

export function denominationIds(): readonly string[] {
  return denominations.map((denomination) => denomination.id)
}

export function denominationChecklist(locale: Locale, id: string): DenominationChecklistView | undefined {
  const denomination = denominations.find((candidate) => candidate.id === id)
  if (denomination === undefined) return undefined

  const byChannel: DenominationChecklistChannel[] = CHANNEL_ORDER.map((channel) => ({
    channel,
    channelLabel: CHANNEL_LABEL[channel][locale],
    items: denomination.placements
      .filter((placement) => featuresById.get(placement.featureId)?.channel === channel)
      .map((placement) => ({
        featureId: placement.featureId,
        featureName: featuresById.get(placement.featureId)?.name[locale] ?? placement.featureId,
        note: say(placement.note, locale),
        citations: placement.note.citations,
      })),
  })).filter((group) => group.items.length > 0)

  return {
    id: denomination.id,
    label: denominationLabel(denomination.valueIdr, denomination.emisi),
    widthMm: denomination.dimensions.widthMm,
    heightMm: denomination.dimensions.heightMm,
    byChannel,
    kodeTunaNetra:
      denomination.kodeTunaNetra === undefined
        ? undefined
        : {
            description: say(denomination.kodeTunaNetra.description, locale),
            citations: denomination.kodeTunaNetra.description.citations,
          },
    comparison: comparisonFor(locale, denomination),
  }
}

export interface SourceView {
  readonly publisher: string
  readonly title: string
  readonly url?: string
  readonly locators: readonly string[]
  /** How many claims across the site point at this source. */
  readonly count: number
}

function sourceKey(citation: Citation): string {
  return `${citation.publisher}·${citation.title}·${citation.url ?? ''}`
}

/**
 * Every citation in the corpus, collapsed to one row per distinct source
 * (publisher + title + url — locators fold into that row) rather than one row
 * per claim. Adds no new claim of its own; it only republishes what every
 * other page already cites (CLAUDE.md invariant 8).
 */
export function allSources(): readonly SourceView[] {
  const grouped = new Map<
    string,
    { publisher: string; title: string; url?: string; locators: Set<string>; count: number }
  >()

  function record(citation: Citation): void {
    const key = sourceKey(citation)
    const entry = grouped.get(key) ?? {
      publisher: citation.publisher,
      title: citation.title,
      url: citation.url,
      locators: new Set<string>(),
      count: 0,
    }
    if (citation.locator !== undefined) entry.locators.add(citation.locator)
    entry.count += 1
    grouped.set(key, entry)
  }

  for (const item of allContent) {
    for (const [, claim] of claimsOfContent(item)) {
      for (const citation of claim.citations) record(citation)
    }
    if (item.type === 'denomination') {
      for (const citation of item.dimensions.citations) record(citation)
    }
  }

  return [...grouped.values()]
    .map((entry) => ({
      publisher: entry.publisher,
      title: entry.title,
      url: entry.url,
      locators: [...entry.locators].sort((a, b) => a.localeCompare(b)),
      count: entry.count,
    }))
    .sort((a, b) => a.publisher.localeCompare(b.publisher) || a.title.localeCompare(b.title))
}
