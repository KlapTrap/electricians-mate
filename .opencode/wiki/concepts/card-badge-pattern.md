---
type: Concept
title: Badge vs Chip — Card Label Pattern
description: Why HeroUI v3 Badge floats to the top-right corner and why Chip should be used for inline category labels instead.
tags: [hero-ui, badge, chip, card, pattern, pitfall]
created: 2026-07-05
updated: 2026-07-05
---

# Badge vs Chip — Card Label Pattern

## The Problem

When placing a `<Badge>` inside a card's flex column layout (under the title), the badge appeared in the **top-right corner** instead of flowing inline below the title. Adding `self-start`, `flex-col`, and other positioning classes had zero effect.

## Root Cause

HeroUI v3's **`Badge` is a notification overlay**, not a standalone label. It has a default `placement: "top-right"` that applies:

```css
position: absolute;
top: 0;
right: 0;
transform: translate(25%, -25%);
```

Absolute positioning **completely ignores flex/grid layout**. No amount of flex or grid CSS can override an absolutely-positioned element's placement — it's taken out of the document flow entirely.

**Designed use case:** Unread count on an avatar, notification dot on a bell icon — an overlay on another element.

## Solution: Use `Chip` Instead

HeroUI v3's **`Chip`** component has identical props (`color`, `variant`, `size`) but **no positioning** — it's a plain inline element that flows naturally in any layout.

```tsx
// ❌ WRONG — Badge floats to top-right regardless of layout
<Badge color="accent" variant="soft" size="sm">Label</Badge>

// ✅ CORRECT — Chip flows inline, respects flex/grid
<Chip color="accent" variant="soft" size="sm">Label</Chip>
```

## When to Use Each

| Component | Use Case | Positioning |
|-----------|----------|-------------|
| `Badge` | Notification overlay (unread count, status dot on icon/avatar) | Absolute, needs a positioned parent |
| `Chip` | Inline category/status label inside cards, tables, lists | Normal flow |

## Files Involved

- `src/components/checklists/ChecklistCard.tsx` — originally used `Badge`, now uses `Chip`
