# Testing Credentials and Demo Identity Model

**These are fictional local demonstration credentials only. No accounts are pre-created in AWS or any production identity provider.**

| Role | Username/email | Password | Demo UI capabilities |
|---|---|---|---|
| Administrator | `admin@budgetslider.test` | `AdminDemo@2026` | All local demo controls |
| Operator | `operator@budgetslider.test` | `OperatorDemo@2026` | Adjust budgets, scenarios, simulated costs |
| Viewer | `viewer@budgetslider.test` | `ViewerDemo@2026` | View dashboard without editing |
| Auditor | `auditor@budgetslider.test` | `AuditorDemo@2026` | Read-only audit and reporting |

## Test device profile

- Device ID: `SIM-ESP32-001`
- Device name: `Virtual Budget Slider`
- Example MQTT topic for future integration: `budgetslider/demo/SIM-ESP32-001/telemetry`
- Initial budget: `$100` (simulated account units)
- Initial estimated cost: `$72` (illustrative)
- Warning threshold: 80% utilization
- At or above 100% utilization: limit reached / over-budget LED indicator
- Primary mode: `LOCAL SIMULATION`

## Security note

This app runs entirely in a local browser with a hardcoded demo-user list for classroom convenience; all credential values are readable in frontend source. Do **not** deploy this login flow for real people or real cloud resources. Production identity requires server-side verification, strong authentication, and role checks enforced by the backend.
