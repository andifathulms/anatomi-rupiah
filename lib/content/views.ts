import { isMechanismId, type MechanismId } from '@/lib/art/mechanisms'
import { CHANNEL_LABEL, href, type Locale } from '@/lib/i18n'
import { features } from '@/data/features'
import type { CheckChannel, Citation, Claim, Feature } from './schema'

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
  readonly illustrationAlt: string
  readonly caption: string
  readonly steps: readonly string[]
  readonly limitation?: string
  readonly citations: readonly Citation[]
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
    illustrationAlt: say(feature.mechanism.caption, locale),
    caption: say(feature.mechanism.caption, locale),
    steps: feature.mechanism.steps.map((claim) => say(claim, locale)),
    limitation: feature.limitation?.[locale],
    citations: [...seen.values()],
  }
}

export function featureIds(): readonly string[] {
  return features.map((feature) => feature.id)
}
