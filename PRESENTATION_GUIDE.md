# 5–7 Minute Faculty Demonstration Guide

## 1 — Introduction (45 sec)

"BudgetSlider Pro solves a simple IoT budgeting problem: a potentiometer controls the monthly budget, an OLED displays the estimated expense and an LED signals warning or overspending. Our build demonstrates the same logic on a laptop using a virtual ESP32 and provides a roadmap for AWS cloud connectivity."

## 2 — Explain the original hardware mapping (45 sec)

| Original component | Local equivalent |
|---|---|
| ESP32 | Virtual device `SIM-ESP32-001` |
| Potentiometer | Range slider and numeric budget input |
| OLED | Monochrome-style browser display |
| LED | Animated severity indicator |
| AWS IoT Core | Planned MQTT messaging layer, not connected in this ZIP |
| AWS Lambda | Planned server-side processing function |
| AWS Pricing API | Planned live price lookup; demo uses sample numbers |

## 3 — Demonstrate behavior (90 sec)

- Login as `operator@budgetslider.test` / `OperatorDemo@2026`.
- Open IoT Control Lab and point to the virtual knob/OLED.
- With budget `$100`, choose Standard `$72` (safe).
- Choose Warning `$85`: LED slow flashes.
- Choose Over Budget `$120`: LED rapid flashes; an alert enters the Alerts Center.
- Adjust budget and show the OLED remaining-value response.

## 4 — Dashboard and forecasting (75 sec)

- Overview: budget, monthly estimated cost, remaining balance, utilization.
- Cost Explorer: itemized sample EC2, S3, Lambda and DynamoDB values.
- Analytics: illustrative history and service distribution.
- Forecast Studio: arithmetic extrapolation based on assumed elapsed days; no ML is claimed.

## 5 — Architecture and future upgrades (75 sec)

Discuss planned message flow: virtual/physical potentiometer → IoT Core → Lambda → Price List Query API → DynamoDB → dashboard and optional SNS alert. Show ten-generation roadmap and explain that the integration work is a future phase; the current ZIP is a local runnable prototype.

## 6 — Test and conclude (45 sec)

- Show the predefined five budget severity scenarios in `TEST_PLAN.md`.
- Run `npm test`, demonstrating passing deterministic core logic checks.
- Export CSV/JSON report.
- Conclude with no-hardware feasibility and clear separation between simulated and real AWS costs.

## Potential faculty questions

**Why AWS IoT Core?** For securely receiving device telemetry using MQTT and routing it to cloud processing.

**Why Lambda?** For event-driven calculations and alert evaluation without managing an always-running application server.

**Does the sample dashboard show my AWS bill?** No. Local cost figures are illustrative. Real pricing needs a Price List API adapter, and actual bills need authorized billing services such as Cost Explorer.

**Is the login secure?** No, it is deliberately a client-side classroom demo. A production application would use server-validated authentication (e.g. Cognito) and backend-enforced permissions.

**How is overspending determined?** Utilization = estimated cost ÷ monthly budget × 100. 80–below 100% warns by default; 100% is a reached limit; above 100% is over budget.
