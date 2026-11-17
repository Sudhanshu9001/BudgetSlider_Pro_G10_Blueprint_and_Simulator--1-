# Architecture and Production Build Phases

## Design principles

- **Demo mode:** laptop-only virtual ESP32; no hardware, paid cloud services, or AWS account required.
- **Live mode (future):** ESP32 MQTT messages via AWS IoT Core; Lambda processing; DynamoDB persistence; authorized dashboard events.
- **Keep data provenance visible:** simulated forecast, price-list calculation, and Cost Explorer actual spending are separate concepts.
- **Zero embedded AWS keys:** browser only talks to authenticated APIs; devices use scoped certificates/policies; Lambda uses IAM roles.

## Proposed cloud data flow

```text
[Virtual Potentiometer / ESP32 Analog Input]
                 |
            Budget Event
                 v
         [AWS IoT Core MQTT]
                 |
             IoT Rule
                 v
            [AWS Lambda] <---- [AWS Price List Query API]
                 |
          [Cost Estimate]
                 v
           [DynamoDB]
           /        \
     [API Layer]   [Alert Engine --> SNS]
          |
 [React Dashboard / OLED + LED Simulator]
```

Potential AWS services: AWS IoT Core, AWS Lambda, DynamoDB, API Gateway, AWS Price List Query API, Cognito, SNS, optionally Cost Explorer. The Price List Query API does not provide actual account bill amounts; Cost Explorer does, subject to the AWS account's permission and data availability.

## Example device payload (illustrative)

```json
{
  "deviceId": "SIM-ESP32-001",
  "timestamp": "2026-11-16T14:00:00Z",
  "budget": 100,
  "currency": "USD",
  "potentiometerReading": 410,
  "simulation": true
}
```

Topic example: `budgetslider/demo/SIM-ESP32-001/telemetry`.

## Application roles

- **Admin:** settings, devices, alerts, user and workspace management.
- **Operator:** budgets, simulator, scenario settings, reports.
- **Viewer:** read-only monitoring.
- **Auditor:** read-only evidence, reports, and audit history.

The included static demo checks access in the UI only; these controls do **not** constitute security. In production, check role authorization on every backend API and IoT policy.

## Proposed storage entities

- `Users(userId, email, role, status)`
- `Workspaces(workspaceId, owner, region, currency)`
- `Devices(deviceId, workspaceId, lastSeen, status, calibration)`
- `Budgets(workspaceId, month, limit, warningThreshold)`
- `UsageRecords(recordId, workspaceId, service, usage, unit, timestamp, source)`
- `PricingSnapshots(service, sku, region, rate, unit, fetchedAt)`
- `CostEstimates(workspaceId, month, total, breakdown, projectedAt)`
- `Alerts(alertId, severity, reason, acknowledgedAt, createdAt)`
- `AuditEvents(eventId, actor, action, before, after, occurredAt)`

## Delivery phases

1. **Local prototype:** simulator, OLED/LED, budget state, scenario cost data and tests.
2. **IoT messaging:** configure IoT Core, a narrowly scoped device policy and MQTT certificate, plus simulated-device publisher on trusted backend.
3. **Pricing:** implement server-side Price List Query API adapter and unit normalization; caching, region restrictions and rate limits.
4. **Processing:** add Lambda event validation and idempotency; DynamoDB event storage.
5. **Frontend API:** authenticated dashboard with WebSocket/subscription fan-out.
6. **Alerts:** thresholds, SNS subscriptions, rate limiting and deduplication.
7. **Analytics/predictions:** history, forecast methodology, statistical uncertainty.
8. **Multi-user:** Cognito integration, per-workspace authorization and audit log.
9. **Operations:** IaC, CI, monitoring, error recovery, backups and automatic tests.
10. **Production:** test in staging, security review, budgets/quotas, rollback and mobile PWA packaging.

## Cost & deployment safeguards

Some AWS services may incur charges even for small demonstrations. Use sample data for development; enable AWS account spending budgets; use least-privilege IAM policies and restrict live permissions. Never commit certificates, passwords or access keys. Do not use real user credentials in test files.
