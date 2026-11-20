# AI PRD: passport application checker

**Scenario:** B · ICA passport applications and renewals
All data, files, names and numbers are made up (synthetic). They are not ICA's real figures or rules.

**Status:** Draft. Written from `SCENARIO-PICK.md`, `one-pager.md`, `day2-validate/living-prd.md`, `day2-validate/handoff-note.md`, `day3-build/CLAUDE.md` and `day3-build/agent-control-panel.md`. Nothing here has been built or run as a live agent.

## Problem and user

**Problem.** ICA officers return 17% of 520,000 passport applications a year because of errors or missing documents. Each return adds about six days. Applicants do not know what a complete application looks like for their situation. Only 38% read the guidance, and they find out what is missing after they submit. The online vendor withdraws in 10 weeks, and walk-in counters can absorb only 35% of today's online demand. (All made up, from `one-pager.md`.)

**User.** The applicant, applying for themselves or as a parent for a child. Parents renewing for a child are the most confused group. Applicants renew rarely, every 5 or 10 years.

**Second user.** The ICA officer who receives the application. Officers make every decision. The agent must not add to their workload.

**Riskiest assumption.** When the tool names a problem in plain words, the applicant fixes it correctly on the first try. Success signal: 9 in 10 do (made-up target). Kill switch: applicants get stuck, or fix it wrongly, on the same prompt twice.

**Goal metric.** Return rate: 17% now, below 10% in the pilot.

## Instructions

The agent checks an application before it is submitted and tells the applicant what is missing or wrong. It suggests only. The full agent file is `day3-build/CLAUDE.md`. If the two ever disagree, the rules in Business rules below win, and the disagreement is reported as an open decision.

**The job, in order:**
1. Ask who the passport is for: the applicant or their child.
2. Show the document list for that case, with one short line on what each needs.
3. Check each file added.
4. For each problem, name the item, say what is wrong, then say what to do.
5. End with "Looks complete" or "N still to do".

**Voice.** Plain words. Short sentences. One sentence for what is wrong, one for what to do.

**Good message, made up:**
> **Both parents' IDs:** Only one parent's ID was found. Add the other parent's ID, front and back.

**Bad message, made up:**
> **Application rejected.** Your documents are not valid. Please try again.
> It decides for the officer, names no item and gives no next step.

## Tools

| Tool | What it does | Limit |
|---|---|---|
| Document list | Returns the documents needed for "myself" or "my child" | Read only |
| File check | Reads the file name ending, size and whether it is empty | Does not open the file |
| Rules lookup | Reads the made-up rules in `day2-validate/context-skill.md` | Read only |
| Status summary | Counts items still to do | Read only |

**Made-up file rules:** PDF, JPG, JPEG or PNG, under 5 MB, not empty.

**Not tools the agent has:** submit an application, take payment, send any message, write to any record other than the run log, browse the web, read a real file.

**Gap.** With these tools the agent cannot tell a hospital note from a birth certificate. Flagging the wrong document needs a tool that reads file contents. That tool does not exist and is blocked below. See Open decisions.

## Context and memory

**Reads every session:** `day2-validate/context-skill.md` (rules and examples; wins any conflict), `one-pager.md` (problem, baseline, stop line), `SCENARIO-PICK.md` (scenario).

**Memory.** The current conversation only. Nothing about an applicant is kept after the session ends. It never stores a name, ID number, date of birth or file contents.

**Missing facts.** If a number or fact is not in the repo, say "Not set yet" and ask. Never invent it.

## Permissions

**Tiers.**
- **read:** looks at something. Changes nothing.
- **draft:** shows text in the chat. Changes nothing.
- **write:** changes a file or a record.
- **send:** acts outside the chat, on a person or a system: a message, a payment, a submission.

**Settings.** auto = the agent does it alone. confirm = a named role approves first. block = the agent never does it.

**Status: Proposed.** You asked me to set every setting myself ("You decide"). Your pasted settings were empty, so these are my settings, not yours. They are not final until the owner accepts them. Roles are used, not names. The roles are not yet filled by a person.

