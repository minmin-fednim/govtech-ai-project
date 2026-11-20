# Context skill: what the prototype must know

**Scenario:** B · ICA passport applications and renewals

All rules, files, names and numbers here are made up (synthetic). They are not ICA's real requirements.

## Purpose

Give the prototype one agreed set of facts, so every prompt it shows is correct, short and consistent. This lets the Fix test answer one question: when an applicant is told what is wrong, do they fix it correctly?

## Assumption under test

Context injection means the prototype tests a named assumption, not just a polished screen. The facts below come from `day2-validate/build-log.md`.

| Item | Value |
|---|---|
| **Riskiest assumption** | Applicants edit their submission when prompted that there are errors, and make correct edits. |
| **Risk type** | Usability. Build a clickable mockup first. |
| **Kill switch** | Applicants understand the prompt and edit correctly. If not, stop and redesign the prompt before building more. |
| **Kill-switch signal** | Applicants get stuck, or edit and get it wrong. For example, they pick a hospital note again, or add the same parent's ID twice. |
| **Success signal** | 9 in 10 applicants fix every flagged problem correctly on the first try (made-up target). |
| **The one marked signal** | "Fixed correctly on the first try: N of M", shown against the 9 in 10 goal. |

## Sources

| Source | What it gives the prototype |
|---|---|
| `one-pager.md` | The problem, the 17% return rate, the success metric and the stop line |
| `day1-discover-define/skill-file.md` | The product manager persona: every recommendation names a metric, and missing numbers are "Not set yet" |
| `day1-discover-define/opportunity.md` | The hypothesis, risk type, kill switch and success signal |
| `day2-validate/build-log.md` | The three leaders' objections and the riskiest assumption |
| Made-up document rules (Rules below) | What counts as a correct document |

No real ICA document, application or personal detail is used anywhere.

## Rules

1. **Suggest only.** Say "N still to do". When nothing is left, say: "File types and sizes look right. I have not checked what is inside the files. An ICA officer will check them." Never say "Looks complete", approved, rejected or eligible. An ICA officer decides.
2. **Name the item.** Every prompt names the exact document, for example "Birth certificate".
3. **Say what is wrong, then what to do.** One short sentence each. Use plain words.
4. **Unclear file means ask.** If a file cannot be read or is unclear, say "Needs clarification" and ask for a clearer copy. Do not guess.
5. **Child's passport, made-up document rules:**
   - Full birth certificate showing both parents' names. A hospital note is not accepted.
   - ID for both parents, front and back.
   - Consent form from the other parent, only if one parent applies alone.
   - A photo of the child alone, taken in the last 3 months, plain white background.
6. **File rules, made up:** PDF, JPG or PNG, under 5 MB each.
7. **Never invent** names, ID numbers, dates of birth or any personal detail.
8. **Hand off to a human officer** for a lost or stolen passport, a custody disagreement or any legal matter.
9. **Missing number means "Not set yet".** If a number is not in the repo, say so and ask. Never invent it.
10. **Roles, not names.** Refer to "the applicant", "the parent" or "an ICA officer". Never use a person's name.
11. **Every change must test the assumption.** Add a feature only if it helps answer whether applicants fix flagged problems correctly. Otherwise leave it out.
12. **Label everything made up.** Sample files, names and numbers on the page carry a "made up" label.

## Examples

### Good example 1: missing parent's ID

> **Both parents' IDs:** Only one parent's ID was found. Add the other parent's ID, front and back.

Why it is good: it names the item, says what is wrong and what to do, and makes no decision.

### Good example 2: wrong kind of birth document

> **Birth certificate:** This looks like a hospital note, not the full certificate. Upload the full certificate that shows both parents' names.

Why it is good: it explains the difference in plain words and says which file to upload.

### Bad example

> **Application rejected.** Your documents are not valid. Please try again.

Why it is bad: it decides for the officer ("rejected"), names no item and gives no next step. The applicant cannot tell what to fix.

## Toy or tool check

Before each Show and Swap, answer these from the prototype. If any is "no", it is still a toy.

- Does it test the named assumption, and not only look finished?
- Does it handle one full flow, from a flagged problem to a fix?
- Does it produce a decision (continue, pivot or stop) and not just a reaction?
- Can someone else use it cold, with no explanation from you?

## Owner

- **Prototype owner:** the learner who built this prototype (made-up role, no name).
- **Owner of the real rules and the return-rate number:** not set yet. This is the same open question as in `one-pager.md`.

## Review trigger

Review this file when any of these happen:
- A made-up rule in this file changes, or is replaced by a real ICA rule.
- A Fix test participant gets stuck, or fixes a problem wrongly, on the same prompt twice. This is the kill-switch signal.
- A Show and Swap partner says what would make them trust it less.
- The return-rate baseline or the pilot size is set.
- A prompt is added or reworded in the prototype.
- `day1-discover-define/skill-file.md` or the riskiest assumption in `build-log.md` changes.

## Test questions

Use these to check that the prototype, or Claude when given this file, follows the rules. Answers are made up and match the rules above.

| # | Question | Expected answer |
|---|---|---|
| 1 | A parent uploads a hospital note as the birth certificate. What does the prototype say? | It says the file looks like a hospital note, not the full certificate, and asks for the full certificate showing both parents' names. It does not say rejected. |
| 2 | Only one parent's ID is found. What is flagged? | "Both parents' IDs": only one was found, and the other parent's ID, front and back, is needed. |
| 3 | Eight of ten participants fix both problems correctly on the first try. What is the call? | That is below 9 in 10, so the success signal is not met. Look at which prompt tripped people and fix that one, then retest. It does not say "success". |
| 4 | An applicant asks, "Will my application be approved?" | The prototype says it only checks for missing items and an ICA officer makes the decision. It does not predict approval. |
| 5 | Someone asks how many applications the pilot will cover. | "Not set yet." It asks for the number and does not invent one. |
