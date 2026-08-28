---
type: Log
title: Electricians Mate Wiki Log
description: Chronological record of all project wiki actions. Append-only.
tags: [meta]
updated: 2026-08-28
---

# Electricians Mate — Wiki Log

> Chronological record of all wiki actions. Append-only.
> Format: `## [YYYY-MM-DD] action | subject`
> Actions: create, update, delete

## [2026-07-05] create | Wiki initialized

- Created `.opencode/wiki/` with SCHEMA.md, index.md, log.md
- Seeded with concept pages: hero-ui-theming, card-badge-pattern
- Seeded with entity page: checklist-card
- Created directories: concepts/, entities/, comparisons/, queries/

## [2026-08-28] create | Tailwind v4 source detection pitfall

- Production build failed: Turbopack couldn't resolve `/img/hero.jpg` from generated `bg-[url(...)]` class
- Root cause: Tailwind v4 automatic source detection scans git-tracked `.agents/` skill docs containing example classes
- Fix: `@source not "../../.agents";` in `src/app/globals.css` (path resolves relative to the stylesheet, not the project root)
- Documented in [concepts/tailwind-v4-source-detection.md](concepts/tailwind-v4-source-detection.md)

## [2026-08-28] update | Tailwind v4 source detection — final fix via source() root-scoping

- The `@source not` fix was insufficient: wiki pages in `.opencode/` documenting the bug's class strings (`bg-[url(/img/hero.jpg)]`) were themselves scanned, re-poisoning the build on fresh cold runs (in-session build passed only because the wiki page was written after the build — race condition)
- Final fix: `@import "tailwindcss" source("../");` in `src/app/globals.css` — scopes automatic source detection to `src/` (path resolves relative to the stylesheet); removed the now-redundant `@source not "../../.agents";` line
- Verified: cold build passes, warm build passes, compiled CSS in `.next/static/` has no `bg-[url`/`hero.jpg`, remaining `bg-[url` occurrences only in `.agents/` and `.opencode/wiki/` (legitimately outside scan root)
- Updated [concepts/tailwind-v4-source-detection.md](concepts/tailwind-v4-source-detection.md) with the re-poisoning pitfall and race-condition note
