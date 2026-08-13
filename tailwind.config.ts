import type { Config } from 'tailwindcss'
import {
  CHANNEL_DEEP,
  CHANNEL_TINT,
  DILIHAT,
  DIRABA,
  DITERAWANG,
  ENGRAVING,
  ENGRAVING_FAINT,
  ENGRAVING_SOFT,
  INSPECT,
  INSPECT_EDGE,
  INSPECT_SOFT,
  MESIN,
  PROOF,
  PROOF_DEEP,
  PROOF_EDGE,
  SPESIMEN_INK,
} from './lib/tokens'

/**
 * Palette is taxonomy, not decoration — PRD §9. Values live in lib/tokens so
 * the artwork and the stylesheet cannot drift apart. Each channel now has a
 * tint and a deep reading as well as its base hue; that is a range within one
 * meaning, not four new meanings. Do not reuse these hues for unrelated UI
 * state, and never write raw hex in a component.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        proof: { DEFAULT: PROOF, deep: PROOF_DEEP, edge: PROOF_EDGE },
        engraving: { DEFAULT: ENGRAVING, soft: ENGRAVING_SOFT, faint: ENGRAVING_FAINT },
        inspect: { DEFAULT: INSPECT, soft: INSPECT_SOFT, edge: INSPECT_EDGE },
        dilihat: { DEFAULT: DILIHAT, tint: CHANNEL_TINT.dilihat, deep: CHANNEL_DEEP.dilihat },
        diraba: { DEFAULT: DIRABA, tint: CHANNEL_TINT.diraba, deep: CHANNEL_DEEP.diraba },
        diterawang: {
          DEFAULT: DITERAWANG,
          tint: CHANNEL_TINT.diterawang,
          deep: CHANNEL_DEEP.diterawang,
        },
        mesin: { DEFAULT: MESIN, tint: CHANNEL_TINT.mesin, deep: CHANNEL_DEEP.mesin },
        spesimen: SPESIMEN_INK,
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Fluid display sizes: the hero should command a phone as well as a desk.
        hero: ['clamp(2.75rem, 1.6rem + 5.2vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        title: ['clamp(2rem, 1.4rem + 2.6vw, 3.25rem)', { lineHeight: '1.06', letterSpacing: '-0.015em' }],
        section: ['clamp(1.5rem, 1.2rem + 1.2vw, 2.125rem)', { lineHeight: '1.15' }],
        lede: ['clamp(1.0625rem, 1rem + 0.5vw, 1.375rem)', { lineHeight: '1.6' }],
        // The small-caps label size — eyebrows, channel labels, citation
        // headings. Was two near-duplicate arbitrary values (0.6875rem and
        // 0.65rem) doing the same job across the codebase; one token now.
        label: ['0.6875rem', { lineHeight: '1.4' }],
      },
      maxWidth: {
        sheet: '80rem',
        prose: '38rem',
      },
      boxShadow: {
        // Ink on stock, not glass on glass: shadows are engraving-coloured.
        sheet: '0 1px 2px rgba(26,31,38,0.05), 0 8px 24px -12px rgba(26,31,38,0.18)',
        lift: '0 2px 4px rgba(26,31,38,0.06), 0 18px 40px -18px rgba(26,31,38,0.28)',
        plate: '0 24px 60px -28px rgba(26,31,38,0.45)',
      },
      backgroundImage: {
        'proof-grain':
          'repeating-linear-gradient(90deg, rgba(26,31,38,0.022) 0 1px, transparent 1px 26px)',
      },
      keyframes: {
        'ray-travel': {
          '0%': { transform: 'translateX(-6px)', opacity: '0.15' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(6px)', opacity: '0.15' },
        },
        'thread-draw': {
          '0%': { strokeDashoffset: '120' },
          '100%': { strokeDashoffset: '0' },
        },
        'lift-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'ray-travel': 'ray-travel 3.2s ease-in-out infinite',
        'thread-draw': 'thread-draw 2.4s ease-out forwards',
        'lift-in': 'lift-in 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
