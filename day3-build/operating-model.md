# Operating model: passport application checker

**Scenario:** B · ICA passport applications and renewals
All data, roles and numbers are made up (synthetic). Roles only, no names.

**Status:** Proposed. Written from `SCENARIO-PICK.md`, `one-pager.md`, `day3-build/agent-control-panel.md` and `day3-build/ai-prd.md`. Nobody has accepted these roles yet. No role is filled by a named person. Until the owner accepts or changes this page, it is a draft.

## Roles

Each role is a job, not a person. One person may hold more than one role in a small pilot, except where the table says otherwise.

| Role | What it is | Filled by |
|---|---|---|
| **Prototype owner** | The learner who built the prototype and the agent files. Signs `agent-control-panel.md`. Signs confirms until a rules owner is named. | Not named |
| **Rules owner** | Owns the document rules and the return-rate number. Named before any pilot (`one-pager.md`). | Not set yet |
| **Service sponsor** | The ICA role accountable for the service. Decides whether it goes live and whether it stops. | Not set yet |
| **Engineering lead** | Builds and runs the system. Decides how, never what (see `ai-prd.md`, What engineering decides). | Not set yet |
| **Data protection lead** | Owns the privacy and security of applicant data. Decides whether the agent may read file contents. | Not set yet |
| **ICA officer** | Reviews applications and makes every decision about them. Never replaced by the agent. | Existing role |
| **Officer team lead** | Speaks for officer workload. Tells the team what changes for them. | Not set yet |
| **Applicant** | The person applying, or the parent applying for a child. Never decides anything here. Is told what the agent can and cannot do. | Public |

**Rule for every row below:** the agent never decides, approves or signs anything. It is never in the "who decides" column.

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

1. **Who fills each role.** Today none is named, except that the Prototype owner is the learner.
2. **Whether the Service sponsor and the Rules owner may be one person.** Proposed: not in a live pilot. In this draft the Rules owner decides scope and the sponsor decides the rest, so one person cannot approve their own rules and their own risk.
3. **How the Engineering lead's fast pause is recorded,** and who the sponsor is told through.
4. **How often these roles meet,** and how often the run log is reviewed. Not set yet.
5. **Who speaks for applicants.** No role does today. The Applicant is only told.
6. **Whether this model needs an ICA review** before it is used, given that final decisions stay with ICA officers.
