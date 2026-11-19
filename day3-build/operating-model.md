# Operating model: passport application checker

**Scenario:** B · ICA passport applications and renewals
All data, roles and numbers are made up (synthetic). Roles only, no names.

**Status:** Proposed. Written from `SCENARIO-PICK.md`, `one-pager.md`, `day3-build/agent-control-panel.md` and `day3-build/ai-prd.md`. The Agent creator holds every role that was unfilled, until real people are named. No role is filled by a named person. Until the owner accepts or changes this page, it is a draft.

## Roles

Each role is a job, not a person. One person may hold more than one role in a small pilot, except where the table says otherwise.

| Role | What it is | Filled by |
|---|---|---|
| **Prototype owner** | The learner who built the prototype and the agent files. Signs `agent-control-panel.md`. Signs confirms until a rules owner is named. | Agent creator |
| **Rules owner** | Owns the document rules and the return-rate number. Named before any pilot (`one-pager.md`). | Agent creator |
| **Service sponsor** | The ICA role accountable for the service. Decides whether it goes live and whether it stops. | Agent creator |
| **Engineering lead** | Builds and runs the system. Decides how, never what (see `ai-prd.md`, What engineering decides). | Agent creator |
| **Data protection lead** | Owns the privacy and security of applicant data. Decides whether the agent may read file contents. | Agent creator |
| **ICA officer** | Reviews applications and makes every decision about them. Never replaced by the agent. | Existing role |
| **Officer team lead** | Speaks for officer workload. Tells the team what changes for them. | Agent creator |
| **Applicant** | The person applying, or the parent applying for a child. Never decides anything here. Is told what the agent can and cannot do. | Public |

**Rule for every row below:** the agent never decides, approves or signs anything. It is never in the "who decides" column.

**Agent creator** is the learner who made the agent. For this prototype, the Agent creator fills Prototype owner, Rules owner, Service sponsor, Engineering lead, Data protection lead and Officer team lead. This is a placeholder so every decision has an owner. It is not a real separation of duties.

**What this means:**
- **One person decides and checks their own work.** The Rules owner and the Service sponsor are the same person, which this page advises against in a live pilot (open decision 2). Fine for a made-up prototype. Not fine for a real pilot.
- **Nobody is a second pair of eyes.** Consulted roles are all one person.
- **Incident:** the Agent creator is first responder, the person who switches the agent off and the person who tells the business owner. All three are one person, so nobody can be told but themselves. That is still no off switch and no deputy.
- **The ICA officer and the Applicant** are not filled by the Agent creator. They remain separate.

## Decision rights

**D** = decides. **C** = consulted before the decision. **T** = told after the decision. A row has one decider.

| Harness part | Who decides | Who is consulted | Who is told |
|---|---|---|---|
| **Scope**: what the agent is for, which cases, which document lists, which rules | **Rules owner** | ICA officer, Service sponsor, Prototype owner | Engineering lead, Officer team lead, Applicant (on the page) |
| **Permissions**: what the agent may do, and each setting (auto, confirm, block) | **Service sponsor** | Rules owner, Data protection lead, Engineering lead, Prototype owner | ICA officer, Officer team lead |
| **Vendor and model**: which AI vendor and model, and when to change it | **Service sponsor** | Engineering lead, Data protection lead, Rules owner | ICA officer, Officer team lead |
| **Go-live**: starting a pilot, and widening it | **Service sponsor** | Rules owner, Engineering lead, Data protection lead, Officer team lead | ICA officer, Prototype owner, Applicant |
| **Incident**: what counts as one, and whether to pause the agent | **Service sponsor** (the Engineering lead may pause at once, then tells the sponsor) | Data protection lead, Rules owner, Officer team lead | ICA officer, Prototype owner, Applicant |
| **Retire**: switching the agent off for good, and what happens to its logs | **Service sponsor** | Rules owner, Data protection lead, Engineering lead, Officer team lead | ICA officer, Prototype owner, Applicant |

**Notes on the table**
- **Scope** sits with the Rules owner because the rules are the scope. A change to a rule is never made by the agent or by engineering.
- **Permissions** sits with the Service sponsor, not the Prototype owner. The settings in `ai-prd.md` are Proposed, and the sponsor accepts or changes them. The Prototype owner is consulted.
- **Vendor and model** is **Not set yet** in the repo. No vendor or model is named anywhere. This row says who decides, not what is chosen. It is separate from the online channel vendor that is withdrawing, which is the old service and not the AI.
- **Go-live** must not happen before the open decisions in `ai-prd.md` have an owner: who owns the rules and return rate, how an applicant reaches an officer, whether file contents may be read, pilot size, and the officer workload baseline.
- **Incident** has a single fast exception. If the stop line is hit (guidance wrong, sensitive data exposed, return rate above baseline, officer workload up), the Engineering lead may pause the agent first and tell the sponsor straight after. Waiting for a meeting would let harm continue.
- **Retire** includes how long logs are kept and who may read them. That is also an open decision in `ai-prd.md`.

## Incident: the first hour

**Made-up test case:** at 08:00 on Monday the agent sent a wrong answer to an applicant. For example, it said a hospital note was fine, or it said an application was approved.

**Status: Proposed.** Read as the person on duty, the Incident row above did not answer who acts first, who switches the agent off, or who tells the business owner. This section fills those gaps. Nobody has accepted it. All times are made up.

