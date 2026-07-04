import { Checklist } from "./types";

export const checklists: Checklist[] = [
  {
    slug: "eicr",
    name: "EICR — Electrical Installation Condition Report",
    category: "certification",
    description:
      "Periodic inspection of an existing installation to determine if it remains safe for continued service.",
    frequency: "Every 5 years (rental) / 10 years (private)",
    legalBasis:
      "Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020",
    sections: [
      {
        title: "Overall Assessment",
        fields: [
          { id: "eicr-assessment", label: "Assessment", type: "select", options: ["Satisfactory", "Unsatisfactory"] },
          { id: "eicr-inspector", label: "Inspector Name", type: "text" },
          { id: "eicr-reg-number", label: "Registration Number", type: "text" },
          { id: "eicr-date", label: "Inspection Date", type: "text" },
          { id: "eicr-next-due", label: "Next Inspection Due", type: "text" },
        ],
      },
      {
        title: "Observations",
        fields: [
          { id: "eicr-obs-item1", label: "Consumer unit condition", type: "code", options: ["C1", "C2", "C3", "FI"] },
          { id: "eicr-obs-item2", label: "Earthing & bonding adequacy", type: "code", options: ["C1", "C2", "C3", "FI"] },
          { id: "eicr-obs-item3", label: "Protective device coordination", type: "code", options: ["C1", "C2", "C3", "FI"] },
          { id: "eicr-obs-item4", label: "Cable condition & routing", type: "code", options: ["C1", "C2", "C3", "FI"] },
          { id: "eicr-obs-item5", label: "Socket / accessory condition", type: "code", options: ["C1", "C2", "C3", "FI"] },
          { id: "eicr-obs-item6", label: "Signs of overheating or corrosion", type: "code", options: ["C1", "C2", "C3", "FI"] },
        ],
      },
      {
        title: "Schedule of Test Results",
        fields: [
          { id: "eicr-continuity", label: "Continuity of protective conductors", type: "text" },
          { id: "eicr-ring", label: "Ring final circuit continuity", type: "text" },
          { id: "eicr-insulation", label: "Insulation resistance", type: "text" },
          { id: "eicr-polarity", label: "Polarity at all points", type: "text" },
          { id: "eicr-zs", label: "Earth fault loop impedance (Zs)", type: "text" },
          { id: "eicr-rcd", label: "RCD trip time", type: "text" },
        ],
      },
    ],
    mockData: {
      "eicr-assessment": "Satisfactory",
      "eicr-inspector": "James Brennan",
      "eicr-reg-number": "NICEIC 612345",
      "eicr-date": "03/07/2026",
      "eicr-next-due": "03/07/2031",
      "eicr-obs-item1": "C3",
      "eicr-obs-item2": "C3",
      "eicr-obs-item3": "C2",
      "eicr-obs-item4": "C3",
      "eicr-obs-item5": "C2",
      "eicr-obs-item6": "C1",
      "eicr-continuity": "0.05 Ω — PASS",
      "eicr-ring": "r1: 0.38 Ω, rn: 0.38 Ω, r2: 0.61 Ω — PASS",
      "eicr-insulation": ">299 MΩ — PASS",
      "eicr-polarity": "All outlets correct — PASS",
      "eicr-zs": "0.42 Ω (max 1.37 Ω) — PASS",
      "eicr-rcd": "18.4 ms at 1× — PASS",
    },
  },
  {
    slug: "eic",
    name: "EIC — Electrical Installation Certificate",
    category: "certification",
    description:
      "Certifies that new work has been designed, constructed, inspected, and tested per BS 7671.",
    frequency: "Per job",
    legalBasis: "BS 7671, Part P Building Regulations",
    sections: [
      {
        title: "Declarations",
        fields: [
          { id: "eic-designer", label: "Designer Name", type: "text" },
          { id: "eic-installer", label: "Installer Name", type: "text" },
          { id: "eic-inspector", label: "Inspector Name", type: "text" },
          { id: "eic-date", label: "Completion Date", type: "text" },
          { id: "eic-job-ref", label: "Job Reference", type: "text" },
        ],
      },
      {
        title: "Supply Characteristics",
        fields: [
          { id: "eic-supply-type", label: "Supply Type", type: "select", options: ["TN-S", "TN-C-S", "TT", "IT"] },
          { id: "eic-voltage", label: "Nominal Voltage", type: "text" },
          { id: "eic-frequency", label: "Frequency", type: "text" },
          { id: "eic-main-switch", label: "Main Switch Rating", type: "text" },
        ],
      },
      {
        title: "Schedule of Test Results",
        fields: [
          { id: "eic-continuity", label: "Continuity of protective conductors", type: "text" },
          { id: "eic-insulation", label: "Insulation resistance", type: "text" },
          { id: "eic-polarity", label: "Polarity", type: "text" },
          { id: "eic-zs", label: "Earth fault loop impedance (Zs)", type: "text" },
          { id: "eic-rcd", label: "RCD trip time", type: "text" },
        ],
      },
    ],
    mockData: {
      "eic-designer": "James Brennan",
      "eic-installer": "James Brennan",
      "eic-inspector": "Sarah Okonkwo",
      "eic-date": "03/07/2026",
      "eic-job-ref": "JOB-2026-0147",
      "eic-supply-type": "TN-C-S",
      "eic-voltage": "230 V AC",
      "eic-frequency": "50 Hz",
      "eic-main-switch": "100 A",
      "eic-continuity": "0.04 Ω — PASS",
      "eic-insulation": ">299 MΩ — PASS",
      "eic-polarity": "All circuits correct — PASS",
      "eic-zs": "0.35 Ω (max 1.37 Ω) — PASS",
      "eic-rcd": "22.1 ms at 1× — PASS",
    },
  },
  {
    slug: "minor-works",
    name: "Minor Works Certificate",
    category: "certification",
    description:
      "A shorter certificate for minor work that does not include a new circuit (e.g., adding a socket, replacing a light fitting).",
    frequency: "Per job",
    legalBasis: "BS 7671",
    sections: [
      {
        title: "Work Details",
        fields: [
          { id: "minor-works-electrician", label: "Electrician Name", type: "text" },
          { id: "minor-works-date", label: "Date of Work", type: "text" },
          { id: "minor-works-description", label: "Description of Work", type: "multi-line" },
          { id: "minor-works-circuit", label: "Circuit Modified", type: "text" },
        ],
      },
      {
        title: "Test Results",
        fields: [
          { id: "minor-works-polarity", label: "Polarity of affected circuit", type: "text" },
          { id: "minor-works-continuity", label: "Continuity of protective conductors", type: "text" },
          { id: "minor-works-insulation", label: "Insulation resistance", type: "text" },
          { id: "minor-works-rcd", label: "RCD functionality (if applicable)", type: "text" },
          { id: "minor-works-safety", label: "Work does not impair existing safety", type: "select", options: ["Confirmed", "Unconfirmed"] },
        ],
      },
    ],
    mockData: {
      "minor-works-electrician": "James Brennan",
      "minor-works-date": "03/07/2026",
      "minor-works-description": "Addition of double socket outlet to existing kitchen ring final circuit. Surface-mounted PVC conduit, 2.5 mm² T&E.",
      "minor-works-circuit": "Kitchen ring final (B32 MCB)",
      "minor-works-polarity": "Correct at new outlet — PASS",
      "minor-works-continuity": "0.06 Ω — PASS",
      "minor-works-insulation": ">299 MΩ — PASS",
      "minor-works-rcd": "21.7 ms at 1× (30 mA Type A) — PASS",
      "minor-works-safety": "Confirmed",
    },
  },
  {
    slug: "rams",
    name: "RAMS — Risk Assessment & Method Statement",
    category: "pre-work",
    description:
      "Identifies hazards and control measures, plus a step-by-step safe work procedure for the specific job.",
    frequency: "Per job",
    legalBasis: "CDM 2015, Electricity at Work Regulations 1989",
    sections: [
      {
        title: "Job Information",
        fields: [
          { id: "rams-site", label: "Site Address", type: "text" },
          { id: "rams-date", label: "Date", type: "text" },
          { id: "rams-electrician", label: "Responsible Electrician", type: "text" },
        ],
      },
      {
        title: "Hazard Identification",
        fields: [
          { id: "rams-hazard1", label: "Electric shock risk level", type: "select", options: ["Low", "Medium", "High"] },
          { id: "rams-hazard2", label: "Arc flash risk level", type: "select", options: ["Low", "Medium", "High"] },
          { id: "rams-hazard3", label: "Working at height risk level", type: "select", options: ["Low", "Medium", "High"] },
          { id: "rams-hazard4", label: "Asbestos risk level", type: "select", options: ["Low", "Medium", "High"] },
          { id: "rams-hazard5", label: "Confined space risk level", type: "select", options: ["Low", "Medium", "High"] },
        ],
      },
      {
        title: "Method Statement",
        fields: [
          { id: "rams-step1", label: "Step 1: Safe isolation procedure", type: "text" },
          { id: "rams-step2", label: "Step 2: Prove dead", type: "text" },
          { id: "rams-step3", label: "Step 3: Work execution", type: "text" },
          { id: "rams-step4", label: "Step 4: Inspection & testing", type: "text" },
          { id: "rams-step5", label: "Step 5: Re-energisation", type: "text" },
        ],
      },
    ],
    mockData: {
      "rams-site": "14 Acacia Gardens, Manchester M20 3PQ",
      "rams-date": "03/07/2026",
      "rams-electrician": "James Brennan",
      "rams-hazard1": "Medium",
      "rams-hazard2": "Low",
      "rams-hazard3": "Low",
      "rams-hazard4": "Low",
      "rams-hazard5": "Low",
      "rams-step1": "Isolate at main switch (consumer unit), lock off with personal padlock, attach danger tag.",
      "rams-step2": "Use GS38-compliant voltage detector on incoming side, then outgoing side of isolator.",
      "rams-step3": "Replace 2-gang socket, surface mount, 2.5 mm² T&E. Check cable condition, tighten terminals to 1.2 Nm.",
      "rams-step4": "Continuity, insulation resistance, Zs, and RCD trip time per BS 7671.",
      "rams-step5": "Remove lock and tag, restore supply, verify RCD test button, functional test of socket.",
    },
  },
  {
    slug: "permit-to-work",
    name: "Permit to Work / LOTO",
    category: "pre-work",
    description:
      "Used for high-risk tasks — working on/near live equipment, confined spaces, work at height — covering safe isolation via Lock Out Tag Out.",
    frequency: "Per job",
    legalBasis: "Electricity at Work Regulations 1989",
    sections: [
      {
        title: "Permit Details",
        fields: [
          { id: "ptw-location", label: "Work Location", type: "text" },
          { id: "ptw-date", label: "Date", type: "text" },
          { id: "ptw-authorised", label: "Authorised Person", type: "text" },
          { id: "ptw-worker", label: "Person Doing Work", type: "text" },
        ],
      },
      {
        title: "Isolation Verification",
        fields: [
          { id: "ptw-step1", label: "1. All energy sources identified", type: "select", options: ["Yes", "No"] },
          { id: "ptw-step2", label: "2. Isolator switched off", type: "select", options: ["Yes", "No"] },
          { id: "ptw-step3", label: "3. Lock applied (key retained by worker)", type: "select", options: ["Yes", "No"] },
          { id: "ptw-step4", label: "4. Tag applied (name, date, contact)", type: "select", options: ["Yes", "No"] },
          { id: "ptw-step5", label: "5. Proved dead with approved voltage detector", type: "select", options: ["Yes", "No"] },
          { id: "ptw-step6", label: "6. Re-energisation procedure defined", type: "select", options: ["Yes", "No"] },
        ],
      },
    ],
    mockData: {
      "ptw-location": "14 Acacia Gardens, Consumer Unit",
      "ptw-date": "03/07/2026",
      "ptw-authorised": "Sarah Okonkwo",
      "ptw-worker": "James Brennan",
      "ptw-step1": "Yes",
      "ptw-step2": "Yes",
      "ptw-step3": "Yes",
      "ptw-step4": "Yes",
      "ptw-step5": "Yes",
      "ptw-step6": "Yes",
    },
  },
  {
    slug: "tool-inspection",
    name: "Daily Tool & Equipment Inspection",
    category: "pre-work",
    description:
      "Pre-work check of portable electrical tools, test equipment, and PPE to ensure everything is safe and serviceable.",
    frequency: "Daily",
    legalBasis: "HSE guidance, employer duty",
    sections: [
      {
        title: "Tool Checks",
        fields: [
          { id: "tool-date", label: "Date", type: "text" },
          { id: "tool-electrician", label: "Electrician", type: "text" },
          { id: "tool-cables", label: "Portable tool cables undamaged", type: "select", options: ["Pass", "Fail"] },
          { id: "tool-plugs", label: "Plugs intact, pins straight", type: "select", options: ["Pass", "Fail"] },
          { id: "tool-casings", label: "Tool casings free of cracks", type: "select", options: ["Pass", "Fail"] },
          { id: "tool-test-equip", label: "Test equipment GS38 compliant", type: "select", options: ["Pass", "Fail"] },
          { id: "tool-ppe", label: "PPE inspected and present", type: "select", options: ["Pass", "Fail"] },
          { id: "tool-pat", label: "PAT labels valid and in-date", type: "select", options: ["Pass", "Fail"] },
        ],
      },
    ],
    mockData: {
      "tool-date": "03/07/2026",
      "tool-electrician": "James Brennan",
      "tool-cables": "Pass",
      "tool-plugs": "Pass",
      "tool-casings": "Pass",
      "tool-test-equip": "Pass",
      "tool-ppe": "Pass",
      "tool-pat": "Pass",
    },
  },
  {
    slug: "toolbox-talks",
    name: "Toolbox Talk Record",
    category: "pre-work",
    description:
      "Short pre-job safety briefing on topics such as safe isolation, working at height, or asbestos awareness. Documents attendance.",
    frequency: "Per job / per topic",
    legalBasis: "HSE guidance, contractual",
    sections: [
      {
        title: "Talk Details",
        fields: [
          { id: "talk-date", label: "Date", type: "text" },
          { id: "talk-topic", label: "Topic", type: "select", options: ["Safe Isolation Procedure", "Working at Height", "Asbestos Awareness", "Temporary Power Safety", "Manual Handling"] },
          { id: "talk-presenter", label: "Presenter", type: "text" },
          { id: "talk-summary", label: "Key Points Discussed", type: "multi-line" },
          { id: "talk-attendees", label: "Attendees (names)", type: "multi-line" },
          { id: "talk-questions", label: "Questions / concerns raised", type: "multi-line" },
        ],
      },
    ],
    mockData: {
      "talk-date": "03/07/2026",
      "talk-topic": "Safe Isolation Procedure",
      "talk-presenter": "James Brennan",
      "talk-summary": "Reviewed 7-step safe isolation: identify, isolate, lock out, tag out, retain key, prove dead, re-energise procedure. Emphasised always using GS38-compliant voltage detector. Discussed recent incident where failure to prove dead led to arc flash injury.",
      "talk-attendees": "James Brennan, Sarah Okonkwo, David Chen, Maria Kowalski",
      "talk-questions": "David asked about proving dead on 3-phase boards — confirmed test across all three phases + neutral + earth.",
    },
  },
  {
    slug: "completion-handover",
    name: "Completion / Handover Checklist",
    category: "post-work",
    description:
      "Ensures all works are complete, the area is clean, certificates are issued, and the client has been briefed before the electrician leaves site.",
    frequency: "Per job",
    legalBasis: "Contractual / best practice",
    sections: [
      {
        title: "Completion Checks",
        fields: [
          { id: "handover-date", label: "Date", type: "text" },
          { id: "handover-electrician", label: "Electrician", type: "text" },
          { id: "handover-works", label: "All works completed per specification", type: "select", options: ["Yes", "No"] },
          { id: "handover-clean", label: "Area cleaned, debris removed, panels replaced", type: "select", options: ["Yes", "No"] },
          { id: "handover-energised", label: "Circuits energised/isolated per instructions", type: "select", options: ["Yes", "No"] },
          { id: "handover-certs", label: "Certificates issued (EIC / Minor Works / EICR)", type: "select", options: ["Yes", "No", "N/A"] },
          { id: "handover-briefed", label: "Client briefed on work done and limitations", type: "select", options: ["Yes", "No"] },
          { id: "handover-docs", label: "Documentation handed over", type: "select", options: ["Yes", "No"] },
          { id: "handover-photos", label: "Photographic evidence captured", type: "select", options: ["Yes", "No"] },
        ],
      },
    ],
    mockData: {
      "handover-date": "03/07/2026",
      "handover-electrician": "James Brennan",
      "handover-works": "Yes",
      "handover-clean": "Yes",
      "handover-energised": "Yes",
      "handover-certs": "Yes",
      "handover-briefed": "Yes",
      "handover-docs": "Yes",
      "handover-photos": "Yes",
    },
  },
  {
    slug: "building-control",
    name: "Building Control Notification (Part P)",
    category: "post-work",
    description:
      "Records notification to Building Control for notifiable electrical work via a Competent Person Scheme (NICEIC, NAPIT, ELECSA).",
    frequency: "Per notifiable job",
    legalBasis: "Part P Building Regulations",
    sections: [
      {
        title: "Notification Details",
        fields: [
          { id: "bc-date", label: "Date", type: "text" },
          { id: "bc-electrician", label: "Electrician", type: "text" },
          { id: "bc-scheme", label: "Competent Person Scheme", type: "select", options: ["NICEIC", "NAPIT", "ELECSA"] },
          { id: "bc-reg-number", label: "Scheme Registration Number", type: "text" },
          { id: "bc-work-type", label: "Type of Notifiable Work", type: "select", options: ["New circuit", "Consumer unit replacement", "Work in special location (bathroom)", "Other"] },
          { id: "bc-ref", label: "Building Control Reference", type: "text" },
          { id: "bc-status", label: "Notification Status", type: "select", options: ["Submitted", "Acknowledged", "Certificate issued"] },
        ],
      },
    ],
    mockData: {
      "bc-date": "03/07/2026",
      "bc-electrician": "James Brennan",
      "bc-scheme": "NICEIC",
      "bc-reg-number": "612345",
      "bc-work-type": "Consumer unit replacement",
      "bc-ref": "NICEIC-2026-07842",
      "bc-status": "Submitted",
    },
  },
  {
    slug: "quality-snagging",
    name: "Quality / Snagging Check",
    category: "post-work",
    description:
      "Visual review of installation quality including cable routing, labelling, functional tests, and photographic evidence.",
    frequency: "Per job",
    legalBasis: "Best practice",
    sections: [
      {
        title: "Quality Review",
        fields: [
          { id: "snag-date", label: "Date", type: "text" },
          { id: "snag-electrician", label: "Electrician", type: "text" },
          { id: "snag-cable-routing", label: "Cable routing neat and clipped", type: "select", options: ["Pass", "Fail", "N/A"] },
          { id: "snag-labelling", label: "Labelling matches circuit schedule", type: "select", options: ["Pass", "Fail", "N/A"] },
          { id: "snag-outlets", label: "All outlets functional", type: "select", options: ["Pass", "Fail", "N/A"] },
          { id: "snag-switches", label: "All switches and controls functional", type: "select", options: ["Pass", "Fail", "N/A"] },
          { id: "snag-photos", label: "Photographic evidence captured", type: "select", options: ["Yes", "No"] },
          { id: "snag-notes", label: "Snagging Notes", type: "multi-line" },
        ],
      },
    ],
    mockData: {
      "snag-date": "03/07/2026",
      "snag-electrician": "James Brennan",
      "snag-cable-routing": "Pass",
      "snag-labelling": "Pass",
      "snag-outlets": "Pass",
      "snag-switches": "Pass",
      "snag-photos": "Yes",
      "snag-notes": "Minor paint touch-up needed around new socket in hallway. Otherwise all work to standard.",
    },
  },
  {
    slug: "emergency-lighting",
    name: "Emergency Lighting Test Log",
    category: "maintenance",
    description:
      "Records monthly functional tests and annual full-duration tests of emergency lighting systems.",
    frequency: "Monthly + annually",
    legalBasis: "Regulatory Reform (Fire Safety) Order 2005",
    sections: [
      {
        title: "Test Record",
        fields: [
          { id: "el-site", label: "Site / Building", type: "text" },
          { id: "el-date", label: "Test Date", type: "text" },
          { id: "el-type", label: "Test Type", type: "select", options: ["Monthly functional", "Annual full duration"] },
          { id: "el-electrician", label: "Tester Name", type: "text" },
          { id: "el-lamps-tested", label: "Number of Lamps Tested", type: "number" },
          { id: "el-lamps-passed", label: "Number of Lamps Passed", type: "number" },
          { id: "el-duration", label: "Duration Achieved", type: "text" },
          { id: "el-faults", label: "Faults Identified", type: "multi-line" },
          { id: "el-remedial", label: "Remedial Action Required", type: "multi-line" },
        ],
      },
    ],
    mockData: {
      "el-site": "Riverside Office Park, Block B",
      "el-date": "03/07/2026",
      "el-type": "Monthly functional",
      "el-electrician": "James Brennan",
      "el-lamps-tested": "24",
      "el-lamps-passed": "23",
      "el-duration": "3 hours (rated)",
      "el-faults": "Lamp 7 (stairwell south) failed to illuminate. Suspect battery pack end-of-life.",
      "el-remedial": "Replace battery pack for Lamp 7. Retest within 7 days.",
    },
  },
  {
    slug: "fire-alarm",
    name: "Fire Alarm System Test Log",
    category: "maintenance",
    description:
      "Records weekly fire alarm tests and periodic competent-person inspections for fire alarm systems.",
    frequency: "Weekly + quarterly + annually",
    legalBasis: "Regulatory Reform (Fire Safety) Order 2005",
    sections: [
      {
        title: "Test Record",
        fields: [
          { id: "fa-site", label: "Site / Building", type: "text" },
          { id: "fa-date", label: "Test Date", type: "text" },
          { id: "fa-type", label: "Test Type", type: "select", options: ["Weekly call point", "Quarterly inspection", "6-month inspection", "Annual inspection"] },
          { id: "fa-tester", label: "Tester Name", type: "text" },
          { id: "fa-call-point", label: "Call Point Tested", type: "text" },
          { id: "fa-sounders", label: "Sounders/beacons operational", type: "select", options: ["All OK", "Faults found"] },
          { id: "fa-panel", label: "Control panel status", type: "select", options: ["Normal", "Fault", "Disabled"] },
          { id: "fa-faults", label: "Faults Identified", type: "multi-line" },
        ],
      },
    ],
    mockData: {
      "fa-site": "Riverside Office Park, Block B",
      "fa-date": "03/07/2026",
      "fa-type": "Weekly call point",
      "fa-tester": "James Brennan",
      "fa-call-point": "First floor — landing (Zone 3)",
      "fa-sounders": "All OK",
      "fa-panel": "Normal",
      "fa-faults": "None.",
    },
  },
  {
    slug: "pat-testing",
    name: "PAT Testing Schedule",
    category: "maintenance",
    description:
      "Records portable appliance testing (PAT) with inspection intervals determined by environment and appliance class.",
    frequency: "3–48 months depending on risk",
    legalBasis: "PUWER 1998",
    sections: [
      {
        title: "Appliance Test Record",
        fields: [
          { id: "pat-date", label: "Test Date", type: "text" },
          { id: "pat-tester", label: "Tester Name", type: "text" },
          { id: "pat-appliance", label: "Appliance Name / ID", type: "text" },
          { id: "pat-class", label: "Appliance Class", type: "select", options: ["Class I (earthed)", "Class II (double-insulated)"] },
          { id: "pat-environment", label: "Environment", type: "select", options: ["Construction", "Industrial", "Commercial", "Residential"] },
          { id: "pat-earth", label: "Earth continuity (Class I only)", type: "text" },
          { id: "pat-insulation", label: "Insulation resistance", type: "text" },
          { id: "pat-visual", label: "Visual inspection", type: "select", options: ["Pass", "Fail"] },
          { id: "pat-result", label: "Overall Result", type: "select", options: ["Pass", "Fail"] },
          { id: "pat-next-due", label: "Next Test Due", type: "text" },
        ],
      },
    ],
    mockData: {
      "pat-date": "03/07/2026",
      "pat-tester": "James Brennan",
      "pat-appliance": "SDS Hammer Drill — Makita HR2641",
      "pat-class": "Class I (earthed)",
      "pat-environment": "Construction",
      "pat-earth": "0.08 Ω — PASS",
      "pat-insulation": ">299 MΩ — PASS",
      "pat-visual": "Pass",
      "pat-result": "Pass",
      "pat-next-due": "03/10/2026 (3 months — construction site)",
    },
  },
];

export function getChecklistBySlug(slug: string): Checklist | undefined {
  return checklists.find((c) => c.slug === slug);
}

export function getChecklistsByCategory(): Record<string, Checklist[]> {
  const grouped: Record<string, Checklist[]> = {
    certification: [],
    "pre-work": [],
    "post-work": [],
    maintenance: [],
  };
  for (const c of checklists) {
    grouped[c.category].push(c);
  }
  return grouped;
}
