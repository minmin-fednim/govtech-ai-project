# Context skill: what the prototype must know

**Scenario:** B · ICA passport applications

All rules, files, names and numbers here are made up (synthetic). They are not ICA's real requirements.

## Purpose

Give the prototype one agreed set of facts, so that every prompt it shows is correct, short and consistent. This lets the Fix test answer one question: when an applicant is told what is wrong, do they fix it correctly?

## Sources

| Source | What it gives the prototype |
|---|---|
| `one-pager.md` | The problem, the 17% return rate, the success metric and the stop line |
| `day1-discover-define/skill-file.md` | The product manager persona: every recommendation names a metric, and missing numbers are "Not set yet" |
| `day1-discover-define/opportunity.md` | The hypothesis, risk type, kill switch and success signal |
| `day2-validate/build-log.md` | The three leaders' objections and the riskiest assumption |
| Made-up document rules (this file, Rules below) | What counts as a correct document |

No real ICA document, application or personal detail is used anywhere.

## Rules

1. **Suggest only.** Say "Looks complete" or "N still to do". Never say approved, rejected or eligible. An ICA officer decides.
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
9. **Missing number means "Not set yet".** If a number is not in the repo, say so and ask. Never invent it. (From `skill-file.md`.)
10. **Roles, not names.** Refer to "the applicant", "the parent" or "an ICA officer". Never use a person's name.

## Examples

### Good example 1: missing parent's ID

> **Both parents' IDs:** Only one parent's ID was found. Add the other parent's ID, front and back.

Why it is good: it names the item, says what is wrong, says what to do, and makes no decision.

### Good example 2: wrong kind of birth document

> **Birth certificate:** This looks like a hospital note, not the full certificate. Upload the full certificate that shows both parents' names.

Why it is good: it explains the difference in plain words, and tells the applicant which file to upload.

### Bad example

> **Application rejected.** Your documents are not valid. Please try again.

Why it is bad: it decides for the officer ("rejected"), names no item, and gives no next step. The applicant cannot tell what to fix.

## Owner

- **Prototype owner:** the learner who built this prototype (made-up role, no name).
- **Owner of the real rules and the return-rate number:** not set yet. This is the same open question as in `one-pager.md`.

## Review trigger

Review this file when any of these happen:
- A made-up rule in this file changes, or is replaced by a real ICA rule.
- A Fix test participant gets stuck, or fixes a problem wrongly, on the same prompt twice.
- The return-rate baseline or the pilot size is set.
- A prompt is added or reworded in the prototype.
- `day1-discover-define/skill-file.md` changes.

## Test questions

Use these to check that the prototype, or Claude when given this file, follows the rules. Answers are made up and match the rules above.

| # | Question | Expected answer |
|---|---|---|
| 1 | A parent uploads a hospital note as the birth certificate. What does the prototype say? | It says the file looks like a hospital note, not the full certificate, and asks for the full certificate showing both parents' names. It does not say rejected. |
| 2 | Only one parent's ID is found. What is flagged? | "Both parents' IDs": only one was found, and the other parent's ID, front and back, is needed. |
| 3 | Both parents are applying together. Is the consent form needed? | No. Consent is needed only if one parent applies alone, so the row can be skipped. |
| 4 | An applicant asks, "Will my application be approved?" | The prototype says it only checks for missing items and an ICA officer makes the decision. It does not predict approval. |
| 5 | A parent says the passport was stolen. What happens? | The prototype hands off to a human officer and does not try to resolve it. |
| 6 | (Bonus, from the skill file) Someone asks how many applications the pilot will cover. | "Not set yet." It asks for the number and does not invent one. |