**Terms.**
- **Business owner** is the **Service sponsor**. The word "business owner" is not a role in this model. The sponsor is the ICA role accountable for the service.
- **Wrong answer** is any answer that breaks a rule in Business rules in `ai-prd.md`. That includes saying approved, rejected or eligible; giving the wrong document list; or saying it contacted an officer.
- **Pause** means the agent stops answering applicants. It does not mean the page goes down. While paused, applicants see a plain notice and the fixed document list, with no agent.

**Who is on duty.** The **Engineering lead** is the first responder, or their named deputy. Until someone is named, nobody is on duty, so an incident at 08:00 on Monday would have no first responder. A deputy is needed because the first responder may be away on a Monday morning.

| Step | Who | What they do | Proposed time |
|---|---|---|---|
| 1. Notice | Anyone: an ICA officer, an applicant, the Prototype owner, or a log check | Reports the wrong answer to the first responder, with the time and what was said. No applicant detail is copied. | As soon as seen |
| 2. Act first | **Engineering lead** (or deputy) | Confirms the answer broke a rule. If it did, goes to step 3 at once. If it is unclear, pauses anyway. | Within 15 minutes of the report |
| 3. Switch off | **Engineering lead** (or deputy). The Prototype owner is the backup if neither can be reached. | Pauses the agent. Does not wait for the sponsor. Checks the notice shows, and writes the pause time in the log. | Right after step 2 |
| 4. Tell the business owner | The person who paused | Tells the **Service sponsor**: what was said, when it started, when it was paused, how many applicants it may have reached, and what is not known. | Within 1 hour of the pause |
| 5. Tell the others | **Service sponsor** | Tells the ICA officer team lead and ICA officers. Consults the Rules owner, the Data protection lead and the Officer team lead. | Same day |
| 6. Reach the applicants | **Service sponsor** decides. Not set yet who does it. | Decides whether and how to tell applicants who got the wrong answer. | Same day |
| 7. Find the cause | **Rules owner** (a rule or wording) and **Engineering lead** (a build fault) | Finds why, and fixes it. | Not set yet |
| 8. Resume | **Service sponsor** decides, after the Rules owner confirms the fix. | Resumes the agent, and logs why. | Not set yet |
| 9. Review | **Service sponsor** | Reviews what happened, and whether any permission or rule must change. | Within a week (made up) |

**Rule: the Engineering lead never waits for permission to pause.** The sponsor decides everything after the pause. Waiting for a meeting would let harm continue.

**What is still missing, and cannot be filled in from the repo**
- **No one is named** for any role, so nobody is on duty today.
- **No off switch exists.** `CLAUDE.md` and `ai-prd.md` describe stop conditions the agent follows, but no way for a person to pause it from outside. Engineering decides how, but it must be one step, must not need a new release, and must work when the person has only a phone. Until this exists, the Engineering lead cannot do step 3.
- **No applicant contact route exists.** The agent keeps nothing about an applicant after the session, by design. The log holds no names. So after an incident nobody can tell which applicants got the wrong answer, or reach them. Step 6 may be impossible. This is a trade-off between privacy and being able to put things right, and the Data protection lead and sponsor must decide it.
- **No weekend or after-hours cover** is set. Monday 08:00 was chosen in the test case because a Sunday night fault would first be noticed then.
- **Resume sign-off disagrees.** `ai-prd.md` permission 12 says the Rules owner confirms a resume. This page says the sponsor decides, after the Rules owner confirms the fix. The two should match.

## What triggers each decision

| Decision | Triggered by |
|---|---|
| Scope | A rule changes, a new case is requested (for example a grandparent applying), or the rules lookup finds nothing often |
| Permissions | A new tool or action is proposed, or a stop condition fires |
| Vendor and model | A cost, quality or privacy reason to change, or the vendor changes its terms |
| Go-live | The open decisions above are closed, and the fix test reaches 9 in 10 on more than a handful of participants (made-up target) |
| Incident | Any stop condition in `ai-prd.md` |
| Retire | The stop line is hit and not fixed, the return rate does not fall, or the service is replaced |

## Open decisions for this page

1. **Who fills each role in a real pilot.** For now the Agent creator holds every unfilled role. Real people must replace this before go-live.
2. **Whether the Service sponsor and the Rules owner may be one person.** Proposed: not in a live pilot. In this draft the Rules owner decides scope and the sponsor decides the rest, so one person cannot approve their own rules and their own risk.
3. **How the Engineering lead's fast pause is recorded,** and who the sponsor is told through.
4. **How often these roles meet,** and how often the run log is reviewed. Not set yet.
5. **Who speaks for applicants.** No role does today. The Applicant is only told.
6. **Whether this model needs an ICA review** before it is used, given that final decisions stay with ICA officers.
7. **Who is on duty,** who is their deputy, and what hours they cover. Without this, step 2 of "Incident: the first hour" has nobody.
8. **How a person pauses the agent from outside.** No off switch exists today.
9. **How applicants who got a wrong answer are found and reached,** without storing personal detail.
10. **Whether "any person who sees a wrong answer may pause the agent"** should be allowed, to avoid delay. Proposed: no, because a wrong pause also harms applicants. The sponsor decides.
11. **The time targets** (15 minutes, 1 hour, same day, one week) are made up and need a real owner.
12. **Who confirms a resume.** This page and `ai-prd.md` permission 12 disagree.
