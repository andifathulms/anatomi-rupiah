import type { Config } from 'tailwindcss'
import {
  DILIHAT,
  DIRABA,
  DITERAWANG,
  ENGRAVING,
  ENGRAVING_FAINT,
  ENGRAVING_SOFT,
  MESIN,
  PROOF,
  PROOF_DEEP,
  PROOF_EDGE,
  SPESIMEN_INK,
} from './lib/tokens'

/**
 * Palette is taxonomy, not decoration — PRD §9. Values live in lib/tokens so
 * the artwork and the stylesheet cannot drift apart. Do not reuse these hues
 * for unrelated UI state, and never write raw hex in a component.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        proof: { DEFAULT: PROOF, deep: PROOF_DEEP, edge: PROOF_EDGE },
        engraving: { DEFAULT: ENGRAVING, soft: ENGRAVING_SOFT, faint: ENGRAVING_FAINT },
        dilihat: DILIHAT,
        diraba: DIRABA,
        diterawang: DITERAWANG,
        mesin: MESIN,
        spesimen: SPESIMEN_INK,
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        sheet: '78rem',
        prose: '38rem',
      },
    },
  },
  plugins: [],
}

export default config
