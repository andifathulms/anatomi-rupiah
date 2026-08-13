import { DEFAULT_LOCALE, isLocale, type Locale } from './index'

/** Route parsing lives here, so the header component only maps. */
export interface RouteLocation {
  readonly locale: Locale
  readonly segment: string
}

export function parsePathname(pathname: string): RouteLocation {
  const parts = pathname.split('/').filter((part) => part.length > 0)
  const first = parts[0]
  const locale: Locale = first !== undefined && isLocale(first) ? first : DEFAULT_LOCALE
  return { locale, segment: parts[1] ?? '' }
}
