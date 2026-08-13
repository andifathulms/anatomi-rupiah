import type { Config } from 'tailwindcss'

/**
 * Palette is taxonomy, not decoration — PRD §9.
 * Each channel colour means one method of checking a note. Do not reuse these
 * hues for unrelated UI state, and never write raw hex in a component.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Material world: engraving proof sheet.
        proof: {
          DEFAULT: '#EFEBE1',
          deep: '#E4DFD2',
          edge: '#D6D0BF',
        },
        engraving: {
          DEFAULT: '#1A1F26',
          soft: '#3D454F',
          faint: '#7A828C',
        },
        // The three checks, plus the fourth channel.
        dilihat: '#2C6E75',
        diraba: '#9A6B45',
        diterawang: '#C08A2E',
        mesin: '#6B4FA8',
        // Reserved for the UU 7/2011 Pasal 24 marking and nothing else.
        spesimen: '#A8443A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontVariantNumeric: {
        tabular: 'tabular-nums',
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
