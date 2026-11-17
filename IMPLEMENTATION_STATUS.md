# Implementation Status — What Is Actually In the ZIP

**Purpose:** Avoid conflating a ten-generation product roadmap with the downloadable local demonstrator.

## Implemented in the runnable browser demo

- Simulated virtual potentiometer and numeric budget input, validation and reset.
- Simulated OLED readout, LED indicator, safe/warning/limit/over-budget classification.
- Run/pause and preset scenarios (standard, warning, over-budget, lean).
- Sample four-service cost breakdown (EC2, S3, Lambda, DynamoDB).
- Overview KPIs, SVG trend visualization and breakdown progress bars.
- Local demo alert history and acknowledgment controls.
- Basic what-if projection and non-AI cost reduction hints.
- Device status for one virtual simulator, not a physical MQTT device.
- Role-aware demo login interface with sample credentials (client-side only).
- Local browser state persistence, theme toggle, demo currency toggle, and CSV/JSON report export.
- Unit tests for pure budget functions.

## Partially simulated / illustrative

- AWS resource pricing: static sample numbers, **not live AWS rates**.
- Forecasting: simple 30-day estimated calculation, not learned predictive modeling.
- Reporting PDF: supported through the browser Print → Save as PDF flow.
- Alerts: in-browser only; no actual email/SNS delivery.
- User roles: UI gating only; not secure production authentication.
- Analytics: synthetic historical data, not Cost Explorer measurements.

## Planned, NOT implemented here

- AWS IoT Core MQTT connection, certificate provisioning, real ESP32 firmware.
- Lambda, DynamoDB, API Gateway, Cognito, SNS, Price List Query API, Cost Explorer.
- Real user management, server-side role authorization, multiple real devices.
- True price normalization for AWS regions, discounts, tax and pricing tiers.
- Machine-learning cost anomaly detection and true AI explanation assistant.
- Shared workspaces, approval workflows, PWA service worker and deployment IaC.
- Automated browser E2E tests, retry/dead-letter queues, cloud backup.

For the full feature backlog, see `BLUEPRINT_10_GENERATIONS.md` and `FEATURE_MATRIX.csv`.
