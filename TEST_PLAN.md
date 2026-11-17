# Project 31 — Functional Test Plan

## Scenario tests

| ID | Budget | Estimated cost | Expected severity | Expected LED |
|---|---:|---:|---|---|
| TC01 | 100 | 60 | SAFE | OFF |
| TC02 | 100 | 85 | WARNING | SLOW FLASH |
| TC03 | 100 | 100 | LIMIT REACHED | RAPID FLASH |
| TC04 | 100 | 125 | OVER BUDGET | RAPID FLASH |
| TC05 | 50 | 72 | OVER BUDGET | RAPID FLASH |
| TC06 | 100 | 0 | SAFE | OFF |
| TC07 | 0 | 72 | REJECT INPUT | no budget write |
| TC08 | -20 | 72 | REJECT INPUT | no budget write |

## Access tests

- Administrator can modify simulator and threshold.
- Operator can change budgets and cost scenarios.
- Viewer cannot modify budgets or scenarios.
- Auditor cannot modify budgets or scenarios, but can inspect reports.
- Demo authentication rejects unknown username or incorrect password.
- Production deployment must replace client-side role checks with backend authorization tests.

## Reliability tests (targeted to later generations)

- MQTT device disconnect triggers stale/offline indicators.
- Out-of-order/duplicate device messages do not double-apply budget changes.
- Invalid JSON and out-of-range telemetry are rejected.
- Pricing API downtime produces visible stale-data warning and uses last known snapshot only under allowed caching policy.
- Alert emails are deduplicated and rate-limited.
- Failed queued messages go to retry or dead-letter handling.
- Unauthorized user cannot read another workspace.
- Lighthouse accessibility, mobile layout, keyboard and reduced-motion tests pass.

## Run unit tests

```bash
npm test
```

The included tests cover core calculation and classification functions; they are not a full end-to-end AWS test suite.
