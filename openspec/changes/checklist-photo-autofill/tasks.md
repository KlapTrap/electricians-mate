## 1. Types and mock data layer

- [x] 1.1 Create `src/lib/checklists/types.ts` with TypeScript types: `Checklist`, `Category`, `FormSection`, `FormField`, `ProcessingState`
- [x] 1.2 Create `src/lib/checklists/data.ts` with all 13 checklist definitions including name, slug, category, description, and sections with fields
- [x] 1.3 Add mock auto-fill data (`mockData`) to every checklist in the data file with realistic values for each field

## 2. Checklist browse page

- [x] 2.1 Create `src/app/checklists/page.tsx` — the browse page layout with category headings and a responsive card grid
- [x] 2.2 Create `src/components/checklists/ChecklistCard.tsx` — a HeroUI Card component showing name, description, and category badge, linked to `/checklists/[slug]`
- [x] 2.3 Wire up the browse page to render all checklists grouped by category using the data from `src/lib/checklists/data.ts`

## 3. Checklist detail page — form rendering

- [x] 3.1 Create `src/app/checklists/[slug]/page.tsx` — the dynamic detail page that resolves the slug to a checklist and renders the photo upload + form layout
- [x] 3.2 Create `src/components/checklists/FormRenderer.tsx` — renders all sections and fields from a checklist definition, with empty (default) state
- [x] 3.3 Add visual grouping: each section renders as a HeroUI Card with a section heading, and fields render as read-only label-value pairs

## 4. Photo upload area

- [x] 4.1 Create `src/components/checklists/PhotoUploader.tsx` — a styled drop/file-select zone with a hidden `<input type="file" accept="image/*">` that shows a thumbnail preview after selection
- [x] 4.2 Wire the PhotoUploader into the checklist detail page and add an "Analyze Photo" button that appears after a photo is selected

## 5. Mock AI processing flow

- [x] 5.1 Create `src/components/checklists/ScanningOverlay.tsx` — a full-screen overlay with animated scanning indicator and rotating status messages
- [x] 5.2 Implement the `ProcessingState` state machine in the detail page: idle → uploaded → scanning → complete
- [x] 5.3 Implement progressive field reveal during scanning: fields become visible one by one with a staggered delay (~0.3s each)
- [x] 5.4 Mark auto-filled fields with a green left border and an "AI-filled" chip/badge to visually distinguish them from empty fields

## 6. Home page integration

- [x] 6.1 Update `src/app/page.tsx` to add a prominent link/button to `/checklists` so users can discover the feature from the landing page

## 7. Polish and verification

- [x] 7.1 Test all 13 checklist slugs resolve correctly and display their unique forms
- [x] 7.2 Verify the mock processing flow works end-to-end for each checklist type
- [x] 7.3 Ensure dark mode renders correctly across all new pages and components
- [x] 7.4 Ensure responsive layout looks correct on mobile (375px) and desktop (1280px+) widths
- [x] 7.5 Run `npm run lint` and fix any issues
