---
type: Schema
title: Electricians Mate Wiki Schema
description: Conventions and structure for the project knowledge base.
tags: [meta]
timestamp: 2026-07-05T00:00:00Z
schema_version: 1.0.0
---

# Electricians Mate — Project Wiki

> This wiki lives in `.opencode/wiki/` and is maintained by the OpenCode agent. It follows a simplified [OKF](https://github.com/google/open-knowledge-format)-inspired format. `type` is the only required frontmatter field.

## Structure

```
.opencode/wiki/
├── SCHEMA.md           # This file — conventions
├── index.md            # Content catalog
├── log.md              # Chronological change log (append-only)
├── concepts/           # Architecture decisions, design patterns, approaches
├── entities/           # Components, pages, types, data models
├── comparisons/        # Technology/libraries trade-off comparisons
└── queries/            # Open questions to be resolved later
```

## Conventions

- File names: lowercase, hyphens (e.g. `hero-ui-theming.md`)
- Every page starts with YAML frontmatter — `type` is the only required field
- Use relative markdown `[text](path.md)` links between pages
- When updating a page, bump the `updated` date in frontmatter
- Every new page must be added to `index.md`
- Every action must be appended to `log.md`
- **Sync trigger:** After any non-trivial change (new component, pattern discovered, architecture decision made), append a log entry and create/update relevant pages

## Frontmatter

```yaml
---
type: Concept | Entity | Comparison | Query
title: Page Title
description: One-line summary
tags: [tag1, tag2]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

## Page Types

- **Concept** — Architecture decisions, design patterns, approaches, "how we do X"
- **Entity** — Components, pages, types, data models, interfaces
- **Comparison** — Technology/library trade-offs evaluated for the project
- **Query** — Open questions that need resolution later

## Page Thresholds

- **Create a page** when a concept/component appears in 2+ contexts or is central to the project
- **Add to existing page** when a new detail is discovered about something already documented
- **DON'T create a page** for trivial one-off details
- **Delete a page** when it's fully superseded — remove from index and log the deletion
