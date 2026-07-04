# UK Electrician Check Sheets & Forms — Complete Reference

> **Source:** Desk research compiled 2026-07-04 from Tradify, NICEIC, IET model forms, HSE guidance, BS 7671:2018+A4:2026 commentary.
> **Validation status:** Not yet validated with a practising electrician. See _Caveats_ at end.

This document catalogues every checklist, form, certificate, and inspection schedule a UK electrician routinely completes. Use this as the domain model reference when building templates, data schemas, or UI flows for the Electrician's Mate app.

---

## Quick Reference Map

```
CERTIFICATION (permanent record, regulatory)
├── EIC  — new/altered installations
├── EICR — periodic condition inspection (existing installations)
└── Minor Works — small additions without new circuits

PRE-WORK SAFETY (per-job, operational)
├── RAMS (Risk Assessment & Method Statement)
├── Permit to Work / LOTO (electrical isolation)
├── Daily Tool & Equipment Inspection
└── Toolbox Talk Record

POST-WORK SIGN-OFF (per-job, completion)
├── Completion / Handover Checklist
├── Notification to Building Control (Part P)
└── Quality / Snagging Check

MAINTENANCE (periodic, ongoing)
├── Emergency Lighting Test Log
├── Fire Alarm System Test Log
└── PAT Testing Schedule
```

---

## 1. EICR — Electrical Installation Condition Report

**Purpose:** Periodic inspection of an _existing_ installation to determine if it remains safe for continued service.

### When Required
| Scenario | Frequency |
|---|---|
| Rental properties (England) | Every 5 years or at change of tenancy |
| Owner-occupied homes | Recommended every 10 years |
| Commercial / industrial | Varies by insurer and risk assessment |

### Legal Basis
- Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
- BS 7671:2018+A4:2026

### Who Issues It
A qualified, competent electrician — typically NICEIC-registered contractor or equivalent (NAPIT, ELECSA).

### Output Structure
| Section | Content |
|---|---|
| Overall assessment | **Satisfactory** or **Unsatisfactory** |
| Observations | Coded observations against each item |
| Schedule of Test Results | Instrument readings for each circuit |
| Schedule of Inspections | Visual check results against BS 7671 |

### Observation Codes
| Code | Meaning | Action Required |
|---|---|---|
| **C1** | Danger present — risk of injury | Immediate remedial action |
| **C2** | Potentially dangerous | Urgent remedial action |
| **C3** | Improvement recommended | Non-urgent |
| **FI** | Further investigation required | Additional testing needed |

### Visual Inspection Checklist Items
- Consumer unit / distribution board: enclosure integrity, labelling, access
- Earthing & bonding: correct sizing, tightness, accessibility
- Protective devices: correct type & rating per circuit (MCBs, RCBOs, RCDs, SPDs)
- Cable types & routes: suitable for environment, not damaged, correct support
- Socket outlets, switches, accessories: condition, IP rating, mechanical damage
- Presence of supplementary bonding where required
- Signs of overheating, burning, or corrosion
- Compliance with current BS 7671 requirements

### Test Sequence (Instrument-Based)
1. **Continuity** of protective conductors (main + supplementary bonding)
2. **Continuity** of ring final circuit conductors
3. **Insulation resistance**
4. **Polarity** at all points
5. **Earth fault loop impedance** (Zs)
6. **RCD functionality** — trip time and trip current
7. **Earth electrode resistance** (where applicable)

### Delivery Timelines
| Recipient | Deadline |
|---|---|
| Existing tenants | Within 28 days of inspection |
| New tenants | Before move-in |
| Local authority (if requested) | Within 7 days |

---

## 2. EIC — Electrical Installation Certificate

**Purpose:** Certifies that _new_ work has been designed, constructed, inspected, and tested per BS 7671.

### EIC vs EICR
| | EIC | EICR |
|---|---|---|
| Covers | New work / alterations | Existing installations |
| When | At completion of work | Periodic / triggered |
| Certifies | Compliance at installation | Ongoing safety for service |

### Required When
- New electrical installation
- Addition or alteration requiring new circuit(s)
- Replacement of distribution board / consumer unit
- Any work changing the design characteristics of the installation

