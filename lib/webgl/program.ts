/**
 * A minimal WebGL runner: one full-screen quad, one fragment shader.
 *
 * Deliberately dependency-free. PRD §11 allows 200 KB of JS for the whole site
 * and three.js alone is around 150 KB gzipped — for drawing a quad and running
 * a shader, a library would cost forty times what the work costs.
 *
 * These panels are procedural physics. They contain no note artwork, and
 * cannot: nothing is uploaded as a texture, because rasterising the SVG would
 * need a 2D canvas and the compliance gate forbids one. What they draw is
 * computed from the optics, which is the point.
 */

export interface GlHandle {
  readonly gl: WebGLRenderingContext
  readonly program: WebGLProgram
  readonly uniform: (name: string) => WebGLUniformLocation | null
  readonly draw: () => void
  readonly dispose: () => void
}

const VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)
  if (shader === null) throw new Error('webgl: could not create shader')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) !== true) {
    const log = gl.getShaderInfoLog(shader) ?? 'unknown error'
    gl.deleteShader(shader)
    throw new Error(`webgl: shader failed to compile — ${log}`)
  }
  return shader
}

/**
 * Returns null when WebGL is unavailable rather than throwing, so callers can
 * fall back to the SVG version. The demonstration is not allowed to be the
 * only way a reader can learn the point.
 */
export function createQuadProgram(
  canvas: HTMLCanvasElement,
  fragmentSource: string,
): GlHandle | null {
  const gl =
    (canvas.getContext('webgl', { antialias: true, alpha: true }) as WebGLRenderingContext | null) ??
    (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)
  if (gl === null) return null

  let program: WebGLProgram | null = null
  try {
    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource)
    program = gl.createProgram()
    if (program === null) return null
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if (gl.getProgramParameter(program, gl.LINK_STATUS) !== true) return null
    gl.deleteShader(vertex)
    gl.deleteShader(fragment)
  } catch {
    return null
  }

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

  gl.useProgram(program)
  const position = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const cache = new Map<string, WebGLUniformLocation | null>()
  const linked = program

  return {
    gl,
    program: linked,
    uniform: (name) => {
      if (!cache.has(name)) cache.set(name, gl.getUniformLocation(linked, name))
      return cache.get(name) ?? null
    },
    draw: () => {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
    dispose: () => {
      gl.deleteProgram(linked)
      gl.deleteBuffer(buffer)
    },
  }
}

/** Backing-store size for a CSS box, capped so a large panel stays cheap. */
export function backingSize(cssWidth: number, cssHeight: number, dpr: number) {
  const ratio = Math.min(dpr, 2)
  return {
    width: Math.max(1, Math.round(cssWidth * ratio)),
    height: Math.max(1, Math.round(cssHeight * ratio)),
  }
}
