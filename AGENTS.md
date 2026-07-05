<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Project Wiki (mandatory)

This project maintains a knowledge base at `.opencode/wiki/`. Read `SCHEMA.md` for conventions.

## Before You Start

**Check the wiki first.** If you're about to work on a component, pattern, or area of the project you're unfamiliar with, look in `.opencode/wiki/index.md` to see if there's a relevant Concept or Entity page. The wiki captures past discoveries, pitfalls, and architecture decisions — consulting it prevents you from re-learning the same lessons the hard way.

## When to Sync the Wiki

After ANY substantial change, update the wiki before finishing your session:

- **New component or page created** → add an Entity page in `entities/`
- **Pattern, approach, or architecture decision made** → add a Concept page in `concepts/`
- **Bug/pitfall discovered and fixed** → document it as a Concept (so it's not repeated)
- **New library, dependency, or technology evaluated** → add a Comparison in `comparisons/`
- **Open question raised** → add a Query in `queries/` if it needs tracking
- **Existing component significantly refactored** → update its Entity page

## Sync Checklist

Every time you make a non-trivial change:

1. [ ] Create or update the relevant wiki page(s)
2. [ ] Add the page to `.opencode/wiki/index.md` if new
3. [ ] Append to `.opencode/wiki/log.md` (format: `## [YYYY-MM-DD] action | subject`)
4. [ ] Bump the `updated` date in any modified page's frontmatter

This keeps the wiki as a living map of the project — the next agent session (or developer) can pick up where you left off without re-discovering the same pitfalls.
