# Eval plan: passport application checker

**Scenario:** B · ICA passport applications and renewals
All inputs, roles and numbers are made up (synthetic). Roles only, no names.

**Status:** First written as Proposed. The Agent creator then said "you decide", so Claude set every decision below. **They are decided on delegation, not chosen by the Agent creator.** Read them once and change any you disagree with. Anything that needs a real person or a real number is **Not set yet**.

**Role holder for now:** the Agent creator holds every role here except ICA officer (`day3-build/operating-model.md`). One person owning, running and signing the eval is not a real check. It is a placeholder until real people are named.

Built from `day4-measure/human-rubric.md` (what to score, the pass bar) and `day4-measure/eval-results.md` (the first run).

## Who owns what

| Job | Role | Why this role | Not set yet |
|---|---|---|---|
| **Signs the pass bar** | **Service sponsor**. Consulted: Rules owner, Officer team lead. | The sponsor decides go-live, so should own the bar that gates it. | The bar is currently set by the Agent creator. A real sponsor must confirm it. |
| **Writes and refreshes the test cases** | **Rules owner** writes. The **Prototype owner** drafts. An **ICA officer** reads for realism. | The rules are the scope. A case that disagrees with the rules is the Rules owner's to fix. | Who the ICA officer is. |
| **Runs the eval** | **Engineering lead**. The **Prototype owner** runs it until an engineering lead exists. | The run is the same each time, from the steps in the rubric under "Running this eval again". | Who, and how the live agent is run. No live agent exists. |
| **Reviews a weekly sample** | An **ICA officer**, picked by the **Officer team lead**. The **Rules owner** reads the result. | Officers know what a good flag looks like, and they are the second grader the rubric needs. | Which officer. This is extra officer work, which the stop line says must not rise: it is capped at one hour a week (made up). |

**Refresh the cases** when a rule changes, when the weekly sample shows a miss the 12 cases do not cover (add a case for it), and at least every 3 months. Cases are made up, so refresh never needs real applications.

**The weekly sample.** Once a pilot runs: 10 logged answers chosen at random, plus **every** "Needs an ICA officer" and "No rule found" line. Those lines are the only record of cases that reach nobody otherwise (`CLAUDE.md`). Scored with the same four questions. Before a pilot there is no real traffic, so there is no sample.

## When it runs

| When | What runs | Who must see it |
|---|---|---|
| **Before go-live** | All 12 cases, scored by two graders who agree (calibrated), the bar met, and no deal-breaker failed. | Service sponsor signs. |
| **Before every change** to `CLAUDE.md`, the rules, the document list, a file limit or the model | All 12 cases again, not only the one that changed. | Rules owner. The change is not saved as live until it passes. |
| **Every week** | All 12 cases, plus the weekly sample once a pilot runs. | Rules owner and Officer team lead read the one-page result. |
| **When policy changes** | Within 2 working days of the change (made up): update the rules and cases first, add a case for the change, then run all 12. | Rules owner decides the change. Service sponsor is told. |

**A failed deal-breaker at any of these points stops the change or the pilot.** The Engineering lead may pause the agent first and tell the Service sponsor within 1 hour, as in `operating-model.md`. No off switch exists yet.

## How I'll know it's working

| Item | Value |
|---|---|
| **Goal** | Fewer applications returned by ICA officers. |
| **Baseline** | 17% returned (made up, `one-pager.md`). |
| **Target** | Below 10% in the pilot. |
| **Review date** | **30 days after the pilot starts.** The pilot has no start date, so no calendar date is set. Not set yet. |
| **Usage metric** | The number of applicants who start the check each week, as a share of applications started. Not set yet: the threshold, and where the number comes from (`one-pager.md` says a low start rate means the premise is wrong). |
| **Pattern to watch first** | **Applications returned after the agent said "File types and sizes look right".** The agent cannot read inside files (open decision 3). A missing second ID or a hospital note gets through it. Count these returns by reason from the first week. If they stay high, the return rate will not reach 10% however well the 12 cases pass. |
| **Stop line** | From `one-pager.md`: guidance is wrong, sensitive data is exposed, the return rate rises above 17%, or officer workload increases. Added by this plan: any deal-breaker fails in a weekly run, or the D4 average is below 4 in a weekly run. |

**What the eval cannot tell you.** It scores what the agent says, not whether returns fall. Passing all 12 does not mean the return rate will drop. Only the return rate, read by the Rules owner, says that. Nobody is named to read it yet.

## First 30 days

Days count from the day the plan is accepted. No pilot is running, so days 1 to 30 are preparation, not a live pilot. Not set yet: the start date.

| Days | What happens | Who | Done when |
|---|---|---|---|
| **1 to 3** | Confirm or change the decisions in this plan, the rubric and the scoring notes. | Agent creator | Every "Not set yet" is a name, a number, or a written reason it stays open. |
| **1 to 7** | Name the second grader (an ICA officer) and a deputy. Score the 12 cases blind and compare with `eval-results.md`. | Officer team lead, Agent creator | Calibrated: yes or no answers match on all 12, D4 within 1 on 10 of 12. |
| **1 to 7** | Settle the two open scoring notes in the rubric and the H2 stop-condition question. | Rules owner, Service sponsor | Written in the rubric. |
| **8 to 14** | First full weekly run on the calibrated rubric. Save `eval-results.md`. Rerun all 12 after any rule change. | Engineering lead or Prototype owner | The bar is met on all 12, or the failures are named with a fix. |
| **15 to 21** | Second weekly run. Compare with the first. Decide the pilot size and the officer workload baseline, which the bar and the stop line need. | Rules owner, Officer team lead | Both numbers written, not "Not set yet". |
| **22 to 30** | Third weekly run. Review: is the bar met three weeks in a row, and are the open decisions in `ai-prd.md` owned? Decide continue, pivot or stop. | Service sponsor | A written decision. Go-live only if all above are done. |

**What would stop this plan in the first 30 days:** no second grader named by day 7; a deal-breaker fail that is not fixed in a week; or no person named to own the return rate by day 21.

## Limits of this plan

- **No live agent has run.** Every score so far was written by the person who wrote the rules.
- **One person holds every role.** The plan has no real separation of duties until real people fill the roles.
- **The numbers are made up.** The 10-answer sample, the 1-hour cap and the 2-working-day window are starting points and need the real owners' agreement.
