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

---

# Theming (mandatory — DO NOT bypass)

This project uses a **HeroUI v3 custom theme** defined in `src/app/globals.css` via CSS custom properties. Every visual element MUST use the theme. Raw Tailwind color classes break the design system and undo deliberate theming work.

## The Rule

**Never use raw Tailwind color classes.** This includes:

- ❌ `bg-zinc-50`, `dark:bg-black`, `bg-blue-600`, `bg-white`, `bg-black/60`
- ❌ `text-zinc-900`, `dark:text-zinc-100`, `text-blue-400`, `text-white`
- ❌ `border-zinc-200`, `dark:border-zinc-800`, `border-emerald-200`
- ❌ `hover:bg-zinc-200`, `dark:hover:bg-zinc-700`, `hover:text-blue-600`
- ❌ Any `bg-{color}-{shade}`, `text-{color}-{shade}`, `border-{color}-{shade}` class

## What to Use Instead

### 1. HeroUI component variants (preferred)

When rendering a HeroUI component, use its built-in props — HeroUI maps them to theme tokens automatically:

```tsx
// ✅ Correct
<Button variant="primary">Save</Button>
<Badge color="danger">3</Badge>
<Chip color="success" variant="flat">Complete</Chip>
<Input variant="bordered" />
```

```tsx
// ❌ Wrong — overriding HeroUI's built-in theming with raw colors
<Button className="bg-blue-600 text-white hover:bg-blue-700">Save</Button>
<Badge className="bg-red-500 text-white">3</Badge>
```

### 2. Theme token utility classes (for custom/non-HeroUI elements)

When building custom elements that aren't HeroUI components, use the semantic token classes that HeroUI's stylesheet exposes:

| Token class | CSS variable | Use for |
|---|---|---|
| `bg-background` | `--background` | Page background |
| `text-foreground` | `--foreground` | Primary text |
| `text-muted` | `--muted` | Secondary/placeholder text |
| `bg-surface` | `--surface` | Card backgrounds |
| `text-surface-foreground` | `--surface-foreground` | Text on surfaces |
| `bg-accent` | `--accent` | Primary accent color |
| `text-accent-foreground` | `--accent-foreground` | Text on accent backgrounds |
| `border-accent` | `--accent` | Accent borders |
| `border-border` | `--border` | Default borders |
| `bg-default` | `--default` | Default control background |
| `text-default-foreground` | `--default-foreground` | Text on default controls |
| `bg-danger` / `text-danger` / `border-danger` | `--danger` | Error/destructive states |
| `bg-success` / `text-success` / `border-success` | `--success` | Success states |
| `bg-warning` / `text-warning` / `border-warning` | `--warning` | Warning states |
| `hover:bg-accent-hover` | `--accent-hover` | Accent hover state |
| `hover:bg-accent-soft` | `--accent-soft` | Subtle accent hover |

```tsx
// ✅ Correct — custom card using theme tokens
<div className="rounded-xl border border-border bg-surface p-4">
  <h2 className="text-foreground">Title</h2>
  <p className="text-muted">Description</p>
</div>

// ✅ Correct — accent button
<button className="rounded-xl bg-accent px-4 py-2 text-accent-foreground hover:bg-accent-hover">
  Click me
</button>

// ❌ Wrong — raw colors bypass the theme
<div className="rounded-xl border border-zinc-200 bg-white p-4 dark:bg-zinc-900">
  <h2 className="text-zinc-900 dark:text-zinc-100">Title</h2>
  <p className="text-zinc-500 dark:text-zinc-400">Description</p>
</div>
```

### 3. Exceptions — the ONLY raw color classes that are OK

These are abstract/flexible utilities that don't encode a specific palette color:

- `bg-transparent`, `border-transparent`, `text-transparent` — transparency
- `bg-inherit`, `text-inherit`, `border-inherit` — inheritance
- `bg-current`, `text-current`, `border-current` — currentColor
- `text-white` / `text-black` — ONLY when text must be legible on a theme-controlled background (e.g., white text on `bg-accent` where `text-accent-foreground` is the correct choice, or white text inside a `bg-black/50` backdrop overlay)
- `bg-black/50` or `bg-black/60` for modal backdrops — but prefer `bg-overlay` if the theme provides an overlay token

```tsx
// ✅ OK — backdrop overlay (functional, not themed)
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm">

// ✅ OK — transparency
<button className="border border-transparent bg-transparent">
```

## Verification

Before committing any UI change, scan your diff for `bg-{color}-{shade}`, `text-{color}-{shade}`, or `border-{color}-{shade}` classes. If any appear that aren't theme tokens or in the exceptions list above, replace them before committing.

`npm run build` must pass cleanly.