**Roles that sign off.**
- **Prototype owner:** the learner who built this prototype (per `context-skill.md`).
- **Rules owner:** owns the rules and the return-rate number. Not named yet. Until named, the prototype owner signs.

| # | Action | Tier | Setting | Who signs off a confirm | Why |
|---|---|---|---|---|---|
| 1 | Read the three context files | read | auto | | Needed every session. No change. |
| 2 | Read the document list for "myself" or "my child" | read | auto | | Fixed made-up list. |
| 3 | Run the file check (ending, size, empty) | read | auto | | Does not open the file. |
| 4 | Count items still to do | read | auto | | No change. |
| 5 | Show a flag message (item, what is wrong, what to do) | draft | auto | | Core job. Wording is fixed by the rules. |
| 6 | Show "Looks complete" or "N still to do" | draft | auto | | The only two allowed outcomes. **Not signed by the business owner while open decision 17 is open:** "Looks complete" overclaims when file contents are not read. |
| 7 | Show "Needs clarification" for an unclear file | draft | auto | | Asks for a clearer copy. No guess. |
| 8 | Tell the applicant an ICA officer must handle it (lost or stolen, custody or legal) | draft | auto | | An applicant in a hard moment must not wait for a human. Fixed wording. |
| 9 | Refuse a request for a decision, with the fixed answer | draft | auto | | Protects the officer's decision. |
| 10 | Append one line to the run log | write | auto | | Append only. No personal detail allowed in the line. |
| 11 | Draft a proposed change to a rule, document list or file limit | draft | confirm | Rules owner | The agent can suggest. A person decides. |
| 12 | Resume work after a stop condition fired | write | confirm | Rules owner | Stops exist to bring a human in. |
| 13 | Edit a rule, the document list or a file limit | write | block | | A human edits, then the agent reads the new version. |
| 14 | Edit `CLAUDE.md`, `one-pager.md` headings or the scenario | write | block | | Repo rule: do not switch scenario or rename headings. |
| 15 | Open and read the contents of a file | read | block | | Privacy decision not made. See Open decisions. |
| 16 | Keep any applicant detail after the session | write | block | | Memory rule. |
| 17 | Say an application is approved, rejected, eligible or valid | draft | block | | Only an ICA officer decides. |
| 18 | Take payment | send | block | | Money. Not undoable. Not the agent's job. |
| 19 | Submit an application | send | block | | A legal act for a person. Officers decide. |
| 20 | Send any message outside the chat (email, SMS, alert to an officer) | send | block | | The agent has no way to contact anyone. |
| 21 | Use real data, or touch a real system | read | block | | Repo rule: made-up data only. |

**Counts:** 10 auto, 2 confirm, 9 block.

## Human checkpoints

The agent stops and tells the applicant, in plain words, that an ICA officer must handle the case. The agent cannot contact anyone. It must never say it has passed, sent or told an officer, and must never say an officer will reply. It tells the applicant to contact ICA themselves. It does not invent a phone number, address or link.

1. Lost or stolen passport.
2. Custody disagreement or any legal matter.
3. An unclear file. Say "Needs clarification" and ask for a clearer copy. No guess.
4. The applicant asks for a decision. Answer: "I only check for missing items. An ICA officer makes the decision."
5. Any rule change. A human edits the rules first.
6. Before any pilot, a human names the owner of the rules and of the return rate. Not set yet.

**Review of the log by a human:** rhythm not set yet.

## Stop conditions

Stop and tell a human if any of these happen. This follows the stop line in `one-pager.md`.

- The guidance is wrong. Example: a good file flagged as bad, or a hospital note missed.
- Sensitive data is exposed in input, output or the log.
- The return rate rises above the 17% baseline.
- Officer workload increases.
- The fix rate stays below 9 in 10 after a prompt is reworded and retested.
- An applicant is stuck, or fixes the same prompt wrongly twice (kill switch).
- A rule conflict: the context file and a request disagree.
- The agent is unsure and cannot say what is wrong in one plain sentence.

When it stops, the agent says what it saw, what it did not do, and that a human must review. It does not retry the same step. Who the human is, and how they are told, is not set yet.

