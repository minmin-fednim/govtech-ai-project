# Build log

**Scenario:** B · ICA passport applications

All names, numbers and quotes are made up (synthetic).

## Three leaders

### 1. Director, Passport Operations

**Objection:** "My officers won't trust it."

**My reply:** The checklist only suggests. It never approves or rejects an application, and officers still make every decision. I will track how often officers disagree with what the checklist flagged, and why, so trust is measured and not assumed.

**The prototype must prove:** Applicants can tell what is a suggestion and what the officer decides. The page says so in plain words, and the checklist never says "approved" or "rejected".

### 2. Head of Product

**Objection:** "Better checklists won't help if applicants can't find the guidance."

**My reply:** Only 38% of applicants read the guidance today, so I put the check on one page where applicants already are. They pick who the passport is for, and the right list appears straight away. I will measure how many returned applications came from people who never opened the guidance.

**The prototype must prove:** An applicant gets the right list for their situation in one click, with no search and no extra pages. A parent sees the extra child items.

### 3. Chief Executive

**Objection:** "Where is my dashboard?"

**My reply:** Not yet. First I need to show that the prototype moves one number: the return rate (17% now, made up). I will name who acts on that number before I build any dashboard.

**The prototype must prove:** Applicants fix what is missing before they submit, so the return rate can fall. A wrong file type, an empty file or a missing document shows a clear message on that row, and the status turns green only when everything is done.

## Riskiest assumption

**Assumption:** Applicants edit their submission when they are prompted that there are errors, and make correct edits.

**Risk type:** Usability. Build a clickable mockup first.

**Kill switch:** Applicants understand the prompt and are able to edit correctly. If they do not, stop and redesign the prompt before building more.

**Kill-switch signal:** Applicants get stuck, or edit and get it wrong. For example, they pick a hospital note again, or add the same parent's ID twice.

**Success signal:** 9 in 10 applicants fix every flagged problem correctly on the first try (made-up target). Longer term, 9 in 10 applications are submitted with complete information and documents.

**How the prototype tests it:** The "Fix test" section on the prototype page has a made-up sample application with two planted problems: a hospital note instead of a birth certificate, and only one parent's ID. The participant clicks Fix this, picks a file from made-up samples (one right, two wrong), and sees a plain message if they pick wrong. The page counts how many problems were fixed correctly on the first try, and shows the running total against the 9 in 10 goal. Nothing is uploaded, and all names and files are made up.

## Toy or tool call

**My call: a tool in design, not yet proven. Treat it as a toy until a partner tries it cold.**

| Test (from the course) | Result | Why |
|---|---|---|
| Validates an assumption with clickable evidence | Yes | The Fix test tests the named assumption: applicants fix a flagged problem correctly. It counts first-try fixes against the 9 in 10 goal (made up). |
| Handles at least one user flow end to end | Yes, untested | A flagged problem leads to Fix this, a file pick, a plain message if wrong, a green result and a recorded count. I have not run it in a browser. |
| Survives when someone else uses it | Not tested | No partner has tried it cold. The Show and Swap note is still missing. |
| Generates a decision, not a reaction | Partly | It shows the first-try rate against the goal, but it never says continue, pivot or stop. |

**Where it is still a toy:**
- The count resets when the page reloads, so results must be written down by hand.
- It has no verdict line. A person has to read the number and decide.
- All files and rules are made up, so it cannot tell us how real applicants behave.

**What would make it a tool:**
1. A partner uses it cold, and I log what confused them.
2. The page shows a verdict: "Met the goal", "Below the goal" or "Below kill-switch line".
3. At least 10 participants are recorded, and the result decides continue, pivot or stop. The sample size is my suggestion, so change it if you like.

## Open questions

- Which officer team will review the returned-application data, and how often?
- What are ICA's real file types, size limit and photo rules? The prototype uses made-up values.
