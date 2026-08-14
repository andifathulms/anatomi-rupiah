import Link from 'next/link'
import { DEFAULT_LOCALE, href } from '@/lib/i18n'

/** Deliberately plain: no schematic here, so there is nothing to mark. */
export default function NotFound() {
  return (
    <div className="py-24">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-engraving-faint">404</p>
      <h1 className="mt-4 font-display text-4xl leading-tight">Halaman tidak ditemukan</h1>
      <p className="mt-5 max-w-prose leading-relaxed text-engraving-soft">
        Halaman yang Anda cari tidak ada di sini.{' '}
        <span lang="en">The page you were looking for is not here.</span>
      </p>
      <p className="mt-8">
        <Link href={href(DEFAULT_LOCALE, '')} className="underline underline-offset-4">
          Anatomi Rupiah
        </Link>
      </p>
    </div>
  )
}
