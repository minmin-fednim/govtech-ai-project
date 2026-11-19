# Agent control panel

**Scenario:** B · ICA passport applications and renewals
All data is made up. Full rules are in `day3-build/CLAUDE.md`. Evidence is in `day3-build/agent-run-log.md`.

## What the agent does

Checks a passport application before it is submitted. Tells the applicant what is missing or wrong, in plain words. It suggests only. An ICA officer makes every decision.

## Goal and numbers

| Measure | Value |
|---|---|
| Return rate today | 17% (made up) |
| Pilot goal | below 10% |
| Applicants who fix every flagged problem on the first try | 9 in 10 (made-up target) |
| So far | 1 of 1 in a hand-run test. Too small to mean anything. |
| Pilot size and length | Not set yet |
| Officer workload baseline | Not set yet |

## What it can do

- Read the made-up rules and the document list.
- Check a file's type, size and whether it is empty.
- Say "Looks complete" or "N still to do".
- Write one line per check to the run log.

## What it can never do

- Say approved, rejected or eligible.
- Take payment, submit an application or send anything.
- Read or store a real document, name, ID number or date of birth.
- Invent a number. A missing number is "Not set yet".

## When it hands over to an ICA officer

Lost or stolen passport. Custody disagreement or legal matter. An unclear file. A request for a decision. Any rule change.

## When it stops

- Guidance is wrong.
- Sensitive data is exposed.
- Return rate rises above 17%.
- Officer workload increases.
- Fix rate stays below 9 in 10 after a retest.
- An applicant is stuck, or fixes the same prompt wrongly twice.
- A rule conflict, or the agent is unsure.

## What is tested, and what is not

- **Tested:** three hand-run cases: complete, escalate, refuse. All followed the rules.
- **Not tested:** no live agent has run. Real files, real users and real volume are untested.

## Known gaps

- The prototype always requires the consent row. The rules say only when one parent applies alone.
- The prototype's status box is blank, and its test tickboxes show to applicants.
- Nobody is named to own the rules or the return rate.
- How often a human reviews the log is not set.

## Sign-off

By signing, I confirm I have read this page and `day3-build/CLAUDE.md`, and I accept the limits and gaps above.

**Name:** ______________________

**Role:** ______________________

**Date:** ______________________

**Signature:** ______________________
