import type { MetadataRoute } from 'next'
import { assetPath } from '@/lib/paths'
import { absoluteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: absoluteUrl(assetPath('/sitemap.xml')),
  }
}
