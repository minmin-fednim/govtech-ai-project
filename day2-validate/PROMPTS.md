# Prompt chain

**Scenario:** B · ICA passport applications
**Prototype today:** Ask the applicants what passport the user is applying and provide information what to upload with guidance

All data is synthetic and labelled as made up.

## 1. Expand

**Prompt:** the applicants can pay the fees

**Business rules:**
- the applicants can only pay if all the documents are submitted

**Edge cases:**
- the payment fails due to timeout

**Result:**
- **Worked:** A "Pay the fee" box was added (made-up $99, no real payment). Pay stays locked until every document row is done, and it says how many rows are left. A timeout shows "The payment timed out. You have not been charged. Please try again." with a "Try payment again" button. Removing a document after a failed payment locks Pay again. I tested all of this in headless Chrome.
- **Broke:** The green/red status box is blank. This was already true on the original code on `main`. The cause is probably that the variable `status` in `app.js` clashes with the browser's built-in `window.status`. The Pay lock is only a disabled button, so anyone can re-enable it in the browser. A server has to enforce the rule. The child's "Other parent's consent" row is always required, so a couple applying together can never unlock Pay. I also removed the "Payment ready" tick row, because Pay replaced it.
- **Saved:** on `main` with the Behavior step below.

## 2. Behavior

**Prompt:** when the upload fails, the applicants will get a failure message

**Forced failure:** the webspage hits page not found error

**Business rules:**
- never allow the submission to go through if upload fail

**Edge cases:**
- the document uploaded can be empty file with nothing

**Result:**
- **Forced failure:** nothing is really uploaded, so I added a simulated upload (about 0.6 seconds) and a test tickbox, "make the next upload fail (page not found)". When it is on, the applicant sees "Upload failed. The page could not be found (error 404). Your file was not saved. Please try again." The row stays not done.
- **Worked** (tested in headless Chrome):
  - An empty file is refused with "The selected file is empty."
  - Pay stays locked while an upload is running and after it fails.
  - If one document fails and another succeeds, Pay still says 1 row to do.
  - Re-enabling the Pay button by hand and clicking it does nothing, because Pay checks the documents again before it starts.
  - Retrying the failed upload works, and then Pay unlocks.
  - Switching between "Myself" and "My child" during an upload does not leave a stale upload behind.
- **Broke / still open:**
  - The failure is staged. A tickbox causes it, not a real network error. A real upload would need a server.
  - The page never really shows a "page not found" screen. It only shows the message.
  - The test tickboxes are visible to applicants and must be hidden before real use.
  - The blank status box and the always-required consent row were fixed later: the variable was renamed to `statusBox`, and the consent row now has a skip button for couples applying together.

## 3. Refine

**Prompt:** make sure copywriting is clear so that design refine to application failure reduce to minimal

**Business rules:**
- do not write profanity message or reveal secrets in copy writing

**Edge cases:**
- broken links

**Result:** _Not run yet._