### Structure
| Declaration | Signed By |
|---|---|
| Design conforms to BS 7671 | Designer |
| Construction/installation conforms to BS 7671 | Installer |
| Inspection & testing conforms to BS 7671 | Inspector |
| Schedule of Test Results | (attached) |
| Schedule of Inspections | (attached) |

### Key Checklist Items
- Earthing and bonding verified
- Protective device coordination verified
- All test results recorded on Schedule of Test Results
- RCDs tested — trip times recorded
- SPDs installed where required (per BS 7671 Amendment 4)
- Schedule of Inspections completed

---

## 3. Minor Works Certificate

**Purpose:** A shorter certificate for minor work that does NOT include a new circuit.

### Required When
- Adding a socket to an existing ring final
- Replacing a light fitting
- Adding a fused connection unit (spur)
- Any addition/alteration to an existing circuit without a new circuit

### NOT Required When
- The work adds a new circuit → use EIC
- Like-for-like replacement of a single accessory (e.g. swapping a cracked socket)

### Checklist Items
- Visual inspection of the work undertaken
- Polarity check of the affected circuit
- Continuity of protective conductors for the work area
- Insulation resistance of the modified circuit
- RCD functionality (if RCD-protected)
- Confirmation that work does not impair safety of existing installation

---

## 4. Pre-Work / Site Safety Checklists

### 4a. RAMS — Risk Assessment & Method Statement

**Legal basis:** CDM 2015, Electricity at Work Regulations 1989

| Component | Content |
|---|---|
| **Risk Assessment** | Identifies hazards (electric shock, arc flash, falls, asbestos, confined spaces) and control measures |
| **Method Statement** | Step-by-step safe work procedure for the specific job |

**Requirement:** Must be site-specific, not generic.

### 4b. Permit to Work — Electrical Isolation / LOTO

**Used for:** High-risk tasks — working on/near live equipment, confined spaces, working at height.

| Step | Action |
|---|---|
| 1. Identify | All energy sources |
| 2. Isolate | Switch off at the isolator |
| 3. Lock Out | Lock the isolator |
| 4. Tag Out | Tag with name, date, contact |
| 5. Retain | Key held by person doing the work |
| 6. Prove Dead | Test with approved voltage detector before touching |
| 7. Re-energise | Defined procedure for safe re-energisation |

**Legal basis:** Electricity at Work Regulations 1989

### 4c. Daily Tool & Equipment Inspection

| Check | What to inspect |
|---|---|
| Portable electrical tools | Damage to cables, plugs, casings |
| Test equipment | GS38-compliant (fused leads, correct CAT rating for installation) |
| PPE | Insulated gloves, voltage-rated tools, hard hat, safety glasses |
| PAT testing records | Current and valid for all portable appliances |

### 4d. Toolbox Talks

Short pre-job safety briefings on topics such as:
- Safe isolation procedure
- Working at height
- Asbestos awareness
- Temporary power safety

**Output:** Documented attendance record (some clients/contractors require evidence).

---

## 5. Post-Work / Sign-Off Checklists

### 5a. Completion / Handover Checklist

- [ ] All works completed per specification and method statement
- [ ] Area cleaned, debris removed, access panels replaced
- [ ] All circuits left energised (or isolated per instructions) and clearly labelled
- [ ] Certificates issued (EIC, Minor Works, or EICR as applicable)
- [ ] Client/customer briefed on work done and any limitations
- [ ] Documentation handed over: certificates, test schedules, user instructions for new equipment

### 5b. Notification to Building Control (Part P)

| Work Type | Notification Required? |
|---|---|
| New circuit | Yes |
| Consumer unit replacement | Yes |
| Work in special locations (bathrooms, etc.) | Yes — new circuits and some alterations |
| Like-for-like replacements (not in special locations) | No |

**How:** Via a Competent Person Scheme (NICEIC, NAPIT, ELECSA) which self-certifies Part P compliance.

### 5c. Quality / Snagging Check

- Visual review of installation quality (cable routing, clipping, labelling)
- Functional test of all outlets, switches, and controls
- Verification that labelling matches the circuit schedule
- Photographic evidence (increasingly common for insurance and dispute resolution)

---

## 6. Maintenance & Periodic Checklists

### 6a. Emergency Lighting Test Log

| Test | Frequency | Action |
|---|---|---|
| Functional test | Monthly | Press test button, verify lamps operate |
| Full duration test | Annually | Simulate mains failure, verify lamps operate for rated duration (typically 3 hours) |

