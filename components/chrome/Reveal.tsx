'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Marks a section's arrival rather than decorating it: a small rise-and-settle
 * as the reader reaches it, once. No scroll-position listener — an
 * IntersectionObserver fires once per section and disconnects.
 *
 * Deliberately not a library: PRD §11 keeps the JS budget tight, and every
 * other motion piece on the site (AnatomyStack, the channel demos) is
 * hand-rolled the same way. The global `prefers-reduced-motion: reduce` rule
 * in app/globals.css already collapses the transition to nothing; there is no
 * separate reduced-motion branch to maintain here.
 */
export function Reveal({
  children,
  className,
}: {
  readonly children: ReactNode
  readonly className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (node === null) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition duration-500 ease-out ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
