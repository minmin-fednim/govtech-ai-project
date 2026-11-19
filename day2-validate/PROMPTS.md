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

**Result:** _fill in after you run it: what worked, what broke._

## 2. Behavior

**Prompt:** when the upload fails, the applicants will get a failure message

**Forced failure:** the webspage hits page not found error

**Business rules:**
- never allow the submission to go through if upload fail

**Edge cases:**
- the document uploaded can be empty file with nothing

**Result:** _fill in after you run it: what worked, what broke._

## 3. Refine

**Prompt:** make sure copywriting is clear so that design refine to application failure reduce to minimal

**Business rules:**
- do not write profanity message or reveal secrets in copy writing

**Edge cases:**
- broken links

**Result:** _fill in after you run it: what worked, what broke._
