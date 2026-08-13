import { describe, expect, it } from 'vitest'
import { allContent, denominations, featuresById } from '@/lib/content'
import { claimsOf } from '@/lib/content/validate'
import { allSources, denominationChecklist, denominationIds, featureDetail, featureIds } from '@/lib/content/views'

/**
 * The sources page adds no new claim — it only republishes what every claim
 * in the corpus already cites (CLAUDE.md invariant 8). If a citation went
 * missing from the aggregation, the page would look complete while quietly
 * under-citing the site, which is exactly the failure this guards against.
 */
describe('allSources', () => {
  it('accounts for every citation used anywhere in the corpus', () => {
    let citationCount = 0
    for (const item of allContent) {
      for (const [, claim] of claimsOf(item)) citationCount += claim.citations.length
      if (item.type === 'denomination') citationCount += item.dimensions.citations.length
    }

    const sources = allSources()
    const collapsedCount = sources.reduce((total, source) => total + source.count, 0)
    expect(collapsedCount).toBe(citationCount)
  })

  it('never invents a source with no publisher or title', () => {
    for (const source of allSources()) {
      expect(source.publisher.length).toBeGreaterThan(0)
      expect(source.title.length).toBeGreaterThan(0)
    }
  })
})

describe('featureDetail carriedBy', () => {
  it('lists every denomination whose placements name this feature, and no other', () => {
    for (const id of featureIds()) {
      const detail = featureDetail('id', id)
      expect(detail).toBeDefined()
      const expected = denominations
        .filter((d) => d.placements.some((p) => p.featureId === id))
        .map((d) => d.id)
        .sort()
      const actual = detail?.carriedBy.map((c) => c.id).sort() ?? []
      expect(actual).toEqual(expected)
    }
  })
})

describe('denominationChecklist', () => {
  it('groups every placement under its feature’s channel, and drops none', () => {
    for (const id of denominationIds()) {
      const checklist = denominationChecklist('id', id)
      expect(checklist).toBeDefined()
      const denomination = denominations.find((d) => d.id === id)
      const itemCount = checklist?.byChannel.reduce((total, group) => total + group.items.length, 0) ?? 0
      expect(itemCount).toBe(denomination?.placements.length ?? -1)
    }
  })

  it('never lists an emission comparison against itself', () => {
    for (const id of denominationIds()) {
      const checklist = denominationChecklist('id', id)
      expect(checklist?.comparison?.url.includes(`/${id}`)).not.toBe(true)
    }
  })

  it('finds the TE2016/TE2022 pair for the three shared denominations', () => {
    const shared = ['seratus-ribu', 'lima-puluh-ribu', 'dua-puluh-ribu']
    for (const stem of shared) {
      const modern = denominationChecklist('id', `${stem}-2022`)
      expect(modern?.comparison).toBeDefined()
      expect(modern?.comparison?.label).toContain('TE 2016')
    }
  })

  it('names only real feature names in the comparison, never a bare id', () => {
    const knownNames = new Set([...featuresById.values()].map((f) => f.name.id))
    const modern = denominationChecklist('id', 'dua-puluh-ribu-2022')
    const named = [...(modern?.comparison?.onlyHere ?? []), ...(modern?.comparison?.onlyThere ?? [])]
    expect(named.length).toBeGreaterThan(0)
    for (const name of named) expect(knownNames.has(name)).toBe(true)
  })
})
