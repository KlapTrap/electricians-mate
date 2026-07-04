## Why

UK electricians routinely fill out dozens of check sheets, certificates, and inspection forms per job. The Electrician's Mate app can dramatically reduce this burden by letting the electrician photograph the installation and have an LLM auto-fill the relevant checklist fields. This change builds the complete UI flow — from browsing all available forms through to a simulated photo-capture and auto-fill experience — with a mocked backend so the UX can be validated before real AI integration begins.

## What Changes

- Add a **Checklists Browse** page listing all 13 check sheets/forms from the domain reference (EICR, EIC, Minor Works, RAMS, etc.), categorised by type (Certification, Pre-Work Safety, Post-Work Sign-Off, Maintenance)
- Add a per-checklist **Photo Capture & Auto-Fill** page with a simulated camera/photo upload area
- Each checklist page displays its full form structure (fields, sections, observation codes) with fields progressively populated by a mocked "AI processing" flow that simulates: upload photo → show scanning animation → reveal filled fields
- All data and "AI responses" are mocked on the frontend — no real API calls, no authentication, no persistence

## Capabilities

### New Capabilities

- `checklist-browse`: Browseable, categorised list of all electrical check sheets and forms, navigable to individual checklist pages

### Modified Capabilities

<!-- No existing capabilities to modify — this is a greenfield feature. -->

## Impact

- New routes: `/checklists` (browse page), `/checklists/[slug]` (per-checklist photo + auto-fill page)
- New source directories: `src/app/checklists/`, `src/lib/checklists/` (mock data and types)
- Uses HeroUI components (Cards, Buttons, Badges, etc.) and Tailwind CSS v4
- No new dependencies required — all mock data is static TypeScript objects