## Logs

One line per check, appended to `day3-build/agent-run-log.md`.

**Each line holds:** time; case ("myself" or "my child"); items checked and flagged, by document name; the message shown; the outcome; whether the applicant fixed it on the first try; any stop condition that fired.

**Outcomes allowed:** "Looks complete", "N still to do", "Needs clarification", "Needs an ICA officer (applicant told)", "No rule found", "Refused".

**An empty message:** at any point, ask the step 1 question (no case yet) or ask whether to carry on (case chosen). Log "Needs clarification (empty message)". A second empty message in a row ends the session with a pointer to ICA.

**A cited source that is not in the repo:** never rely on, confirm or deny it. Say what the agent's own rules say. If the case itself has a rule, log "Needs an ICA officer (applicant told)" with the rule conflict, not "No rule found".

**A lookup that finds nothing:** two tries, then stop, tell the applicant, and log "No rule found" with the words searched. Never answer from general knowledge. The log line is the only record, so a human must read these (open decision 6).

**Each line never holds:** a name, ID number, date of birth, file contents or any real detail.

**Count:** first-try fixes as "N of M", against 9 in 10.

**Read the log when:** a stop condition fires, a prompt is added or reworded, or the return-rate baseline or pilot size is set.

## Business rules

These are rules an engineer must not change. Each is written as a rule, not as a screen to copy. How the screen looks is up to engineering.

**Decisions**
1. **Suggest only.** The system never says an application is approved, rejected, eligible or valid. The only outcomes it may state are "Looks complete" and "N still to do". An ICA officer makes every decision.
2. **A suggestion is never final.** The applicant is told that an ICA officer makes the final decision on every application.

**Documents, all made up**
3. **Renewing for oneself needs:** the current passport page with photo and details, and a recent photo.
4. **Renewing for a child needs:** the child's current passport page; the full birth certificate showing both parents' names (a hospital note is not accepted); an ID for each parent, front and back; a photo of the child alone, taken in the last 3 months, plain white background.
5. **Other parent's consent** is needed only when one parent applies alone. It is waived when both parents apply together.
6. **A self-declared waiver is not proof.** Whether both parents really apply together must be confirmed by something other than the applicant's own press of a button. How is an open decision.
7. **File rules:** PDF, JPG, JPEG or PNG; under 5 MB; not empty. Checking the ending alone is not enough for a real system.

**Uploads and payment**
8. **A failed upload never counts as uploaded.** A document is complete only after a successful upload. An upload still in progress is not complete.
9. **Payment is allowed only when every required document is complete and no upload is in progress.** This rule must be enforced on a server, and checked again at the moment of payment. A disabled button is not enough.
10. **Never allow submission to go through if an upload failed.**
11. **A payment timeout means nothing was paid.** The applicant is told they were not charged and may try again. Documents are checked again before a retry. A timeout never records a payment.

**Wording**
12. **Every flag names the item,** says what is wrong, then says what to do. One short sentence each. Plain words.
13. **A failure message says what happened,** that the file was not saved, and what to do next. It never blames the applicant.
14. **No profanity and no secrets in any message.** No link in a message may be broken.
15. **Unclear file means ask.** Say "Needs clarification" and ask for a clearer copy. Never guess.
16. **Roles, not names.** Say "the applicant", "the parent", "an ICA officer". Never use a person's name.
17. **Never invent** a name, ID number, date of birth or number. A missing number is "Not set yet".
18. **Label made-up data** as made up wherever it is shown.

**Escalation**
19. **Lost or stolen passport, custody disagreement or any legal matter** goes to an ICA officer. The system gives no advice on these.
20. **The system never claims an action it did not take.** It never says it has contacted, told or passed a case to anyone, and never promises that someone will reply.
21. **No invented contact details.**

**Data**
22. **Sensitive data stays out of messages, logs and memory.** If an applicant types an ID number, the system does not repeat or store it, and asks them not to share it.
23. **Nothing about an applicant is kept after the session** unless the owner decides otherwise in writing.

**Stop line**
24. **Stop or roll back** if guidance is wrong, sensitive data is exposed, the return rate rises above baseline, or officer workload increases.

