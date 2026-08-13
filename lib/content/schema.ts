import { z } from 'zod'

/**
 * Content schema.
 *
 * Two rules are enforced here rather than by review, because review forgets:
 *
 *  1. Every claim carries at least one citation (CLAUDE.md invariant 8). The
 *     schema has no shape for an uncited assertion, so one cannot be authored.
 *  2. Prose is check-oriented (invariant 7). A vocabulary screen rejects the
 *     manufacturing register outright; the rest is the documented §4 review.
 */

export const localizedSchema = z.object({
  /** Indonesian, in Bank Indonesia's own vocabulary. Primary. */
  id: z.string().min(1),
  /** English, secondary. */
  en: z.string().min(1),
})
export type Localized = z.infer<typeof localizedSchema>

export const citationSchema = z.object({
  publisher: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url().optional(),
  /** Article, page, or section within the source. */
  locator: z.string().optional(),
  accessed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'accessed must be an ISO date'),
})
export type Citation = z.infer<typeof citationSchema>

export const claimSchema = z.object({
  text: localizedSchema,
  citations: z
    .array(citationSchema)
    .min(1, 'every claim carries a citation — see CLAUDE.md invariant 8'),
})
export type Claim = z.infer<typeof claimSchema>

/** BI's own taxonomy, plus the fourth channel the campaign does not cover. */
export const checkChannelSchema = z.enum(['dilihat', 'diraba', 'diterawang', 'mesin'])
export type CheckChannel = z.infer<typeof checkChannelSchema>

const slugSchema = z
  .string()
  .regex(/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/, 'ids are lowercase kebab-case; they appear in URLs')

export const featureSchema = z.object({
  type: z.literal('feature'),
  id: slugSchema,
  name: localizedSchema,
  channel: checkChannelSchema,
  /** One-line statement of what the feature is. */
  summary: claimSchema,
  /** What the reader should observe on a genuine note. Never how to produce it. */
  observe: z.array(claimSchema).min(1),
  /** The physics, drawn. Keyed to an authored illustration. */
  mechanism: z.object({
    illustration: slugSchema,
    caption: claimSchema,
    steps: z.array(claimSchema).min(1),
  }),
  /** Where the medium falls short, stated plainly rather than simulated. */
  limitation: localizedSchema.optional(),
})
export type Feature = z.infer<typeof featureSchema>

export const placementSchema = z.object({
  featureId: slugSchema,
  /** One face per view. Obverse and reverse are never shown as a matched pair. */
  face: z.enum(['depan', 'belakang']),
  /** Region on the note, in millimetres of the real note, origin top-left. */
  region: z.object({
    xMm: z.number().nonnegative(),
    yMm: z.number().nonnegative(),
    widthMm: z.number().positive(),
    heightMm: z.number().positive(),
  }),
  note: claimSchema,
})
export type Placement = z.infer<typeof placementSchema>

export const denominationSchema = z.object({
  type: z.literal('denomination'),
  id: slugSchema,
  valueIdr: z.number().int().positive(),
  emisi: z.number().int(),
  dimensions: z.object({
    widthMm: z.number().positive(),
    heightMm: z.number().positive(),
    citations: z.array(citationSchema).min(1),
  }),
  /** Optional until the figure is written and cited — M4. */
  figureId: slugSchema.optional(),
  /** The reverse carries several subjects — a dance, a landscape, a flower. */
  motifIds: z.array(slugSchema).optional(),
  placements: z.array(placementSchema).min(1),
  /** Optional until the blind code is written and cited — M3. */
  kodeTunaNetra: z
    .object({
      /** Count of raised mark pairs along each edge. */
      marks: z.number().int().nonnegative(),
      description: claimSchema,
    })
    .optional(),
})
export type Denomination = z.infer<typeof denominationSchema>

export const figureSchema = z.object({
  type: z.literal('figure'),
  id: slugSchema,
  name: z.string().min(1),
  /** Omitted until dates can be cited to a source that can be followed. */
  lifespan: z.string().min(1).optional(),
  claims: z.array(claimSchema).min(1),
})
export type Figure = z.infer<typeof figureSchema>

export const motifSchema = z.object({
  type: z.literal('motif'),
  id: slugSchema,
  name: localizedSchema,
  kind: z.enum(['tari', 'pemandangan', 'bunga', 'tenun']),
  origin: localizedSchema,
  claims: z.array(claimSchema).min(1),
})
export type Motif = z.infer<typeof motifSchema>

export const contentSchema = z.discriminatedUnion('type', [
  featureSchema,
  denominationSchema,
  figureSchema,
  motifSchema,
])
export type Content = z.infer<typeof contentSchema>
