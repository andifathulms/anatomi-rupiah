/**
 * The only raster files permitted in this repository, pinned by content hash.
 *
 * Invariant 3 bans raster *banknote* imagery. The check implements that as a
 * blanket ban on raster files, because the narrower rule is not enforceable:
 * telling a logo PNG from a photograph of a note would need image processing,
 * and this project has none and wants none.
 *
 * A few raster files are nonetheless unavoidable. An iOS home-screen icon must
 * be PNG, and social scrapers will not read an SVG for og:image. Pinning their
 * hashes keeps the ban enforceable rather than turning it into a judgement
 * call: any raster outside this list fails, and a raster inside it fails the
 * moment its bytes differ from what was reviewed. A photograph of a note
 * cannot be introduced by dropping it at an allowed path.
 *
 * To change one of these files: replace it, run `shasum -a 256`, update the
 * hash here, and say in the commit what the new image contains and why it is
 * not note imagery.
 */

export const BRAND_RASTER_ALLOWLIST: Readonly<Record<string, string>> = {
  // Home-screen icon. iOS ignores SVG here.
  'public/brand/apple-touch-icon-180.png':
    '1075a9555e93b971ce740966de4075ce798104eb9dbe8c172fa92f126e1abf09',
  // Progressive-web-app icons. Android's installer prefers PNG.
  'public/brand/icon-192.png': 'd6a0d4fda33e9ed01f957d28edadd1a1876e804acaf86d5e829593aaf609f68c',
  'public/brand/icon-512.png': '69eaf32d8dc20b2ce413f98ed5a6143566d4d1f0d817747131ac5132788b5bd2',
  'public/brand/icon-maskable-512.png':
    '2866a7ad22d642550c9448f211d8fdd62390dc7f7f7ac99bb23bbefc76d9b121',
  // Social share card. og:image is not read as SVG by any major scraper.
  'public/brand/og-1200x630.png':
    'ae808556db089d44fd4e56d7862d7a81a0e1e95eca542f8d675eec034572d85d',
}

/**
 * What these images are, recorded so the allow-list is reviewable by a person
 * rather than being five opaque hashes.
 *
 * All five render the same mark: three fanned rounded rectangles, a straight
 * line across them, and a ring. It is an abstract mark of layered sheets. It
 * carries no denomination, no portrait, no serial, no Rupiah-specific device,
 * and it is not a depiction of any banknote — which is why it needs no
 * SPESIMEN marking and does not engage UU 7/2011 Pasal 24.
 */
export const BRAND_MARK_DESCRIPTION =
  'Abstract layered-sheet mark: three fanned rounded rectangles, a thread line, a watermark ring.'
