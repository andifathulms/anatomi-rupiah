import { denominations } from '@/data/denominations'
import { features } from '@/data/features'
import { figures } from '@/data/figures'
import { motifs } from '@/data/motifs'
import type { Content, Denomination, Feature, Figure, Motif } from './schema'
import { validateContent } from './validate'

export * from './schema'
export { validateContent } from './validate'
export type { ContentIssue } from './validate'

/**
 * The content corpus, validated once at module load.
 *
 * A build that would ship an uncited claim fails here rather than serving it.
 * Nothing downstream re-validates, and nothing computes in a component — the
 * lookups below are the only shape the views ever see.
 */

export const allContent: readonly Content[] = [...features, ...denominations, ...figures, ...motifs]

const issues = validateContent(allContent)
if (issues.length > 0) {
  const report = issues.map((i) => `  ${i.kind} · ${i.where}: ${i.message}`).join('\n')
  throw new Error(`Content failed validation:\n${report}`)
}

export const featuresById: ReadonlyMap<string, Feature> = new Map(features.map((f) => [f.id, f]))
export const denominationsById: ReadonlyMap<string, Denomination> = new Map(
  denominations.map((d) => [d.id, d]),
)
export const figuresById: ReadonlyMap<string, Figure> = new Map(figures.map((f) => [f.id, f]))
export const motifsById: ReadonlyMap<string, Motif> = new Map(motifs.map((m) => [m.id, m]))

export { denominations, features, figures, motifs }

export function featureById(id: string): Feature | undefined {
  return featuresById.get(id)
}

export function denominationById(id: string): Denomination | undefined {
  return denominationsById.get(id)
}

/** Features grouped by BI's checking channel, ordered as the campaign teaches them. */
export const CHANNEL_ORDER = ['dilihat', 'diraba', 'diterawang', 'mesin'] as const

export const featuresByChannel: ReadonlyArray<{
  readonly channel: (typeof CHANNEL_ORDER)[number]
  readonly features: readonly Feature[]
}> = CHANNEL_ORDER.map((channel) => ({
  channel,
  features: features.filter((f) => f.channel === channel),
}))
