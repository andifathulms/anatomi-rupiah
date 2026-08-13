/**
 * basePath-aware asset URLs. GitHub Pages serves the site from a subdirectory,
 * and next/link handles routes but not plain file references.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function assetPath(path: string): string {
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
}

/** The only kind of artwork this site publishes as a file — PRD §2. */
export function mechanismDownloadPath(id: string): string {
  return assetPath(`/mekanisme/${id}.svg`)
}
