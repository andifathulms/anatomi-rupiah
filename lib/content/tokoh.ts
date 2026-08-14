import { denominations } from '@/data/denominations'
import { FIGURES_WITHOUT_BIOGRAPHY } from '@/data/figures'
import { figuresById, motifsById } from '@/lib/content'
import type { Citation, Motif, Photo } from './schema'
import type { Locale } from '@/lib/i18n'

/**
 * Figures and motifs, arranged by the note that carries them — which is how a
 * reader meets them: front and back of the same piece of paper.
 */

export interface MotifView {
  readonly id: string
  readonly name: string
  readonly kind: Motif['kind']
  readonly claim: string
  readonly citations: readonly Citation[]
  readonly photo?: Photo
}

export interface NotePeopleView {
  readonly id: string
  readonly caption: string
  readonly figureName?: string
  readonly figureLifespan?: string
  readonly figureClaims: readonly string[]
  readonly figurePhoto?: Photo
  readonly motifs: readonly MotifView[]
  readonly citations: readonly Citation[]
}

function key(citation: Citation): string {
  return `${citation.publisher}·${citation.title}·${citation.locator ?? ''}`
}

export function notePeople(locale: Locale): readonly NotePeopleView[] {
  return denominations
    .filter((note) => note.figureId !== undefined || (note.motifIds ?? []).length > 0)
    .map((note) => {
      const figure = note.figureId === undefined ? undefined : figuresById.get(note.figureId)
      const motifs = (note.motifIds ?? []).flatMap((id) => {
        const found = motifsById.get(id)
        return found === undefined ? [] : [found]
      })

      const seen = new Map<string, Citation>()
      for (const claim of [...(figure?.claims ?? []), ...motifs.flatMap((m) => m.claims)]) {
        for (const citation of claim.citations) {
          if (!seen.has(key(citation))) seen.set(key(citation), citation)
        }
      }

      return {
        id: note.id,
        caption: `Rp${note.valueIdr.toLocaleString('id-ID')} · TE ${note.emisi}`,
        figureName: figure?.name,
        figureLifespan: figure?.lifespan,
        figureClaims: (figure?.claims ?? []).map((claim) => claim.text[locale]),
        figurePhoto: figure?.photo,
        motifs: motifs.map((motif) => ({
          id: motif.id,
          name: motif.name[locale],
          kind: motif.kind,
          claim: motif.claims[0]?.text[locale] ?? '',
          citations: motif.claims.flatMap((claim) => claim.citations),
          photo: motif.photo,
        })),
        citations: [...seen.values()],
      }
    })
}

/** Named openly on the page: the encyclopedia does not cover these figures. */
export function figuresWithoutBiography(): readonly string[] {
  return FIGURES_WITHOUT_BIOGRAPHY
}
