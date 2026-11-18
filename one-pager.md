# One Pager

Use case: B · ICA passport applications (synthetic data only)

## Problem and user

ICA officers return 17% of 520,000 annual passport applications because of errors or missing documents. Each return adds about six days. Applicants do not know what a complete application looks like for their situation. Parents renewing for a child are the most confused group.

## Opportunity and evidence

**Status quo:** Applicants renew rarely (every 5 or 10 years), and only 38% read the guidance. They find out what is missing only after they submit. Walk-in counters can absorb only 35% of current online demand, and the vendor withdraws in 10 weeks.

**Quote (synthetic):** "The instructions are there, but I don't know which ones apply to my situation." — Applicant

## Experience and trust
## Risks (market, technical, team)

**Market: will applicants use the check before they submit?**
Only 38% read the guidance today, so applicants may skip the checklist too.
*How we will test it:* In the Show and Swap test, count how many participants start the checklist without being told to. A low start rate means the premise is wrong, so redesign the entry point. The threshold is not set yet.

**Technical: can the check flag the right problem without wrong flags?**
The tool could flag a good file, miss a real problem (a hospital note, one parent's ID), or give wrong guidance. Wrong guidance is already a stop-line trigger.
*How we will test it:* Run the Fix test on made-up edge cases and count wrong or missed flags. Any critical wrong guidance triggers the kill switch. The prototype keeps files in the browser, and any real version must protect sensitive data.

**Team: who owns the rules and the return-rate number?**
Rules change, and nobody is named to keep them current or to act on the return rate. Officers also must not get extra workload.
*How we will test it:* Before any pilot, name an owner for the rules and for the return rate, and agree a review point. Ask officers whether flagged cases save or add work. The workload baseline is not set yet.

**Partner's answer (what would make you trust this less?):** not collected yet
## Build plan and handoff
## Agent role and guardrails
## Roles and operating model
## Strategy and roadmap

**Diagnosis:** Applicants do not know what a complete application looks like for their situation, so officers return 17% of applications. Parents renewing for a child are the most confused.

**Guiding policy:** Check applications before they are submitted, on one page, starting with parents renewing for a child. We are not replacing officer judgement, and we are not building a dashboard yet.

**Coherent actions:**
1. A personal checklist for each situation.
2. Plain prompts that name the item and the fix.
3. The return rate as the one number, with an owner named before any dashboard.
## Metrics plan and stop line

**Goal metric:** Application return rate. 17% now, below 10% in the pilot. The longer-term target is 0.5%, if evidence shows it is achievable.

**Behaviour metric:** 9 in 10 applicants fix every flagged problem correctly on the first try (made-up target, from `day2-validate/build-log.md`).

**Stop line:** Stop or roll back if the guidance is wrong, sensitive data is exposed, the return rate rises above baseline, or officer workload increases.

**Not set yet:** pilot size and length, officer workload baseline, a days-to-complete target, and who acts on the return rate.
## Evals and gates
## Decision: continue, pivot or stop
## Open issues

Not set yet: pilot size and length, officer workload baseline, days-to-complete target, and who acts on the return rate.
