# Handoff note

**Scenario:** B · ICA passport applications and renewals
All data is synthetic and labelled as made up. This note was drafted from the repo files and the tests run on the prototype. Check it before you rely on it.

## What this is

A one-page made-up prototype that helps an applicant check they have the right documents before they submit a passport application. It suggests only. An ICA officer makes every decision. It is not a real ICA service.

## What to read first

1. `day2-validate/living-prd.md`: what the prototype does, marked present, partial or missing.
2. `day2-validate/context-skill.md`: the made-up rules the prompts must follow.
3. `day2-validate/PROMPTS.md`: the prompt chain and what happened when it was run.
4. `day3-build/CLAUDE.md` and `day3-build/agent-run-log.md`: the agent instructions and three hand-run cases.

## How to run it

Open `day2-validate/prototype/index.html` in a browser. There is no build step and no install. Pick "Myself" or "My child", add made-up sample files (PDF, JPG or PNG, under 5 MB), then press Pay.

## What works (tested in a browser)

- The checklist for "Myself" (2 documents) and "My child" (5 documents), with a tip on each.
- Messages for an empty file, a wrong file type and a file over 5 MB.
- A simulated upload with a forced failure ("page not found, error 404"). The row stays not done.
- Pay stays locked until every row is done, and while a file is uploading. A payment timeout shows a retry button.
- The status box shows "N still to do", or "File types and sizes look right. I have not checked what is inside the files."
- The consent row can be skipped when both parents apply together.
- A facilitator fix test counts first-try fixes against the 9 in 10 goal (made up).

## What is fragile or untested

- The Pay lock and the file checks live only in the page. A real version must enforce them on a server.
- File checks read only the file name ending, size and whether it is empty. They never look at contents.
- The skip button on the consent row is not checked. Nothing confirms both parents apply together.
- Nothing is saved. Switching between "Myself" and "My child", or a refresh, wipes all progress.
- Two test tickboxes (payment timeout, upload fail) show to every user and must be hidden before any real use.
- Real upload, real payment and a real "page not found" screen do not exist. The failures are staged.
- No live agent has run. The three agent cases in `agent-run-log.md` were followed by hand.
- Only one first-try fix result exists (1 of 1). That is far too small to judge the 9 in 10 goal.
- The Refine prompt in `PROMPTS.md` has not been run.

## Decisions an owner must make

- **Who owns the rules and the return rate.** Not set yet.
- **How an applicant reaches an ICA officer.** No contact route is set. The agent tells the applicant to contact ICA but cannot say how.
- **Pilot size and length.** Not set yet.
- **Officer workload baseline.** Not set yet.
- **Days-to-complete target.** Not set yet.
- **How often a human reviews the run log.** Not set yet.

## Stop line

Stop or roll back if the guidance is wrong, sensitive data is exposed, the return rate rises above the 17% baseline (made up), or officer workload increases. This comes from `one-pager.md`.

## Next steps, in order

1. Run a real fix test with several participants and record first-try results.
2. Run the Refine prompt (clear wording, no profanity or secrets, broken links).
3. Hide the two test tickboxes.
4. Name an owner for the rules and the return rate.
5. Decide how an applicant reaches an ICA officer.
6. Sign `day3-build/agent-control-panel.md` once the gaps above are accepted.
