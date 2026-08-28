---
type: Concept
title: Tailwind v4 Source Detection — Scoping the Scan Root
description: Why Tailwind v4 scanning non-app directories breaks builds with documentation example classes, why @source not is whack-a-mole, and the final source() root-scoping fix.
tags: [tailwind, turbopack, build, css, pitfall]
created: 2026-08-28
updated: 2026-08-28
---

# Tailwind v4 Source Detection — Scoping the Scan Root

## The Problem

`npm run build` failed with:

```
Error: Turbopack build failed with 1 errors:
./src/app/globals.css:2:428079  Module not found: Can't resolve '...'
```

The error pointed at a generated arbitrary-value class — `bg-[url(/img/hero.jpg)]` — and its import trace was `./src/app/globals.css` via `./src/app/layout.tsx`, even though no such class exists anywhere in `src/`.

## Root Cause

Tailwind v4 **automatic source detection** scans from the project root (the git root), respecting `.gitignore` — but every *other* git-tracked directory gets scanned too, including non-app directories that contain Tailwind class **documentation**:

- `.agents/skills/tailwindcss/references/visual-background.md` contains doc examples such as `bg-[url('/img/hero.jpg')]`
- The scanner sees the class in the markdown and generates the `bg-[url(/img/hero.jpg)]` utility
- Turbopack processes the generated CSS and tries to resolve `/img/hero.jpg` as a module → build fails

The app source itself was clean — no `url(` usage anywhere in `src/`.

## First Attempt (Partial): `@source not`

The initial fix excluded the offending directory:

```css
@import "tailwindcss";
@import "@heroui/styles"; 
@source not "../../.agents";
```

This fixed `.agents/` — but it was **whack-a-mole**. Any other scanned directory containing class-name strings breaks the build again.

## The Re-Poisoning Pitfall: Docs About the Fix Break the Fix

This project's wiki (`.opencode/wiki/`) documented the original bug — including the literal strings `bg-[url(/img/hero.jpg)]` inside backticks. Because `.opencode/` is git-tracked and still inside the default scan root, Tailwind scanned the wiki, found the class names **in the documentation of the bug itself**, and regenerated the poison utility:

> **Race condition note:** the in-session build passed *only because the wiki page was written after the build ran*. On a fresh cold run, the wiki files were already on disk, the scanner picked them up, and the build failed again with the same `Module not found: Can't resolve` error at a different column offset (`globals.css:2:398898`). A documentation fix that re-poisons its own build is not a fix — it's a latent failure waiting for the next cold build.

Lesson: **any** git-tracked directory inside the scan root that mentions class names (skill docs, wiki pages, changelogs, spec files) can generate phantom utilities. Excluding directories one at a time never ends.

## Final Fix: `source()` Root-Scoping

Scope the detection root to the app source directory in `src/app/globals.css`:

```css
@import "tailwindcss" source("../");
@import "@heroui/styles"; 
```

- `source(...)` sets the base directory for automatic source detection
- The path resolves **relative to the stylesheet**, not the project root — from `src/app/globals.css`, `../` = `src/`
- Now only `src/` is scanned; `.agents/`, `.opencode/`, `docs/`, `openspec/`, and root-level files are never touched, so documentation can mention class names freely

The `@source not "../../.agents";` line was removed — redundant once the root is scoped.

## Gotcha: All Source Paths Are Relative to the Stylesheet

This applies to both `source()` and `@source`. From `src/app/globals.css`:

- `../` → `src/` ✅
- `./` → `src/app/` (would miss `src/components/`, `src/lib/`, etc.)
- `../../` → project root (the default behavior we're escaping)

Assuming paths are project-root-relative is the classic mistake — `@source not "../../.agents"` was correct for the root, but `@source not "../.agents"` would have silently excluded `src/.agents` (nonexistent) and done nothing.

## Sanity Check Before Root-Scoping

Verify no real Tailwind classes are used outside the new scan root. In a Next.js app all classes live in `src/` components/pages. A grep for `className=`/`class=` in root files, `public/`, `docs/`, `openspec/` should only hit documentation prose (like this wiki page and AGENTS.md theming examples) — those are exactly the files that must NOT be scanned.

## Verification

1. `rm -rf .next` — force a fully cold build (a warm build masks scan-root bugs)
2. `npm run build` passes
3. Second (warm) `npm run build` also passes
4. Compiled CSS in `.next/static/` contains no `bg-[url` and no `hero.jpg`
5. Repo grep for `bg-[url` (excluding `node_modules/`, `.git/`, `.next/`) finds remaining occurrences only in `.agents/` and `.opencode/wiki/` — legitimately outside the scan root

## Constraints

- Never edit the `.agents/` skill docs to work around this — they must stay generic
- Keep `source("../")` on the `@import "tailwindcss"` line in `globals.css` — removing it reverts to project-root scanning and reintroduces the failure
- If a new non-app directory ever needs real Tailwind classes (shouldn't happen in a Next.js app), extend the root or add explicit `@source` entries — don't go back to `@source not` exclusions
