## Context

The Electrician's Mate app is a fresh Next.js 16 project (HeroUI + Tailwind v4 + React 19). Currently only a boilerplate home page exists. This change introduces the first real feature: a complete browse-to-auto-fill flow for electrical check sheets. All backend/AI interactions are mocked on the frontend.

## Goals / Non-Goals

**Goals:**
- A polished, production-quality UI for the checklist browse and photo-to-form flow
- Every checklist from `docs/check-sheets-and-forms.md` represented with real form fields
- A satisfying simulated "AI scanning" experience with progressive field reveal
- Clean component architecture that can later be wired to a real backend

**Non-Goals:**
- Real camera integration (OS-level camera access) — use file upload only
- Actual LLM API calls or backend endpoints
- Data persistence (no database, no local storage)
- Authentication or user accounts
- Editable forms — fields are read-only display of mock data
- Mobile-only or PWA features at this stage

## Decisions

### Routes and file layout
- **`src/app/checklists/page.tsx`**: Browse page listing all checklists by category
- **`src/app/checklists/[slug]/page.tsx`**: Dynamic detail page for each checklist
- **`src/lib/checklists/data.ts`**: All 13 checklist definitions with mock auto-fill data
- **`src/lib/checklists/types.ts`**: TypeScript types for Checklist, Category, FormField, FormSection
- **`src/components/checklists/`**: Reusable UI components (ChecklistCard, PhotoUploader, FormRenderer, ScanningOverlay)

**Rationale**: Co-locates checklist-specific code under `src/app/checklists/` for the routes and `src/lib/checklists/` for the data layer, following Next.js conventions. Components live in `src/components/` as they may be reused by the home page or future features.

### Data model
Each checklist is an object with:
- `slug: string` — URL-safe identifier (e.g., `"eicr"`)
- `name: string` — Display name
- `category: Category` — enum: `certification | pre-work | post-work | maintenance`
- `description: string` — One-liner explaining the checklist
- `sections: FormSection[]` — Ordered array of sections, each containing fields
- `mockData: Record<string, string>` — Keyed by field ID, provides the auto-fill values

**Rationale**: A single `mockData` record per checklist keeps the data declarative. The mock processing step just reads from this record after a simulated delay — no need for a separate "mock API response" layer.

### Mock AI processing flow
The processing is implemented as a React state machine within the checklist detail page:
1. `idle` — Photo upload area shown, form empty
2. `uploaded` — Thumbnail preview shown, "Analyze Photo" button enabled
3. `scanning` — Full-screen overlay with animated scanning indicator (0.5s per field, staggered reveal)
4. `complete` — All mock-filled fields visible with `aiFilled` visual treatment

**Rationale**: Staggered reveal (not all at once) creates a more convincing AI-processing feel. Simple `setTimeout` chains driven by component state — no animation library needed.

### Component breakdown
- **`ChecklistCard`**: HeroUI `<Card>` wrapper showing name, description, and category badge. Entire card is a Next.js `<Link>` to `[slug]`.
- **`PhotoUploader`**: Hidden `<input type="file" accept="image/*">` triggered by a styled drop zone (HeroUI styled `<div>` with icon + text). Shows preview after selection.
- **`FormRenderer`**: Renders checklist sections and fields from the data model. Fields are grouped in HeroUI `<Card>` sections. Auto-filled fields get a green left border + "AI-filled" chip.
- **`ScanningOverlay`**: Full-screen semi-transparent overlay with HeroUI `<Progress>` or `<Spinner>` and animated text ("Detecting circuits...", "Reading test results...", etc.)

### Styling
- Tailwind CSS v4 utility classes for layout, spacing, colors
- HeroUI component variants (Card, Button, Badge, Progress) for interactive elements
- Dark mode support via the existing `prefers-color-scheme: dark` media query in `globals.css`
- Green accent (`#10b981` / emerald-500) for AI-filled indicators to create positive association
- Responsive layout: single-column on mobile, 2-column card grid on tablet+

## Risks / Trade-offs

- **Mock data maintenance**: 13 checklists × ~10 fields each is ~130 mock values. Acceptable for now; will be replaced by real AI responses later. → Keep mock data in a single file for easy deletion when the real backend arrives.
- **No form validation**: Fields are read-only display. → Not needed at this stage; validation will be added when forms become editable.
- **File upload memory**: Uploaded images stay in browser memory as object URLs. → Revoke object URLs on unmount to prevent leaks.
