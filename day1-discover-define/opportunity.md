# Opportunity: Check submissions for errors and missing documents

**Scenario:** B · ICA passport applications

All quotes and metrics are synthetic and labelled as made up.

## Problem Framework

### 1. Goal

Reduce application return rate from 17% to 0.5%, improving first-time submission quality and reducing processing delays.

### 2. Problem

ICA officers return 17% of 520,000 annual applications due to errors or missing documents. Each return adds approximately six days. Applicants often do not understand what constitutes a complete application.

### 3. Context

Applicants renew passports infrequently (typically every 5 or 10 years) and may be unfamiliar with requirements. Only 38% read the guidance. Parents renewing passports for children face particular confusion.

### 4. Constraints

Vendor withdraws in 10 weeks. Walk-in counters can absorb only 35% of current online demand. Sensitive personal data must be protected. Final decisions remain with ICA officers. Guidance must remain accurate when rules change.

### 5. Success

Reduce avoidable returns, increase first-time complete submissions and maintain an operational online application channel before the vendor exits. No increase in incorrect applications being accepted or officer workload.

### 6. Explore

Test personalised application checklists, contextual guidance and pre-submission validation, starting with parents renewing passports for children. Identify which errors can be prevented before submission without replacing officer judgement.

## Evidence (synthetic)

### User quotes

- "I thought renewing my child's passport would be the same as renewing mine. I didn't know additional information was needed." — Parent applicant
- "We keep returning applications for the same avoidable mistakes. Applicants only find out what's missing after submitting." — ICA processing officer
- "The instructions are there, but I don't know which ones apply to my situation." — Applicant

### Metrics

- Application return rate (17% now)
- Days added per return (about 6)
- Share of applicants who read the guidance (38%)
- First-try fix rate (target 9 in 10, made up)
- Officer workload (baseline not set yet)

## Hypothesis

Providing applicants with personalised guidance and pre-submission checks will reduce avoidable errors and missing documents, particularly for parents renewing children's passports

- Risk type: Value (build a landing page first)
- Kill switch: Stop or roll back the new guidance or validation feature if it introduces incorrect advice, exposes sensitive data, materially increases submission failures, or creates additional officer workload. Retain a safe application submission route.
- Kill-switch signal: Any confirmed sensitive-data exposure or critical incorrect eligibility guidance; or a sustained increase in application return rate compared with baseline during the pilot.
- Success signal: Pilot return rate falls from 17% to below 10%, with no increase in incorrect guidance or officer workload. Longer-term target is 0.5%, subject to evidence that it is achievable.
