/**
 * Figure and motif photographs, pinned by content hash — CLAUDE.md invariant
 * 13, the one deliberate exception to invariant 3's raster ban. None of these
 * depict a note; each is a portrait of a person or a photograph of a place or
 * a flower, sourced from Wikimedia Commons with its license recorded in
 * data/figures or data/motifs (photo.license, verbatim from the source page).
 *
 * Same mechanism as BRAND_RASTER_ALLOWLIST and the same reason: pinning by
 * hash means a raster can't be introduced at an allowed path by simply
 * dropping a different file there. To change one of these: replace it, run
 * `shasum -a 256`, update the hash here, and say in the commit what the new
 * image is and where it came from.
 */

export const PHOTO_RASTER_ALLOWLIST: Readonly<Record<string, string>> = {}
