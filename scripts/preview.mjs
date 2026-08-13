/**
 * Serves ./out under the production basePath, so what you check locally is what
 * GitHub Pages will serve. No dependencies, no network beyond localhost.
 */
import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

const OUT = join(process.cwd(), 'out')
const BASE_PATH = '/anatomi-rupiah'
const PORT = Number(process.env.PORT ?? 4321)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
}

if (!existsSync(OUT)) {
  console.error('preview: ./out does not exist. Run `pnpm build` first.')
  process.exit(1)
}

function resolve(urlPath) {
  const withoutBase = urlPath.startsWith(BASE_PATH) ? urlPath.slice(BASE_PATH.length) : urlPath
  const clean = normalize(decodeURIComponent(withoutBase.split('?')[0])).replace(/^(\.\.[/\\])+/, '')
  const candidate = join(OUT, clean)

  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    const index = join(candidate, 'index.html')
    return existsSync(index) ? index : null
  }
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate

  const html = `${candidate}.html`
  return existsSync(html) ? html : null
}

createServer((request, response) => {
  const url = request.url ?? '/'
  if (url === '/') {
    response.writeHead(302, { Location: `${BASE_PATH}/` })
    response.end()
    return
  }

  const file = resolve(url)
  if (file === null) {
    const notFound = join(OUT, '404.html')
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    if (existsSync(notFound)) {
      createReadStream(notFound).pipe(response)
      return
    }
    response.end('404')
    return
  }

  response.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' })
  createReadStream(file).pipe(response)
}).listen(PORT, () => {
  console.log(`preview — http://localhost:${PORT}${BASE_PATH}/`)
})
