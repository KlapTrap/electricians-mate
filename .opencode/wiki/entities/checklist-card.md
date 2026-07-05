---
type: Entity
title: ChecklistCard Component
description: Card component for rendering checklist items on the /checklists page. Uses HeroUI v3 Card, CardContent, and Chip.
tags: [component, hero-ui, checklist, card]
created: 2026-07-05
updated: 2026-07-05
---

# ChecklistCard Component

**File:** `src/components/checklists/ChecklistCard.tsx`

## Props

| Prop | Type | Description |
|------|------|-------------|
| `checklist` | `Checklist` | The checklist data object (from `@/lib/checklists/types`) |

## Structure

```
<Link> (wraps entire card — the whole card is clickable)
  <Card>
    <CardContent> (flex flex-col gap-3 p-5)
      <h3>              ← checklist.name
      <Chip>            ← category label (certification/pre-work/post-work/maintenance)
      <p>               ← checklist.description
      <div>             ← Frequency + Legal metadata
```

## Category Chip Colors

| Category | Chip Color |
|----------|-----------|
| `certification` | `accent` (green) |
| `pre-work` | `warning` (amber) |
| `post-work` | `success` (emerald) |
| `maintenance` | `danger` (red) |

All chips use `variant="soft"` and `size="sm"`.

## History

- **2026-07-05:** Swapped `Badge` → `Chip` after discovering Badge's absolute positioning default. See [Badge vs Chip concept](../concepts/card-badge-pattern.md).
