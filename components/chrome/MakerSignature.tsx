import type { Locale } from '@/lib/i18n'

/**
 * The maker's mark — a quiet author credit.
 *
 * Kept visually separate from the legal notices above it: those are the
 * project's statutory position, this is a person's name, and the two must
 * never read as one. It reuses the footer's existing bottom seam rather than
 * adding a divider of its own.
 */

const MAKER = {
  name: 'Andi Fathul Mukminin',
  portfolio: 'https://andifathulms.github.io/en/',
} as const

interface SocialLink {
  readonly label: string
  readonly url: string
  /** 18px icon path data, drawn on a 24-unit viewBox. */
  readonly icon: React.ReactNode
}

const LINKS: readonly SocialLink[] = [
  {
    label: 'Portfolio',
    url: MAKER.portfolio,
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
      </>
    ),
  },
  {
    label: 'GitHub',
    url: 'https://github.com/andifathulms',
    icon: (
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.6-.2.6-.4v-1.6c-2.4.5-3-1.1-3-1.1-.4-1-1-1.3-1-1.3-.8-.5 0-.5 0-.5.9.1 1.4.9 1.4.9.8 1.3 2 1 2.6.7.1-.6.3-1 .6-1.2-1.9-.2-3.9-1-3.9-4.2 0-.9.3-1.7.9-2.3-.1-.3-.4-1.1.1-2.3 0 0 .7-.2 2.4.9a8.3 8.3 0 0 1 4.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2 .1 2.3.6.6.9 1.4.9 2.3 0 3.2-2 4-3.9 4.2.3.3.6.8.6 1.7v2.5c0 .2.1.5.6.4a9.5 9.5 0 0 0-3-18.5Z" />
    ),
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/andifathulmukminin/',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10.5V17M7 7.2v.1M11 17v-3.6c0-1.2.8-2 1.9-2s1.9.8 1.9 2V17" />
      </>
    ),
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/andifathulms/',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.2 6.9v.1" />
      </>
    ),
  },
]

export function MakerSignature({ locale }: { readonly locale: Locale }) {
  // Build time is render time here: the export is static.
  const year = new Date().getFullYear()

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <p className="text-sm text-engraving-faint">
        {locale === 'id' ? 'Dirancang & dibangun oleh' : 'Designed & built by'}{' '}
        <a
          href={MAKER.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="text-engraving-soft underline decoration-engraving/30 underline-offset-4 transition-colors hover:text-engraving hover:decoration-dilihat"
        >
          {MAKER.name}
        </a>{' '}
        · <span className="numeric">©&nbsp;{year}</span>
      </p>

      <ul className="flex items-center gap-1">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-8 w-8 items-center justify-center rounded-full text-engraving-faint transition-colors hover:bg-proof-edge/60 hover:text-engraving"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                {link.icon}
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
