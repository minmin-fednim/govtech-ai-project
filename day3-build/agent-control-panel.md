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

## Permissions

Full table with all 21 actions, tiers and reasons: `day3-build/ai-prd.md`. **Status: Proposed.** Nobody has accepted these settings yet.

**Tiers:** read = looks only. draft = shows text in the chat. write = changes a file or record. send = acts outside the chat on a person or system.

**Who signs off:** the **Agent creator**. The Agent creator holds the Rules owner role for now, so signs every confirm. This is one person approving their own agent, which is a placeholder until real people are named (`day3-build/operating-model.md`).

| Setting | Count | Actions |
|---|---|---|
| **auto** (the agent does it alone) | 10 | Read the context files, the document list, and the file check results. Count items still to do. Show a flag message, "Looks complete" or "N still to do", "Needs clarification", the "an ICA officer must handle it" message, and the refusal of a decision request. Append one line to the run log. |
| **confirm** (the Agent creator approves first) | 2 | Draft a proposed change to a rule, document list or file limit. Resume work after a stop condition fired. |
| **block** (the agent never does it) | 9 | Edit a rule, the document list or a file limit. Edit `CLAUDE.md`, `one-pager.md` headings or the scenario. Open and read file contents. Keep any applicant detail after the session. Say approved, rejected, eligible or valid. Take payment. Submit an application. Send any message outside the chat. Use real data or touch a real system. |

**Open:** reading file contents is blocked until a privacy decision is made. Without it the agent cannot tell a hospital note from a birth certificate.

## When an ICA officer must handle it

Lost or stolen passport. Custody disagreement or legal matter. An unclear file. A request for a decision. Any rule change. A case the rules do not cover (it tries the lookup twice, then logs "No rule found").

The agent cannot contact anyone. It tells the applicant that an ICA officer must handle it and that the applicant must contact ICA. It never says it has passed the case on, and it does not invent contact details. No ICA contact route is set yet.

## When it stops

- Guidance is wrong.
- Sensitive data is exposed.
- Return rate rises above 17%.
- Officer workload increases.
- Fix rate stays below 9 in 10 after a retest.
- An applicant is stuck, or fixes the same prompt wrongly twice.
- A rule conflict, or the agent is unsure.

## What is tested, and what is not

- **Tested:** six hand-run cases: complete, escalate, refuse, and three break tests (empty enquiry, a policy page that does not exist, a lookup that finds nothing). The escalation and the lookup-finds-nothing cases each failed once, were fixed in `CLAUDE.md`, and passed on rerun. The empty enquiry passes only by accident.
- **Not tested:** no live agent has run. Real files, real users and real volume are untested.

## Known gaps

- Fixed: the consent row can now be skipped when both parents apply together. The skip is a button the applicant presses; nothing checks it is true.
- Fixed: the status box was blank and now shows text. Still open: the two test tickboxes show to applicants.
- Nobody is named to own the rules or the return rate.
- How often a human reviews the log is not set. The log is the only record when a case needs an officer, so until someone reads it, those cases reach nobody.
- Nobody is named for the roles in `day3-build/operating-model.md`. It is a proposal.
- Open decisions in `day3-build/ai-prd.md` (17) are not closed, including whether the agent may read file contents. Without it the agent cannot tell a hospital note from a birth certificate.
- **A setting the business owner would not sign: Permission 6 (auto), "Looks complete".** The agent checks only file type, size and whether a file is empty, so "Looks complete" is a claim nobody checked. This is open decision 17 in `ai-prd.md`. Do not sign this page as if that setting were agreed.

## Sign-off

By signing, I confirm I have read this page and `day3-build/CLAUDE.md`, and I accept the limits and gaps above.

**Name:** ______________________

**Role:** ______________________

**Date:** ______________________

**Signature:** ______________________
