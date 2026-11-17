# BudgetSlider Pro — Project 31
## 10-Generation Blueprint + Runnable Software Simulator

This ZIP contains the complete project blueprint across **10 generations and 60 proposed enhancements**, plus a **working offline-first browser demo** of the core system. It is designed for a cloud-computing / IoT presentation without requiring physical ESP32 hardware.

**Important scope statement:** This ZIP is a blueprint and demonstrator, **not a completed 60-feature cloud product**. The included simulator supports local interactive budgeting, a virtual potentiometer, OLED and LED responses, sample-cost allocation, alerts, lightweight analytics and forecasts, role-based *demo UI* access, and CSV/JSON export. Real AWS IoT Core, Lambda, AWS Price List Query API, Cognito, DynamoDB, SNS, and physical ESP32 connectivity are **planned integrations**, not configured or active in this package. All prices and data are **illustrative**, not live AWS bills.

## Fastest way to run

1. Unzip this archive.
2. Install Node.js 18 or newer if needed.
3. Open the extracted `BudgetSlider_Pro_G10` folder in VS Code.
4. In the terminal run:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000`.
6. Login using one of the demo accounts below.

Alternative, if Node.js is unavailable:

```bash
cd app
python -m http.server 8000
```

Then open `http://localhost:8000`.

Because the browser application uses ES modules, please run it through a localhost server rather than opening `index.html` by double-clicking.

## Demo credentials (local demonstrator only)

| Role | Email | Password |
| --- | --- | --- |
| Administrator | admin@budgetslider.test | AdminDemo@2026 |
| Operator | operator@budgetslider.test | OperatorDemo@2026 |
| Viewer | viewer@budgetslider.test | ViewerDemo@2026 |
| Auditor | auditor@budgetslider.test | AuditorDemo@2026 |

These credentials are intentionally public examples embedded in the local demo frontend. **They are not secure, must not be reused, and must never be used as a real production login system.** A later production build must use Cognito or another secure identity provider.

## What to demonstrate

1. Sign in as an **Operator**.
2. Open **IoT Control Lab** and move the monthly budget potentiometer/slider.
3. Select **Standard** cost scenario: 72 units against a 100-unit budget (safe).
4. Select **Warning** (85 versus 100): the OLED status and LED change to warning.
5. Select **Over Budget** (120 versus 100): over-budget indicator and alert appear.
6. Open **Analytics**, **Forecast**, and **Alerts** to show response.
7. Open **Reports** and download CSV/JSON or use browser Print → Save as PDF.
8. Sign out, then sign in as **Viewer** to show read-only controls.

## Files

- `docs/BLUEPRINT_10_GENERATIONS.md` — 60-feature roadmap, all 10 generations.
- `docs/ARCHITECTURE.md` — proposed production architecture, integrations, data model, security.
- `docs/TESTING_CREDENTIALS.md` — demo roles, credentials, expectations.
- `docs/TEST_PLAN.md` — tests and acceptance criteria.
- `docs/IMPLEMENTATION_STATUS.md` — explicit implemented vs planned list.
- `docs/FEATURE_MATRIX.csv` — machine-readable feature backlog.
- `app/index.html`, `app/style.css`, `app/src/app.js`, `app/src/logic.mjs` — browser simulator.
- `server.mjs` — dependency-free local web server.
- `tests/logic.test.mjs` — automated logic tests.
- `sample-data/demo-costs.csv` — illustrative sample numbers.

## Test commands

```bash
npm test
npm start
```

## Future AWS integration

Follow the step-by-step phases in `docs/ARCHITECTURE.md`. AWS accounts, verified identities, permissions, pricing endpoints, and IoT certificates are *not included*. Never put AWS long-term credentials in the browser or into public repositories.

## Educational use

The app intentionally distinguishes simulated vs real telemetry. Its cost estimates use sample line items selected for demonstration; they are **not actual AWS service prices**. The project begins with a software-only simulated ESP32 and can later be extended to physical hardware.
