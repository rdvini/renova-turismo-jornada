
- Metrics dashboard: the `metrics-overview` edge function returns raw rows (current + previous period) and all aggregation lives in `src/lib/metrics.ts`, so the logic stays unit-testable in one place.
- UTM attribution: `src/lib/utm.ts` stores the session UTMs; every tracker inserts them via `utmColumns()` so clicks inherit the campaign that brought the visitor.
