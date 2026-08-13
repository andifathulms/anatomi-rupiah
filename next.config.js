/**
 * Static export only — PRD §12. No server, no runtime network.
 * basePath must match the GitHub Pages repository name.
 */
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/anatomi-rupiah' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  // No remote images, no image optimizer: there is no server at runtime.
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

module.exports = nextConfig
