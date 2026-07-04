## ADDED Requirements

### Requirement: Browse checklists by category
The system SHALL display all 13 checklists from the domain reference grouped into four categories: Certification, Pre-Work Safety, Post-Work Sign-Off, and Maintenance.

#### Scenario: User views the checklists page
- **WHEN** user navigates to `/checklists`
- **THEN** system displays all checklists grouped under their category headings with each checklist showing its name and a brief description

#### Scenario: Checklists are visually grouped by category
- **WHEN** the page renders
- **THEN** each category heading is clearly separated and each checklist card appears under its correct category

### Requirement: Navigate to a checklist detail page
The system SHALL allow the user to tap any checklist card and navigate to a dedicated detail page for that checklist.

#### Scenario: User taps a checklist card
- **WHEN** user clicks on a checklist card (e.g., "EICR")
- **THEN** system navigates to `/checklists/eicr` and displays the checklist detail page

### Requirement: Checklist detail page displays full form structure
Each checklist detail page SHALL render the complete form structure for that checklist, including all sections, fields, and any specific codes/ratings relevant to that form type.

#### Scenario: User lands on an EICR detail page
- **WHEN** user navigates to `/checklists/eicr`
- **THEN** system displays the EICR form with all sections (Overall Assessment, Observations, Schedule of Test Results, Schedule of Inspections) and all expected fields for each section

### Requirement: Photo upload area
Each checklist detail page SHALL include a photo capture/upload area where the user can upload or simulate taking a photo of the installation.

#### Scenario: User wants to capture a photo
- **WHEN** user is on a checklist detail page
- **THEN** system displays a prominent photo upload zone with a camera icon and instructional text ("Take a photo of the installation" or "Upload a photo")

#### Scenario: User uploads a photo file
- **WHEN** user selects an image file via the upload area
- **THEN** system displays a thumbnail preview of the uploaded photo

### Requirement: Mocked AI processing with scanning animation
After a photo is uploaded, the system SHALL simulate AI processing by showing a scanning/progress animation and then progressively revealing auto-filled fields.

#### Scenario: User uploads a photo and processing begins
- **WHEN** a photo is uploaded
- **THEN** system displays a scanning animation with a message like "Analyzing photo..." and after a brief delay begins revealing populated fields

#### Scenario: Processing completes
- **WHEN** the simulated processing delay finishes (approximately 2-3 seconds)
- **THEN** all mock-populated fields are displayed in the form with visual emphasis (e.g., highlighted background) to indicate they were auto-filled

### Requirement: Mock data covers all 13 checklist types
The system SHALL have mock "AI response" data for every checklist so that no matter which form the user selects, the auto-fill experience is fully functional.

#### Scenario: User auto-fills any checklist
- **WHEN** user uploads a photo on any of the 13 checklist detail pages
- **THEN** system populates the form with relevant mock data specific to that checklist type

### Requirement: Visual distinction between auto-filled and empty fields
Auto-filled fields SHALL be visually distinct from fields the user would need to fill manually, so it is clear what the AI contributed.

#### Scenario: Form displays after processing
- **WHEN** processing completes
- **THEN** auto-filled fields are highlighted with a distinct visual style (e.g., green-tinted background or an "AI-filled" badge) and remaining empty fields retain their default appearance
