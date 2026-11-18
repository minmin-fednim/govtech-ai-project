# context-skill-ceo-dashboard.md · Chief Executive dashboard (made up)

**Scenario:** B · ICA passport applications and renewals

All numbers, dates and files here are made up (synthetic).

**Purpose:** Show one marked signal that tests the riskiest assumption, so the Chief Executive can ask "does it prove anything?" and get a yes or no. It is not a wall of numbers.

**Assumption under test:** Applicants edit their submission when prompted that there are errors, and make correct edits. (From `day2-validate/build-log.md`.)

**The one marked signal:** Share of flagged problems fixed correctly on the first try, against the 9 in 10 goal (made up).

**Kill switch:** If applicants get stuck or edit wrongly, stop and redesign the prompt before building more. The dashboard marks this as "Below kill-switch line".

**Sources:**
- `one-pager.md` (goal metric, 17% now, made up)
- `day2-validate/build-log.md` (the assumption, kill switch and the Chief Executive's objection)
- `metrics.csv` (synthetic, labelled "made up", planned, not in the repo yet)

**Rules:**
- Show the first-try fix rate first. The return rate (17% now, made up) goes second and is context only.
- Every number shows its date range and its source.
- Missing data is shown as a gap, never as a zero.
- Mark the signal clearly: "Met the goal", "Below the goal" or "Below kill-switch line". Never leave it unmarked.
- Show only these two numbers until someone is named to act on them. Add others later.
- Return rate = applications returned for errors or missing documents, divided by applications submitted, in the same date range.
- The dashboard only reports. It never says an application is approved or rejected.
- Label every sample number "made up".

**Good:** "First-try fix rate 8 of 10 (1 to 7 Oct, metrics.csv, made up). Below the 9 in 10 goal."

**Good:** "No data for 14 Oct. Shown as a gap, not a zero."

**Bad:** "Applications are improving!" (no number, no date range, no source, no mark)

**Owner:** product lead (made-up role, no name). Who acts on the return rate: not set yet.

**Review when:** the assumption or kill switch in `build-log.md` changes, the return-rate definition changes, or an owner is named.