**Legal basis:** Regulatory Reform (Fire Safety) Order 2005

### 6b. Fire Alarm System Test Log

| Test | Frequency |
|---|---|
| Weekly test | At least one call point |
| Quarterly, 6-monthly, annual tests | By competent person |

All tests logged; any faults actioned.

### 6c. PAT Testing Schedule (Portable Appliance Testing)

| Environment | Class I (earthed) | Class II (double-insulated) |
|---|---|---|
| Construction site | 3 months | 3 months |
| Industrial / workshop | 12 months | 12–48 months |
| Commercial / office | 12–48 months | 24–48 months |
| Residential / hotel | 24 months | 24–48 months |

**Legal basis:** PUWER 1998

---

## Summary Table — All Checklists

| # | Checklist / Form | When Used | Frequency | Legal Basis |
|---|---|---|---|---|
| 1 | **EICR** | Existing installations (rental, commercial) | Every 5 years (rental) / 10 years (private) | Electrical Safety Standards (Private Rented Sector) Regs 2020 |
| 2 | **EIC** | New installations, major alterations | Per job | BS 7671, Part P Building Regulations |
| 3 | **Minor Works Certificate** | Additions/alterations without new circuit | Per job | BS 7671 |
| 4a | **RAMS** | Before starting any job | Per job | CDM 2015, Electricity at Work Regs 1989 |
| 4b | **Permit to Work / LOTO** | High-risk / live-adjacent work | Per job | Electricity at Work Regs 1989 |
| 4c | **Tool Inspection** | Daily start of work | Daily | HSE guidance, employer duty |
| 4d | **Toolbox Talks** | On-site briefings | Per job / per topic | HSE guidance, contractual |
| 5a | **Post-Work Sign-Off** | Before leaving site | Per job | Contractual / best practice |
| 5b | **Building Control Notification** | Notifiable work | Per notifiable job | Part P Building Regulations |
| 5c | **Quality / Snagging** | Post-installation review | Per job | Best practice |
| 6a | **Emergency Lighting Log** | Emergency lighting systems | Monthly + annually | Regulatory Reform (Fire Safety) Order 2005 |
| 6b | **Fire Alarm Log** | Fire alarm systems | Weekly through annually | Regulatory Reform (Fire Safety) Order 2005 |
| 6c | **PAT Testing** | Portable appliances | 3–48 months depending on risk | PUWER 1998 |

---

## Data Model Hints for Code Agents

When building templates and forms, consider these recurring data patterns:

### Common Fields Across Most Forms
- **Job reference / ID**
- **Date of inspection / work / test**
- **Electrician name & registration number** (NICEIC / NAPIT / ELECSA)
- **Client name & address** (or property address for rental EICR)
- **Signature(s)** — designer, installer, inspector, recipient
- **Next inspection / test due date**

### Circuit-Level Data (EIC, EICR, Minor Works)
- Circuit designation / label
- Overcurrent protective device type & rating (e.g. "B32 MCB")
- RCD type & rating (e.g. "30mA Type A")
- Number of points served
- Conductor CSA (mm²) — line, neutral, CPC
- Test results per circuit (Zs, R1+R2, insulation resistance, etc.)

### Observation Data (EICR)
- Item number from the schedule
- Location / circuit
- Observation description
- Code (C1 / C2 / C3 / FI)
- Remedial action taken or recommended

### Hazard Data (RAMS)
- Hazard category (electric shock, arc flash, fall, asbestos, confined space, etc.)
- Risk level (low / medium / high) — before and after controls
- Control measure(s)
- Responsible person

---

## Caveats

1. **Not yet validated with a practising electrician.** This is desk research — real-world forms may differ in detail, order, or jurisdictional variation (Scotland and Northern Ireland may have separate requirements).
2. **BS 7671 Amendment 4 (2026)** is the latest at time of research. Future amendments may add or change requirements (SPDs, AFDDs, EV charger circuits, etc.).
3. **Forms are also available as official IET model forms** — free PDFs from the IET website. These are the canonical reference and should be consulted for exact field-by-field layout.
4. **Competitor tools** (Tradify, NICEIC Cert Software, etc.) may already digitise some of these — the AI value-add is the _photo → auto-fill_ pipeline, not just digital forms.
