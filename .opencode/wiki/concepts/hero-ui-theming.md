---
type: Concept
title: HeroUI v3 Theming
description: How theming works in HeroUI v3, the custom green-accent theme, and how the theme builder integrates.
tags: [hero-ui, theming, css, tailwind]
created: 2026-07-05
updated: 2026-07-05
---

# HeroUI v3 Theming

## How It Works

HeroUI v3 uses CSS custom properties mapped to semantic variables. Importing `@heroui/styles` in `globals.css` loads the base theme (Tailwind CSS v4 color palettes → semantic variables → light/dark auto-switching via CSS layers).

**Key semantic variables:**
- `--accent` / `--accent-foreground` — primary brand color
- `--background` / `--foreground` — page background and text
- `--muted` — subdued text
- `--border` / `--border-secondary` / `--border-tertiary` — border hierarchy
- `--radius` / `--radius-field` — border radius (default + form-specific)
- `--surface`, `--surface-secondary`, `--surface-foreground` — card/elevated surfaces
- `--default` / `--default-foreground` — neutral button/component backgrounds
- `--field-background`, `--field-foreground`, `--field-border` — form inputs
- `--danger`, `--success`, `--warning` — semantic colors

Each variable has a light-mode value in `:root` and a dark-mode value in `.dark`.

## Current Theme

**Accent:** Green shade — `lab(54.5335% 3.31545 -66.5298)`
- Light backgrounds have a subtle green undertone ("base" tint = 0.0113c of accent mixed into grays)
- Form fields use extra-large border radius: `--radius-field: calc(.5rem * 1.5)`
- Font family: Geist (loaded via `next/font/google` in layout.tsx)

**Theme source:** Built with the [HeroUI Theme Builder](https://heroui.com/en/themes) and exported by extracting computed CSS variables from the live preview.

## Files Involved

- `src/app/globals.css` — `:root` (light) and `.dark` (dark) variable blocks, `@theme inline` for font tokens
- `src/components/Providers.tsx` — `next-themes` ThemeProvider with `attribute="class"`
- `src/app/layout.tsx` — Geist font loading, `bg-background text-foreground` on body

## Adding/Changing the Theme

To change the accent or other theme parameters:
1. Go to https://heroui.com/en/themes and configure visually
2. Extract the computed CSS variables from the live preview (browser DevTools → Computed styles on `<html>`)
3. Update the `:root` and `.dark` blocks in `src/app/globals.css`
4. Verify with `npm run build`
