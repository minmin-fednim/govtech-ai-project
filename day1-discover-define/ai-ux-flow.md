# AI-UX flow

**Scenario:** B · ICA passport applications and renewals

All numbers and examples are made up (synthetic).

## User flow

**Trigger:** The applicant opens the renewal page and picks who the passport is for: myself or my child.

**AI step:** The checklist for that situation appears. Each uploaded file is checked for type, size and fit, for example a hospital note instead of a birth certificate. Each problem gets a plain prompt.

**Human check:** The applicant fixes each flagged item. The status turns green only when all are fixed. An ICA officer makes the final decision on the submitted application.

**Outcome:** A complete submission, so fewer returns.

**Above the line (visible):** the checklist, upload buttons, tips, and the red or green status.

**Below the line (hidden):** document rules, file checks, "Needs clarification" cases, and hand-off to an officer for lost or stolen passports and custody disagreements.

## AI-UX readiness

**Scenario:** B · ICA passport applications
**Moment:** An applicant uploads a document and sees a flag with the reason.
**Level reached:** 1 of 3
**What we ship:** You cannot pass Level 2 yet, so ship a Level-2 UI: a reliable validator the user can check in under three seconds. A reliable validator beats a magical liar.

### Levels

- Level 01 · Trigger Accuracy: Pass. The checklist starts only after the applicant picks who the passport is for. It does not guess. (made up)
- Level 02 · System Transparency: Not yet. Flags give a reason, but not the exact rule. Next: show the rule next to each flag.
- Level 03 · Invisible Integration: Not yet. Track the share of applicants who fix a flag wrongly, every week. Until it drops, keep the validator UI.

### Trust gaps

- Black box: The applicant cannot see why a file was flagged. Move: One sentence that names the item and the rule.
- Hallucination: The tool flags a good file, or states a rule that does not exist. Move: A "Needs clarification" label and a route to an officer. It never says "rejected".
- Control: The applicant cannot undo or replace a file. Move: A Remove button, re-upload, and a safe way to submit anyway.
