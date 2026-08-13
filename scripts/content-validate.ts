/**
 * Citation completeness and register screen over the whole corpus.
 * Gates the build alongside compliance:check. Never bypassed.
 */
import { allContent } from '@/lib/content'
import { validateContent } from '@/lib/content/validate'

function main(): void {
  const issues = validateContent(allContent)

  if (issues.length > 0) {
    console.error(`\ncontent:validate — ${issues.length} issue(s)\n`)
    for (const issue of issues) {
      console.error(`  ✗ ${issue.kind.padEnd(9)} ${issue.where}\n    ${issue.message}`)
    }
    console.error('')
    process.exit(1)
  }

  const counts = allContent.reduce<Record<string, number>>((acc, item) => {
    acc[item.type] = (acc[item.type] ?? 0) + 1
    return acc
  }, {})

  const summary = Object.entries(counts)
    .map(([type, count]) => `${count} ${type}`)
    .join(', ')

  console.log(`content:validate — ok${summary === '' ? ' (corpus empty)' : ` · ${summary}`}`)
}

main()