## What engineering decides

Engineering chooses these. They must still obey Business rules.

- The tech stack, hosting and architecture.
- How the file check is built and how fast it is.
- How the screen looks, its layout, and how it works on a phone.
- How the server enforces rules 8, 9 and 10.
- How the run log is stored, in what format, and how it is kept free of personal detail.
- How accessibility is met. The prototype today uses colour (red or green) and clickable rows that contain buttons. Neither should be copied.
- How the test tools (forced upload failure, forced payment timeout) are kept out of the live product. The prototype shows two test tickboxes to every user. They must not reach applicants.

**Engineering does not decide:** any rule in Business rules; any setting in Permissions; any open decision below.

## Open decisions

Each needs a named person. Today none is named.

1. **Who owns the rules and the return rate.** Not set yet.
2. **How an applicant reaches an ICA officer.** No contact route exists. The agent tells the applicant to contact ICA but cannot say how.
3. **Whether the agent may read file contents.** Without it, the agent cannot spot a hospital note or a missing parent's ID, which is the core value. With it, sensitive documents are read by software. This is a privacy decision. Permission 15 is blocked until it is made.
4. **How "both parents apply together" is verified** (rule 6).
5. **Who the "human" is** in the stop conditions, and how they are told.
6. **How often a human reviews the run log.**
7. **Pilot size and length.** Not set yet.
8. **Officer workload baseline.** Not set yet.
9. **Days-to-complete target.** Not set yet.
10. **How the return rate and officer workload are measured** during a pilot, and by whom. The stop conditions depend on both.
11. **What "critical wrong guidance" means.** The threshold that fires a stop is not defined.
12. **What counts as "stuck."** Rule: the same prompt fails twice. The definition of one attempt is not set.
13. **How long run logs are kept**, and who may read them.
14. **First-time applications.** The prototype heading says "Renewing". Whether first-time applications are in scope is not decided.
15. **Languages.** Only one is assumed. Not decided.
16. **Whether Permissions 11 and 12 need a second approver** once a real owner exists.
17. **Whether the agent may say "Looks complete" at all while it cannot read file contents (Permission 6).** The agent checks only file type, size and whether the file is empty. A hospital note named `birth-certificate.pdf` passes. The applicant is told "Looks complete. An ICA officer will review it", which is a claim nobody has checked. It reaches every applicant, and it is the exact error behind the 17% returns. The business owner will not sign Permission 6 as auto until this is decided. Options, not chosen:
    - **(a) Say what was checked.** Replace "Looks complete" with "File types and sizes look right. I have not checked what is inside the files. An ICA officer will check them." The agent then makes no claim it cannot back. This changes the allowed outcomes in Business rule 1, `CLAUDE.md`, `context-skill.md`, the prototype messages and the fix test.
    - **(b) Decide Open decision 3 first.** Allow the agent to read file contents, then "Looks complete" can be true. This is a privacy decision for the Data protection lead.
    - **(c) Keep the wording, and measure it.** Accept the overclaim for the made-up prototype only, and count how often "Looks complete" is followed by an officer return. Not for a real pilot.
    Recommendation: (a) now, (b) before any real pilot. That is a recommendation, not a decision.

**Found when reading this as the engineering lead who must build it:**
- *Could not build the core check.* The tools only read a file's name, size and emptiness. Open decision 3 covers it.
- *Could not build "tell a human."* The agent cannot send anything, and no human is named. Open decisions 2 and 5 cover it.
- *Could not build the measures.* The stop conditions use return rate and workload, with no way to measure them. Open decision 10 covers it.
- *Could not build the thresholds.* "Critical", "stuck" and "first try" are not defined. Open decisions 11 and 12 cover it.
- *Filled in:* I added the document lists, file rules, payment and upload rules and escalation wording under Business rules, from the prototype and `context-skill.md`.
- *Out of date elsewhere:* `day3-build/agent-control-panel.md` still says cases are "handed over" to an officer. `CLAUDE.md` has since been changed to say the applicant is told. This PRD follows `CLAUDE.md`.
