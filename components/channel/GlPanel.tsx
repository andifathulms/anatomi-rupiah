'use client'

import { useEffect, useRef, useState } from 'react'
import { backingSize, createQuadProgram, type GlHandle } from '@/lib/webgl/program'

/**
 * A WebGL panel that draws one shader, and gets out of the way when it cannot.
 *
 * Falls back to `fallback` whenever WebGL is missing, the context is lost, or
 * the shader fails to build. The demonstration is never the only way a reader
 * can learn the point — the prose and the SVG cross-section carry it, and this
 * adds the thing a static drawing cannot show.
 */

export type Uniforms = Readonly<Record<string, number | readonly number[]>>

export interface GlPanelProps {
  readonly fragment: string
  readonly uniforms: Uniforms
  readonly label: string
  readonly className?: string
  readonly fallback: React.ReactNode
  /** Called once if this panel falls back — so a caller whose fallback is an
   * active simplification (not just a static message) can say so honestly. */
  readonly onFallback?: () => void
}

function applyUniforms(handle: GlHandle, uniforms: Uniforms): void {
  const { gl } = handle
  for (const [name, value] of Object.entries(uniforms)) {
    const location = handle.uniform(name)
    if (location === null) continue
    if (typeof value === 'number') {
      gl.uniform1f(location, value)
    } else if (value.length === 2) {
      gl.uniform2f(location, value[0] ?? 0, value[1] ?? 0)
    } else if (value.length === 3) {
      gl.uniform3f(location, value[0] ?? 0, value[1] ?? 0, value[2] ?? 0)
    }
  }
}

export function GlPanel({ fragment, uniforms, label, className, fallback, onFallback }: GlPanelProps) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const handle = useRef<GlHandle | null>(null)
  const [failed, setFailed] = useState(false)
  // A ref so the setup effect below can stay keyed on `fragment` alone —
  // depending on `onFallback` directly would tear down and rebuild the GL
  // program on every parent re-render, not just when the shader changes.
  const onFallbackRef = useRef(onFallback)
  onFallbackRef.current = onFallback

  useEffect(() => {
    const element = canvas.current
    if (element === null) return undefined

    const created = createQuadProgram(element, fragment)
    if (created === null) {
      setFailed(true)
      onFallbackRef.current?.()
      return undefined
    }
    handle.current = created

    const onLost = (event: Event) => {
      event.preventDefault()
      setFailed(true)
      onFallbackRef.current?.()
    }
    element.addEventListener('webglcontextlost', onLost)

    const resize = () => {
      const box = element.getBoundingClientRect()
      const size = backingSize(box.width, box.height, window.devicePixelRatio)
      if (element.width !== size.width || element.height !== size.height) {
        element.width = size.width
        element.height = size.height
      }
    }
    resize()
    window.addEventListener('resize', resize)

    return () => {
      element.removeEventListener('webglcontextlost', onLost)
      window.removeEventListener('resize', resize)
      created.dispose()
      handle.current = null
    }
  }, [fragment])

  // Redrawn when the uniforms change rather than on a timer: this responds to
  // the reader, so there is nothing to animate when they are not moving.
  useEffect(() => {
    const current = handle.current
    if (current === null || failed) return
    applyUniforms(current, uniforms)
    current.draw()
  }, [uniforms, failed])

  if (failed) return <>{fallback}</>

  return (
    <canvas
      ref={canvas}
      role="img"
      aria-label={label}
      className={className}
      // Presentation only: the words beside it carry the explanation.
    />
  )
}
