# context-skill-ceo-dashboard.md · Chief Executive dashboard (made up)

**Scenario:** B · ICA passport applications and renewals

All numbers, dates and files here are made up (synthetic).

**Purpose:** Show whether the application return rate is falling.

**Sources:**
- `one-pager.md` (goal metric, 17% now, made up)
- `day2-validate/build-log.md` (the Chief Executive's objection and my reply)
- `metrics.csv` (synthetic, planned, not in the repo yet)

**Rules:**
- Return rate = applications returned for errors or missing documents, divided by applications submitted, in the same date range.
- Every number shows its date range and its source.
- Missing data is shown as a gap, never as a zero.
- Show only the return rate until someone is named to act on it. Add other numbers later.
- The dashboard only reports. It never says an application is approved or rejected.

**Good:** "Return rate 14% (1 to 30 Sep, metrics.csv), down from 17%."

**Good:** "No data for 14 Sep. Shown as a gap, not a zero."

**Bad:** "Applications are improving!" (no number, no date range, no source)

**Owner:** product lead (made-up role, no name). Who acts on the return rate: not set yet.

**Review when:** the return-rate definition changes, or an owner is named.
