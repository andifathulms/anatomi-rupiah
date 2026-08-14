'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Loupe } from '@/components/loupe/Loupe'
import { CitationLines } from '@/components/mechanism/CitationList'
import { Schematic } from '@/components/sheet/Schematic'
import type { SheetNoteView } from '@/lib/schematic/sheet'
import type { LembarCopy } from '@/lib/i18n/lembar'
import { href, type Locale } from '@/lib/i18n'
import type { CheckChannel } from '@/lib/content/schema'

/**
 * The proof sheet: schematic on the left, engraver's callouts in the margin,
 * and the magnified detail opening beside rather than over — so context and
 * magnification are visible at once (PRD §9).
 *
 * Selection is the only state here. Everything drawn was computed in lib.
 */

export interface SheetProps {
  readonly notes: readonly SheetNoteView[]
  /** Authored mechanism SVG, read at build time and passed in as markup. */
  readonly mechanisms: Readonly<Record<string, string>>
  readonly copy: LembarCopy
  readonly locale: Locale
}

const CHANNEL_TEXT: Record<CheckChannel, string> = {
  dilihat: 'text-dilihat-deep',
  diraba: 'text-diraba-deep',
  diterawang: 'text-diterawang-deep',
  mesin: 'text-mesin-deep',
}

/** Same four channel meanings, read against the near-black selected-marker background. */
const CHANNEL_TEXT_ON_INK: Record<CheckChannel, string> = {
  dilihat: 'text-dilihat-tint',
  diraba: 'text-diraba-tint',
  diterawang: 'text-diterawang-tint',
  mesin: 'text-mesin-tint',
}

const CHANNEL_BG: Record<CheckChannel, string> = {
  dilihat: 'bg-dilihat-deep',
  diraba: 'bg-diraba-deep',
  diterawang: 'bg-diterawang-deep',
  mesin: 'bg-mesin-deep',
}

