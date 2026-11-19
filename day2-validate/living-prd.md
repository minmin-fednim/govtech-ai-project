# Living PRD

**Scenario:** B · ICA passport applications
All data is synthetic and labelled as made up.

**How this was made:** extracted from the code in `day2-validate/prototype/` (`index.html`, `app.js`, `fixtest.js`, `style.css`), then checked against it. The Pay step described below is in the working copy and was not on `main` when this was written.

**Marks:** present = the code shows it clearly. partial = I had to infer part of it. missing = the code does not show it.

## Notes from the prototype

**[solid]** The checklist works well. The applicant picks who the passport is for, sees what to upload, and gets a clear message for an empty file, a wrong file type or a file over 5 MB. The Pay button stays locked until every row is done, and a payment timeout shows a retry message. Tested in a browser.

**[fragile]** The rules only live in the page, so they are easy to get around.
- The Pay lock is one disabled button. It can be re-enabled in the browser, so the real rule must be enforced on a server.
- File checks look at the file name ending only. A renamed file passes.
- The child's "Other parent's consent" row is always required, even though its tip says to skip it when both parents apply.
- Switching between "Myself" and "My child", or refreshing, wipes all progress.

**[surprise]** The green/red status box is blank. Confirmed on the original code on `main`: the variable `status` in `app.js` clashes with the browser's built-in `window.status`, which only holds text. Also, nothing is uploaded, so an upload can never really fail. A failure message has to be tested with a staged failure.

## 1. Product overview · present

A one-page made-up tool that helps a person check they have the right documents before they submit a passport application. It shows a "made up, not a real ICA service" banner. It gives suggestions only; the page says ICA officers make the final decision. It has two parts: the applicant checklist, and a separate fix test for a facilitator.

## 2. Problem and riskiest assumption · partial

**Problem (inferred from the page text and tips):** applicants submit incomplete or wrong documents, for example a hospital note instead of a birth certificate, or only one parent's ID.

**Riskiest assumption (inferred from the fix test):** when the tool flags a problem in plain words, the applicant fixes it correctly on the first try. The code never states this, so I read it from how the fix test is built.

## 3. User flow and screen map · present

One screen, no navigation.
1. Read the three steps at the top.
2. Choose "Myself" (2 documents) or "My child" (5 documents).
3. Click each row to pick a file. Open "Tips" for the common mistake. A bad file shows an error under its row.
4. Watch the status box and the count of rows still to do.
5. When every row is done, Pay unlocks. Press Pay, wait about 1 second, see "Payment received" or a timeout message with a retry button.

Below the applicant tool sits the facilitator's fix test: a made-up application with two planted problems, "Fix this", pick a file, "Upload this file", then "Record result and start next participant".

## 4. Success metrics · partial

The only metric in the code is the fix test: the share of planted problems fixed correctly on the first try. Target: 9 in 10 (made-up). Totals show on screen only and reset on refresh. Nothing measures the applicant checklist itself: how many people finish, pay, or give up.

## 5. Technical reality · present

- Plain HTML, CSS and JavaScript. No build step, framework, package file or tests.
- No backend. Files are never uploaded. The page reads only the file name, size and ending.
- Limits: PDF, JPG, JPEG or PNG, up to 5 MB (made up), not empty.
- Document lists are hard-coded in `ITEMS` in `app.js`.
- Payment is simulated with a timer. A visible tickbox forces a timeout for testing.
- State lives in memory only.

## 6. Assumptions and risks · partial

The code states none of these. They are my reading of it.
- A file name ending is enough to judge a file type. It is not.
- The Pay lock is a real rule. It is only a button state.
- The consent row can be required for everyone. It cannot.
- A blank status box goes unnoticed. The step text tells applicants to check it.
- Colour alone (red or green) is enough. It leaves out people who cannot tell the colours apart.
- Headline says "Renewing", so first-time applications are not covered.
- The test tickbox must not reach real applicants.

## 7. In and out of scope · partial

No scope list exists in the code. From what it does and does not do:
- **In:** choose who the passport is for, document checklist, tips, file checks in the browser, a simulated payment, a facilitator fix test.
- **Out (not built):** real upload, real payment, sign-in, saving progress, officer review, first-time or lost passports, other languages.

## 8. Engineering recommendation · missing

The code has no recommendation, so this is mine.
1. Fix the `status` clash by renaming the variable. One word.
2. Make the consent row optional when both parents apply.
3. Move the payment rule and file checks to a server before any real use.
4. Check file contents, not only the file name ending.
5. Hide the payment timeout tickbox from applicants.
6. Add a simulated failing upload, so the failure message can be tested.
7. Keep the facilitator fix test in a separate page.
