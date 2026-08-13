'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Loupe } from '@/components/loupe/Loupe'
import { CitationLines } from '@/components/mechanism/CitationList'
import { Schematic } from '@/components/sheet/Schematic'
import type { SheetNoteView } from '@/lib/schematic/sheet'
import type { LembarCopy } from '@/lib/i18n/lembar'
import type { Locale } from '@/lib/i18n'
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
  dilihat: 'text-dilihat',
  diraba: 'text-diraba',
  diterawang: 'text-diterawang',
  mesin: 'text-mesin',
}

const CHANNEL_BG: Record<CheckChannel, string> = {
  dilihat: 'bg-dilihat',
  diraba: 'bg-diraba',
  diterawang: 'bg-diterawang',
  mesin: 'bg-mesin',
}

export function Sheet({ notes, mechanisms, copy, locale }: SheetProps) {
  const [noteId, setNoteId] = useState(notes[0]?.id ?? '')
  const [featureId, setFeatureId] = useState<string | undefined>(undefined)

  const note = notes.find((candidate) => candidate.id === noteId) ?? notes[0]
  if (note === undefined) return null

  const marker = note.markers.find((candidate) => candidate.featureId === featureId)
  const mechanism = marker === undefined ? undefined : mechanisms[marker.illustration]

  return (
    <div>
      <fieldset className="mt-10">
        <legend className="font-mono text-xs uppercase tracking-[0.2em] text-engraving-faint">
          {copy.chooseNote}
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {notes.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              onClick={() => {
                setNoteId(candidate.id)
                setFeatureId(undefined)
              }}
              aria-pressed={candidate.id === note.id}
              className={
                candidate.id === note.id
                  ? 'numeric border border-engraving bg-engraving px-3 py-1.5 text-sm text-proof'
                  : 'numeric border border-engraving/25 px-3 py-1.5 text-sm hover:border-engraving'
              }
            >
              {candidate.caption}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="overflow-x-auto border border-engraving/15 bg-proof p-6">
            <Schematic model={note.schematic} activeFeatureId={marker?.featureId} />
          </div>
          <p className="numeric mt-3 text-xs text-engraving-faint">
            {copy.scaleNote} {note.schematic.scalePercent}% · {note.widthMm} × {note.heightMm} mm
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
                  onClick={() =>
                    setFeatureId(candidate.featureId === featureId ? undefined : candidate.featureId)
                  }
                  aria-pressed={candidate.featureId === featureId}
                  className={`flex w-full items-baseline gap-3 border-l-4 px-3 py-3 text-left ${
                    candidate.featureId === featureId
                      ? 'border-engraving bg-proof-deep'
                      : 'border-transparent hover:bg-proof-deep/60'
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
                      className={`block font-mono text-[0.65rem] uppercase tracking-wider ${CHANNEL_TEXT[candidate.channel]}`}
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
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-engraving-faint">
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
                className="[&>svg]:h-auto [&>svg]:w-full"
                role="img"
                aria-label={marker.featureName}
                dangerouslySetInnerHTML={{ __html: mechanism }}
              />
            )}
          </div>
        )}
      </section>
    </div>
  )
}