export function Sheet({ notes, mechanisms, copy, locale }: SheetProps) {
  const [noteId, setNoteId] = useState(notes[0]?.id ?? '')
  const [featureId, setFeatureId] = useState<string | undefined>(undefined)
  const loupeHeadingRef = useRef<HTMLHeadingElement>(null)

  // Selecting a marker reveals the loupe result via aria-live, but a live
  // region alone doesn't move a sighted reader's eye or a screen reader's
  // focus to content that may be scrolled out of view — it just announces
  // into the void. Bring it into view and move focus there deliberately
  // (critique 2026-08-14, P2), respecting prefers-reduced-motion.
  useEffect(() => {
    if (featureId === undefined) return
    const heading = loupeHeadingRef.current
    if (heading === null) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    heading.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    heading.focus()
  }, [featureId])

  const note = notes.find((candidate) => candidate.id === noteId) ?? notes[0]
  if (note === undefined) return null

  const marker = note.markers.find((candidate) => candidate.featureId === featureId)
  const mechanism = marker === undefined ? undefined : mechanisms[marker.illustration]

  const selectFeature = (candidate: string) => {
    setFeatureId(candidate === featureId ? undefined : candidate)
  }

  // Grouped by emission year rather than one flat row of ten — a reader who
  // doesn't already know which note they're holding gets an oriented choice
  // (current series vs. still-valid older series) instead of a 10-way recall
  // test before the sheet has taught them anything (critique 2026-08-14, P1).
  const current2022 = notes.filter((candidate) => candidate.emisi === 2022)
  const legacy2016 = notes.filter((candidate) => candidate.emisi !== 2022)

  return (
    <div>
      <fieldset className="mt-10">
        <legend className="font-mono text-xs uppercase tracking-[0.2em] text-engraving-faint">
          {copy.chooseNote}
        </legend>

        <NoteGroup
          heading={copy.emisiCurrent}
          candidates={current2022}
          activeId={note.id}
          onSelect={(candidate) => {
            setNoteId(candidate)
            setFeatureId(undefined)
          }}
        />
        {legacy2016.length > 0 && (
          <NoteGroup
            heading={copy.emisi2016}
            candidates={legacy2016}
            activeId={note.id}
            onSelect={(candidate) => {
              setNoteId(candidate)
              setFeatureId(undefined)
            }}
            className="mt-4"
          />
        )}
      </fieldset>

      <div className="mt-10 grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)]">
        <div>
          <div className="w-fit max-w-full overflow-x-auto border border-engraving/15 bg-proof p-6 shadow-sheet">
            <Schematic
              model={note.schematic}
              activeFeatureId={marker?.featureId}
              onSelectFeature={selectFeature}
            />
          </div>
          <p className="numeric mt-3 text-xs text-engraving-faint">
            {copy.scaleNote} {note.schematic.scalePercent}% · {note.widthMm} × {note.heightMm} mm
          </p>
          <p className="mt-2">
            <Link href={href(locale, `lembar/${note.id}`)} className="text-sm underline underline-offset-4">
              {copy.checklistLink} →
            </Link>
          </p>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-engraving-faint">
            {copy.calloutsHeading}
          </h2>
          <ul className="mt-4 space-y-px">
            {note.markers.map((candidate) => (
              <li key={candidate.featureId}>
                <button
                  type="button"
                  onClick={() => selectFeature(candidate.featureId)}
                  aria-pressed={candidate.featureId === featureId}
                  // Selected state reads as a solid ink fill, deliberately not
                  // the left-accent-border grammar used elsewhere for channel-
                  // taxonomy accents (DESIGN.md's "The Taxonomy Rule") — that
                  // grammar means "this belongs to a checking channel," not
                  // "this is selected," and the two must not collide
                  // (critique 2026-08-14).
                  className={`flex w-full items-baseline gap-3 px-3 py-3 text-left transition-colors ${
                    candidate.featureId === featureId
                      ? 'bg-engraving text-proof'
                      : 'hover:bg-proof-deep/60'
                  }`}
                >
                  <span
                    className={`callout-number flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-proof ${CHANNEL_BG[candidate.channel]}`}
                  >
                    {candidate.index}
                  </span>
                  <span>
                    <span className="block text-sm">{candidate.featureName}</span>
                    <span
                      className={`block font-mono text-label uppercase tracking-wider ${
                        candidate.featureId === featureId
                          ? CHANNEL_TEXT_ON_INK[candidate.channel]
                          : CHANNEL_TEXT[candidate.channel]
                      }`}
                    >
                      {candidate.channelLabel}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-engraving/15 pt-4 text-xs leading-relaxed text-engraving-faint">
            {copy.indicativeNote}
          </p>
        </div>
      </div>

      <section className="mt-12 border-t-2 border-engraving/20 pt-8" aria-live="polite">
        <h2
          ref={loupeHeadingRef}
          tabIndex={-1}
          className="font-mono text-xs uppercase tracking-[0.2em] text-engraving-faint"
        >
          {copy.loupeHeading}
        </h2>

        {marker === undefined ? (
          <p className="mt-4 text-engraving-faint">{copy.loupeIdle}</p>
        ) : (
          <div className="mt-5 grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <div className="aspect-square border border-engraving/20 bg-proof p-3">
                <Loupe
                  model={marker.loupe}
                  channel={marker.channel}
                  label={`${copy.loupeHeading}: ${marker.featureName}`}
                />
              </div>
              <p className="numeric mt-2 text-xs text-engraving-faint">
                {copy.regionLabel} {marker.loupe.regionWidthMm} × {marker.loupe.regionHeightMm} mm
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl">{marker.featureName}</h3>
              <p className="mt-3 leading-relaxed text-engraving-soft">{marker.note}</p>
              <p className="mt-5">
                <Link href={marker.featureUrl} className="text-sm underline underline-offset-4">
                  {copy.readMore} →
                </Link>
              </p>

              {/* Placement is a claim about the world, so it shows its sources. */}
              <h4 className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-engraving-faint">
                {copy.sourcesLabel}
              </h4>
              <CitationLines
                citations={marker.citations}
                locale={locale}
                className="mt-2 space-y-1 text-xs text-engraving-faint"
              />
            </div>

            {mechanism !== undefined && (
              <div
                // Decorative: the h3 beside it already names this feature,
                // so a role="img" label here would repeat the same text.
                aria-hidden="true"
                className="[&>svg]:h-auto [&>svg]:w-full"
                dangerouslySetInnerHTML={{ __html: mechanism }}
              />
            )}
          </div>
        )}
      </section>
    </div>
  )
}

interface NoteGroupProps {
  readonly heading: string
  readonly candidates: readonly SheetNoteView[]
  readonly activeId: string
  readonly onSelect: (id: string) => void
  readonly className?: string
}

/** One emission-year group of denomination pills, with its own heading. */
function NoteGroup({ heading, candidates, activeId, onSelect, className }: NoteGroupProps) {
  if (candidates.length === 0) return null

  return (
    <div className={className}>
      <p className="numeric text-xs text-engraving-faint">{heading}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {candidates.map((candidate) => (
          <button
            key={candidate.id}
            type="button"
            onClick={() => onSelect(candidate.id)}
            aria-pressed={candidate.id === activeId}
            className={
              candidate.id === activeId
                ? 'numeric border border-engraving bg-engraving px-3 py-1.5 text-sm text-proof'
                : 'numeric border border-engraving/25 px-3 py-1.5 text-sm hover:border-engraving'
            }
          >
            {candidate.caption}
          </button>
        ))}
      </div>
    </div>
  )
}
